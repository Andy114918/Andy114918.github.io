import { Reveal, Section } from '@/components/ui/primitives'
import { community } from '@/content/research'

/**
 * Framed as supporter recognitions, not professional awards — that is what they
 * are, and overstating them would undercut the credibility the rest of the site
 * is built on.
 */
export function Community() {
  return (
    <Section
      id="community"
      eyebrow="Community & service"
      title="Outside the work"
      lead="Recognitions from organisations supported over the years. Not engineering credentials — just part of the picture."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {community.map((item, i) => (
          <li key={item.id}>
            <Reveal delay={i * 0.04}>
              <figure className="card flex h-full flex-col overflow-hidden">
                <div className="flex h-36 items-center justify-center border-b border-line bg-raised p-3">
                  <img
                    src={item.image}
                    alt={`${item.kind} from ${item.org}`}
                    loading="lazy"
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col p-4">
                  <p className="text-sm font-semibold leading-snug text-fg">{item.short}</p>
                  <p className="mt-1 font-mono text-[0.65rem] text-accent">{item.kind}</p>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{item.detail}</p>
                  {item.date && (
                    <p className="mt-2 font-mono text-[0.65rem] text-faint">{item.date}</p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
