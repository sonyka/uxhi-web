# Conference Design System — Audit & Plan

How the conference site's design relates to the parent UXHI design system, what has
drifted, and the plan to formalise it. Written 2026-08-15 against `staging` @ `cd458b0`.

> **The short version:** the conference site is not a separate design system and should
> not become one. 79% of its hardcoded colors are parent design-system tokens that were
> re-typed as raw hex. The genuine divergence is typography — a different font and 22
> ad-hoc sizes where the main site uses 6. Fix it with a **theme layer that inherits**,
> not a parallel system.

---

## 1. How design is guided today

Three layers, and the conference route participates in only the first — by copy-paste.

| Layer | Where | What it holds | Conference uses it? |
|---|---|---|---|
| **Tokens** | `web/src/app/globals.css` `@theme` | 8 color ramps × 15 steps, font families, display type sizes, `2xl` breakpoint | ⚠️ Values copied as literals, not referenced |
| **Components** | `web/src/components/ui/` | ~30 components (`SectionHeading`, `PrimaryCTA`, `Container`, forms, icons, motion) | ❌ Has its own 14 in `_components/` |
| **Documentation** | `web/src/app/(site)/design-system/page.tsx` (2,867 lines) | Live, browsable reference at `/design-system` | ❌ Documents nothing about the conference |

Two rules in `CLAUDE.md` enforce layers 2–3 — the **Top-Down UI Changes Rule** (styling
changes happen at the component level, never inline) and the **Design System Sync Rule**
(component changes update `/design-system` in the same changeset).

**Neither rule currently reaches `app/(conference)/`.** That is the actual problem this
document addresses. The conference route isn't badly built — it's built outside the
system that keeps the rest of the site coherent.

The intent to inherit was already there. `conferences/2026/page.tsx` opens with:

```js
// ── Design tokens ─────────────────────────────────────────
const BEIGE_30 = "#F4F1EA"; // page background (beige-30 from design system)
const PURPLE   = "#231769"; // --color-purple-140
const TEAL_60  = "#60D7E5"; // lighter teal (pulse dot, teal CTAs)
```

That is inheritance implemented by hand. The comments name the parent tokens. Only the
mechanism is missing.

---

## 2. The audit

### 2.1 Color — 79% is already the parent system

Every `#RRGGBB` in `app/(conference)/`, mapped against `globals.css`:

| Hex | Uses | Parent token | Status |
|---|---|---|---|
| `#50555A` | 14 | `gray-110` | ✅ exact match |
| `#231769` | 7 | `purple-140` | ✅ exact match |
| `#F4F1EA` | 6 | `beige-30` | ✅ exact match |
| `#969DA4` | 2 | `gray-80` | ✅ exact match |
| `#676D73` | 2 | `gray-100` | ✅ exact match |
| `#FFCC40` | 1 | `yellow-80` | ✅ exact match |
| `#60D7E5` | 1 | `teal-60` | ✅ exact match |
| `#09C0D7` | 1 | `teal-90` | ✅ exact match |
| `#1A1A1A` | 5 | — | ❌ genuinely new |
| `#0F0D0B` | 3 | — | ❌ genuinely new |
| `#EFEAE0` | 1 | — | ❌ near-duplicate of `beige-40` |

**34 of 43 occurrences (79%) are exact parent tokens written as literals.** The palettes
have not diverged. Only 9 occurrences across 3 values are new:

- **`#1A1A1A`** — near-black for headings on light backgrounds. No parent equivalent
  (`gray-130` is `#212529`, `gray-140` is `#16191B`). Legitimately conference-specific.
- **`#0F0D0B`** — warm near-black for the nav rail chrome. Legitimately new.
- **`#EFEAE0`** — FAQ open-state background. Differs from `beige-40` (`#EDE8DD`) by ~1%
  lightness. Almost certainly drift, not intent. **Recommend collapsing into `beige-40`
  rather than minting a token.**

### 2.2 Typography — this is where the real divergence lives

