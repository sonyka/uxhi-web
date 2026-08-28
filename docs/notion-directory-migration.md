# Notion → Sanity: Member Directory Migration Plan

Plan for moving the member profiles from the Notion Member Directory
([public page](https://uxhi.notion.site/Member-Directory-4ee43831f57d4909801dc3528de957b6))
into the Sanity-backed directory that already ships at `/find-ux-pro`.

Written 2026-08-27. Data extracted 2026-08-27; import not yet run.

---

## TL;DR

The destination is **already built** — schema, page, filters, search, sort, pagination, profile
drawer, self-serve submit form. This is a **data migration only**.

- ✅ **Test-data purge done** — 11 junk records deleted (Step 5).
- ✅ **All 63 member records extracted** from Notion, no export or credentials needed (Step 1).
- ✅ **Headshots confirmed downloadable** — 60 of 63 (Step 3).
- ⛔ **Blocked on you:** the Notion option lists are much wider than our Sanity enums.
  36 distinct values have nowhere to land. That's the one open decision (Step 2).

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

## Step 2 — Field mapping ⛔ needs your decisions

Notion's real column names (from the live schema), mapped to
`web/src/sanity/schemaTypes/documents/directoryMember.ts`:

| Notion column | Type | → Sanity field | Status |
|---|---|---|---|
| `Name` | title | `name` | ✅ direct |
| `Job Title` | text | `title` | ✅ direct |
| `Head Shot` | file | `photo` | ✅ via proxy download |
| `Open to work` | checkbox | `openToWork` | ✅ direct |
| `Experience` | select | `experienceLevel` | ✅ **0 decisions** — all 7 map case-insensitively |
| `Island` | select | `island` | ⚠️ 2 aliases needed |
| `Location` | text | `city` | ⚠️ needs parsing — it's `"Honolulu, Hawaii"`, not a bare city |
| `Focus` | multi-select | `focus` | ⛔ **10 values unmapped** |
| `Industry` | multi-select | `industries` | ⛔ **26 values unmapped** |
| `LinkedIn` | url | `linkedIn` | ✅ direct |
| `Website` | url | `portfolio` | ✅ direct |
| `Education Institution Attended` | text | `educationBootcamp` | ⚠️ two Notion columns, one Sanity field |
| `Bootcamp Attended` | text | `educationBootcamp` | ⚠️ same — merge or add a field |
| — | | `order` | set `0` for all |
| — | | `location` | **legacy/hidden — do not populate** |

### Island — trivial, just aliases

`Big Island` → `hawaii`, `Mainland` → `mainland-international`. The other three match already.

### Focus — 10 unmapped, and two of them are heavily used

Our schema has 15 options; Notion's has 26. All 15 of ours are in use, plus these:

| Notion value | Used by | My recommendation |
|---|---|---|
| **UX Strategy** | **27** | **Add to schema** — 2nd most-used focus in the whole directory |
| **Visual Design** | **20** | **Add to schema** — distinct from UI Design in practice |
| **UX Writing** | **4** | **Add to schema** — a real, distinct discipline |
| Marketing / Branding | 1 | → `brand-identity` |
| Print Design | 1 | → `brand-identity` |
| Artificial Intelligence | 1 | drop (an industry, not a UX focus) |
| Software Development | 1 | drop (not a UX focus) |
| Business Development | 1 | drop (not a UX focus) |
| User Assistance | 1 | → `content-strategy` |
| AI Consciousness | 1 | drop — almost certainly a joke entry |

Adding three options means updating the schema, `components/directory/constants.ts`, **and the
design system page** (per the sync rule in CLAUDE.md) in the same changeset.

### Industry — our list is the wrong shape for this data

This is the real decision. Notion has 43 industry options against our 16, and **26 distinct
values in active use have nowhere to go** — including the four most common ones:

| Notion value | Used by | Notes |
|---|---|---|
| **Web Design** | **34** | most-used industry in the directory; no equivalent |
| **Internet / Technology** | **26** | → `technology` (safe rename) |
| **Marketing / Branding** | **20** | no equivalent |
| **Consulting** | **18** | no equivalent |
| Travel & Tourism | 13 | → `travel-hospitality` |
| Customer Relationship Management | 7 | no equivalent |
| Restaurants · Bars & Food · Restaurants Bars & Food | 5+5+1 | → `food-beverage` (also: Notion has these as **both** split and combined options — dedupe) |
| Indigenous Tech | 5 | no equivalent; arguably important to keep for a Hawaiʻi org |
| Transportation & Logistics | 5 | no equivalent |
| Cybersecurity | 4 | no equivalent |
| Video Games | 3 | → `entertainment` |
| Aerospace, Architecture, Sustainability & Infrastructure | 2 each | no equivalent |
| Civic Tech, Museums + Institutions, Community Management, Hospitality, Photography, Human Resources, Fine Art, Social Impact, Artificial Intelligence, Software Development | 1 each | mostly → `other` |
| Non-profit *(hyphen variant)* | 1 | → `nonprofit` — same thing, spelled twice in Notion |

Three ways to go, pick one:

1. **Widen our list to match reality** — add ~8 options (Web Design, Marketing/Branding,
   Consulting, Cybersecurity, Indigenous Tech, Transportation & Logistics, CRM, Aerospace),
   fold the long tail into `other`. Highest fidelity, and the filter stays meaningful.
   *My recommendation.*
2. **Keep 16 and squash** — everything unmapped becomes `other`. Cheap, but `other` would then
   be the single largest industry facet, which makes the filter useless.
3. **Adopt Notion's list wholesale** — 43 options is too many for a filter UI with 63 people.

Whichever we pick, Notion's list clearly grew by free-text accretion (`Restaurants` *and*
`Bars & Food` *and* `Restaurants Bars & Food`; `Nonprofit` *and* `Non-profit`). The migration is
a good moment to clean that up rather than import the mess.

### Location → city

`Location` is 100% populated but formatted as `"Honolulu, Hawaii"` / `"Honolulu, HI"` / `"Oahu, Hawaii"`.
I'd take the segment before the comma as `city`, drop it when it's an island name rather than a
city, and cross-check island against the `Island` column. This is display-only — city isn't a
filter — so imperfect parses are cosmetic, not structural.

### Education + Bootcamp → one field

Notion has two columns; Sanity has one `educationBootcamp`. 23 people have an institution,
15 a bootcamp, some likely both. Either join them (`"UW · General Assembly"`) or add a second
Sanity field. Your call — joining is fine and needs no schema change.

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
Nothing is silently dropped — any value that fails to map halts with a report rather than
guessing.

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

Note: **Gustavo Ambrozio** and **Sony Atmadjaja** already exist in Sanity *and* may appear in the
Notion set — the import must dedupe against existing docs by name, or we'll get twins.

### 🚨 Launch gate — the 4 placeholders

`Placeholder Member 1–4` (order 900–903, shared placeholder photo, spread across Oʻahu / Maui /
Hawaiʻi so the island filter has something to bite on) were **deliberately kept** — they're the
only thing making the grid, island filter and pagination look alive on staging while the real
data is still in Notion.

**They must not reach production.** Deleting them is the last step of the import:

```bash
node scripts/purge-directory-tests.mjs --commit --include-placeholders
```

Do not point `uxhi.community` at the site until
`*[_type=="directoryMember" && name match "Placeholder*"]` returns zero.

---

## Sequencing

| # | Step | Who | Effort |
|---|---|---|---|
| ~~1~~ | ~~Export from Notion~~ — **not needed**, extraction is scripted | — | — |
| ~~2~~ | ~~Purge test records~~ ✅ done, 11 deleted | — | — |
| 3 | **Decide the Focus + Industry option lists** (Step 2) | **You** | ~30 min |
| 4 | Schema + `constants.ts` + design-system page updated together | Me | ~1 hr |
| 5 | Write `migrate-notion-directory.mjs`, dry-run report | Me | ~2 hrs |
| 6 | You review the dry-run diff | You | ~30 min |
| 7 | Import as drafts → review in Studio → publish | Both | ~1 hr |
| 8 | **Delete the 4 placeholders** (`--include-placeholders`) | Me | 2 min |
| 9 | Verify `/find-ux-pro` on staging: filters, island facets, search, pagination, drawer | Me | ~30 min |

Roughly **half a day of my time**, gated only on the Step 3 decision.

---

## Decisions I need from you

1. **Industry list** — widen to ~24 (recommended), squash to `other`, or adopt Notion's 43?
2. **Focus list** — add UX Strategy / Visual Design / UX Writing? They cover 51 uses between them.
3. **One system or two?** Once this lands, is Notion retired (redirect it at
   `uxhi.community/find-ux-pro`) or kept in parallel? Parallel means dual entry and drift —
   I'd retire it.
4. **Consent** — 63 real people's names, photos and LinkedIn profiles are moving to a new public
   home on a new domain. Does the original Notion submission cover that, or do members need a
   heads-up? Worth checking what they agreed to before this goes live.
5. **Education + Bootcamp** — join into one field, or add a second Sanity field?

---

## Related

- Destination page: `web/src/app/(site)/find-ux-pro/page.tsx`
- Schema: `web/src/sanity/schemaTypes/documents/directoryMember.ts`
- Option lists: `web/src/components/directory/constants.ts`
- Existing intake path: `web/src/lib/actions/directory-submit.ts`
- Purge script: `web/scripts/purge-directory-tests.mjs`
- Script precedent: `web/scripts/migrate-partner-sponsor.mjs`
- [LAUNCH-PUNCHLIST.md](LAUNCH-PUNCHLIST.md) §6
