// ── 2026 conference theme ─────────────────────────────────────────────
//
// THIS FILE BELONGS TO 2026 ONLY. Each conference year is a new design over
// the same parent UXHI design system — 2024, 2025 and 2026 share no layout,
// type or mood. 2027 gets its own conferences/2027/theme.ts; it does not
// extend or import this one. Nothing is shared between years except the
// parent tokens in app/globals.css.
//
// So this is a THEME LAYER over the parent design system, not a design system
// of its own. Every value below either references a parent token or is a
// genuinely 2026-specific addition.
//
// ⛔ Never restate a parent value as a raw hex literal here or in components.
//    Before this module existed, eight separate files each declared their own
//    `const PURPLE = "#231769"` — that is inheritance by copy-paste, and it
//    silently desynchronises the moment the parent palette changes.
//
// These are CSS `var()` references, so they resolve at runtime against the
// @theme block in app/globals.css and track the parent automatically.
// Use them in `style={{ }}` props; in className strings prefer the Tailwind
// token class directly (`text-gray-110`, `bg-beige-30`).
//
// See docs/CONFERENCE-DESIGN-SYSTEM.md for the audit and migration plan.

/** Parent design-system tokens — referenced, never copied. */
export const PURPLE = "var(--color-purple-140)"; // #231769
export const TEAL_90 = "var(--color-teal-90)"; // #09C0D7 — primary teal on light
export const TEAL_60 = "var(--color-teal-60)"; // #60D7E5 — pulse dot, teal CTAs
export const TEAL_40 = "var(--color-teal-40)"; // #9AE6EE — avatar stack, pau hana tear-off, announcement strip
export const PURPLE_100 = "var(--color-purple-100)"; // #412BC2 — bright purple, avatar stack
export const GRAY_120 = "var(--color-gray-120)"; // #383D42 — body copy on beige
export const GRAY_110 = "var(--color-gray-110)"; // #50555A — body copy on white
export const GRAY_100 = "var(--color-gray-100)"; // #676D73 — secondary copy
export const GRAY_80 = "var(--color-gray-80)"; // #969DA4 — icons, muted labels
export const YELLOW_80 = "var(--color-yellow-80)"; // #FFCC40 — shaka gold
export const BEIGE_30 = "var(--color-beige-30)"; // #F4F1EA — page background
export const BEIGE_40 = "var(--color-beige-40)"; // #EDE8DD — raised/active surface
export const BEIGE_50 = "var(--color-beige-50)"; // #E5DED0 — pattern on a beige card
export const ORANGE_130 = "var(--color-orange-130)"; // #A62D00 — agenda room label

// No year-specific color tokens. 2026 draws entirely from the parent ramps —
// use `text-gray-140` for headings on light surfaces.
//
// Two candidates didn't survive scrutiny:
//   • conf-ink #1A1A1A — 6/765 RGB from gray-140 (#16191B); contrast on white
//     17.40 vs 17.66, i.e. imperceptible and marginally better. Collapsed.
//   • conf-chrome #0F0D0B — a dark nav rail colour whose only consumer turned
//     out to be a component that was never mounted. Removed with it.
//
// Add a year token only when no parent ramp is close. "Close" means compare
// the numbers, not the swatches.

// ── Type roles ────────────────────────────────────────────────────────
//
// Each role owns a full RESPONSIVE RAMP, not a single size. That is the
// unit the design actually works in: `body` is one decision expressed
// across three breakpoints, and it was copy-pasted into six files before
// this existed.
//
// ⚠️ Do not "simplify" a ramp by flattening it to one value. `hero` drops
//    from 26px to 22px at md on purpose — the column narrows there. Those
//    reversals are design, not drift.
//
// Add a role when a size ramp is used more than once. Genuinely one-off
// sizes (the QuoteCard refrain, the nav rail's 10px labels) stay inline —
// naming a single use is false abstraction.
/**
 * Inline hyperlink treatment. A dotted rule in a lighter grey rather than a
 * solid underline in the link colour — the line marks the link without
 * competing with the label, which matters on the teal and beige panels where
 * a solid purple rule reads as heavy.
 *
 * Pair with `style={{ color: PURPLE }}`; the decoration colour is set here so
 * it stays lighter than whatever colour the label takes.
 */
export const LINK =
  "underline decoration-dotted decoration-gray-80 underline-offset-2 hover:opacity-70 transition-opacity";

