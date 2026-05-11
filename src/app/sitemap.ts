import type { MetadataRoute } from 'next'
import { curricula } from '@/data/curricula'
import { comparisons } from '@/data/comparisons'
import { allBestPages } from '@/data/bestPages'
import { getAllPosts } from '@/lib/blog'
import { stateLaws } from '@/data/stateLaws'
import { allSupportingPages, topicHubs } from '@/data/topicalMap'
import { SITE_URL } from '@/lib/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/directory`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/best`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/homeschool-laws`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/topical-map`, lastModified: now, changeFrequency: 'weekly', priority: 0.86 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.86 },
    { url: `${SITE_URL}/tools/curriculum-match-score`, lastModified: now, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${SITE_URL}/tools/curriculum-comparison-matrix`, lastModified: now, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${SITE_URL}/tools/state-compliance-checklist`, lastModified: now, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${SITE_URL}/tools/curriculum-budget-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${SITE_URL}/tools/homeschool-curriculum-planner`, lastModified: now, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const curriculumRoutes: MetadataRoute.Sitemap = curricula.map((c) => ({
    url: `${SITE_URL}/curriculum/${c.id}`,
    lastModified: c.lastVerified ? new Date(c.lastVerified) : now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: `${SITE_URL}/compare/${comparison.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const stateLawRoutes: MetadataRoute.Sitemap = stateLaws.map((state) => ({
    url: `${SITE_URL}/homeschool-laws/${state.state.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    lastModified: state.lastVerified ? new Date(state.lastVerified) : now,
    changeFrequency: 'monthly',
    priority: 0.78,
  }))

  const bestForRoutes: MetadataRoute.Sitemap = allBestPages.map((page) => ({
    url: `${SITE_URL}/best/${page.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const topicHubRoutes: MetadataRoute.Sitemap = topicHubs
    .filter((hub) => !['/best', '/compare', '/homeschool-laws'].includes(hub.path))
    .map((hub) => ({
      url: `${SITE_URL}${hub.path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.82,
    }))

  const supportingGuideRoutes: MetadataRoute.Sitemap = allSupportingPages.map((page) => ({
    url: `${SITE_URL}/guides/${page.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.72,
  }))

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...topicHubRoutes, ...curriculumRoutes, ...comparisonRoutes, ...bestForRoutes, ...stateLawRoutes, ...supportingGuideRoutes, ...blogRoutes]
}
