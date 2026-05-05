import Link from 'next/link'
import type { Metadata } from 'next'
import { comparisons, getComparisonCurricula } from '@/data/comparisons'

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Comparisons',
  description: 'Compare popular homeschool curriculum side by side by cost, teaching style, faith fit, structure, parent prep, and best-fit families.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'Homeschool Curriculum Comparisons',
    description: 'Side-by-side homeschool curriculum comparisons for high-intent parent decisions.',
    url: '/compare',
    type: 'website',
    images: ['/og-image.svg'],
  },
}

export default function CompareHubPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-forest-dark text-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Side-by-side guides</p>
          <h1 className="mt-3 font-heading text-4xl sm:text-5xl">Homeschool Curriculum Comparisons</h1>
          <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">
            Compare popular homeschool curriculum options by structure, worldview, cost, parent prep, grade range, and learning style before you buy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {comparisons.map((comparison) => {
            const [a, b] = getComparisonCurricula(comparison)
            return (
              <Link key={comparison.slug} href={`/compare/${comparison.slug}`} className="rounded-2xl border border-cream-darker bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-forest-light">{a.name} vs {b.name}</p>
                <h2 className="mt-2 font-heading text-2xl text-forest-dark">{comparison.title}</h2>
                <p className="mt-3 font-body text-sm leading-relaxed text-gray-700">{comparison.intro}</p>
                <span className="mt-4 inline-block font-body text-sm font-bold text-forest">Read comparison →</span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
