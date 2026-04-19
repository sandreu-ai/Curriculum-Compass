import type { Metadata } from 'next'
import DirectoryClient from './DirectoryClient'

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Directory — 40+ Reviewed Options',
  description:
    'Browse 40+ homeschool curricula by approach, faith, budget, and grade level. Plus a 50-state quick-reference guide to homeschool law requirements.',
  alternates: { canonical: '/directory' },
  openGraph: {
    title: 'Homeschool Curriculum Directory — 40+ Reviewed Options',
    description:
      'Search and filter 40+ homeschool curricula. Includes a 50-state guide to homeschool law requirements.',
    url: '/directory',
    type: 'website',
  },
}

export default function DirectoryPage() {
  return <DirectoryClient />
}
