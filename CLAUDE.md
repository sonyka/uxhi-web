# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UXHI (UX Hawaii) website built with Next.js 16, Sanity.io CMS, and Tailwind CSS v4. The Next.js application lives in the `/web` subfolder.

## Commands

All commands run from the `/web` directory:

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

Sanity Studio is embedded at `/studio` route (no separate Sanity CLI needed for content editing).

## Scripts

### capture.sh - Page Screenshot Utility

Captures viewport-sized screenshots of a page, splitting a full-page capture into multiple viewport-height images. Useful for documentation, refactoring, visual regression testing, or sharing page designs.

**Requirements:** Node.js (npx), ImageMagick

```bash
# From repo root
./capture.sh [options] [url]

# Options:
#   -p, --prefix PREFIX    Output filename prefix (default: page)
#   -o, --output DIR       Output directory (default: current directory)
#   -w, --width WIDTH      Viewport width (default: 1492)
#   -h, --height HEIGHT    Viewport height (default: 824)

# Examples:
./capture.sh                                    # Captures localhost:3000 → page-00.png, page-01.png, etc.
./capture.sh /conferences/2024                  # Captures specific path
./capture.sh -p before /about                   # Creates before-00.png, before-01.png, etc.
./capture.sh -p after -o ./screenshots /page    # Output to specific directory
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS v4** using CSS-based `@theme` configuration (not tailwind.config.ts)
- **Sanity.io** as headless CMS with embedded studio
- **Framer Motion** for animations
- **Deployed on Netlify**

### Sanity Configuration
- Project ID: `evh83z0t`
- Dataset: `production`
- Config files: `sanity.config.ts`, `sanity.cli.ts`
- Environment: `src/sanity/env.ts` (has hardcoded fallbacks for build time)

### Key Directories

```
web/
├── src/
│   ├── app/
│   │   ├── (site)/          # Main site pages with shared layout
│   │   ├── studio/          # Embedded Sanity Studio
│   │   └── api/             # API routes (draft mode)
│   ├── components/
│   │   ├── blocks/          # PageBuilder component
│   │   ├── layout/          # Header, Footer
│   │   ├── sections/        # Hero, Stats, Features, Testimonials, etc.
│   │   └── ui/              # Button, Container, SanityImage
│   ├── sanity/
│   │   ├── schemaTypes/     # Sanity schemas (documents, objects, blocks)
│   │   ├── lib/             # Client, queries, image helpers
│   │   └── structure.ts     # Studio structure
│   └── lib/                 # Utilities (cn, animations)
```

### Conference Domain Routing (`uxhiconference.com`)

`uxhiconference.com` is added to the same Netlify project as the main site. Middleware in `src/middleware.ts` detects the hostname and rewrites requests transparently — the URL bar always shows `uxhiconference.com`.

| URL | Serves |
|-----|--------|
| `uxhiconference.com` | `/conference/2026/` (current year) |
| `uxhiconference.com/agenda` | `/conference/2026/agenda` |
| `uxhiconference.com/2025` | `/conference/2025/` (archive) |
| `uxhiconference.com/2025/agenda` | `/conference/2025/agenda` |

Year-prefixed paths (`/YYYY/...`) are automatically routed to the matching archive. Unprefixed paths go to the current year.

**Each new conference year:** update one line in `src/middleware.ts`:
```ts
const CURRENT_CONFERENCE_YEAR = "2027";
```
Then drop the new year's static files into `public/conferences/[year]/`.

**The URL is singular, the folder is plural — on purpose.** Public paths are
`/conference/...`, matching the "Conference" nav label. The files stay at
`public/conferences/...` because the archived 2024 and 2025 sites carry ~700
absolute `/conferences/...` references baked into frozen HTML, CSS and JS,
including paths built at runtime; rewriting those to chase a folder rename
buys nothing a visitor can see. `next.config.ts` bridges the two, and the old
plural URLs still resolve — year roots redirect, deeper paths are served,
because a redirect there would also catch `/conferences/:year/assets/...`.

### Page Builder Pattern
Pages use a block-based content model. The `PageBuilder` component (`src/components/blocks/PageBuilder.tsx`) maps Sanity block types to React section components. Block types: `heroBlock`, `statsBlock`, `featuresBlock`, `testimonialsBlock`, `teamBlock`, `ctaBlock`, `richTextBlock`.

### Styling & Design System

**Design System Reference:** http://localhost:3000/design-system

The design system page is the **single source of truth** for all styling decisions. It documents:
- **Color palette** - brand colors, semantic colors, and usage guidelines
- **Typography** - font families, sizes, weights, and text styles
- **Reusable components** - pre-built UI patterns to use instead of inline code

**Always consult the design system page first** when building UI to ensure consistency. Use existing components rather than writing inline patterns.

**CRITICAL: Top-Down UI Changes Rule**
All UI styling changes (font sizes, colors, spacing, variants, etc.) MUST be made at the shared component level, never inline at the page level. If a change is needed, modify the reusable component's props, variants, or defaults — not the consuming page. This ensures consistency across all instances and keeps the design system as the single source of truth.

**CRITICAL: Design System Sync Rule**
Whenever a UI component's styling, props, or behavior is changed, the design system page (`src/app/(site)/design-system/page.tsx`) **MUST be updated in the same changeset** to reflect those changes. The design system is the single source of truth — it must never go stale. This includes: color changes, new variants, removed variants, renamed props, and any visual modifications to existing components.

Quick reference (see design system for full details):
- Primary: teal (`--color-teal-90: #09C0D7`)
- Secondary: purple (`--color-purple-140: #231769`)
- Background: beige (`--color-beige-30: #F4F1EA`) — every page and section ground; white is for cards and surfaces sitting on it
- Fonts: Dela Gothic One (display), Nunito (body)

