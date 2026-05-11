import type { Metadata } from 'next'
import PlannerPdfClient from '@/components/PlannerPdfClient'

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Planner PDF',
  description: 'Generate a printable homeschool curriculum planner from family priorities, state, number of kids, and curriculum matches.',
  alternates: { canonical: '/tools/homeschool-curriculum-planner' },
}

export default function HomeschoolCurriculumPlannerPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6 print:hidden"><div className="mx-auto max-w-5xl"><p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Lead magnet</p><h1 className="mt-3 font-heading text-4xl sm:text-5xl">Homeschool Curriculum Planner PDF</h1><p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">Fill in family priorities and quiz matches, then print or save as PDF. This is the lead-magnet endpoint that can later be wired directly to quiz results and email capture.</p></div></section>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 print:p-0"><PlannerPdfClient /></section>
    </div>
  )
}
