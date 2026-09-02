"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { InfoIcon } from "./icons";

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
  /** Trigger colours. Use "dark" on purple/dark backgrounds. */
  tone?: "light" | "dark";
  /** Icon size in px: 24 beside the homepage hero, 16 in body copy. */
  iconSize?: 16 | 20 | 24;
  /** Optical lift in px, on top of the superscript offset. */
  iconNudge?: 0 | 2 | 4;
  /** Gap between label and icon. 0 keeps the default, which tracks type size. */
  iconGap?: 0 | 4;
}

// Explicit sizes rather than an em ramp: the mark is drawn artwork, and it
// holds up at set sizes better than at whatever a surrounding type ramp
// happens to produce.
const iconSizes = {
  16: "w-4 h-4 align-[max(0.18em,calc(0.68em-16px))]",
  20: "w-5 h-5 align-[max(0.18em,calc(0.68em-20px))]",
  24: "w-6 h-6 align-[max(0.18em,calc(0.68em-24px))]",
} as const;

// Per-placement optical trims. Spelled out rather than computed for the same
// reason as the sizes: Tailwind scans source text and cannot see a class
// assembled at runtime.
const iconNudges = {
  0: "",
  2: "-translate-y-[2px]",
  4: "-translate-y-[4px]",
} as const;

// 0 scales with the type it sits beside; a number is that gap in px flat.
const iconGaps = { 0: "ml-[0.06em]", 4: "ml-[4px]" } as const;

const tones = {
  light: {
    trigger: "hover:text-purple-150",
    icon: "text-gray-80 group-hover:text-purple-150",
  },
  dark: {
    trigger: "hover:text-white",
    icon: "text-purple-50/70 group-hover:text-white",
  },
};

/**
 * MobileTooltip - inline definition, revealed on tap or hover.
 *
 * The info icon is the affordance, and it is the same at every breakpoint:
 * a term that can be tapped looks tappable on a phone and on a desktop
 * alike. It replaced a dotted underline that only appeared below `md`, which
 * left the desktop trigger advertising nothing but a cursor change.
 *
 * `decorationElement` is positioned against the text alone, not the whole
 * trigger, so a decoration sized as a percentage of the phrase (the
 * homepage's part-width underline) keeps its ratio with the icon alongside.
 *
 * @see /design-system for usage examples
 */
export function MobileTooltip({
  children,
  tooltip,
  className = "",
  decorationElement,
  href,
  linkLabel = "Learn more",
  tone = "light",
  iconSize = 16,
  iconNudge = 0,
  iconGap = 0,
}: MobileTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const styles = tones[tone];
  const icon = `${iconSizes[iconSize]} ${iconNudges[iconNudge]} ${iconGaps[iconGap]}`;

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
      className={`relative inline-block cursor-pointer group transition-colors ${styles.trigger} ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Text and its decoration: the decoration measures against this span */}
      <span className="relative">
        {children}
        {decorationElement}
      </span>

      {/* Superscripted by its top rather than its baseline: 0.68em sits above
          a lowercase x-height, and taking off the icon's own height lifts its
          top to there. The size is fixed in px while the lift is in em, so
          the offset is written out per size in iconSizes, where Tailwind can
          scan it: an interpolated class would never be generated.

          The floor catches body copy, where a 16px mark is taller than the
          band it is aligning into: the subtraction goes to nothing and would
          sit the icon flat on the baseline, at exactly the size where a
          superscript is most legible as one. */}
      <InfoIcon
        className={`inline-block ${icon} transition-colors ${styles.icon}`}
      />

      {/* Tooltip - tap anywhere, plus hover on desktop */}
      <span
        className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-3 bg-white text-gray-120 text-sm font-body font-normal leading-snug tracking-normal rounded-xl shadow-lg border border-gray-20 w-72 text-left z-50 whitespace-normal transition-all duration-200
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          md:group-hover:opacity-100 md:group-hover:visible md:delay-300`}
        style={{ wordSpacing: "0.1em" }}
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
