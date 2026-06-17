import type { Metadata } from 'next'
import Link from 'next/link'
import { stateLaws } from '@/data/stateLaws'
import { getRequirementLevelLabel, getStateSlug } from '@/lib/stateLawSeo'
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Homeschool Laws by State — Requirements, Notice & Records',
  description:
    'Find homeschool requirements by state, including notice, portfolio, assessment, teacher qualification, and official source links.',
  alternates: { canonical: '/homeschool-laws' },
  openGraph: {
    title: 'Homeschool Laws by State',
    description: 'Quick-reference homeschool law pages for all 50 states and DC.',
    url: '/homeschool-laws',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: { card: 'summary_large_image', title: 'Homeschool Laws by State', images: ['/og-image.png'] },
}

export default function HomeschoolLawsPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Homeschool Laws by State',
    description: 'State-by-state homeschool requirement guides with notice, portfolio, assessment, and teacher qualification notes.',
    url: `${SITE_URL}/homeschool-laws`,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <main className="min-h-screen bg-cream">
        <section className="bg-forest-dark px-4 py-12 text-white sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">State homeschool requirements</p>
            <h1 className="mt-3 font-heading text-4xl leading-tight sm:text-5xl">Homeschool Laws by State</h1>
            <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-green-100">
              Start with your state requirements, then choose curriculum that makes notice, portfolios, assessments, and record keeping manageable.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stateLaws.map((state) => (
              <Link key={state.abbreviation} href={`/homeschool-laws/${getStateSlug(state.state)}`} className="rounded-2xl border border-cream-darker bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-heading text-xl text-forest-dark">{state.state}</h2>
                    <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wide text-forest">{getRequirementLevelLabel(state)}</p>
                  </div>
                  <span className="rounded-full bg-cream-dark px-3 py-1 font-body text-xs font-bold text-forest-dark">{state.abbreviation}</span>
                </div>
                <dl className="mt-4 grid grid-cols-3 gap-2 text-center font-body text-xs text-gray-600">
                  <div><dt className="font-bold text-forest-dark">Notice</dt><dd>{state.noticeRequired ? 'Yes' : 'No'}</dd></div>
                  <div><dt className="font-bold text-forest-dark">Portfolio</dt><dd>{state.portfolioRequired ? 'Yes' : 'No'}</dd></div>
                  <div><dt className="font-bold text-forest-dark">Assess</dt><dd>{state.assessmentRequired ? 'Yes' : 'No'}</dd></div>
                </dl>
                <p className="mt-4 font-body text-sm font-semibold text-forest">View {state.state} requirements →</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
