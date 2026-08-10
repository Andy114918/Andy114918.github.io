import type { Metric } from '@/content/types'
import { SourceTag } from './primitives'

/**
 * A single quantified claim. `measured: false` renders a visible "illustrative"
 * badge so a reader can never mistake a modelled figure for an observed one.
 */
export function MetricCard({ metric, compact = false }: { metric: Metric; compact?: boolean }) {
  return (
    <div className={`card p-5 ${compact ? '' : 'sm:p-6'}`}>
      <div className="flex items-baseline gap-2">
        <span
          className={`font-mono font-semibold tracking-tight text-accent ${
            compact ? 'text-2xl' : 'text-3xl sm:text-4xl'
          }`}
        >
          {metric.value}
        </span>
        {metric.measured === false && (
          <span className="rounded bg-raised px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-faint">
            illustrative
          </span>
        )}
      </div>
      <p className="mt-2 text-sm font-medium text-fg">{metric.label}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-muted">{metric.context}</p>
      <div className="mt-3 border-t border-line pt-3">
        <SourceTag source={metric.source} note={metric.sourceNote} />
      </div>
    </div>
  )
}
