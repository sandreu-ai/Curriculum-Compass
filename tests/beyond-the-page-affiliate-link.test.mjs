import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
const AFFILIATE_URL = 'https://www.beyondthepage.com/purchase/choose-an-age-level.aspx?aID=8adad607'

test('Moving Beyond the Page uses the approved affiliate link', () => {
  const curricula = read('src/data/curricula.ts')
  assert.match(curricula, /id: 'moving-beyond-the-page'/, 'curriculum profile should exist')
  assert.match(curricula, new RegExp(`name: 'Moving Beyond the Page'[\\s\\S]*affiliateUrl: '${AFFILIATE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`), 'Moving Beyond the Page should use the provided affiliate URL')

  const tracker = read('docs/affiliate-outreach-tracker.csv')
  assert.match(tracker, new RegExp(`Moving Beyond the Page,approved-active,${AFFILIATE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), 'affiliate tracker should mark Moving Beyond the Page approved-active')
})
