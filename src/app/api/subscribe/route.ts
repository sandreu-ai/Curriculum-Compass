import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { scoreCurricula } from '@/lib/scoring'
import { buildFollowUpEmails, buildMatchesEmail } from '@/lib/emailTemplate'
import { buildEmailTags, buildLeadProperties, deriveLeadSegments, summarizeAnswers } from '@/lib/leadSegmentation'
import type { QuizAnswers } from '@/types'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseCsvEnv(value?: string): string[] {
  return (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function buildContactPayload({
  email,
  properties,
  audienceId,
  segmentIds,
  topicId,
}: {
  email: string
  properties: Record<string, string | number | null>
  audienceId?: string
  segmentIds: string[]
  topicId?: string
}) {
  return {
    ...(audienceId && segmentIds.length === 0 ? { audienceId } : {}),
    email,
    unsubscribed: false,
    properties,
    ...(segmentIds.length ? { segments: segmentIds.map((id) => ({ id })) } : {}),
    ...(topicId ? { topics: [{ id: topicId, subscription: 'opt_in' as const }] } : {}),
  }
}

function isMissingResendPropertyError(error?: { message?: string } | null): boolean {
  return /properties do not exist/i.test(error?.message ?? '')
}

async function upsertContact({
  resend,
  email,
  properties,
  audienceId,
  segmentIds,
  topicId,
}: {
  resend: Resend
  email: string
  properties: Record<string, string | number | null>
  audienceId?: string
  segmentIds: string[]
  topicId?: string
}): Promise<{ id: string | null; created: boolean }> {
  const createPayload = buildContactPayload({ email, properties, audienceId, segmentIds, topicId })
  let created = await resend.contacts.create(createPayload)

  if (!created.error) {
    return { id: created.data?.id ?? null, created: true }
  }

  if (isMissingResendPropertyError(created.error)) {
    console.warn('Resend contact properties are not configured; retrying contact create without custom properties.')
    created = await resend.contacts.create(
      buildContactPayload({ email, properties: {}, audienceId, segmentIds, topicId })
    )
    if (!created.error) {
      return { id: created.data?.id ?? null, created: true }
    }
  }

  // Most repeat quiz-takers fail create because the contact already exists. Updating by email
  // keeps tags/properties fresh without requiring IMAP or mailbox access.
  let updated = await resend.contacts.update({
    ...(audienceId && segmentIds.length === 0 ? { audienceId } : {}),
    email,
    unsubscribed: false,
    properties,
  })

  if (isMissingResendPropertyError(updated.error)) {
    console.warn('Resend contact properties are not configured; retrying contact update without custom properties.')
    updated = await resend.contacts.update({
      ...(audienceId && segmentIds.length === 0 ? { audienceId } : {}),
      email,
      unsubscribed: false,
      properties: {},
    })
  }

  if (updated.error) {
    console.error('Resend contact upsert error:', {
      createMessage: created.error.message,
      updateMessage: updated.error.message,
    })
    throw new Error('contact_upsert_failed')
  }

  // The create payload can add segments/topics for new contacts. For existing contacts, add
  // configured segments/topics explicitly so Resend has durable lead buckets beyond email tags.
  await Promise.allSettled([
    ...segmentIds.map((segmentId) => resend.contacts.segments.add({ email, segmentId })),
    ...(topicId ? [resend.contacts.topics.update({ email, topics: [{ id: topicId, subscription: 'opt_in' }] })] : []),
  ])

  return { id: updated.data?.id ?? null, created: false }
}

async function sendLeadNotification({
  resend,
  fromEmail,
  notificationEmail,
  email,
  properties,
}: {
  resend: Resend
  fromEmail: string
  notificationEmail?: string
  email: string
  properties: Record<string, string | number | null>
}) {
  if (!notificationEmail || !EMAIL_REGEX.test(notificationEmail)) return

  const summary = [
    `New Curriculum Compass quiz lead: ${email}`,
    '',
    `Top match: ${properties.top_match ?? 'unknown'}`,
    `Worldview: ${properties.worldview ?? 'unknown'}`,
    `Budget: ${properties.budget ?? 'unknown'}`,
    `Grade range: ${properties.grade_range ?? 'unknown'}`,
    `Learning needs: ${properties.learning_needs ?? 'unknown'}`,
    '',
    'Lead is stored in Resend contacts. This notification is intentionally minimized; use Resend for the full contact record/properties.',
  ].join('\n')

  const result = await resend.emails.send({
    from: `The Curriculum Compass <${fromEmail}>`,
    to: notificationEmail,
    subject: `New quiz lead: ${properties.top_match ?? 'Curriculum Compass'}`,
    text: summary,
    tags: [{ name: 'notification', value: 'quiz-lead' }],
  })

  if (result.error) {
    console.error('Resend lead notification error:', result.error.message)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const answersParam = body?.answers

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!answersParam || typeof answersParam !== 'string') {
      return NextResponse.json({ error: 'Missing quiz answers.' }, { status: 400 })
    }

    // Decode the same base64-encoded answers the results page uses
    let answers: QuizAnswers
    try {
      answers = JSON.parse(Buffer.from(answersParam, 'base64').toString('utf-8')) as QuizAnswers
    } catch {
      return NextResponse.json({ error: 'Invalid quiz answers.' }, { status: 400 })
    }

    const matches = scoreCurricula(answers)
    if (matches.length === 0) {
      return NextResponse.json(
        { error: 'No curriculum matches were found for these answers.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
    const siteUrl = process.env.SITE_URL ?? 'https://thecurriculumcompass.com'
    const audienceId = process.env.RESEND_AUDIENCE_ID
    const segmentIds = parseCsvEnv(process.env.RESEND_SEGMENT_IDS ?? process.env.RESEND_SEGMENT_ID)
    const topicId = process.env.RESEND_TOPIC_ID
    const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL ?? process.env.RESEND_LEAD_NOTIFICATION_EMAIL

    if (!apiKey) {
      console.error('RESEND_API_KEY is not set in the environment.')
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const segments = deriveLeadSegments(answers, matches)
    const contactProperties = {
      ...buildLeadProperties(segments),
      quiz_answers: summarizeAnswers(answers),
      captured_at: new Date().toISOString(),
    }

    let contactId: string | null = null
    try {
      const contact = await upsertContact({
        resend,
        email,
        properties: contactProperties,
        audienceId,
        segmentIds,
        topicId,
      })
      contactId = contact.id
    } catch {
      return NextResponse.json(
        { error: 'We could not save your quiz results right now. Please try again.' },
        { status: 502 }
      )
    }

    const { html, text } = buildMatchesEmail({ matches, siteUrl })
    const emailTags = buildEmailTags(segments)

    const { data, error } = await resend.emails.send({
      from: `The Curriculum Compass <${fromEmail}>`,
      to: email,
      subject: `Your Top ${matches.length} Homeschool Curriculum Match${matches.length > 1 ? 'es' : ''}`,
      html,
      text,
      tags: emailTags,
    })

    if (error) {
      console.error('Resend send error:', error.message)
      return NextResponse.json(
        { error: 'We could not send your email right now. Please try again.' },
        { status: 502 }
      )
    }

    const followUps = buildFollowUpEmails({ matches, segments, siteUrl }).map((message) =>
      resend.emails.send({
        from: `The Curriculum Compass <${fromEmail}>`,
        to: email,
        subject: message.subject,
        html: message.html,
        text: message.text,
        scheduledAt: message.scheduledAt,
        tags: [
          ...emailTags,
          { name: 'sequence', value: message.sequence },
        ],
      })
    )
    const followUpResults = await Promise.allSettled(followUps)
    const failedFollowUps = followUpResults.filter(
      (result) => result.status === 'rejected' || ('value' in result && result.value.error)
    ).length
    if (failedFollowUps > 0) {
      console.error(`Resend follow-up scheduling failures: ${failedFollowUps}`)
    }

    await sendLeadNotification({
      resend,
      fromEmail,
      notificationEmail,
      email,
      properties: contactProperties,
    })

    return NextResponse.json({
      success: true,
      id: data?.id ?? null,
      contactId,
      followUpsScheduled: followUps.length - failedFollowUps,
    })
  } catch (err) {
    console.error('Subscribe route error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
