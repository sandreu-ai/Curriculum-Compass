import type { MetadataRoute } from 'next'
import { curricula } from '@/data/curricula'
import { comparisons } from '@/data/comparisons'
import { bestPages } from '@/data/bestPages'
import { getAllPosts } from '@/lib/blog'
import { SITE_URL } from '@/lib/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/directory`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/best`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
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

  const bestForRoutes: MetadataRoute.Sitemap = bestPages.map((page) => ({
    url: `${SITE_URL}/best/${page.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...curriculumRoutes, ...comparisonRoutes, ...bestForRoutes, ...blogRoutes]
}
