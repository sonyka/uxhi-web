"use client";

import { useEffect, useRef } from "react";

const GRAY_110 = "#50555A";
const GRAY_110_FILTER = "grayscale(1) brightness(0.4)";

const ITEMS = [
  { label: "2025 — UXperience 'Aina", href: "/conferences/2025/" },
  { label: "2024 — UXperience Aloha", href: "/conferences/2024/" },
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
        className="inline-flex items-center gap-[7px] text-[15px] font-normal cursor-pointer select-none hover:opacity-70 transition-opacity"
        style={{ color: GRAY_110, listStyle: "none" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/conferences/2026/assets/icons/icon-shaka.svg" alt="" width={16} height={16}
          style={{ width: 16, height: 16, filter: GRAY_110_FILTER }} />
        Past conferences
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/conferences/2026/assets/icons/icon-angle-small-down.svg" alt="" width={12} height={12}
          style={{ width: 12, height: 12, filter: GRAY_110_FILTER }} />
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
            className="block px-4 py-3 text-[14px] font-normal no-underline hover:bg-[#F4F1EA] transition-colors"
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
