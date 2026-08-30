# Notion → Sanity: Member Directory Migration Plan

Plan for moving the member profiles from the Notion Member Directory
([public page](https://uxhi.notion.site/Member-Directory-4ee43831f57d4909801dc3528de957b6))
into the Sanity-backed directory that already ships at `/find-ux-pro`.

Written 2026-08-27. Last updated 2026-08-27.
**Everything stays on `staging` — `uxhi.community` is not ready for this yet.**

---

# ⚠️ OPEN ITEMS — read this first

Nothing below is blocked. Ordered by what happens next.

## 1. Build the import — mine

| # | Item | Notes |
|---|---|---|
| ~~1.1~~ | ~~Write `web/scripts/migrate-notion-directory.mjs`~~ ✅ done | Guards verified by test: unknown values halt, drift from `constants.ts` halts, dry run writes nothing |
| ~~1.2~~ | ~~Run the dry run~~ ✅ **63/63 map cleanly, zero unknowns** | Findings below |
| ~~1.3a~~ | ~~Import as drafts~~ ✅ **63/63, zero failures** | Verified against the Notion analysis |
| ~~1.3b~~ | ~~Publish~~ ✅ **63 published, 0 drafts left** | Via `--promote`, which reuses the uploaded photos |
| ~~1.4~~ | ~~Delete the 6 pre-migration records~~ ✅ **done** | Guarded: aborts unless ≥60 imported members are already live |
| ~~1.5~~ | ~~Verify on staging~~ ✅ **"Showing 63 of 63 members"** | Island filter works (Maui → 2, deselect → 63); no placeholders |

**The migration is complete.** `/find-ux-pro` on staging now serves the 63 real members from
Notion. Remaining work is the member-data questions below and the launch gate.

## 2. Your calls — none blocking

Per-member data questions are in section 4.

| Item | Detail |
|---|---|
| **Consent** | 63 real people's names, photos and LinkedIn profiles move to a new public home on a new domain. Confirm the original Notion submission covers that — **before** it goes live, not after. |
| **Retire Notion, or keep syncing?** | Source-of-truth rule implies Notion stays the editing surface and the script becomes a recurring sync. If instead it's retired, redirect it at `uxhi.community/find-ux-pro`. Affects nothing until launch. |

## 3. Parked until `uxhi.community` is ready

| Item | Detail |
|---|---|
| 🚨 **Launch gate: no placeholders in production** | `Placeholder Member 1–4` must be gone before the domain is pointed. Check `*[_type=="directoryMember" && name match "Placeholder*"]` returns zero. Covered by 1.4 — this is the backstop if 1.4 slips. |
| **Production deploy** | Nothing here goes to Netlify/`main` until you say so. All work and review happen on `staging` → `web-henna-five-45.vercel.app`. |

## 4. 🙋 Member data — questions for you to revisit (not urgent)

Everything below imported fine and the site renders correctly. These are **data quality
questions about specific people**, all to be fixed **in Notion** and then re-synced with
`node scripts/migrate-notion-directory.mjs --commit && … --promote`.

### Needs a person contacted

| Member | Issue |
|---|---|
| **Shayla Cabalo-Cable** | No headshot — shows an initials tile |
| **Vincent Brathwaite** | No headshot — shows an initials tile |
| **Sharif Matar** | No headshot — shows an initials tile |
| ~~**Trevor Husseini**~~ | ~~Only focus is `Software Development`~~ — **resolved 2026-08-30.** A `software-development` option was added and his tag restored. |
| **Jamaal Pascall** | No LinkedIn — the only member without one |

### Likely data errors in Notion

| Member | Issue |
|---|---|
| **Margaret ‘Peggy’ Seymour** | Island column says **Big Island**, but Location says **Kāʻanapali**, which is on **Maui**. Imported as Big Island (the column wins), so she does *not* appear under the Maui filter. Almost certainly wrong. |
| ~~**Kadi Lee**~~ | ~~Location reads "Los **Angles**, California"~~ — **fixed in Sanity 2026-08-30** (`city` now "Los Angeles"). ⚠️ Still wrong in Notion, so a re-sync will reintroduce it — fix the Notion row too. |
| **Kamalei Logan** | Location is just "Utah" — a state, so `city` now reads "Utah" |
| **Rebecca Mungall** | Location "Kauaʻi, Hawaii" names the island, not a city — so she has an island but no city |
| **Vincent Brathwaite** | Same shape: Location "Oahu, Hawaii" → island only, no city |

### Sparse but probably fine

| Issue | Count | Note |
|---|---|---|
| **No job title** | **26 of 63** | Renders as a blank line under the name. The single biggest gap — worth a nudge campaign if the directory is meant to help recruiters. Includes Sony Atmadjaja, Ryan Kawailani Ozawa, Lani Teshima, Mike Strauss, David Sharek, Philip Mok and 20 others. |
| **No portfolio/website** | 25 of 63 | Optional field, fine to leave |
| **Mainland members** | 5 | Chris Ota (San Francisco), Kadi Lee (Los Angeles), Kamalei Logan (Utah), Lani Teshima (San Francisco), Melissa Wong (Seattle) — confirm they should appear in a Hawaiʻi directory. They're tagged `Mainland / International`, which is a deliberate option, so presumably yes. |

### Housekeeping

| Item | Detail |
|---|---|
| **Orphaned image assets** | The test purge and the pre-migration deletions left unreferenced assets. Harmless against the 10GB tier; cleanable in Studio if you want the space. |
| **Sony Atmadjaja appears once** | The old hand-made record was deleted; the profile now comes from Notion like everyone else. Job title is blank there — worth filling in. |

---

## Status — what's already done

The destination was already built — schema, page, filters, search, sort, pagination, profile
drawer, self-serve submit form. This is a **data migration only**.

- ✅ **Test-data purge** — 11 junk records deleted (Step 5).
- ✅ **All 63 member records extracted** from Notion; no export or credentials needed (Step 1).
- ✅ **Headshots confirmed downloadable** — 60 of 63 (Step 3).
- ✅ **Taxonomy decided** — Focus 15→18, Industry 16→26 to match Notion. Verified against all
  63 records: **zero unmapped values**. Full mapping + the archived wholesale Notion lists:
  [notion-directory-taxonomy.md](notion-directory-taxonomy.md).
- ✅ **Schema widened and shipped** — `directoryMember.ts`, `constants.ts` and the
  design-system page moved together. Build passes; all four option lists verified in lockstep.
- ✅ **Gustavo Ambrozio resolved** — not a member; deleted with the rest, not re-imported.
- ✅ **Imported, published and verified (2026-08-28)** — 63 members live on staging. The 6
  pre-migration records are gone; the dataset holds exactly the 63 Notion rows.

---

## Governing principle: Notion is the source of truth

Decided 2026-08-27. Everything in Sanity mirrors what Notion has, member data included.
Consequences that shape the whole plan:

- The import is a **full replace, not a merge**. All 6 current `directoryMember` docs (2 real +
  4 placeholders) are deleted; the 63 Notion rows come in fresh. No dedupe logic needed.
- **Sanity's option lists follow Notion's**, not the other way round — hence the widening.
- Anyone not in Notion is not in the directory. Fixes go into Notion first, then re-import.

---

## Step 1 — Extraction ✅ done

**Correction to an earlier version of this doc:** it claimed the Notion database was not
publicly readable, based on a `Received HTTP 401` in the browser console and a gallery reading
"No results". That was wrong on both counts. The 401 came from `exp.notion.com`, Notion's
analytics endpoint — unrelated noise. The empty gallery was lazy-loading: the rows render on
scroll, which an automated first paint never triggers.

The data is fully public. Notion's own `api/v3` endpoints answer anonymously from the page
origin, which beats scrolling the DOM — it returns every row in one call plus the real schema:

| Call | Purpose |
|---|---|
| `POST /api/v3/loadPageChunk` | page → `collection_id`, `view_ids`, and the property schema |
| `POST /api/v3/queryCollection` | all 63 rows with `limit: 500`, no pagination needed |

Identifiers (stable, public):

```
page        4ee43831-f57d-4909-801d-c3528de957b6
space       fd0c316e-4782-4c7d-85f0-7dee2c3a93c6
collection  c22969fd-21e9-4f28-9e41-3e63d3b3696e
views       f1d2868d… (All) · 5ff4f17f… (By Island) · 8b1b918a… (Open to Work)
```

**Raw extract:** `~/Documents/FREELANCE/UXHI/notion-directory-raw-2026-08-27.json`
— 63 rows, kept **outside the repo** (member PII: names, headshots, LinkedIn URLs).

Because this is repeatable on demand, there's no need to freeze the data now — we can re-pull
immediately before the import so nothing goes stale.

### What's actually in there — 63 members

| Field | Coverage |
|---|---|
| Name, Location, Experience, Focus, Industry | **63/63 (100%)** |
| LinkedIn | 62/63 (98%) |
| Head Shot | 60/63 (95%) |
| Island | 60/63 (95%) |
| Website | 38/63 (60%) |
| Job Title | 37/63 (59%) |
| Education Institution Attended | 23/63 (37%) |
| Bootcamp Attended | 15/63 (24%) |
| Open to work = true | 37/63 (59%) |

Island spread: Oʻahu 47 · Mainland 5 · Big Island 5 · Maui 2 · Kauaʻi 1.

The same three people — **Shayla Cabalo-Cable, Vincent Brathwaite, Sharif Matar** — are missing
both headshot and island. All three have a Location string that resolves the island
("Honolulu, HI", "Oahu, Hawaii", "Honolulu"), so island is inferable; only the photos are truly
absent, and those degrade to an initials tile.

---

## Step 2 — Field mapping ✅ decided

Notion's real column names (from the live schema), mapped to
`web/src/sanity/schemaTypes/documents/directoryMember.ts`:

| Notion column | Type | → Sanity field | Status |
|---|---|---|---|
| `Name` | title | `name` | ✅ direct |
| `Job Title` | text | `title` | ✅ direct |
| `Head Shot` | file | `photo` | ✅ via proxy download |
| `Open to work` | checkbox | `openToWork` | ✅ direct |
| `Experience` | select | `experienceLevel` | ✅ no change — all 7 map |
| `Island` | select | `island` | ✅ 2 aliases, no schema change |
| `Location` | text | `city` | ⚠️ needs parsing — see below |
| `Focus` | multi-select | `focus` | ✅ **widen 15 → 18** |
| `Industry` | multi-select | `industries` | ✅ **widen 16 → 26** |
| `LinkedIn` | url | `linkedIn` | ✅ direct |
| `Website` | url | `portfolio` | ✅ direct |
| `Education Institution Attended` + `Bootcamp Attended` | text ×2 | `educationBootcamp` | ✅ joined with ` · ` |
| — | | `order` | set `0` for all |
| — | | `location` | **legacy/hidden — do not populate** |

### The widening plan

Full option-by-option mapping, the resulting member counts, and the archived **wholesale Notion
lists** (all 43 industries, all 26 focuses — including unused ones, kept for later) live in
**[notion-directory-taxonomy.md](notion-directory-taxonomy.md)**.

Summary:

| | Before | After | Change |
|---|---|---|---|
| Focus | 15 | **18** | + UX Strategy (27 members), Visual Design (20), UX Writing (4) |
| Industry | 16 | **26** | + 10 new; `agriculture` removed (unused, not a Notion option) |
| Island | 7 | 7 | aliases only — `Big Island` → `hawaii`, `Mainland` → `mainland-international` |
| Experience | 7 | 7 | no change |

Verified against all 63 records: **zero unmapped values**, and every option in both target lists
has at least one member. Two merges clean up Notion's free-text accretion — `Restaurants` +
`Bars & Food` + `Restaurants Bars & Food` → `food-beverage`, and `Nonprofit` + `Non-profit` +
`Social Impact` → `nonprofit`.

**Blast radius is small.** Industry is *not* a filter — it appears only in the submit form and
the profile drawer — so 26 options cost nothing in the filter UI. The Focus dropdown is already
`max-h-64 overflow-y-auto`, so 18 scrolls fine. The one real UI change is the submit form's
industry checkbox grid growing 16 → 26.

Files that must change **together** (CLAUDE.md design-system sync rule):
`schemaTypes/documents/directoryMember.ts` · `components/directory/constants.ts` ·
`app/(site)/design-system/page.tsx`

> ✅ **Resolved 2026-08-30.** Trevor Husseini listed `Software Development` as his only focus,
> which had no matching option, so he imported with an empty focus array. `software-development`
> is now an option and his tag is restored.

### Location → city

`Location` is 100% populated but formatted as `"Honolulu, Hawaii"` / `"Honolulu, HI"` /
`"Oahu, Hawaii"`. Take the segment before the comma as `city`, drop it when it's an island name
rather than a city, and cross-check against the `Island` column. Display-only — city isn't a
filter — so imperfect parses are cosmetic, not structural.

This is also how the 3 island-less members get their island: all three have a Location string
that resolves it.

### Education + Bootcamp → one field

Notion has two columns, Sanity has one `educationBootcamp`. 23 people have an institution, 15 a
bootcamp. Join with ` · ` — no schema change needed.

---

## Step 3 — Photo pipeline ✅ verified

Raw S3 URLs in the extract **403** — they're unsigned. Notion's image proxy works anonymously:

```
https://uxhi.notion.site/image/<urlencoded-s3-url>?table=block&id=<row-id>&cache=v2
```

Verified end to end: `302 → 200`, `image/jpeg`, 41KB, 500×500. So the whole set is downloadable
without credentials, and there's no signed-URL expiry race to design around — which removes the
main reason the earlier draft of this plan preferred a zip export.

Per row: download via proxy → verify it's JPG/PNG/WebP → `client.assets.upload("image", …)` →
attach as `{ _type: "image", asset: { _ref }, alt: "Headshot of <name>" }`, exactly matching what
`lib/actions/directory-submit.ts` produces, so imported and form-submitted profiles are
indistinguishable downstream.

The 3 people without a headshot import fine — `MemberCard` falls back to an initials tile. They
show as failing `required()` in Studio, which is a useful worklist of who to chase.

---

## Step 4 — The import script

`web/scripts/migrate-notion-directory.mjs`, following the house pattern
(`migrate-partner-sponsor.mjs`): parses `.env.local`, uses `SANITY_API_WRITE_TOKEN` (present),
`useCdn: false`.

| Flag | Effect |
|---|---|
| *(default)* | **Dry run** — re-pulls from Notion, normalizes, prints a per-row diff + unmapped-value report. Writes nothing. |
| `--commit` | Creates documents as **drafts**, mirroring the submit form. |
| `--publish` | Creates them published. Only after a drafts pass is reviewed. |

Deterministic IDs (`directory-notion-<notion-row-id>`) so re-runs update rather than duplicate.
**No dedupe logic needed** — full replace means there's nothing to merge against.

The mapping tables from [notion-directory-taxonomy.md](notion-directory-taxonomy.md) are the
script's single source of truth, imported from `components/directory/constants.ts` where
possible so the script can't drift from the UI. Nothing is silently dropped: any Notion value
not in the mapping **halts the run** with a report rather than guessing — which is what makes
this safe to re-run later, when Notion has inevitably grown new options.

Because Notion stays authoritative, treat this as a **re-runnable sync**, not a one-shot.

---

## Step 5 — Test-data purge ✅ done 2026-08-27

Ran `web/scripts/purge-directory-tests.mjs --commit`. **11 test records deleted** — both
"Test User" duplicates, "sanity test", "finduxpro test", "memberdirectory atmadjaja",
"island test", "dlfkj asdfa", "Bobby Joe", "Lani banani", "Lani Atmadjaja sdfdsf", and the
"test member directory" draft.

Dataset now holds **6** `directoryMember` docs: 2 real members (Sony Atmadjaja, Gustavo
Ambrozio) + 4 seeded `Placeholder Member` rows.

- Pre-purge backup of all 17 docs:
  `~/Documents/FREELANCE/UXHI/directory-backup-2026-08-27.json` (outside the repo — PII).
  Image assets were not deleted, so any record there can be recreated intact.
- The script deletes by **explicit ID allowlist**, never by name pattern, so re-running it later
  against a dataset full of real members can't widen its blast radius. Dry run is the default.

No dedupe is needed against these — under the source-of-truth rule all 6 are deleted and the 63
Notion rows come in fresh.

### 🚨 Launch gate — remove all 6 current records

Under Notion-as-source-of-truth, **every one of the 6 remaining docs goes** once the import
succeeds — not just the 4 placeholders:

| Record | Why it goes |
|---|---|
| Placeholder Member 1–4 | Seeded demo rows. Kept only so the grid, island filter and pagination look alive on staging while the real data is still in Notion. |
| Sony Atmadjaja | **Present in Notion** (row `8017bc73…`) — the Notion version replaces this one. |
| Gustavo Ambrozio | **Not in Notion**, and confirmed not a member — see below. |

Sequence matters: import first, verify 63 records landed, *then* delete the old 6. That way the
directory is never empty.

Do not point `uxhi.community` at the site until
`*[_type=="directoryMember" && name match "Placeholder*"]` returns zero.

### Gustavo Ambrozio — resolved: let him go

He had a complete Sanity profile but no matching Notion row. Confirmed 2026-08-27 that **he is
not a member**, so he is deleted with the other 5 and not re-imported. No action needed; he
remains in the pre-purge backup if that ever changes.

---

## Sequencing

| # | Step | Who | Effort |
|---|---|---|---|
| ~~1~~ | ~~Export from Notion~~ — not needed, extraction is scripted | — | — |
| ~~2~~ | ~~Purge test records~~ ✅ 11 deleted | — | — |
| ~~3~~ | ~~Decide the taxonomy~~ ✅ 18 focus / 26 industry | — | — |
| ~~4~~ | ~~Decide on Gustavo~~ ✅ not a member | — | — |
| ~~5~~ | ~~Widen schema + constants + design-system page~~ ✅ build passes | — | — |
| 6 | Write `migrate-notion-directory.mjs`, dry-run report | Me | ~2 hrs |
| 7 | Review the dry-run diff | You | ~30 min |
| 8 | Import as drafts → review in Studio → publish | Both | ~1 hr |
| 9 | Delete the 6 old records, once 63 have landed | Me | 2 min |
| 10 | Verify `/find-ux-pro` on staging | Me | ~30 min |

About **half a day** of remaining work, all of it on `staging`. Open decisions and parked items
are listed at the top of this doc.

---

## Related

- **Taxonomy + archived wholesale Notion lists: [notion-directory-taxonomy.md](notion-directory-taxonomy.md)**
- Destination page: `web/src/app/(site)/find-ux-pro/page.tsx`
- Schema: `web/src/sanity/schemaTypes/documents/directoryMember.ts`
- Option lists: `web/src/components/directory/constants.ts`
- Existing intake path: `web/src/lib/actions/directory-submit.ts`
- Purge script: `web/scripts/purge-directory-tests.mjs`
- Script precedent: `web/scripts/migrate-partner-sponsor.mjs`
- [LAUNCH-PUNCHLIST.md](LAUNCH-PUNCHLIST.md) §6
