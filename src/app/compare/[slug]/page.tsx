import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import TagBadge from '@/components/TagBadge'
import { comparisons, getComparisonBySlug, getComparisonCurricula } from '@/data/comparisons'
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig'
import { FAITH_LABELS, getParentPrep } from '@/lib/curriculumSeo'

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const comparison = getComparisonBySlug(params.slug)
  if (!comparison) return {}
  const [a, b] = getComparisonCurricula(comparison)
  const description = `Compare ${a.name} vs ${b.name}: cost, grade range, faith fit, parent prep, pros, cons, and which homeschool families each curriculum fits best.`
  return {
    title: comparison.title,
    description,
    alternates: { canonical: `/compare/${comparison.slug}` },
    openGraph: { title: comparison.title, description, url: `/compare/${comparison.slug}`, type: 'article', images: ['/og-image.svg'] },
    twitter: { card: 'summary_large_image', title: comparison.title, description, images: ['/og-image.svg'] },
  }
}

function ComparisonTable({ comparison }: { comparison: NonNullable<ReturnType<typeof getComparisonBySlug>> }) {
  const [a, b] = getComparisonCurricula(comparison)
  const rows = [
    ['Best fit', comparison.bestForA[0], comparison.bestForB[0]],
    ['Approach', a.approach, b.approach],
    ['Grade range', a.gradeRange, b.gradeRange],
    ['Faith fit', FAITH_LABELS[a.faithOrientation] ?? a.faithOrientation, FAITH_LABELS[b.faithOrientation] ?? b.faithOrientation],
    ['Typical annual cost', `$${a.price.low.toLocaleString()}–$${a.price.high.toLocaleString()}`, `$${b.price.low.toLocaleString()}–$${b.price.high.toLocaleString()}`],
    ['Parent prep', getParentPrep(a), getParentPrep(b)],
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-cream-darker bg-white">
      <div className="grid grid-cols-3 bg-forest-dark text-white">
        <div className="p-4 font-body text-sm font-semibold">Decision factor</div>
        <div className="p-4 font-body text-sm font-semibold">{a.name}</div>
        <div className="p-4 font-body text-sm font-semibold">{b.name}</div>
      </div>
      {rows.map(([label, valueA, valueB]) => (
        <div key={label} className="grid grid-cols-3 border-t border-cream-darker">
          <div className="bg-cream-dark p-4 font-body text-sm font-bold text-forest-dark">{label}</div>
          <div className="p-4 font-body text-sm leading-relaxed text-gray-700">{valueA}</div>
          <div className="p-4 font-body text-sm leading-relaxed text-gray-700">{valueB}</div>
        </div>
      ))}
    </div>
  )
}

export default function ComparisonPage({ params }: PageProps) {
  const comparison = getComparisonBySlug(params.slug)
  if (!comparison) notFound()
  const [a, b] = getComparisonCurricula(comparison)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comparison.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: `${SITE_URL}/compare` },
      { '@type': 'ListItem', position: 3, name: comparison.title, item: `${SITE_URL}/compare/${comparison.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article className="bg-cream min-h-screen">
        <header className="bg-forest-dark text-white px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <Link href="/compare" className="font-body text-sm text-green-300 hover:text-white">← All comparisons</Link>
            <h1 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl">{comparison.title}</h1>
            <p className="mt-5 font-body text-lg leading-relaxed text-green-100">{comparison.intro}</p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <section className="rounded-2xl border border-cream-darker bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl text-forest-dark">Quick verdict</h2>
            <p className="mt-3 font-body text-gray-700 leading-relaxed">{comparison.verdict}</p>
          </section>

          <section className="mt-8">
            <h2 className="mb-4 font-heading text-2xl text-forest-dark">Side-by-side comparison</h2>
            <ComparisonTable comparison={comparison} />
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-2">
            {[{ curriculum: a, points: comparison.bestForA }, { curriculum: b, points: comparison.bestForB }].map(({ curriculum, points }) => (
              <div key={curriculum.id} className="rounded-2xl border border-cream-darker bg-white p-6">
                <h2 className="font-heading text-xl text-forest-dark">Choose {curriculum.name} if…</h2>
                <div className="mt-3 flex flex-wrap gap-2">{curriculum.tags.slice(0, 5).map((tag) => <TagBadge key={tag} tag={tag} />)}</div>
                <ul className="mt-4 space-y-2 font-body text-sm text-gray-700">
                  {points.map((point) => <li key={point} className="flex gap-2"><span className="text-forest">✓</span>{point}</li>)}
                </ul>
                <Link href={`/curriculum/${curriculum.id}`} className="mt-5 inline-block font-body text-sm font-bold text-forest">Read {curriculum.name} review →</Link>
              </div>
            ))}
          </section>

          <section className="mt-8 rounded-2xl border border-cream-darker bg-white p-6">
            <h2 className="font-heading text-2xl text-forest-dark">Key differences parents notice</h2>
            <ul className="mt-4 space-y-3 font-body text-gray-700">
              {comparison.keyDifferences.map((difference) => <li key={difference} className="flex gap-3"><span className="text-forest font-bold">•</span>{difference}</li>)}
            </ul>
          </section>

          <section className="mt-8 rounded-2xl border border-cream-darker bg-white p-6">
            <h2 className="font-heading text-2xl text-forest-dark">FAQ</h2>
            <div className="mt-4 space-y-4">
              {comparison.faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-cream-darker p-4">
                  <summary className="cursor-pointer font-body font-semibold text-forest-dark">{faq.question}</summary>
                  <p className="mt-3 font-body text-sm leading-relaxed text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
