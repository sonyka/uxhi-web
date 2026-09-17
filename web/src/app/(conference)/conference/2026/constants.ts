// Shared 2026 conference constants.
//
// The ticket URL was previously written out at three call sites (twice inline in
// page.tsx, once as a local const in ProgramSection) — easy to update two of
// three when the link changes.

export const TICKETS_URL = "https://givebutter.com/uxhi-con-26-tickets";
export const SPONSOR_URL = "https://givebutter.com/uxhi-con-2026-sponsor";

// The venue, and the map it points at. Written inline twice in page.tsx before
// the programme intro wanted it a third time — the same drift the ticket URL
// above was pulled out to stop.
export const VENUE_NAME = "Entrepreneurs Sandbox";
export const VENUE_ADDRESS = "643 Ilalo St, Honolulu, HI";
export const VENUE_MAP_URL = "https://maps.app.goo.gl/zBHS4EXnXWuhysEu5";

// The day itself, as it should read. The long date is also written out in the
// agenda's eyebrow; the running time is new with the sidebar, and is the whole
// day rather than the first and last sessions — doors at 8:00, and the sheet
// has everyone out by 4:30.
export const EVENT_DATE_LONG = "Saturday, October 17, 2026";
export const EVENT_TIME = "8:00 am–4:30 pm";

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
// Listed in the order the sections appear on the page, so the nav reads as a
// map of the scroll rather than an arbitrary set of links. About moved down
// past the venue and the FAQ when the section did.
export const NAV_ITEMS = [
  ["Moʻolelo", "#moolelo"],
  ["UXHICon", "#program"],
  ["Speakers", "#speakers"],
  ["Lineup", "#agenda"],
  ["The Venue", "#venue"],
  ["FAQ", "#faq"],
  ["About", "#about"],
  ["Sponsors", "#sponsors"],
] as const;

/** Just the anchor names: ["moolelo", "program", "agenda", ...]. */
export const SECTION_ANCHORS = NAV_ITEMS.map(([, anchor]) => anchor.slice(1));
