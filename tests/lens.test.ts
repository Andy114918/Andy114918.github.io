import { describe, expect, it } from 'vitest'
import { roles } from '@/content/experience'
import { DEFAULT_LENS, isLens, resolveLensFromUrl } from '@/lens/lens-core'
import {
  isPrimaryGroup,
  roleBullets,
  sortedProjects,
  sortedRoles,
  sortedSkillGroups,
} from '@/lens/selectors'
import { LENSES } from '@/content/types'

describe('isLens', () => {
  it('accepts the three known lenses', () => {
    for (const l of LENSES) expect(isLens(l)).toBe(true)
  })

  it.each([['nonsense'], [''], ['DATA'], ['ai '], [null], [undefined], [42], [{}]])(
    'rejects %p',
    (value) => {
      expect(isLens(value)).toBe(false)
    }
  )
})

describe('resolveLensFromUrl', () => {
  it('adopts a valid lens named in the URL', () => {
    expect(resolveLensFromUrl('?lens=genai')).toBe('genai')
    expect(resolveLensFromUrl('?lens=data')).toBe('data')
    expect(resolveLensFromUrl('?lens=ai')).toBe('ai')
  })

  it('falls back to the default when the URL says nothing usable', () => {
    expect(resolveLensFromUrl('')).toBe(DEFAULT_LENS)
    expect(resolveLensFromUrl('?other=1')).toBe(DEFAULT_LENS)
    expect(resolveLensFromUrl('?lens=bogus')).toBe(DEFAULT_LENS)
    expect(resolveLensFromUrl('?lens=')).toBe(DEFAULT_LENS)
  })

  it('reads the lens alongside other query parameters', () => {
    expect(resolveLensFromUrl('?utm_source=email&lens=data')).toBe('data')
  })

  it('handles a leading question mark or its absence identically', () => {
    expect(resolveLensFromUrl('?lens=data')).toBe('data')
    expect(resolveLensFromUrl('lens=data')).toBe('data')
  })

  it('defaults to the AI lens', () => {
    expect(DEFAULT_LENS).toBe('ai')
  })
})

describe('sortedProjects', () => {
  it.each(LENSES)('returns projects in descending weight for %s', (lens) => {
    const result = sortedProjects(lens)
    expect(result.length).toBeGreaterThan(0)
    const weights = result.map((p) => p.weight[lens])
    expect(weights).toEqual([...weights].sort((a, b) => b - a))
  })

  it.each(LENSES)('never returns a zero-weighted project for %s', (lens) => {
    for (const p of sortedProjects(lens)) expect(p.weight[lens]).toBeGreaterThan(0)
  })

  it('leads with AgriAI under the AI and Gen AI lenses', () => {
    expect(sortedProjects('ai')[0]?.id).toBe('agriai')
    expect(sortedProjects('genai')[0]?.id).toBe('agriai')
  })

  it('produces a different ordering for data than for gen AI', () => {
    const data = sortedProjects('data').map((p) => p.id)
    const genai = sortedProjects('genai').map((p) => p.id)
    expect(data).not.toEqual(genai)
  })
})

describe('roleBullets', () => {
  it('returns only bullets tagged for the requested lens', () => {
    for (const role of roles) {
      for (const lens of LENSES) {
        const selected = roleBullets(role, lens)
        const expected = role.bullets.filter((b) => b.lenses.includes(lens)).map((b) => b.text)
        expect(selected).toEqual(expected)
      }
    }
  })

  it('genuinely narrows the read — the data lens differs from gen AI somewhere', () => {
    const differs = roles.some(
      (r) => roleBullets(r, 'data').length !== roleBullets(r, 'genai').length
    )
    expect(differs).toBe(true)
  })
})

describe('sortedRoles', () => {
  it.each(LENSES)('only returns roles with at least one bullet for %s', (lens) => {
    for (const r of sortedRoles(lens)) expect(roleBullets(r, lens).length).toBeGreaterThan(0)
  })
})

describe('sortedSkillGroups', () => {
  it.each(LENSES)('orders by descending relevance for %s', (lens) => {
    const scores = sortedSkillGroups(lens).map((g) => g.relevance[lens])
    expect(scores).toEqual([...scores].sort((a, b) => b - a))
  })

  it.each(LENSES)('drops zero-relevance groups for %s', (lens) => {
    for (const g of sortedSkillGroups(lens)) expect(g.relevance[lens]).toBeGreaterThan(0)
  })

  it('hides pure-LLM tooling from the data lens but shows it to gen AI', () => {
    const dataIds = sortedSkillGroups('data').map((g) => g.id)
    const genaiIds = sortedSkillGroups('genai').map((g) => g.id)
    expect(dataIds).not.toContain('llm-eval')
    expect(genaiIds).toContain('llm-eval')
  })

  it('leads the data lens with a top-relevance data group', () => {
    expect(sortedSkillGroups('data')[0]?.relevance.data).toBe(3)
  })

  it('marks top-relevance groups as primary', () => {
    for (const lens of LENSES) {
      for (const g of sortedSkillGroups(lens)) {
        expect(isPrimaryGroup(g, lens)).toBe(g.relevance[lens] >= 3)
      }
    }
  })
})
