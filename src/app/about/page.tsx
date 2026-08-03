import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'About The Curriculum Compass',
  description: 'Learn how The Curriculum Compass helps homeschool families compare curriculum by learning style, worldview, parent involvement, budget, grade level, and state requirements.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About The Curriculum Compass', description: 'Our mission, review process, and homeschool curriculum decision framework.', url: '/about', type: 'website' },
}

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About The Curriculum Compass',
  url: `${SITE_URL}/about`,
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
  about: ['homeschool curriculum comparison', 'curriculum matching quiz', 'homeschool decision tools'],
}

const principles = [
  'We explain who each curriculum is best for and who should probably skip it.',
  'We separate worldview fit, learning needs, parent workload, budget, and grade coverage instead of pretending one curriculum is best for everyone.',
  'We update curriculum pages periodically and ask families to verify current prices, samples, and policies on publisher sites before purchasing.',
  'Affiliate relationships may support the site, but they do not replace practical fit, visible pros and cons, or parent decision criteria.',
]

export default function AboutPage() {
  return (
    <article className="bg-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <header className="bg-forest-dark px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-green-300">About</p>
          <h1 className="mt-3 font-heading text-4xl sm:text-5xl">Helping parents choose curriculum with less overwhelm</h1>
          <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-green-100">
            The Curriculum Compass is a homeschool curriculum decision site for families comparing programs by learning style, worldview, parent involvement, budget, grade level, and state requirements.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <section className="rounded-2xl border border-cream-darker bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-forest-dark">Quick answer</h2>
          <p className="mt-3 font-body leading-relaxed text-gray-700">
            The Curriculum Compass exists to help homeschool families narrow a huge curriculum market into a small, realistic shortlist. Parents can take the free quiz, browse curriculum reviews, compare popular programs, and use decision tools before buying.
          </p>
        </section>
        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle} className="rounded-2xl border border-cream-darker bg-white p-5">
              <p className="font-body leading-relaxed text-gray-700"><span className="font-bold text-forest">✓ </span>{principle}</p>
            </div>
          ))}
        </section>
        <section className="mt-8 rounded-2xl border border-cream-darker bg-white p-6">
          <h2 className="font-heading text-2xl text-forest-dark">What we help families answer</h2>
          <ul className="mt-4 space-y-2 font-body text-gray-700">
            <li>What homeschool curriculum fits my child’s learning style?</li>
            <li>Which curriculum is best for ADHD, dyslexia, reluctant readers, or independent learners?</li>
            <li>Should we choose Christian, Catholic, secular, classical, Charlotte Mason, online, or open-and-go materials?</li>
            <li>How much parent teaching time and annual budget should we expect?</li>
            <li>What state compliance details should we check before we start?</li>
          </ul>
        </section>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/quiz" className="btn-primary text-center">Take the free quiz</Link>
          <Link href="/editorial-policy" className="btn-secondary text-center">Read our editorial policy</Link>
        </div>
      </div>
    </article>
  )
}
