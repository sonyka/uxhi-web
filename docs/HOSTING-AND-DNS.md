# Hosting & DNS — Netlify

Reference for how this project is hosted and how the remaining domain move works.

> **Progress is not tracked here.** What is done, outstanding or awaiting a decision lives in
> the Path to Launch worklog:
> **https://claude.ai/code/artifact/f5861a52-1822-47ca-b284-a08688f1134a**
>
> This file previously carried a three-phase checklist that duplicated it, item for item, and
> drifted as a result. What remains is the mechanics.

## Where things stand

| Phase | Status |
|---|---|
| **1 — Site on Netlify** | ✅ Complete. Originally staged at `uxhi.hisony.com`, since retired; staging is Vercel only now. |
| **2 — `uxhiconference.com` live** | ✅ Complete, verified in production 2026-08-30 — the site and the `/2025` archive both load. |
| **3 — `uxhi.community` live** | ⏳ Domain not yet pointed. The runbook below is the how; the worklog tracks the when. |

## Environment variables (both hosts)

`NEXT_PUBLIC_SANITY_PROJECT_ID` · `NEXT_PUBLIC_SANITY_DATASET` · `NEXT_PUBLIC_SANITY_API_VERSION`
· `SANITY_API_READ_TOKEN` · `SANITY_REVALIDATE_SECRET` · `SLACK_WEBHOOK_URL` · Google Sheets
credentials for the membership form.

Base directory is `web` — the Next.js app is not at the repo root.

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
- **Vercel is retained for staging** (`web-henna-five-45.vercel.app`), previewing the `staging` branch. Legacy/duplicate Vercel projects (`uxhi-web`, `uxhi-website`) should be deleted — see `PROJECT-STATE.md`.
- Netlify's free tier allows commercial use (Vercel's Hobby plan does not) but is **build-credit-limited**, so production deploys are batched — see CLAUDE.md.
