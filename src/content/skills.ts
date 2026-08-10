import type { SkillGroup } from './types'

/**
 * Grouped exactly as on the resume, but each skill carries provenance where it
 * is known. Deliberately no percentage bars: a self-assigned "Python 95%" is
 * unfalsifiable and experienced reviewers discount it. "Used in production at
 * Charter" is a claim someone can actually check.
 *
 * `relevance` is 0–3 per lens and drives both ordering and visual emphasis.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'ai-agentic',
    name: 'AI & Agentic Systems',
    relevance: { data: 1, ai: 3, genai: 3 },
    skills: [
      { name: 'RAG pipelines', provenance: 'Adaptive Multi-Index RAG' },
      { name: 'Model Context Protocol (MCP)', provenance: 'Enterprise MCP server' },
      { name: 'Multi-agent & subagent architectures', provenance: 'Supervisor orchestration' },
      { name: 'Tool / function calling' },
      { name: 'Semantic routing', provenance: 'Dual-index query routing' },
      { name: 'Claude Code' },
      { name: 'GitHub Copilot' },
    ],
  },
  {
    id: 'llm-eval',
    name: 'LLM Orchestration & Evaluation',
    relevance: { data: 0, ai: 3, genai: 3 },
    skills: [
      { name: 'LangChain' },
      { name: 'LlamaIndex' },
      { name: 'AutoGen' },
      { name: 'Golden sets', provenance: '200-question RAG eval set' },
      { name: 'LLM-as-a-judge' },
      { name: 'RAGAS' },
      { name: 'Offline & online evals' },
      { name: 'Regression testing', provenance: 'Run on every index change' },
      { name: 'Human-in-the-loop review' },
      { name: 'Prompt & context-window optimization' },
      { name: 'Fine-tuning (LoRA, QLoRA)' },
    ],
  },
  {
    id: 'vector',
    name: 'Vector & Context Engineering',
    relevance: { data: 1, ai: 3, genai: 3 },
    skills: [
      { name: 'Pinecone' },
      { name: 'Chroma' },
      { name: 'Milvus' },
      { name: 'Embedding models & semantic search' },
      { name: 'ETL for LLM ingestion', provenance: 'Spark SQL, SSIS' },
    ],
  },
  {
    id: 'llmops',
    name: 'LLMOps & Deployment',
    relevance: { data: 1, ai: 3, genai: 3 },
    skills: [
      { name: 'Model serving & API gateways' },
      { name: 'LangSmith' },
      { name: 'Langfuse' },
      { name: 'OpenTelemetry tracing' },
      { name: 'Cost & token tracking', provenance: 'Agent orchestration instrumentation' },
      { name: 'Latency & quality dashboards' },
      { name: 'Terraform', provenance: 'Multi-cloud IaC at Charter' },
    ],
  },
  {
    id: 'data-ecosystem',
    name: 'Data Ecosystem',
    relevance: { data: 3, ai: 2, genai: 1 },
    skills: [
      { name: 'Apache Spark', provenance: 'EMR at Charter, Dataproc at KVK' },
      { name: 'Spark SQL' },
      { name: 'DataFrames & RDDs' },
      { name: 'Hadoop' },
      { name: 'Hive' },
      { name: 'Kafka' },
      { name: 'Cassandra' },
      { name: 'NiFi' },
      { name: 'Sqoop (incremental imports)' },
      { name: 'PEGA Systems', provenance: 'Workflow orchestration at Charter' },
      { name: 'Avro / Parquet / ORC' },
      { name: 'Kryo & Java serialization' },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & Databases',
    relevance: { data: 3, ai: 2, genai: 2 },
    skills: [
      { name: 'AWS — EMR, S3, EC2, Glue, SNS', provenance: 'Production at Charter' },
      { name: 'Snowflake', provenance: 'End-to-end pipelines at Charter' },
      { name: 'Azure — Databricks, Synapse, Data Factory, ADLS, Cosmos DB', provenance: 'KVK Tech' },
      { name: 'GCP — BigQuery, Dataproc, GKE, Cloud SQL, Cloud Functions' },
      { name: 'Terraform (multi-cloud IaC)' },
      { name: 'MS SQL Server', provenance: 'Elevance Health' },
      { name: 'MySQL' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Services',
    relevance: { data: 2, ai: 3, genai: 2 },
    skills: [
      { name: 'REST / gRPC APIs' },
      { name: 'FastAPI' },
      { name: 'Microservices' },
      { name: 'Message queues (Kafka, SQS)' },
      { name: 'Docker' },
      { name: 'Kubernetes (GKE)' },
      { name: 'CI/CD (GitHub Actions)' },
      { name: 'Relational & document data modeling' },
    ],
  },
  {
    id: 'languages',
    name: 'Languages & OS',
    relevance: { data: 3, ai: 3, genai: 3 },
    skills: [
      { name: 'Python' },
      { name: 'TypeScript / Node.js' },
      { name: 'SQL' },
      { name: 'Scala' },
      { name: 'Bash / UNIX shell' },
      { name: 'Linux, CentOS, Windows' },
    ],
  },
  {
    id: 'security',
    name: 'Security & Observability',
    relevance: { data: 2, ai: 2, genai: 2 },
    skills: [
      { name: 'Cloud IAM' },
      { name: 'KMS' },
      { name: 'Identity-Aware Proxy' },
      { name: 'Security Command Center' },
      { name: 'Google Cloud Operations suite' },
      { name: 'AWS SNS alerting' },
      { name: 'Compliance policy implementation' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools & Version Control',
    relevance: { data: 1, ai: 1, genai: 1 },
    skills: [
      { name: 'Git / GitHub' },
      { name: 'Cursor' },
      { name: 'Kiro' },
      { name: 'Antigravity' },
      { name: 'Google AI Studio' },
      { name: 'ElevenLabs' },
      { name: 'JIRA' },
      { name: 'R-Studio' },
      { name: 'Eclipse / Visual Studio' },
    ],
  },
]
