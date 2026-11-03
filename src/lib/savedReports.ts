import { loadJson, saveJson } from './localStore'

export type SavedReportKind =
  | 'threat'
  | 'screenshot'
  | 'plan'
  | 'report'

export interface SavedReport {
  id: string
  kind: SavedReportKind
  title: string
  body: string
  createdAt: string
}

const STORAGE_KEY = 'saved-reports'
const MAX_REPORTS = 50
const MAX_BODY_LENGTH = 20000

function makeId(): string {
  try {
    const generator = crypto as Crypto & { randomUUID?: () => string }
    if (typeof generator.randomUUID === 'function') {
      return generator.randomUUID()
    }
  } catch {
    // Fall through to the timestamp id.
  }
  return `report-${Date.now()}-${Math.floor(Math.random() * 100000)}`
}

export function loadSavedReports(): SavedReport[] {
  const stored = loadJson<SavedReport[]>(STORAGE_KEY, [])
  if (!Array.isArray(stored)) return []
  return stored.filter(
    (entry) =>
      entry !== null &&
      typeof entry === 'object' &&
      typeof entry.id === 'string' &&
      typeof entry.title === 'string' &&
      typeof entry.body === 'string',
  )
}

export function saveReport(
  kind: SavedReportKind,
  title: string,
  body: string,
): SavedReport {
  const entry: SavedReport = {
    id: makeId(),
    kind,
    title: title.trim().slice(0, 200) || 'Untitled report',
    body: body.slice(0, MAX_BODY_LENGTH),
    createdAt: new Date().toISOString(),
  }
  const next = [entry, ...loadSavedReports()].slice(0, MAX_REPORTS)
  saveJson(STORAGE_KEY, next)
  return entry
}

export function deleteSavedReport(id: string): SavedReport[] {
  const next = loadSavedReports().filter((entry) => entry.id !== id)
  saveJson(STORAGE_KEY, next)
  return next
}
