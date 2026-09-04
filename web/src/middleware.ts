import { NextRequest, NextResponse } from "next/server";
import { SECTION_ANCHORS } from "@/app/(conference)/conference/2026/constants";

// Update this when a new conference year begins.
// Also update the redirect in next.config.ts to match.
const CURRENT_CONFERENCE_YEAR = "2026";

const CONFERENCE_HOSTS = ["uxhiconference.com", "www.uxhiconference.com"];

/**
 * Host routing for uxhiconference.com.
 *
 *   uxhiconference.com/            → /conference/2026/       (a real Next route)
 *   uxhiconference.com/agenda      → /#agenda  (a section, not a route)
 *   uxhiconference.com/2025/       → /conferences/2025/      (frozen files)
 *   uxhiconference.com/2025/lineup → /conferences/2025/lineup
 *
 * The year alone is the archive URL, so no spelling of the word "conference"
 * appears in it at all — the hostname already says that. The plural page URLs
 * redirect here rather than answering alongside the short ones, so each archive
 * page has exactly one address.
 *
 * Note the two destinations. The current year is a real route and is reached
 * under the singular public path. An archive is a folder of frozen files under
 * public/conferences/, and on Netlify the CDN serves public/ *before* the Next
 * handler runs — the server bundle does not carry those files at all — so an
 * archive has to be sent to the path the CDN can answer, which is the plural
 * one the folder uses.
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  if (!CONFERENCE_HOSTS.includes(hostname)) {
    return NextResponse.next();
  }

  // `trailingSlash: true` normalises the path before middleware sees it, so in
  // production this arrives as "/robots.txt/" while `next dev` leaves it as
  // "/robots.txt". Every test below reads a bare path, so strip the slash once
  // here rather than accounting for it in each one.
  //
  // This is not hypothetical tidiness. It is why robots.txt was rewritten into
  // the conference tree and answered with no rules at all on the live domain,
  // and why a shared asset 404'd: both guards compared against a path that
  // never matched in production, and both looked correct in dev.
  const raw = request.nextUrl.pathname;
  const pathname = raw.length > 1 && raw.endsWith("/") ? raw.slice(0, -1) : raw;

  // An archive page under its plural path moves to the short one. Only the
  // index and a top-level .html page: the pattern cannot reach
  // /conferences/:year/assets/..., which the frozen sites request by exactly
  // that path and which must keep resolving where it stands.
  //
  // The current year is excluded because it has no frozen index to redirect to
  // — public/conferences/2026/ holds assets only.
  const pluralPage = pathname.match(/^\/conferences\/(\d{4})(?:\/([^/]+)\.html)?$/);
  if (pluralPage && pluralPage[1] !== CURRENT_CONFERENCE_YEAR) {
    const [, year, page] = pluralPage;
    const url = request.nextUrl.clone();
    url.pathname = page ? `/${year}/${page}` : `/${year}`;
    return NextResponse.redirect(url, 308);
  }

  // Anything else already carrying a full path under either spelling is passed
  // through, so the middleware never doubles the prefix (e.g. /conference/2026/
  // assets → /conference/2026/conference/2026/assets).
  if (pathname.startsWith("/conferences/") || pathname.startsWith("/conference/")) {
    return NextResponse.next();
  }

  // Crawler files answer for the hostname itself and must not be rewritten into
  // the conference tree — /robots.txt would otherwise resolve to
  // /conferences/YYYY/robots.txt, which does not exist, and the host would
  // silently have no robots rules at all.
  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") {
    return NextResponse.next();
  }

  // A section of the current year is an anchor on its one page, not a route, so
  // /agenda has to become /#agenda — a rewrite cannot do this, because the
  // fragment never reaches the server. Without it the host answered 404 for a
  // section that is right there on the page and is named in the nav.
  //
  // Named rather than matched loosely: sending every unknown path to an anchor
  // would turn a typo into a silent homepage instead of a 404, and would swallow
  // any real page a later year adds.
  //
  // Temporary, not permanent: a year owns its own sections, and 2027 renaming
  // one should not have to outlive a cached 308 in someone's browser.
  const section = pathname.slice(1);
  if (SECTION_ANCHORS.includes(section)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.hash = section;
    return NextResponse.redirect(url, 307);
  }

  const yearMatch = pathname.match(/^\/(\d{4})(\/.*)?$/);

  // A request for a file is a request for a file, whatever the host. Shared
  // assets live at the path they are written as, and folding one into the
  // year's tree asks for a path where nothing exists.
  //
  // Checked after the year match, not before: a year-prefixed asset
  // (/2025/assets/logo.png) still belongs to that archive.
  if (!yearMatch && /\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  let conferencePath: string;
  if (yearMatch) {
    const [, year, rest] = yearMatch;
    conferencePath =
      year === CURRENT_CONFERENCE_YEAR
        ? `/conference/${year}${rest ?? "/"}`
        : `/conferences/${year}${rest ?? "/"}`;
  } else {
    conferencePath =
      pathname === "/"
        ? `/conference/${CURRENT_CONFERENCE_YEAR}/`
        : `/conference/${CURRENT_CONFERENCE_YEAR}${pathname}`;
  }

  const url = request.nextUrl.clone();
  url.pathname = conferencePath;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Run on all paths except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
