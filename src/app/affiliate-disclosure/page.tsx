import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How affiliate links and commissions work on The Curriculum Compass homeschool curriculum reviews and quiz.',
  alternates: { canonical: '/affiliate-disclosure' },
}

const updated = 'June 7, 2026'

export default function AffiliateDisclosurePage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-gradient-to-br from-forest-dark to-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <p className="font-body text-green-200 text-sm uppercase tracking-wide mb-3">Disclosure</p>
          <h1 className="font-heading text-4xl sm:text-5xl text-white mb-4">Affiliate Disclosure</h1>
          <p className="font-body text-green-100 text-lg leading-relaxed max-w-3xl">
            The Curriculum Compass may earn commissions from some curriculum links. This page explains
            what that means and how we protect recommendation integrity.
          </p>
          <p className="font-body text-green-200 text-sm mt-4">Last updated: {updated}</p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 prose prose-green prose-headings:font-heading prose-headings:text-forest-dark prose-p:font-body prose-p:text-gray-700 prose-li:font-body prose-li:text-gray-700">
        <h2>Short version</h2>
        <p>
          Some links on The Curriculum Compass are affiliate links. If you click one of those links and
          buy a curriculum, we may earn a commission at no additional cost to you.
        </p>

        <h2>How recommendations are made</h2>
        <p>
          Quiz matches are based on fit signals such as worldview preference, budget range, grade range,
          learning style, parent involvement, structure, and curriculum attributes. Affiliate status is
          not intended to override fit. A curriculum can be recommended because it fits your answers even
          if we do not have an affiliate relationship with that publisher.
        </p>

        <h2>Why affiliate links exist</h2>
        <p>
          Affiliate revenue helps keep the quiz, reviews, comparison pages, state-law guides, and
          planning tools free for homeschool families. It also helps fund ongoing verification of
          curriculum details, pricing ranges, and publisher resources.
        </p>

        <h2>What you should verify before buying</h2>
        <ul>
          <li>Current publisher pricing, shipping, refunds, and subscription terms.</li>
          <li>Grade placement, samples, teacher guides, and required materials.</li>
          <li>Whether the curriculum fits your state requirements, recordkeeping needs, and family schedule.</li>
          <li>Whether faith-based, secular, or neutral content matches your household preferences.</li>
        </ul>

        <h2>Current affiliate posture</h2>
        <p>
          We only install tracking links that come from official publisher programs, approved affiliate
          networks, or direct publisher communications. Generic homepage links may appear for publishers
          where no approved affiliate link is active yet.
        </p>

        <h2>Questions</h2>
        <p>
          If you have questions about an affiliate relationship or believe a link is incorrect, contact
          us at <a href="mailto:info@thecurriculumcompass.com">info@thecurriculumcompass.com</a>.
        </p>
      </article>
    </div>
  )
}
