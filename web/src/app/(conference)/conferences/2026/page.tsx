import type { Metadata } from "next";
import Link from "next/link";
import { LogoBadge } from "./_components/LogoBadge";
import { PhotoTickerV, PhotoTickerH } from "./_components/PhotoTicker";
import { PastConferencesMenu } from "./_components/PastConferencesMenu";
import { MobileNavMenu } from "./_components/MobileNavMenu";
import { FaqSection } from "./_components/FaqSection";
import { CochairsSection } from "./_components/CochairsSection";
import { SponsorsGrid } from "./_components/SponsorsGrid";
import { InstagramGrid } from "./_components/InstagramGrid";
import { QuoteCard } from "./_components/QuoteCard";
import { ProgramSection } from "./_components/ProgramSection";
import { BenefitsHeadline } from "./_components/BenefitsHeadline";
import { SectionHeading } from "./_components/SectionHeading";
import { sanityFetchCached } from "@/sanity/lib/fetchCached";
import { CONFERENCE_TEAM_QUERY, CONFERENCE_SPONSORS_QUERY, CONFERENCE_INSTAGRAM_QUERY } from "@/sanity/lib/queries";

const OG_TITLE = "UXHI Conference :: October 17, 2026";
const OG_DESCRIPTION =
  "UXHICon 2026 — October 17, 2026. An immersive day of design knowledge-sharing, inspiration, and connection in Hawaiʻi.";
const OG_IMAGE = "/conferences/2026/assets/images/og-image.png";

export const metadata: Metadata = {
  // Resolve relative OG/Twitter image URLs against the live conference domain so
  // link previews load an absolute URL on every platform (iMessage, Slack, etc.).
  metadataBase: new URL("https://uxhiconference.com"),
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  // Custom UXHI conference favicon (carried over from the 2025 site), typed as
  // SVG so it takes precedence over the app's default favicon.ico.
  icons: {
    icon: [{ url: "/conferences/2026/assets/favicon.svg", type: "image/svg+xml", sizes: "any" }],
  },
  openGraph: {
    type: "website",
    url: "https://uxhiconference.com/",
    siteName: "UXHI Conference",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "UXHI Conference — Entrepreneurs Sandbox · October 17, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// ── Design tokens ─────────────────────────────────────────────────────
const BEIGE_30 = "#F4F1EA"; // page background (beige-30 from design system)
const PURPLE   = "#231769"; // --color-purple-140
const TEAL_60  = "#60D7E5"; // lighter teal (pulse dot, teal CTAs)

const EVENT_DATE = new Date("2026-10-17T00:00:00");

function daysUntil() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((EVENT_DATE.getTime() - today.getTime()) / 86400000));
}

// ── Pulsing dot ───────────────────────────────────────────────────────
function PulseDot() {
  return (
    <span className="relative inline-flex w-[10px] h-[10px] flex-shrink-0" aria-hidden="true">
      <span className="absolute top-1/2 left-1/2 w-[10px] h-[10px] rounded-full"
        style={{ background: TEAL_60, animation: "conf-pulse-ring 2s ease-out infinite" }} />
      <span className="absolute top-1/2 left-1/2 w-[10px] h-[10px] rounded-full"
        style={{ background: TEAL_60, animation: "conf-pulse-ring 2s ease-out 0.7s infinite" }} />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full z-10"
        style={{ background: TEAL_60 }} />
    </span>
  );
}

// ── Stat row ──────────────────────────────────────────────────────────
// Figma: ~11px, both label and value in light gray, very subtle separator
function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-[16px] font-normal text-[#676D73]">
      {value} {label}
    </p>
  );
}

