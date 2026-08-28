# Launch Punchlist — Note to Self

Consolidated list of everything still open before/at public launch. Pulled together from
the other docs in this folder (linked per section) plus in-progress work. Started
2026-07-01. Check items off as they land.

> **How to read this:** items are grouped by theme. Each section links to the detailed doc
> where one exists. This file is the single "what's left" index — the detailed docs hold
> the how-to.

---

## 0. Deployment reality (so nobody gets confused again)

**Domain plan (confirmed 2026-08-28):**

| Thing | Where it lives | Notes |
|---|---|---|
| **Staging — everything** | `web-henna-five-45.vercel.app` → **Vercel** (`staging` branch) | The only staging URL. Share this for review. |
| **Conference production** | `uxhiconference.com` → **Netlify** (`main`) | Conference only, permanently. Serves the current year at `/`, archives at `/YYYY`. |
| **Main site production** | `uxhi.community` → **Netlify** (`main`) | Everything non-conference. **Not yet live** — pointed at launch. |
| Active dev branch | `staging` | All commits go here (never push `main` w/o say-so) |

> ⚠️ **`uxhi.hisony.com` is retired.** It no longer resolves (DNS failure). It used to be the
> Netlify staging domain; staging is now Vercel only. Do not re-add it.

- [x] **Vercel cleanup done** (2026-08-28). `uxhi-web` deleted — it had no custom domain, only
      its default `.vercel.app`. `uxhi-website` was already gone. Team-wide, the only custom
      domain on Vercel is `hisony.com` (unrelated `my-gym` / `808list` projects), so nothing was
      at risk. **Remaining Vercel projects: `web`, `my-gym`, `808list`.**
- [x] **Production branch already correct** — the `web` project already tracks `staging`
      ("every commit pushed to `staging` creates a Production Deployment"), serving
      `web-henna-five-45.vercel.app`. The earlier note that it tracked `main` was stale.
- [x] ~~Re-smoke-test the Netlify staging site (`uxhi.hisony.com`)~~ — **obsolete**, that domain
      is retired. Staging smoke-testing happens on the Vercel URL.

> Note: the `web` project's Framework Preset shows **"Other"** rather than Next.js, and Vercel
> flags that the current Production deployment's config differs from Project Settings. Builds
> work (root directory `web` is correct, and `web/vercel.json` declares the framework), so this
> is cosmetic — but worth a look if build behaviour ever gets strange.

---

## 1. Conference content (2026) — ✅ signed off

**Confirmed good as-is on 2026-08-28. No further changes.** The venue copy, FAQ items, venue
photo and Co-Chair bios were reviewed and accepted in their current state. Kept here as a record
of what was deliberately *not* changed, in case it comes up again:

- Venue section refund date, parking details and Google Maps link — accepted as-is.
- All 8 FAQ items — accepted as-is.
- Venue photo (`assets/images/venue-entrepreneurs-sandbox.jpg`, sourced from
  `filmoffice.hawaii.gov`) — accepted; usage rights not formally confirmed.
- Co-Chairs bios in Sanity — placeholder bios accepted for now.

---

## 2. Google Analytics — launch follow-ups

See **[GOOGLE_ANALYTICS.md](GOOGLE_ANALYTICS.md)**. Tags are shipped; remaining items:

- [ ] **Conference tag only reports from staging until `main` is deployed to Netlify.** To
      capture real `uxhiconference.com` traffic, deploy `main` on Netlify (costs credits).
- [ ] **Community tag activates automatically** when the Netlify site is pointed to
      `uxhi.community`. If the launch domain differs, update `productionHost` in `(site)/layout.tsx`.
- [ ] **(Optional) Gate the conference tag** to `uxhiconference.com` once verified, to keep
      staging traffic out of that property too.
- [ ] **(Optional) Cookie/consent banner** — not added. Decide if needed (would use GA consent mode).
- [ ] Verify `G-CT4QB1KDE2` (conference) shows in GA Realtime from the staging deploy.

---

## 3. Main site launch → `uxhi.community`

See **[netlify-migration-plan.md](netlify-migration-plan.md) Phase 3.** Open items:

- [ ] Finalize + sign off on all page content in Sanity Studio.
- [ ] Add `uxhi.community` as a custom domain on the Netlify project.
- [ ] Point `uxhi.community` DNS (SiteGround) → Netlify; wait for propagation.
- [ ] Verify the new site is live at `uxhi.community`; keep old SiteGround site as fallback for a few weeks.

---

## 4. Conference launch → `uxhiconference.com`

See **[netlify-migration-plan.md](netlify-migration-plan.md) Phase 2.** Mostly done — verify:

- [ ] Confirm `uxhiconference.com` and its subpages load the 2026 conference correctly in production.
- [ ] Confirm `/2025` archive routing still works.

---

