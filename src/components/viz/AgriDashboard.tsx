import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  MEAN_RESPONSE_SECONDS,
  OVERALL_REDUCTION,
  PAPER_CITATION,
  PERFORMANCE_THRESHOLD,
  confidence,
  deployment,
  latencyStages,
  pestReduction,
  species,
  technicalPerformance,
} from '@/content/agri-data'

const SERIES = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)', 'var(--series-4)']

const axisProps = {
  stroke: 'var(--viz-axis)',
  tick: { fill: 'rgb(var(--muted))', fontSize: 11 },
  tickLine: false,
} as const

function ChartTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean
  payload?: Array<{ name?: string; value?: number | string; color?: string }>
  label?: string | number
  unit?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2 shadow-lg">
      {label !== undefined && <p className="mb-1 font-mono text-[0.7rem] text-faint">{label}</p>}
      {payload.map((entry) => (
        <p key={String(entry.name)} className="flex items-center gap-2 text-xs text-fg">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-sm"
            style={{ background: entry.color }}
          />
          <span className="text-muted">{entry.name}</span>
          <span className="font-mono font-medium">
            {entry.value}
            {unit}
          </span>
        </p>
      ))}
    </div>
  )
}

function StatTile({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <div className="card p-4">
      <p className="font-mono text-2xl font-semibold text-accent">{value}</p>
      <p className="mt-1 text-xs font-medium text-fg">{label}</p>
      <p className="mt-0.5 text-[0.7rem] leading-relaxed text-faint">{detail}</p>
    </div>
  )
}

