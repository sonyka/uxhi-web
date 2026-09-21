# Project State — for agents and developers

**This is the technical living document.** It holds what a coding agent or a developer needs
in order to act safely: where each thing is deployed, what must not be touched, which file is
the source of truth for what, and the gotchas that are not visible from the code.

> **Two live documents sit outside this repo, and they own everything human-facing.**
>
> - **[UXHI Site Handbook](https://claude.ai/code/artifact/3526c45a-92cb-42fe-ae35-5563968c0d23)** —
>   where every piece of content is edited and whether editing it changes anything, how a
>   change reaches the live site, the three forms, the outside services, access and local
>   setup, the DNS runbook for pointing `uxhi.community`, and the parked Mailchimp and Stripe
>   plans. Shared with the team.
> - **[Path to Launch worklog](https://claude.ai/code/artifact/f5861a52-1822-47ca-b284-a08688f1134a)** —
>   what is done, what is outstanding, what needs deciding.
>
> They replaced five files in this folder on 8 Sep 2026 — a handoff guide, a DNS runbook, an
> analytics note, a Mailchimp plan and a Stripe comparison — which had drifted precisely
> because the same facts were written down in two places. **Do not restate their content
> here.** If a fact belongs to a human workflow, it goes in the handbook; if it is progress,
> it goes in the worklog; this file is for mechanics an agent needs.

---

## Deployment reality

| Thing | Where it lives | Notes |
|---|---|---|
| **Staging — everything** | `web-henna-five-45.vercel.app` → **Vercel** (`staging` branch) | The only staging URL. Share this for review. |
| **Conference production** | `uxhiconference.com` → **Netlify** (`main`) | Conference only. Current year at `/`, archives at `/YYYY`. |
| **Main site production** | `uxhi.community` → **Netlify** (`main`) | **Domain not yet pointed.** Runbook is in the handbook. |
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
| Every content type with a Sanity schema | **Sanity** | The CMS is the only source. Pages render what it returns and nothing else — no hardcoded fallback lists. See the rule below. |
| Conference schedule | `app/(conference)/conference/2026/agenda.ts` | Times, rooms, session titles and which speakers sit on which session. The CMS supplies a speaker's photo, title, bio and links, joined on `slug`. Deleting a speaker record does not remove their name from the page. |
| Shop products | `app/(site)/merch/page.tsx` | The CMS has no products, so the placeholder array is what renders. Publishing a real product replaces it. |
| Focus / industry options | `web/src/components/directory/constants.ts` | The Sanity schema **imports** these — do not duplicate them. Mirrors the live submission form. |
| Design tokens | `web/src/app/globals.css` | Component styling changes go at the component level, never inline on a page. |
| Component documentation | `/design-system` | Must be updated in the same changeset as any component change. |
| Conference per-year design | `app/(conference)/conference/<year>/` | Years share no code. See [CONFERENCE-DESIGN-SYSTEM.md](CONFERENCE-DESIGN-SYSTEM.md). |

### No fallback content

A page must not carry a hardcoded copy of CMS content behind a `rows.length > 0 ? rows :
hardcoded` branch. Four of these existed and all four had drifted: the committee fallback
still advertised two committees that no longer exist, the partner list was four short, and
the resource lists predated the import. They never rendered, so nobody corrected them, and
the one moment they would have appeared is the moment the CMS was unreachable.

Removed 8 Sep 2026. When a fetch returns nothing, render nothing.

---

## Content that is fetched but not shown

Live sections are listed in the handbook. These are the exceptions an agent will trip over:

- **`value`** — fetched on `/about` and passed to `MissionSection`, whose values grid is
  switched off. The query is a round trip for nothing while that stays true.
- **`aboutFaq`** — behind `SHOW_FAQS = false` in `app/(site)/about/page.tsx`.
- **`faq`** ("FAQs — Join") — 5 documents, no consumer at all. `/join` reads nothing from the CMS.
- **`event`** — 0 documents, no consumer. `/events` embeds a Luma calendar.
- **`stateOfUxReport`** — 1 document, no consumer. `/resources` links both PDFs directly.

Deleting these schemas is a decision, not a cleanup — the hidden sections are parked pending
Sony's call on Our Values and the FAQ.

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
- **`sitemap.ts` is host-aware too** — the conference host gets an empty sitemap on purpose,
  so it never hands out community URLs.
- **Sanity CORS** currently allows: both localhost dev ports, the hosted Studio, the Netlify
  default domain, staging, `uxhi.community` and `uxhiconference.com`. A new public hostname
  needs adding or live content updates break silently. `www.uxhi.community` is **not** on the
  list — it only matters if `www` becomes canonical at launch.
- **Analytics are host-gated.** Both GA tags load only on their production hostname, via
  `components/analytics/GoogleAnalyticsGated.tsx`: `G-DMCWLCQD08` on `uxhi.community`,
  `G-CT4QB1KDE2` on `uxhiconference.com`. Neither reports from staging, so an analytics change
  cannot be verified before a production deploy. If the launch domain ever differs from
  `uxhi.community`, update the `productionHost` prop in `app/(site)/layout.tsx` or the tag
  silently records nothing.
- **Security headers and the CSP** are set in `next.config.ts`, not `netlify.toml`, so staging
  gets them too. The CSP is `frame-ancestors` only — allow-listed rather than `DENY`, because a
  flat block breaks Sanity's Presentation preview.
- **Error reporting degrades silently.** `SLACK_WEBHOOK_URL` unset in production means no
  alerts at all, with only a server log line.
- **Deleting a route?** Next's generated types cache the old path. `rm -rf web/.next/types`
  if the typecheck complains about a page you removed.
- **`next.config.ts` changes need a dev-server restart** — they do not hot-reload under
  Turbopack.

---

## Pre-launch mechanics

**Placeholder gate.** Before pointing the domain, confirm no placeholder directory rows exist.
Run in the Studio's Vision tool; it must return zero:

```groq
*[_type == "directoryMember" && name match "Placeholder*"]
```

**Publishing to production.** `git checkout main && git merge staging && git push origin main`,
then return to `staging` immediately. Only ever on explicit instruction — see the rule above.

---

## Known issues

- The report PDFs in `web/public/reports/` are compressed but still 7.9 MB and 5.0 MB.
- Form submissions are never deleted automatically. That is now what the privacy notice
  says (2026-09-09), rather than the 90-day promise it used to make, so this is a
  documented practice and not a gap. Deletion on request is manual, via the Studio.
- Vercel free tier allows 200,000 ISR write units/month, team-wide, and staging spent
  201,909 of them in the Aug 22 – Sep 21 2026 cycle. Cause and fix are in CLAUDE.md
  under "Vercel ISR-write limit"; the short version is that every public page had a
  60-second revalidate window and now has an hour. Worth watching Edge Requests and
  Function Invocations too — the same steady traffic feeds those meters, and ISR
  writes may simply have been the first ceiling to break.
- `docs/archive/` holds the Notion migration record. Read-only history.
