import type { Lens } from '@/content/types'
import { LENSES } from '@/content/types'

export const LENS_PARAM = 'lens'

/**
 * AI Engineer is the default because it is the widest of the three tracks and
 * the one the strongest evidence supports.
 */
export const DEFAULT_LENS: Lens = 'ai'

export function isLens(value: unknown): value is Lens {
  return typeof value === 'string' && (LENSES as readonly string[]).includes(value)
}

/**
 * The lens comes from the URL and nowhere else.
 *
 * There is deliberately no persistence. The visible role tabs were removed, so
 * a stored preference would be a one-way door: a visitor who once opened a
 * `?lens=data` link would be pinned to that view on every later visit with no
 * control to change it. Reading only the URL keeps every plain visit identical
 * and predictable, while a shared `?lens=genai` link still arrives pre-tailored.
 */
export function resolveLensFromUrl(search: string): Lens {
  let fromUrl: string | null = null
  try {
    fromUrl = new URLSearchParams(search).get(LENS_PARAM)
  } catch {
    fromUrl = null
  }
  return isLens(fromUrl) ? fromUrl : DEFAULT_LENS
}
