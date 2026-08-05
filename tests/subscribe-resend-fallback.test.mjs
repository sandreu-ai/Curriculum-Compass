import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')

test('subscribe route retries Resend contact writes without custom properties when properties are not configured', () => {
  const route = read('src/app/api/subscribe/route.ts')

  assert.match(route, /function isMissingResendPropertyError/, 'route should classify Resend missing custom property errors')
  assert.match(route, /buildContactPayload\({ email, properties: {}, audienceId, segmentIds, topicId }\)/, 'new contact fallback should retry without custom properties')
  assert.match(route, /resend\.contacts\.update\(\{[\s\S]*properties: \{\}/, 'existing contact fallback should retry update without custom properties')
  assert.match(route, /console\.warn\('Resend contact properties are not configured/, 'route should log a clear configuration warning')
})
