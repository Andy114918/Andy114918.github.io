import { Reveal, Section } from '@/components/ui/primitives'
import { credentialGroups } from '@/content/credentials'
import { education } from '@/content/research'

export function Credentials() {
  const featured = credentialGroups.filter((g) => g.featured)
  const rest = credentialGroups.filter((g) => !g.featured)

  return (
    <Section id="credentials" eyebrow="Education & credentials" title="Formal grounding" tone="raised">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr]">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Education</h3>
          <ol className="mt-4 space-y-5">
            {education.map((e) => (
              <li key={e.id}>
                <p className="font-mono text-xs text-faint">{e.period}</p>
                <p className="mt-1 text-sm font-medium text-fg">{e.degree}</p>
                <p className="text-xs text-muted">
                  {e.institution} · {e.location}
                </p>
                {e.note && <p className="mt-1 text-xs leading-relaxed text-faint">{e.note}</p>}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-tight">Certifications</h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {featured.map((group, i) => (
              <Reveal key={group.id} delay={i * 0.03}>
                <div className="card h-full border-accent/30 p-5">
                  <p className="text-sm font-medium leading-snug text-fg">{group.name}</p>
                  <p className="mt-1 font-mono text-[0.65rem] text-faint">{group.issuer}</p>
                  <ul className="mt-3 space-y-1">
                    {group.items.map((item) => (
                      <li key={item} className="text-xs leading-relaxed text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {rest.map((group) => (
            <div key={group.id} className="mt-4">
              <p className="text-sm font-medium text-fg">{group.name}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
