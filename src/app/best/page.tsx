import Link from 'next/link'
import type { Metadata } from 'next'
import { bestPages, stateBestPages } from '@/data/bestPages'

export const metadata: Metadata = {
  title: 'Best Homeschool Curriculum Guides',
  description: 'Find the best homeschool curriculum by family priority, state, learning need, worldview, budget, teaching style, and grade level.',
  alternates: { canonical: '/best' },
  openGraph: { title: 'Best Homeschool Curriculum Guides', description: 'Best-fit homeschool curriculum guides by learning need, worldview, budget, teaching style, grade level, and state requirements.', url: '/best', type: 'website', images: ['/og-image.svg'] },
}

export default function BestHubPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Best-fit guides</p>
          <h1 className="mt-3 font-heading text-4xl sm:text-5xl">Best Homeschool Curriculum by Need</h1>
          <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">
            Start with the outcome you need most — worldview, learning difference, budget, teaching style, grade level, or state compliance — then compare the strongest curriculum fits.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-forest">Core buyer guides</p>
            <h2 className="mt-2 font-heading text-3xl text-forest-dark">Curriculum by family priority</h2>
          </div>
          <Link href="/homeschool-laws" className="hidden font-body text-sm font-bold text-forest sm:inline">Browse laws →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {bestPages.map((page) => (
            <Link key={page.slug} href={`/best/${page.slug}`} className="rounded-2xl border border-cream-darker bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h2 className="font-heading text-2xl text-forest-dark">{page.title}</h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray-700">{page.description}</p>
              <span className="mt-4 inline-block font-body text-sm font-bold text-forest">Read guide →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="rounded-3xl border border-cream-darker bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-forest">State-specific guides</p>
              <h2 className="mt-2 font-heading text-3xl text-forest-dark">Best curriculum by state</h2>
              <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-gray-600">Each state guide connects compliance workload — notice, portfolios, assessments, and records — to practical curriculum choices.</p>
            </div>
            <Link href="/homeschool-laws" className="font-body text-sm font-bold text-forest">View state laws →</Link>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {stateBestPages.map((page) => (
              <Link key={page.slug} href={`/best/${page.slug}`} className="rounded-xl bg-cream-dark px-4 py-3 font-body text-sm font-semibold text-forest-dark transition hover:bg-cream-darker">
                {page.title.replace('Best Homeschool Curriculum for ', '')} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
