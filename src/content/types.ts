/**
 * Content model for the portfolio.
 *
 * Everything rendered on this site is data defined under `src/content/`, and
 * every factual claim carries a `source` + `sourceNote` pointing at the primary
 * document it came from. `tests/content-integrity.test.ts` enforces that.
 *
 * The point is that nothing on the site can drift into invention: if a number
 * appears here it can be traced to the resume, the published paper, a patent
 * publication, a press article, the government letter, or a certificate.
 */

/** The three hiring tracks this portfolio targets. */
export type Lens = 'data' | 'ai' | 'genai'

export const LENSES: readonly Lens[] = ['data', 'ai', 'genai'] as const

export const LENS_LABELS: Record<Lens, string> = {
  data: 'Data Engineer',
  ai: 'AI Engineer',
  genai: 'Gen AI',
}

/** Primary document a claim is traceable to. */
export type Source = 'resume' | 'paper' | 'patent' | 'press' | 'letter' | 'book' | 'cert'

export const SOURCE_LABELS: Record<Source, string> = {
  resume: 'Resume',
  paper: 'Published paper',
  patent: 'Patent publication',
  press: 'Press coverage',
  letter: 'Government letter',
  book: 'Authored book',
  cert: 'Certification',
}

/**
 * A single quantified claim.
 *
 * `measured` distinguishes a figure that was actually observed and reported
 * from one that is illustrative. Illustrative values render with a visible
 * label so the two can never be confused by a reader.
 */
export interface Metric {
  id: string
  value: string
  label: string
  context: string
  source: Source
  sourceNote: string
  lenses: Lens[]
  measured?: boolean
}

export interface Bullet {
  text: string
  lenses: Lens[]
}

export interface Role {
  id: string
  title: string
  company: string
  location: string
  period: string
  summary: string
  bullets: Bullet[]
  stack: string[]
  metrics: Metric[]
}

export type ProjectKind = 'research' | 'ai-system' | 'platform'

export interface ProjectSection {
  heading: string
  body: string
}

export interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  kind: ProjectKind
  /** Higher sorts earlier under that lens. 0 hides it from that lens entirely. */
  weight: Record<Lens, number>
  summary: string
  stack: string[]
  metrics: Metric[]
  /** Deep-dive prose shown on /case/:slug. */
  sections: ProjectSection[]
  /** Left empty until public repos exist — the UI hides the button when unset. */
  repoUrl?: string
  paperUrl?: string
  highlights: string[]
}

export interface Skill {
  name: string
  /** Where it was actually used — this is what makes a skill list credible. */
  provenance?: string
}

export interface SkillGroup {
  id: string
  name: string
  /** Relevance 0–3 per lens; drives ordering and emphasis. */
  relevance: Record<Lens, number>
  skills: Skill[]
}

export interface PressItem {
  id: string
  outlet: string
  headline: string
  language: 'English' | 'Telugu'
  date?: string
  url?: string
  image: string
  /** National mastheads lead the wall. */
  tier: 1 | 2
}

export interface Publication {
  id: string
  title: string
  venue: string
  detail: string
  year: string
  authorRole: string
  url?: string
}

export interface Patent {
  id: string
  title: string
  applicationNo: string
  filed: string
  published: string
  journal: string
  applicant: string
  status: string
  abstract: string
  image: string
}

export interface CredentialGroup {
  id: string
  name: string
  issuer: string
  items: string[]
  featured?: boolean
}

export type TimelineTrack = 'work' | 'research' | 'recognition' | 'education'

export interface TimelineEvent {
  id: string
  date: string
  /** Numeric sort key. Not a Date — these are display periods, never arithmetic. */
  order: number
  track: TimelineTrack
  title: string
  detail: string
}
