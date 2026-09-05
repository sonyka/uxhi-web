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

export const metadata: Metadata = {
  title: "UXHI",
  description:
    `Join ${MEMBER_COUNT_PLUS} UX professionals, students, and curious individuals in Hawaii. Connect, learn, and grow together with UXHI.`,
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
