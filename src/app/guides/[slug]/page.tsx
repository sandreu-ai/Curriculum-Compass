import Link from 'next/link'
import type { Metadata } from 'next'
import { allSupportingPages, getSupportingPageBySlug } from '@/data/topicalMap'

export function generateStaticParams() {
  return allSupportingPages.map((page) => ({ slug: page.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getSupportingPageBySlug(params.slug)
  if (!page) return { title: 'Guide Not Found' }
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/guides/${page.slug}` },
    robots: { index: false, follow: true },
    openGraph: { title: page.title, description: page.description, url: `/guides/${page.slug}`, type: 'article', images: ['/og-image.png'] },
  }
}

export default function SupportingGuidePage({ params }: { params: { slug: string } }) {
  const page = getSupportingPageBySlug(params.slug)
  if (!page) return null
  const faqs = [
    { question: `What should I compare before choosing ${page.title.replace(/^Best /, '').toLowerCase()}?`, answer: 'Compare parent prep, structure, child independence, faith/worldview fit, reading load, hands-on level, price, flexibility, and special-needs fit before buying.' },
    { question: 'Should I choose one all-in-one curriculum or mix subjects?', answer: 'All-in-one programs reduce planning, but mixing subjects often gives a stronger fit for math, reading, writing, and learning needs. Start with your hardest subject first.' },
  ]
  const jsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }

  return (
    <div className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Link href={page.hubPath} className="font-body text-sm font-bold text-green-300">← {page.hubTitle}</Link>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl">{page.title}</h1>
          <p className="mt-4 font-body text-lg leading-relaxed text-green-100">{page.description}</p>
        </div>
      </section>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-cream-darker bg-white p-6 shadow-sm sm:p-8">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-forest">Decision angle</p>
          <h2 className="mt-2 font-heading text-3xl text-forest-dark">How to use this guide</h2>
          <p className="mt-4 font-body leading-relaxed text-gray-700">{page.suggestedAngle}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {['Parent prep', 'Structure', 'Independence', 'Faith alignment', 'Hands-on level', 'Reading load', 'Cost', 'Flexibility'].map((criterion) => (
              <div key={criterion} className="rounded-2xl bg-cream-dark p-4">
                <h3 className="font-heading text-lg text-forest-dark">{criterion}</h3>
                <p className="mt-1 font-body text-sm text-gray-700">Score each option against your family before buying.</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/tools/curriculum-comparison-matrix" className="rounded-xl bg-forest px-5 py-3 text-center font-body font-bold text-white">Use the comparison matrix</Link>
            <Link href="/quiz" className="rounded-xl border border-forest px-5 py-3 text-center font-body font-bold text-forest">Take the quiz</Link>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-cream-darker bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-heading text-3xl text-forest-dark">FAQ</h2>
          <div className="mt-4 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl bg-cream-dark p-4">
                <h3 className="font-heading text-lg text-forest-dark">{faq.question}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
