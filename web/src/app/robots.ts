import type { MetadataRoute } from "next";
import { headers } from "next/headers";

/**
 * Host-aware robots rules.
 *
 * Why this is not a static public/robots.txt: one Netlify build serves several
 * hostnames. Alongside the real domains it answers on Netlify's default
 * `*.netlify.app` address, and staging answers on `*.vercel.app`. A static file
 * would send the same rules to all of them, so either the real site stays
 * unindexable or the preview hosts get indexed — and the preview hosts carry the
 * full member directory, i.e. 63 real people's names, photos and LinkedIn
 * profiles. Reading the Host header lets each answer for itself.
 *
 * Add a hostname to PUBLIC_HOSTS only when it is genuinely meant to be found.
 */
const PUBLIC_HOSTS = [
  "uxhiconference.com",
  "www.uxhiconference.com",
  "uxhi.community",
  "www.uxhi.community",
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")?.toLowerCase().split(":")[0] ?? "";

  if (!PUBLIC_HOSTS.includes(host)) {
    // Preview, staging and the bare Netlify address: keep the whole thing out
    // of search results.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The CMS is not content; it is a login screen.
        disallow: ["/studio", "/studio/"],
      },
    ],
  };
}
