import { useCallback, useState } from 'react'
import { loadJson, saveJson } from './localStore'

/**
 * Persisted checklist state keyed by item id. Shared by every checkup,
 * playbook, and manual-check list so progress survives reloads.
 */
export function useChecklist(
  storageKey: string,
  itemIds: string[],
): {
  checked: string[]
  isChecked: (id: string) => boolean
  toggle: (id: string) => void
  reset: () => void
  doneCount: number
} {
  const valid = useCallback(
    (ids: string[]) => ids.filter((id) => itemIds.includes(id)),
    [itemIds],
  )
  const [checked, setChecked] = useState<string[]>(() =>
    valid(loadJson<string[]>(storageKey, [])),
  )

  const toggle = useCallback(
    (id: string) => {
      setChecked((prev) => {
        const next = prev.includes(id)
          ? prev.filter((entry) => entry !== id)
          : [...prev, id]
        saveJson(storageKey, next)
        return next
      })
    },
    [storageKey],
  )

  const reset = useCallback(() => {
    setChecked([])
    saveJson(storageKey, [])
  }, [storageKey])

  return {
    checked,
    isChecked: (id: string) => checked.includes(id),
    toggle,
    reset,
    doneCount: checked.length,
  }
}
