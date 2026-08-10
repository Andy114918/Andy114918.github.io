import { useState } from 'react'
import { Reveal, Section } from '@/components/ui/primitives'
import { pressItems, pressPullQuote } from '@/content/press'

export function Press() {
  const [showAll, setShowAll] = useState(false)
  const tier1 = pressItems.filter((p) => p.tier === 1)
  const tier2 = pressItems.filter((p) => p.tier === 2)
  const visible = showAll ? pressItems : tier1

  return (
    <Section
      id="press"
      eyebrow="In the press"
      title="Covered by ten outlets"
      lead="The AgriAI launch on 8 March 2026 in Pinagadi village was covered nationally in English and across the Telugu-language press."
      tone="raised"
    >
      <blockquote className="rounded-xl border border-line bg-bg p-6">
        <p className="text-base leading-relaxed text-fg sm:text-lg">
          &ldquo;{pressPullQuote.text}&rdquo;
        </p>
        <footer className="mt-3 font-mono text-xs text-faint">— {pressPullQuote.attribution}</footer>
      </blockquote>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, i) => (
          <li key={item.id}>
            <Reveal delay={i * 0.03}>
              <figure className="card h-full overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.outlet} coverage of the AgriAI pest control device launch`}
                  loading="lazy"
                  className="h-44 w-full border-b border-line object-cover object-top"
                />
                <figcaption className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-fg">{item.outlet}</span>
                    {item.language === 'Telugu' && <span className="chip">Telugu</span>}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.headline}</p>
                  {item.date && (
                    <p className="mt-2 font-mono text-[0.65rem] text-faint">{item.date}</p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>

      {tier2.length > 0 && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="mt-6 rounded-lg border border-line bg-bg px-4 py-2 text-sm font-medium
                     text-muted transition-colors hover:text-fg"
        >
          {showAll
            ? 'Show national outlets only'
            : `Show all ${pressItems.length} outlets, including Telugu press`}
        </button>
      )}
    </Section>
  )
}
