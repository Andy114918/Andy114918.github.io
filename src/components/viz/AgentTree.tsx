import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Agent {
  id: string
  name: string
  role: string
  tools: string[]
}

const SUBAGENTS: Agent[] = [
  { id: 'fetch', name: 'Fetch', role: 'Pulls multi-source streams', tools: ['HTTP', 'Feed API'] },
  { id: 'process', name: 'Process', role: 'Normalises and deduplicates', tools: ['Pandas', 'SQL'] },
  { id: 'summarise', name: 'Summarise', role: 'Condenses to a digest', tools: ['LLM', 'Templates'] },
  { id: 'verify', name: 'Verify', role: 'Checks claims against sources', tools: ['Retrieval'] },
]

/**
 * Staged reveal of the supervisor dispatching to subagents. It is a
 * demonstration of the delegation shape, not a replay of measured runs — the
 * labels say "traced"/"queued" rather than showing invented token counts,
 * because inventing numbers here would undercut the whole point of the site.
 */
export function AgentTree() {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(reduced ? SUBAGENTS.length : 0)

  useEffect(() => {
    if (reduced || step >= SUBAGENTS.length) return
    const t = setTimeout(() => setStep((s) => s + 1), 700)
    return () => clearTimeout(t)
  }, [step, reduced])

  return (
    <div>
      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="rounded-lg border border-accent bg-accent/10 px-4 py-2.5">
            <p className="text-sm font-semibold text-fg">Supervisor</p>
            <p className="mt-0.5 font-mono text-[0.65rem] text-faint">
              decides delegation at runtime
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep(0)}
            className="rounded-md border border-line bg-raised px-2.5 py-1 font-mono text-[0.7rem]
                       text-muted transition-colors hover:text-fg"
          >
            Replay
          </button>
        </div>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {SUBAGENTS.map((agent, i) => {
            const dispatched = i < step
            return (
              <li
                key={agent.id}
                className={`rounded-lg border p-4 transition-all duration-500 ${
                  dispatched
                    ? 'border-line bg-raised opacity-100'
                    : 'border-line/50 bg-surface opacity-40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-fg">{agent.name}</p>
                  <span
                    className={`font-mono text-[0.6rem] uppercase tracking-wider ${
                      dispatched ? 'text-accent' : 'text-faint'
                    }`}
                  >
                    {dispatched ? 'traced' : 'queued'}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted">{agent.role}</p>
                <ul className="mt-2.5 flex flex-wrap gap-1">
                  {agent.tools.map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-4 rounded-lg border border-accent/30 bg-accent/[0.04] p-4">
        <p className="eyebrow text-accent">Why the instrumentation is the hard part</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Multi-agent systems fail quietly. A subagent returns something plausible, the supervisor
          accepts it, and the failure only surfaces three steps later as a wrong answer with no
          obvious origin. Every run carries tracing plus token and cost accounting, which turns
          planning failures into visible anomalies — an agent that burned 40k tokens on a task that
          should have cost 3k has told you something.
        </p>
      </div>
    </div>
  )
}
