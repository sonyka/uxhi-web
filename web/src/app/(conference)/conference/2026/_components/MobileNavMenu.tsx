"use client";

import { useEffect, useRef } from "react";
import { GRAY_110, BEIGE_30, TYPE } from "../theme";
import { ShakaIcon, StarIcon, EmailHeartIcon, AngleDownIcon, CursorClickIcon } from "./icons";

// Flat menu — past conferences + about uxhi on the same tier
const ITEMS = [
  { label: "2025 · UXperience 'Aina", href: "/2025/", Icon: ShakaIcon },
  { label: "2024 · UXperience Aloha",  href: "/2024/", Icon: ShakaIcon },
  { label: "UXHI",                     href: "https://uxhi.community", Icon: StarIcon },
  { label: "Email us",                 href: "mailto:uxhiconference@gmail.com", Icon: EmailHeartIcon },
];

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
    <details ref={ref} className="relative sm:hidden">
      {/* White pill button matching Figma footer design */}
      <summary
        className="inline-flex items-center gap-2 h-[40px] px-4 bg-white rounded-full cursor-pointer select-none"
        style={{ listStyle: "none" }}
      >
        <CursorClickIcon size={20} />
        <AngleDownIcon size={12} />
      </summary>

      {/* Dropdown pops upward — all items on same tier */}
      <div
        className="absolute bottom-full left-0 mb-3 bg-white rounded-2xl overflow-hidden z-50"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)", minWidth: "220px" }}
      >
        {ITEMS.map(({ label, href, Icon }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener"}
            className={`flex items-center gap-[10px] px-4 py-3 ${TYPE.ui} no-underline transition-colors`}
            style={{ color: GRAY_110 }}
            onMouseEnter={e => (e.currentTarget.style.background = BEIGE_30)}
            onMouseLeave={e => (e.currentTarget.style.background = "")}
            onClick={() => { if (ref.current) ref.current.open = false; }}
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </div>
    </details>
  );
}
