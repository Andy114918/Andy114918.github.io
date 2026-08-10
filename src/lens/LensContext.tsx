import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { Lens } from '@/content/types'
import { DEFAULT_LENS, resolveLensFromUrl } from './lens-core'

interface LensValue {
  lens: Lens
}

const LensCtx = createContext<LensValue | null>(null)

/**
 * Supplies the active lens, read once from the `?lens=` URL parameter.
 *
 * There is no setter and no persistence by design — the visible role tabs were
 * removed, so nothing in the UI changes the lens at runtime. A plain visit is
 * always the AI Engineer framing; a shared `?lens=data` link arrives tailored.
 */
export function LensProvider({ children }: { children: ReactNode }) {
  const lens = useMemo<Lens>(() => {
    if (typeof window === 'undefined') return DEFAULT_LENS
    return resolveLensFromUrl(window.location.search)
  }, [])

  const value = useMemo(() => ({ lens }), [lens])
  return <LensCtx.Provider value={value}>{children}</LensCtx.Provider>
}

export function useLens(): LensValue {
  const ctx = useContext(LensCtx)
  if (!ctx) throw new Error('useLens must be used within a LensProvider')
  return ctx
}
