"use client"

import { useMemo, useState } from 'react'
import { stateLaws } from '@/data/stateLaws'

export default function StateChecklistClient() {
  const [stateName, setStateName] = useState('Texas')
  const state = useMemo(() => stateLaws.find((item) => item.state === stateName) ?? stateLaws[0], [stateName])
  const checklist = [
    state.noticeRequired ? `File any required homeschool notice for ${state.state}.` : `${state.state} does not typically require a homeschool notice; still keep a dated startup record for your files.`,
    state.portfolioRequired ? 'Set up a portfolio folder with samples by subject and date.' : 'Keep simple work samples and attendance notes even if a formal portfolio is not required.',
    state.assessmentRequired ? 'Schedule required testing/evaluation reminders before the end of the school year.' : 'Choose optional progress checks that help you adjust curriculum without over-testing.',
    `Confirm teacher qualification rule: ${state.teacherQualifications}`,
    'Choose curriculum that covers core subjects and fits your child before buying extras.',
    'Save receipts, course descriptions, and a weekly rhythm in one homeschool folder.',
    'Verify current rules with the official state source before filing or withdrawing from school.',
  ]

  return (
    <div>
      <div className="rounded-2xl border border-cream-darker bg-white p-5 shadow-sm print:hidden">
        <label className="font-body text-sm font-semibold text-forest-dark">Choose your state
          <select value={stateName} onChange={(event) => setStateName(event.target.value)} className="mt-2 w-full rounded-lg border border-cream-darker px-3 py-2 font-normal md:max-w-md">
            {stateLaws.map((item) => <option key={item.state} value={item.state}>{item.state}</option>)}
          </select>
        </label>
        <button onClick={() => window.print()} className="mt-4 rounded-xl bg-forest px-5 py-3 font-body font-bold text-white">Print checklist</button>
      </div>
      <section className="mt-6 rounded-3xl border border-cream-darker bg-white p-6 shadow-sm sm:p-8">
        <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-forest">Printable checklist</p>
        <h2 className="mt-2 font-heading text-3xl text-forest-dark">{state.state} Homeschool Startup Checklist</h2>
        <p className="mt-3 font-body leading-relaxed text-gray-700">Requirement level: <strong>{state.requirementLevel}</strong>. {state.requirements}</p>
        <ol className="mt-6 space-y-3">
          {checklist.map((item) => <li key={item} className="rounded-xl bg-cream-dark p-4 font-body text-sm leading-relaxed text-gray-800">☐ {item}</li>)}
        </ol>
        <a className="mt-6 inline-block font-body text-sm font-bold text-forest" href={state.reportingUrl} target="_blank" rel="noopener noreferrer">Official {state.state} source →</a>
      </section>
    </div>
  )
}
