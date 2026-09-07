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
 * A page's value is whatever paints the top of its viewport — not the body
 * background, and not the ground its <main> sets either. On the interior pages
 * <main> is beige-10, but HeroSection paints beige-30 over it, and the hero is
 * what a visitor's status bar sits against.
 */

/**
 * beige-30 — the body ground, and the ground HeroSection paints.
 *
 * Home, the conference shell, and all seven interior pages. The interior pages
 * declared beige-10 until HeroSection took ownership of the hero ground; there
 * is no beige-10 export any more because nothing opens on beige-10.
 */
export const viewportBeige30: Viewport = { themeColor: "#F4F1EA" };

/** teal-10 — the State of UX report. */
export const viewportTeal10: Viewport = { themeColor: "#F1FDFB" };