**Conference site design — every year is a full redesign.** 2024, 2025 and 2026 share no
layout, type or mood, and future years will keep diverging. The parent token system is the
only thing that carries across. So:

- Each year owns `conferences/<year>/theme.ts` (font, type roles, year-specific tokens),
  its own `layout.tsx` and its own `_components/`. **Years share no code with each other.**
- The cross-year `(conference)/` level holds only design-free things (analytics, routing).
  Anything visual placed there becomes a constraint on every future year.
- **Never restate a parent value as a raw hex literal** — alias the token instead, so the
  year keeps tracking the parent palette. This is enforced by ESLint for `app/(conference)/**`.
- Type sizes belong to named roles in the year's `theme.ts`, and a role owns a full
  *responsive ramp* — never flatten one to a single value.

Full audit, principles and history: [docs/CONFERENCE-DESIGN-SYSTEM.md](docs/CONFERENCE-DESIGN-SYSTEM.md).

**Available Components:**

| Component | Path | Use Case |
|-----------|------|----------|
| `Navbar` | `components/layout/Navbar.tsx` | Desktop navigation with dropdowns (used in Header) |
| `MobileNavbar` | `components/layout/Navbar.tsx` | Collapsible mobile nav with accordion dropdowns |
| `HamburgerButton` | `components/layout/Navbar.tsx` | Animated hamburger menu toggle button |
| `Footer` | `components/layout/Footer.tsx` | Site footer with headline, logo, 4-column nav grid |
| `Container` | `components/ui/Container.tsx` | Responsive max-width wrapper (default/narrow/wide) |
| `SanityImage` | `components/ui/SanityImage.tsx` | Next.js Image wrapper for Sanity CMS assets with LQIP |
| `QuickLinkPill` | `components/ui/QuickLinkPill.tsx` | Pill with icon, label, subtitle for hero sections |
| `LinkCard` | `components/ui/LinkCard.tsx` | Beige card with title, teal description, external link icon |
| `InfoBox` | `components/ui/InfoBox.tsx` | Teal-50 callout box for notes and CTAs |
| `PressMention` | `components/ui/PressMention.tsx` | Press/media callout with source eyebrow, title, and CTA |
| `ArrowLinkButton` | `components/ui/ArrowLinkButton.tsx` | Text link with arrow for dark backgrounds |
| `BulletPoint` | `components/ui/BulletPoint.tsx` | Styled bullet dot (teal on light, yellow on dark bg) |
| `MobileTooltip` | `components/ui/MobileTooltip.tsx` | Tap-to-reveal tooltip (mobile), hover (desktop) |
| `MissionStatement` | `components/ui/MissionStatement.tsx` | UXHI's mission sentence with tooltips; shared by home and /about |
| `PrincipleList` | `components/ui/PrincipleList.tsx` | Named ideas with short definitions, as a description list (no icons) |
| `SectionEyebrow` | `components/ui/SectionEyebrow.tsx` | Uppercase subsection label (20px, bold, purple-120) |
| `SectionHeading` | `components/ui/SectionHeading.tsx` | Display heading with size/color variants (display/hero/xl/lg/md/sm) |
| `SectionIcon` | `components/ui/SectionIcon.tsx` | Large centered icon (128px) for section intros |
| `SectionLead` | `components/ui/SectionLead.tsx` | Supporting paragraph beneath a heading (hero/md sizes) |
| `HeroContent` | `components/ui/HeroContent.tsx` | Left-side content wrapper for interior page heroes |
| `HeroSection` | `components/ui/HeroSection.tsx` | Interior hero wrapper; caps at 1400px so text and art stay together above that |
| `LogoImage` | `components/ui/LogoImage.tsx` | Grayscale logo with hover color reveal (partner/sponsor grids) |
| `SpotIllustrationCard` | `components/ui/cards/SpotIllustrationCard.tsx` | Large icon card (dark/beige/white variants) |
| `FormLabel` | `components/ui/form-elements/FormLabel.tsx` | Shared form label; supports `as="legend"` for fieldsets |
| `FormInput` | `components/ui/form-elements/FormInput.tsx` | Glassmorphic text input for purple form backgrounds |
| `FormTextarea` | `components/ui/form-elements/FormTextarea.tsx` | Glassmorphic textarea with vertical resize |
| `FormRadio` | `components/ui/form-elements/FormRadio.tsx` | Custom radio with teal fill + white inner dot |
| `FormCheckbox` | `components/ui/form-elements/FormCheckbox.tsx` | Custom checkbox with teal fill + SVG checkmark |
| `FormSelect` | `components/ui/form-elements/FormSelect.tsx` | Custom dropdown with purple panel + hidden input |
| `FormFileUpload` | `components/ui/form-elements/FormFileUpload.tsx` | Styled file upload with optional circular preview |
| `FormSubmitButton` | `components/ui/form-elements/FormSubmitButton.tsx` | Pill button with icon circle (send or arrow variant) |
| `InquiryForm` | `components/forms/InquiryForm.tsx` | Contact form for /about#contact (purple bg, saves to Sanity + Slack) |
| `MembershipForm` | `components/forms/MembershipForm.tsx` | Membership application for /join (purple bg, Google Sheet + Slack) |
| `DirectorySubmitForm` | `components/forms/DirectorySubmitForm.tsx` | Directory submission for /directory (purple bg, Sanity draft + Slack) |
| `FormAlert` | `components/ui/FormFeedback.tsx` | Error/info banner for forms (error or info variant) |
| `FieldError` | `components/ui/FormFeedback.tsx` | Field-level validation message (yellow text below inputs) |
| `FormSuccess` | `components/ui/FormFeedback.tsx` | Post-submission success card (icon, title, message) |
| `TextSlideUp` | `components/ui/TextSlideUp.tsx` | Text slide-up hover animation (used in Navbar, PrimaryCTA) |

