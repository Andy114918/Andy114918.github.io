import { motion, useReducedMotion } from 'framer-motion'
import { MetricCard } from '@/components/ui/MetricCard'
import { useLens } from '@/lens/LensContext'
import { heroMetrics } from '@/lens/selectors'

/**
 * The four numbers a recruiter sees first. Which four depends on the lens, so a
 * data-platform hiring manager leads with the 5 TB migration while a Gen AI one
 * leads with retrieval accuracy and the golden set.
 */
export function Impact() {
  const { lens } = useLens()
  const reduced = useReducedMotion()
  const metrics = heroMetrics(lens)

  return (
    <section aria-labelledby="impact-heading" className="border-y border-line bg-surface">
      <div className="shell py-12 sm:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="impact-heading" className="eyebrow">
            Selected impact
          </h2>
          <p className="font-mono text-[0.7rem] text-faint">every figure traced to a source</p>
        </div>

        {/*
          No AnimatePresence here. `mode="wait"` handles exactly one child, so
          wrapping a mapped list left the previous lens's cards mounted and the
          new ones never appeared — the strip silently showed the wrong metrics.
          Keying each card on the lens is enough: React remounts them, and the
          enter animation replays.
        */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={`${lens}-${metric.id}`}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: reduced ? 0 : i * 0.05 }}
            >
              <MetricCard metric={metric} compact />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
