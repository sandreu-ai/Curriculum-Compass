import type { MetadataRoute } from 'next'
import { curricula } from '@/data/curricula'
import { comparisons } from '@/data/comparisons'
import { allBestPages } from '@/data/bestPages'
import { getAllPosts } from '@/lib/blog'
import { stateLaws } from '@/data/stateLaws'
import { topicHubs } from '@/data/topicalMap'
import { SITE_LAST_UPDATED, SITE_URL } from '@/lib/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteLastUpdated = new Date(SITE_LAST_UPDATED)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: siteLastUpdated, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/quiz`, lastModified: siteLastUpdated, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/directory`, lastModified: siteLastUpdated, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/compare`, lastModified: siteLastUpdated, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/best`, lastModified: siteLastUpdated, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/homeschool-laws`, lastModified: siteLastUpdated, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/guides`, lastModified: siteLastUpdated, changeFrequency: 'weekly', priority: 0.88 },
    { url: `${SITE_URL}/topical-map`, lastModified: siteLastUpdated, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/tools`, lastModified: siteLastUpdated, changeFrequency: 'weekly', priority: 0.86 },
    { url: `${SITE_URL}/tools/curriculum-match-score`, lastModified: siteLastUpdated, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${SITE_URL}/tools/curriculum-comparison-matrix`, lastModified: siteLastUpdated, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${SITE_URL}/tools/state-compliance-checklist`, lastModified: siteLastUpdated, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${SITE_URL}/tools/curriculum-budget-calculator`, lastModified: siteLastUpdated, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${SITE_URL}/tools/homeschool-curriculum-planner`, lastModified: siteLastUpdated, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${SITE_URL}/blog`, lastModified: siteLastUpdated, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: siteLastUpdated, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: siteLastUpdated, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/affiliate-disclosure`, lastModified: siteLastUpdated, changeFrequency: 'yearly', priority: 0.4 },
  ]

  const curriculumRoutes: MetadataRoute.Sitemap = curricula.map((c) => ({
    url: `${SITE_URL}/curriculum/${c.id}`,
    lastModified: c.lastVerified ? new Date(c.lastVerified) : siteLastUpdated,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: `${SITE_URL}/compare/${comparison.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const stateLawRoutes: MetadataRoute.Sitemap = stateLaws.map((state) => ({
    url: `${SITE_URL}/homeschool-laws/${state.state.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    lastModified: state.lastVerified ? new Date(state.lastVerified) : siteLastUpdated,
    changeFrequency: 'monthly',
    priority: 0.78,
  }))

  const bestForRoutes: MetadataRoute.Sitemap = allBestPages.map((page) => ({
    url: `${SITE_URL}/best/${page.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const topicHubRoutes: MetadataRoute.Sitemap = topicHubs
    .filter((hub) => !['/best', '/compare', '/homeschool-laws'].includes(hub.path))
    .map((hub) => ({
      url: `${SITE_URL}${hub.path}`,
      lastModified: siteLastUpdated,
      changeFrequency: 'weekly',
      priority: 0.82,
    }))

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : siteLastUpdated,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...topicHubRoutes, ...curriculumRoutes, ...comparisonRoutes, ...bestForRoutes, ...stateLawRoutes, ...blogRoutes]
}
