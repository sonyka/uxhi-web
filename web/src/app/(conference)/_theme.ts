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

/** Conference-specific additions — no parent equivalent exists. */
export const CONF_INK = "var(--color-conf-ink)"; // #1A1A1A — headings on light
export const CONF_CHROME = "var(--color-conf-chrome)"; // #0F0D0B — nav chrome
