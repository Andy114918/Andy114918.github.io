import { Section } from '@/components/ui/primitives'
import { profile } from '@/content/profile'

const LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}` },
  { label: 'LinkedIn', value: 'anirudh-edupuganti', href: profile.linkedin, external: true },
  { label: 'Resume', value: 'Download PDF', href: profile.resumePath, download: true },
]

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Open to Data, AI and Gen AI engineering roles"
      lead="Based in Chicago, IL. Happy to talk through any of the systems on this site in more detail — including the parts that did not work."
    >
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LINKS.map((link) => (
          <div key={link.label} className="card p-5">
            <dt className="eyebrow">{link.label}</dt>
            <dd className="mt-2">
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                {...(link.download ? { download: true } : {})}
                className="break-words text-sm font-medium text-accent hover:underline"
              >
                {link.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
