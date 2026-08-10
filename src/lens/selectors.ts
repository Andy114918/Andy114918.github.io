import { roles } from '@/content/experience'
import { projects } from '@/content/projects'
import { skillGroups } from '@/content/skills'
import type { Lens, Metric, Project, Role, SkillGroup } from '@/content/types'

/**
 * Which metrics lead the impact strip, per lens, in order.
 *
 * This is explicit rather than computed. Curating the four numbers a recruiter
 * sees first is a judgement call, and an explicit list is both honest about
 * that and testable — a scoring heuristic would just hide the decision.
 */
export const HERO_METRIC_IDS: Record<Lens, string[]> = {
  data: ['kvk-migration', 'kvk-latency', 'charter-spend', 'elevance-defects'],
  ai: ['agri-detection', 'rag-accuracy', 'agri-reduction', 'agri-latency'],
  genai: ['rag-accuracy', 'rag-golden', 'agri-latency', 'agri-reduction'],
}

/** Every metric defined anywhere in the content layer. */
export function allMetrics(): Metric[] {
  return [...projects.flatMap((p) => p.metrics), ...roles.flatMap((r) => r.metrics)]
}

export function metricById(id: string): Metric | undefined {
  return allMetrics().find((m) => m.id === id)
}

/** The four headline numbers for a lens, in curated order. */
export function heroMetrics(lens: Lens): Metric[] {
  const ids = HERO_METRIC_IDS[lens]
  return ids
    .map((id) => metricById(id))
    .filter((m): m is Metric => Boolean(m))
    .filter((m) => m.lenses.includes(lens))
}

/** Projects relevant to a lens, heaviest first. Weight 0 hides a project. */
export function sortedProjects(lens: Lens): Project[] {
  return projects
    .filter((p) => (p.weight[lens] ?? 0) > 0)
    .slice()
    .sort((a, b) => b.weight[lens] - a.weight[lens])
}

/** Only the bullets tagged for this lens — a shorter, sharper read per track. */
export function roleBullets(role: Role, lens: Lens): string[] {
  return role.bullets.filter((b) => b.lenses.includes(lens)).map((b) => b.text)
}

/** Roles that have at least one bullet for this lens. */
export function sortedRoles(lens: Lens): Role[] {
  return roles.filter((r) => roleBullets(r, lens).length > 0)
}

/**
 * Skill groups ordered by relevance to the lens. Groups scoring 0 are dropped
 * entirely; the rest keep a stable order within the same relevance band so the
 * layout does not shuffle unpredictably between lenses.
 */
export function sortedSkillGroups(lens: Lens): SkillGroup[] {
  return skillGroups
    .map((g, i) => ({ g, i }))
    .filter(({ g }) => g.relevance[lens] > 0)
    .sort((a, b) => b.g.relevance[lens] - a.g.relevance[lens] || a.i - b.i)
    .map(({ g }) => g)
}

/** True when a group should be visually emphasised for this lens. */
export function isPrimaryGroup(group: SkillGroup, lens: Lens): boolean {
  return group.relevance[lens] >= 3
}
