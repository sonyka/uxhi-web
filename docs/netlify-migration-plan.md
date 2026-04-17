# Netlify Migration & Conference Launch Plan

## Context

- Current host: **Vercel** (Hobby plan — non-commercial use only; UXHI may eventually have paid features)
- Target host: **Netlify** (free tier, commercial use allowed)
- Staging domain: `uxhi.hisony.com`
- Production domain: `uxhi.community` (currently on SiteGround, pointing to old site)
- Conference domain: `uxhiconference.com` (new; will serve `/conferences/2026/` via URL masking)

Phases 1 and 2 are independent of Phase 3. The conference site can go live as soon as Netlify is set up, without waiting for the main site content to be finalized.

---

## Phase 1 — Migrate Vercel → Netlify

### Code (developer) ✓
- [x] Create `netlify.toml` — base directory (`web`), build command, per-context env vars for Sanity visual editing
- [x] Updated `src/sanity/lib/client.ts` — stega overlays now activate on both Vercel previews and Netlify deploy previews

### Dashboard (you)
- [ ] Create a Netlify account at netlify.com
- [ ] Import the GitHub repo; set base directory to `web`
- [ ] Add environment variables:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`
  - `SANITY_API_READ_TOKEN`
  - `SANITY_REVALIDATE_SECRET`
  - `SLACK_WEBHOOK_URL`
  - Any Google Sheets credentials used by the membership form
- [ ] Add `uxhi.hisony.com` as a custom domain on the Netlify project
- [ ] Update `uxhi.hisony.com` DNS at the registrar to point to Netlify (replaces Vercel)
- [ ] Smoke-test staging once DNS propagates:
  - Site loads
  - Forms submit (contact, membership, directory)
  - Sanity Studio loads at `/studio`
  - Draft mode works (`/api/draft`)

---

## Phase 2 — Launch `uxhiconference.com`

### Content (you)
- [ ] Provide 2026 conference static site files → place in `web/public/conferences/2026/`

### Code (developer)
- [ ] Verify rewrites and middleware handle all 2026 subpages correctly

### Dashboard (you)
- [ ] Add `uxhiconference.com` as a custom domain on the Netlify project
- [ ] At domain registrar: point `uxhiconference.com` DNS to Netlify (they provide the values)
- [ ] Wait for DNS propagation (1–48 hrs)
- [ ] Verify: `uxhiconference.com` loads the 2026 conference, `uxhiconference.com/agenda` (or relevant subpages) load correctly

### How the domain masking works
`uxhiconference.com` is added to the same Netlify project as the main site. Next.js middleware detects the hostname and transparently rewrites requests — the URL bar always shows `uxhiconference.com`.

| URL | Serves |
|-----|--------|
| `uxhiconference.com` | `/conferences/2026/` (current year) |
| `uxhiconference.com/agenda` | `/conferences/2026/agenda` |
| `uxhiconference.com/2025` | `/conferences/2025/` (archive) |
| `uxhiconference.com/2025/agenda` | `/conferences/2025/agenda` |

Year-prefixed paths are automatically routed to the matching archive. Unprefixed paths go to the current year.

### Each new conference year
One line to update in `src/middleware.ts`:
```ts
const CURRENT_CONFERENCE_YEAR = "2027";
```
Then drop the new year's static site into `public/conferences/[year]/`.

---

## Phase 3 — Launch `uxhi.community` (when content is ready)

### Content (you + stakeholders)
- [ ] Finalize all page content in Sanity Studio
- [ ] Review and sign off on each page

### Dashboard (you)
- [ ] Add `uxhi.community` as a custom domain on the Netlify project
- [ ] At SiteGround (or wherever the domain DNS is managed): point `uxhi.community` to Netlify
- [ ] Wait for DNS propagation
- [ ] Verify the new Next.js site is live at `uxhi.community`
- [ ] Keep the old SiteGround site intact for a few weeks as a fallback before decommissioning

---

## Notes

- **Do not set up `uxhiconference.com` on Vercel** — doing so before the Netlify migration would mean two DNS propagation waits. Set it up once, on Netlify.
- The Vercel project can remain idle after migration (no need to delete it immediately).
- Netlify's free tier allows commercial use; Vercel's Hobby plan does not.
