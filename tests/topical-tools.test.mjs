import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const exists = (path) => existsSync(new URL(path, root))
const read = (path) => readFileSync(new URL(path, root), 'utf8')

test('topical map defines focused curriculum decision hubs and supporting pages', () => {
  const topical = read('src/data/topicalMap.ts')
  for (const title of [
    'Best Homeschool Curriculum',
    'Curriculum Reviews',
    'Curriculum Comparisons',
    'Homeschool Laws by State',
    'Homeschool Styles',
    'Learning Needs',
    'Grade-Level Guides',
    'Budget Guides',
    'Faith-Based Curriculum',
    'Secular Curriculum',
    'Online Curriculum',
    'Homeschool Planning',
  ]) {
    assert.match(topical, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing hub ${title}`)
  }
  const supportingCount = (topical.match(/\['[a-z0-9-]+',/g) ?? []).length
  assert.ok(supportingCount >= 120, `expected at least 120 supporting page briefs, found ${supportingCount}`)
  assert.equal(exists('src/app/topical-map/page.tsx'), true)
  assert.equal(exists('src/app/guides/[slug]/page.tsx'), true)
})

test('original data and tool pages exist', () => {
  assert.equal(exists('src/data/curriculumScores.ts'), true, 'curriculum score data should exist')
  const scores = read('src/data/curriculumScores.ts')
  for (const marker of ['parentPrep', 'structure', 'independence', 'faithAlignment', 'handsOnLevel', 'readingLoad', 'cost', 'flexibility', 'specialNeedsFriendliness']) {
    assert.match(scores, new RegExp(marker), `missing score dimension ${marker}`)
  }
  for (const path of [
    'src/app/tools/page.tsx',
    'src/app/tools/curriculum-match-score/page.tsx',
    'src/app/tools/curriculum-comparison-matrix/page.tsx',
    'src/app/tools/state-compliance-checklist/page.tsx',
    'src/app/tools/curriculum-budget-calculator/page.tsx',
    'src/app/tools/homeschool-curriculum-planner/page.tsx',
  ]) {
    assert.equal(exists(path), true, `${path} should exist`)
  }
})

test('sitemap indexes topical hubs and tools while keeping thin guide briefs out of sitemap', () => {
  const sitemap = read('src/app/sitemap.ts')
  assert.match(sitemap, /topicHubRoutes/)
  assert.doesNotMatch(sitemap, /supportingGuideRoutes/)
  assert.doesNotMatch(sitemap, /allSupportingPages/)
  assert.match(sitemap, /curriculum-comparison-matrix/)
  assert.match(sitemap, /state-compliance-checklist/)
  assert.match(sitemap, /homeschool-curriculum-planner/)
})
