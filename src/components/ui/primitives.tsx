import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { SOURCE_LABELS, type Source } from '@/content/types'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  lead?: string
  children: ReactNode
  /** Alternate sections get a subtly raised background to break up the page. */
  tone?: 'base' | 'raised'
}

export function Section({ id, eyebrow, title, lead, children, tone = 'base' }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={tone === 'raised' ? 'border-y border-line bg-surface' : ''}
    >
      <div className="shell py-16 sm:py-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id={`${id}-heading`}
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {title}
          </h2>
          {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{lead}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

/**
 * Fade-and-rise on scroll. Collapses to a plain render when the visitor has
 * asked the OS to reduce motion — no transform, no opacity animation, so the
 * content is simply there.
 */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion()
  if (reduced) return <>{children}</>
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Shows where a claim came from. Every number on this site carries one; that is
 * the whole point of the content model.
 */
export function SourceTag({ source, note }: { source: Source; note: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-faint"
      title={note}
    >
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-faint" />
      {SOURCE_LABELS[source]}
    </span>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>
}
