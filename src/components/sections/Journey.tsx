import { Section } from '@/components/ui/primitives'
import { Timeline } from '@/components/viz/Timeline'

export function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Timeline"
      title="Research alongside the day job"
      lead="The patents, the paper and the book were not a break from engineering work — they ran in parallel with it. Filter by track to see either thread on its own."
    >
      <Timeline />
    </Section>
  )
}
