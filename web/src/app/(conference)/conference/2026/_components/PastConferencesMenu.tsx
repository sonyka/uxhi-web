"use client";

import { useEffect, useRef } from "react";
import { GRAY_110, TYPE } from "../theme";
import { ShakaIcon, AngleDownIcon } from "./icons";

// Archives are linked by their full path, not the short /2025/ form.
//
// The short one is produced by middleware, which only runs for the
// uxhiconference.com hostname — so /2025/ answered 404 on localhost, on the
// Vercel staging domain and on Netlify's default domain, which between them is
// every place this site gets reviewed before it ships.
//
// /conference/<year>/ resolves on all of them, production included: the
// middleware passes any path already starting with /conference/ straight
// through, and next.config bridges it to the frozen files under
// public/conferences/. One URL, correct everywhere.
const ITEMS = [
  { label: "2025 · UXperience 'Aina", href: "/conference/2025/" },
  { label: "2024 · UXperience Aloha", href: "/conference/2024/" },
];

export function PastConferencesMenu() {
  const ref = useRef<HTMLDetailsElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        ref.current.open = false;
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <details ref={ref} className="relative">
      <summary
        className={`inline-flex items-center gap-[7px] ${TYPE.ui} cursor-pointer select-none hover:opacity-70 transition-opacity`}
        style={{ color: GRAY_110, listStyle: "none" }}
      >
        <ShakaIcon size={16} />
        Past conferences
        <AngleDownIcon size={12} />
      </summary>

      {/* Dropdown — pops upward from footer */}
      <div className="absolute bottom-full left-0 mb-3 bg-white rounded-2xl overflow-hidden z-50"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)", minWidth: "200px" }}>
        {ITEMS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener"
            className={`block px-4 py-3 ${TYPE.ui} no-underline hover:bg-beige-30 transition-colors`}
            style={{ color: GRAY_110 }}
            onClick={() => { if (ref.current) ref.current.open = false; }}
          >
            {label}
          </a>
        ))}
      </div>
    </details>
  );
}
