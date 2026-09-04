import { NextRequest, NextResponse } from "next/server";

// Update this when a new conference year begins.
// Also update the redirect in next.config.ts to match.
const CURRENT_CONFERENCE_YEAR = "2026";

const CONFERENCE_HOSTS = ["uxhiconference.com", "www.uxhiconference.com"];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";

  if (CONFERENCE_HOSTS.includes(hostname)) {
    const { pathname } = request.nextUrl;

    // Static assets (images, SVGs, etc.) are stored under /conferences/YYYY/assets/
    // — the folder keeps the plural even though the public path is singular, so
    // the archived sites' baked asset references keep resolving. If the browser
    // already resolved a full path under either spelling, pass it through
    // unchanged to avoid the middleware doubling the prefix (e.g.
    // /conference/2026/assets → /conference/2026/conference/2026/assets).
    if (pathname.startsWith("/conferences/") || pathname.startsWith("/conference/")) {
      return NextResponse.next();
    }

    // Crawler files answer for the hostname itself and must not be rewritten
    // into the conference tree — /robots.txt would otherwise resolve to
    // /conferences/YYYY/robots.txt, which does not exist, and the host would
    // silently have no robots rules at all.
    if (pathname === "/robots.txt" || pathname === "/sitemap.xml") {
      return NextResponse.next();
    }

    // uxhiconference.com/2025/[path] → /conference/2025/[path]  (year archive)
    // uxhiconference.com/[path]      → /conference/2026/[path]  (current year)
    const yearMatch = pathname.match(/^\/(\d{4})(\/.*)?$/);

    // A request for a file is a request for a file, whatever the host. Shared
    // assets live at the path they are written as — /images/nav/glyph-linkedin.svg
    // is served from public/ — and folding one into the year's tree asks for
    // /conference/2026/images/nav/glyph-linkedin.svg, where nothing exists. That
    // is how the LinkedIn mark came to 404 in the footer, the Pau Hana CTA and
    // every speaker drawer at once.
    //
    // Checked after the year match, not before: a year-prefixed asset
    // (/2025/assets/logo.png) still belongs to that archive and has to keep
    // being rewritten into it.
    const isFile = !yearMatch && /\.[^/]+$/.test(pathname);
    if (isFile) {
      return NextResponse.next();
    }

    const conferencePath = yearMatch
      ? `/conference/${yearMatch[1]}${yearMatch[2] ?? "/"}`
      : pathname === "/"
        ? `/conference/${CURRENT_CONFERENCE_YEAR}/`
        : `/conference/${CURRENT_CONFERENCE_YEAR}${pathname}`;

    const url = request.nextUrl.clone();
    url.pathname = conferencePath;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all paths except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
