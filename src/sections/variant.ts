// Layout comparison state for a section. On the local dev server the choice is remembered per section;
// production builds always use the default, and the switch itself is compiled out.
import { useState } from 'react'

export function useVariant<T extends string>(key: string, options: readonly T[], fallback: T) {
  const [v, setV] = useState<T>(() => {
    if (!import.meta.env.DEV) return fallback
    try {
      const saved = localStorage.getItem(`dc-layout-${key}`) as T | null
      return saved && options.includes(saved) ? saved : fallback
    } catch { return fallback }
  })
  const pick = (next: T) => {
    setV(next)
    try { localStorage.setItem(`dc-layout-${key}`, next) } catch { /* ignore */ }
  }
  return [v, pick] as const
}
