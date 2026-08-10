import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '@/content/projects'
import { profile } from '@/content/profile'
import { NAV_SECTIONS } from './Nav'

export interface PaletteItem {
  id: string
  label: string
  group: string
  keywords: string
  run: () => void
}

/** Exported for testing: plain substring match over label + keywords. */
export function filterItems(items: PaletteItem[], query: string): PaletteItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return items
  return items.filter((i) => `${i.label} ${i.keywords}`.toLowerCase().includes(q))
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo<PaletteItem[]>(() => {
    const go = (hash: string) => () => {
      navigate('/')
      // Let the route commit before scrolling, otherwise the target does not
      // exist yet when coming from a case-study page.
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      })
    }

    return [
      ...NAV_SECTIONS.map((s) => ({
        id: `section-${s.id}`,
        label: s.label,
        group: 'Jump to',
        keywords: `section ${s.id}`,
        run: go(s.id),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        label: p.title,
        group: 'Case studies',
        keywords: `${p.tagline} ${p.stack.join(' ')}`,
        run: () => navigate(`/case/${p.slug}`),
      })),
      {
        id: 'action-resume',
        label: 'Download resume (PDF)',
        group: 'Actions',
        keywords: 'cv pdf download',
        run: () => window.open(profile.resumePath, '_blank', 'noopener'),
      },
      {
        id: 'action-email',
        label: `Email ${profile.email}`,
        group: 'Actions',
        keywords: 'contact mail reach',
        run: () => {
          window.location.href = `mailto:${profile.email}`
        },
      },
      {
        id: 'action-linkedin',
        label: 'Open LinkedIn',
        group: 'Actions',
        keywords: 'social profile network',
        run: () => window.open(profile.linkedin, '_blank', 'noopener'),
      },
    ]
  }, [navigate])

  const results = useMemo(() => filterItems(items, query), [items, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      inputRef.current?.focus()
    }
  }, [open])

  // Clamp rather than reset: typing should not bounce the highlight around, but
  // it must never point past the end of a shortened result list.
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(results.length - 1, 0)))
  }, [results.length])

  if (!open) return null

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (results.length ? (a + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[active]
      if (item) {
        item.run()
        onClose()
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sections, case studies, actions…"
          aria-label="Search"
          aria-controls="palette-results"
          className="w-full border-b border-line bg-transparent px-4 py-3.5 text-sm
                     text-fg outline-none placeholder:text-faint"
        />
        <ul id="palette-results" className="max-h-80 overflow-y-auto p-1.5">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-faint">No matches</li>
          )}
          {results.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  item.run()
                  onClose()
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2
                            text-left text-sm transition-colors ${
                              i === active ? 'bg-raised text-fg' : 'text-muted'
                            }`}
              >
                <span className="truncate">{item.label}</span>
                <span className="shrink-0 font-mono text-[0.65rem] text-faint">{item.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
