import { profile } from '@/content/profile'

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm font-medium">{profile.name}</p>
          <p className="mt-1 text-xs text-muted">
            {profile.location} · Open to Data, AI and Gen AI engineering roles
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
          <a href={`mailto:${profile.email}`} className="link-underline hover:text-fg">
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline hover:text-fg"
          >
            LinkedIn
          </a>
          <a href={profile.resumePath} download className="link-underline hover:text-fg">
            Resume
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell py-4">
          <p className="text-[0.7rem] leading-relaxed text-faint">
            Every figure on this site is traceable to a primary source — the resume, the published
            paper, a patent publication, press coverage, or the government letter. Sources are
            labelled inline.
          </p>
        </div>
      </div>
    </footer>
  )
}
