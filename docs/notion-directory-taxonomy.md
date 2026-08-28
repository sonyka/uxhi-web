# Member Directory Taxonomy — Notion source lists + Sanity mapping

Companion to [notion-directory-migration.md](notion-directory-migration.md).

Notion is the **source of truth** for the member directory. This file archives Notion's
**complete** option lists as of 2026-08-27 — including options nobody uses — so options can be
added later without re-deriving them, and records exactly how each maps into Sanity.

Verified against all 63 live member records: **zero unmapped values**.

---

## Focus — 15 → 18 options

Notion defines **26** options; 25 are in use. Sanity gains 3.

### Target Sanity list (18)

| Title | Value | Members | Origin |
|---|---|---|---|
| Accessibility Design | `accessibility-design` | 8 | existing |
| AR/VR Design | `ar-vr-design` | 4 | existing |
| Brand Identity | `brand-identity` | 2 | existing |
| Content Strategy | `content-strategy` | 13 | existing |
| Design Ops | `design-ops` | 9 | existing |
| Information Architecture | `information-architecture` | 19 | existing |
| Interaction Design | `interaction-design` | 12 | existing |
| Product Design | `product-design` | 42 | existing |
| Product Management | `product-management` | 2 | existing |
| Product Strategy | `product-strategy` | 2 | existing |
| Service Design | `service-design` | 8 | existing |
| UI Design | `ui-design` | 26 | existing |
| Usability Evaluation | `usability-evaluation` | 11 | existing |
| User Research | `user-research` | 30 | existing |
| UX Leadership | `ux-leadership` | 16 | existing |
| **UX Strategy** | `ux-strategy` | **27** | **NEW** |
| **UX Writing** | `ux-writing` | **4** | **NEW** |
| **Visual Design** | `visual-design` | **20** | **NEW** |

### Mapping

| Notion value | → Sanity | Note |
|---|---|---|
| Accessibility Design · AR/VR Design · Brand Identity · Content Strategy · Information Architecture · Interaction Design · Product Design · Product Management · Product Strategy · Service Design · UI Design · Usability Evaluation · User Research · UX Leadership | *(same)* | direct |
| DesignOps | `design-ops` | spacing only |
| UX Strategy | `ux-strategy` | **new option** |
| UX Writing | `ux-writing` | **new option** |
| Visual Design | `visual-design` | **new option** |
| Marketing / Branding | `brand-identity` | folded — 1 use |
| Print Design | `brand-identity` | folded — 1 use |
| User Assistance | `content-strategy` | folded — 1 use |
| Voice User Interface Design | `interaction-design` | folded — 0 uses |
| Artificial Intelligence | *dropped* | not a UX focus — 1 use |
| Business Development | *dropped* | not a UX focus — 1 use |
| Software Development | *dropped* | not a UX focus — 1 use ⚠️ see below |
| AI Consciousness | *dropped* | joke entry — 1 use |

> ⚠️ **Trevor Husseini** lists `Software Development` as his *only* focus, so he imports with an
> empty focus array. `focus` is optional in the schema and `MemberCard` renders nothing for it,
> so this is cosmetic — but he'll be the one member with no focus tags. Either leave it and ask
> him to update his Notion row, or add a `software-development` focus option.

---

## Industry — 16 → 26 options

Notion defines **43** options; 37 are in use, plus one orphan value (`Non-profit`) that isn't a
defined option at all. Sanity gains 10, loses 1 (`agriculture` — unused and not a Notion option).

### Target Sanity list (26)

| Title | Value | Members | Origin |
|---|---|---|---|
| Aerospace | `aerospace` | 2 | **NEW** |
| Architecture | `architecture` | 2 | **NEW** |
| Arts & Culture | `arts-culture` | 3 | **NEW** |
| Automotive | `automotive` | 2 | existing |
| Consulting | `consulting` | 18 | **NEW** |
| Customer Relationship Management | `crm` | 7 | **NEW** |
| Cybersecurity | `cybersecurity` | 4 | **NEW** |
| E-commerce | `ecommerce` | 1 | existing |
| Education | `education` | 24 | existing |
| Energy & Sustainability | `energy-sustainability` | 2 | renamed from `energy` |
| Entertainment | `entertainment` | 10 | existing |
| Finance | `finance` | 8 | existing |
| Food & Beverage | `food-beverage` | 6 | existing |
| Government | `government` | 10 | existing |
| Healthcare | `healthcare` | 15 | existing |
| Human Resources | `human-resources` | 1 | **NEW** |
| Indigenous Tech | `indigenous-tech` | 5 | **NEW** |
| Marketing & Branding | `marketing-branding` | 20 | **NEW** |
| Non-profit | `nonprofit` | 3 | existing |
| Real Estate | `real-estate` | 2 | existing |
| Retail | `retail` | 7 | existing |
| Technology | `technology` | 27 | existing |
| Transportation & Logistics | `transportation-logistics` | 5 | **NEW** |
| Travel & Tourism | `travel-tourism` | 13 | renamed from `travel-hospitality` |
| Web Design | `web-design` | 34 | **NEW** |
| Other | `other` | 1 | existing |