| | Conference | Main site |
|---|---|---|
| Font | Bricolage Grotesque (400–800) | Dela Gothic One (display) + Nunito (body) |
| Arbitrary `text-[Npx]` | **125 occurrences, 22 distinct** | **6 occurrences total** |
| Heading component | Local `SectionHeading`, single hardcoded ramp | Shared `SectionHeading`, 5 size × 4 color variants |

Full size distribution — note how it clusters into intent groups separated by 1px noise:

```
  9px  1 │ 10px  4 │ 12px  2 │ 13px  5 │ 14px 14 │ 15px 15
 16px 22 │ 17px 16 │ 18px 10 │ 19px  4 │ 20px  6 │ 22px  6
 24px  1 │ 26px  3 │ 28px  3 │ 30px  3 │ 32px  2 │ 34px  1
 36px  4 │ 40px  1 │ 48px  1 │ 56px  1
```

The 14/15, 16/17 and 18/19 pairs are the same design intent expressed twice. That is
what an unmanaged scale looks like after a few months of Figma-eyeballing.

The conference `SectionHeading` is explicit that the split was deliberate:

> "Conference-specific (Bricolage font, bespoke size ramp); intentionally separate from
> the main site's design-system SectionHeading component."

That decision was correct — the fonts genuinely differ. What's missing is that the
conference never got its own scale to replace the one it opted out of.

### 2.3 Weights and radii are already consistent

Good news, no action needed:

- **Weights:** `font-normal` (29), `font-semibold` (19), `font-bold` (8), `font-medium` (6)
  — a clean 4-step ramp, used consistently.
- **Radii:** `rounded-full` (15), `rounded-2xl` (13), `rounded-3xl` (6), plus 6 one-offs.
  Essentially a 3-step system with minor noise.

### 2.4 Where the work is, per file

| File | Hex | Sizes |
|---|---|---|
| `page.tsx` | 12 | 50 |
| `_components/ProgramSection.tsx` | 3 | 20 |
| `_components/CochairsSection.tsx` | 4 | 13 |
| `_components/SponsorsGrid.tsx` | 4 | 8 |
| `_components/FaqSection.tsx` | 7 | 7 |
| `_components/QuoteCard.tsx` | 2 | 7 |
| `_components/BenefitsHeadline.tsx` | 1 | 5 |
| `_components/SectionHeading.tsx` | 0 | 4 |
| `_components/ConferenceNav.tsx` | 3 | 4 |
| `_components/InstagramGrid.tsx` | 2 | 4 |
| `_components/PastConferencesMenu.tsx` | 2 | 2 |
| `_components/MobileNavMenu.tsx` | 2 | 1 |
| `layout.tsx` | 1 | 0 |
| `CountdownTimer.tsx`, `LogoBadge.tsx`, `PhotoTicker.tsx` | 0 | 0 |

`page.tsx` alone is 46% of the total. It is the single highest-leverage file.

---

## 3. The decision: a theme layer, not a fork

**Build a conference *theme* that inherits every parent color ramp unchanged, and adds
only what is genuinely conference-specific.**

A parallel design system would fork the palette. The audit says the palette isn't forked
— so forking it would *create* the divergence we're trying to prevent, and guarantee that
a future parent palette change silently desynchronises the conference site.

What the theme actually needs to add:

```css
/* Conference theme — inherits all parent color ramps unchanged */

/* 1. Font */
--font-conf: var(--font-bricolage), ui-sans-serif, sans-serif;

/* 2. The two genuinely new colors */
--color-conf-ink:    #1A1A1A;  /* headings on light backgrounds */
--color-conf-chrome: #0F0D0B;  /* nav rail / mobile menu */
/* (#EFEAE0 intentionally omitted — collapse into beige-40) */

/* 3. A real type scale — replaces 22 ad-hoc sizes with 9 steps */
--font-size-conf-2xs:     10px;
--font-size-conf-xs:      13px;
--font-size-conf-sm:      15px;
--font-size-conf-base:    17px;
--font-size-conf-lg:      19px;
--font-size-conf-xl:      22px;
--font-size-conf-2xl:     28px;
--font-size-conf-3xl:     34px;
--font-size-conf-display: 48px;
```

