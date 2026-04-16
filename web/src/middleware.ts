import { NextRequest, NextResponse } from "next/server";

// Update this when a new conference year begins.
// Also update the redirect in next.config.ts to match.
const CURRENT_CONFERENCE_YEAR = "2026";

const CONFERENCE_HOSTS = ["uxhiconference.com", "www.uxhiconference.com"];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";

  if (CONFERENCE_HOSTS.includes(hostname)) {
    const { pathname } = request.nextUrl;

    // Rewrite all paths to /conferences/:year/[path], preserving the URL bar.
    // e.g. uxhiconference.com/agenda → serves /conferences/2026/agenda
    //      uxhiconference.com/       → serves /conferences/2026/
    const conferencePath =
      pathname === "/"
        ? `/conferences/${CURRENT_CONFERENCE_YEAR}/`
        : `/conferences/${CURRENT_CONFERENCE_YEAR}${pathname}`;

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
