import { useState } from 'react'

interface Step {
  actor: 'model' | 'server'
  label: string
  detail: string
}

interface Scenario {
  id: string
  name: string
  trigger: string
  steps: Step[]
  outcome: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 'ssis',
    name: 'Overnight SSIS package failed',
    trigger: 'A nightly load did not complete. No error surfaced to the dashboard.',
    steps: [
      { actor: 'model', label: 'list_resources()', detail: 'Discovers what it is allowed to see.' },
      {
        actor: 'server',
        label: 'returns scoped catalogue',
        detail: 'Execution logs, package metadata, Terraform state. No connection strings.',
      },
      {
        actor: 'model',
        label: 'read ssis://executions/latest',
        detail: 'Pulls the failing run and its step-level history.',
      },
      {
        actor: 'server',
        label: 'queries with its own credentials',
        detail: 'The server authenticates. The model never holds a secret.',
      },
      {
        actor: 'model',
        label: 'read terraform://state/etl',
        detail: 'Checks whether infrastructure changed underneath the job.',
      },
      {
        actor: 'model',
        label: 'correlate + report',
        detail: 'Ties the failure window to a specific resource change.',
      },
    ],
    outcome:
      'A root-cause summary in seconds, from a chain a human on call would otherwise walk manually at 3am.',
  },
  {
    id: 'drift',
    name: 'Terraform state drift',
    trigger: 'A pipeline that ran fine last week now times out intermittently.',
    steps: [
      {
        actor: 'model',
        label: 'read terraform://state/current',
        detail: 'Fetches the recorded desired state.',
      },
      {
        actor: 'server',
        label: 'returns sanitised state',
        detail: 'Secrets and backend credentials stripped before the response is shaped.',
      },
      {
        actor: 'model',
        label: 'diff against last known-good',
        detail: 'Looks for capacity, networking or IAM changes in the window.',
      },
      {
        actor: 'model',
        label: 'read logs://pipeline/timeouts',
        detail: 'Correlates the drift window against the timeout distribution.',
      },
      {
        actor: 'model',
        label: 'propose remediation',
        detail: 'Names the specific resource and the change that caused it.',
      },
    ],
    outcome:
      'Drift identified against evidence rather than intuition, with the offending resource named.',
  },
]

const ACTOR_STYLE: Record<Step['actor'], string> = {
  model: 'border-accent/50 bg-accent/[0.06]',
  server: 'border-line bg-raised',
}

const ACTOR_LABEL: Record<Step['actor'], string> = {
  model: 'Model',
  server: 'MCP server',
}

export function McpFlow() {
  const [activeId, setActiveId] = useState(SCENARIOS[0]?.id ?? '')
  const scenario = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0]
  if (!scenario) return null

  return (
    <div>
      <div role="group" aria-label="Failure scenario" className="flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === activeId}
            onClick={() => setActiveId(s.id)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              s.id === activeId
                ? 'border-accent bg-accent/10 text-fg'
                : 'border-line bg-raised text-muted hover:text-fg'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{scenario.trigger}</p>

      <ol className="mt-5 space-y-2">
        {scenario.steps.map((step, i) => (
          <li key={step.label} className={`rounded-lg border p-3 ${ACTOR_STYLE[step.actor]}`}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[0.65rem] text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-faint">
                {ACTOR_LABEL[step.actor]}
              </span>
              <code className="font-mono text-xs font-medium text-fg">{step.label}</code>
            </div>
            <p className="mt-1.5 pl-8 text-xs leading-relaxed text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-lg border border-accent/30 bg-accent/[0.04] p-4">
        <p className="eyebrow text-accent">Outcome</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{scenario.outcome}</p>
        <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-faint">
          Throughout: the server holds every credential and returns scoped, shaped responses. There
          is no path by which a prompt injection hidden in a log line can exfiltrate a secret,
          because the secret was never in the context window.
        </p>
      </div>
    </div>
  )
}
