import { motion, useReducedMotion } from 'framer-motion'
import { availability, headline, pitch, profile, subPitch } from '@/content/profile'
import { useLens } from '@/lens/LensContext'

/**
 * Three proof points, fixed across lenses. These are the things almost no other
 * candidate for these roles can put on a page, so they lead regardless of which
 * track the reader came for.
 */
const PROOF = [
  { value: '2', label: 'granted patents', detail: 'Biomedical imaging, Andhra University' },
  { value: '1st', label: 'author, ICICT 2026', detail: 'Adaptive IoT–AI Pest Control with LLM' },
  { value: '10', label: 'press features', detail: 'The Hindu, Times of India, Deccan Chronicle' },
]

export function Hero() {
  const { lens } = useLens()
  const reduced = useReducedMotion()

  const fade = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Soft accent wash behind the hero. Purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-96 opacity-[0.07]
                   [background:radial-gradient(60%_60%_at_50%_50%,rgb(var(--accent)),transparent)]"
      />

      <div className="shell relative py-16 sm:py-24">
        <motion.div {...fade} className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-muted">{availability}</span>
            </div>

            <h1
              id="hero-heading"
              className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {profile.name}
            </h1>

            {/* Keyed on lens so the text re-animates when the lens changes,
                making the switch legible rather than a silent swap. */}
            <motion.p
              key={`headline-${lens}`}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 text-lg font-medium text-accent sm:text-xl"
            >
              {headline[lens]}
            </motion.p>

            <motion.p
              key={`pitch-${lens}`}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {pitch[lens]}
            </motion.p>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-faint">{subPitch[lens]}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg
                           transition-opacity hover:opacity-90"
              >
                Get in touch
              </a>
              <a
                href={profile.resumePath}
                download
                className="rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium
                           text-fg transition-colors hover:border-accent"
              >
                Download resume
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium
                           text-fg transition-colors hover:border-accent"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="shrink-0 lg:w-72">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={144}
              height={144}
              loading="eager"
              className="h-28 w-28 rounded-2xl border border-line object-cover sm:h-36 sm:w-36"
            />

            <dl className="mt-6 space-y-4">
              {PROOF.map((p) => (
                <div key={p.label} className="border-l-2 border-accent/40 pl-4">
                  <dt className="flex items-baseline gap-2">
                    <span className="font-mono text-xl font-semibold text-fg">{p.value}</span>
                    <span className="text-sm text-muted">{p.label}</span>
                  </dt>
                  <dd className="mt-0.5 text-xs leading-relaxed text-faint">{p.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
