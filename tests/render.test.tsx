import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import type { ReactElement } from 'react'

import { LensProvider } from '@/lens/LensContext'
import { Hero } from '@/components/sections/Hero'
import { Impact } from '@/components/sections/Impact'
import { Work } from '@/components/sections/Work'
import { FieldResults } from '@/components/sections/FieldResults'
import { Systems } from '@/components/sections/Systems'
import { Experience } from '@/components/sections/Experience'
import { Journey } from '@/components/sections/Journey'
import { Research } from '@/components/sections/Research'
import { Press } from '@/components/sections/Press'
import { Community } from '@/components/sections/Community'
import { Skills } from '@/components/sections/Skills'
import { Credentials } from '@/components/sections/Credentials'
import { Contact } from '@/components/sections/Contact'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { RagPipeline } from '@/components/viz/RagPipeline'
import { McpFlow } from '@/components/viz/McpFlow'
import { AgentTree } from '@/components/viz/AgentTree'
import { Timeline } from '@/components/viz/Timeline'
import { CaseStudy } from '@/pages/CaseStudy'
import { NotFound } from '@/pages/NotFound'
import { projects } from '@/content/projects'

function mount(ui: ReactElement, route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <LensProvider>{ui}</LensProvider>
    </MemoryRouter>
  )
}

/**
 * Smoke coverage for every section.
 *
 * These exist because a bug shipped that every pure-function test missed: the
 * impact strip rendered the wrong lens's numbers while the selectors were
 * perfectly correct. Mounting each section catches render-time crashes and
 * missing headings, which is the failure mode unit tests cannot see.
 */
describe('every section renders with its heading', () => {
  const cases: Array<[string, ReactElement, string | RegExp]> = [
    ['Hero', <Hero />, 'Anirudh Edupuganti'],
    ['Impact', <Impact />, 'Selected impact'],
    ['Work', <Work />, 'Systems I built end to end'],
    ['FieldResults', <FieldResults />, 'AgriAI in the field'],
    ['Systems', <Systems />, 'The architecture, not the buzzwords'],
    ['Experience', <Experience />, 'Four years shipping to production'],
    ['Journey', <Journey />, 'Research alongside the day job'],
    ['Research', <Research />, 'Original work, independently recognised'],
    ['Press', <Press />, 'Covered by ten outlets'],
    ['Community', <Community />, 'Outside the work'],
    ['Skills', <Skills />, 'Tools, and where they were used'],
    ['Credentials', <Credentials />, 'Formal grounding'],
    ['Contact', <Contact />, /Open to Data, AI and Gen AI/],
  ]

  it.each(cases)('%s', (_name, element, heading) => {
    mount(element)
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
  })
})

describe('layout chrome', () => {
  it('renders the nav with its section links and no role tabs', () => {
    mount(<Nav theme="dark" onToggleTheme={() => {}} onOpenPalette={() => {}} />)
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Work' })).toBeInTheDocument()
    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument()
  })

  it('renders the footer contact links', () => {
    mount(<Footer />)
    expect(screen.getByRole('link', { name: 'Email' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Resume' })).toBeInTheDocument()
  })

  it('renders nothing when the command palette is closed', () => {
    mount(<CommandPalette open={false} onClose={() => {}} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders a searchable dialog when the command palette is open', () => {
    mount(<CommandPalette open onClose={() => {}} />)
    expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument()
    // The lens entries went with the role tabs.
    expect(screen.queryByText(/^View as /)).not.toBeInTheDocument()
  })
})

describe('interactive visualisations', () => {
  it('renders the RAG pipeline with a selectable stage', () => {
    mount(<RagPipeline />)
    expect(screen.getByRole('button', { name: /Semantic router/ })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  it('renders the MCP flow with both scenarios', () => {
    mount(<McpFlow />)
    expect(screen.getByRole('button', { name: /SSIS package failed/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Terraform state drift/ })).toBeInTheDocument()
  })

  it('renders the agent tree with a supervisor and subagents', () => {
    mount(<AgentTree />)
    expect(screen.getByText('Supervisor')).toBeInTheDocument()
    expect(screen.getByText('Summarise')).toBeInTheDocument()
  })

  it('renders the timeline with its track filters', () => {
    mount(<Timeline />)
    expect(screen.getByRole('group', { name: 'Filter timeline by track' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Recognition' })).toBeInTheDocument()
  })
})

describe('case study routing', () => {
  function mountRoute(path: string) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <LensProvider>
          <Routes>
            <Route path="/case/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LensProvider>
      </MemoryRouter>
    )
  }

  it.each(projects.map((p) => [p.slug, p.title]))('renders /case/%s', (slug, title) => {
    mountRoute(`/case/${slug}`)
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
  })

  it('renders every narrative section heading for a case study', () => {
    const project = projects[0]!
    mountRoute(`/case/${project.slug}`)
    for (const section of project.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.heading })).toBeInTheDocument()
    }
  })

  it('falls back to the 404 view for an unknown slug', () => {
    mountRoute('/case/does-not-exist')
    expect(screen.getByRole('heading', { name: 'This page does not exist' })).toBeInTheDocument()
  })

  it('renders the 404 view for an unknown path', () => {
    mountRoute('/nonsense')
    expect(screen.getByRole('heading', { name: 'This page does not exist' })).toBeInTheDocument()
  })
})