**Removed:** `agriculture` — zero usage, not a Notion option.

### Mapping

| Notion value(s) | → Sanity | Note |
|---|---|---|
| Web Design | `web-design` | **new** — most-used industry |
| Internet / Technology · Software Development · Artificial Intelligence | `technology` | merged |
| Education | `education` | direct |
| Marketing / Branding | `marketing-branding` | **new** |
| Consulting | `consulting` | **new** |
| Healthcare | `healthcare` | direct |
| Travel & Tourism · Hospitality | `travel-tourism` | merged; renamed from Travel & Hospitality |
| Government · Civic Tech | `government` | merged |
| Entertainment · Video Games | `entertainment` | merged |
| Finance | `finance` | direct |
| Customer Relationship Management | `crm` | **new** |
| Retail | `retail` | direct |
| Restaurants · Bars & Food · Restaurants Bars & Food | `food-beverage` | **merged — Notion has these split *and* combined** |
| Indigenous Tech | `indigenous-tech` | **new** — kept deliberately for a Hawaiʻi org |
| Transportation & Logistics | `transportation-logistics` | **new** |
| Cybersecurity | `cybersecurity` | **new** |
| Nonprofit · Non-profit · Social Impact | `nonprofit` | **merged — Notion spells it two ways** |
| Automotive | `automotive` | direct |
| Real Estate | `real-estate` | direct |
| Energy · Sustainability & Infrastructure | `energy-sustainability` | merged |
| Aerospace | `aerospace` | **new** |
| Architecture | `architecture` | **new** |
| Museums + Institutions · Fine Art · Photography | `arts-culture` | **new**, merged |
| E-commerce | `ecommerce` | direct |
| Human Resources | `human-resources` | **new** |
| Community Management | `other` | 1 use, no good home |

---

## Parked — defined in Notion, zero usage, NOT added to Sanity

Kept here so they can be added later without re-deriving. If a member ever selects one, the
import will halt and report it rather than guessing.

**Industry (6):**

| Notion option | If it's ever needed |
|---|---|
| Biomedical | → `healthcare`, or add as its own option |
| Insurance | → `finance`, or add as its own option |
| Telecommunication | → `technology`, or add as its own option |
| Energy Sustainability & Infrastructure | duplicate of `energy-sustainability` |
| Information Architecture | a *focus* that leaked into the industry list — don't add |
| Product Design | a *focus* that leaked into the industry list — don't add |

**Focus (1):** Voice User Interface Design → `interaction-design`, or add as its own option.

---

## Island — 7 → 7, aliases only

| Notion | → Sanity |
|---|---|
| Oʻahu | `oahu` |
| Big Island | `hawaii` ⚠️ alias |
| Maui | `maui` |
| Kauai | `kauai` |
| Molokaʻi | `molokai` |
| Lanai | `lanai` |
| Mainland | `mainland-international` ⚠️ alias |

No schema change. Distribution: Oʻahu 47 · Mainland 5 · Big Island 5 · Maui 2 · Kauaʻi 1.

---

## Experience — 7 → 7, no change

All match case-insensitively once punctuation and spacing are normalized. Notion also contains
`Student or transitioning` (lowercase *t*) as a stale row value; the normalizer folds it in.

| Notion | → Sanity |
|---|---|
| Student or Transitioning | `student-transitioning` |
| <1 year | `less-than-1-year` |
| 1 - 2 years | `1-2-years` |
| 3 - 4 years | `3-4-years` |
| 5 - 9 years | `5-9-years` |
| 10 - 19 years | `10-19-years` |
| 20+ years | `20-plus-years` |

---

## Blast radius of widening the lists

Checked before committing to these numbers:

| Surface | Effect |
|---|---|
| `MemberFilters.tsx` | **Industry is not a filter** — only Focus, Island, Experience are. 26 industries cost nothing here. |
| Focus filter dropdown | Already `max-h-64 overflow-y-auto`; 15 → 18 scrolls fine. |
| `MemberDrawer.tsx` | Displays both; falls back to the raw value if unknown, so it degrades gracefully. |
| `DirectorySubmitForm.tsx` | Industry checkbox grid grows 16 → 26. The only real UI change. |
| Design system page | **Must be updated in the same changeset** (CLAUDE.md sync rule). |

Files to change together:
`schemaTypes/documents/directoryMember.ts` · `components/directory/constants.ts` ·
`app/(site)/design-system/page.tsx`
