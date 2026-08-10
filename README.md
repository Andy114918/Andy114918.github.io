# andy114918.github.io

Personal portfolio for **Anirudh Edupuganti** — Data / AI / Gen AI engineering.

Live at **https://andy114918.github.io**

---

## What this is

A static React site aimed at recruiters and engineering hiring managers. Two ideas shape it:

**1. Nothing on the page is unsourced.** Every metric lives in `src/content/` as typed data
carrying a mandatory `source` and `sourceNote` field, tracing it back to the resume, the
published paper, a patent publication, press coverage, or the government letter.
`tests/content-integrity.test.ts` fails the build if any figure lacks provenance. Where a number
is illustrative rather than measured it renders with a visible badge.

**2. Content is separated from presentation.** To update a project, a metric, or a job, edit one
file under `src/content/` — no component changes.

## Stack

React 18 · TypeScript (strict) · Vite 6 · Tailwind · Recharts · Framer Motion · Vitest

## Local development

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck, then production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the test suite |
| `npm run test:coverage` | Test suite with a coverage report |
| `npm run typecheck` | Types only |

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which typechecks, tests, builds, and
publishes to GitHub Pages. A failing test blocks the deploy.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Project layout

```
src/
  content/      All site data — typed and source-tagged. Edit here.
  lens/         Role framing (?lens=data|ai|genai) + derived selectors
  components/
    layout/     Nav, footer, command palette, theme toggle
    sections/   One module per page section
    viz/        Charts and interactive architecture diagrams
    ui/         Shared primitives
  pages/        Home, case studies, 404
tests/          Content integrity, lens logic, component rendering
```

## Two implementation notes

**Deep links.** GitHub Pages has no server-side rewrite, so a hard load of `/case/agriai` would
404. `public/404.html` stashes the requested path in `sessionStorage` and hands control back to
the app, which restores the route before the router mounts.

**Role framing.** The page adapts to `?lens=data`, `?lens=ai` (default) or `?lens=genai`,
changing the headline, the four lead metrics, project order, which experience bullets show, and
skill ordering. There is no visible control and nothing is persisted — a plain visit is always
identical, while a link shared as `?lens=data` arrives pre-tailored.

## Chart colours

The categorical palette was validated for colour-vision deficiency against this site's actual
light and dark surfaces, not chosen by eye. Two hues fall below 3:1 on the light surface, which
is why the multi-series chart ships a legend carrying final values plus a table view — identity
never rests on colour alone.

## A note on the source material

This repo is deliberately isolated from the folder holding personal documents. `.gitignore`
additionally blocks passport, visa, I-94, LCA, transcript and similar patterns as a second line
of defence. Only an explicit allowlist of assets is published: the headshot, the resume PDF,
press clippings, patent publication pages, and award certificates.
