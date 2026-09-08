import type { Metadata } from "next";

/**
 * The design system is internal documentation that happens to live on the
 * public site, so it is kept out of search results.
 *
 * `noindex`, not a robots.txt Disallow, and the difference matters. Disallow
 * says "do not fetch this", which sounds stronger but is weaker here: a
 * crawler that never fetches the page never sees that we did not want it
 * listed, so a URL someone links to can still surface in results as a bare
 * title. noindex is fetched, read, and obeyed — the page is crawled and then
 * deliberately left out. Using both would be the broken combination: the
 * Disallow prevents the crawl that would have found the noindex.
 *
 * It stays reachable by anyone with the link, which is the point — the team
 * reviews it on staging and on the live site.
 *
 * This layout exists only to carry that metadata: page.tsx is a client
 * component, and a client component cannot export it.
 */
export const metadata: Metadata = {
  title: "Design System | UXHI",
  robots: { index: false, follow: false },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
