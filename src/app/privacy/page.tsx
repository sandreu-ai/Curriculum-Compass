import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How The Curriculum Compass collects, uses, and protects quiz, email, and site analytics information.',
  alternates: { canonical: '/privacy' },
}

const updated = 'June 7, 2026'

export default function PrivacyPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-gradient-to-br from-forest-dark to-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <p className="font-body text-green-200 text-sm uppercase tracking-wide mb-3">Legal</p>
          <h1 className="font-heading text-4xl sm:text-5xl text-white mb-4">Privacy Policy</h1>
          <p className="font-body text-green-100 text-lg leading-relaxed max-w-3xl">
            This policy explains what information The Curriculum Compass collects, why we collect it,
            and how families can contact us about their information.
          </p>
          <p className="font-body text-green-200 text-sm mt-4">Last updated: {updated}</p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 prose prose-green prose-headings:font-heading prose-headings:text-forest-dark prose-p:font-body prose-p:text-gray-700 prose-li:font-body prose-li:text-gray-700">
        <h2>Information we collect</h2>
        <p>
          The Curriculum Compass collects information you choose to provide, including your email
          address and quiz answers when you request your full curriculum results by email. Quiz answers
          may include preferences such as faith or secular orientation, budget range, learning style,
          teaching involvement, grade range, and curriculum needs.
        </p>
        <p>
          We may also collect standard site analytics, such as visited pages, referral sources, device
          or browser information, and aggregated usage trends. We use this information to understand
          which pages help families and where the site needs improvement.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To calculate and email your personalized homeschool curriculum matches.</li>
          <li>To save quiz leads and tags so we can send more useful follow-up resources.</li>
          <li>To improve curriculum reviews, comparisons, tools, and site navigation.</li>
          <li>To monitor site performance, indexing, and conversion funnels.</li>
          <li>To comply with legal, security, and anti-spam obligations.</li>
        </ul>

        <h2>Email and follow-up</h2>
        <p>
          If you enter your email, we may send your quiz results and a short follow-up sequence with
          curriculum planning tips, comparison resources, budget guidance, state-law reminders, and
          related homeschool resources. You can unsubscribe or ask to be removed at any time.
        </p>

        <h2>Affiliate links</h2>
        <p>
          Some links on the site are affiliate links. If you purchase through those links, we may earn a
          commission at no additional cost to you. Affiliate relationships do not determine your quiz
          results; recommendations are based on fit signals in your answers and our curriculum data.
          See our <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> for more detail.
        </p>

        <h2>Service providers</h2>
        <p>
          We may use trusted service providers for email delivery, lead storage, analytics, hosting,
          and site operations. These providers only receive information needed to perform those
          services. Examples may include Vercel for hosting and analytics and Resend or another email
          platform for email delivery and contact storage.
        </p>

        <h2>Data retention</h2>
        <p>
          We keep quiz lead information only as long as it is useful for providing results, follow-up
          resources, site operations, compliance, and business records. You may request removal by
          contacting us.
        </p>

        <h2>Children's privacy</h2>
        <p>
          The Curriculum Compass is intended for parents, guardians, and educators. We do not knowingly
          collect personal information directly from children. If you believe a child provided personal
          information without parent or guardian consent, contact us and we will review and remove it as
          appropriate.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>You can avoid email collection by browsing reviews, guides, tools, and directory pages without submitting the quiz email form.</li>
          <li>You can unsubscribe from marketing emails or ask us to delete your email lead record.</li>
          <li>You can disable cookies or analytics tracking through your browser settings where available.</li>
        </ul>

        <h2>Contact</h2>
        <p>
          For privacy questions or removal requests, email us at{' '}
          <a href="mailto:info@thecurriculumcompass.com">info@thecurriculumcompass.com</a>.
        </p>

        <div className="not-prose mt-10 rounded-2xl border border-cream-darker bg-white p-6">
          <p className="font-body text-sm text-gray-600">
            This policy is a practical disclosure for site visitors and does not replace legal advice.
            Families should always review publisher sites directly before buying curriculum.
          </p>
        </div>
      </article>
    </div>
  )
}
