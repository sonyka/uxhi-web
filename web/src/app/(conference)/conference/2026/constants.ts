// Shared 2026 conference constants.
//
// The ticket URL was previously written out at three call sites (twice inline in
// page.tsx, once as a local const in ProgramSection) — easy to update two of
// three when the link changes.

export const TICKETS_URL = "https://givebutter.com/uxhi-con-26-tickets";
export const SPONSOR_URL = "https://givebutter.com/uxhi-con-2026-sponsor";

// The two profiles, and the handles as they should read. Named once because the
// footer, the "Stay in the loop" copy and its follow buttons all point here, and
// because the handles differ per network — @uxhicommunity on Instagram,
// @uxhi on LinkedIn — which is easy to mix up when they are written out inline.
export const IG_PROFILE = "https://www.instagram.com/uxhicommunity/";
export const IG_HANDLE = "@uxhicommunity";
export const LINKEDIN_PROFILE = "https://www.linkedin.com/company/uxhi/";
export const LINKEDIN_HANDLE = "@uxhi";

// Section anchor nav items — shared by the desktop header nav, the mobile strip
// and the middleware.
//
// The 2026 conference is one page, so every section is an anchor on it rather
// than a route. That is why the middleware needs this list: uxhiconference.com/
// agenda is a URL people type and share, and without somewhere to send it the
// host answered 404 for a section that plainly exists.
export const NAV_ITEMS = [
  ["Moʻolelo", "#moolelo"],
  ["UXHICon", "#program"],
  ["Agenda", "#agenda"],
  ["About Us", "#about"],
  ["The Sandbox", "#venue"],
  ["FAQ", "#faq"],
  ["Sponsors", "#sponsors"],
] as const;

/** Just the anchor names: ["moolelo", "program", "agenda", ...]. */
export const SECTION_ANCHORS = NAV_ITEMS.map(([, anchor]) => anchor.slice(1));
