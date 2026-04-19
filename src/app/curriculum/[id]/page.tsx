import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { curricula } from '@/data/curricula'
import TagBadge from '@/components/TagBadge'
import CurriculumCard from '@/components/CurriculumCard'
import type { Curriculum } from '@/types'

interface PageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  return curricula.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const curriculum = curricula.find((c) => c.id === params.id)
  if (!curriculum) return {}
  const title = `${curriculum.name} Review — Homeschool Curriculum`
  const description = `${curriculum.name} is ${curriculum.approach.toLowerCase()} homeschool curriculum for grades ${curriculum.gradeRange}, priced $${curriculum.price.low}–$${curriculum.price.high}/yr. ${curriculum.description}`.slice(0, 300)
  return {
    title,
    description,
    alternates: { canonical: `/curriculum/${curriculum.id}` },
    openGraph: {
      title: `${curriculum.name} — Homeschool Curriculum Review`,
      description,
      type: 'article',
      url: `/curriculum/${curriculum.id}`,
    },
  }
}

function getRelatedCurricula(current: Curriculum, limit = 3): Curriculum[] {
  const scored = curricula
    .filter((c) => c.id !== current.id)
    .map((c) => {
      const sharedTags = c.tags.filter((t) => current.tags.includes(t)).length
      const sameFaith = c.faithOrientation === current.faithOrientation ? 2 : 0
      return { c, score: sharedTags + sameFaith }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((x) => x.c)
}

export default function CurriculumDetailPage({ params }: PageProps) {
  const curriculum = curricula.find((c) => c.id === params.id)
  if (!curriculum) notFound()

  const FAITH_LABELS: Record<string, string> = {
    christian: 'Christian',
    catholic: 'Catholic',
    secular: 'Secular',
    jewish: 'Jewish',
    neutral: 'Faith-Neutral',
  }

  const related = getRelatedCurricula(curriculum)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: curriculum.name,
    description: curriculum.description,
    url: curriculum.websiteUrl,
    brand: { '@type': 'Brand', name: curriculum.name },
    category: `Homeschool Curriculum — ${curriculum.approach}`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: curriculum.price.low,
      highPrice: curriculum.price.high,
      priceCurrency: 'USD',
    },
  }

  const faithLabel = FAITH_LABELS[curriculum.faithOrientation] ?? curriculum.faithOrientation
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much does ${curriculum.name} cost?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${curriculum.name} runs about $${curriculum.price.low.toLocaleString()}–$${curriculum.price.high.toLocaleString()} per year. ${curriculum.price.note}`,
        },
      },
      {
        '@type': 'Question',
        name: `What grades does ${curriculum.name} cover?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${curriculum.name} covers grades ${curriculum.gradeRange}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is ${curriculum.name} faith-based or secular?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${curriculum.name} is ${faithLabel.toLowerCase()}. ${curriculum.description}`.slice(0, 500),
        },
      },
      {
        '@type': 'Question',
        name: `Is ${curriculum.name} a good fit for my family?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${curriculum.name} is best for families who value ${curriculum.pros.slice(0, 2).join(' and ').toLowerCase()}. Take our free quiz to see if it matches your learning style, budget, and priorities.`,
        },
      },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Directory', item: '/directory' },
      { '@type': 'ListItem', position: 3, name: curriculum.name, item: `/curriculum/${curriculum.id}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-cream min-h-screen">
        {/* Header */}
        <div className="bg-forest-dark text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-center gap-2 font-body text-sm text-green-300 mb-4">
              <Link href="/directory" className="hover:text-white transition-colors">
                ← Directory
              </Link>
              <span>/</span>
              <span className="text-green-400">{curriculum.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl sm:text-4xl text-white mb-2">
                  {curriculum.name}
                </h1>
                <p className="font-body text-green-200 text-lg">{curriculum.approach}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 text-center shrink-0">
                <div className="font-heading text-2xl text-white">
                  ${curriculum.price.low.toLocaleString()}
                  {curriculum.price.high !== curriculum.price.low && (
                    <>–${curriculum.price.high.toLocaleString()}</>
                  )}
                </div>
                <div className="font-body text-xs text-green-300">per year</div>
                <div className="font-body text-xs text-green-400 mt-1">{curriculum.price.note}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-3">About This Curriculum</h2>
                <p className="font-body text-gray-700 leading-relaxed">{curriculum.description}</p>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-3">At a Glance</h2>
                <div className="flex flex-wrap gap-2">
                  {curriculum.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} size="md" />
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-4">Strengths & Considerations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-body font-semibold text-forest text-sm uppercase tracking-wide mb-3">
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {curriculum.pros.map((pro, i) => (
                        <li key={i} className="flex gap-2.5 font-body text-sm text-gray-700">
                          <span className="text-forest font-bold mt-0.5 shrink-0">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-amber-600 text-sm uppercase tracking-wide mb-3">
                      Consider Before Buying
                    </h3>
                    <ul className="space-y-2">
                      {curriculum.cons.map((con, i) => (
                        <li key={i} className="flex gap-2.5 font-body text-sm text-gray-700">
                          <span className="text-amber-500 font-bold mt-0.5 shrink-0">–</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Quick facts */}
              <div className="bg-white rounded-2xl border border-cream-darker p-5">
                <h2 className="font-heading text-lg text-forest-dark mb-4">Quick Facts</h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="font-body text-xs text-gray-400 uppercase tracking-wide">Grade Range</dt>
                    <dd className="font-body text-sm text-gray-800 font-medium">{curriculum.gradeRange}</dd>
                  </div>
                  <div>
                    <dt className="font-body text-xs text-gray-400 uppercase tracking-wide">Faith Orientation</dt>
                    <dd className="font-body text-sm text-gray-800 font-medium">
                      {FAITH_LABELS[curriculum.faithOrientation] ?? curriculum.faithOrientation}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-body text-xs text-gray-400 uppercase tracking-wide">Annual Cost</dt>
                    <dd className="font-body text-sm text-gray-800 font-medium">
                      ${curriculum.price.low.toLocaleString()}–${curriculum.price.high.toLocaleString()}
                    </dd>
                    <dd className="font-body text-xs text-gray-400">{curriculum.price.note}</dd>
                  </div>
                  <div>
                    <dt className="font-body text-xs text-gray-400 uppercase tracking-wide">Approach</dt>
                    <dd className="font-body text-sm text-gray-800 font-medium">{curriculum.approach}</dd>
                  </div>
                </dl>
              </div>

              {/* CTA */}
              <div className="bg-forest rounded-2xl p-5 text-white">
                <h3 className="font-heading text-lg mb-2">Ready to learn more?</h3>
                <p className="font-body text-green-100 text-sm mb-4">
                  Visit the official {curriculum.name} website for current pricing, samples, and
                  ordering.
                </p>
                <a
                  href={curriculum.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-white text-forest font-body font-bold py-3 rounded-xl hover:bg-cream transition-colors duration-200 text-sm"
                >
                  Visit {curriculum.name} →
                </a>
              </div>

              {/* Not sure? */}
              <div className="bg-cream-dark rounded-2xl border border-cream-darker p-5">
                <h3 className="font-heading text-base text-forest-dark mb-2">Not sure yet?</h3>
                <p className="font-body text-sm text-gray-600 mb-3">
                  Take our free quiz to see if {curriculum.name} is your top match.
                </p>
                <Link
                  href="/quiz"
                  className="block w-full text-center btn-primary text-sm py-2.5"
                >
                  Take the Free Quiz
                </Link>
              </div>

              <p className="font-body text-xs text-gray-400 text-center">
                Data last verified {curriculum.lastVerified}. Always check the publisher&apos;s
                website for current pricing.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-10 bg-white rounded-2xl border border-cream-darker p-6 sm:p-8">
            <h2 className="font-heading text-2xl text-forest-dark mb-5">
              Frequently Asked Questions About {curriculum.name}
            </h2>
            <div className="space-y-4">
              {faqJsonLd.mainEntity.map((item, i) => (
                <details
                  key={i}
                  className="group border border-cream-darker rounded-xl p-4 open:bg-cream-dark/30"
                >
                  <summary className="font-heading text-base text-forest-dark cursor-pointer list-none flex justify-between items-center gap-4">
                    {item.name}
                    <span className="text-forest text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="font-body text-sm text-gray-700 leading-relaxed mt-3">
                    {item.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-2xl text-forest-dark mb-5">
                Curricula Similar to {curriculum.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((c) => (
                  <CurriculumCard key={c.id} curriculum={c} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
