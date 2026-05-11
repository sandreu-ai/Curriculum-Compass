"use client"

import { useMemo, useState } from 'react'
import { curricula } from '@/data/curricula'
import { curriculumScorecards } from '@/data/curriculumScores'

export default function CurriculumMatrixClient() {
  const [query, setQuery] = useState('')
  const [faith, setFaith] = useState('all')
  const [format, setFormat] = useState('all')
  const [budget, setBudget] = useState('all')

  const rows = useMemo(() => curricula.map((curriculum) => ({ curriculum, scorecard: curriculumScorecards.find((s) => s.curriculumId === curriculum.id)! })), [])
  const filtered = rows.filter(({ curriculum }) => {
    const text = `${curriculum.name} ${curriculum.approach} ${curriculum.tags.join(' ')}`.toLowerCase()
    if (query && !text.includes(query.toLowerCase())) return false
    if (faith !== 'all' && curriculum.faithOrientation !== faith && !curriculum.tags.includes(faith)) return false
    if (format !== 'all' && !curriculum.tags.includes(format)) return false
    if (budget !== 'all') {
      const avg = (curriculum.price.low + curriculum.price.high) / 2
      if (budget === 'budget' && avg > 350) return false
      if (budget === 'mid' && (avg <= 350 || avg > 800)) return false
      if (budget === 'premium' && avg <= 800) return false
    }
    return true
  })

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-cream-darker bg-white p-4 shadow-sm md:grid-cols-4">
        <label className="font-body text-sm font-semibold text-forest-dark">Search
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="math, dyslexia, online..." className="mt-1 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal" />
        </label>
        <label className="font-body text-sm font-semibold text-forest-dark">Faith
          <select value={faith} onChange={(event) => setFaith(event.target.value)} className="mt-1 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal">
            <option value="all">All</option><option value="christian">Christian</option><option value="catholic">Catholic</option><option value="secular">Secular</option><option value="neutral">Neutral</option>
          </select>
        </label>
        <label className="font-body text-sm font-semibold text-forest-dark">Format
          <select value={format} onChange={(event) => setFormat(event.target.value)} className="mt-1 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal">
            <option value="all">All</option><option value="online">Online</option><option value="textbook-based">Textbook</option><option value="literature-based">Literature</option><option value="hands-on">Hands-on</option><option value="self-directed">Self-directed</option>
          </select>
        </label>
        <label className="font-body text-sm font-semibold text-forest-dark">Budget
          <select value={budget} onChange={(event) => setBudget(event.target.value)} className="mt-1 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal">
            <option value="all">All</option><option value="budget">Budget-friendly</option><option value="mid">Mid-range</option><option value="premium">Premium</option>
          </select>
        </label>
      </div>

      <p className="mt-4 font-body text-sm text-gray-600">Showing {filtered.length} curricula. Prices are approximate ranges; verify current pricing and affiliate status before purchasing.</p>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-cream-darker bg-white shadow-sm">
        <table className="min-w-[1100px] w-full border-collapse text-left font-body text-sm">
          <thead className="bg-forest-dark text-white">
            <tr>
              {['Curriculum', 'Price', 'Grade range', 'Faith', 'Format', 'Parent involvement', 'Best for', 'Avoid if', 'Official link'].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ curriculum, scorecard }) => (
              <tr key={curriculum.id} className="border-t border-cream-darker align-top">
                <td className="px-4 py-3 font-bold text-forest"><a href={`/curriculum/${curriculum.id}`}>{curriculum.name}</a></td>
                <td className="px-4 py-3">${curriculum.price.low}–${curriculum.price.high}</td>
                <td className="px-4 py-3">{curriculum.gradeRange}</td>
                <td className="px-4 py-3 capitalize">{curriculum.faithOrientation}</td>
                <td className="px-4 py-3">{curriculum.approach}</td>
                <td className="px-4 py-3">Parent prep {scorecard.scores.parentPrep}/10 · independence {scorecard.scores.independence}/10</td>
                <td className="px-4 py-3">{scorecard.bestFor}</td>
                <td className="px-4 py-3">{scorecard.avoidIf}</td>
                <td className="px-4 py-3"><a className="font-bold text-forest" href={curriculum.affiliateUrl} rel="sponsored nofollow noopener noreferrer" target="_blank">Visit →</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
