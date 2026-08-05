import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const exists = (path) => existsSync(new URL(path, root))
const read = (path) => readFileSync(new URL(path, root), 'utf8')

test('curriculum outbound buttons send Vercel Analytics click events with useful metadata', () => {
  assert.equal(exists('src/components/OutboundCurriculumLink.tsx'), true, 'dedicated outbound tracking link component should exist')

  const component = read('src/components/OutboundCurriculumLink.tsx')
  assert.match(component, /'use client'/, 'tracking link must be a client component')
  assert.match(component, /import\s+{\s*track\s*}\s+from ['"]@vercel\/analytics['"]/, 'component should use Vercel custom event tracking')
  assert.match(component, /track\(['"]curriculum_outbound_click['"]/, 'component should emit the curriculum_outbound_click event')
  for (const field of ['curriculum_id', 'curriculum_name', 'destination_domain', 'is_affiliate', 'link_context']) {
    assert.match(component, new RegExp(field), `event should include ${field}`)
  }
  assert.match(component, /rel="sponsored noopener noreferrer"/, 'outbound links should remain sponsored/noopener/noreferrer')

  const card = read('src/components/CurriculumCard.tsx')
  assert.match(card, /OutboundCurriculumLink/, 'directory/result cards should use the tracking link')
  assert.doesNotMatch(card, /<motion\.a[\s\S]*href={curriculum\.affiliateUrl}/, 'cards should not bypass tracking with direct outbound anchors')

  const detail = read('src/app/curriculum/[id]/page.tsx')
  assert.match(detail, /OutboundCurriculumLink/, 'curriculum detail page CTA should use the tracking link')
  assert.doesNotMatch(detail, /<a href={curriculum\.affiliateUrl}/, 'detail page should not bypass tracking with direct outbound anchors')
})
