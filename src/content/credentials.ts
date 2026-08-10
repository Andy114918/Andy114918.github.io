import type { CredentialGroup } from './types'

export const credentialGroups: CredentialGroup[] = [
  {
    id: 'ibm-ai',
    name: 'IBM AI Engineering Professional Certificate',
    issuer: 'Coursera',
    featured: true,
    items: [
      'Machine Learning with Python',
      'Introduction to Deep Learning & Neural Networks with Keras',
      'Deep Learning with Keras and TensorFlow',
      'Introduction to Neural Networks and PyTorch',
      'Scalable Machine Learning on Big Data using Apache Spark',
      'AI Capstone Project with Deep Learning',
    ],
  },
  {
    id: 'applied-genai',
    name: 'Applied Generative AI Specialization',
    issuer: 'Simplilearn',
    featured: true,
    items: [
      'Advanced Generative AI Models and Architecture',
      'Building LLM Applications',
      'Agentic Frameworks',
      'Image Generation Capabilities',
      'Generative AI Governance',
      'AI Literacy',
      'Capstone Project',
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)',
    issuer: 'Microsoft',
    featured: true,
    items: ['Implementing Analytics Solutions Using Microsoft Fabric'],
  },
  {
    id: 'anthropic',
    name: 'Anthropic Certifications',
    issuer: 'Anthropic',
    featured: true,
    items: ['Claude 101', 'Claude Code 101', 'Claude Platform 101'],
  },
  {
    id: 'pega',
    name: 'Pega System Architecture & NBA Models',
    issuer: 'Pegasystems',
    items: ['System Architecture', 'Next-Best-Action Models'],
  },
  {
    id: 'foundations',
    name: 'Foundations & Coursework',
    issuer: 'Various',
    items: [
      'CS50x: Introduction to Computer Science — Harvard University',
      'Machine Learning & Deep Learning Foundations — Great Learning',
      'Statistics for Machine Learning',
      'Python for Machine Learning',
      'Data Engineering Hands-On — Udemy',
      'Design Databases with PostgreSQL — Codecademy',
      'Research Methodologies — Queen Mary University of London',
      'Python Basics — Simplilearn',
      'Cyber Security Basics',
    ],
  },
]
