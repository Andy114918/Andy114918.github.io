import { Suspense, lazy, useEffect, type ComponentType } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projectsBySlug } from '@/content/projects'
import { MetricCard } from '@/components/ui/MetricCard'
import { AgentTree } from '@/components/viz/AgentTree'
import { McpFlow } from '@/components/viz/McpFlow'
import { RagPipeline } from '@/components/viz/RagPipeline'
import { NotFound } from './NotFound'

// Must stay lazy here too. A static import in this file would pull Recharts
// back into the main chunk and silently undo the split in FieldResults.
const AgriDashboard = lazy(() =>
  import('@/components/viz/AgriDashboard').then((m) => ({ default: m.AgriDashboard }))
)

/** Each case study gets the interactive piece that actually belongs to it. */
const VISUAL: Record<string, ComponentType> = {
  agriai: AgriDashboard,
  'adaptive-rag': RagPipeline,
  'mcp-server': McpFlow,
  'agent-orchestration': AgentTree,
}

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? projectsBySlug.get(slug) : undefined

  useEffect(() => {
    if (project) document.title = `${project.title} — Anirudh Edupuganti`
    return () => {
      document.title = 'Anirudh Edupuganti — AI & Data Platform Engineer'
    }
  }, [project])

  if (!project) return <NotFound />

  const Visual = slug ? VISUAL[slug] : undefined

  return (
    <article className="shell py-12 sm:py-16">
      <Link to="/#work" className="font-mono text-xs text-muted hover:text-fg">
        ← Back to all work
      </Link>

      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-3 text-lg text-accent">{project.tagline}</p>
        <p className="mt-5 text-base leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        {project.highlights.length > 0 && (
          <ul className="mt-6 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm text-muted">
                <span
                  aria-hidden="true"
                  className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                {h}
              </li>
            ))}
          </ul>
        )}
      </header>

      {project.metrics.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {project.metrics.map((m) => (
            <MetricCard key={m.id} metric={m} compact />
          ))}
        </div>
      )}

      {Visual && (
        <div className="mt-12">
          <Suspense
            fallback={
              <div
                className="h-96 animate-pulse rounded-xl border border-line bg-raised"
                aria-label="Loading visualisation"
              />
            }
          >
            <Visual />
          </Suspense>
        </div>
      )}

      <div className="mt-12 max-w-3xl space-y-10">
        {project.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{section.body}</p>
          </section>
        ))}
      </div>

      {!project.repoUrl && (
        <p className="mt-12 rounded-lg border border-line bg-raised p-4 text-xs leading-relaxed text-faint">
          Source for this system is not public. Happy to walk through the design and the code in
          detail on a call.
        </p>
      )}

      <div className="mt-12 border-t border-line pt-8">
        <Link to="/#work" className="text-sm font-medium text-accent hover:underline">
          ← All work
        </Link>
      </div>
    </article>
  )
}
