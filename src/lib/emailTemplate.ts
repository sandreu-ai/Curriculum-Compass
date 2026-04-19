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
