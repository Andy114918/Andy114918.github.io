import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

/**
 * Restore a deep link that GitHub Pages bounced through 404.html.
 *
 * Pages has no rewrite rule, so a hard load of /case/agriai serves 404.html,
 * which stashes the path here and redirects to /. We put it back before the
 * router mounts, so the visitor never sees the root page flash.
 */
function restoreDeepLink(): void {
  try {
    const target = sessionStorage.getItem('spa:redirect')
    if (!target) return
    sessionStorage.removeItem('spa:redirect')
    if (target.startsWith('/') && !target.startsWith('//')) {
      window.history.replaceState(null, '', target)
    }
  } catch {
    // sessionStorage unavailable — the visitor just lands on the home page.
  }
}

restoreDeepLink()

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element #root not found')

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
