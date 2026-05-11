import type { Metadata } from 'next'
import CurriculumMatrixClient from '@/components/CurriculumMatrixClient'

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Comparison Matrix',
  description: 'Filter homeschool curriculum by price, grade range, faith, format, parent involvement, best for, avoid if, and official links.',
  alternates: { canonical: '/tools/curriculum-comparison-matrix' },
}

export default function CurriculumComparisonMatrixPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6"><div className="mx-auto max-w-6xl"><p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Filterable table</p><h1 className="mt-3 font-heading text-4xl sm:text-5xl">Curriculum Comparison Matrix</h1><p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">Compare curriculum by price, grade range, worldview, format, parent involvement, best-fit families, avoid-if notes, and official/sponsored links.</p></div></section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><CurriculumMatrixClient /></section>
    </div>
  )
}
