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
