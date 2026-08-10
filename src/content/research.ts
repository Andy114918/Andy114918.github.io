import type { Patent, Publication } from './types'

export const publications: Publication[] = [
  {
    id: 'agri-paper',
    title: 'Adaptive IoT–AI Pest Control System with LLM Integration',
    venue: 'ICICT 2026, London, UK',
    detail:
      'Paper ID 842. Edge YOLOv8n detection combined with LLM-driven, weather-aware deterrence ' +
      'control, piloted across five villages with over 1,000 farmers engaged.',
    year: '2026',
    authorRole: 'First author',
  },
  {
    id: 'ai-iot-literacy',
    title:
      'Artificial Intelligence, IoT, and Digital Literacy for Sustainable Farming and Hunger Mitigation',
    venue: 'IJISAE (Scopus-indexed)',
    detail:
      'On the intersection of applied AI, connected sensing and digital literacy as levers against ' +
      'food insecurity in smallholder farming systems.',
    year: '2024',
    authorRole: 'Co-author',
    url: 'https://ijisae.org/index.php/IJISAE/article/view/7903',
  },
  {
    id: 'sdg-roadmap',
    title: 'Digital Roadmap for Attaining Sustainable Development Goals',
    venue: 'In progress',
    detail:
      'The through-line of the doctoral work: how digital infrastructure and applied AI map onto ' +
      'measurable SDG outcomes.',
    year: 'In progress',
    authorRole: 'Author',
  },
]

export const patents: Patent[] = [
  {
    id: 'patent-realtime',
    title: 'A Novel System and Method for Real-Time Biomedical Image Analysis',
    applicationNo: '202341057367 A',
    filed: '26 August 2023',
    published: '3 November 2023',
    journal: 'The Patent Office Journal No. 44/2023',
    applicant: 'Andhra University',
    status: 'Approved',
    abstract:
      'Real-time biomedical image analysis integrating AI and ML across imaging modalities, using ' +
      'parallel computing for instantaneous analysis, with cloud compatibility and adaptability to ' +
      'new algorithms and imaging techniques.',
    image: '/media/patents/realtime-analysis.webp',
  },
  {
    id: 'patent-3d',
    title: 'A Method and Apparatus for 3D Biomedical Image Reconstruction',
    applicationNo: '202341057366 A',
    filed: '26 August 2023',
    published: '8 September 2023',
    journal: 'The Patent Office Journal No. 36/2023',
    applicant: 'Andhra University',
    status: 'Approved',
    abstract:
      'High-definition 3D reconstruction from multiple imaging modalities using adaptive filtering ' +
      'to mitigate distortion, with AI-driven enhancement and reconstructions tailored to ' +
      'individual patient data.',
    image: '/media/patents/3d-reconstruction.webp',
  },
]

export const book = {
  title: 'AI Uncomplicated',
  subtitle: 'A Beginner’s Guide to Understand Artificial Intelligence',
  year: '2025',
  structure: '5 parts, 18 chapters',
  blurb:
    'A book for readers with no technical background at all. It covers what intelligence means, ' +
    'how machines learn, what AI can actually do today, where it falls short — bias, ' +
    'hallucination, the absence of real understanding — and what comes next. Each chapter ' +
    'carries hands-on activities and "myth vs. reality" sections aimed squarely at the hype.',
  quote:
    'I wrote this book to pull back the curtain. AI is not magic or some unreachable wizardry; ' +
    'it’s a collection of tools and methods built by people, often using surprisingly simple ideas.',
}

export const recognition = [
  {
    id: 'govt-letter',
    title: 'Government of India — Letter of Appreciation',
    issuer: 'Dr. Ambedkar Foundation, Ministry of Social Justice & Empowerment',
    date: '30 March 2026',
    signatory: 'Manoj Tiwari, IPS — Director',
    detail:
      'Placing on record "sincere appreciation for your outstanding technical contribution towards ' +
      'the design and development of the innovative AgriAI — Adaptive IoT–AI Pest Control ' +
      'System with LLM Integration."',
    image: '/media/govt-letter.webp',
  },
  {
    id: 'defenders',
    title: 'Certificate of Appreciation',
    issuer: 'Defenders of Wildlife, Washington DC',
    date: '',
    signatory: 'Andrew Bowman, President and CEO',
    detail:
      'For taking action to protect wildlife and wildlands, and showing a true appreciation for ' +
      'the nation’s natural heritage.',
    image: '/media/defenders-wildlife.webp',
  },
]

/**
 * Charitable and community support. Framed honestly as supporter recognitions
 * rather than professional awards — they say something real about the person
 * without pretending to be an engineering credential.
 */
export const community = [
  {
    id: 'vfw',
    org: 'Veterans of Foreign Wars of the United States',
    short: 'VFW',
    kind: 'Certificate of Appreciation',
    date: '20 January 2026',
    detail:
      'Recognised "for faithful support of America’s deserving veterans and their families." ' +
      'Signed by Dan West, Adjutant General.',
    image: '/media/community/vfw.webp',
    hasImage: true,
  },
  {
    id: 'defenders',
    org: 'Defenders of Wildlife',
    short: 'Defenders of Wildlife',
    kind: 'Certificate of Appreciation',
    date: '',
    detail:
      'For taking action to protect wildlife and wildlands, and showing a true appreciation for ' +
      'the nation’s natural heritage. Signed by Andrew Bowman, President and CEO.',
    image: '/media/defenders-wildlife.webp',
    hasImage: true,
  },
  {
    id: 'uso',
    org: 'USO — For the People Who Serve',
    short: 'USO',
    kind: 'Proud Supporter',
    date: '',
    detail: 'Supporter of the USO’s work with service members and their families.',
    image: '/media/community/uso.webp',
    hasImage: true,
  },
  {
    id: 'bgca',
    org: 'Boys & Girls Clubs of America',
    short: 'Boys & Girls Clubs',
    kind: 'Proud Supporter',
    date: '',
    detail: 'Supporter of youth development programmes across the United States.',
    image: '/media/community/bgca.webp',
    hasImage: true,
  },
]

export const education = [
  {
    id: 'phd',
    degree: 'PhD, Computer Science',
    institution: 'Andhra University',
    location: 'Visakhapatnam, India',
    period: '08/2023 – Present',
    note: 'Research scholar, Department of Computer Science & Systems Engineering',
  },
  {
    id: 'masters',
    degree: 'Master’s, Computer Programming',
    institution: 'DePaul University',
    location: 'Chicago, IL',
    period: '08/2020 – 05/2021',
    note: '',
  },
  {
    id: 'bachelors',
    degree: 'Bachelor’s, Computer Science',
    institution: 'Andhra University',
    location: 'Visakhapatnam, India',
    period: '08/2015 – 05/2019',
    note: '',
  },
]
