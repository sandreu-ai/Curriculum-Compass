import type { Metadata } from 'next'
import StateChecklistClient from '@/components/StateChecklistClient'

export const metadata: Metadata = {
  title: 'State Homeschool Compliance Checklist Generator',
  description: 'Choose a state and generate a printable homeschool startup checklist with notice, portfolio, assessment, teacher qualification, records, and official source reminders.',
  alternates: { canonical: '/tools/state-compliance-checklist' },
}

export default function StateComplianceChecklistPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-forest-dark px-4 py-14 text-white sm:px-6"><div className="mx-auto max-w-5xl"><p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Printable compliance asset</p><h1 className="mt-3 font-heading text-4xl sm:text-5xl">State Compliance Checklist Generator</h1><p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-green-100">Pick your state and produce a printable startup checklist. This is designed to become an email-capture asset, while still linking families to official state sources.</p></div></section>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6"><StateChecklistClient /></section>
    </div>
  )
}
