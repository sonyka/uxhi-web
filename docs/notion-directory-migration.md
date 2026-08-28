# Notion → Sanity: Member Directory Migration Plan

Plan for moving the member profiles from the Notion Member Directory
([public page](https://uxhi.notion.site/Member-Directory-4ee43831f57d4909801dc3528de957b6))
into the Sanity-backed directory that already ships at `/find-ux-pro`.

Written 2026-08-27. Nothing here has been executed yet.

---

## TL;DR

The destination is **already built and working** — schema, page, filters, search, sort,
pagination, profile drawer, self-serve submit form. This is a **data migration only**;
no new features are needed.

Two things stand between here and done:

1. **A test-data purge.** The live dataset holds 16 published + 1 draft `directoryMember`
   docs and effectively all of them are junk ("Test User", "dlfkj asdfa", "sanity test",
   "island test"…). These would be public on `uxhi.community` at launch. **This is a launch
   blocker and is independent of the Notion port** — it should be done regardless.
2. **An export from Notion that only a workspace admin can produce.** See the blocker below.

Once I have the export, the import itself is a small, well-understood script — the same shape
as the existing `scripts/migrate-partner-sponsor.mjs`.

---

## ⚠️ Blocker: the Notion database is not publicly readable

I loaded the public Notion page in a real browser. The page chrome renders (title, intro copy,
Quick Links, FAQs, and the three view tabs **All / By Island / Open to Work**) but the gallery
itself renders **"No results"**, and the console shows the collection query failing:

```
Error: Received HTTP 401
Error: Failed to fetch (exp.notion.com)
```

Two consequences:

- **I cannot scrape it.** There is no anonymous path to the row data. Any plan that starts with
  "read the public page" is dead.
- **Worth checking on your side:** if this 401 is a sharing-permission regression rather than an
  empty database, then the public Notion directory is *currently showing nothing to visitors* —
  i.e. the thing we're migrating may already be broken in production. Open the page in a private
  window and confirm before anything else.

So step one is yours, not mine: **produce an export from inside the Notion workspace.**

---

## Step 1 — Export from Notion (you)

Two routes. I recommend A for a one-time move.

### Route A — Zip export (recommended)

Open the Member Directory database as a full page → **•••** (top right) → **Export** →

| Setting | Value |
|---|---|
| Export format | **Markdown & CSV** |
| Include content | **Everything** |
| Include databases | **All views** (or Current view if "All" is the complete set) |
| Create folders for subpages | **On** |

You get a `.zip` containing a `Member Directory <hash>.csv` plus a folder per row holding that
row's uploaded files — **headshots land as real local files**. Send me the zip (or drop it
somewhere I can read; do not commit it to the repo — it contains member PII).

**Why this beats the API for a one-time run:** Notion's file URLs are signed S3 links that
expire in about an hour. The zip sidesteps the expiry race entirely.

### Route B — Notion API (only if we need to re-run this)

Create an internal integration, share the database with it, then query
`POST /v1/databases/{id}/query` and download each file URL immediately within the same run.
Structured JSON, no CSV quoting pitfalls, repeatable. Costs an integration setup and ~1 extra
hour of scripting. Worth it only if the plan is to keep Notion as the source of truth for a
while and sync repeatedly — which I'd advise against; pick one system.

### What I need alongside the export

- Confirmation of **which view is authoritative** (All vs. some filtered subset) — I don't want
  to import archived or draft rows.
- Whether any rows should be **excluded** (people who've left, duplicates, opted out).

---

## Step 2 — Field mapping

Target schema: `web/src/sanity/schemaTypes/documents/directoryMember.ts`.

| Sanity field | Type | Source in Notion | Notes |
|---|---|---|---|
| `name` | string, **required** | Title property | Notion likely stores one full-name title; the site's form splits first/last and rejoins, so a single string is fine |
| `title` | string | Job title column | |
| `photo` | image + `alt`, **required** | Files & media column | See photo pipeline below |
| `openToWork` | boolean | "Open to Work" checkbox | A view is already named this, so the property exists |
| `focus` | array of enum | Multi-select | **15 allowed values** — must normalize |
| `experienceLevel` | enum | Select | **7 allowed values** — must normalize |
| `industries` | array of enum | Multi-select | **16 allowed values** — must normalize |
| `island` | enum | Island column | **7 allowed values**; a "By Island" view exists so the property is there |
| `city` | string | City column | Free text, display-only — not a filter, so no normalization needed |
| `educationBootcamp` | string | Education/bootcamp column | |
| `linkedIn` | url | LinkedIn column | Must be a valid absolute URL or Studio flags it |
| `portfolio` | url | Portfolio/website column | Same |
| `order` | number | — | Set `0` for all; ordering is `openToWork desc, order asc, name asc` |
| `location` | string | — | **Legacy/hidden. Do not populate.** Superseded by island + city |

The exact Notion column names are unknown until I see the CSV — I'll confirm the mapping against
the real headers before writing a single row.

### Normalization is where the actual work is

Notion multi-selects export as human-readable labels; Sanity stores slugs. `"User Research"` →
`"user-research"`, `"AR/VR Design"` → `"ar-vr-design"`, `"Non-profit"` → `"nonprofit"`. The
canonical lists live in `web/src/components/directory/constants.ts` and I'd import the mapping
from there rather than retyping it, so the script can't drift from the UI.

Two rules I'd hold to:

- **Nothing is silently dropped.** Any Notion value that doesn't map to a known slug goes into a
  `unmapped-values.csv` report for you to adjudicate — either we add the option to the schema
  (and the design system page, per the sync rule) or we pick an existing equivalent.
- **A real CSV parser**, not `split(",")`. Multi-select cells are comma-joined inside a single
  quoted field, and several option names contain commas or ampersands. Hand-splitting silently
  corrupts data.

### Island is a quality gate

`MemberCard` and `MemberDrawer` only render a location when `island` is set — with island null,
the city is never shown, and the island filter can't see the member at all. Every one of the 17
existing records has `island: null`, which is part of why they look broken. If the Notion data
has island coverage gaps, we should fill them from city before import rather than after.

---

## Step 3 — Photo pipeline

For each row:

1. Read the local headshot from the export folder (Route A) or download the signed URL
   immediately (Route B).
2. Reject anything that isn't JPG/PNG/WebP — Sanity's image pipeline doesn't handle SVG, and the
   site's own upload path enforces the same three types.
3. Upload via `client.assets.upload("image", stream, { filename, contentType })`.
4. Attach as `{ _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "Headshot of <name>" }`
   — matching exactly what `lib/actions/directory-submit.ts` already produces, so imported and
   form-submitted profiles are indistinguishable downstream.

**Missing headshots degrade gracefully** — `MemberCard` falls back to the member's initial on a
grey tile — so a photo-less row is importable and won't break the page. It will show as failing
`required()` in Studio, which is actually a useful worklist: it flags exactly who to chase for a
photo. (Sanity's `required()` is Studio-side validation, not API-enforced, so the import won't
be blocked by it.)

---

## Step 4 — The import script

I'd add `web/scripts/migrate-notion-directory.mjs`, following the house pattern already set by
`migrate-partner-sponsor.mjs` (parses `.env.local`, uses `SANITY_API_WRITE_TOKEN` — confirmed
present locally, `@sanity/client` write client, `useCdn: false`).

Behaviour:

| Flag | Effect |
|---|---|
| *(default)* | **Dry run.** Parses, normalizes, resolves photos, prints a per-row diff and the unmapped-value report. Writes nothing. |
| `--commit` | Creates the documents as **drafts**, mirroring the submit form. Nothing goes public until reviewed. |
| `--publish` | Creates them published. Only after a drafts pass has been eyeballed in Studio. |
| `--purge-tests` | Separate, explicit mode for the test-record cleanup (below). Never bundled with import. |

Deterministic IDs (`directory-notion-<notion-row-id>`) so a re-run updates rather than duplicates
— re-running the script must be safe.

---

## Step 5 — Test-data purge ✅ done 2026-08-27

Ran `web/scripts/purge-directory-tests.mjs --commit`. **11 test records deleted** — both
"Test User" duplicates, "sanity test", "finduxpro test", "memberdirectory atmadjaja",
"island test", "dlfkj asdfa", "Bobby Joe", "Lani banani", "Lani Atmadjaja sdfdsf", and the
"test member directory" draft.

Dataset now holds **6** `directoryMember` docs: 2 real members (Sony Atmadjaja, Gustavo
Ambrozio) + 4 seeded `Placeholder Member` rows.

- Full pre-purge backup of all 17 docs:
  `/Users/sonyka/Documents/FREELANCE/UXHI/directory-backup-2026-08-27.json`
  (kept **outside the repo** — member PII). Image assets were not deleted, so any record in
  that file can be recreated intact.
- The script deletes by **explicit ID allowlist**, never by name pattern, so re-running it later
  against a dataset full of real members can't widen its blast radius. Dry run is the default.

### 🚨 Launch gate — the 4 placeholders

`Placeholder Member 1–4` (order 900–903, shared placeholder photo, spread across Oʻahu / Maui /
Hawaiʻi so the island filter has something to bite on) were **deliberately kept** — they're the
only thing making the grid, island filter and pagination look alive on staging while the real
data is still in Notion.

**They must not reach production.** Deleting them is the last step of the import, once real
members are in:

```bash
node scripts/purge-directory-tests.mjs --commit --include-placeholders
```

Do not point `uxhi.community` at the site until `*[_type=="directoryMember" && name match "Placeholder*"]`
returns zero.

---

## Sequencing

| # | Step | Who | Effort |
|---|---|---|---|
| 1 | Confirm the public-page 401 — is the Notion directory currently broken for visitors? | You | 2 min |
| 2 | Export the database (Route A zip) + confirm authoritative view & exclusions | You | ~15 min |
| 3 | I inspect the CSV, confirm real column names, finalize mapping | Me | ~30 min |
| 4 | Write `migrate-notion-directory.mjs` + dry-run report | Me | ~2 hrs |
| 5 | You review the dry-run diff + unmapped-value report | You | ~30 min |
| 6 | Import as drafts, review in Studio, publish | Both | ~1 hr |
| ~~7~~ | ~~Purge test records~~ ✅ **done 2026-08-27** — 11 deleted | — | — |
| 7 | **Delete the 4 placeholders** (`--include-placeholders`) once real members are live | Me | 2 min |
| 8 | Verify `/find-ux-pro` on staging: filters, island facets, search, pagination, drawer | Me | ~30 min |

Roughly **half a day of my time**, gated on the export. Steps 4–8 all happen on `staging` and are
visible at `web-henna-five-45.vercel.app` before anything touches production.

---

## Decisions I need from you

1. **One system or two?** Once this lands, does Notion get retired (redirect the Notion page at
   `uxhi.community/find-ux-pro`), or does it stay live in parallel? Parallel means dual data
   entry and drift — I'd retire it.
2. **Drafts or published on import?** Drafts is safer but means clicking Publish N times in
   Studio. Published is one step but skips review.
3. **Consent.** These are real people's names, photos, and LinkedIn profiles moving to a new
   public home on a new domain. Do members need to be notified, or does the original Notion
   submission already cover it? Worth a look at what they agreed to.
4. **Members who never filled in the newer fields** (island, industries, experience level) —
   import them partial, or hold them back until we collect the gaps?

---

## Related

- Destination page: `web/src/app/(site)/find-ux-pro/page.tsx`
- Schema: `web/src/sanity/schemaTypes/documents/directoryMember.ts`
- Option lists: `web/src/components/directory/constants.ts`
- Existing intake path: `web/src/lib/actions/directory-submit.ts`
- Script precedent: `web/scripts/migrate-partner-sponsor.mjs`
- [LAUNCH-PUNCHLIST.md](LAUNCH-PUNCHLIST.md) §7
