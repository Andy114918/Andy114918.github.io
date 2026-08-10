import { Reveal, Section } from '@/components/ui/primitives'
import { useLens } from '@/lens/LensContext'
import { roleBullets, sortedRoles } from '@/lens/selectors'

export function Experience() {
  const { lens } = useLens()
  const roles = sortedRoles(lens)

  return (
    <Section
      id="experience"
      eyebrow="Production experience"
      title="Four years shipping to production"
      lead="Four years across healthcare, telecom and pharma — building the pipelines, platforms and cloud infrastructure these companies run on."
      tone="raised"
    >
      <ol className="space-y-10">
        {roles.map((role, i) => (
          <li key={role.id}>
            <Reveal delay={i * 0.04}>
              <div className="grid gap-5 sm:grid-cols-[minmax(0,11rem)_1fr]">
                <div>
                  <p className="font-mono text-xs text-faint">{role.period}</p>
                  <p className="mt-1 text-sm font-semibold text-fg">{role.company}</p>
                  <p className="mt-0.5 text-xs text-muted">{role.location}</p>
                </div>

                <div className="min-w-0 border-l border-line pl-5 sm:pl-6">
                  <h3 className="text-base font-semibold tracking-tight">{role.title}</h3>

                  <ul className="mt-3 space-y-2">
                    {roleBullets(role, lens).map((text) => (
                      <li
                        key={text}
                        className="relative pl-4 text-sm leading-relaxed text-muted
                                   before:absolute before:left-0 before:top-[0.6em] before:h-1
                                   before:w-1 before:rounded-full before:bg-faint"
                      >
                        {text}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {role.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
