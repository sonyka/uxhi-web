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
| `_components/ConferenceNav.tsx` (deleted Phase 3 — dead code) | 3 | 4 |
| `_components/InstagramGrid.tsx` | 2 | 4 |
| `_components/PastConferencesMenu.tsx` | 2 | 2 |
| `_components/MobileNavMenu.tsx` | 2 | 1 |
| `layout.tsx` | 1 | 0 |
| `LogoBadge.tsx`, `PhotoTicker.tsx` (+ `CountdownTimer.tsx`, deleted Phase 3) | 0 | 0 |

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

/* 2. The genuinely new colors */
--color-conf-ink:    #1A1A1A;  /* headings on light backgrounds */
/* (#EFEAE0 intentionally omitted — collapsed into beige-40 in Phase 1) */
/* (conf-chrome #0F0D0B was added in Phase 1 and removed in Phase 3 — its only
    consumer, ConferenceNav, turned out to be dead code) */

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

### ⚠️ Correction — the flat-scale table below was wrong

> The original version of this section proposed collapsing the 22 sizes onto 9 fixed steps
> (10/13/15/17/19/22/28/34/48). **That was based on a flat frequency count, which treated
> responsive ramps as if they were duplicate values.** They aren't.
>
> `BenefitsHeadline` is a *single element*:
> `text-[32px] sm:text-[36px] md:text-[40px] lg:text-[48px] xl:text-[56px]`.
> Those are the 40/48/56 the table wanted to merge into one `conf-display: 48px` — doing so
> would have flattened a deliberate responsive ladder, not removed drift.
>
> **81 of the 125 occurrences are ramp members.** The real duplication was one *ramp*
> copy-pasted across files, not one *size* used at random.

### The actual structure: semantic roles, each owning a ramp

| Role | Ramp | Elements |
|---|---|---|
| `body` | `16 → lg:17 → xl:18` | **10, across 6 files** |
| `ui` | `15` (pill buttons + nav/menu links) | 11 |
| `eyebrow` | `13 → md:14` | 3 |
| `lead` | `16 → sm:17 → md:19 → lg:22 → xl:28` | 2 |
| `hero` | `26 → md:22 → lg:30 → xl:36` | 2 |
| `display` | `32 → sm:36 → md:40 → lg:48 → xl:56` | 1 |

Note `hero` *drops* from 26px to 22px at `md` before climbing again — the column narrows
there. Reversals like that are design decisions, and a flat scale erases them.

Because each role reproduces its ramp exactly, this is a **zero visual change** refactor —
the same as the Phase 1 color swap, not the risky rewrite the old table described.

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

### Phase 2 — Type roles ✅ *(done 2026-08-15 — `ad2859a`)*
- [x] Investigate the `conf-display` question first — **this is what surfaced that the flat
      scale was the wrong model entirely** (see the correction above)
- [x] Add six semantic roles to `TYPE` in `_theme.ts`, each owning a full responsive ramp
- [x] Apply across 8 files — inline `text-[Npx]` in components: **125 → 55**
- [x] **Verified:** computed font-size tally scoped to `<main>` identical before/after at
      390px and 1440px. (Scope to `<main>` — the Next dev overlay adds elements outside it
      and produces phantom deltas.)

**Not extracted, on purpose:** a generic 14px `meta` role. Those sites look uniform in a
frequency count but split three ways on inspection — ramp bases with interleaved utilities
(`text-[14px] leading-[1.7] lg:text-[16px] … xl:text-[20px]`), card subtitles, and nav.
`CochairsSection`'s bio copy likewise keeps its own 15px: it shares a *size* with the pill
buttons but not an *intent*. Both decisions are documented in `_theme.ts`.

The remaining 55 inline sizes are genuine one-offs (the nav rail's 10px labels, the
QuoteCard refrain, `SectionHeading`'s own ramp — already centralised in its component).
**Add a role when a ramp is used more than once; naming a single use is false abstraction.**

### Phase 3 — Component consolidation *(partly done 2026-08-15 — `0d7dfde`)*
- [x] **Delete dead components** — `ConferenceNav`, `CountdownTimer`. Both from `363eeb4`
      (the original coming-soon page), neither imported: 189 lines that never rendered.
      Dropped `--color-conf-chrome` with them — `ConferenceNav` was its only consumer.
- [x] **Extract `ConferenceButton`** from six call sites sharing one class string, a
      hand-written `<img>`, and an eslint-disable each. Two variants (primary purple/white
      with inverted icon, secondary teal/black) + `iconPosition`. Lives at
      `(conference)/_components/` since nothing about it is year-specific, so Phase 4 won't
      need to move it. Verified identical on every property including rendered width to 0.01px.
- [x] **Add `2026/constants.ts`** — the ticket URL had been written out at three call sites.
- [ ] Icon consolidation — 16 inline `<img>` across 9 SVGs vs. `components/ui/icons/`.
      Real payoff: the `grayscale(1) brightness(0.4)` tint hack exists in three places
      *because* they're `<img>`; React SVG icons using `currentColor` would remove it and let
      icons inherit the Phase 1 tokens.
- [ ] Conference `SectionHeading` size variants mirroring the parent's variant API

**Examined and deliberately declined:**

- **`LogoImage`** — looks like a duplicate of the sponsor logo treatment, isn't. The shared
  component uses `next/image` with `opacity-50/70` and self-hover; the sponsor grid uses
  `<img>` with `group-hover` (the *card* is the hover target), Sanity CDN sizing, and
  brightness/contrast tuning. Merging means bolting a group-hover variant onto the shared
  component and dropping `next/image` — regression risk to a live grid for little gain.
- **`SectionEyebrow`** — shared is `text-xl`/`purple-120`; conference is 13–14px/`purple-140`
  with wider tracking. That's a variant at best, and low value.

Both are the same trap as the 14px `meta` role in Phase 2: **shared appearance is not shared
purpose.** Worth re-reading before consolidating anything else.

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

1. ~~**`conf-display`** — are 40/48/56 three deliberate hero sizes, or drift?~~ **Answered:**
   neither. They are three breakpoints of one element's ramp. Investigating this is what
   caught the flat-scale error — worth remembering that the question was only visible from
   the code, not from the frequency table.
2. **Is `#1A1A1A` deliberate over `gray-130` (`#212529`)?** Shipped in Phase 1 as
   `--color-conf-ink`, preserving the exact value. If it turns out to be drift, collapsing it
   into `gray-130` is now a one-line change in `globals.css`.
3. **Does the 2027 site reuse the 2026 layout?** The answer determines how much of Phase 4
   is worth doing up front versus deferring until the design exists.
