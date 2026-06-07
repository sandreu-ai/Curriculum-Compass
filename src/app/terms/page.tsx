import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms for using The Curriculum Compass homeschool curriculum quiz, reviews, comparisons, and tools.',
  alternates: { canonical: '/terms' },
}

const updated = 'June 7, 2026'

export default function TermsPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-gradient-to-br from-forest-dark to-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <p className="font-body text-green-200 text-sm uppercase tracking-wide mb-3">Legal</p>
          <h1 className="font-heading text-4xl sm:text-5xl text-white mb-4">Terms of Use</h1>
          <p className="font-body text-green-100 text-lg leading-relaxed max-w-3xl">
            These terms govern use of The Curriculum Compass, including the curriculum quiz, reviews,
            comparisons, guides, and planning tools.
          </p>
          <p className="font-body text-green-200 text-sm mt-4">Last updated: {updated}</p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 prose prose-green prose-headings:font-heading prose-headings:text-forest-dark prose-p:font-body prose-p:text-gray-700 prose-li:font-body prose-li:text-gray-700">
        <h2>Educational information only</h2>
        <p>
          The Curriculum Compass provides educational information to help parents compare homeschool
          curriculum options. We do not provide legal, financial, educational therapy, or professional
          counseling advice. Homeschool requirements vary by state and family situation, so always
          verify requirements with official state resources and qualified professionals when needed.
        </p>

        <h2>No guaranteed outcome</h2>
        <p>
          Quiz results and curriculum reviews are designed to narrow your research. They are not a
          guarantee that a curriculum will be the perfect fit for every child, family, state, school,
          or budget. You are responsible for evaluating samples, placement tests, publisher policies,
          state requirements, and current pricing before purchasing.
        </p>

        <h2>Accuracy and updates</h2>
        <p>
          We work to keep curriculum descriptions, prices, grade ranges, and publisher details useful
          and current, but information can change without notice. Publisher websites are the source of
          truth for final pricing, product scope, shipping, refunds, placement, and accreditation or
          enrollment details.
        </p>

        <h2>Affiliate and advertising relationships</h2>
        <p>
          Some links may be affiliate links, meaning we may earn a commission if you purchase through
          them at no additional cost to you. See our{' '}
          <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>. Affiliate compensation does
          not guarantee placement in quiz results or reviews.
        </p>

        <h2>Email use</h2>
        <p>
          If you submit your email to receive quiz results, you agree that we may send your results and
          helpful follow-up resources. You can unsubscribe or request removal. See our{' '}
          <Link href="/privacy">Privacy Policy</Link> for more information.
        </p>

        <h2>Acceptable use</h2>
        <ul>
          <li>Do not use the site to send spam, scrape at abusive volume, or attempt unauthorized access.</li>
          <li>Do not copy substantial portions of the site for a competing commercial directory without permission.</li>
          <li>Do not misrepresent our reviews, recommendations, or affiliate relationships.</li>
        </ul>

        <h2>External links</h2>
        <p>
          The site links to curriculum publishers and other third-party resources. We do not control
          those websites and are not responsible for their content, pricing, policies, privacy practices,
          or purchase terms.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          The site is provided “as is” without warranties of any kind. To the fullest extent permitted
          by law, The Curriculum Compass is not liable for indirect, incidental, consequential, or
          special damages arising from use of the site, reliance on site content, or purchases made from
          third-party publishers.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms as the site, business model, or legal requirements change. Continued
          use of the site after updates means you accept the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href="mailto:info@thecurriculumcompass.com">info@thecurriculumcompass.com</a>.
        </p>
      </article>
    </div>
  )
}