### Data Fetching
Uses `next-sanity` with:
- `sanityFetch` from `src/sanity/lib/live.ts` for server components
- GROQ queries defined in `src/sanity/lib/queries.ts`
- `defineLive` imported from `next-sanity/live` (not main export)

## Deployment

**Production = Netlify. Staging = Vercel.** These roles are deliberate:

- **Netlify serves the real, public site** — `uxhiconference.com` today, and `uxhi.community`
  at launch. Netlify's free tier permits commercial use but has a **limited build-credit
  budget** (see below), so **deploy to production conservatively** — batch changes and deploy
  only when actually shipping.
- **Vercel serves staging only** (`web-henna-five-45.vercel.app`), for previewing the `staging`
  branch. We deliberately do **not** run the live site on Vercel: its Hobby (free) plan carries
  a **fair-use / non-commercial clause**, and UXHI (a community org that may add paid features)
  decided not to move production to Vercel.

### Branch strategy

| Branch | Host | URL | Purpose |
|---|---|---|---|
| `staging` | Vercel (staging preview) | `web-henna-five-45.vercel.app` | Active development; share with stakeholders for review |
| `main` | Netlify (production) | `uxhiconference.com` (+ `uxhi.community` at launch) | Live public site; credit-limited — deploy only when shipping |

