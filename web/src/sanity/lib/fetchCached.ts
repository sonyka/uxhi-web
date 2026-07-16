import type { QueryParams } from "next-sanity";
import { client } from "./client";

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
  const data = await client.fetch(query, params, {
    next: { revalidate },
    stega: false,
  });
  return { data };
}
