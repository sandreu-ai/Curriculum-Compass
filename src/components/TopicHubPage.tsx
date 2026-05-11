import Link from 'next/link'
import type { TopicHub } from '@/data/topicalMap'

export default function TopicHubPage({ hub }: { hub: TopicHub }) {
  const intentLabels: Record<string, string> = {
    buyer: 'Buyer guide', comparison: 'Comparison', research: 'Review/research', planning: 'Planning', compliance: 'Compliance',
  }

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">{hub.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl sm:text-5xl">{hub.title}</h1>
          <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">{hub.description}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={hub.primaryCta.href} className="rounded-xl bg-white px-5 py-3 text-center font-body font-bold text-forest-dark">{hub.primaryCta.label}</Link>
            {hub.secondaryCta && <Link href={hub.secondaryCta.href} className="rounded-xl border border-white/40 px-5 py-3 text-center font-body font-bold text-white hover:bg-white/10">{hub.secondaryCta.label}</Link>}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-cream-darker bg-white p-6 shadow-sm">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-forest">Topical pillars</p>
          <h2 className="mt-2 font-heading text-3xl text-forest-dark">What this hub owns</h2>
          <ul className="mt-5 space-y-3">
            {hub.pillars.map((pillar) => (
              <li key={pillar} className="rounded-xl bg-cream-dark px-4 py-3 font-body text-sm font-semibold text-forest-dark">{pillar}</li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl bg-green-50 p-4 font-body text-sm leading-relaxed text-forest-dark">
            <strong>SEO role:</strong> This hub reinforces Curriculum Compass as a curriculum decision library — not a generic parenting blog — by clustering closely related decision pages under one clear topic.
          </div>
        </div>

        <div>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-forest">Supporting pages</p>
              <h2 className="mt-2 font-heading text-3xl text-forest-dark">Build-out roadmap</h2>
            </div>
            <Link href="/topical-map" className="font-body text-sm font-bold text-forest">View all hubs →</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {hub.supportingPages.map((page) => (
              <Link key={page.slug} href={`/guides/${page.slug}`} className="rounded-2xl border border-cream-darker bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <span className="rounded-full bg-cream-dark px-3 py-1 font-body text-xs font-bold uppercase tracking-wide text-forest">{intentLabels[page.intent]}</span>
                <h3 className="mt-3 font-heading text-xl text-forest-dark">{page.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-gray-700">{page.suggestedAngle}</p>
                <span className="mt-4 inline-block font-body text-sm font-bold text-forest">Open page brief →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