export function AgriDashboard() {
  const [showTable, setShowTable] = useState(false)

  return (
    <div className="viz-root space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          value={`${confidence.mean}`}
          label="mean detection confidence"
          detail={`Across ${confidence.totalDetections.toLocaleString()} detections, sigma ${confidence.stdDev}`}
        />
        <StatTile
          value={`${MEAN_RESPONSE_SECONDS}s`}
          label="mean field response"
          detail="Capture, detect, decide, actuate"
        />
        <StatTile
          value={`${OVERALL_REDUCTION}%`}
          label="average pest reduction"
          detail={`Four species over ${deployment.pilotWeeks} weeks`}
        />
        <StatTile
          value={deployment.farmersEngaged}
          label="farmers engaged"
          detail={`${deployment.villages} villages, ${deployment.volunteers} volunteers`}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Single measure across five stages: magnitude comparison, so one hue. */}
        <figure className="card p-5">
          <figcaption>
            <h3 className="text-sm font-semibold tracking-tight">System reliability</h3>
            <p className="mt-1 text-xs text-muted">
              Field-measured rates. The dashed line marks the {PERFORMANCE_THRESHOLD}% design
              threshold.
            </p>
          </figcaption>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={technicalPerformance}
                layout="vertical"
                margin={{ top: 4, right: 40, bottom: 4, left: 4 }}
              >
                <CartesianGrid horizontal={false} stroke="var(--viz-grid)" />
                <XAxis type="number" domain={[0, 100]} unit="%" {...axisProps} />
                <YAxis type="category" dataKey="metric" width={126} {...axisProps} />
                <Tooltip cursor={{ fill: 'rgb(var(--raised))' }} content={<ChartTooltip unit="%" />} />
                <ReferenceLine
                  x={PERFORMANCE_THRESHOLD}
                  stroke="var(--series-2)"
                  strokeDasharray="4 4"
                />
                <Bar
                  dataKey="value"
                  name="Rate"
                  fill="var(--series-1)"
                  radius={[0, 4, 4, 0]}
                  barSize={16}
                  label={{
                    position: 'right',
                    fill: 'rgb(var(--muted))',
                    fontSize: 11,
                    formatter: (v: unknown) => `${v}%`,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </figure>

        {/* Emphasis form: the story is that the LLM stage dominates, so it
            carries the accent and the rest recede to gray. */}
        <figure className="card p-5">
          <figcaption>
            <h3 className="text-sm font-semibold tracking-tight">Where the latency goes</h3>
            <p className="mt-1 text-xs text-muted">
              Detection-to-control breakdown. The LLM decision is the single largest contributor —
              the cost of an adaptable control policy.
            </p>
          </figcaption>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={latencyStages}
                layout="vertical"
                margin={{ top: 4, right: 52, bottom: 4, left: 4 }}
              >
                <CartesianGrid horizontal={false} stroke="var(--viz-grid)" />
                <XAxis type="number" unit="ms" {...axisProps} />
                <YAxis type="category" dataKey="stage" width={112} {...axisProps} />
                <Tooltip cursor={{ fill: 'rgb(var(--raised))' }} content={<ChartTooltip unit="ms" />} />
                <Bar
                  dataKey="ms"
                  name="Duration"
                  radius={[0, 4, 4, 0]}
                  barSize={16}
                  label={{
                    position: 'right',
                    fill: 'rgb(var(--muted))',
                    fontSize: 11,
                    formatter: (v: unknown) => `${v}ms`,
                  }}
                >
                  {latencyStages.map((s) => (
                    <Cell
                      key={s.stage}
                      fill={s.stage === 'LLM decision' ? 'var(--series-1)' : 'var(--viz-flat)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </figure>
      </div>

      <figure className="card p-5">
        <figcaption className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold tracking-tight">
              Pest population reduction over 12 weeks
            </h3>
            <p className="mt-1 text-xs text-muted">
              Four target rice pests. Steepest decline in the first four weeks, then sustained.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            aria-pressed={showTable}
            className="shrink-0 rounded-md border border-line bg-raised px-2.5 py-1
                       font-mono text-[0.7rem] text-muted transition-colors hover:text-fg"
          >
            {showTable ? 'Show chart' : 'Show table'}
          </button>
        </figcaption>

        {showTable ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[30rem] text-left text-xs">
              <caption className="sr-only">
                Final pest population reduction by species after 12 weeks
              </caption>
              <thead>
                <tr className="border-b border-line text-faint">
                  <th scope="col" className="py-2 pr-4 font-medium">
                    Species
                  </th>
                  <th scope="col" className="py-2 pr-4 font-medium">
                    Average reduction
                  </th>
                  <th scope="col" className="py-2 pr-4 font-medium">
                    Range
                  </th>
                  <th scope="col" className="py-2 font-medium">
                    Detection confidence
                  </th>
                </tr>
              </thead>
              <tbody>
                {species.map((s, i) => (
                  <tr key={s.key} className="border-b border-line/60">
                    <th scope="row" className="py-2 pr-4 font-normal text-fg">
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 rounded-sm"
                          style={{ background: SERIES[i] }}
                        />
                        {s.name}
                      </span>
                    </th>
                    <td className="py-2 pr-4 font-mono tabular-nums text-muted">{s.reduction}%</td>
                    <td className="py-2 pr-4 font-mono tabular-nums text-muted">{s.range}</td>
                    <td className="py-2 font-mono tabular-nums text-muted">{s.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pestReduction} margin={{ top: 8, right: 120, bottom: 16, left: 0 }}>
                <CartesianGrid stroke="var(--viz-grid)" />
                <XAxis
                  dataKey="week"
                  {...axisProps}
                  label={{
                    value: 'Weeks after deployment',
                    position: 'insideBottom',
                    offset: -8,
                    fill: 'rgb(var(--faint))',
                    fontSize: 11,
                  }}
                />
                <YAxis unit="%" {...axisProps} />
                <Tooltip content={<ChartTooltip unit="%" />} />
                {species.map((s, i) => (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.name}
                    stroke={SERIES[i]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/*
          Four series, and two of these hues sit below 3:1 on the light surface,
          so identity must not rest on colour alone. End-of-line labels would
          collide — the four final values span only 5.5 points — so each series
          is named here with its final value instead, and the table view above
          carries the full numbers.
        */}
        {!showTable && (
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
            {species.map((s, i) => (
              <li key={s.key} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ background: SERIES[i] }}
                />
                <span className="text-xs text-fg">{s.name}</span>
                <span className="font-mono text-xs tabular-nums text-muted">
                  {s.reduction}%
                </span>
              </li>
            ))}
          </ul>
        )}
      </figure>

      <p className="text-[0.7rem] leading-relaxed text-faint">Source: {PAPER_CITATION}</p>
    </div>
  )
}
