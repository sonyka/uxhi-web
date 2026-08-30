# Project State — for agents and developers

**This is the technical living document.** It holds the things a coding agent or a developer
needs in order to act safely: where each thing is deployed, what must not be touched, which
file is the source of truth for what, and the open work with its exact commands.

> **Status lives elsewhere.** What is done, what is outstanding, and what needs deciding is
> tracked in the **Path to Launch worklog** — a non-technical, human-facing document for Sony
> and the UXHI team:
>
> **https://claude.ai/code/artifact/f5861a52-1822-47ca-b284-a08688f1134a**
>
> Do not duplicate its checklists here. If a status changes, update the worklog. This file
> records *mechanics*, not progress.

---

## Which document serves what

| Need | Go to |
|---|---|
| What is done / outstanding / needs deciding | **The worklog artifact** (link above) |
| Rules, architecture, design system, deploy policy | `CLAUDE.md` |
| How to point the domain, GA setup, Mailchimp plan | The runbooks in this folder |
| How the 63 directory members got here | `docs/archive/` |
| This file | Deployment reality, source-of-truth map, agent gotchas |

---

## Deployment reality

| Thing | Where it lives | Notes |
|---|---|---|
| **Staging — everything** | `web-henna-five-45.vercel.app` → **Vercel** (`staging` branch) | The only staging URL. Share this for review. |
| **Conference production** | `uxhiconference.com` → **Netlify** (`main`) | Conference only. Current year at `/`, archives at `/YYYY`. |
| **Main site production** | `uxhi.community` → **Netlify** (`main`) | **Domain not yet pointed.** See the runbook in [HOSTING-AND-DNS.md](HOSTING-AND-DNS.md). |
| Active dev branch | `staging` | All commits go here. |

> ⛔ **Never push `main`, and never suggest it.** Until `uxhi.community` is pointed, the only
> reason to build `main` is a conference change. `main` being behind `staging` is the intended
> state, not a backlog — do not report it as one. Netlify is credit-limited (~15 credits per
> build, ~300/month). Full rule in `CLAUDE.md`.

> **`main` is already public.** It serves Netlify's default domain
> `splendid-entremet-f6cb1d.netlify.app`, so the whole main site is reachable there today.
> `uxhiconference.com` only 404s on non-conference paths because `src/middleware.ts` rewrites
> by hostname. Pointing `uxhi.community` gives the site a *findable* address; it is not the
> moment it becomes public.

> **`uxhi.hisony.com` is retired** and no longer resolves. Do not re-add it.

---

## Source of truth map

| Thing | Lives in | Notes |
|---|---|---|
| Member directory content | **Sanity** | Notion retired 2026-08-30. Edit in the Studio. |
| Focus / industry options | `web/src/components/directory/constants.ts` | The Sanity schema **imports** these — do not duplicate them. Mirrors the live submission form. |
| Page content | **Sanity** | Localhost shows drafts; staging and production show published. |
| Design tokens | `web/src/app/globals.css` | Component styling changes go at the component level, never inline on a page. |
| Component documentation | `/design-system` | Must be updated in the same changeset as any component change. |
| Conference per-year design | `app/(conference)/conferences/<year>/` | Years share no code. See [CONFERENCE-DESIGN-SYSTEM.md](CONFERENCE-DESIGN-SYSTEM.md). |

---

## Agent gotchas

- **Do not re-run `web/scripts/migrate-notion-directory.mjs`.** It is a full replace and would
  overwrite Studio edits. Notion is retired; the script is history.
- **`web/scripts/purge-orphan-assets.mjs`** is idempotent and safe to re-run. It refuses if any
  listed asset has gained a reference, and skips ones already deleted.
- **Crawler rules are host-aware** (`web/src/app/robots.ts`). Only the real domains are
  crawlable. Add a hostname to `PUBLIC_HOSTS` only if it is genuinely meant to be found.
  `/robots.txt` and `/sitemap.xml` are excluded from the hostname rewrite in `middleware.ts` —
  without that, the conference domain would serve no rules at all.
- **Sanity CORS** currently allows: both localhost dev ports, the hosted Studio, the Netlify
  default domain, staging, `uxhi.community` and `uxhiconference.com`. A new public hostname
  needs adding or live content updates break silently.
- **Analytics are host-gated.** Both GA tags load only on their production hostname, via
  `components/analytics/GoogleAnalyticsGated.tsx`.
- **Deleting a route?** Next's generated types cache the old path. `rm -rf web/.next/types`
  if the typecheck complains about a page you removed.
- **`next.config.ts` changes need a dev-server restart** — they do not hot-reload under
  Turbopack.

---

## Pre-launch checks — the exact mechanics

The worklog states these in plain language for the team. Here is what they actually mean.

**Placeholder gate.** Before pointing the domain, confirm no placeholder directory rows exist:

```groq
*[_type == "directoryMember" && name match "Placeholder*"]
```

Must return zero. It does today; the gate exists in case placeholders are ever re-seeded for
staging. Run it in the Studio's Vision tool.

**Analytics host.** The community GA tag only loads on its production hostname. If the launch
domain is anything other than `uxhi.community`, update `COMMUNITY_HOST` in
`web/src/app/(site)/layout.tsx` before launch, or analytics silently records nothing. The
gating component checks both the bare host and its `www.` form, so `www` needs no change.

**Instagram feed.** The homepage feed is a Behold widget; its token expires every 60 days. The
widget's layout — including the number of columns per breakpoint — is configured in the Behold
dashboard, not in this codebase. `InstagramFeed.tsx` accepts only a `feedId`.

**Publishing to production.** `git checkout main && git merge staging && git push origin main`,
then return to `staging` immediately. Only ever on explicit instruction — see the rule above.

---

## Known issues

- Two ESLint warnings remain in `TeamCard.tsx` and elsewhere (unused imports). Zero errors.
- The report PDFs in `web/public/reports/` are compressed but still 7.9 MB and 5.0 MB.
- `docs/archive/` holds the Notion migration record. Read-only history.

---

## Runbooks in this folder

- **[HOSTING-AND-DNS.md](HOSTING-AND-DNS.md)** — phases, and the DNS runbook for
  pointing `uxhi.community` (including the MX-record warning).
- **[GOOGLE_ANALYTICS.md](GOOGLE_ANALYTICS.md)** — both GA properties and their gating.
- **[mailchimp-integration.md](mailchimp-integration.md)** — written, on hold, ready to build.
- **[stripe-payment-options.md](stripe-payment-options.md)** — options for merch payments,
  undecided.
- **[handoff-guide.md](handoff-guide.md)** — onboarding for a new maintainer.
- **[CONFERENCE-DESIGN-SYSTEM.md](CONFERENCE-DESIGN-SYSTEM.md)** — why each conference year is
  its own design world.
