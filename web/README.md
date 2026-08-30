# UXHI Web

The UX Hawaiʻi website and the UXHICon conference microsite, served from one Next.js app.

The app lives in this `/web` subfolder — **not** the repo root. Run every command from here.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## What's in here

| Route group | Serves |
|---|---|
| `src/app/(site)/` | The main UXHI site — homepage, directory, events, resources, about |
| `src/app/(conference)/conferences/[year]/` | The conference microsite, one full redesign per year |
| `src/app/studio/` | Sanity Studio, embedded at `/studio` |

Content comes from Sanity (project `evh83z0t`, dataset `production`). Localhost renders
drafts; deployed environments render published content only.

## Two sites, two design systems

The main site and the conference do **not** share styling. `/design-system` is the live
reference for the main site, and each conference year owns its own theme under
`conferences/<year>/theme.ts`. Years share nothing with each other except the parent
palette. Read [CLAUDE.md](../CLAUDE.md) before changing UI — it carries the rules that
matter, including the two that are easy to violate by accident:

- Styling changes go in the shared component, never inline on a page.
- Changing a component means updating `/design-system` in the same changeset.

## Deployment

**Netlify is production. Vercel is staging.** That split is deliberate and documented in
[CLAUDE.md](../CLAUDE.md#deployment).

| Branch | Host | URL |
|---|---|---|
| `staging` | Vercel | `web-henna-five-45.vercel.app` |
| `main` | Netlify | `uxhiconference.com`, and `uxhi.community` at launch |

⛔ **Never push `main` without being asked.** Netlify's free tier is build-credit-limited
(~20 production deploys/month) and every push spends from it. Day-to-day work goes to
`staging`.

## Docs

Everything non-obvious lives in [`../docs/`](../docs/):

- **[PROJECT-STATE.md](../docs/PROJECT-STATE.md)** — deployment reality, source-of-truth map and agent gotchas
- **[handoff-guide.md](../docs/handoff-guide.md)** — for whoever edits content, not code
- **[CONFERENCE-DESIGN-SYSTEM.md](../docs/CONFERENCE-DESIGN-SYSTEM.md)** — why the
  conference is a theme layer rather than a fork
- **[notion-directory-migration.md](../docs/archive/notion-directory-migration.md)** — how the
  member directory got here and how to re-sync it
