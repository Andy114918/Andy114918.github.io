import type { Project } from './types'

/**
 * `weight` drives per-lens ordering. It is not arbitrary: AgriAI leads for AI
 * and Gen AI because it is the only project with peer-reviewed measured results
 * and independent verification, while the RAG system leads for Data because its
 * ingestion side is the most data-engineering-heavy of the four.
 */
export const projects: Project[] = [
  {
    id: 'agriai',
    slug: 'agriai',
    title: 'AgriAI — Adaptive IoT–AI Pest Control with LLM Integration',
    tagline: 'A closed-loop vision + LLM control system, deployed in five villages.',
    kind: 'research',
    weight: { data: 3, ai: 6, genai: 6 },
    summary:
      'Edge cameras detect rice pests with a fine-tuned YOLOv8n model; an LLM combines those ' +
      'detections with live weather to decide light and sound deterrence parameters, which are ' +
      'sent back to the field device. Built with the Dr. B.R. Ambedkar Chair at Andhra ' +
      'University and funded by the Ministry of Social Justice & Empowerment, Government of ' +
      'India. Formally launched in farmers’ fields on 8 March 2026.',
    stack: [
      'YOLOv8n',
      'ESP32 / ESP32-CAM',
      'Raspberry Pi',
      'Groq LLM',
      'Spring Boot',
      'OpenWeather API',
      'C++ firmware',
    ],
    highlights: [
      'First author on the paper (ICICT 2026, London — Paper ID 842)',
      'Named personally in a Government of India appreciation letter',
      'Covered by The Hindu, Times of India, Deccan Chronicle and six more outlets',
    ],
    metrics: [
      {
        id: 'agri-detection',
        value: '91%',
        label: 'pest detection accuracy',
        context: 'YOLOv8n on primary rice pests across a 12-week field pilot',
        source: 'paper',
        sourceNote: 'Adaptive IoT–AI Pest Control System with LLM Integration, §4.1',
        lenses: ['ai', 'genai'],
        measured: true,
      },
      {
        id: 'agri-reduction',
        value: '31%',
        label: 'average pest reduction',
        context: 'Across four rice pest species over 12 weeks in five villages',
        source: 'paper',
        sourceNote: 'Adaptive IoT–AI Pest Control System with LLM Integration, §4.2',
        lenses: ['ai', 'genai', 'data'],
        measured: true,
      },
      {
        id: 'agri-latency',
        value: '1.48s',
        label: 'mean response time',
        context: 'Capture → detect → LLM decision → actuate, measured in field conditions',
        source: 'paper',
        sourceNote: 'Adaptive IoT–AI Pest Control System with LLM Integration, §4.4',
        lenses: ['ai', 'genai'],
        measured: true,
      },
      {
        id: 'agri-farmers',
        value: '1,000+',
        label: 'farmers engaged',
        context: 'Field surveys, demonstrations and feedback across five villages',
        source: 'paper',
        sourceNote: 'Adaptive IoT–AI Pest Control System with LLM Integration, §2.3',
        lenses: ['ai', 'genai', 'data'],
        measured: true,
      },
    ],
    sections: [
      {
        heading: 'The problem',
        body:
          'Smallholder rice farmers lose 20–40% of yield to insect pests. The standard answer ' +
          'is chemical pesticide, which drives resistance, contaminates the environment and is ' +
          'expensive for exactly the farmers who can least afford it. Existing precision-agriculture ' +
          'systems mostly stop at monitoring: they tell you there is a pest, then wait for a human ' +
          'to act. That gap between detection and control is the thing worth closing.',
      },
      {
        heading: 'Architecture',
        body:
          'Four layers. The field layer is an ESP32 with an ESP32-CAM (OV2640) plus temperature, ' +
          'humidity and soil-moisture sensors, in a weatherproof enclosure roughly a metre above ' +
          'the canopy. The edge layer runs a fine-tuned YOLOv8n for species-level detection of four ' +
          'rice pests. The cloud layer is a Spring Boot backend that pulls live conditions from the ' +
          'OpenWeather API and passes detections plus weather to a Groq-hosted LLM. The control ' +
          'layer turns the model’s decision into concrete actuation — light intensity, sound ' +
          'frequency, activation duration — and notifies the farmer by SMS in Telugu.',
      },
      {
        heading: 'Why an LLM in a control loop',
        body:
          'The detector answers "what pest, how many". It cannot answer "what should happen now, ' +
          'given that it rained last night, it is peak monsoon, and this species responds to red ' +
          'light". Encoding that as rules means a brittle decision table per region and season. ' +
          'The LLM synthesises detection, weather and seasonal context into deterrence parameters, ' +
          'which keeps the policy adaptable without a redeploy. The trade-off is honest and visible ' +
          'in the numbers: the LLM stage is the single largest latency contributor at roughly ' +
          '2,000 ms, about 34.5% of end-to-end time.',
      },
      {
        heading: 'Results',
        body:
          'Across a 12-week pilot in Gorapalle, Karakavanipalem, Kotnivanipalem, Pinagadi and ' +
          'Rampuram: 91% image capture success, 95% communication reliability, 91% detection ' +
          'accuracy on primary pests and 88% on secondary, and 99% actuation reliability. Mean ' +
          'YOLO confidence was 0.92 over 1,600 detections. Pest populations fell 26–35% by ' +
          'species, averaging 31% overall, with the sharpest decline in the first four weeks.',
      },
      {
        heading: 'Limitations',
        body:
          'Stated plainly in the paper: a single region, one prototype per village, a training set ' +
          'that may not capture pest variability elsewhere, dependence on Wi-Fi and grid power, and ' +
          'a 12-week window too short to judge performance across full cropping cycles. The next ' +
          'steps are on-device inference to cut internet dependence, solar–battery operation for ' +
          'off-grid sites, and multi-season study.',
      },
    ],
  },
  {
    id: 'rag',
    slug: 'adaptive-rag',
    title: 'Adaptive Multi-Index RAG System',
    tagline: 'Semantic routing between a dense vector store and structured SQL metadata.',
    kind: 'ai-system',
    weight: { data: 5, ai: 5, genai: 5 },
    summary:
      'A retrieval pipeline that decides, per query, whether the answer lives in unstructured ' +
      'prose or in structured metadata — then retrieves accordingly. Deployed as a containerized ' +
      'service behind a REST API with queue-based ingestion, processing thousands of documents ' +
      'daily for sub-second retrieval.',
    stack: ['Python', 'Spark SQL', 'Vector store', 'REST API', 'Docker', 'Message queue'],
    highlights: [
      'Dual-routing retrieval instead of one-index-fits-all',
      'Evaluated against a 200-question golden set',
      'Automated regression checks on every index change',
    ],
    metrics: [
      {
        id: 'rag-accuracy',
        value: '+40%',
        label: 'context retrieval accuracy',
        context: 'Measured against a 200-question golden set with automated regression checks',
        source: 'resume',
        sourceNote: 'Resume — AI & Agent Engineering',
        lenses: ['ai', 'genai', 'data'],
        measured: true,
      },
      {
        id: 'rag-golden',
        value: '200',
        label: 'question golden set',
        context: 'Regression-tested on every index change',
        source: 'resume',
        sourceNote: 'Resume — AI & Agent Engineering',
        lenses: ['ai', 'genai'],
        measured: true,
      },
      {
        id: 'rag-latency',
        value: '<1s',
        label: 'retrieval latency',
        context: 'Thousands of unstructured documents chunked and embedded daily',
        source: 'resume',
        sourceNote: 'Resume — AI & Agent Engineering',
        lenses: ['ai', 'genai', 'data'],
        measured: true,
      },
    ],
    sections: [
      {
        heading: 'The problem with a single index',
        body:
          'Embedding everything into one vector store is the default, and it quietly fails on a ' +
          'whole class of queries. "What did the Q3 remediation memo conclude" is a semantic ' +
          'question. "How many pipelines failed in March" is not — it is an aggregation over ' +
          'structured metadata, and cosine similarity over prose chunks will answer it badly and ' +
          'confidently. The fix is to stop pretending both are the same retrieval problem.',
      },
      {
        heading: 'Routing',
        body:
          'A semantic router classifies the incoming query and directs it to a dense vector store, ' +
          'to structured SQL metadata, or to both with fused results. Routing happens before ' +
          'retrieval, so the expensive path is only paid when it is the right path. The measured ' +
          'effect was a 40% improvement in context retrieval accuracy against the golden set.',
      },
      {
        heading: 'Ingestion',
        body:
          'Queue-based ingestion in Python and Spark SQL processes, chunks and embeds thousands of ' +
          'unstructured documents daily. Decoupling ingestion from serving through a queue means a ' +
          'backlog of new documents degrades freshness rather than availability — the retrieval ' +
          'API keeps answering from the current index while the backlog drains.',
      },
      {
        heading: 'Evaluation',
        body:
          'This is the part that separates a demo from a system. A 200-question golden set with ' +
          'known-good contexts runs as an automated regression check on every index change, so a ' +
          're-chunking or an embedding-model swap cannot silently degrade retrieval. Without that ' +
          'harness, "we improved retrieval" is an opinion.',
      },
    ],
  },
  {
    id: 'mcp',
    slug: 'mcp-server',
    title: 'Secure Enterprise MCP Integration Server',
    tagline: 'Model Context Protocol server exposing pipeline and infra state — without credentials.',
    kind: 'ai-system',
    weight: { data: 4, ai: 4, genai: 5 },
    summary:
      'A custom MCP server that connects enterprise data pipelines and infrastructure logs ' +
      'directly to Claude, so the model can diagnose pipeline failures by reading Terraform state ' +
      'and SSIS execution logs — without any database credential ever reaching the model.',
    stack: ['Model Context Protocol', 'Python', 'Terraform state', 'SSIS logs', 'Tool calling'],
    highlights: [
      'Resource schemas and tool-calling endpoints across the MCP lifecycle',
      'Credential isolation by design — the model sees data, never secrets',
      'Autonomous root-cause analysis of pipeline failures',
    ],
    metrics: [
      {
        id: 'mcp-surface',
        value: '0',
        label: 'credentials exposed to the model',
        context: 'Server holds all secrets; the model receives only scoped resource responses',
        source: 'resume',
        sourceNote: 'Resume — AI & Agent Engineering',
        lenses: ['ai', 'genai'],
        measured: true,
      },
    ],
    sections: [
      {
        heading: 'Why MCP rather than a bag of custom tools',
        body:
          'The usual approach to "let the model see our systems" is a pile of bespoke HTTP tools, ' +
          'each with its own auth story and its own way of shaping responses. MCP gives one ' +
          'lifecycle — resources, tools, prompts — with a single well-defined boundary. That ' +
          'boundary is the point: it is where credentials stop.',
      },
      {
        heading: 'The security property',
        body:
          'The server holds the connection strings and service credentials. The model asks for a ' +
          'named resource and receives a scoped, shaped response. There is no path by which a ' +
          'prompt injection in a log line can exfiltrate a secret, because the secret was never in ' +
          'the context window. This is the difference between exposing a database to a model and ' +
          'exposing an interface to one.',
      },
      {
        heading: 'What it actually does',
        body:
          'When an overnight SSIS package fails, the model reads the execution log resource, ' +
          'correlates against Terraform state to see whether infrastructure changed under it, and ' +
          'reports the likely cause. That is a chain of three or four tool calls that a human on ' +
          'call would otherwise perform manually at 3am.',
      },
    ],
  },
  {
    id: 'agents',
    slug: 'agent-orchestration',
    title: 'Autonomous Subagent Orchestration',
    tagline: 'A supervisor delegating to specialised subagents, instrumented end to end.',
    kind: 'ai-system',
    weight: { data: 2, ai: 4, genai: 5 },
    summary:
      'A hierarchical multi-agent system in which a supervisor dynamically delegates ' +
      'domain-specific tasks to specialised subagents with their own tools and skills. Every run ' +
      'is traced with token and cost tracking so planning failures surface rather than hide.',
    stack: [
      'Claude Code',
      'Multi-agent orchestration',
      'Custom API tools',
      'Tracing',
      'Cost tracking',
    ],
    highlights: [
      'Supervisor delegates dynamically rather than following a fixed script',
      'Per-run tracing with token and cost accounting',
      'End-to-end automated fetch → process → summarise over multi-source streams',
    ],
    metrics: [],
    sections: [
      {
        heading: 'Hierarchical, not a pipeline',
        body:
          'A fixed pipeline is easier to reason about and worse at open-ended work. Here a ' +
          'supervisor agent decides at runtime which specialised subagent should take a task, ' +
          'based on what the task turned out to be rather than what it was predicted to be. Each ' +
          'subagent carries its own tools and skills.',
      },
      {
        heading: 'Instrumentation is the hard part',
        body:
          'Multi-agent systems fail quietly. A subagent returns something plausible, the ' +
          'supervisor accepts it, and the failure only shows up three steps later as a wrong ' +
          'answer with no obvious origin. Every run is instrumented with tracing plus token and ' +
          'cost tracking, which makes planning failures visible as anomalies in the trace — an ' +
          'agent that burned 40k tokens on a task that should have cost 3k has told you something.',
      },
      {
        heading: 'What it produced',
        body:
          'An automated workflow that fetches, processes and summarises multi-source data streams ' +
          'end to end, prototyped and state-tested with Claude Code.',
      },
    ],
  },
]

export const projectsBySlug = new Map(projects.map((p) => [p.slug, p]))
