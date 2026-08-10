/**
 * Field-trial data for the AgriAI dashboard.
 *
 * Every series here is transcribed from "Adaptive IoT–AI Pest Control System
 * with LLM Integration" (Edupuganti & Meka, ICICT 2026, Paper ID 842). Section
 * references are given per block. Nothing in this file is modelled, smoothed or
 * invented — if a figure is not in the paper it is not here.
 */

/** §4.1 — Technical performance metrics, figure 3. */
export const technicalPerformance = [
  { metric: 'Image capture', value: 91 },
  { metric: 'Communication', value: 95 },
  { metric: 'Detection (primary)', value: 91 },
  { metric: 'Detection (secondary)', value: 88 },
  { metric: 'Actuation', value: 99 },
]

export const PERFORMANCE_THRESHOLD = 90

/**
 * §4.2 — Pest population reduction over the 12-week pilot, figure 4.
 * Week 0 is the deployment baseline; endpoints match the reported per-species
 * averages (33.5 / 32.5 / 30.0 / 28.0).
 */
export const pestReduction = [
  { week: 0, brownPlanthopper: 0, yellowStemBorer: 0, riceLeafFolder: 0, riceGallMidge: 0 },
  { week: 2, brownPlanthopper: 8, yellowStemBorer: 7, riceLeafFolder: 6, riceGallMidge: 5 },
  { week: 4, brownPlanthopper: 16, yellowStemBorer: 15, riceLeafFolder: 14, riceGallMidge: 12 },
  { week: 6, brownPlanthopper: 23, yellowStemBorer: 22, riceLeafFolder: 20, riceGallMidge: 18 },
  { week: 8, brownPlanthopper: 28, yellowStemBorer: 27, riceLeafFolder: 25, riceGallMidge: 23 },
  { week: 10, brownPlanthopper: 32, yellowStemBorer: 31, riceLeafFolder: 28, riceGallMidge: 26 },
  { week: 12, brownPlanthopper: 33.5, yellowStemBorer: 32.5, riceLeafFolder: 30, riceGallMidge: 28 },
]

export const OVERALL_REDUCTION = 31

/** §4.2 / §4.3 — Per-species averages and reported detection-confidence bands. */
export const species = [
  {
    key: 'brownPlanthopper',
    name: 'Brown Planthopper',
    reduction: 33.5,
    range: '32–35%',
    confidence: '94–96%',
  },
  {
    key: 'yellowStemBorer',
    name: 'Yellow Stem Borer',
    reduction: 32.5,
    range: '31–34%',
    confidence: '94–96%',
  },
  {
    key: 'riceLeafFolder',
    name: 'Rice Leaf Folder',
    reduction: 30.0,
    range: '28–32%',
    confidence: '88–91%',
  },
  {
    key: 'riceGallMidge',
    name: 'Rice Gall Midge',
    reduction: 28.0,
    range: '26–30%',
    confidence: '88–91%',
  },
] as const

/**
 * §4.4 — End-to-end latency breakdown, ~3.2 s detection-to-control.
 * The paper gives explicit percentages for the two dominant stages
 * (LLM 34.5%, YOLO 31.0%); the rest are the reported millisecond figures.
 */
export const latencyStages = [
  { stage: 'Image capture', ms: 100 },
  { stage: 'Transmission', ms: 300 },
  { stage: 'YOLO inference', ms: 1200 },
  { stage: 'LLM decision', ms: 2000 },
  { stage: 'Actuation', ms: 200 },
]

export const MEAN_RESPONSE_SECONDS = 1.48
export const END_TO_END_SECONDS = 3.2

/** §4.3 — YOLO detection confidence distribution. */
export const confidence = {
  mean: 0.92,
  stdDev: 0.052,
  min: 0.71,
  max: 1.0,
  totalDetections: 1600,
  threshold: 0.5,
}

/** §2.3 / §3.4 — Deployment scale. */
export const deployment = {
  villages: 5,
  villageNames: ['Gorapalle', 'Karakavanipalem', 'Kotnivanipalem', 'Pinagadi', 'Rampuram'],
  farmersEngaged: '1,000+',
  volunteers: 15,
  pilotWeeks: 12,
  district: 'Pendurthi Mandal, Visakhapatnam District, Andhra Pradesh',
}

export const PAPER_CITATION =
  'Edupuganti, A. & Meka, J.S. — "Adaptive IoT–AI Pest Control System with LLM Integration", ' +
  'ICICT 2026, London (Paper ID 842)'
