"use client";

import { useEffect, useRef } from "react";

// Flat menu — past conferences + about uxhi on the same tier
const ITEMS = [
  { label: "2025 — UXperience 'Aina", href: "/conferences/2025/" },
  { label: "2024 — UXperience Aloha",  href: "/conferences/2024/" },
  { label: "About UXHI",               href: "https://uxhi.community" },
];

const ICON_FILTER = "grayscale(1) brightness(0.4)";

export function MobileNavMenu() {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        ref.current.open = false;
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <details ref={ref} className="relative md:hidden">
      {/* White pill button matching Figma footer design */}
      <summary
        className="inline-flex items-center gap-2 h-[40px] px-4 bg-white rounded-full cursor-pointer select-none"
        style={{ listStyle: "none" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/conferences/2026/assets/icons/icon-cursor-finger-click.svg"
          alt=""
          width={20}
          height={20}
          style={{ width: 20, height: 20, filter: ICON_FILTER }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/conferences/2026/assets/icons/icon-angle-small-down.svg"
          alt=""
          width={12}
          height={12}
          style={{ width: 12, height: 12, filter: ICON_FILTER }}
        />
      </summary>

      {/* Dropdown pops upward — all items on same tier */}
      <div
        className="absolute bottom-full left-0 mb-3 bg-white rounded-2xl overflow-hidden z-50"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)", minWidth: "220px" }}
      >
        {ITEMS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener"
            className="block px-4 py-3 text-[14px] font-normal no-underline transition-colors"
            style={{ color: "#50555A" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F4F1EA")}
            onMouseLeave={e => (e.currentTarget.style.background = "")}
            onClick={() => { if (ref.current) ref.current.open = false; }}
          >
            {label}
          </a>
        ))}
      </div>
    </details>
  );
}
