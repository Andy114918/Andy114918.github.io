import { useState } from 'react'
import { timeline } from '@/content/timeline'
import type { TimelineTrack } from '@/content/types'

const TRACKS: Array<{ id: TimelineTrack | 'all'; label: string }> = [
  { id: 'all', label: 'Everything' },
  { id: 'work', label: 'Work' },
  { id: 'research', label: 'Research' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'education', label: 'Education' },
]

const TRACK_DOT: Record<TimelineTrack, string> = {
  work: 'bg-accent',
  research: 'bg-emerald-500',
  recognition: 'bg-amber-500',
  education: 'bg-faint',
}

const TRACK_LABEL: Record<TimelineTrack, string> = {
  work: 'Work',
  research: 'Research',
  recognition: 'Recognition',
  education: 'Education',
}

export function Timeline() {
  const [filter, setFilter] = useState<TimelineTrack | 'all'>('all')

  const events = timeline
    .filter((e) => filter === 'all' || e.track === filter)
    .slice()
    .sort((a, b) => a.order - b.order)

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter timeline by track">
        {TRACKS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={filter === t.id}
            onClick={() => setFilter(t.id)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === t.id
                ? 'border-accent bg-accent/10 text-fg'
                : 'border-line bg-raised text-muted hover:text-fg'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ol className="relative mt-8 border-l border-line pl-6">
        {events.map((e) => (
          <li key={e.id} className="relative pb-8 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full ring-4
                          ring-bg ${TRACK_DOT[e.track]}`}
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-mono text-xs text-faint">{e.date}</p>
              <span className="font-mono text-[0.6rem] uppercase tracking-wider text-faint">
                {TRACK_LABEL[e.track]}
              </span>
            </div>
            <h3 className="mt-1 text-sm font-semibold tracking-tight text-fg">{e.title}</h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted">{e.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
