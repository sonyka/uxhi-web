import type { Metadata, Viewport } from "next";
import { MEMBER_COUNT_PLUS } from "@/lib/stats";
import { Dela_Gothic_One, Nunito } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import { ThemeColorSync } from "@/components/layout/ThemeColorSync";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import "./globals.css";

const delaGothic = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dela-gothic",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

/**
 * The address the site's own URLs resolve against.
 *
 * Social cards need absolute URLs — a share image given as "/opengraph-image.png"
 * is a path Slack and LinkedIn cannot fetch. metadataBase is what turns every
 * relative one absolute.
 *
 * Read from the deployment rather than hardcoded, because a card built on
 * staging that points at uxhi.community would ask for an image the live site
 * does not serve yet, and testing the preview would be impossible until launch
 * day. Vercel exposes VERCEL_URL per deploy; anything else is production.
 */
const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://uxhi.community";

const siteDescription = `Join ${MEMBER_COUNT_PLUS} UX professionals, students, and curious individuals in Hawaii. Connect, learn, and grow together with UXHI.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "UXHI",
  description: siteDescription,
  // The card a link becomes when it is pasted anywhere. Without these a UXHI
  // link renders as a bare grey URL in Slack, LinkedIn and iMessage, which is
  // most of how this community shares things.
  //
  // The image itself is the file convention — opengraph-image.png and
  // twitter-image.png in app/(site) — so every page under it inherits one card
  // and Next measures and fingerprints the file itself. The conference site
  // declares its own and is unaffected.
  // No title or description in either block, deliberately. Setting them here
  // pins every page's card to the homepage's words — /about shared as "UXHI —
  // Community for aloha-centered design", which is the wrong page's headline
  // on the right page's link. Left unset, each page's own title and
  // description fill the card.
  openGraph: {
    type: "website",
    siteName: "UXHI",
    locale: "en_US",
    url: siteUrl,
  },
  twitter: {
    // Without this the card is a thumbnail beside the text rather than the
    // 1200x630 image, which is the whole point of having drawn one.
    card: "summary_large_image",
  },
};

// iOS Safari paints the status-bar strip — and the bar behind the bottom
// toolbar — with theme-color, falling back to white. That is what leaves a
// white band above a beige page, in the one place a phone shows chrome the site
// does not draw.
//
// This is the value the strip carries before hydration; ThemeColorSync then
// keeps it matched to whatever is actually at the top of the viewport, which
// changes with scroll and from page to page.
//
// The hex is restated rather than aliased because this is browser chrome
// outside the document: it never sees the stylesheet, so it cannot read
// --color-beige-30. Keep it in step with --background in globals.css.
export const viewport: Viewport = {
  themeColor: "#F4F1EA",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${delaGothic.variable} ${nunito.variable}`}>
      <body className="antialiased">
        {children}
        <ThemeColorSync />
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
