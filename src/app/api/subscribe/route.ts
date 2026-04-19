import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { scoreCurricula } from '@/lib/scoring'
import { buildMatchesEmail } from '@/lib/emailTemplate'
import type { QuizAnswers } from '@/types'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

    if (!apiKey) {
      console.error('RESEND_API_KEY is not set in the environment.')
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      )
    }

    const { html, text } = buildMatchesEmail({ matches, siteUrl })

    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: `The Curriculum Compass <${fromEmail}>`,
      to: email,
      subject: `Your Top ${matches.length} Homeschool Curriculum Match${matches.length > 1 ? 'es' : ''}`,
      html,
      text,
    })

    if (error) {
      console.error('Resend send error:', error)
      return NextResponse.json(
        { error: 'We could not send your email right now. Please try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id ?? null })
  } catch (err) {
    console.error('Subscribe route error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
