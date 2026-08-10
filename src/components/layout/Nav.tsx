import { Link, useLocation } from 'react-router-dom'
import { profile } from '@/content/profile'
import type { Theme } from '@/lib/theme'
import { ThemeToggle } from './ThemeToggle'

export const NAV_SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'press', label: 'Press' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

interface NavProps {
  theme: Theme
  onToggleTheme: () => void
  onOpenPalette: () => void
}

export function Nav({ theme, onToggleTheme, onOpenPalette }: NavProps) {
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  // Anchors only resolve on the home page; from a case study they need to
  // navigate home first, so they become root-relative links with a hash.
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link
          to="/"
          className="shrink-0 font-mono text-sm font-semibold tracking-tight hover:text-accent"
        >
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={href(s.id)} className="text-sm text-muted transition-colors hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            /* No aria-label: the visible "Search" text is the accessible name.
               An aria-label that does not contain the visible text breaks
               voice control, which types what it sees. */
            title="Search (Ctrl+K)"
            className="hidden items-center gap-2 rounded-lg border border-line bg-raised px-2.5 py-2
                       text-xs text-faint transition-colors hover:text-fg md:flex"
          >
            <span>Search</span>
            <kbd className="rounded border border-line bg-surface px-1 font-mono text-[0.65rem]">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </nav>
    </header>
  )
}
