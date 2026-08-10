import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { LensProvider } from '@/lens/LensContext'
import { applyTheme, getInitialTheme, storeTheme, type Theme } from '@/lib/theme'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { Home } from '@/pages/Home'
import { CaseStudy } from '@/pages/CaseStudy'
import { NotFound } from '@/pages/NotFound'

/** Reset scroll on route change, but leave in-page hash jumps alone. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      storeTheme(next)
      return next
    })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <LensProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Nav theme={theme} onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </LensProvider>
  )
}
