// ── Conference theme ──────────────────────────────────────────────────
//
// The conference site is a THEME LAYER over the parent UXHI design system,
// not a separate design system. Every value below either references a parent
// token or is a genuinely conference-specific addition.
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
export const GRAY_110 = "var(--color-gray-110)"; // #50555A — body copy
export const GRAY_100 = "var(--color-gray-100)"; // #676D73 — secondary copy
export const GRAY_80 = "var(--color-gray-80)"; // #969DA4 — icons, muted labels
export const YELLOW_80 = "var(--color-yellow-80)"; // #FFCC40 — shaka gold
export const BEIGE_30 = "var(--color-beige-30)"; // #F4F1EA — page background
export const BEIGE_40 = "var(--color-beige-40)"; // #EDE8DD — raised/active surface

/** Conference-specific addition — no parent equivalent exists. */
export const CONF_INK = "var(--color-conf-ink)"; // #1A1A1A — headings on light
// (A `conf-chrome` #0F0D0B token existed briefly for a dark nav rail. The only
//  component using it was never mounted, so both were removed — if a dark nav
//  returns, re-add the token then rather than carrying an unused one.)

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
export const TYPE = {
  /** Oversized flowing headline — BenefitsHeadline only. */
  display: "text-[32px] sm:text-[36px] md:text-[40px] lg:text-[48px] xl:text-[56px]",
  /** Page hero headlines. Intentionally dips at md (narrower column). */
  hero: "text-[26px] md:text-[22px] lg:text-[30px] xl:text-[36px]",
  /** Lead paragraph under a hero or section title. */
  lead: "text-[16px] sm:text-[17px] md:text-[19px] lg:text-[22px] xl:text-[28px]",
  /** Standard section intro / body copy. The most-used role. */
  body: "text-[16px] lg:text-[17px] xl:text-[18px]",
  /** Uppercase eyebrow label above a section title. */
  eyebrow: "text-[13px] md:text-[14px]",
  /** Interactive chrome — pill buttons (44px tall) and nav/menu links. */
  ui: "text-[15px]",
} as const;

// Deliberately NOT a role: a generic 14px "meta". The 14px sites look uniform
// in a frequency count but split three ways on inspection — some are ramp bases
// with interleaved utilities (the sidebar's
// `text-[14px] leading-[1.7] lg:text-[16px] … xl:text-[20px]`), some are card
// subtitles, some are nav. Collapsing them would flatten real ramps. Same
// reason CochairsSection's bio copy keeps its own 15px rather than using
// `ui` — it shares a size with the buttons, not an intent.
