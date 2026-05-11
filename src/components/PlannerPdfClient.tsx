"use client"

import { useState } from 'react'

export default function PlannerPdfClient() {
  const [stateName, setStateName] = useState('Texas')
  const [kids, setKids] = useState('2')
  const [priorities, setPriorities] = useState('Low parent prep, strong reading, budget under $1,000')
  const [matches, setMatches] = useState('Sonlight, Teaching Textbooks, All About Reading')

  return (
    <div>
      <div className="grid gap-4 rounded-2xl border border-cream-darker bg-white p-5 shadow-sm print:hidden md:grid-cols-2">
        <label className="font-body text-sm font-semibold text-forest-dark">State<input value={stateName} onChange={(e) => setStateName(e.target.value)} className="mt-2 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal" /></label>
        <label className="font-body text-sm font-semibold text-forest-dark">Number/grades of kids<input value={kids} onChange={(e) => setKids(e.target.value)} className="mt-2 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal" /></label>
        <label className="font-body text-sm font-semibold text-forest-dark md:col-span-2">Family priorities<textarea value={priorities} onChange={(e) => setPriorities(e.target.value)} className="mt-2 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal" /></label>
        <label className="font-body text-sm font-semibold text-forest-dark md:col-span-2">Top curriculum matches<textarea value={matches} onChange={(e) => setMatches(e.target.value)} className="mt-2 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal" /></label>
        <button onClick={() => window.print()} className="rounded-xl bg-forest px-5 py-3 font-body font-bold text-white">Print / save as PDF</button>
      </div>
      <section className="mt-6 rounded-3xl border border-cream-darker bg-white p-8 shadow-sm">
        <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-forest">Printable plan</p>
        <h2 className="mt-2 font-heading text-4xl text-forest-dark">Homeschool Curriculum Planner</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-cream-dark p-4"><strong>State:</strong> {stateName}</div>
          <div className="rounded-2xl bg-cream-dark p-4"><strong>Kids / grades:</strong> {kids}</div>
          <div className="rounded-2xl bg-cream-dark p-4 sm:col-span-2"><strong>Priorities:</strong> {priorities}</div>
          <div className="rounded-2xl bg-cream-dark p-4 sm:col-span-2"><strong>Top matches:</strong> {matches}</div>
        </div>
        <h3 className="mt-8 font-heading text-2xl text-forest-dark">Decision checklist</h3>
        <ul className="mt-4 space-y-3 font-body text-sm text-gray-800">
          {['Verify state compliance steps', 'Check samples before buying', 'Confirm real annual cost', 'Choose one math path', 'Choose one reading/writing path', 'Plan a 4-week trial rhythm', 'Review fit before adding extras'].map((item) => <li key={item}>☐ {item}</li>)}
        </ul>
      </section>
    </div>
  )
}