### How the 22 sizes collapse onto 9

| Token | px | Absorbs | Uses | Visual delta |
|---|---|---|---|---|
| `conf-2xs` | 10 | 9, 10 | 5 | 1 element grows 1px |
| `conf-xs` | 13 | 12, 13 | 7 | 2 elements grow 1px |
| `conf-sm` | 15 | 14, 15 | 29 | **14 elements grow 1px** |
| `conf-base` | 17 | 16, 17 | 38 | **22 elements grow 1px** |
| `conf-lg` | 19 | 18, 19 | 14 | **10 elements grow 1px** |
| `conf-xl` | 22 | 20, 22 | 12 | **6 elements grow 2px** |
| `conf-2xl` | 28 | 24, 26, 28, 30 | 10 | mixed ±2px |
| `conf-3xl` | 34 | 32, 34, 36 | 7 | mixed ±2px |
| `conf-display` | 48 | 40, 48, 56 | 3 | **mixed ±8px — review individually** |
| | | | **125** | |

⚠️ **This is not a zero-risk refactor, unlike the color sweep.** Roughly 60 elements shift
by 1px and a handful by more. That is the point — the drift is what we're removing — but
it must be done section-by-section with visual checks, not in one commit.

The `conf-display` row in particular (40/48/56 → 48) is too aggressive to apply blindly;
those three are almost certainly deliberate hero sizes and may each deserve their own step.
Decide that one at the browser, not in this table.

---

## 4. Guiding principles

These are the five that would have prevented the current drift.

**1. The conference inherits; it never redefines.**
A conference token may *alias* a parent token or add a genuinely new value. It may never
restate a parent value as a new literal. That single rule is what keeps one system from
becoming two.

**2. Divergence is typographic, not chromatic.**
Each year's identity lives in type, layout and imagery. The palette stays shared, so a
parent palette change propagates to every conference year for free.

**3. Every year is a skin, not a fork.**
2027 should be a token override plus new content — not a copied `_components/` directory.
Today's structure makes copying the path of least resistance. See Phase 4.

**4. An ad-hoc value is a bug report.**
A new `text-[Npx]` or raw `#hex` means either the scale is missing a step, or the design
drifted. Both deserve a moment's thought. Neither should be silent.

**5. The two `CLAUDE.md` rules apply to `(conference)` too.**
Top-Down UI Changes and Design System Sync currently stop at the route boundary. Extending
them is Phase 5, and it's what makes the rest of this durable.

---

## 5. The plan

Ordered by value-to-risk. Each phase is independently shippable and independently useful —
stopping after any phase leaves the codebase better than it started.

### Phase 0 — Land this document ✅
- [x] Write `docs/CONFERENCE-DESIGN-SYSTEM.md`
- [x] Add a pointer to it from `CLAUDE.md` and `docs/LAUNCH-PUNCHLIST.md`

### Phase 1 — Color tokens ✅ *(done 2026-08-15 — `c295ead`, `3e1d085`)*
- [x] Add `--color-conf-ink` and `--color-conf-chrome` to `@theme` in `globals.css`
- [x] Replace the 34 parent-matching literals with token classes / `var()` references
- [x] Collapse `#EFEAE0` → `beige-40` (open state verified: `rgb(237,232,221)` vs closed
      `rgb(244,241,234)` — distinction preserved)
- [x] Delete the hand-rolled `BEIGE_30` / `PURPLE` / `TEAL_60` consts from `page.tsx`
- [x] Replace `const ICON_GRAY = "#969DA4"` in `FaqSection.tsx` with `gray-80`
- [x] **Verified:** computed-color tally over every element on the page is identical
      before/after — 67 distinct entries at identical counts