**⛔ NEVER push to `main` unless the user explicitly says to ship / deploy to production.**
Every push to `main` triggers a Netlify production build and consumes limited credits.

**⛔ Do not raise it either.** Until `uxhi.community` is pointed at Netlify, the only
reason to push `main` is a conference change. Do not ask, suggest, hint, or report
"production is N commits behind" as though it needs action — being behind is the
intended state, not a backlog. Sony will say when. Treat an unprompted nudge toward a
production deploy as a rule violation, not a helpful reminder.

> Note on what "production" means here: `main` is already publicly served on Netlify's
> default domain (`splendid-entremet-f6cb1d.netlify.app`), so the whole main site is
> live there — `uxhiconference.com` only 404s on non-conference paths because the
> middleware rewrites by hostname. Pointing `uxhi.community` gives the main site a
> findable address; it does not make it public for the first time.

**All work goes directly on `staging`:**
```bash
git checkout staging
git add ... && git commit -m "..."
git push origin staging        # Vercel deploys the staging preview — done.
```

**Only when the user explicitly authorises a production deploy:**
```bash
git checkout main && git merge staging && git push origin main   # Netlify builds production
git checkout staging           # immediately return to staging
```

**Rules — always follow:**
- `staging` is the active branch. All commits go here. Never develop directly on `main`.
- Share `web-henna-five-45.vercel.app` with stakeholders for review.
- Treat every `main` deploy as spending credits — bundle changes, don't deploy piecemeal.

### Vercel (staging) setup

- **Repo:** `uxhi-web`, branch: `staging` · **Root directory:** `web` ← critical, the Next.js app is not at repo root
- **Framework:** Next.js (auto-detected via `web/vercel.json`)
- **Env vars:** `NEXT_PUBLIC_SANITY_PROJECT_ID=evh83z0t`, `NEXT_PUBLIC_SANITY_DATASET=production`

`web/vercel.json` contains `{ "framework": "nextjs" }` for proper detection. Environment variables have hardcoded fallbacks in `src/sanity/env.ts` so builds work even without env vars set.

> The `web` project (→ `web-henna-five-45.vercel.app`) is the canonical staging project.
> The duplicate/legacy Vercel projects (`uxhi-web`, `uxhi-website`) that once caused
> confusion were deleted in Sept 2026. The Vercel team now holds three unrelated
> projects — `web`, `my-gym`, `808list` — which matters because the free-tier storage
> ceiling below is team-wide, not per project.

### ⚠️ Netlify credit limit (production)

Netlify free tier = **300 credits/month**, ~15 per production build = **~20 deploys/month max**. Builds are silently paused when exhausted — this is why production deploys must be conservative.

If builds are paused: Netlify dashboard → Billing → buy credits or upgrade to Pro ($20/month, 3,000 credits).

### ⚠️ Vercel ISR-write limit (staging)

Vercel free tier = **200,000 ISR writes/month**, team-wide. Exceed it and projects
are **automatically paused** — there is no on-demand overage on the free plan.
We intend to stay on the free plan, so this is a hard ceiling, not a budget.

An ISR write is not a page view. It is a page **re-save**: when a page's
`revalidate` window expires and a request arrives, Next re-renders it and writes
a new cached copy. So the meter is driven by how often a page is *allowed* to
re-save, and by how many pages do it — never by visitor numbers. One request per
page per minute reaches the ceiling, and nothing requires that request to be a
person: bots ignore the staging `Disallow: /`, and `robots.ts` admits Claude's
agents on purpose so the team can review staging from claude.ai.

