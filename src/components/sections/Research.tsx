import { Reveal, Section } from '@/components/ui/primitives'
import { book, patents, publications, recognition } from '@/content/research'

export function Research() {
  const letter = recognition[0]

  return (
    <Section
      id="research"
      eyebrow="Research, patents & writing"
      title="Original work, independently recognised"
      lead="Two granted patents, a first-authored conference paper, a Scopus-indexed publication, a book, and a letter from the Government of India naming the contribution."
    >
      {letter && (
        <div className="rounded-xl border border-accent/40 bg-accent/[0.04] p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
            <div>
              <p className="eyebrow text-accent">Government of India</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{letter.title}</h3>
              <p className="mt-1 text-xs text-muted">{letter.issuer}</p>
              <blockquote className="mt-4 border-l-2 border-accent/50 pl-4 text-sm leading-relaxed text-muted">
                &ldquo;I would like to place on record my sincere appreciation for your outstanding
                technical contribution towards the design and development of the innovative AgriAI
                — Adaptive IoT–AI Pest Control System with LLM Integration.&rdquo;
              </blockquote>
              <p className="mt-3 font-mono text-[0.7rem] text-faint">
                {letter.signatory} · {letter.date}
              </p>
            </div>
            <img
              src={letter.image}
              alt="Letter of appreciation from the Dr. Ambedkar Foundation, Ministry of Social Justice and Empowerment, Government of India"
              loading="lazy"
              className="w-full rounded-lg border border-line"
            />
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Publications</h3>
          <ol className="mt-4 space-y-5">
            {publications.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={i * 0.04}>
                  <div className="card p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chip">{p.authorRole}</span>
                      <span className="font-mono text-[0.7rem] text-faint">{p.year}</span>
                    </div>
                    <h4 className="mt-3 text-sm font-semibold leading-snug">{p.title}</h4>
                    <p className="mt-1 text-xs font-medium text-accent">{p.venue}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{p.detail}</p>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-3 inline-block text-xs font-medium text-accent hover:underline"
                      >
                        View publication →
                      </a>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-tight">Patents</h3>
          <ol className="mt-4 space-y-5">
            {patents.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={i * 0.04}>
                  <div className="card p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chip">{p.status}</span>
                      <span className="font-mono text-[0.7rem] text-faint">{p.applicationNo}</span>
                    </div>
                    <h4 className="mt-3 text-sm font-semibold leading-snug">{p.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{p.abstract}</p>
                    <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3 text-[0.7rem]">
                      <div>
                        <dt className="text-faint">Applicant</dt>
                        <dd className="text-muted">{p.applicant}</dd>
                      </div>
                      <div>
                        <dt className="text-faint">Published</dt>
                        <dd className="text-muted">{p.published}</dd>
                      </div>
                    </dl>
                    <p className="mt-2 font-mono text-[0.65rem] text-faint">{p.journal}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="card mt-10 p-6">
        <div className="flex flex-wrap items-baseline gap-3">
          <p className="eyebrow">Authored book</p>
          <span className="font-mono text-[0.7rem] text-faint">{book.year}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight">
          {book.title}: <span className="font-normal text-muted">{book.subtitle}</span>
        </h3>
        <p className="mt-1 font-mono text-[0.7rem] text-faint">{book.structure}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{book.blurb}</p>
        <blockquote className="mt-4 border-l-2 border-line pl-4 text-sm italic leading-relaxed text-faint">
          &ldquo;{book.quote}&rdquo;
        </blockquote>
      </div>
    </Section>
  )
}
