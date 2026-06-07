import type { LeadSegments } from '@/lib/leadSegmentation'
import type { ScoredCurriculum } from '@/types'

interface EmailTemplateOptions {
  matches: ScoredCurriculum[]
  siteUrl: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function matchBlock(match: ScoredCurriculum, rank: number, siteUrl: string): string {
  const { curriculum, matchReasons } = match
  const priceRange =
    curriculum.price.low === curriculum.price.high
      ? `$${curriculum.price.low.toLocaleString()}/yr`
      : `$${curriculum.price.low.toLocaleString()}–$${curriculum.price.high.toLocaleString()}/yr`

  const reasonsHtml = matchReasons
    .map(
      (r) =>
        `<li style="margin:6px 0;color:#374151;font-size:14px;line-height:1.5;">✓ ${escapeHtml(r)}</li>`
    )
    .join('')

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px 0;background:#ffffff;border:1px solid #ede8dc;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="background:#1f6a4f;padding:10px 20px;">
          <span style="color:#fdfcf8;font-family:Georgia,serif;font-weight:bold;font-size:14px;">#${rank} Match</span>
          <span style="color:#a7e8c8;font-size:12px;margin-left:6px;">for your family</span>
        </td>
      </tr>
      <tr>
        <td style="padding:20px;">
          <h2 style="margin:0 0 4px 0;font-family:Georgia,serif;color:#154d39;font-size:22px;">${escapeHtml(curriculum.name)}</h2>
          <p style="margin:0 0 12px 0;color:#6b7280;font-size:14px;">${escapeHtml(curriculum.approach)} · ${priceRange} · Grades ${escapeHtml(curriculum.gradeRange)}</p>
          <p style="margin:0 0 16px 0;color:#374151;font-size:14px;line-height:1.6;">${escapeHtml(curriculum.description)}</p>

          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 16px;margin:0 0 16px 0;">
            <p style="margin:0 0 8px 0;color:#1f6a4f;font-size:11px;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;">Why this fits your family</p>
            <ul style="margin:0;padding-left:18px;">
              ${reasonsHtml}
            </ul>
          </div>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td align="center" style="padding:4px;">
                <a href="${escapeHtml(curriculum.affiliateUrl)}" style="display:inline-block;background:#1f6a4f;color:#fdfcf8;text-decoration:none;padding:10px 22px;border-radius:10px;font-weight:bold;font-size:14px;">
                  Visit ${escapeHtml(curriculum.name)} →
                </a>
              </td>
              <td align="center" style="padding:4px;">
                <a href="${escapeHtml(siteUrl)}/curriculum/${escapeHtml(curriculum.id)}" style="display:inline-block;border:2px solid #1f6a4f;color:#1f6a4f;text-decoration:none;padding:8px 22px;border-radius:10px;font-weight:bold;font-size:14px;">
                  Read Full Review
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
}

export function buildMatchesEmail({ matches, siteUrl }: EmailTemplateOptions): {
  html: string
  text: string
} {
  const matchesHtml = matches.map((m, i) => matchBlock(m, i + 1, siteUrl)).join('')

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your Homeschool Curriculum Matches</title>
</head>
<body style="margin:0;padding:0;background:#fdfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fdfcf8;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:0 0 28px 0;">
              <p style="margin:0;font-size:32px;">🧭</p>
              <p style="margin:8px 0 0 0;font-family:Georgia,serif;color:#154d39;font-size:22px;font-weight:bold;">The Curriculum Compass</p>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="background:#1f6a4f;color:#ffffff;padding:28px 24px;border-radius:16px;margin-bottom:24px;">
              <h1 style="margin:0 0 10px 0;font-family:Georgia,serif;color:#ffffff;font-size:26px;line-height:1.3;">Your Top ${matches.length} Curriculum Match${matches.length > 1 ? 'es' : ''}</h1>
              <p style="margin:0;color:#bbf7d0;font-size:15px;line-height:1.6;">
                Thanks for taking the quiz! Here are the curricula that fit your family best — along with personalized reasons why each one could work for you. Save this email so you can come back to it later.
              </p>
            </td>
          </tr>

          <tr><td style="height:24px;">&nbsp;</td></tr>

          <!-- Matches -->
          <tr>
            <td>
              ${matchesHtml}
            </td>
          </tr>

          <!-- CTA footer -->
          <tr>
            <td style="background:#f5f0e8;border-radius:16px;padding:24px;text-align:center;">
              <p style="margin:0 0 12px 0;font-family:Georgia,serif;color:#154d39;font-size:18px;font-weight:bold;">Want to explore more options?</p>
              <p style="margin:0 0 16px 0;color:#6b7280;font-size:14px;">Browse our full directory of 40+ reviewed curricula.</p>
              <a href="${escapeHtml(siteUrl)}/directory" style="display:inline-block;background:#1f6a4f;color:#fdfcf8;text-decoration:none;padding:10px 24px;border-radius:10px;font-weight:bold;font-size:14px;">
                Browse All Curricula →
              </a>
            </td>
          </tr>

          <!-- Legal footer -->
          <tr>
            <td style="padding:28px 16px 0 16px;text-align:center;">
              <p style="margin:0 0 8px 0;color:#9ca3af;font-size:12px;line-height:1.5;">
                You're receiving this because you took the Curriculum Compass quiz.
              </p>
              <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">
                The Curriculum Compass may earn affiliate commissions on purchases — at no cost to you.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  // Plain text fallback
  const textMatches = matches
    .map((m, i) => {
      const c = m.curriculum
      const reasons = m.matchReasons.map((r) => `  ✓ ${r}`).join('\n')
      return `#${i + 1} — ${c.name}
${c.approach} · $${c.price.low}–$${c.price.high}/yr · Grades ${c.gradeRange}

${c.description}

Why this fits your family:
${reasons}

Visit: ${c.affiliateUrl}
Full review: ${siteUrl}/curriculum/${c.id}
`
    })
    .join('\n---\n\n')

  const text = `Your Top ${matches.length} Homeschool Curriculum Match${matches.length > 1 ? 'es' : ''}

Thanks for taking the Curriculum Compass quiz! Here are your personalized matches:

${textMatches}

Browse all 40+ curricula: ${siteUrl}/directory

— The Curriculum Compass
`

  return { html, text }
}

interface FollowUpEmailOptions {
  matches: ScoredCurriculum[]
  segments: LeadSegments
  siteUrl: string
}

interface FollowUpEmail {
  subject: string
  html: string
  text: string
  scheduledAt: string
  sequence: string
}

function daysFromNow(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

function buildSimpleEmail({
  title,
  intro,
  bullets,
  ctaLabel,
  ctaUrl,
}: {
  title: string
  intro: string
  bullets: string[]
  ctaLabel: string
  ctaUrl: string
}): { html: string; text: string } {
  const bulletHtml = bullets
    .map((bullet) => `<li style="margin:8px 0;color:#374151;font-size:14px;line-height:1.55;">${escapeHtml(bullet)}</li>`)
    .join('')

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fdfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fdfcf8;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border:1px solid #ede8dc;border-radius:18px;overflow:hidden;">
        <tr><td style="background:#1f6a4f;color:#ffffff;padding:26px 24px;">
          <p style="margin:0 0 8px 0;font-family:Georgia,serif;color:#bbf7d0;font-size:15px;">The Curriculum Compass</p>
          <h1 style="margin:0;font-family:Georgia,serif;color:#ffffff;font-size:25px;line-height:1.3;">${escapeHtml(title)}</h1>
        </td></tr>
        <tr><td style="padding:24px;">
          <p style="margin:0 0 16px 0;color:#374151;font-size:15px;line-height:1.65;">${escapeHtml(intro)}</p>
          <ul style="margin:0 0 22px 0;padding-left:20px;">${bulletHtml}</ul>
          <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;background:#1f6a4f;color:#fdfcf8;text-decoration:none;padding:11px 22px;border-radius:10px;font-weight:bold;font-size:14px;">${escapeHtml(ctaLabel)} →</a>
        </td></tr>
        <tr><td style="padding:0 24px 24px 24px;color:#9ca3af;font-size:12px;line-height:1.5;">
          You're receiving this because you requested homeschool curriculum quiz results from The Curriculum Compass. You can unsubscribe or ask to be removed anytime.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const text = `${title}\n\n${intro}\n\n${bullets.map((bullet) => `- ${bullet}`).join('\n')}\n\n${ctaLabel}: ${ctaUrl}\n\n— The Curriculum Compass`

  return { html, text }
}

export function buildFollowUpEmails({ matches, segments, siteUrl }: FollowUpEmailOptions): FollowUpEmail[] {
  const topMatch = matches[0]?.curriculum.name ?? segments.topMatch
  const budgetGuide = `${siteUrl}/budget-guides`
  const toolsGuide = `${siteUrl}/tools`

  const day1 = buildSimpleEmail({
    title: `How to sanity-check ${topMatch}`,
    intro: `Your quiz result is a strong starting point, but the next step is to confirm fit before buying anything. Use this quick filter to avoid expensive curriculum regret.`,
    bullets: [
      `Download or preview a sample lesson and ask: would a normal Tuesday with this feel realistic?`,
      `Check whether the teacher guide expects more parent prep than your family can sustain.`,
      `Compare the curriculum's worldview, grade range, and learning style against your quiz tags: ${segments.worldview}, ${segments.gradeRange}, ${segments.learningNeeds.join(', ')}.`,
      `Before purchasing, verify current pricing, refunds, and required materials directly on the publisher site.`,
    ],
    ctaLabel: 'Browse the full curriculum directory',
    ctaUrl: `${siteUrl}/directory`,
  })

  const day3 = buildSimpleEmail({
    title: 'Budget check before you buy curriculum',
    intro: `Curriculum cost is more than the sticker price. Books, manipulatives, subscriptions, printing, and replacement workbooks can change the real annual number.`,
    bullets: [
      `Your quiz budget segment: ${segments.budget}. Use that as a ceiling, not a target.`,
      `Separate reusable teacher materials from consumable student workbooks.`,
      `Price the top match against at least two alternatives before committing.`,
      `Avoid buying a full-year bundle until you have reviewed samples and placement guidance.`,
    ],
    ctaLabel: 'Use the budget guides',
    ctaUrl: budgetGuide,
  })

  const day7 = buildSimpleEmail({
    title: 'Final fit checklist for your homeschool plan',
    intro: `Before you settle on a curriculum, run one final pass across worldview, state requirements, workload, and child fit.`,
    bullets: [
      `Confirm whether your family wants a faith-based, secular, or neutral curriculum path.`,
      `Check your state law page for notices, portfolios, assessments, or recordkeeping expectations.`,
      `Use comparison tools to separate "good curriculum" from "good fit for this child this year."`,
      `If you are unsure, choose the lowest-risk trial path: samples, placement tests, used books, or monthly subscription before a full-year purchase.`,
    ],
    ctaLabel: 'Open the planning tools',
    ctaUrl: toolsGuide,
  })

  return [
    { ...day1, subject: `Next step for your ${topMatch} result`, scheduledAt: daysFromNow(1), sequence: 'day-1-sanity-check' },
    { ...day3, subject: 'Curriculum budget check before you buy', scheduledAt: daysFromNow(3), sequence: 'day-3-budget-check' },
    { ...day7, subject: 'Your final homeschool curriculum fit checklist', scheduledAt: daysFromNow(7), sequence: 'day-7-fit-checklist' },
  ]
}
