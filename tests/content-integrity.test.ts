import { describe, expect, it } from 'vitest'
import { roles } from '@/content/experience'
import { projects, projectsBySlug } from '@/content/projects'
import { skillGroups } from '@/content/skills'
import { credentialGroups } from '@/content/credentials'
import { pressItems } from '@/content/press'
import { patents, publications, community, recognition } from '@/content/research'
import { timeline } from '@/content/timeline'
import { LENSES, SOURCE_LABELS, type Metric } from '@/content/types'
import { allMetrics, HERO_METRIC_IDS, heroMetrics } from '@/lens/selectors'

/**
 * These tests are the enforcement arm of the site's anti-fabrication rule: no
 * number reaches the page without a named primary source. They are cheap to run
 * and they make content drift a build failure rather than a credibility problem
 * discovered during a reference check.
 */
describe('metric sourcing', () => {
  const metrics = allMetrics()

  it('defines at least one metric', () => {
    expect(metrics.length).toBeGreaterThan(0)
  })

  it.each(metrics.map((m): [string, Metric] => [m.id, m]))(
    'metric "%s" is fully sourced',
    (_id, metric) => {
      expect(metric.source, 'missing source').toBeTruthy()
      expect(Object.keys(SOURCE_LABELS)).toContain(metric.source)
      expect(metric.sourceNote.trim().length, 'sourceNote must be non-empty').toBeGreaterThan(0)
      expect(metric.context.trim().length, 'context must be non-empty').toBeGreaterThan(0)
      expect(metric.value.trim().length).toBeGreaterThan(0)
      expect(metric.label.trim().length).toBeGreaterThan(0)
    }
  )

  it('tags every metric with at least one valid lens', () => {
    for (const m of metrics) {
      expect(m.lenses.length, `${m.id} has no lenses`).toBeGreaterThan(0)
      for (const l of m.lenses) expect(LENSES).toContain(l)
    }
  })

  it('has no duplicate metric ids', () => {
    const ids = metrics.map((m) => m.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('hero metrics', () => {
  it.each(LENSES)('resolves four distinct metrics for the %s lens', (lens) => {
    const picked = heroMetrics(lens)
    expect(picked).toHaveLength(4)
    expect(new Set(picked.map((m) => m.id)).size).toBe(4)
  })

  it.each(LENSES)('only references metric ids that exist, for %s', (lens) => {
    const known = new Set(allMetrics().map((m) => m.id))
    for (const id of HERO_METRIC_IDS[lens]) expect(known, `unknown metric ${id}`).toContain(id)
  })

  it.each(LENSES)('only picks metrics actually tagged for %s', (lens) => {
    for (const m of heroMetrics(lens)) expect(m.lenses).toContain(lens)
  })
})

describe('projects', () => {
  it('has unique ids and slugs', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length)
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length)
  })

  it('exposes every project through the slug lookup used by routing', () => {
    for (const p of projects) expect(projectsBySlug.get(p.slug)).toBe(p)
  })

  it('gives every project a weight for every lens', () => {
    for (const p of projects) {
      for (const l of LENSES) expect(typeof p.weight[l], `${p.id}.${l}`).toBe('number')
    }
  })

  it('surfaces every project under at least one lens', () => {
    for (const p of projects) {
      expect(
        LENSES.some((l) => p.weight[l] > 0),
        `${p.id} is hidden everywhere`
      ).toBe(true)
    }
  })

  it('gives every project narrative sections and a stack', () => {
    for (const p of projects) {
      expect(p.sections.length, `${p.id} has no sections`).toBeGreaterThan(0)
      expect(p.stack.length, `${p.id} has no stack`).toBeGreaterThan(0)
      for (const s of p.sections) {
        expect(s.heading.trim()).toBeTruthy()
        expect(s.body.trim().length).toBeGreaterThan(40)
      }
    }
  })
})

describe('experience', () => {
  it('has unique role ids', () => {
    expect(new Set(roles.map((r) => r.id)).size).toBe(roles.length)
  })

  it('tags every bullet with at least one valid lens', () => {
    for (const r of roles) {
      expect(r.bullets.length, `${r.id} has no bullets`).toBeGreaterThan(0)
      for (const b of r.bullets) {
        expect(b.lenses.length, `bullet in ${r.id} has no lens`).toBeGreaterThan(0)
        for (const l of b.lenses) expect(LENSES).toContain(l)
      }
    }
  })

  it('leaves no role unreachable across all lenses', () => {
    for (const r of roles) {
      const reachable = LENSES.some((l) => r.bullets.some((b) => b.lenses.includes(l)))
      expect(reachable, `${r.id} is unreachable`).toBe(true)
    }
  })
})

describe('skills', () => {
  it('has unique group ids and non-empty groups', () => {
    expect(new Set(skillGroups.map((g) => g.id)).size).toBe(skillGroups.length)
    for (const g of skillGroups) expect(g.skills.length, `${g.id} is empty`).toBeGreaterThan(0)
  })

  it('scores relevance in range for every lens', () => {
    for (const g of skillGroups) {
      for (const l of LENSES) {
        const score = g.relevance[l]
        expect(score, `${g.id}.${l}`).toBeGreaterThanOrEqual(0)
        expect(score, `${g.id}.${l}`).toBeLessThanOrEqual(3)
      }
    }
  })
})

describe('media assets', () => {
  const rooted = (p: string) => p.startsWith('/media/')

  it('points every press item at a rooted media path', () => {
    for (const item of pressItems) expect(rooted(item.image), item.id).toBe(true)
  })

  it('points every patent, recognition and community item at a rooted media path', () => {
    for (const p of patents) expect(rooted(p.image), p.id).toBe(true)
    for (const r of recognition) expect(rooted(r.image), r.id).toBe(true)
    for (const c of community) expect(rooted(c.image), c.id).toBe(true)
  })
})

describe('research and credentials', () => {
  it('has unique ids throughout', () => {
    expect(new Set(publications.map((p) => p.id)).size).toBe(publications.length)
    expect(new Set(patents.map((p) => p.id)).size).toBe(patents.length)
    expect(new Set(community.map((c) => c.id)).size).toBe(community.length)
    expect(new Set(credentialGroups.map((c) => c.id)).size).toBe(credentialGroups.length)
    expect(new Set(pressItems.map((p) => p.id)).size).toBe(pressItems.length)
  })

  it('gives every credential group at least one item', () => {
    for (const g of credentialGroups) expect(g.items.length, g.id).toBeGreaterThan(0)
  })
})

describe('timeline', () => {
  it('has unique ids', () => {
    expect(new Set(timeline.map((e) => e.id)).size).toBe(timeline.length)
  })

  it('uses a plausible YYYYMM integer sort key', () => {
    for (const e of timeline) {
      expect(Number.isInteger(e.order), e.id).toBe(true)
      expect(e.order, e.id).toBeGreaterThan(199000)
      expect(e.order, e.id).toBeLessThan(210000)
    }
  })
})
