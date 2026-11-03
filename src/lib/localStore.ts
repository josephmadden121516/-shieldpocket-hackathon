/**
 * Tiny typed wrapper over localStorage for device-local feature state
 * (checklists, saved reports, playbook progress). Nothing here touches
 * the network; failures fall back silently so features keep working.
 */

const PREFIX = 'shieldpocket-local-v1:'

export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage failures must not break features.
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // Ignore storage failures.
  }
}
