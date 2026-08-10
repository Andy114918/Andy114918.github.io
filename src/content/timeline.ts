import type { TimelineEvent } from './types'

/**
 * `order` is a plain integer sort key (roughly YYYYMM), not a Date. These are
 * display periods — nothing here is ever parsed or used in arithmetic.
 *
 * Work, research and recognition are interleaved deliberately: the point of the
 * timeline is that the research track ran alongside full-time engineering
 * rather than instead of it.
 */
export const timeline: TimelineEvent[] = [
  {
    id: 'bachelors',
    date: '2015 – 2019',
    order: 201508,
    track: 'education',
    title: 'BSc Computer Science, Andhra University',
    detail: 'Visakhapatnam, India',
  },
  {
    id: 'isro',
    date: 'Jan – Apr 2019',
    order: 201901,
    track: 'work',
    title: 'Software Programming Intern, ISRO',
    detail: 'Deep learning for cloud cover detection on Sentinel imagery — 78% accuracy',
  },
  {
    id: 'masters',
    date: '2020 – 2021',
    order: 202008,
    track: 'education',
    title: 'Master’s in Computer Programming, DePaul University',
    detail: 'Chicago, IL',
  },
  {
    id: 'indus',
    date: 'Sep – Nov 2021',
    order: 202109,
    track: 'work',
    title: 'Data Engineer Intern, Indus Valley',
    detail: 'ETL pipelines, Dataproc clusters and Terraform on GCP',
  },
  {
    id: 'kvk',
    date: 'Dec 2021 – Jul 2022',
    order: 202112,
    track: 'work',
    title: 'Data Engineer / Developer, KVK Tech',
    detail: '5 TB warehouse migration to Azure Synapse — 80% lower query latency, zero downtime',
  },
  {
    id: 'charter',
    date: 'Jul 2022 – Jan 2024',
    order: 202207,
    track: 'work',
    title: 'Data Platform Engineer, Charter Communications',
    detail: 'AWS, Snowflake, EMR and Terraform — 30% lower cloud spend, 20% shorter runtimes',
  },
  {
    id: 'patents',
    date: 'Aug 2023',
    order: 202308,
    track: 'research',
    title: 'Two patents filed — biomedical imaging',
    detail: 'Real-time image analysis and 3D reconstruction, via Andhra University. Both approved.',
  },
  {
    id: 'phd',
    date: 'Aug 2023 – Present',
    order: 202309,
    track: 'education',
    title: 'PhD in Computer Science, Andhra University',
    detail: 'Department of Computer Science & Systems Engineering',
  },
  {
    id: 'elevance',
    date: 'Feb 2024 – Jun 2025',
    order: 202402,
    track: 'work',
    title: 'AI / Data Platform Engineer, Elevance Health',
    detail: 'Owned a healthcare platform end to end — 60% fewer release defects',
  },
  {
    id: 'scopus',
    date: '2024',
    order: 202406,
    track: 'research',
    title: 'Scopus-indexed paper published',
    detail: 'AI, IoT and Digital Literacy for Sustainable Farming and Hunger Mitigation (IJISAE)',
  },
  {
    id: 'book',
    date: '2025',
    order: 202506,
    track: 'research',
    title: '“AI Uncomplicated” written',
    detail: 'A beginner’s guide to artificial intelligence — 5 parts, 18 chapters',
  },
  {
    id: 'agri-launch',
    date: '8 Mar 2026',
    order: 202603,
    track: 'recognition',
    title: 'AgriAI launched in the field',
    detail:
      'Formally launched by the Director of the Dr. Ambedkar Foundation in Pinagadi village. ' +
      'Covered by The Hindu, Times of India, Deccan Chronicle and seven more outlets.',
  },
  {
    id: 'govt-letter',
    date: '30 Mar 2026',
    order: 202604,
    track: 'recognition',
    title: 'Government of India letter of appreciation',
    detail:
      'Ministry of Social Justice & Empowerment, for outstanding technical contribution to AgriAI',
  },
  {
    id: 'icict',
    date: '2026',
    order: 202605,
    track: 'research',
    title: 'AgriAI paper presented at ICICT 2026, London',
    detail: 'First author. Paper ID 842.',
  },
]
