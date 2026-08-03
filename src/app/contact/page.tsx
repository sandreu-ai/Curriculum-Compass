import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Contact The Curriculum Compass',
  description: 'Contact The Curriculum Compass for curriculum corrections, publisher updates, reader questions, and partnership inquiries.',
  alternates: { canonical: '/contact' },
}

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact The Curriculum Compass',
  url: `${SITE_URL}/contact`,
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
  mainEntity: { '@type': 'Organization', name: SITE_NAME, email: SITE_CONTACT_EMAIL, url: SITE_URL },
}

export default function ContactPage() {
  return (
    <article className="bg-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <header className="bg-forest-dark px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-green-300">Contact</p>
          <h1 className="mt-3 font-heading text-4xl sm:text-5xl">Questions, corrections, and curriculum updates</h1>
          <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-green-100">
            Send curriculum corrections, publisher updates, reader questions, and partnership notes to the editorial team.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <section className="rounded-2xl border border-cream-darker bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-forest-dark">Email</h2>
          <p className="mt-3 font-body leading-relaxed text-gray-700">
            Reach us at <a className="font-bold text-forest underline" href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>.
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-gray-600">
            For curriculum corrections, please include the curriculum name, the page URL, what changed, and the official publisher source if available.
          </p>
        </section>
        <section className="mt-8 rounded-2xl border border-cream-darker bg-white p-6">
          <h2 className="font-heading text-2xl text-forest-dark">Common reasons to contact us</h2>
          <ul className="mt-4 space-y-2 font-body text-gray-700">
            <li>Correct outdated pricing, grade ranges, or publisher details.</li>
            <li>Suggest a curriculum that should be reviewed or compared.</li>
            <li>Report a broken affiliate or publisher link.</li>
            <li>Ask about partnerships, affiliate programs, or editorial updates.</li>
          </ul>
        </section>
      </div>
    </article>
  )
}