// ── Sidebar info ──────────────────────────────────────────────────────
// Matches Figma sidebar typography:
//   • All three copy lines — 13px, bold, uppercase, PURPLE, leading-[2]
//   • Stat rows            — 12px, gray label / gray-darker value
// SidebarInfo returns a Fragment so the parent flex context controls
// desktop (flex-col gap-10) vs mobile (flex-row gap-4) layout.
function SidebarInfo() {
  return (
    <>
      <LogoBadge />
      {/* Tighter copy→stats gap on mobile (gap-3); full gap-6 from md up. */}
      <div className="flex flex-col gap-3 md:gap-6">
        {/* Copy lines — bold uppercase purple
            Responsive sizes per Figma column widths:
              base/SM (256px col) → 10px, lh 1.7 → 17px/line ✓
              MD     (156px col)  → 10px, lh 1.7 → 17px/line ✓
              LG     (216px col)  → 14px, lh 1.4 → 19.6px/line ✓
              XL     (244px col)  → 20px, lh 1.45 → 29px/line ✓
        */}
        <div className="flex flex-col gap-2">
          <p className="font-bold uppercase text-[14px] leading-[1.7] lg:text-[16px] lg:leading-[1.4] xl:text-[20px] xl:leading-[1.45]" style={{ color: PURPLE }}>
            {daysUntil()} Days to Go
          </p>
          {/* Hidden on mobile to save vertical space; shown from md up. */}
          <p className="hidden md:block font-bold uppercase text-[14px] leading-[1.7] lg:text-[16px] lg:leading-[1.4] xl:text-[20px] xl:leading-[1.45]" style={{ color: PURPLE }}>
            By designers,&nbsp;&nbsp;for designers
          </p>
          <p className="font-bold uppercase text-[14px] leading-[1.7] lg:text-[16px] lg:leading-[1.4] xl:text-[20px] xl:leading-[1.45]" style={{ color: PURPLE }}>
            2025 UXHICON by the numbers:
          </p>
        </div>
        {/* Stats */}
        <div className="flex flex-col gap-1">
          <StatRow label="Speakers"  value="37"  />
          <StatRow label="Sessions"  value="12"  />
          <StatRow label="Attendees" value="127" />
        </div>
      </div>
    </>
  );
}

// Shared CSS filter: converts any colored/black icon → gray-110 (#50555A)
const GRAY_110_FILTER = "grayscale(1) brightness(0.4)";

