import { Link } from 'react-router-dom'
import { Reveal, Section } from '@/components/ui/primitives'
import { useLens } from '@/lens/LensContext'
import { sortedProjects } from '@/lens/selectors'
import type { Project } from '@/content/types'

const KIND_LABEL: Record<Project['kind'], string> = {
  research: 'Research · deployed',
  'ai-system': 'AI system',
  platform: 'Platform',
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <article className="card group flex h-full flex-col p-6 transition-colors hover:border-accent/50">
        <div className="flex items-center gap-2">
          <span className="chip">{KIND_LABEL[project.kind]}</span>
        </div>

        <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight">
          <Link to={`/case/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm font-medium text-accent">{project.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

        {project.metrics.length > 0 && (
          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-4">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.id}>
                <dt className="font-mono text-lg font-semibold text-fg">{m.value}</dt>
                <dd className="text-[0.7rem] text-faint">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-4">
          <Link
            to={`/case/${project.slug}`}
            className="text-sm font-medium text-accent hover:underline"
          >
            Read the case study →
          </Link>
          {/* Slot kept for when public repos exist; hidden until then rather
              than rendering a dead or placeholder link. */}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-muted hover:text-fg"
            >
              View code
            </a>
          )}
        </div>
      </article>
    </Reveal>
  )
}

export function Work() {
  const { lens } = useLens()
  const projects = sortedProjects(lens)

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Systems I built end to end"
      lead="Each one links to a deeper write-up covering the architecture, the trade-offs, and how it was evaluated."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
