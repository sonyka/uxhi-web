import type { MetadataRoute } from "next";
import { headers } from "next/headers";

/**
 * The list of pages we are asking search engines to look at, served at
 * /sitemap.xml.
 *
 * Host-aware for the same reason robots.ts is: one build answers on several
 * hostnames. A sitemap is a set of absolute URLs, so a single hardcoded domain
 * would have uxhiconference.com handing out a list of uxhi.community pages —
 * cross-domain entries, which Google ignores at best.
 *
 * The conference gets nothing rather than something wrong. Its pages are frozen
 * static archives plus a current year served through a rewrite, and enumerating
 * them is a separate job from this one.
 *
 * No lastModified. Next would happily stamp every entry with the build time,
 * which claims the whole site changed whenever anything did; a lastmod that is
 * always today is a lastmod nobody can use. Better to say nothing than to say
 * something untrue about all nine pages at once.
 */
const COMMUNITY_HOSTS = ["uxhi.community", "www.uxhi.community"];
const CONFERENCE_HOSTS = ["uxhiconference.com", "www.uxhiconference.com"];

/**
 * Every page meant to be found, and nothing else.
 *
 * Absent on purpose:
 * - /studio — a login screen, already disallowed in robots.ts
 * - /design-system — internal documentation, noindexed in its own layout
 * - /merch — deliberately unlinked from the nav while it says "coming soon";
 *   putting it here would invite indexing of a page we are choosing to hide
 * - /conference — it lives at uxhiconference.com. Listing it here as well
 *   would offer the same content under two domains
 */
const PATHS = [
  "/",
  "/about",
  "/events",
  "/directory",
  "/get-involved",
  "/join",
  "/resources",
  "/state-of-ux/2025",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host")?.toLowerCase().split(":")[0] ?? "";

  if (CONFERENCE_HOSTS.includes(host)) return [];

  // Preview hosts get a sitemap addressed to themselves, so it can be read and
  // checked before launch. Nothing crawls them — robots.ts answers those with
  // Disallow: / — so this is for us, not for Google.
  const origin = COMMUNITY_HOSTS.includes(host)
    ? `https://${host}`
    : host
      ? `https://${host}`
      : "https://uxhi.community";

  // trailingSlash is on in next.config.ts, so the canonical form of every URL
  // here ends in one. A sitemap that lists the redirecting form of a URL sends
  // every crawl through a 308 before it reaches the page.
  return PATHS.map((path) => ({
    url: path === "/" ? `${origin}/` : `${origin}${path}/`,
  }));
}
