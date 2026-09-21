import type { QueryParams } from "next-sanity";
import { client } from "./client";

// Local-dev draft preview: in `next dev` (only), read the "drafts" perspective so
// unpublished content renders on localhost without publishing it. Staging and
// production (NODE_ENV=production) always read published-only, so drafts never
// leak to the live site. This is what lets you stage sponsors/bios locally
// before they go public. Uses the read token if set, else the write token
// (both stay server-side and dev-only — never bundled or shipped).
const previewToken = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
const previewDrafts = process.env.NODE_ENV === "development" && !!previewToken;
const previewClient = previewDrafts
  ? client.withConfig({ useCdn: false, token: previewToken, perspective: "drafts" })
  : client;

// Cached read for public pages. Shape-compatible with defineLive's sanityFetch
// ({ query, params }) => { data }, but backed by a plain time-based cache rather
// than Sanity-live tags.
//
// Why not sanityFetch here: defineLive's fetch cache is invalidated only by the
// <SanityLive> component reacting to live events. SanityLive can't run on the
// deployed site (no browser token in Vercel/Netlify env), so that cache stayed
// frozen until a redeploy — published CMS edits never propagated. A time-based
// `revalidate` keeps every public page self-updating without SanityLive. stega
// is disabled so no visual-editing markers leak into rendered text on the
// public site.
//
// Why an hour and not a minute. This default sets the revalidate window for
// every public page, because a fetch-level `revalidate` propagates to the whole
// page segment. Each expiry lets a page re-render and re-save, and Vercel bills
// that save as an ISR write. At 60s, seven ISR pages could write ~302k times a
// month against a 200k free-tier allowance — and they did, which is what paused
// staging. The meter is driven by how often a page is *allowed* to re-save, not
// by visitor numbers: one request per page per minute reaches the ceiling, and
// nothing requires that request to be a person. Bots ignore the staging
// Disallow, and robots.ts lets Claude's agents through on purpose.
//
// An hour costs ~5k writes a month, ~2.5% of the allowance. Content here
// changes a few times a month, so the delay is invisible, and any push to
// staging redeploys and clears the cache anyway. If a publish ever needs to be
// live immediately, that redeploy is the lever — or wire a Sanity webhook to
// revalidateTag, which removes the periodic writes entirely.
export async function sanityFetchCached<const Q extends string>({
  query,
  params = {},
  revalidate = 3600,
}: {
  query: Q;
  params?: QueryParams;
  revalidate?: number;
}) {
  const data = previewDrafts
    ? await previewClient.fetch(query, params, { stega: false })
    : await previewClient.fetch(query, params, { next: { revalidate }, stega: false });
  return { data };
}
