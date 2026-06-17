import Link from 'next/link'
import type { Metadata } from 'next'
import { topicHubs } from '@/data/topicalMap'
import { SITE_URL } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Guides — Reviews, Comparisons & Planning Help',
  description:
    'Explore homeschool curriculum guides by teaching style, learning need, grade level, budget, worldview, online options, state requirements, reviews, and comparisons.',
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Homeschool Curriculum Guides',
    description:
      'A parent-friendly guide hub for choosing homeschool curriculum by fit, budget, learning need, worldview, grade level, and state context.',
    url: '/guides',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Homeschool Curriculum Guides',
    description: 'Browse homeschool curriculum reviews, comparisons, best-fit guides, state law context, and planning tools.',
    images: ['/og-image.png'],
  },
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Homeschool Curriculum Guides',
  itemListElement: topicHubs.map((hub, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: hub.title,
    url: `${SITE_URL}${hub.path}`,
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
  ],
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Homeschool curriculum guide hub</p>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl sm:text-5xl">Homeschool Curriculum Guides</h1>
          <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">
            Start here when you need more than a generic list. These guides organize curriculum reviews, comparisons, best-fit recommendations, planning tools, and state-law context by the way real families make decisions.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/quiz" className="rounded-xl bg-cream px-5 py-3 text-center font-body font-bold text-forest-dark transition hover:bg-cream-dark">
              Take the free curriculum quiz
            </Link>
            <Link href="/tools/curriculum-comparison-matrix" className="rounded-xl border border-green-200/70 px-5 py-3 text-center font-body font-bold text-white transition hover:bg-white/10">
              Open the comparison matrix
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topicHubs.map((hub) => (
            <Link key={hub.slug} href={hub.path} className="rounded-2xl border border-cream-darker bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-forest-light">{hub.eyebrow}</p>
              <h2 className="mt-2 font-heading text-2xl text-forest-dark">{hub.title}</h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray-700">{hub.description}</p>
              <ul className="mt-4 space-y-1 font-body text-sm text-gray-600">
                {hub.pillars.slice(0, 3).map((pillar) => (
                  <li key={pillar}>• {pillar}</li>
                ))}
              </ul>
              <p className="mt-4 font-body text-sm font-bold text-forest">Explore {hub.title.toLowerCase()} →</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
