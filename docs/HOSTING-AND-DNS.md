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

The full ordered procedure. Steps 1–9 are meant to be worked top to bottom; nothing here
needs a deploy, because the code is already on production. Whoever runs it needs login
access to both the SiteGround DNS editor and the Netlify dashboard.

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
> there. Use external DNS instead: SiteGround stays the DNS host, and only the two web
> records change. When Netlify offers to manage DNS or set nameservers, decline it.

#### Decide first — apex or `www` as canonical?

Netlify notes an apex domain on external DNS cannot use their direct CDN routing, so
`www.uxhi.community` would be marginally faster. But `uxhiconference.com` uses the bare apex,
so the apex is more consistent. The difference is small; **recommendation is to keep the apex**.

**If `www` becomes canonical instead**, add `https://www.uxhi.community` to the Sanity CORS
allowlist — it currently holds only the apex, so live content updates would break on `www`.
The robots rules (`src/app/robots.ts`) and the GA gating already handle both forms.

#### 1 — The day before: lower the TTL

At SiteGround, change the apex `A` record's TTL from **14400** (4 hours) to **300**.

A TTL change only takes effect once the *old* TTL has expired, so this must be done at least
four hours — realistically the day before — ahead of the switch. This is what makes the
rollback in step 9 fast.

#### 2 — In Netlify: add the domain

Domain management → **Add a domain** → `uxhi.community`. Netlify adds `www` automatically and
then shows the exact records it wants. **Prefer what the dashboard shows over the values
below** if they ever differ. Choose the external-DNS path.

#### 3 — In SiteGround's DNS editor, change exactly two records

| Record | Currently | Change to |
|---|---|---|
| `@` (apex) | `A → 34.174.88.19` | `ALIAS`/`ANAME` → `apex-loadbalancer.netlify.com` if SiteGround supports it, otherwise `A → 75.2.60.5` |
| `www` | `CNAME → uxhi.community` | `CNAME → splendid-entremet-f6cb1d.netlify.app` |

**Leave the three `MX` records and the SPF `TXT` record untouched.** They are email, not web.

#### 4 — Wait, then verify propagation

Typically 15–60 minutes with the low TTL; up to 24 hours worst case.

```bash
dig +short uxhi.community
dig +short www.uxhi.community
```

The new value appearing means it has flipped. Anything still answering `34.174.88.19` has not.

#### 5 — SSL provisions itself

Netlify issues a Let's Encrypt certificate once DNS resolves to them. If it has not within a
few minutes: Domain management → HTTPS → **Verify DNS configuration**, then **Provision
certificate**. A brief error state first is normal, not a failure.

#### 6 — Verify the site

Load `https://uxhi.community` and walk: homepage, `/about`, `/find-ux-pro` (all 63 members,
filters working), `/resources` (both PDFs download), `/join` and the contact form. Confirm
`www` redirects to the canonical form chosen above.

Then smoke-test `uxhiconference.com` and its `/2025` archive — it shares this Netlify project
and `src/middleware.ts` routes by hostname. `uxhi.community` is not in `CONFERENCE_HOSTS`, so
it falls through to the main site correctly, but the pair is worth one look together.

#### 7 — Analytics needs no configuration

GA4 (`G-DMCWLCQD08`) is gated to exactly this hostname and its `www` variant, so it arms
itself the moment the domain resolves. Confirm a hit lands in the property's realtime view.

#### 8 — Keep the SiteGround site as the fallback

Do not cancel SiteGround hosting. Pointing DNS away does not delete that site — it stays at
`34.174.88.19` and remains the rollback target. Keep it for a few weeks.

#### 9 — Afterwards

Once it has been stable a week or so, raise the apex TTL back from 300 to 14400.

**Rollback at any point:** set the apex `A` back to `34.174.88.19` and `www` back to
`CNAME → uxhi.community`. At TTL 300 that takes effect in about five minutes.

*Record values above verified against live DNS and Netlify's external-DNS documentation on
2026-08-30.*

---

## Notes

- **All production domains live on Netlify** — set them up once there, not on Vercel.
- **Vercel is retained for staging** (`web-henna-five-45.vercel.app`), previewing the `staging` branch. Legacy/duplicate Vercel projects (`uxhi-web`, `uxhi-website`) should be deleted — see `PROJECT-STATE.md`.
- Netlify's free tier allows commercial use (Vercel's Hobby plan does not) but is **build-credit-limited**, so production deploys are batched — see CLAUDE.md.
