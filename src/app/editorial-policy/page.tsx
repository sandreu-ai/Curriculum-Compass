import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How The Curriculum Compass reviews homeschool curriculum, handles affiliate links, updates pages, and writes answer-first curriculum guidance.',
  alternates: { canonical: '/editorial-policy' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How does The Curriculum Compass choose curriculum recommendations?', acceptedAnswer: { '@type': 'Answer', text: 'Recommendations are organized by family fit: learning style, worldview, grade range, parent involvement, cost, structure, and common homeschool use cases. A program can be a strong fit for one family and a poor fit for another.' } },
    { '@type': 'Question', name: 'Does The Curriculum Compass use affiliate links?', acceptedAnswer: { '@type': 'Answer', text: 'Some outbound curriculum links may be affiliate links. Affiliate availability does not determine whether a curriculum can be listed, compared, or described with pros and cons.' } },
    { '@type': 'Question', name: 'How often is curriculum information updated?', acceptedAnswer: { '@type': 'Answer', text: 'Curriculum information is verified periodically, but families should always confirm current pricing, placement guidance, samples, refund policies, and availability on publisher websites before buying.' } },
  ],
}

const steps = [
  ['Fit before hype', 'We write toward specific family scenarios instead of naming a universal best curriculum.'],
  ['Visible tradeoffs', 'Pages include best-for, not-best-for, pros, cons, parent workload, faith orientation, cost, and grade range where available.'],
  ['Answer-first writing', 'Important pages start with direct answers and comparison tables so parents and answer engines can understand the recommendation quickly.'],
  ['Verification boundaries', 'Publisher pricing, availability, samples, and policies can change, so we point families back to official publisher pages before purchase.'],
]

export default function EditorialPolicyPage() {
  return (
    <article className="bg-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <header className="bg-forest-dark px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-green-300">Editorial policy</p>
          <h1 className="mt-3 font-heading text-4xl sm:text-5xl">How we review and recommend homeschool curriculum</h1>
          <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-green-100">
            Our goal is to help parents make better curriculum decisions by making fit, tradeoffs, and practical constraints easier to see.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <section className="rounded-2xl border border-cream-darker bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-forest-dark">Short answer</h2>
          <p className="mt-3 font-body leading-relaxed text-gray-700">
            We evaluate homeschool curriculum by family fit: learning needs, worldview, parent teaching time, structure, grade range, budget, and common use cases. We may earn affiliate commissions, but every guide should still explain tradeoffs and alternatives clearly.
          </p>
        </section>
        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {steps.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-cream-darker bg-white p-5">
              <h2 className="font-heading text-xl text-forest-dark">{title}</h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-gray-700">{body}</p>
            </div>
          ))}
        </section>
        <section className="mt-8 rounded-2xl border border-cream-darker bg-white p-6">
          <h2 className="font-heading text-2xl text-forest-dark">Corrections and updates</h2>
          <p className="mt-3 font-body leading-relaxed text-gray-700">
            If you see outdated curriculum details, pricing, broken links, or a recommendation that needs more nuance, contact us at <a className="font-bold text-forest underline" href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>.
          </p>
        </section>
      </div>
    </article>
  )
}
