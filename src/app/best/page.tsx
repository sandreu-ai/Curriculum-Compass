import Link from 'next/link'
import type { Metadata } from 'next'
import { bestPages } from '@/data/bestPages'

export const metadata: Metadata = {
  title: 'Best Homeschool Curriculum Guides',
  description: 'Find the best homeschool curriculum by family priority: Christian, secular, ADHD, dyslexia, open-and-go, affordable, Charlotte Mason, classical, online, and kindergarten.',
  alternates: { canonical: '/best' },
  openGraph: { title: 'Best Homeschool Curriculum Guides', description: 'Best-fit homeschool curriculum guides by learning need, worldview, budget, and teaching style.', url: '/best', type: 'website', images: ['/og-image.svg'] },
}

export default function BestHubPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Best-fit guides</p>
          <h1 className="mt-3 font-heading text-4xl sm:text-5xl">Best Homeschool Curriculum by Need</h1>
          <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">
            Start with the outcome you need most — worldview, learning difference, budget, teaching style, or grade level — then compare the strongest curriculum fits.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
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
    </div>
  )
}
