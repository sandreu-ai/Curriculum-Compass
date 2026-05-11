"use client"

import { useMemo, useState } from 'react'
import { curricula } from '@/data/curricula'

const styles = ['open-and-go', 'online', 'literature-based', 'hands-on', 'traditional']

export default function BudgetCalculatorClient() {
  const [kids, setKids] = useState(2)
  const [budget, setBudget] = useState(1000)
  const [style, setStyle] = useState('open-and-go')

  const plans = useMemo(() => {
    const fit = curricula.filter((c) => c.tags.includes(style) || c.approach.toLowerCase().includes(style.replace('-', ' '))).slice(0, 8)
    const budgetFriendly = curricula.filter((c) => c.tags.includes('budget-friendly')).slice(0, 5)
    const online = curricula.filter((c) => c.tags.includes('online')).slice(0, 5)
    const perKid = Math.round(budget / Math.max(1, kids))
    return [
      { name: 'Budget-friendly plan', target: Math.min(budget, kids * 250), picks: budgetFriendly, note: `Aim for reusable spines, library books, and one paid math/reading tool. Approx. $${Math.min(budget, kids * 250)} total target.` },
      { name: 'Mid-range plan', target: Math.min(budget, kids * 500), picks: fit.length ? fit : curricula.slice(0, 5), note: `Use a strong core plus subject specialists. Your per-child target is about $${perKid}.` },
      { name: 'Premium plan', target: Math.max(budget, kids * 900), picks: curricula.filter((c) => c.tags.includes('premium') || c.price.high > 800).slice(0, 5), note: 'Premium makes sense when it saves parent time, provides live/online support, or solves a hard subject.' },
    ]
  }, [kids, budget, style])

  return (
    <div>
      <div className="grid gap-4 rounded-2xl border border-cream-darker bg-white p-5 shadow-sm md:grid-cols-3">
        <label className="font-body text-sm font-semibold text-forest-dark">Number of kids
          <input type="number" min="1" max="12" value={kids} onChange={(e) => setKids(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal" />
        </label>
        <label className="font-body text-sm font-semibold text-forest-dark">Annual curriculum budget
          <input type="number" min="0" step="50" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal" />
        </label>
        <label className="font-body text-sm font-semibold text-forest-dark">Preferred style
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="mt-2 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal">
            {styles.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <section key={plan.name} className="rounded-3xl border border-cream-darker bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl text-forest-dark">{plan.name}</h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-gray-700">{plan.note}</p>
            <ul className="mt-4 space-y-2">
              {plan.picks.map((curriculum) => <li key={curriculum.id} className="rounded-xl bg-cream-dark p-3 font-body text-sm"><strong>{curriculum.name}</strong> · ${curriculum.price.low}–${curriculum.price.high}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
