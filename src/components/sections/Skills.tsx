import { Reveal, Section } from '@/components/ui/primitives'
import { useLens } from '@/lens/LensContext'
import { isPrimaryGroup, sortedSkillGroups } from '@/lens/selectors'

/**
 * No percentage bars anywhere. A self-assigned "Python 95%" is unfalsifiable
 * and experienced reviewers discount it; "Apache Spark — EMR at Charter" is a
 * claim someone can actually check, so provenance is shown instead.
 */
export function Skills() {
  const { lens } = useLens()
  const groups = sortedSkillGroups(lens)

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools, and where they were used"
      lead="Where a tool was used in production, the place is named — a skill list without provenance is just a word cloud."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group, i) => {
          const primary = isPrimaryGroup(group, lens)
          return (
            <Reveal key={group.id} delay={i * 0.03}>
              <div
                className={`card h-full p-5 ${
                  primary ? 'border-accent/40' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold tracking-tight">{group.name}</h3>
                  {primary && (
                    <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-wider text-accent">
                      core
                    </span>
                  )}
                </div>

                <ul className="mt-4 space-y-2">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-sm text-fg">{skill.name}</span>
                      {skill.provenance && (
                        <span className="font-mono text-[0.65rem] text-faint">
                          {skill.provenance}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
