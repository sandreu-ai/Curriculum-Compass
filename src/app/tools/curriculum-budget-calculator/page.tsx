import type { Metadata } from 'next'
import BudgetCalculatorClient from '@/components/BudgetCalculatorClient'

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Budget Calculator',
  description: 'Enter number of kids, budget, and preferred homeschool style to generate budget-friendly, mid-range, and premium curriculum plan options.',
  alternates: { canonical: '/tools/curriculum-budget-calculator' },
}

export default function CurriculumBudgetCalculatorPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6"><div className="mx-auto max-w-6xl"><p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Budget planning tool</p><h1 className="mt-3 font-heading text-4xl sm:text-5xl">Curriculum Budget Calculator</h1><p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">Estimate practical curriculum plans based on number of kids, preferred style, and annual budget. Outputs budget-friendly, mid-range, and premium options.</p></div></section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><BudgetCalculatorClient /></section>
    </div>
  )
}
