import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const exists = (path) => existsSync(new URL(path, root))
const read = (path) => readFileSync(new URL(path, root), 'utf8')

test('step 1 technical polish: OG image, quiz h1, shorter review meta, trust signals', () => {
  assert.equal(exists('public/og-image.svg'), true, 'sitewide OG image asset should exist')

  const layout = read('src/app/layout.tsx')
  assert.match(layout, /images:\s*\[\s*['"]\/og-image\.svg['"]\s*\]/, 'root metadata should expose OG image')
  assert.match(layout, /twitter:[\s\S]*images:\s*\[\s*['"]\/og-image\.svg['"]\s*\]/, 'twitter metadata should expose image')

  const quiz = read('src/app/quiz/page.tsx')
  assert.match(quiz, /<h1[^>]*>\s*Homeschool Curriculum Quiz\s*<\/h1>/, 'quiz page should render a server-side H1')
  assert.match(quiz, /FAQPage/, 'quiz page should include visible FAQ schema')

  const detail = read('src/app/curriculum/[id]/page.tsx')
  assert.match(detail, /buildCurriculumMetaDescription/, 'curriculum meta descriptions should use a short helper')
  assert.match(detail, /Last reviewed/i, 'review pages should show last reviewed trust signal')
  assert.match(detail, /Price last checked/i, 'review pages should show price verification trust signal')
})

test('step 2 comparison page system: top comparison pages exist and are indexed', () => {
  assert.equal(exists('src/data/comparisons.ts'), true, 'comparison data should exist')
  assert.equal(exists('src/app/compare/[slug]/page.tsx'), true, 'dynamic comparison route should exist')
  assert.equal(exists('src/app/compare/page.tsx'), true, 'comparison hub should exist')

  const comparisons = read('src/data/comparisons.ts')
  const count = (comparisons.match(/slug:/g) ?? []).length
  assert.ok(count >= 10, `expected at least 10 comparison pages, found ${count}`)
  for (const slug of [
    'abeka-vs-bju-press',
    'math-u-see-vs-saxon-math',
    'good-and-beautiful-vs-masterbooks',
    'sonlight-vs-bookshark',
    'time4learning-vs-miacademy',
    'teaching-textbooks-vs-ctcmath',
    'all-about-reading-vs-logic-of-english',
  ]) {
    assert.match(comparisons, new RegExp(slug), `missing ${slug}`)
  }

  const page = read('src/app/compare/[slug]/page.tsx')
  assert.match(page, /ComparisonTable/, 'comparison route should render a structured comparison table')
  assert.match(page, /FAQPage/, 'comparison pages should include FAQ schema')

  const sitemap = read('src/app/sitemap.ts')
  assert.match(sitemap, /comparisonRoutes/, 'sitemap should include comparison routes')
})

test('step 3 best-for landing pages exist and are indexed', () => {
  assert.equal(exists('src/data/bestPages.ts'), true, 'best-for page data should exist')
  assert.equal(exists('src/app/best/[slug]/page.tsx'), true, 'dynamic best-for route should exist')
  assert.equal(exists('src/app/best/page.tsx'), true, 'best-for hub should exist')

  const bestPages = read('src/data/bestPages.ts')
  const count = (bestPages.match(/slug:/g) ?? []).length
  assert.ok(count >= 12, `expected at least 12 best-for pages, found ${count}`)
  for (const slug of [
    'christian-homeschool-curriculum',
    'secular-homeschool-curriculum',
    'homeschool-curriculum-for-dyslexia',
    'middle-school-homeschool-curriculum',
    'high-school-homeschool-curriculum',
  ]) {
    assert.match(bestPages, new RegExp(slug), `missing ${slug}`)
  }

  const sitemap = read('src/app/sitemap.ts')
  assert.match(sitemap, /bestForRoutes/, 'sitemap should include best-for routes')
  assert.match(bestPages, /stateBestPages/, 'state-specific best curriculum pages should be generated')
  assert.match(bestPages, /-homeschool-curriculum/, 'state-specific best curriculum slugs should be generated')
})

test('step 3b state law pages exist, connect to curriculum guides, and are indexed', () => {
  assert.equal(exists('src/app/homeschool-laws/page.tsx'), true, 'state law hub should exist')
  assert.equal(exists('src/app/homeschool-laws/[slug]/page.tsx'), true, 'dynamic state law route should exist')

  const statePage = read('src/app/homeschool-laws/[slug]/page.tsx')
  assert.match(statePage, /Compliance checklist/i, 'state pages should include a compliance checklist')
  assert.match(statePage, /See curriculum picks/, 'state law pages should link to state curriculum recommendations')
  assert.match(statePage, /FAQPage/, 'state law pages should include FAQ schema')

  const sitemap = read('src/app/sitemap.ts')
  assert.match(sitemap, /stateLawRoutes/, 'sitemap should include state law routes')
  assert.match(sitemap, /homeschool-laws/, 'sitemap should include homeschool-laws URLs')
})

test('step 3c missing high-intent comparison entities are real curriculum profiles', () => {
  const curricula = read('src/data/curricula.ts')
  for (const id of ['bookshark', 'miacademy', 'ctcmath', 'logic-of-english']) {
    assert.match(curricula, new RegExp(`id: '${id}'`), `missing curriculum profile ${id}`)
  }
})

test('step 4 curriculum review template is substantially expanded', () => {
  const detail = read('src/app/curriculum/[id]/page.tsx')
  for (const marker of [
    'Who This Fits Best',
    'Who Should Consider an Alternative',
    'What a Typical Day Looks Like',
    'Parent Prep Required',
    'Best Alternatives',
    'Compared With Similar Curricula',
  ]) {
    assert.match(detail, new RegExp(marker), `missing expanded review section: ${marker}`)
  }
})

test('step 5 search console iteration workflow is documented and ready', () => {
  assert.equal(exists('docs/SEO_SEARCH_CONSOLE_ITERATION.md'), true, 'Search Console iteration doc should exist')
  const doc = read('docs/SEO_SEARCH_CONSOLE_ITERATION.md')
  assert.match(doc, /Search Console/i)
  assert.match(doc, /sitemap\.xml/)
  assert.match(doc, /2-4 weeks|2–4 weeks/)
  assert.match(doc, /impressions/i)
  assert.match(doc, /CTR/i)
})


test('technical SEO hardening: canonical redirects, guide noindex, deterministic sitemap, schema, and nav', () => {
  const siteConfig = read('src/lib/siteConfig.ts')
  assert.match(siteConfig, /SITE_URL = 'https:\/\/www\.thecurriculumcompass\.com'/, 'canonical domain should stay consistent')
  assert.match(siteConfig, /SITE_LAST_UPDATED/, 'site config should expose deterministic sitemap date')

  const nextConfig = read('next.config.js')
  assert.match(nextConfig, /REDIRECT_HOSTS/, 'alternate hosts should redirect to canonical')
  assert.match(nextConfig, /curriculumcompass\.com/, 'curriculumcompass.com should be handled as an alternate host')
  assert.match(nextConfig, /www\.thecurriculumcompass\.com/, 'canonical host should be explicit')

  const guides = read('src/app/guides/[slug]/page.tsx')
  assert.match(guides, /robots:\s*{\s*index:\s*false,\s*follow:\s*true\s*}/, 'thin guide briefs should be noindexed')

  const sitemap = read('src/app/sitemap.ts')
  assert.match(sitemap, /SITE_LAST_UPDATED/, 'sitemap should use deterministic site dates')
  assert.doesNotMatch(sitemap, /supportingGuideRoutes/, 'thin guide briefs should not be included in sitemap')
  assert.doesNotMatch(sitemap, /allSupportingPages/, 'sitemap should not import supporting guide briefs')

  const curriculum = read('src/app/curriculum/[id]/page.tsx')
  assert.match(curriculum, /sameAs:\s*curriculum\.websiteUrl/, 'Product schema should use sameAs for publisher URL')
  assert.match(curriculum, /'@type': 'Review'/, 'Curriculum pages should include editorial Review schema')

  const best = read('src/app/best/[slug]/page.tsx')
  assert.match(best, /'@type': 'ItemList'/, 'Best pages should expose top picks as ItemList schema')

  const compare = read('src/app/compare/[slug]/page.tsx')
  assert.match(compare, /'@type': 'Article'/, 'Comparison pages should include Article schema')

  const nav = read('src/components/NavBar.tsx')
  assert.match(nav, /href: '\/best'/, 'Nav should link to best-fit SEO hub')
  assert.match(nav, /href: '\/compare'/, 'Nav should link to comparison SEO hub')
  assert.match(nav, /href: '\/homeschool-laws'/, 'Nav should link directly to state-law SEO hub')
  assert.doesNotMatch(nav, /directory#state-laws/, 'Main nav should not hide state laws behind a directory anchor')
})
