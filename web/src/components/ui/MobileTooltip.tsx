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
}

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
}: MobileTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const styles = tones[tone];

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

      {/* Sized in em so it tracks body copy, capped so it stays a marker
          rather than a button beside 80px display type.

          Aligned by its top, not its baseline, so it clears the word and
          reads as a superscript: 0.68em sits above a lowercase x-height, and
          subtracting the icon's own height lifts its top to there.
          `align-super` cannot do this — with a capped icon the height is not
          a fixed share of the em, so the offset has to come off the size
          actually rendered.

          The floor carries body copy, where the icon is the full 0.7em and so
          taller than the band it is aligning into: the subtraction goes to
          nothing and would drop it flat onto the baseline. 0.18em lifts it
          just clear of cap height instead, which is the same superscript
          reading at a size where the arithmetic cannot produce it. */}
      <InfoIcon
        className={`inline-block w-[min(0.7em,20px)] h-[min(0.7em,20px)] ml-[0.06em] align-[max(0.18em,calc(0.68em-min(0.7em,20px)))] transition-colors ${styles.icon}`}
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
