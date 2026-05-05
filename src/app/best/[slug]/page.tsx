import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CurriculumCard from '@/components/CurriculumCard'
import { bestPages, getBestPageBySlug, getBestPageCurricula } from '@/data/bestPages'
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig'

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  return bestPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getBestPageBySlug(params.slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/best/${page.slug}` },
    openGraph: { title: page.title, description: page.description, url: `/best/${page.slug}`, type: 'article', images: ['/og-image.svg'] },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: ['/og-image.svg'] },
  }
}

export default function BestPage({ params }: PageProps) {
  const page = getBestPageBySlug(params.slug)
  if (!page) notFound()
  const selectedCurricula = getBestPageCurricula(page)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  }

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: page.title,
    description: page.description,
    url: `${SITE_URL}/best/${page.slug}`,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <article className="bg-cream min-h-screen">
        <header className="bg-forest-dark px-4 py-12 text-white sm:px-6">
          <div className="mx-auto max-w-5xl">
            <Link href="/best" className="font-body text-sm text-green-300 hover:text-white">← All best-fit guides</Link>
            <h1 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-green-100">{page.description}</p>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <section className="rounded-2xl border border-cream-darker bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl text-forest-dark">Who this guide is for</h2>
            <p className="mt-3 font-body leading-relaxed text-gray-700">{page.audience}</p>
            <h2 className="mt-6 font-heading text-2xl text-forest-dark">How we chose these options</h2>
            <ul className="mt-3 grid gap-2 font-body text-sm text-gray-700 sm:grid-cols-2">
              {page.criteria.map((criterion) => <li key={criterion} className="flex gap-2"><span className="text-forest">✓</span>{criterion}</li>)}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="mb-5 font-heading text-3xl text-forest-dark">Top picks</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {selectedCurricula.map((curriculum, index) => <CurriculumCard key={curriculum.id} curriculum={curriculum} rank={index + 1} compact />)}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-cream-darker bg-white p-6">
            <h2 className="font-heading text-2xl text-forest-dark">Buying advice</h2>
            <p className="mt-3 font-body leading-relaxed text-gray-700">{page.buyingAdvice}</p>
            <p className="mt-3 font-body leading-relaxed text-gray-700">
              Before purchasing, read samples, check placement guidance, and compare the program against your parent bandwidth. The best curriculum is the one you can actually use consistently.
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-cream-darker bg-white p-6">
            <h2 className="font-heading text-2xl text-forest-dark">FAQ</h2>
            <div className="mt-4 space-y-4">
              {page.faqs.map((faq) => (
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
