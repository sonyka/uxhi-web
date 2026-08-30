"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface MobileTooltipProps {
  children: React.ReactNode;
  tooltip: string;
  className?: string;
  decorationElement?: React.ReactNode;
  /**
   * Where to read more. Without it a tooltip is a dead end: it defines a term
   * and offers nowhere to go. The panel sits inside the trigger's hover group,
   * so the link stays reachable when the pointer moves into it.
   */
  href?: string;
  /** Link wording (default: "Learn more") */
  linkLabel?: string;
}

export function MobileTooltip({
  children,
  tooltip,
  className = "",
  decorationElement,
  href,
  linkLabel = "Learn more",
}: MobileTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span
      ref={ref}
      className={`relative inline-block cursor-pointer group hover:text-purple-150 transition-colors ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Text with dotted underline on mobile only */}
      <span className="underline decoration-dotted decoration-gray-80 underline-offset-2 md:no-underline">
        {children}
      </span>

      {/* Decoration element (circle, underline, etc.) */}
      {decorationElement}

      {/* Tooltip - tap on mobile, hover on desktop */}
      <span
        className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-3 bg-white text-gray-120 text-sm font-body font-normal leading-snug tracking-normal rounded-xl shadow-lg border border-gray-20 w-72 text-left z-50 whitespace-normal transition-all duration-200
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible md:delay-300`}
        style={{ wordSpacing: '0.1em' }}
      >
        {tooltip}
        {href && (
          <Link
            href={href}
            // The trigger toggles the panel on click; without this the tap that
            // follows the link would also close it mid-navigation.
            onClick={(e) => e.stopPropagation()}
            className="mt-2 block font-semibold text-teal-100 hover:text-teal-120 underline underline-offset-2"
          >
            {linkLabel} &rarr;
          </Link>
        )}
        {/* Tail */}
        <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm" />
      </span>
    </span>
  );
}
