import Link from 'next/link'
import type { Metadata } from 'next'

const tools = [
  { href: '/tools/curriculum-match-score', title: 'Curriculum Match Score', description: 'Proprietary 9-dimension scorecards for every curriculum: parent prep, structure, independence, faith, hands-on level, reading load, cost, flexibility, and special-needs fit.' },
  { href: '/tools/curriculum-comparison-matrix', title: 'Curriculum Comparison Matrix', description: 'Filter curricula by price, grade range, faith orientation, format, parent involvement, best fit, and avoid-if criteria.' },
  { href: '/tools/state-compliance-checklist', title: 'State Compliance Checklist Generator', description: 'Pick your state and generate a printable startup checklist with notice, portfolio, assessment, and official-source reminders.' },
  { href: '/tools/curriculum-budget-calculator', title: 'Curriculum Budget Calculator', description: 'Enter kids, style, and budget to get budget-friendly, mid-range, and premium curriculum plan options.' },
  { href: '/tools/homeschool-curriculum-planner', title: 'Homeschool Curriculum Planner PDF', description: 'Printable planner generated from family priorities and curriculum matches. Built as the lead magnet endpoint.' },
]

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Tools',
  description: 'Original homeschool curriculum decision tools: match scores, comparison matrix, state checklists, budget calculator, and printable planner.',
  alternates: { canonical: '/tools' },
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Original tools and data</p>
          <h1 className="mt-3 font-heading text-4xl sm:text-5xl">Homeschool Curriculum Decision Tools</h1>
          <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">These assets make Curriculum Compass more than generic content: proprietary scorecards, filterable data, printable checklists, calculators, and planning PDFs.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="rounded-2xl border border-cream-darker bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="font-heading text-2xl text-forest-dark">{tool.title}</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-gray-700">{tool.description}</p>
            <span className="mt-4 inline-block font-body text-sm font-bold text-forest">Open tool →</span>
          </Link>
        ))}
      </section>
    </div>
  )
}
