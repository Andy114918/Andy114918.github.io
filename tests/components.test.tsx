import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { Impact } from '@/components/sections/Impact'
import { LensProvider, useLens } from '@/lens/LensContext'
import { filterItems, type PaletteItem } from '@/components/layout/CommandPalette'
import { getInitialTheme, isTheme, applyTheme, storeTheme } from '@/lib/theme'

/**
 * The visible role tabs were removed at the user's request, so the lens is
 * read-only and comes from the `?lens=` URL parameter. This probe just reports
 * what the provider resolved.
 */
function LensProbe() {
  const { lens } = useLens()
  return <span data-testid="current-lens">{lens}</span>
}

function setUrl(search: string) {
  window.history.replaceState(null, '', `/${search}`)
}

beforeEach(() => setUrl(''))

/**
 * Regression guard.
 *
 * The selector unit tests all passed while the rendered impact strip showed the
 * wrong numbers: an `AnimatePresence mode="wait"` around a mapped list kept the
 * previous lens's cards mounted. Pure-function tests cannot see that, so the
 * lens contract is asserted here against the DOM.
 */
describe('Impact strip reflects the active lens', () => {
  it('shows data-platform numbers under the data lens', () => {
    setUrl('?lens=data')
    render(
      <LensProvider>
        <Impact />
      </LensProvider>
    )
    const region = screen.getByLabelText('Selected impact', { selector: 'section' })
    expect(within(region).getByText('5 TB')).toBeInTheDocument()
    expect(within(region).getByText('80%')).toBeInTheDocument()
    expect(within(region).queryByText('1.48s')).not.toBeInTheDocument()
  })

  it('shows AI numbers under the AI lens', () => {
    setUrl('?lens=ai')
    render(
      <LensProvider>
        <Impact />
      </LensProvider>
    )
    const region = screen.getByLabelText('Selected impact', { selector: 'section' })
    expect(within(region).getByText('1.48s')).toBeInTheDocument()
    expect(within(region).getByText('+40%')).toBeInTheDocument()
    expect(within(region).queryByText('5 TB')).not.toBeInTheDocument()
  })

  it('shows Gen AI numbers under the genai lens', () => {
    setUrl('?lens=genai')
    render(
      <LensProvider>
        <Impact />
      </LensProvider>
    )
    const region = screen.getByLabelText('Selected impact', { selector: 'section' })
    expect(within(region).getByText('200')).toBeInTheDocument()
    expect(within(region).getByText('+40%')).toBeInTheDocument()
    expect(within(region).queryByText('5 TB')).not.toBeInTheDocument()
  })

  it('renders a source label for every metric shown', () => {
    setUrl('?lens=genai')
    render(
      <LensProvider>
        <Impact />
      </LensProvider>
    )
    const region = screen.getByLabelText('Selected impact', { selector: 'section' })
    // Four cards, each carrying its provenance.
    expect(within(region).getAllByText(/Resume|Published paper/)).toHaveLength(4)
  })
})

describe('lens engine without a visible control', () => {
  it('adopts the lens named in a shared URL', () => {
    setUrl('?lens=genai')
    render(
      <LensProvider>
        <LensProbe />
      </LensProvider>
    )
    expect(screen.getByTestId('current-lens')).toHaveTextContent('genai')
  })

  it('falls back to the AI default when the URL says nothing', () => {
    setUrl('')
    render(
      <LensProvider>
        <LensProbe />
      </LensProvider>
    )
    expect(screen.getByTestId('current-lens')).toHaveTextContent('ai')
  })

  it('never persists the lens, so no visit can be pinned to a past link', () => {
    setUrl('?lens=data')
    const { unmount } = render(
      <LensProvider>
        <LensProbe />
      </LensProvider>
    )
    expect(screen.getByTestId('current-lens')).toHaveTextContent('data')
    expect(localStorage.getItem('portfolio:lens')).toBeNull()
    unmount()

    // A later plain visit must come back to the default, not the stale lens.
    setUrl('')
    render(
      <LensProvider>
        <LensProbe />
      </LensProvider>
    )
    expect(screen.getByTestId('current-lens')).toHaveTextContent('ai')
  })

  it('leaves the URL untouched', () => {
    setUrl('?lens=genai')
    render(
      <LensProvider>
        <LensProbe />
      </LensProvider>
    )
    expect(window.location.search).toBe('?lens=genai')
  })

  it('renders no role tabs anywhere — the control was removed by request', () => {
    setUrl('?lens=ai')
    render(
      <LensProvider>
        <Impact />
      </LensProvider>
    )
    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument()
    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
    expect(screen.queryByText('Data Engineer')).not.toBeInTheDocument()
    expect(screen.queryByText('Gen AI')).not.toBeInTheDocument()
  })
})

describe('command palette filtering', () => {
  const items: PaletteItem[] = [
    { id: '1', label: 'Work', group: 'Jump to', keywords: 'section work', run: () => {} },
    {
      id: '2',
      label: 'Adaptive Multi-Index RAG System',
      group: 'Case studies',
      keywords: 'semantic routing vector',
      run: () => {},
    },
    { id: '3', label: 'Download resume (PDF)', group: 'Actions', keywords: 'cv pdf', run: () => {} },
  ]

  it('returns everything for an empty or whitespace query', () => {
    expect(filterItems(items, '')).toHaveLength(3)
    expect(filterItems(items, '   ')).toHaveLength(3)
  })

  it('matches on label, case-insensitively', () => {
    expect(filterItems(items, 'rag').map((i) => i.id)).toEqual(['2'])
    expect(filterItems(items, 'RAG').map((i) => i.id)).toEqual(['2'])
  })

  it('matches on keywords the label does not contain', () => {
    expect(filterItems(items, 'vector').map((i) => i.id)).toEqual(['2'])
    expect(filterItems(items, 'cv').map((i) => i.id)).toEqual(['3'])
  })

  it('returns nothing for a query that matches nothing', () => {
    expect(filterItems(items, 'kubernetes')).toEqual([])
  })
})

describe('theme', () => {
  it('validates theme values', () => {
    expect(isTheme('dark')).toBe(true)
    expect(isTheme('light')).toBe(true)
    expect(isTheme('sepia')).toBe(false)
    expect(isTheme(null)).toBe(false)
  })

  it('defaults to dark when nothing is stored', () => {
    expect(getInitialTheme()).toBe('dark')
  })

  it('honours a stored preference', () => {
    storeTheme('light')
    expect(getInitialTheme()).toBe('light')
  })

  it('toggles the document class and colorScheme', () => {
    applyTheme('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.style.colorScheme).toBe('dark')

    applyTheme('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(document.documentElement.style.colorScheme).toBe('light')
  })
})
