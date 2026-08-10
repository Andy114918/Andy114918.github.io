import { Suspense, lazy } from 'react'
import { Section } from '@/components/ui/primitives'
import { deployment } from '@/content/agri-data'

// Recharts is by far the heaviest dependency (~113 kB gzipped). Splitting it
// out here keeps it off the critical path — the hero and impact strip render
// before the chart bundle is even requested.
const AgriDashboard = lazy(() =>
  import('@/components/viz/AgriDashboard').then((m) => ({ default: m.AgriDashboard }))
)

export function FieldResults() {
  return (
    <Section
      id="results"
      eyebrow="Measured results"
      title="AgriAI in the field"
      lead={`Not a demo. A ${deployment.pilotWeeks}-week deployment across ${deployment.villages} villages in ${deployment.district}, with every figure below taken from the peer-reviewed paper.`}
      tone="raised"
    >
      <Suspense
        fallback={
          <div
            className="h-96 animate-pulse rounded-xl border border-line bg-raised"
            aria-label="Loading field results"
          />
        }
      >
        <AgriDashboard />
      </Suspense>
    </Section>
  )
}
