import Link from 'next/link'
import type { Metadata } from 'next'
import { topicHubs, allSupportingPages } from '@/data/topicalMap'

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Topical Map',
  description: 'A curriculum decision library organized by best curriculum guides, reviews, comparisons, laws, styles, learning needs, grade levels, budget, worldview, online curriculum, and planning tools.',
  alternates: { canonical: '/topical-map' },
}

export default function TopicalMapPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Curriculum decision library</p>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl sm:text-5xl">Homeschool Curriculum Topical Map</h1>
          <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">
            The site is organized around one clear promise: helping parents choose homeschool curriculum. These hubs cluster buyer-intent guides, reviews, comparisons, compliance pages, and planning tools.
          </p>
          <p className="mt-4 font-body text-sm text-green-200">{topicHubs.length} hubs · {allSupportingPages.length} supporting page briefs · tools and proprietary score data built into the library</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topicHubs.map((hub) => (
            <Link key={hub.slug} href={hub.path} className="rounded-2xl border border-cream-darker bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-forest-light">{hub.eyebrow}</p>
              <h2 className="mt-2 font-heading text-2xl text-forest-dark">{hub.title}</h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray-700">{hub.description}</p>
              <p className="mt-4 font-body text-sm font-bold text-forest">{hub.supportingPages.length} supporting pages →</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
