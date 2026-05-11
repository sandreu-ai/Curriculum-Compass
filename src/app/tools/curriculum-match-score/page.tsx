import Link from 'next/link'
import type { Metadata } from 'next'
import { curriculumScorecards, scoreDimensions } from '@/data/curriculumScores'

export const metadata: Metadata = {
  title: 'Curriculum Match Score',
  description: 'Every homeschool curriculum scored across parent prep, structure, independence, faith alignment, hands-on level, reading load, cost, flexibility, and special-needs friendliness.',
  alternates: { canonical: '/tools/curriculum-match-score' },
}

export default function CurriculumMatchScorePage() {
  const top = curriculumScorecards.slice(0, 24)
  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6"><div className="mx-auto max-w-6xl"><p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Proprietary data</p><h1 className="mt-3 font-heading text-4xl sm:text-5xl">Curriculum Match Score</h1><p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">Each curriculum is scored across nine decision dimensions so the quiz, reviews, and comparison matrix can point families toward fit — not just popularity.</p></div></section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {scoreDimensions.map((dimension) => <div key={dimension.key} className="rounded-2xl border border-cream-darker bg-white p-5 shadow-sm"><h2 className="font-heading text-xl text-forest-dark">{dimension.label}</h2><p className="mt-2 font-body text-sm text-gray-700">{dimension.description}</p></div>)}
        </div>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-cream-darker bg-white shadow-sm">
          <table className="min-w-[950px] w-full text-left font-body text-sm"><thead className="bg-forest-dark text-white"><tr><th className="px-4 py-3">Curriculum</th>{scoreDimensions.map((d) => <th key={d.key} className="px-4 py-3">{d.label}</th>)}<th className="px-4 py-3">Best for</th></tr></thead><tbody>{top.map((card) => <tr key={card.curriculumId} className="border-t border-cream-darker"><td className="px-4 py-3 font-bold text-forest"><Link href={`/curriculum/${card.curriculumId}`}>{card.curriculumName}</Link></td>{scoreDimensions.map((d) => <td key={d.key} className="px-4 py-3">{card.scores[d.key]}/10</td>)}<td className="px-4 py-3">{card.bestFor}</td></tr>)}</tbody></table>
        </div>
      </section>
    </div>
  )
}