This bit us in Sept 2026. Every public page inherited a 60-second window from one
default in `src/sanity/lib/fetchCached.ts` — a fetch-level `revalidate`
propagates to the whole page segment — giving seven ISR pages a ceiling of ~302k
writes/month. Staging used 100% of the allowance. The window is now **one hour**
(~5k/month, ~2.5% of the allowance).

**So: treat that default as a budget, not a preference.** Lowering it, or adding
ISR pages, multiplies writes by 1,440/revalidate-seconds per page per day. If
content ever needs to be live faster than the window, the answer is a Sanity
webhook → `revalidateTag`, which makes publishes instant *and* drops periodic
writes to zero — not a shorter timer.

Deploy count is negligible by comparison: ~300 staging deploys/month cost ~2,100
writes. Push to staging freely; a deploy also clears the cache, so it is the
quickest way to make a CMS edit appear before the hour is up.

### ⚠️ Vercel deployment-storage limit (staging)

Vercel free tier = **10 GB of deployment storage**, team-wide across all three
projects on the account (`web`, `my-gym`, `808list`). Unlike the ISR meter above,
this is a **standing total, not a monthly flow** — the sum of every artifact
Vercel still retains. It does not reset on the 1st.

**Retention is already at the floor; there is nothing to switch on.** Hobby
defaults to 30 days for canceled, errored, pre-production *and* production
deployments. On **16 Sept 2026** Vercel tightened this further: a Hobby project
now keeps only its 3 most recent production deployments plus its 3 most recent
of any type, preview deployments lost their former protection, and a team over
10 GB has everything outside those exceptions deleted *immediately* rather than
after 30 days. We hit 100% about a week after that change landed.

So the platform is already pruning on our behalf, and **cutting staging push
frequency is not the lever** — under the new rules only a handful of deployments
survive per project regardless of how many we create. Push to staging freely;
the advice under the ISR limit still stands.

The lever that remains is **per-deployment output size**. To see the real
numbers, open a preview deployment → **Resources** → Static Assets / Functions;
the Usage page only breaks down by project, never by file.

Measure build output with the repo clean, not by `du` on a synced working copy:
iCloud silently makes numbered duplicates (`chunk 2.js`, `routes.d 3.ts`) that
inflate `.next` several-fold and produce phantom `tsc` errors. Real output as of
Sept 2026 is ~12 MB `.next/static` plus ~37 MB `public`. The two report PDFs
that used to lead that list — larger than any chunk of the application — now
live on the Sanity CDN; see `src/lib/reports.ts`.

The largest single remaining chunk is ~4.25 MB of embedded **Sanity Studio**
(`/studio`). Leave it: dropping it from staging would cost content editing and
draft preview there, for a third of what the PDFs saved.

Do **not** `.vercelignore` the frozen conference archives (`public/conferences/`
`2024` and `2025`, ~22 MB) to save space. The 2026 site's nav links straight into
them, and 2026 is what stakeholders review on staging. (They do contain one
genuine duplication — the same 1.18 MB `8090a1a22fff.woff` under both years —
but chasing paths inside frozen archives buys nothing a visitor sees.)

**A deployment is always the whole app.** One Next project builds one
self-contained snapshot; there is no way to deploy only `/conference/2026` while
working on it, and splitting the conference into its own Vercel project would
*raise* storage, since the per-project retention floor is 3 deployments. The
number of retained snapshots is capped either way — so total output size is what
matters, and commit frequency is not.

If the number does not fall within a few days of going over, it is likely
orphaned storage from already-deleted deployments — a known Hobby accounting
issue with several reports on community.vercel.com. That one needs Vercel
support; no repo change will fix it.

Custom retention, if ever needed, is per project at **Settings → Security →
Deployment Retention Policy** (not a top-level page, and unrelated to *Deployment
Protection*, which is access control — leave `web` unprotected so stakeholders
can open the staging URL without a Vercel login).
