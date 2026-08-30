# Google Analytics Setup — Note to Self

Two **GA4** properties (Google free tier), one per site. Each maps to its own Next.js
route group, and the Measurement IDs are **hardcoded** in code (they're public values that
ship in page HTML anyway) — so there's **nothing to configure in Netlify or Vercel**.

| Site | Live domain | Route group | GA4 property | Measurement ID | Gated? |
|---|---|---|---|---|---|
| Community | `uxhi.community` | `src/app/(site)/` | UXHI Community | `G-DMCWLCQD08` | ✅ yes → only fires on `uxhi.community` |
| Conference | `uxhiconference.com` | `src/app/(conference)/` | UXHI Conference | `G-CT4QB1KDE2` | ✅ yes → only fires on `uxhiconference.com` |

---

## Why the community tag is gated (important)

`G-DMCWLCQD08` is **already collecting live `uxhi.community` traffic** from the current
site. If it fired on our staging environments, test/review visits would pollute the live
reports. So the community tag only loads when `window.location.hostname` is `uxhi.community`
(or `www.uxhi.community`).

This fits the launch plan: the **Netlify production site will be pointed
to `uxhi.community`** at release. Until then the community tag stays silent; the moment the
domain becomes `uxhi.community`, it activates automatically — **same property, no loss of
historical continuity.**

**Both tags are now gated (2026-08-30).** The conference tag was deliberately left un-gated
so it could be verified before launch. That verification happened on 2026-08-28 against live
`uxhiconference.com` traffic, which meant the property then held real data and staging visits
were inflating it. It now uses the same `GoogleAnalyticsGated` wrapper as the community tag.

A consequence worth knowing: neither tag reports from staging any more, so a change to
analytics cannot be verified there. Check it on the live domain after a production deploy.

---

## Code (done, committed on `staging`)

- `@next/third-parties` — official GA helper, auto-tracks client-side route changes.
- `src/components/analytics/GoogleAnalyticsGated.tsx` — client wrapper that loads GA only on
  a given `productionHost` (omit the prop to always load).
- `(site)/layout.tsx` → `<GoogleAnalyticsGated gaId="G-DMCWLCQD08" productionHost="uxhi.community" />`
- `(conference)/layout.tsx` → `<GoogleAnalytics gaId="G-CT4QB1KDE2" />` (un-gated).

Nothing to change unless a site is renamed, an ID changes, or the community domain differs
from `uxhi.community` at launch (update `productionHost`).

---

## Deployment reality (where each tag actually collects)

- **Conference (`G-CT4QB1KDE2`):** the real `uxhiconference.com` is on **Netlify (`main`,
  frozen — no credits).** So this tag only reports from the **staging** URLs until `main` is
  deployed to Netlify. It also fires on the Vercel staging URL and localhost (un-gated).
- **Community (`G-DMCWLCQD08`):** stays silent on all staging URLs; starts reporting when the
  Netlify site is pointed to `uxhi.community`.

---

## Verify

1. **Conference (now, on staging):** open `web-henna-five-45.vercel.app/conferences/2026/`,
   then GA → **Reports → Realtime** for UXHI Conference → you should appear within ~30s.
   Or DevTools → Network → filter `collect` for a request carrying `G-CT4QB1KDE2`.
2. **Community:** can't be verified until the domain is `uxhi.community` (gated by design).
   To spot-check the wiring locally, temporarily pass no `productionHost` in `(site)/layout.tsx`
   and load `localhost:3000` — revert before committing.

---

## Future notes

- **New conference year:** no GA change — new years stay in the `(conference)` group and keep
  reporting to the Conference property.
- **Gate the conference tag too?** Once verified, you can add `productionHost="uxhiconference.com"`
  to keep staging test traffic out of that property as well.
- **Cookie/consent banner:** not added. No hard US/Hawaii requirement; revisit only if desired
  (would need GA consent mode).
