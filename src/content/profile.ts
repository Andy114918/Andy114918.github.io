import type { Lens } from './types'

export const profile = {
  name: 'Anirudh Edupuganti',
  location: 'Chicago, IL',
  email: 'anirudh1.edupuganti@gmail.com',
  phone: '+1 331-529-2780',
  linkedin: 'https://www.linkedin.com/in/anirudh-edupuganti-3a7a7827b/',
  siteUrl: 'https://andy114918.github.io',
  resumePath: '/resume.pdf',
  photo: '/media/anirudh.webp',
} as const

/** Shown under the name — changes with the selected lens. */
export const headline: Record<Lens, string> = {
  data: 'Data Platform Engineer',
  ai: 'AI / Data Platform Engineer',
  genai: 'Gen AI & Agent Engineer',
}

/**
 * The 20-second pitch. Each version is assembled only from claims that appear
 * in the resume, the published paper, or the government letter.
 */
export const pitch: Record<Lens, string> = {
  data:
    'Four years building production data platforms across AWS, Azure and GCP — 5 TB warehouse ' +
    'migrations, Spark and Snowflake pipelines, and multi-cloud infrastructure as code — in ' +
    'healthcare, telecom and pharma.',
  ai:
    'I build the pipelines that feed models and the systems that serve them. Four years of ' +
    'production data engineering across three clouds, plus RAG, MCP and multi-agent systems ' +
    'taken from prototype to deployed service — with the evaluation loops to prove they work.',
  genai:
    'RAG pipelines, MCP servers and multi-agent orchestration, built on four years of production ' +
    'data infrastructure. I care most about the part most demos skip: golden sets, regression ' +
    'checks, tracing and cost accounting.',
}

/** One line of context under the pitch, per lens. */
export const subPitch: Record<Lens, string> = {
  data: 'Currently a PhD candidate in Computer Science. Patent holder and published researcher.',
  ai:
    'PhD candidate, two granted patents, and first author on a field-deployed IoT–AI system ' +
    'funded by the Government of India.',
  genai:
    'PhD candidate. I wrote a book on AI for non-technical readers, and shipped an LLM-driven ' +
    'control system now running in five villages.',
}

export const availability = 'Open to Data Engineer, AI Engineer and Gen AI Engineer roles'
