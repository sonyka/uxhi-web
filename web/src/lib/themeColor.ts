import type { Viewport } from "next";

/**
 * Per-route `theme-color`, which iOS paints behind the dynamic island and
 * Safari's bottom toolbar.
 *
 * It has to be server-rendered per route rather than set once and corrected in
 * the browser: iOS Safari reads theme-color when the document loads and does
 * not reliably honour later changes to it. ThemeColorSync still runs — it keeps
 * the strip matched while you scroll on the browsers that do listen — but the
 * value a page opens with has to be right without it.
 *
 * The hexes are restated rather than aliased because this is browser chrome
 * outside the document: it never sees the stylesheet, so it cannot read a CSS
 * variable. Each one names the token it mirrors; keep them in step.
 *
 * A page's value is whatever paints the top of its viewport, which is the
 * ground its <main> sets — not the body background.
 */

/** beige-30 — the body ground. Home and the conference shell. */
export const viewportBeige30: Viewport = { themeColor: "#F4F1EA" };

/** beige-10 — the ground every interior page's <main> sets. */
export const viewportBeige10: Viewport = { themeColor: "#FDFBF7" };

/** teal-10 — the State of UX report. */
export const viewportTeal10: Viewport = { themeColor: "#F1FDFB" };