**Added along the way:** `app/(conference)/_theme.ts`, the single inheritance point.
Eight components each declared their own `const PURPLE = "#231769"`-style block; they now
import `var()` references from one module, so the conference tracks the parent palette
automatically. **New conference code should import from `_theme.ts`, never re-type a hex.**

**One gotcha worth remembering:** CSS `var()` does **not** resolve in SVG presentation
attributes (`stroke="var(--x)"`, `fill="var(--x)"`) — it silently falls back to black. Four
call sites had to move to inline `style={{ stroke: … }}`. Watch for this in Phase 2/3.

**Verification method** (reusable for later phases): load the page under Playwright and
tally `getComputedStyle` color/background/border across every element, before and after.
A pure token swap must produce an identical tally. Note that `<script>`/`<link>` counts
drift with dev-server chunks, so compare the color buckets, not the raw element count.

### Phase 2 — Type scale *(real visual deltas — go section by section)*
- [ ] Add the 9 `--font-size-conf-*` tokens to `@theme`
- [ ] Decide the `conf-display` question (one step or three?) in the browser first
- [ ] Migrate one section per commit, in ascending risk order:
      `ConferenceNav` → `FaqSection` → `SponsorsGrid` → `CochairsSection` →
      `ProgramSection` → `page.tsx`
- [ ] Review each section at mobile + desktop before moving to the next
      (per `feedback_mobile_preview_playwright` — use Playwright MCP for mobile widths)

### Phase 3 — Component consolidation
- [ ] Give the conference `SectionHeading` size variants off the new scale, mirroring the
      shared component's variant API so the two feel like siblings
- [ ] Audit the 14 `_components/` for anything that duplicates `components/ui/`
      (`LogoImage`, `ArrowLinkButton` and the icon set are the likely overlaps)
- [ ] Promote genuinely shared pieces up to `components/ui/`; leave year-specific ones put

### Phase 4 — Make 2027 a skin *(do before 2027 work starts, not during)*
- [ ] Move year-agnostic components from `2026/_components/` to `(conference)/_components/`
- [ ] Leave only genuinely 2026-specific content and layout in the year folder
- [ ] Document what a new year requires: token override + content + the
      `CURRENT_CONFERENCE_YEAR` bump in `src/middleware.ts`

### Phase 5 — Close the governance gap
- [ ] Add a **Conference** section to `/design-system` documenting the theme tokens, the
      type scale and the conference components
- [ ] Extend the two `CLAUDE.md` rules to cover `app/(conference)/` explicitly
- [ ] Optional: an ESLint rule or CI grep failing on new raw hex / `text-[Npx]` under
      `app/(conference)/` — principle 4, mechanically enforced

---

## 6. What not to do

- **Don't duplicate the color ramps** into a conference-specific palette. That is the one
  move that would turn a manageable drift into a permanent fork.
- **Don't do Phase 2 in a single commit.** 125 call sites and ~60 elements shifting 1px is
  not reviewable in one diff.
- **Don't mint a token for `#EFEAE0`.** A 1% lightness difference from an existing token is
  drift; giving it a name makes it permanent.
- **Don't unify the fonts.** Bricolage vs. Dela Gothic is a real, deliberate brand
  distinction — it is the thing that *should* differ.
- **Don't batch this with a production deploy.** Netlify credits are limited (~20 builds
  /month); Phases 1–2 should accumulate on `staging` and ship together.

---

## 7. Open questions

1. **`conf-display`** — are 40/48/56 three deliberate hero sizes, or drift? Needs a look at
   the live page, not a decision in a table.
2. **Is `#1A1A1A` deliberate over `gray-130` (`#212529`)?** Shipped in Phase 1 as
   `--color-conf-ink`, preserving the exact value. If it turns out to be drift, collapsing it
   into `gray-130` is now a one-line change in `globals.css`.
3. **Does the 2027 site reuse the 2026 layout?** The answer determines how much of Phase 4
   is worth doing up front versus deferring until the design exists.
