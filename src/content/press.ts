import type { PressItem } from './types'

/**
 * Coverage of the AgriAI launch on 8 March 2026 in Pinagadi village.
 * Tier 1 is national English-language mastheads; tier 2 is regional and
 * Telugu-language press. Headlines are the outlets' own.
 */
export const pressItems: PressItem[] = [
  {
    id: 'new-indian-express',
    outlet: 'The New Indian Express',
    headline: 'AI-enabled pest control device launched in Visakhapatnam',
    language: 'English',
    date: '9 March 2026',
    image: '/media/press/new-indian-express.webp',
    tier: 1,
  },
  {
    id: 'the-hindu',
    outlet: 'The Hindu',
    headline: 'AI-powered pest control device launched for farmers',
    language: 'English',
    date: 'March 2026',
    image: '/media/press/the-hindu.webp',
    tier: 1,
  },
  {
    id: 'times-of-india',
    outlet: 'The Times of India',
    headline: 'Andhra University launches AI pest control device',
    language: 'English',
    date: 'March 2026',
    image: '/media/press/times-of-india.webp',
    tier: 1,
  },
  {
    id: 'deccan-chronicle',
    outlet: 'Deccan Chronicle',
    headline: 'An Agri-AI device to ease life of farmers',
    language: 'English',
    date: '17 March 2026',
    image: '/media/press/deccan-chronicle.webp',
    tier: 1,
  },
  {
    id: 'hans-india',
    outlet: 'The Hans India',
    headline: 'AU launches AI-powered pest control device for farmers',
    language: 'English',
    date: 'March 2026',
    image: '/media/press/hans-india.webp',
    tier: 1,
  },
  {
    id: 'south-indian-times',
    outlet: 'The South Indian Times',
    headline: 'AI-powered pest control device launched',
    language: 'English',
    date: '9 March 2026',
    image: '/media/press/south-indian-times.webp',
    tier: 2,
  },
  {
    id: 'sakshi',
    outlet: 'Sakshi',
    headline: 'Coverage of the AgriAI field launch',
    language: 'Telugu',
    date: 'March 2026',
    image: '/media/press/sakshi.webp',
    tier: 2,
  },
  {
    id: 'andhra-jyothi',
    outlet: 'Andhra Jyothi',
    headline: 'Coverage of the AgriAI field launch',
    language: 'Telugu',
    date: 'March 2026',
    image: '/media/press/andhra-jyothi.webp',
    tier: 2,
  },
  {
    id: 'praja-sakthi',
    outlet: 'Praja Sakthi',
    headline: 'Coverage of the AgriAI field launch',
    language: 'Telugu',
    date: 'March 2026',
    image: '/media/press/praja-sakthi.webp',
    tier: 2,
  },
  {
    id: 'abn',
    outlet: 'ABN',
    headline: 'Coverage of the AgriAI field launch',
    language: 'Telugu',
    date: 'March 2026',
    image: '/media/press/abn.webp',
    tier: 2,
  },
]

export const pressPullQuote = {
  text:
    'He acknowledged the contributions of doctoral fellows of the Dr. B.R. Ambedkar Chair and ' +
    'specifically recognised the technical work of research scholar E. Anirudh in developing the device.',
  attribution: 'The New Indian Express, 9 March 2026',
}
