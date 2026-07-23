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
// `revalidate` keeps every public page self-updating within a minute of publish,
// independent of SanityLive. stega is disabled so no visual-editing markers leak
// into rendered text on the public site.
export async function sanityFetchCached<const Q extends string>({
  query,
  params = {},
  revalidate = 60,
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
