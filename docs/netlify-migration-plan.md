# Netlify Migration & Conference Launch Plan

## Context

**Final hosting model: Netlify = production, Vercel = staging (preview only).**

- **Production → Netlify** (free tier, commercial use allowed). Serves `uxhiconference.com` now and `uxhi.community` at launch. Build credits are limited, so production deploys are batched.
- **Staging → Vercel** (Hobby) at `web-henna-five-45.vercel.app`, previewing the `staging` branch. Kept for review only — **not** used for production, because Hobby's non-commercial / fair-use clause doesn't fit UXHI (which may add paid features).
- Staging: `web-henna-five-45.vercel.app` (Vercel) — the only staging URL
- Production domain: `uxhi.community` (currently on SiteGround, pointing to old site)
- Conference domain: `uxhiconference.com` (serves `/conferences/2026/` via URL masking)

> ⚠️ **Historical note (2026-08-28):** `uxhi.hisony.com` appears below as the Phase 1 staging
> domain. **It has since been retired and no longer resolves.** Those Phase 1 entries are a
> record of what was done at the time — do not treat them as current instructions. Staging is
> Vercel only; `uxhiconference.com` is conference-only; `uxhi.community` will serve the rest.

Phases 1 and 2 are independent of Phase 3. The conference site can go live as soon as Netlify is set up, without waiting for the main site content to be finalized.

---

## Phase 1 — Stand up the site on Netlify (staging)

**Status: complete** — was live at `uxhi.hisony.com` (since retired, see note above).

### Code (developer) ✓
- [x] Create `netlify.toml` — base directory (`web`), build command, per-context env vars for Sanity visual editing
- [x] Updated `src/sanity/lib/client.ts` — stega overlays now activate on both Vercel previews and Netlify deploy previews

### Dashboard (you)
- [x] Create a Netlify account at netlify.com
- [x] Import the GitHub repo; set base directory to `web`
- [x] Add environment variables:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`
  - `SANITY_API_READ_TOKEN`
  - `SANITY_REVALIDATE_SECRET`
  - `SLACK_WEBHOOK_URL`
  - Any Google Sheets credentials used by the membership form
- [x] Add `uxhi.hisony.com` as a custom domain on the Netlify project
- [x] Update `uxhi.hisony.com` DNS at the registrar to point to Netlify
- [ ] Re-smoke-test staging (worth reconfirming):
  - Site loads
  - Forms submit (contact, membership, directory)
  - Sanity Studio loads at `/studio`
  - Draft mode works (`/api/draft`)

---

## Phase 2 — Launch `uxhiconference.com`

**Status: verify** — confirm `uxhiconference.com` loads the 2026 conference in production.
(Note: the 2026 conference is now a **coded Next.js page** under `(conference)/conferences/2026/`,
not dropped-in static files — the static-files step below applied to earlier archive years.)

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
- [ ] At SiteGround: change the two web records only — see the runbook below
- [ ] Wait for DNS propagation
- [ ] Verify the new Next.js site is live at `uxhi.community`
- [ ] Keep the old SiteGround site intact for a few weeks as a fallback before decommissioning

---

### DNS runbook — pointing `uxhi.community` at Netlify

> ⛔ **Do not copy how `uxhiconference.com` was set up.** That domain delegates its
> nameservers to Netlify DNS (`nsone.net`), which was safe because it carries **no MX
> records**. `uxhi.community` does:
>
> ```
> MX  10  mx10.antispam.mailspamprotection.com
> MX  20  mx20.antispam.mailspamprotection.com
> MX  30  mx30.antispam.mailspamprotection.com
> TXT     v=spf1 +a +mx +a:us200.siteground.us … ~all
> ```
>
> **Email is live on this domain.** Delegating the nameservers moves all DNS authority to
> Netlify and those records do not come with it — mail bounces until each one is recreated
> there. Use external DNS instead: SiteGround stays the DNS host, and only the web records
> change.

**1 — The day before: lower the TTL.** The apex `A` record sits on a ~4 hour TTL. Drop it to
**300 seconds** at SiteGround first. This is what makes a rollback fast.

**2 — In Netlify.** Domain management → Add a domain → `uxhi.community`. Netlify adds `www`
automatically and then shows the exact records it wants. **Prefer what the dashboard shows
over the values below** if they ever differ.

**3 — In SiteGround's DNS editor, change two records:**

| Record | Currently | Change to |
|---|---|---|
| `@` (apex) | `A → 34.174.88.19` | `ALIAS`/`ANAME` → `apex-loadbalancer.netlify.com` if SiteGround supports it, otherwise `A → 75.2.60.5` |
| `www` | `CNAME → uxhi.community` | `CNAME → splendid-entremet-f6cb1d.netlify.app` |

**Leave the three `MX` records and the SPF `TXT` record untouched.** They are email, not web.

**4 — Wait.** Typically 15–60 minutes with a low TTL; up to 24 hours worst case. Check with
`dig +short uxhi.community` — the new value appearing means it has flipped.

**5 — SSL provisions itself.** Netlify issues a Let's Encrypt certificate once DNS resolves to
them. It may briefly show an error first; that is normal, not a failure.

**Rollback:** set the apex `A` record back to `34.174.88.19`. Pointing DNS away does not delete
the SiteGround site — it stays at that IP, which is the fallback this phase already calls for.

#### Two decisions to make first

- **Apex or `www` as canonical?** Netlify notes an apex domain on external DNS cannot use their
  direct CDN routing, so `www.uxhi.community` would be marginally faster. But
  `uxhiconference.com` uses the bare apex, so the apex is more consistent. The difference is
  small; recommendation is to keep the apex.
- **If `www` becomes canonical**, add `https://www.uxhi.community` to the Sanity CORS allowlist —
  it currently holds only the apex, so live content updates would break on `www`. The robots
  rules (`src/app/robots.ts`) and the GA gating already handle both forms.

*Values above verified against live DNS and Netlify's external-DNS documentation on 2026-08-30.*

---

## Notes

- **All production domains live on Netlify** — set them up once there, not on Vercel.
- **Vercel is retained for staging** (`web-henna-five-45.vercel.app`), previewing the `staging` branch. Legacy/duplicate Vercel projects (`uxhi-web`, `uxhi-website`) should be deleted — see `LAUNCH-PUNCHLIST.md`.
- Netlify's free tier allows commercial use (Vercel's Hobby plan does not) but is **build-credit-limited**, so production deploys are batched — see CLAUDE.md.
