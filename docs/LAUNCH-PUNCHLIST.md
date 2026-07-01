# Launch Punchlist — Note to Self

Consolidated list of everything still open before/at public launch. Pulled together from
the other docs in this folder (linked per section) plus in-progress work. Started
2026-07-01. Check items off as they land.

> **How to read this:** items are grouped by theme. Each section links to the detailed doc
> where one exists. This file is the single "what's left" index — the detailed docs hold
> the how-to.

---

## 0. Deployment reality (so nobody gets confused again)

| Thing | Where it actually lives | Notes |
|---|---|---|
| Main-site **staging** | `uxhi.hisony.com` → **Netlify** | Re-pointed to `uxhi.community` at launch |
| Main-site **staging (mirror)** | `web-henna-five-45.vercel.app` → **Vercel** project `web` | Currently tracks `main`; see infra cleanup |
| **Conference** production | `uxhiconference.com` → **Netlify** (`main`) | Frozen — Netlify credits exhausted |
| Active dev branch | `staging` | All commits go here (never push `main` w/o say-so) |

- [ ] **Delete duplicate Vercel projects** `uxhi-web` (broken 404) and `uxhi-website` (legacy),
      after confirming no custom domain is attached to either. Keep only `web`.
- [ ] **Decide `web` project's production branch** (`main` vs `staging`) and align it with how
      we want `web-henna-five-45.vercel.app` to behave.
- [ ] **Re-smoke-test the Netlify staging site** (`uxhi.hisony.com`): site loads, all 3 forms
      submit (contact, membership, directory), Sanity Studio loads at `/studio`, draft mode
      works (`/api/draft`). Left unverified during the deployment-model reconciliation —
      see [netlify-migration-plan.md](netlify-migration-plan.md) Phase 1.

---

## 1. Conference content — replace 2025 placeholders (2026)

The venue + FAQ copy was pulled from the 2025 site as placeholder. Confirm/replace for 2026:

- [ ] **Venue section** (`web/src/app/(conference)/conferences/2026/page.tsx`):
  - [ ] Refund policy date — currently "Thursday, September 25" (2025 date) in the FAQ
  - [ ] Parking details — "Lot C … entrance on Keawe Street", "no parking passes this year"
  - [ ] Confirm the Google Maps link still points to the correct 2026 venue
- [ ] **FAQ items** (`_components/FaqSection.tsx`): review all 8 for 2026 accuracy
      (attendee profile, ticket inclusions, group discounts, recordings, refunds, parking, contact).
- [ ] **Venue photo** (`assets/images/venue-entrepreneurs-sandbox.jpg`): sourced from
      `filmoffice.hawaii.gov`. **Confirm usage rights or swap for an official/UXHI photo.**
- [ ] **Co-Chairs bios** — editable in Sanity (Studio → **Conference → 2026 → Co-Chairs**).
      Names, titles, LinkedIn, and **2025 headshots** are seeded; only bios are still
      placeholder ("Full bio coming soon."). Confirm the 2026 roster + that each seeded photo
      matches the right person (photos were mapped by position from the 2025 site).

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
- [ ] **Mailchimp email sync** — wire Membership + Inquiry forms to Mailchimp.
      See **[mailchimp-integration.md](mailchimp-integration.md)**.
- [ ] **Instagram token** — expires every 60 days; refresh when the homepage feed goes blank
      (see [handoff-guide.md](handoff-guide.md)).

---

## 6. Docs to reconcile (drifted from reality)

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
