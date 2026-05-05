import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { curricula } from '@/data/curricula'
import { getComparisonsForCurriculum } from '@/data/comparisons'
import TagBadge from '@/components/TagBadge'
import CurriculumCard from '@/components/CurriculumCard'
import {
  FAITH_LABELS,
  buildCurriculumMetaDescription,
  getAlternativeSummary,
  getFitSummary,
  getParentPrep,
  getRelatedCurricula,
  getReviewDateLabel,
  getTypicalDay,
} from '@/lib/curriculumSeo'
import { SITE_URL } from '@/lib/siteConfig'

interface PageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  return curricula.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const curriculum = curricula.find((c) => c.id === params.id)
  if (!curriculum) return {}
  const title = `${curriculum.name} Review — Cost, Pros, Cons & Best Fit`
  const description = buildCurriculumMetaDescription(curriculum)
  return {
    title,
    description,
    alternates: { canonical: `/curriculum/${curriculum.id}` },
    openGraph: {
      title: `${curriculum.name} Homeschool Curriculum Review`,
      description,
      type: 'article',
      url: `/curriculum/${curriculum.id}`,
      images: ['/og-image.svg'],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.svg'] },
  }
}

export default function CurriculumDetailPage({ params }: PageProps) {
  const curriculum = curricula.find((c) => c.id === params.id)
  if (!curriculum) notFound()

  const related = getRelatedCurricula(curriculum, curricula)
  const comparisons = getComparisonsForCurriculum(curriculum.id)
  const faithLabel = FAITH_LABELS[curriculum.faithOrientation] ?? curriculum.faithOrientation
  const reviewDate = getReviewDateLabel(curriculum)

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
      availability: 'https://schema.org/InStock',
    },
  }

  const faqItems = [
    {
      question: `How much does ${curriculum.name} cost?`,
      answer: `${curriculum.name} runs about $${curriculum.price.low.toLocaleString()}–$${curriculum.price.high.toLocaleString()} per year. ${curriculum.price.note}`,
    },
    {
      question: `What grades does ${curriculum.name} cover?`,
      answer: `${curriculum.name} covers grades ${curriculum.gradeRange}. Always check the publisher's current placement guidance before buying.`,
    },
    {
      question: `Is ${curriculum.name} faith-based or secular?`,
      answer: `${curriculum.name} is ${faithLabel.toLowerCase()}. ${curriculum.description}`.slice(0, 500),
    },
    {
      question: `Who is ${curriculum.name} best for?`,
      answer: getFitSummary(curriculum),
    },
    {
      question: `Who should avoid ${curriculum.name}?`,
      answer: getAlternativeSummary(curriculum),
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Directory', item: `${SITE_URL}/directory` },
      { '@type': 'ListItem', position: 3, name: curriculum.name, item: `${SITE_URL}/curriculum/${curriculum.id}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="bg-cream min-h-screen">
        <div className="bg-forest-dark text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-center gap-2 font-body text-sm text-green-300 mb-4">
              <Link href="/directory" className="hover:text-white transition-colors">← Directory</Link>
              <span>/</span>
              <span className="text-green-400">{curriculum.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Homeschool curriculum review</p>
                <h1 className="font-heading text-3xl sm:text-4xl text-white mt-2 mb-2">{curriculum.name}</h1>
                <p className="font-body text-green-200 text-lg">{curriculum.approach}</p>
                <p className="mt-3 font-body text-sm text-green-100">Last reviewed {reviewDate} · Price last checked {reviewDate}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 text-center shrink-0">
                <div className="font-heading text-2xl text-white">
                  ${curriculum.price.low.toLocaleString()}
                  {curriculum.price.high !== curriculum.price.low && <>–${curriculum.price.high.toLocaleString()}</>}
                </div>
                <div className="font-body text-xs text-green-300">per year</div>
                <div className="font-body text-xs text-green-400 mt-1">{curriculum.price.note}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-3">About This Curriculum</h2>
                <p className="font-body text-gray-700 leading-relaxed">{curriculum.description}</p>
                <p className="font-body text-gray-700 leading-relaxed mt-4">This review looks at who {curriculum.name} fits best, who should compare alternatives, what a normal day can look like, parent prep, cost, and similar programs to consider.</p>
              </section>

              <section className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-3">Who This Fits Best</h2>
                <p className="font-body text-gray-700 leading-relaxed">{getFitSummary(curriculum)}</p>
              </section>

              <section className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-3">Who Should Consider an Alternative</h2>
                <p className="font-body text-gray-700 leading-relaxed">{getAlternativeSummary(curriculum)}</p>
              </section>

              <section className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-3">What a Typical Day Looks Like</h2>
                <p className="font-body text-gray-700 leading-relaxed">{getTypicalDay(curriculum)}</p>
              </section>

              <section className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-3">Parent Prep Required</h2>
                <p className="font-body text-gray-700 leading-relaxed">{getParentPrep(curriculum)}</p>
              </section>

              <section className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-3">At a Glance</h2>
                <div className="flex flex-wrap gap-2">{curriculum.tags.map((tag) => <TagBadge key={tag} tag={tag} size="md" />)}</div>
              </section>

              <section className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-4">Strengths & Considerations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-body font-semibold text-forest text-sm uppercase tracking-wide mb-3">Strengths</h3>
                    <ul className="space-y-2">{curriculum.pros.map((pro) => <li key={pro} className="flex gap-2.5 font-body text-sm text-gray-700"><span className="text-forest font-bold mt-0.5 shrink-0">✓</span><span>{pro}</span></li>)}</ul>
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-amber-600 text-sm uppercase tracking-wide mb-3">Consider Before Buying</h3>
                    <ul className="space-y-2">{curriculum.cons.map((con) => <li key={con} className="flex gap-2.5 font-body text-sm text-gray-700"><span className="text-amber-500 font-bold mt-0.5 shrink-0">–</span><span>{con}</span></li>)}</ul>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-cream-darker p-6">
                <h2 className="font-heading text-xl text-forest-dark mb-3">Best Alternatives</h2>
                <p className="font-body text-sm text-gray-700 leading-relaxed mb-4">If {curriculum.name} is close but not quite right, compare it against curricula with similar tags, worldview, or teaching style.</p>
                <div className="grid gap-4 sm:grid-cols-3">{related.map((c) => <CurriculumCard key={c.id} curriculum={c} compact />)}</div>
              </section>

              {comparisons.length > 0 && (
                <section className="bg-white rounded-2xl border border-cream-darker p-6">
                  <h2 className="font-heading text-xl text-forest-dark mb-3">Compared With Similar Curricula</h2>
                  <ul className="space-y-3 font-body text-sm text-gray-700">
                    {comparisons.map((comparison) => <li key={comparison.slug}><Link href={`/compare/${comparison.slug}`} className="font-semibold text-forest underline">{comparison.title}</Link></li>)}
                  </ul>
                </section>
              )}
            </div>

            <aside className="space-y-5">
              <div className="bg-white rounded-2xl border border-cream-darker p-5">
                <h2 className="font-heading text-lg text-forest-dark mb-4">Quick Facts</h2>
                <dl className="space-y-3">
                  <div><dt className="font-body text-xs text-gray-400 uppercase tracking-wide">Grade Range</dt><dd className="font-body text-sm text-gray-800 font-medium">{curriculum.gradeRange}</dd></div>
                  <div><dt className="font-body text-xs text-gray-400 uppercase tracking-wide">Faith Orientation</dt><dd className="font-body text-sm text-gray-800 font-medium">{faithLabel}</dd></div>
                  <div><dt className="font-body text-xs text-gray-400 uppercase tracking-wide">Annual Cost</dt><dd className="font-body text-sm text-gray-800 font-medium">${curriculum.price.low.toLocaleString()}–${curriculum.price.high.toLocaleString()}</dd><dd className="font-body text-xs text-gray-400">{curriculum.price.note}</dd></div>
                  <div><dt className="font-body text-xs text-gray-400 uppercase tracking-wide">Approach</dt><dd className="font-body text-sm text-gray-800 font-medium">{curriculum.approach}</dd></div>
                  <div><dt className="font-body text-xs text-gray-400 uppercase tracking-wide">Last Reviewed</dt><dd className="font-body text-sm text-gray-800 font-medium">{reviewDate}</dd></div>
                </dl>
              </div>

              <div className="bg-forest rounded-2xl p-5 text-white">
                <h3 className="font-heading text-lg mb-2">Ready to learn more?</h3>
                <p className="font-body text-green-100 text-sm mb-4">Visit the official {curriculum.name} website for current pricing, samples, and ordering.</p>
                <a href={curriculum.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="block w-full text-center bg-white text-forest font-body font-bold py-3 rounded-xl hover:bg-cream transition-colors duration-200 text-sm">Visit {curriculum.name} →</a>
              </div>

              <div className="bg-cream-dark rounded-2xl border border-cream-darker p-5">
                <h3 className="font-heading text-base text-forest-dark mb-2">Not sure yet?</h3>
                <p className="font-body text-sm text-gray-600 mb-3">Take our free quiz to see if {curriculum.name} is your top match.</p>
                <Link href="/quiz" className="block w-full text-center btn-primary text-sm py-2.5">Take the Free Quiz</Link>
              </div>

              <p className="font-body text-xs text-gray-400 text-center">Data last verified {curriculum.lastVerified}. Always check the publisher&apos;s website for current pricing.</p>
            </aside>
          </div>

          <section className="mt-10 bg-white rounded-2xl border border-cream-darker p-6 sm:p-8">
            <h2 className="font-heading text-2xl text-forest-dark mb-5">Frequently Asked Questions About {curriculum.name}</h2>
            <div className="space-y-4">
              {faqItems.map((item) => <details key={item.question} className="group border border-cream-darker rounded-xl p-4 open:bg-cream-dark/30"><summary className="font-heading text-base text-forest-dark cursor-pointer list-none flex justify-between items-center gap-4">{item.question}<span className="text-forest text-xl transition-transform group-open:rotate-45">+</span></summary><p className="font-body text-sm text-gray-700 leading-relaxed mt-3">{item.answer}</p></details>)}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
