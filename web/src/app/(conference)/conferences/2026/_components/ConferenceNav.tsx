"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  "Agenda",
  "The Lineup",
  "FAQ",
  "Partners",
  "About",
];

function SoonBadge() {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-400/60 bg-amber-400/10 px-2 py-0.5 rounded-full">
      Soon
    </span>
  );
}

function NavLinks() {
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV_ITEMS.map((label) => (
        <div
          key={label}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg opacity-40 cursor-default select-none"
        >
          <span className="text-sm font-medium text-stone-200">{label}</span>
          <SoonBadge />
        </div>
      ))}
    </nav>
  );
}

function SocialAndSponsor() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <a
          href="https://www.instagram.com/uxhicommunity/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/company/uxhi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
        >
          LinkedIn
        </a>
      </div>
      <a
        href="mailto:aloha@uxhiconference.com"
        className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors"
      >
        Become a Sponsor ↗
      </a>
    </div>
  );
}

export function ConferenceNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────── */}
      <aside className="hidden md:flex w-56 fixed inset-y-0 left-0 flex-col bg-[#0f0d0b] border-r border-white/5 z-40">
        <div className="px-5 py-8">
          <Link href="/conferences/2026/" className="block">
            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-amber-400">
              UXHI Conference
            </p>
            <p className="font-display text-white text-2xl leading-tight mt-0.5">2026</p>
          </Link>
        </div>

        <div className="flex-1 px-2 overflow-y-auto">
          <NavLinks />
        </div>

        <div className="px-5 py-6 border-t border-white/5">
          <SocialAndSponsor />
        </div>
      </aside>

      {/* ── Mobile top bar ───────────────────────────────── */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0f0d0b] border-b border-white/5 z-40 flex items-center justify-between px-5">
        <Link href="/conferences/2026/" className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-amber-400">
            UXHI Conference 2026
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-stone-400 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {/* ── Mobile full-screen drawer ─────────────────────── */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0f0d0b] flex flex-col">
          <div className="flex items-center justify-between px-5 h-14 border-b border-white/5">
            <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-amber-400">
              UXHI Conference 2026
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-stone-400 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-6">
            <NavLinks />
          </div>
          <div className="px-5 py-6 border-t border-white/5">
            <SocialAndSponsor />
          </div>
        </div>
      )}
    </>
  );
}
