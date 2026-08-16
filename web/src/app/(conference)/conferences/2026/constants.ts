// Shared 2026 conference constants.
//
// The ticket URL was previously written out at three call sites (twice inline in
// page.tsx, once as a local const in ProgramSection) — easy to update two of
// three when the link changes.

const ASSETS = "/conferences/2026/assets";

export const TICKETS_URL = "https://givebutter.com/uxhi-con-26-tickets";
export const SPONSOR_URL = "https://givebutter.com/uxhi-con-2026-sponsor";

/** Icon paths used by ConferenceButton. Other components still inline theirs —
 *  consolidating every icon is a separate Phase 3 item. */
export const ICON = {
  shaka: `${ASSETS}/icons/icon-shaka.svg`,
  heart: `${ASSETS}/icons/icon-hand-holding-heart.svg`,
  arrowRight: `${ASSETS}/icons/icon-arrow-small-right.svg`,
} as const;
