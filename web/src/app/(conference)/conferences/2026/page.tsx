import type { Metadata } from "next";
import Link from "next/link";
import { LogoBadge } from "./_components/LogoBadge";
import { PhotoTickerV, PhotoTickerH } from "./_components/PhotoTicker";
import { PastConferencesMenu } from "./_components/PastConferencesMenu";
import { MobileNavMenu } from "./_components/MobileNavMenu";
import { FaqSection } from "./_components/FaqSection";
import { CochairsSection } from "./_components/CochairsSection";
import { sanityFetch } from "@/sanity/lib/live";
import { CONFERENCE_TEAM_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "UXHICONF26 — Coming Soon",
  description:
    "UXHICon 2026 — October 17, 2026. An immersive day of design knowledge-sharing, inspiration, and connection in Hawaiʻi.",
};

// ── Design tokens ─────────────────────────────────────────────────────
const BEIGE_30 = "#F4F1EA"; // page background (beige-30 from design system)
const PURPLE   = "#231769"; // --color-purple-140
const TEAL_60  = "#60D7E5"; // lighter teal for apply-to-speak button

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
      <div className="flex flex-col gap-6">
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
          <p className="font-bold uppercase text-[14px] leading-[1.7] lg:text-[16px] lg:leading-[1.4] xl:text-[20px] xl:leading-[1.45]" style={{ color: PURPLE }}>
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
  const { data: cochairs } = await sanityFetch({
    query: CONFERENCE_TEAM_QUERY,
    params: { year: 2026 },
  });

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

        {/* Header CTA — h=44px, 15px, font-normal, with cursor icon */}
        <a
          href="https://givebutter.com/uxhi-con-2026-sponsor"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full text-[15px] font-normal text-white no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
          style={{ background: PURPLE }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/conferences/2026/assets/icons/icon-hand-holding-heart.svg"
            alt=""
            width={20}
            height={20}
            style={{ width: 20, height: 20, filter: "invert(1)" }}
          />
          Become a sponsor
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
            className="flex-1 min-h-0 overflow-y-auto"
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

                {/* Date badge — gray border, teal pulse */}
                <div
                  className="inline-flex items-center gap-[10px] w-fit px-4 py-[9px] rounded-full text-[14px] md:text-[16px] font-normal"
                  style={{ border: "1px solid #969DA4", color: "#000" }}
                >
                  <PulseDot />
                  October 17, 2026
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
                    className="font-normal leading-[1.3] tracking-[-0.02em] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[26px] xl:text-[32px]"
                  >
                    Join us for an immersive day of knowledge-sharing, inspiration, and pilina.&nbsp;&#127802;
                  </p>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://givebutter.com/uxhi-con-2026-sponsor"
                    target="_blank"
                    rel="noopener"
                    className="hidden md:inline-flex items-center gap-2 h-[44px] px-5 rounded-full text-[15px] font-normal text-white no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
                    style={{ background: PURPLE }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/conferences/2026/assets/icons/icon-hand-holding-heart.svg" alt="" width={20} height={20} style={{ width: 20, height: 20, filter: "invert(1)" }} />
                    Become a sponsor
                  </a>
                  <a
                    href="https://forms.gle/gd3qdU8JhWeccJ568"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full text-[15px] font-normal no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
                    style={{ background: TEAL_60, color: "#000" }}
                  >
                    Apply to speak
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/conferences/2026/assets/icons/icon-arrow-small-right.svg" alt="" width={20} height={20} style={{ width: 20, height: 20 }} />
                  </a>
                </div>
              </div>

              {/* ── Moʻolelo and Meaning ──────────────────────────── */}
              <div className="flex flex-col gap-3 md:gap-4">
                <h2
                  className="font-semibold leading-[1.3] tracking-[-0.01em] text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px]"
                >
                  UXHI Conference 2026: Mo&#699;olelo and Meaning
                </h2>
                <div className="rounded-2xl md:rounded-3xl overflow-hidden aspect-[676/297]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/conferences/2026/assets/logos/moolelo_logo.png"
                    alt="Mo&#699;olelo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-normal leading-[1.3] tracking-[-0.02em] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[26px] xl:text-[32px]">
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

              {/* ── Venue ──────────────────────────────────────────── */}
              {/* Content from the 2025 conference site (Entrepreneurs Sandbox). */}
              <div className="flex flex-col gap-3 md:gap-4">
                <h2
                  className="font-semibold leading-[1.3] tracking-[-0.02em] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[26px] xl:text-[32px]"
                >
                  The Venue: Entrepreneurs Sandbox
                </h2>
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
                  <p>Located in the heart of Kaka&#699;ako, the <a href="https://sandboxhawaii.org/" target="_blank" rel="noopener" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: PURPLE }}>Entrepreneurs Sandbox</a> is a modern co-working and event space designed to foster innovation and collaboration.</p>
                  <p>With flexible indoor and outdoor areas, it&rsquo;s the perfect setting for connecting, learning, and building community. The venue is fully ADA accessible, with wheelchair access and accessible restrooms on-site.</p>
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

              {/* ── FAQs ───────────────────────────────────────────── */}
              <FaqSection />

              {/* ── Co-Chairs / Team ───────────────────────────────── */}
              <CochairsSection cochairs={cochairs ?? []} />

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
      <footer className="h-16 shrink-0 flex items-center justify-between px-6">
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
              About UXHI
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
