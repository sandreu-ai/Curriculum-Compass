import type { Metadata } from 'next'
import DirectoryClient from './DirectoryClient'
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig'

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
  const directoryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Homeschool Curriculum Directory',
    description:
      'Browse 40+ homeschool curricula by approach, faith, budget, and grade level.',
    url: `${SITE_URL}/directory`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Directory',
        item: `${SITE_URL}/directory`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directoryJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DirectoryClient />
    </>
  )
}
