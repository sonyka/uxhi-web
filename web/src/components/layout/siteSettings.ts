/**
 * The header's call-to-action button.
 *
 * This was a forty-line object carrying a logo, a site name, a main
 * navigation, a footer navigation, a contact email and social links. None of
 * it was read. Header takes `settings` and uses exactly one field —
 * `ctaButton` — and Footer takes no props at all and owns its own links.
 *
 * That is worse than clutter: the unread mainNavigation said "Find Experts"
 * while the rendered nav said "Find a pro", and its links still pointed at
 * /find-ux-pro after the directory moved. Anyone editing it to fix the nav
 * would have changed nothing and been left wondering why.
 *
 * The real navigation lives in `defaultNavItems` in Navbar.tsx, and the
 * footer's links live in Footer.tsx. This file is only what Header is
 * genuinely given.
 *
 * It lives here rather than in the (site) layout because the 404 needs it too:
 * app/not-found.tsx renders inside the ROOT layout, so it mounts its own
 * Header and would otherwise need a second copy.
 */
export const siteSettings = {
  ctaButton: { label: "Join us", url: "/join" },
};
