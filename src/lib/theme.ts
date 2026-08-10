export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'portfolio:theme'

export function isTheme(v: unknown): v is Theme {
  return v === 'light' || v === 'dark'
}

/** Stored choice wins; otherwise follow the OS. Defaults to dark. */
export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (isTheme(stored)) return stored
  } catch {
    // ignore — fall through to the media query
  }
  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }
  return 'dark'
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export function storeTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Non-fatal — the theme still applies for this session.
  }
}

/** True when the visitor has asked the OS to minimise animation. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
