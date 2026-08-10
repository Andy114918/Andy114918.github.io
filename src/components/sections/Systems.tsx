import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/primitives'
import { AgentTree } from '@/components/viz/AgentTree'
import { McpFlow } from '@/components/viz/McpFlow'
import { RagPipeline } from '@/components/viz/RagPipeline'

const TABS = [
  {
    id: 'rag',
    label: 'Multi-index RAG',
    slug: 'adaptive-rag',
    blurb: 'Routing a query to the index that can actually answer it.',
  },
  {
    id: 'mcp',
    label: 'MCP server',
    slug: 'mcp-server',
    blurb: 'Giving a model access to production systems without giving it credentials.',
  },
  {
    id: 'agents',
    label: 'Agent orchestration',
    slug: 'agent-orchestration',
    blurb: 'A supervisor delegating to specialised subagents, with every run traced.',
  },
] as const

type TabId = (typeof TABS)[number]['id']

export function Systems() {
  const [activeId, setActiveId] = useState<TabId>('rag')
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0]

  return (
    <Section
      id="systems"
      eyebrow="How they work"
      title="The architecture, not the buzzwords"
      lead="Anyone can list RAG, MCP and multi-agent on a resume. These are the design decisions behind each one, including what each choice costs."
    >
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={tab.id === activeId}
            onClick={() => setActiveId(tab.id)}
            className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
              tab.id === activeId
                ? 'border-accent bg-accent/10 text-fg'
                : 'border-line bg-raised text-muted hover:text-fg'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted">{active.blurb}</p>

      <div className="mt-6">
        {activeId === 'rag' && <RagPipeline />}
        {activeId === 'mcp' && <McpFlow />}
        {activeId === 'agents' && <AgentTree />}
      </div>

      <p className="mt-6 text-sm">
        <Link to={`/case/${active.slug}`} className="font-medium text-accent hover:underline">
          Read the full {active.label} case study →
        </Link>
      </p>
    </Section>
  )
}
