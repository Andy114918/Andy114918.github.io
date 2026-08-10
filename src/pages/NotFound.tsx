import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-faint">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">This page does not exist</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        The link may be out of date. Everything on this site is reachable from the home page.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg
                   transition-opacity hover:opacity-90"
      >
        Back to the portfolio
      </Link>
    </div>
  )
}
