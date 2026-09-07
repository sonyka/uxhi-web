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
 * A page's value is whatever paints the top of its viewport, which is the hero
 * rather than the body — HeroSection paints its own ground, so a page's <main>
 * is not the last word on what sits under the status bar. On the site as it
 * stands the two agree: every beige ground is beige-30.
 */

/**
 * beige-30 — the body ground, the ground HeroSection paints, and now every
 * beige ground on the site.
 *
 * Home, the conference shell, and all seven interior pages. The interior pages
 * declared beige-10 until the beige grounds were unified; there is no beige-10
 * export any more because nothing opens on beige-10.
 */
export const viewportBeige30: Viewport = { themeColor: "#F4F1EA" };

/** teal-10 — the State of UX report. */
export const viewportTeal10: Viewport = { themeColor: "#F1FDFB" };
