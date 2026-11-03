import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const appSource = readFileSync(join(root, 'src/App.tsx'), 'utf8')
const overviewSource = readFileSync(join(root, 'src/components/Overview.tsx'), 'utf8')

// Section order mirrors the mobile app (top to bottom). The account row has
// no web equivalent (no login by design). Compliance mapping and risk metrics
// are web-only event features, parked next to their closest relatives.
const EXPECTED_ORDER = [
  'overview',
  'sophia-assistant',
  'threat-analyzer',
  'api-usage',
  'report-activity',
  'executive-board-briefing',
  'threat-digest',
  'threat-watcher',
  'risk-metrics',
  'scam-analyzer',
  'screenshot-analyzer',
  'cve-triage',
  'compliance-map',
  'saved-reports',
  'security-checkup',
  'action-plan',
  'device-posture',
  'manual-checks',
  'hardening-guides',
  'badge-studio',
  'firewall-checkup',
  'cookie-checker',
  'password-checker',
  'incident-kit',
  'patch-generator',
  'attack-simulator',
  'audit-lab',
  'phish-drills',
  'phishing-game',
  'link-checker',
  'incident-timeline',
  'insurance-readiness',
  'war-room',
  'faq',
]

function appSectionIds() {
  return [...appSource.matchAll(/<section[^>]*\bid="([a-z-]+)"/g)].map((m) => m[1])
}

function overviewIds() {
  return [...overviewSource.matchAll(/\bid: '([a-z-]+)'/g)].map((m) => m[1])
}

describe('page structure parity', () => {
  it('renders sections in mobile-app order', () => {
    assert.deepEqual(appSectionIds(), EXPECTED_ORDER)
  })

  it('overview links to every section exactly once', () => {
    assert.deepEqual([...overviewIds()].sort(), [...EXPECTED_ORDER].sort())
  })

  it('overview is a dropdown menu, not a card grid', () => {
    assert.match(overviewSource, /<select/)
    assert.doesNotMatch(overviewSource, /overview-grid/)
  })
})
