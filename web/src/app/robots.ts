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

// Only these advertise a sitemap. sitemap.ts answers the conference hosts with
// an empty list — its pages are frozen archives served through rewrites — and
// pointing a crawler at an empty file is worse than not pointing at all.
const SITEMAP_HOSTS = ["uxhi.community", "www.uxhi.community"];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")?.toLowerCase().split(":")[0] ?? "";

  if (!PUBLIC_HOSTS.includes(host)) {
    // Preview, staging and the bare Netlify address: keep the whole thing out
    // of search results.
    //
    // Anthropic's agents are the exception, so the team can review staging from
    // claude.ai. Everything else still gets Disallow: / — which is what keeps
    // the member directory out of Google and Bing, the actual reason this rule
    // exists.
    //
    // All three tokens rather than just Claude-User: a fetch that does not
    // match its own group falls through to `*` and is refused, and which token
    // a given client sends is not something this file can see. Guessing one
    // cost a deploy and a round of debugging.
    return {
      rules: [
        { userAgent: "Claude-User", allow: "/" },
        { userAgent: "ClaudeBot", allow: "/" },
        { userAgent: "Claude-SearchBot", allow: "/" },
        { userAgent: "*", disallow: "/" },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The CMS is not content; it is a login screen.
        //
        // /design-system is deliberately NOT here. It is kept out of results
        // with a noindex tag in its own layout, and adding a Disallow would
        // undo that: a crawler told not to fetch the page never reads the
        // noindex on it, and can still list the URL from a link elsewhere.
        disallow: ["/studio", "/studio/"],
      },
    ],
    ...(SITEMAP_HOSTS.includes(host)
      ? { sitemap: `https://${host}/sitemap.xml` }
      : {}),
  };
}