// ─────────────────────────────────────────────────────────────────────
export default async function Conference2026Page() {
  const [{ data: cochairs }, { data: sponsors }, { data: instagramPosts }] = await Promise.all([
    sanityFetchCached({ query: CONFERENCE_TEAM_QUERY, params: { year: 2026 } }),
    sanityFetchCached({ query: CONFERENCE_SPONSORS_QUERY, params: { year: 2026 } }),
    sanityFetchCached({ query: CONFERENCE_INSTAGRAM_QUERY, params: { year: 2026 } }),
  ]);

  return (
    /**
     * Full-viewport layout matching Figma exactly:
     *
     * • Outer page: beige-30 (#F4F1EA) fills header, side gutters, footer
     * • White card: 24px side margins, rounded-3xl, clips photo ticker overflow
     * • Card interior: sidebar (left, white) | right panel (white, scrollable)
     * • Buttons: 44px height · 15px · Bricolage Grotesque 400
     * • Right panel: overflow-y:auto — centered now, scrolls when content added
     *
     * Mobile (<md): card becomes flex-col
     *   order-1 = right content (top)
     *   order-2 = sidebar info + horizontal photo strip (bottom)
     */
    <div className="w-full h-dvh flex flex-col overflow-hidden" style={{ background: BEIGE_30 }}>

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <header className="h-16 shrink-0 flex items-center justify-between px-6 z-10">

        <Link href="/conferences/2026/" className="no-underline flex items-center" aria-label="UXHICONF26 home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/conferences/2026/assets/logos/uxhicon_header.svg"
            alt="UXHICONF26"
            style={{ height: "22px", width: "auto" }}
          />
        </Link>

        {/* Section anchor nav — smooth-scrolls within the scroll panel (desktop only). */}
        <nav className="hidden lg:flex items-center gap-5 text-[14px] font-medium" aria-label="Section navigation">
          {([
            ["Moʻolelo", "#moolelo"],
            ["UXHICon", "#program"],
            ["The Sandbox", "#venue"],
            ["FAQ", "#faq"],
            ["About Us", "#about"],
            ["Sponsors", "#sponsors"],
          ] as const).map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="no-underline hover:opacity-70 transition-opacity"
              style={{ color: PURPLE }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Header CTA — primary: Get tickets. h=44px, 15px, font-normal, cursor icon */}
        <a
          href="https://givebutter.com/uxhi-con-26-tickets"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full text-[15px] font-normal text-white no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
          style={{ background: PURPLE }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/conferences/2026/assets/icons/icon-shaka.svg"
            alt=""
            width={20}
            height={20}
            style={{ width: 20, height: 20, filter: "invert(1)" }}
          />
          Get tickets
        </a>
      </header>

      {/* ── CARD WRAPPER: 24px side gutters ────────────────────────── */}
      {/*
        px-6 creates the 24px margins that reveal the beige-30 background
        on both sides of the white card — matching the Figma exactly.
      */}
      <main className="flex-1 min-h-0 flex flex-col px-6">

        {/* White rounded card */}
        <div className="flex-1 min-h-0 bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row">

          {/* ── SIDEBAR ───────────────────────────────────────────────
              Figma widths:
                xl → 508px   lg → 400px   md → 340px
              At sm: full-width, order-2 (below right panel)
          ──────────────────────────────────────────────────────────── */}
          <aside
            className="hidden md:block relative shrink-0 overflow-hidden md:w-[340px] lg:w-[420px] xl:w-[508px]"
            aria-label="Conference sidebar"
          >
            {/* Vertical photo ticker — desktop only (absolute-positioned) */}
            <PhotoTickerV />

            {/* Desktop sidebar info — absolute bottom-left per Figma
                xl → left=24 bottom=24 w=244
                lg → left=24 bottom=24 w=216
                md → left=24 bottom=24 w=156
            */}
            {/* gap-10 = 40px between badge and text block, matching Figma */}
            <div className="flex flex-col gap-10 absolute bottom-6 left-6 md:w-[156px] lg:w-[196px] xl:w-[244px]">
              <SidebarInfo />
            </div>
          </aside>

          {/* ── RIGHT PANEL ───────────────────────────────────────────
              Sidebar stays sticky (h-dvh + overflow-hidden on card);
              this section scrolls when content exceeds viewport height.
              On mobile/sm, this is the single scrollable column —
              badge/stats + photo strip scroll away at the top, followed
              by the date/tagline/Moʻolelo content.
          ──────────────────────────────────────────────────────────── */}
          <section
            className="flex-1 min-h-0 overflow-y-auto scroll-smooth"
            aria-label="Conference content"
          >
            <div className="flex flex-col gap-10 p-4 md:gap-16 md:py-16 md:pl-8 md:pr-6 lg:pr-10 xl:gap-20 xl:py-32 xl:pl-10 xl:pr-16">

              {/* Mobile/sm sidebar info — badge, days-to-go/stats, photo strip.
                  Scrolls away with the rest of the content (no fixed positioning). */}
              <div className="md:hidden flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <SidebarInfo />
                </div>
                <PhotoTickerH />
              </div>

              {/* ── Hero: date badge, tagline, CTAs ───────────────── */}
              <div className="flex flex-col gap-4 md:gap-5">

                {/* Date + venue — plain text with a teal live-pulse (no pill, so the
                    longer date+venue line wraps cleanly on small screens instead of
                    forming an odd multi-line pill). Dot aligns to the first line. */}
                <div
                  className="flex items-center gap-[10px] text-[14px] md:text-[16px] font-medium"
                  style={{ color: "#000" }}
                >
                  <span className="shrink-0">
                    <PulseDot />
                  </span>
                  <span>October 17, 2026 • Entrepreneurs Sandbox, Honolulu</span>
                </div>

                {/* Tagline — three parts per Figma:
                    "Hana Hou!" / main description (semibold) / "Join us…" (regular, lighter)
                    Figma XL sizes: 36px semibold / 36px semibold / 32px regular
                */}
                <div className="flex flex-col gap-2 md:gap-3">
                  <h1
                    className="font-semibold leading-[1.2] tracking-[-0.02em] text-[17px] sm:text-[20px] md:text-[22px] lg:text-[30px] xl:text-[36px]"
                  >
                    Hana Hou!
                  </h1>
                  <p
                    className="font-semibold leading-[1.2] tracking-[-0.02em] text-[17px] sm:text-[20px] md:text-[22px] lg:text-[30px] xl:text-[36px]"
                  >
                    UXHICon is an annual event for Hawai&#699;i&rsquo;s design community to share stories and narratives that shape meaningful design.
                  </p>
                  <p
                    className="font-normal leading-[1.35] tracking-[-0.02em] text-[16px] sm:text-[17px] md:text-[19px] lg:text-[22px] xl:text-[28px]"
                  >
                    Join us for an immersive day of knowledge-sharing, inspiration, and pilina.&nbsp;&#127802;
                  </p>
                </div>

                {/* CTA buttons — Become a sponsor (teal secondary) then Get tickets
                    (purple primary). Both show on all breakpoints, so mobile keeps
                    Get tickets in the hero alongside the header CTA. */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://givebutter.com/uxhi-con-2026-sponsor"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full text-[15px] font-normal no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
                    style={{ background: TEAL_60, color: "#000" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/conferences/2026/assets/icons/icon-hand-holding-heart.svg" alt="" width={20} height={20} style={{ width: 20, height: 20 }} />
                    Become a sponsor
                  </a>
                  <a
                    href="https://givebutter.com/uxhi-con-26-tickets"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full text-[15px] font-normal text-white no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
                    style={{ background: PURPLE }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/conferences/2026/assets/icons/icon-shaka.svg" alt="" width={20} height={20} style={{ width: 20, height: 20, filter: "invert(1)" }} />
                    Get tickets
                  </a>
                </div>
              </div>

              {/* ── Moʻolelo and Meaning ──────────────────────────── */}
              <div id="moolelo" className="scroll-mt-6 flex flex-col gap-3 md:gap-4">
                <SectionHeading>UXHI Conference 2026: Mo&#699;olelo and Meaning</SectionHeading>
                <div className="rounded-2xl md:rounded-3xl overflow-hidden aspect-[676/297]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/conferences/2026/assets/logos/moolelo_logo.png"
                    alt="Mo&#699;olelo"
                    // Zoom in on mobile so the centered logo reads larger; the
                    // container clips the enlarged background. Full size from md up.
                    className="w-full h-full object-cover scale-[1.35] md:scale-100"
                  />
                </div>
                {/* Mobile: match the "Hana Hou!" tagline styling (semibold, 17→20px, leading-1.2).
                    From md up, revert to the lighter body styling. */}
                <p className="font-semibold leading-[1.25] tracking-[-0.02em] text-[16px] sm:text-[17px] md:font-normal md:leading-[1.4] md:text-[19px] lg:text-[22px] xl:text-[28px]">
                  In Hawai&#699;i, mo&#699;olelo is a treasured practice. It preserves the culture of a special place and people, by shaping, carrying, and contextualizing what is shared. It is highly intentional.
                </p>
                <div
                  className="flex flex-col gap-[1.3em] font-normal leading-[1.4] text-[16px] lg:text-[17px] xl:text-[18px]"
                  style={{ color: "#50555A" }}
                >
                  <p>These ideas resonate deeply with design. Design shapes understanding. Every interaction reflects intentional choices, whether it&rsquo;s interactions created for our various audiences, insights distilled from research, or the communication of value to stakeholders and leaders. As a designer, you guide how people relate to systems, experiences, and even each other.</p>
                  <p>This year&rsquo;s conference is a nod to stories and their carriers, both of which help us make sense of the world around us. Join us for another year of knowledge sharing, building pilina within Hawai&#699;i&rsquo;s design community, and learning from one another&rsquo;s mo&#699;olelo.</p>
                </div>
              </div>

              {/* ── The Program: Share, Learn, & Connect ──────────── */}
              <div id="program" className="scroll-mt-6">
                <ProgramSection />
              </div>

              {/* Benefits headline — sits above the Sandbox/Venue section. */}
              <BenefitsHeadline />

              {/* ── Venue ──────────────────────────────────────────── */}
              {/* Content from the 2025 conference site (Entrepreneurs Sandbox). */}
              <div id="venue" className="scroll-mt-6 flex flex-col gap-3 md:gap-4">
                <SectionHeading>The Venue: Entrepreneurs Sandbox</SectionHeading>
                {/* Building photo + location map, side by side on desktop */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <div className="rounded-2xl md:rounded-3xl overflow-hidden aspect-[325/176] md:w-1/2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/conferences/2026/assets/images/venue-entrepreneurs-sandbox.jpg"
                      alt="Exterior of the Entrepreneurs Sandbox at sunset"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Map snapshot — clicking opens the venue in Google Maps.
                      Map tiles © OpenStreetMap contributors. */}
                  <a
                    href="https://maps.app.goo.gl/zBHS4EXnXWuhysEu5"
                    target="_blank"
                    rel="noopener"
                    aria-label="View the Entrepreneurs Sandbox on Google Maps"
                    className="group relative block rounded-2xl md:rounded-3xl overflow-hidden aspect-[325/176] md:w-1/2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/conferences/2026/assets/images/venue-map.png"
                      alt="Map showing the Entrepreneurs Sandbox in Kakaʻako, Honolulu"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Location pin centered on the venue (tip points at center) */}
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full" aria-hidden="true">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={PURPLE} />
                        <circle cx="12" cy="9" r="2.5" fill="#fff" />
                      </svg>
                    </span>
                    {/* OSM attribution */}
                    <span className="absolute bottom-1 right-1.5 text-[9px] leading-none rounded px-1 py-[1px] bg-white/65 text-black/55">
                      © OpenStreetMap
                    </span>
                  </a>
                </div>
                <div
                  className="flex flex-col gap-[1.3em] font-normal leading-[1.4] text-[16px] lg:text-[17px] xl:text-[18px]"
                  style={{ color: "#50555A" }}
                >
                  <p>The <a href="https://sandboxhawaii.org/" target="_blank" rel="noopener" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: PURPLE }}>Entrepreneurs Sandbox</a> is a modern co-working event space in the heart of Kaka&#699;ako, with a collaborative conference space and classroom, and it&rsquo;s fully ADA accessible.</p>
                  <p>Metered street parking is available nearby, and paid parking is available at the adjacent lot (entrance on Keawe Street). Please note: parking passes will not be provided this year.</p>
                </div>
                <a
                  href="https://maps.app.goo.gl/zBHS4EXnXWuhysEu5"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 w-fit mt-1 h-[44px] px-5 rounded-full text-[15px] font-normal no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
                  style={{ background: TEAL_60, color: "#000" }}
                >
                  View on Map
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/conferences/2026/assets/icons/icon-arrow-small-right.svg" alt="" width={20} height={20} style={{ width: 20, height: 20 }} />
                </a>
              </div>

              {/* ── About UXHI ─────────────────────────────────────── */}
              {/* Copy carried over from the 2025 conference site. */}
              <div id="about" className="scroll-mt-6 flex flex-col gap-3 md:gap-4">
                <SectionHeading>About UXHI</SectionHeading>
                <div className="rounded-2xl md:rounded-3xl overflow-hidden aspect-[1000/417]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/conferences/2026/assets/images/about-uxhi-group.png"
                    alt="The UXHI community gathered at a past event"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="flex flex-col gap-[1.3em] font-normal leading-[1.4] text-[16px] lg:text-[17px] xl:text-[18px]"
                  style={{ color: "#50555A" }}
                >
                  <p>We are a female-founded, volunteer-led community dedicated to connecting and elevating the field of human-centered design for our local community.</p>
                  <p>We want to connect and elevate the field of human-centered design for the people of Hawai&#699;i.</p>
                </div>
                <a
                  href="https://uxhi.community"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 w-fit mt-1 h-[44px] px-5 rounded-full text-[15px] font-normal no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
                  style={{ background: TEAL_60, color: "#000" }}
                >
                  Join our community
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/conferences/2026/assets/icons/icon-arrow-small-right.svg" alt="" width={20} height={20} style={{ width: 20, height: 20 }} />
                </a>
              </div>

              {/* ── Co-Chairs / Team ───────────────────────────────── */}
              <CochairsSection cochairs={cochairs ?? []} />

              {/* ── Refrain (testimonial-style card, shaka glyph) ────── */}
              <QuoteCard />

              {/* ── Instagram (Sanity: conferenceInstagramPost, curated) ── */}
              <InstagramGrid posts={instagramPosts ?? []} />

              {/* ── FAQ ────────────────────────────────────────────── */}
              <div id="faq" className="scroll-mt-6">
                <FaqSection />
              </div>

              {/* ── Sponsors (Sanity: conferenceSponsor, year-scoped) ─── */}
              <div id="sponsors" className="scroll-mt-6">
                <SponsorsGrid sponsors={sponsors ?? []} />
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      {/*
        Figma footer (640×64, 1:1 verified):
          color  → #969DA4 (gray-80), 13px, font-normal
          left   → cursor-click icon + "Past conferences" + ˅ caret
                   target/bullseye icon + "About UXHI"
          right  → Instagram | LinkedIn (filtered to match gray)
      */}
      {/* Mobile: keep the original top gap (pt-3) but trim the bottom (pb-1) so the
          scroll card gains height without crowding the content above. Desktop: full 64px, centered. */}
      <footer className="shrink-0 flex items-center justify-between px-6 pt-3 pb-1 md:h-16 md:py-0">
        <nav className="flex items-center gap-5" aria-label="Site links">
          {/* Mobile: white pill button → flat dropdown (past conferences + about uxhi) */}
          <MobileNavMenu />

          {/* Desktop: separate nav links */}
          <div className="hidden sm:flex items-center gap-5">
            <PastConferencesMenu />
            <a
              href="https://uxhi.community"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-[7px] text-[15px] font-normal no-underline hover:opacity-70 transition-opacity whitespace-nowrap"
              style={{ color: "#50555A" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/conferences/2026/assets/icons/icon-star.svg" alt="" width={16} height={16}
                style={{ width: 16, height: 16, filter: GRAY_110_FILTER }} />
              UXHI
            </a>
            <a
              href="mailto:uxhiconference@gmail.com"
              className="inline-flex items-center gap-[7px] text-[15px] font-normal no-underline hover:opacity-70 transition-opacity whitespace-nowrap"
              style={{ color: "#50555A" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/conferences/2026/assets/icons/email-heart.svg" alt="" width={16} height={16}
                style={{ width: 16, height: 16, filter: GRAY_110_FILTER }} />
              Email us
            </a>
          </div>
        </nav>
        <div className="flex items-center gap-[14px]">
          <a href="https://www.instagram.com/uxhicommunity/" target="_blank" rel="noopener" aria-label="UXHI on Instagram"
            className="flex items-center hover:opacity-70 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/conferences/2026/assets/icons/icon-instagram.svg" alt="" width={24} height={24}
              style={{ width: 24, height: 24, filter: GRAY_110_FILTER }} />
          </a>
          <a href="https://www.linkedin.com/company/uxhi/" target="_blank" rel="noopener" aria-label="UXHI on LinkedIn"
            className="flex items-center hover:opacity-70 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/conferences/2026/assets/icons/icon-linkedin.svg" alt="" width={24} height={24}
              style={{ width: 24, height: 24, filter: GRAY_110_FILTER }} />
          </a>
        </div>
      </footer>

    </div>
  );
}
