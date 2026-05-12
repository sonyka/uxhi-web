import type { Metadata } from "next";
import Link from "next/link";
import { LogoBadge } from "./_components/LogoBadge";
import { PhotoTickerV, PhotoTickerH } from "./_components/PhotoTicker";

export const metadata: Metadata = {
  title: "UXHICONF26 — Coming Soon",
  description:
    "UXHICon 2026 — October 17, 2026. An immersive day of design knowledge-sharing, inspiration, and connection in Hawaiʻi.",
};

// ── Design tokens ─────────────────────────────────────────────────────
const BEIGE_30 = "#F4F1EA"; // page background (beige-30 from design system)
const PURPLE   = "#231769"; // --color-purple-140
const TEAL     = "#09C0D7"; // --color-teal-90

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
        style={{ background: TEAL, animation: "conf-pulse-ring 2s ease-out infinite" }} />
      <span className="absolute top-1/2 left-1/2 w-[10px] h-[10px] rounded-full"
        style={{ background: TEAL, animation: "conf-pulse-ring 2s ease-out 0.7s infinite" }} />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full z-10"
        style={{ background: TEAL }} />
    </span>
  );
}

// ── Stat row ──────────────────────────────────────────────────────────
// Figma: ~11px, both label and value in light gray, very subtle separator
function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-[3px] border-b border-black/[0.06] last:border-0">
      <span className="text-[14px] sm:text-[16px] font-normal text-[#ADB5BD]">{label}</span>
      <span className="text-[14px] sm:text-[16px] font-normal text-[#969DA4]">{value}</span>
    </div>
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
          <p className="font-bold uppercase leading-[1.7] lg:leading-[1.4] xl:leading-[1.45] text-[10px] lg:text-[14px] xl:text-[20px]" style={{ color: PURPLE }}>
            {daysUntil()} Days to Pilina
          </p>
          <p className="font-bold uppercase leading-[1.7] lg:leading-[1.4] xl:leading-[1.45] text-[10px] lg:text-[14px] xl:text-[20px]" style={{ color: PURPLE }}>
            By designers,&nbsp;&nbsp;for designers
          </p>
          <p className="font-bold uppercase leading-[1.7] lg:leading-[1.4] xl:leading-[1.45] text-[10px] lg:text-[14px] xl:text-[20px]" style={{ color: PURPLE }}>
            2025 UXHICON by the numbers:
          </p>
        </div>
        {/* Stats */}
        <div>
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
export default function Conference2026Page() {
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
    <div className="w-screen h-dvh flex flex-col overflow-hidden" style={{ background: BEIGE_30 }}>

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
        {/* TODO: replace href with Givebutter sponsor page URL */}
        <a
          href="#"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full text-[15px] font-normal text-white no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
          style={{ background: PURPLE }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/conferences/2026/assets/icons/icon-cursor-finger-click.svg"
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
            className="relative shrink-0 overflow-hidden order-2 md:order-none md:w-[340px] lg:w-[400px] xl:w-[508px]"
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
            <div className="hidden md:flex flex-col gap-10 absolute bottom-6 left-6 md:w-[156px] lg:w-[216px] xl:w-[244px]">
              <SidebarInfo />
            </div>

            {/* Mobile sidebar: horizontal info row + photo strip */}
            <div className="md:hidden flex flex-col">
              <div className="flex items-start gap-4 px-6 pt-6 pb-4">
                <SidebarInfo />
              </div>
              <PhotoTickerH />
            </div>
          </aside>

          {/* ── RIGHT PANEL ───────────────────────────────────────────
              overflow-y:auto: vertically centered now, scrolls when
              speakers/agenda content is added in a future phase.
          ──────────────────────────────────────────────────────────── */}
          <section
            className="flex-1 min-h-0 overflow-y-auto order-1 md:order-none"
            aria-label="Coming soon"
          >
            {/* min-h-full: centers content when short, grows when tall */}
            <div className="min-h-full flex flex-col justify-center gap-5 px-6 py-8 md:pl-8 md:pr-6 lg:pr-10 xl:pl-10 xl:pr-16">

              {/* "Coming soon!" badge */}
              <div
                className="inline-flex items-center gap-[10px] w-fit h-[32px] px-4 rounded-full text-[13px] font-normal"
                style={{
                  background: "#F0FCFD",
                  border: "1px solid rgba(9,192,215,0.4)",
                  color: PURPLE,
                }}
              >
                <PulseDot />
                Coming soon!
              </div>

              {/* Tagline — Bricolage Grotesque extrabold (display weight)
                  Figma sizes:
                    xl → ~42px  lg → ~30px  md → ~22px  sm → ~20px
              */}
              <h1
                className="font-extrabold leading-[1.2] tracking-[-0.02em] text-[17px] sm:text-[20px] md:text-[22px] lg:text-[30px] xl:text-[42px]"
                style={{ color: PURPLE }}
              >
                Hana Hou! UXHICon is an annual event for Hawai&#699;i&#700;s design
                community to share stories and narratives that shape meaningful
                design&mdash;through an immersive day of knowledge-sharing,
                inspiration, and connection.&nbsp;&#127802;
              </h1>

              {/* CTA buttons — h=44px · 15px · font-normal per Figma */}
              <div className="flex flex-wrap items-center gap-3">

                {/* TODO: replace href with Givebutter sponsor page URL */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full text-[15px] font-normal text-white no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
                  style={{ background: PURPLE }}
                >
                  {/* Leading icon — matches header button */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/conferences/2026/assets/icons/icon-cursor-finger-click.svg" alt="" width={20} height={20} style={{ width: 20, height: 20, filter: "invert(1)" }} />
                  Become a sponsor
                </a>

                {/* TODO: replace href with speaker application form URL */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full text-[15px] font-normal no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
                  style={{ background: TEAL, color: PURPLE }}
                >
                  Apply to speak
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/conferences/2026/assets/icons/icon-arrow-small-right.svg" alt="" width={20} height={20} style={{ width: 20, height: 20 }} />
                </a>
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
      <footer className="h-16 shrink-0 flex items-center justify-between px-6">
        <nav className="flex items-center gap-5" aria-label="Site links">
          <Link
            href="/conferences/2025/"
            className="inline-flex items-center gap-[7px] text-[15px] font-normal no-underline hover:opacity-70 transition-opacity whitespace-nowrap"
            style={{ color: "#50555A" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/conferences/2026/assets/icons/icon-shaka.svg" alt="" width={16} height={16}
              style={{ width: 16, height: 16, filter: GRAY_110_FILTER }} />
            Past conferences
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/conferences/2026/assets/icons/icon-angle-small-down.svg" alt="" width={12} height={12}
              style={{ width: 12, height: 12, filter: GRAY_110_FILTER }} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-[7px] text-[15px] font-normal no-underline hover:opacity-70 transition-opacity whitespace-nowrap"
            style={{ color: "#50555A" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/conferences/2026/assets/icons/icon-star.svg" alt="" width={16} height={16}
              style={{ width: 16, height: 16, filter: GRAY_110_FILTER }} />
            About UXHI
          </Link>
        </nav>
        <div className="flex items-center gap-[14px]">
          <a href="https://www.instagram.com/uxhicommunity/" target="_blank" rel="noopener" aria-label="UXHI on Instagram"
            className="flex items-center hover:opacity-70 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/conferences/2026/assets/icons/icon-instagram.svg" alt="" width={18} height={18}
              style={{ width: 18, height: 18, filter: GRAY_110_FILTER }} />
          </a>
          <a href="https://www.linkedin.com/company/uxhi/" target="_blank" rel="noopener" aria-label="UXHI on LinkedIn"
            className="flex items-center hover:opacity-70 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/conferences/2026/assets/icons/icon-linkedin.svg" alt="" width={18} height={18}
              style={{ width: 18, height: 18, filter: GRAY_110_FILTER }} />
          </a>
        </div>
      </footer>

    </div>
  );
}