## 5. Pending features / decisions

- [ ] **Merch payments (`/merch`)** — currently "Coming soon". Choose an approach and build.
      See **[stripe-payment-options.md](stripe-payment-options.md)** (Payment Links vs Checkout).
- [ ] ⏸️ **Mailchimp email sync — ON HOLD** (2026-08-28). Plan is written and ready to build
      whenever it is picked back up; forms currently write to Sanity + Slack only.
      See **[mailchimp-integration.md](mailchimp-integration.md)**.
- [ ] **Instagram token** — expires every 60 days; refresh when the homepage feed goes blank
      (see [handoff-guide.md](handoff-guide.md)).
- [ ] **Conference design system** — formalise `app/(conference)/` as a theme layer inheriting
      the parent palette (79% of its hardcoded hexes are already parent tokens; 125 ad-hoc type
      sizes need a real scale). Phased plan, non-blocking for launch, but Phase 4 should land
      **before** 2027 work starts so the next year is a skin and not a fork.
      See **[CONFERENCE-DESIGN-SYSTEM.md](CONFERENCE-DESIGN-SYSTEM.md)**.

---

## 6. Member directory — Notion → Sanity migration

See **[notion-directory-migration.md](notion-directory-migration.md)** and
**[notion-directory-taxonomy.md](notion-directory-taxonomy.md)**.
**Notion is the source of truth** — Sanity mirrors it, member data included, so the import is a
full replace rather than a merge.

Done:

- [x] **Purge test records** — 2026-08-27, 11 deleted via
      `web/scripts/purge-directory-tests.mjs --commit`. Backup of all 17 pre-purge docs at
      `~/Documents/FREELANCE/UXHI/directory-backup-2026-08-27.json` (outside the repo, PII).
- [x] **Extract the Notion data** — 2026-08-27 via Notion's public `api/v3` endpoints. All
      **63 members** pulled; no export or credentials needed, repeatable on demand. Raw at
      `~/Documents/FREELANCE/UXHI/notion-directory-raw-2026-08-27.json` (outside the repo, PII).
      Headshots confirmed downloadable via Notion's image proxy (60/63 have one).
- [x] **Taxonomy decided** — widen Focus 15→18 and Industry 16→26 to match Notion. Verified
      against all 63 records: **zero unmapped values**. Notion's full wholesale lists
      (43 industries / 26 focuses, including unused ones) archived for later.

- [x] **Imported + published** — 2026-08-28. All 63 Notion members live on staging
      (`Showing 63 of 63 members`); island filter verified. The 6 pre-migration records
      (4 placeholders + 2 legacy profiles) are deleted. Dataset holds exactly the 63 Notion rows.

Open — **all work stays on `staging`; `uxhi.community` is not ready for this yet**:

- [ ] **Member data questions** — per-person issues to fix *in Notion*, then re-sync. 3 members
      have no headshot, Trevor Husseini has no focus tags, 26 of 63 have no job title, and
      Peggy Seymour's island looks wrong (Big Island vs Kāʻanapali/Maui). Full list in
      [notion-directory-migration.md](notion-directory-migration.md) §4.
- [ ] **Consent check** — 63 real people's names, photos and LinkedIn profiles are now on a new
      public home. Confirm the original Notion submission covers that.
- [ ] **Decide: retire Notion, or keep it as the editing surface** with periodic re-syncs?
      The importer is idempotent, so recurring sync is supported either way.
- [ ] *(housekeeping)* Orphaned image assets from the purge + pre-migration deletions.

🚨 **Launch gate (parked until the domain is ready):** re-check before pointing
`uxhi.community` that `*[_type=="directoryMember" && name match "Placeholder*"]` returns zero.
It does today — the gate exists in case placeholders are ever re-seeded for staging.

Full detail: **[notion-directory-migration.md](notion-directory-migration.md)** — open items
are at the top of that doc.

---

## 7. Docs to reconcile (drifted from reality)

- [x] **CLAUDE.md** deployment section — now documents Netlify = production / Vercel = staging,
      the credit-limited batching, and the duplicate-project cleanup note.
- [x] **[handoff-guide.md](handoff-guide.md)** — updated to the Netlify + `staging`-branch workflow.
- [x] **[netlify-migration-plan.md](netlify-migration-plan.md)** — context reframed (Netlify prod /
      Vercel staging), Phase 1 marked complete, Phase 2 status added.

---

## Done recently (for context)

- ✅ Conference: FAQ section, Entrepreneurs Sandbox venue section (photo + linked map).
- ✅ All conference contact emails unified to `uxhiconference@gmail.com`.
- ✅ GA4 wired: conference (`G-CT4QB1KDE2`, un-gated) + community (`G-DMCWLCQD08`, gated to `uxhi.community`).
- ✅ Chrome right-gutter fix (`w-screen` → `w-full`).
