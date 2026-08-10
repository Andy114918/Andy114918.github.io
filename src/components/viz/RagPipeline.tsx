import { useState } from 'react'

interface PipelineNode {
  id: string
  label: string
  sub: string
  x: number
  y: number
  w: number
  detail: { what: string; why: string; tradeoff: string }
}

const NODES: PipelineNode[] = [
  {
    id: 'query',
    label: 'Query',
    sub: 'inbound',
    x: 8,
    y: 78,
    w: 92,
    detail: {
      what: 'A natural-language question arriving at the REST API.',
      why: 'Everything downstream depends on classifying this correctly, so routing happens first rather than after an expensive retrieval.',
      tradeoff: 'One extra hop before any retrieval starts.',
    },
  },
  {
    id: 'router',
    label: 'Semantic router',
    sub: 'classify intent',
    x: 128,
    y: 78,
    w: 128,
    detail: {
      what: 'Classifies the query as semantic, structured, or both, and directs it accordingly.',
      why: '"What did the Q3 memo conclude" and "how many pipelines failed in March" are different retrieval problems. Treating them identically is why single-index RAG fails confidently.',
      tradeoff: 'A misrouted query is worse than no routing — which is exactly what the golden set exists to catch.',
    },
  },
  {
    id: 'vector',
    label: 'Dense vector store',
    sub: 'unstructured prose',
    x: 288,
    y: 18,
    w: 148,
    detail: {
      what: 'Embedded document chunks searched by semantic similarity.',
      why: 'The right tool when the answer is expressed in prose and the wording of the question will not match the wording of the source.',
      tradeoff: 'Cosine similarity cannot count, aggregate or filter reliably.',
    },
  },
  {
    id: 'sql',
    label: 'Structured metadata',
    sub: 'Spark SQL',
    x: 288,
    y: 138,
    w: 148,
    detail: {
      what: 'Typed metadata queried with Spark SQL — counts, dates, statuses, owners.',
      why: 'Aggregations and filters should be executed, not approximated by nearest-neighbour search over text.',
      tradeoff: 'Only answers what the schema models; anything outside it must go the vector route.',
    },
  },
  {
    id: 'fusion',
    label: 'Fusion',
    sub: 'rank + merge',
    x: 468,
    y: 78,
    w: 104,
    detail: {
      what: 'Merges and re-ranks results when a query needs both routes.',
      why: 'Hybrid questions are common — "summarise the failures in March" needs both the count and the prose.',
      tradeoff: 'Ranking across two scoring regimes needs calibration, re-checked by the regression suite.',
    },
  },
  {
    id: 'llm',
    label: 'LLM',
    sub: 'grounded answer',
    x: 600,
    y: 78,
    w: 92,
    detail: {
      what: 'Generates the answer strictly from retrieved context.',
      why: 'The model is the last step, not the system. Retrieval quality sets the ceiling on answer quality.',
      tradeoff: 'Good generation cannot rescue bad retrieval — it only makes the error more fluent.',
    },
  },
]

const EDGES: Array<[string, string]> = [
  ['query', 'router'],
  ['router', 'vector'],
  ['router', 'sql'],
  ['vector', 'fusion'],
  ['sql', 'fusion'],
  ['fusion', 'llm'],
]

const NODE_H = 52

function byId(id: string): PipelineNode {
  const found = NODES.find((n) => n.id === id)
  if (!found) throw new Error(`Unknown pipeline node: ${id}`)
  return found
}

export function RagPipeline() {
  const [selected, setSelected] = useState('router')
  const active = byId(selected)

  return (
    <div>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 700 210"
          className="h-auto w-full min-w-[42rem]"
          role="img"
          aria-label="Adaptive multi-index RAG pipeline: a query is classified by a semantic router, sent to a dense vector store, structured SQL metadata, or both, merged by a fusion step, then answered by an LLM."
        >
          <defs>
            <marker
              id="rag-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0 L8 4 L0 8 z" fill="rgb(var(--faint))" />
            </marker>
          </defs>

          {EDGES.map(([from, to]) => {
            const a = byId(from)
            const b = byId(to)
            const x1 = a.x + a.w
            const y1 = a.y + NODE_H / 2
            const x2 = b.x
            const y2 = b.y + NODE_H / 2
            const mid = (x1 + x2) / 2
            return (
              <path
                key={`${from}-${to}`}
                d={`M${x1} ${y1} C${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke="rgb(var(--faint))"
                strokeWidth="1.5"
                markerEnd="url(#rag-arrow)"
                opacity={0.7}
              />
            )
          })}

          {NODES.map((n) => {
            const isActive = n.id === selected
            return (
              <g
                key={n.id}
                onClick={() => setSelected(n.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelected(n.id)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${n.label} — ${n.sub}`}
                className="cursor-pointer"
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={NODE_H}
                  rx="8"
                  fill={isActive ? 'rgb(var(--accent) / 0.12)' : 'rgb(var(--raised))'}
                  stroke={isActive ? 'rgb(var(--accent))' : 'rgb(var(--line))'}
                  strokeWidth={isActive ? 2 : 1}
                />
                <text
                  x={n.x + n.w / 2}
                  y={n.y + 22}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="rgb(var(--fg))"
                >
                  {n.label}
                </text>
                <text
                  x={n.x + n.w / 2}
                  y={n.y + 38}
                  textAnchor="middle"
                  fontSize="10"
                  fill="rgb(var(--faint))"
                >
                  {n.sub}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <p className="mt-2 font-mono text-[0.7rem] text-faint">
        Select a stage to see the reasoning behind it.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="card p-4">
          <p className="eyebrow">What it does</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{active.detail.what}</p>
        </div>
        <div className="card p-4">
          <p className="eyebrow">Why this design</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{active.detail.why}</p>
        </div>
        <div className="card p-4">
          <p className="eyebrow">The trade-off</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{active.detail.tradeoff}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-accent/30 bg-accent/[0.04] p-4">
        <p className="eyebrow text-accent">How it was evaluated</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          A 200-question golden set with known-good contexts runs as an automated regression check
          on every index change — so a re-chunking or an embedding-model swap cannot silently
          degrade retrieval. Measured result: a 40% improvement in context retrieval accuracy.
          Without a harness like this, &ldquo;we improved retrieval&rdquo; is an opinion.
        </p>
      </div>
    </div>
  )
}
