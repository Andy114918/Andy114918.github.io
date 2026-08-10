import type { Role } from './types'

/**
 * Every bullet is tagged with the lenses it is relevant to, so the Experience
 * section shows a genuinely different (and shorter) read per hiring track
 * rather than dumping all bullets and hoping the reader filters.
 */
export const roles: Role[] = [
  {
    id: 'elevance',
    title: 'AI / Data Platform Engineer (Data Engineer IV)',
    company: 'Elevance Health',
    location: 'Chicago, IL',
    period: '02/2024 – 06/2025',
    summary:
      'Owned a healthcare solutions platform end to end, from problem framing through production.',
    stack: ['SSIS', 'SSMS', 'T-SQL', 'CI/CD', 'Azure'],
    bullets: [
      {
        text:
          'Owned a healthcare solutions platform end to end from problem framing through ' +
          'production, partnering directly with clinical and business stakeholders to define ' +
          'success metrics and ship incremental releases.',
        lenses: ['data', 'ai', 'genai'],
      },
      {
        text:
          'Designed and deployed data integration workflows by building and optimizing SQL ' +
          'Server Integration Services (SSIS) packages.',
        lenses: ['data'],
      },
      {
        text:
          'Authored and optimized a minimum of three complex stored procedures weekly using ' +
          'SQL Server Management Studio.',
        lenses: ['data'],
      },
      {
        text: 'Created comprehensive project data maps while anticipating downstream challenges.',
        lenses: ['data'],
      },
      {
        text:
          'Orchestrated weekly production releases across 3 environments via automated CI/CD, ' +
          'cutting release defects by 60% and deployment time from 5 hours to 2.',
        lenses: ['data', 'ai', 'genai'],
      },
    ],
    metrics: [
      {
        id: 'elevance-defects',
        value: '60%',
        label: 'fewer release defects',
        context: 'Automated CI/CD across three environments, weekly production releases',
        source: 'resume',
        sourceNote: 'Resume — Elevance Health',
        lenses: ['data', 'ai'],
        measured: true,
      },
      {
        id: 'elevance-deploy',
        value: '5h → 2h',
        label: 'deployment time',
        context: 'Weekly production release orchestration',
        source: 'resume',
        sourceNote: 'Resume — Elevance Health',
        lenses: ['data'],
        measured: true,
      },
    ],
  },
  {
    id: 'charter',
    title: 'Data Platform Engineer (Data Engineer IV)',
    company: 'Charter Communications',
    location: 'Stamford, CT',
    period: '07/2022 – 01/2024',
    summary:
      'Cloud-native backend services and Snowflake pipelines serving five downstream consumers.',
    stack: ['AWS', 'Snowflake', 'EMR', 'Spark', 'Glue', 'Terraform', 'Docker', 'PEGA'],
    bullets: [
      {
        text:
          'Built cloud-native backend services and REST integrations orchestrating operational ' +
          'workflows across PEGA Systems and end-to-end Snowflake pipelines, serving 5 ' +
          'downstream consumers.',
        lenses: ['data', 'ai'],
      },
      {
        text:
          'Established AWS production environments and managed the full lifecycle of cloud ' +
          'resources with Terraform.',
        lenses: ['data', 'ai', 'genai'],
      },
      {
        text: 'Built scalable data pipelines with Amazon EMR, Apache Spark and AWS Glue.',
        lenses: ['data', 'ai'],
      },
      {
        text:
          'Tuned compute across EC2 and EMR clusters, cutting cloud spend by 30% and job ' +
          'runtime by 20% through autoscaling, spot capacity and partition strategy.',
        lenses: ['data', 'ai'],
      },
      {
        text:
          'Accelerated deployment timelines by 60% with automated CI/CD, containerized service ' +
          'deployments and queue-based async processing for high-volume workloads.',
        lenses: ['data', 'ai', 'genai'],
      },
    ],
    metrics: [
      {
        id: 'charter-spend',
        value: '30%',
        label: 'lower cloud spend',
        context: 'EC2 + EMR tuning via autoscaling, spot capacity and partition strategy',
        source: 'resume',
        sourceNote: 'Resume — Charter Communications',
        lenses: ['data', 'ai'],
        measured: true,
      },
      {
        id: 'charter-runtime',
        value: '20%',
        label: 'shorter job runtime',
        context: 'Same compute tuning programme',
        source: 'resume',
        sourceNote: 'Resume — Charter Communications',
        lenses: ['data'],
        measured: true,
      },
      {
        id: 'charter-deploy',
        value: '60%',
        label: 'faster deployments',
        context: 'Automated CI/CD, Docker, queue-based async processing',
        source: 'resume',
        sourceNote: 'Resume — Charter Communications',
        lenses: ['data', 'genai'],
        measured: true,
      },
    ],
  },
  {
    id: 'kvk',
    title: 'Data Engineer / Developer',
    company: 'KVK Tech',
    location: 'Newtown, PA',
    period: '12/2021 – 07/2022',
    summary: 'Led a 5 TB warehouse migration to Azure Synapse with zero downtime.',
    stack: ['Azure Synapse', 'Data Factory', 'Dataproc', 'Spark', 'Hadoop'],
    bullets: [
      {
        text:
          'Led migration of a 5 TB data warehouse to Azure Synapse Analytics, cutting query ' +
          'latency by 80% and retiring 15 legacy pipelines with zero downtime.',
        lenses: ['data', 'ai'],
      },
      {
        text: 'Engineered data integration solutions using Azure Data Factory.',
        lenses: ['data'],
      },
      {
        text: 'Executed data processing pipelines on Google Dataproc integrating Spark and Hadoop.',
        lenses: ['data'],
      },
      {
        text:
          'Developed custom Apache Spark functions and used DataFrames for complex feature ' +
          'engineering.',
        lenses: ['data', 'ai'],
      },
      {
        text: 'Built an FDA-compliant desktop application for equipment tracking.',
        lenses: ['data'],
      },
    ],
    metrics: [
      {
        id: 'kvk-migration',
        value: '5 TB',
        label: 'warehouse migrated',
        context: 'To Azure Synapse Analytics, zero downtime, 15 legacy pipelines retired',
        source: 'resume',
        sourceNote: 'Resume — KVK Tech',
        lenses: ['data'],
        measured: true,
      },
      {
        id: 'kvk-latency',
        value: '80%',
        label: 'lower query latency',
        context: 'Post-migration on Azure Synapse Analytics',
        source: 'resume',
        sourceNote: 'Resume — KVK Tech',
        lenses: ['data', 'ai'],
        measured: true,
      },
    ],
  },
  {
    id: 'indus',
    title: 'Data Engineer Intern',
    company: 'Indus Valley',
    location: 'Miamisburg, OH',
    period: '09/2021 – 11/2021',
    summary: 'Automated ETL pipelines and Dataproc cluster operations on GCP.',
    stack: ['GCP', 'Dataproc', 'Cloud Functions', 'Terraform', 'Tableau'],
    bullets: [
      {
        text:
          'Designed and built automated ETL pipelines to ingest and process large-scale datasets.',
        lenses: ['data'],
      },
      {
        text:
          'Classified and organized complex data assets, developing product dashboards in Tableau.',
        lenses: ['data'],
      },
      {
        text:
          'Deployed and oversaw scalable Google Dataproc clusters and used Cloud Functions for ' +
          'serverless applications.',
        lenses: ['data'],
      },
      { text: 'Provisioned and managed cloud infrastructure using Terraform.', lenses: ['data'] },
    ],
    metrics: [],
  },
  {
    id: 'isro',
    title: 'Software Programming Intern',
    company: 'ISRO — Indian Space Research Organisation',
    location: 'Hyderabad, India',
    period: '01/2019 – 04/2019',
    summary: 'Deep learning for automated cloud cover detection on Sentinel satellite imagery.',
    stack: ['Python', 'Deep learning', 'Sentinel imagery'],
    bullets: [
      {
        text: 'Developed a Python-based deep learning solution for automated cloud cover detection.',
        lenses: ['data', 'ai', 'genai'],
      },
      {
        text: 'Engineered a data transformation pipeline for processing raw Sentinel satellite images.',
        lenses: ['data', 'ai'],
      },
      {
        text: 'Trained and evaluated the image recognition model to 78% detection accuracy.',
        lenses: ['ai', 'genai'],
      },
    ],
    metrics: [
      {
        id: 'isro-accuracy',
        value: '78%',
        label: 'cloud detection accuracy',
        context: 'Deep learning model on raw Sentinel satellite imagery',
        source: 'resume',
        sourceNote: 'Resume — ISRO internship',
        lenses: ['ai'],
        measured: true,
      },
    ],
  },
]
