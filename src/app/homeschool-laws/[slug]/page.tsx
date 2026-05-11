import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { stateLaws } from '@/data/stateLaws'
import { getComplianceChecklist, getRequirementLevelLabel, getStateCurriculumFitSummary, getStateSlug } from '@/lib/stateLawSeo'
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig'

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  return stateLaws.map((state) => ({ slug: getStateSlug(state.state) }))
}

function getStateBySlug(slug: string) {
  return stateLaws.find((state) => getStateSlug(state.state) === slug)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const state = getStateBySlug(params.slug)
  if (!state) return {}
  const title = `${state.state} Homeschool Laws — Requirements, Notice & Records`
  const description = `Understand ${state.state} homeschool requirements: notice, portfolio, assessment, teacher qualifications, official source, and curriculum planning tips.`
  return {
    title,
    description,
    alternates: { canonical: `/homeschool-laws/${getStateSlug(state.state)}` },
    openGraph: { title, description, url: `/homeschool-laws/${getStateSlug(state.state)}`, type: 'article', images: ['/og-image.svg'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.svg'] },
  }
}

export default function StateHomeschoolLawPage({ params }: PageProps) {
  const state = getStateBySlug(params.slug)
  if (!state) notFound()

  const checklist = getComplianceChecklist(state)
  const stateBestSlug = `${getStateSlug(state.state)}-homeschool-curriculum`
  const faqItems = [
    {
      question: `Do I need to notify anyone to homeschool in ${state.state}?`,
      answer: state.noticeRequired
        ? `${state.state} requires some form of notice, filing, registration, or approval according to this quick-reference data. Confirm the current process with the official state source.`
        : `${state.state} does not require routine notice in this quick-reference data, but families should still keep basic records and verify current law before starting.`,
    },
    {
      question: `Does ${state.state} require a homeschool portfolio or assessment?`,
      answer: `${state.state} portfolio required: ${state.portfolioRequired ? 'yes' : 'no'}. Assessment required: ${state.assessmentRequired ? 'yes' : 'no'}. Requirements can change, so verify before relying on this summary.`,
    },
    {
      question: `What curriculum works best for ${state.state} homeschool families?`,
      answer: getStateCurriculumFitSummary(state),
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Homeschool Laws', item: `${SITE_URL}/homeschool-laws` },
      { '@type': 'ListItem', position: 3, name: `${state.state} Homeschool Laws`, item: `${SITE_URL}/homeschool-laws/${getStateSlug(state.state)}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article className="min-h-screen bg-cream">
        <header className="bg-forest-dark px-4 py-12 text-white sm:px-6">
          <div className="mx-auto max-w-4xl">
            <Link href="/homeschool-laws" className="font-body text-sm text-green-300 hover:text-white">← All state laws</Link>
            <p className="mt-5 font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">{getRequirementLevelLabel(state)} state</p>
            <h1 className="mt-3 font-heading text-4xl leading-tight sm:text-5xl">{state.state} Homeschool Laws and Requirements</h1>
            <p className="mt-5 font-body text-lg leading-relaxed text-green-100">A practical starting point for notice, portfolio, assessment, teacher qualification, and curriculum planning in {state.state}.</p>
          </div>
        </header>

        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-2xl border border-cream-darker bg-white p-6">
              <h2 className="font-heading text-2xl text-forest-dark">Quick summary</h2>
              <p className="mt-3 font-body leading-relaxed text-gray-700">{state.requirements}</p>
              <p className="mt-4 font-body text-sm text-gray-500">Last reviewed {state.lastVerified}. This page is a planning aid, not legal advice.</p>
            </section>

            <section className="rounded-2xl border border-cream-darker bg-white p-6">
              <h2 className="font-heading text-2xl text-forest-dark">Compliance checklist</h2>
              <ul className="mt-4 space-y-3 font-body text-gray-700">
                {checklist.map((item) => <li key={item} className="flex gap-3"><span className="text-forest font-bold">✓</span><span>{item}</span></li>)}
              </ul>
            </section>

            <section className="rounded-2xl border border-cream-darker bg-white p-6">
              <h2 className="font-heading text-2xl text-forest-dark">Curriculum fit for {state.state}</h2>
              <p className="mt-3 font-body leading-relaxed text-gray-700">{getStateCurriculumFitSummary(state)}</p>
              <Link href={`/best/${stateBestSlug}`} className="mt-5 inline-block rounded-xl bg-forest px-5 py-3 font-body text-sm font-bold text-white hover:bg-forest-dark">See curriculum picks for {state.state} →</Link>
            </section>

            <section className="rounded-2xl border border-cream-darker bg-white p-6">
              <h2 className="font-heading text-2xl text-forest-dark">FAQ</h2>
              <div className="mt-4 space-y-4">
                {faqItems.map((faq) => (
                  <details key={faq.question} className="rounded-xl border border-cream-darker p-4">
                    <summary className="cursor-pointer font-body font-semibold text-forest-dark">{faq.question}</summary>
                    <p className="mt-3 font-body text-sm leading-relaxed text-gray-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-cream-darker bg-white p-5">
              <h2 className="font-heading text-lg text-forest-dark">Requirements at a glance</h2>
              <dl className="mt-4 space-y-3 font-body text-sm">
                <div><dt className="text-xs uppercase tracking-wide text-gray-400">Notice required</dt><dd className="font-bold text-gray-800">{state.noticeRequired ? 'Yes' : 'No'}</dd></div>
                <div><dt className="text-xs uppercase tracking-wide text-gray-400">Portfolio required</dt><dd className="font-bold text-gray-800">{state.portfolioRequired ? 'Yes' : 'No'}</dd></div>
                <div><dt className="text-xs uppercase tracking-wide text-gray-400">Assessment required</dt><dd className="font-bold text-gray-800">{state.assessmentRequired ? 'Yes' : 'No'}</dd></div>
                <div><dt className="text-xs uppercase tracking-wide text-gray-400">Teacher qualifications</dt><dd className="font-bold text-gray-800">{state.teacherQualifications}</dd></div>
              </dl>
            </div>

            <div className="rounded-2xl bg-forest p-5 text-white">
              <h3 className="font-heading text-lg">Official source</h3>
              <p className="mt-2 font-body text-sm text-green-100">Use the state source to verify current requirements before filing.</p>
              <a href={state.reportingUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block rounded-xl bg-white px-4 py-3 text-center font-body text-sm font-bold text-forest hover:bg-cream">Visit {state.abbreviation} source →</a>
            </div>

            <div className="rounded-2xl border border-cream-darker bg-cream-dark p-5">
              <h3 className="font-heading text-lg text-forest-dark">Need curriculum help?</h3>
              <p className="mt-2 font-body text-sm text-gray-600">Take the free quiz, then compare your results against {state.state}'s requirements.</p>
              <Link href="/quiz" className="mt-4 block rounded-xl bg-forest px-4 py-3 text-center font-body text-sm font-bold text-white">Take the quiz</Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  )
}