// How a role wraps is part of the role, the same way its ramp is. A headline
// set at 56px shows a one-word last line to everyone; the same rag in 16px body
// copy is invisible, and the reader's viewport is an arbitrary width anyway.
// So the display roles balance and the prose roles only avoid the runt:
// `text-balance` above, `text-pretty` from `lead` down. The chrome roles —
// eyebrow, nav, ui — are labels of a few words and take neither.
//
// Both are ignored where unsupported, and neither is a substitute for the
// measure: prose here carries max-w-[62ch], which is what makes the rag
// predictable in the first place.
export const TYPE = {
  /** Oversized flowing headline — BenefitsHeadline only. */
  display:
    "text-[32px] sm:text-[36px] md:text-[40px] lg:text-[48px] xl:text-[56px] font-normal leading-[1.1] tracking-[-0.02em] text-balance",
  /** Page hero headlines. Intentionally dips at md (narrower column). */
  hero:
    "text-[26px] md:text-[22px] lg:text-[30px] xl:text-[36px] font-semibold leading-[1.2] tracking-[-0.02em] text-balance",
  /** Section titles — Moʻolelo, The Venue, FAQs, Meet the Organizers. Dips at
   *  md for the same reason hero does: the column narrows there. */
  sectionTitle:
    "text-[24px] md:text-[20px] lg:text-[26px] xl:text-[32px] font-semibold leading-[1.3] tracking-[-0.02em] text-balance",
  /** The name of an event in the sidebar rail. Two of them now — the
   *  conference and the pau hana — which is what earned this a role; it was
   *  the same class string written twice in page.tsx.
   *
   *  Stepped down from a 22px top (2026-09-24). At 22 the rail's two names
   *  were the largest type on the page after the hero, competing with the
   *  headline they sit beside rather than anchoring the facts under them. */
  railTitle: "text-[16px] lg:text-[18px] xl:text-[20px] font-bold leading-[1.3]",
  /** A panel or drawer heading — one step under a section title. */
  panelTitle:
    "text-[20px] md:text-[22px] font-semibold leading-[1.25] tracking-[-0.01em] text-balance",
  /** The name of one item in a list: an agenda session, a side-programme card,
   *  a sponsor. Three components had typed this ramp out separately, and the
   *  side programme's copy carried a comment explaining that it was meant to
   *  match the agenda's exactly — which is a role asking to exist. */
  itemTitle:
    "text-[16px] md:text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-balance",
  /** Lead paragraph under a hero or section title. Pretty rather than balance:
   *  a lead here runs to several lines inside a 62ch measure, and balancing a
   *  block that long narrows it against the measure the section already set. */
  lead:
    "text-[16px] sm:text-[17px] md:text-[19px] lg:text-[22px] xl:text-[28px] font-normal leading-[1.4] tracking-[-0.02em] text-pretty",
  /** Standard section intro / body copy. The most-used role. */
  body: "text-[16px] lg:text-[17px] xl:text-[18px] font-normal leading-[1.4] text-pretty",
  /** Body copy in a denser place than a section — a card, or a meta line
   *  beside a logo. One step under `body` the whole way up. */
  bodyCompact: "text-[15px] lg:text-[16px] xl:text-[17px] font-normal leading-[1.5] text-pretty",
  /** A supporting line attached to something else: a person's title under
   *  their name, a note under a heading. Two steps under `body`, one over
   *  `fine`, which is where copy stops being a caveat and starts being read. */
  caption: "text-[14px] lg:text-[15px] xl:text-[16px] font-normal leading-[1.5] text-pretty",
  /** Fine print sitting under body copy — terms, conditions, caveats.
   *  A step below `caption` at every breakpoint, so the ramps stay parallel. */
  fine: "text-[13px] lg:text-[14px] xl:text-[15px] font-normal leading-[1.5] text-pretty",
  /** Uppercase eyebrow label above a section title. */
  eyebrow: "text-[13px] md:text-[14px] font-bold uppercase tracking-[0.08em]",
  /** Header section-anchor nav — desktop row and the mobile scroll strip. */
  nav: "text-[15px] font-medium",
  /** Interactive chrome — pill buttons, footer links, menu items. */
  ui: "text-[16px] font-medium",
} as const;

// Deliberately NOT a role: a generic 14px "meta". The 14px sites look uniform
// in a frequency count but split three ways on inspection — some are ramp bases
// with interleaved utilities (the sidebar's
// `text-[14px] leading-[1.7] lg:text-[16px] … xl:text-[20px]`), some are card
// subtitles, some are nav. Collapsing them would flatten real ramps. Same
// reason CochairsSection's bio copy keeps its own 15px rather than using
// `ui` — it shares a size with the buttons, not an intent.
