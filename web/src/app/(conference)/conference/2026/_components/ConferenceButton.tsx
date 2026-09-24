import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { PURPLE, TEAL_60, TYPE } from "../theme";

// The conference pill CTA. Six call sites shared this exact class string plus a
// hand-written <img> and eslint-disable each; the spec ("44px height · 15px ·
// Bricolage Grotesque 400") was a comment in page.tsx rather than a component.
//
// Lives at (conference)/_components/ rather than under a year, since nothing
// here is 2026-specific — `icon` takes a full path so each year passes its own
// assets. See docs/CONFERENCE-DESIGN-SYSTEM.md Phase 3.

type Variant = "primary" | "secondary" | "outline";

interface ConferenceButtonProps {
  href: string;
  children: React.ReactNode;
  /**
   * primary   — purple fill, white label (Get tickets)
   * secondary — teal fill, black label (Become a sponsor, View on Map)
   * outline   — no fill, purple hairline + purple label, for a secondary
   *             action sitting on a white surface where a filled pill
   *             would out-shout the copy next to it
   */
  variant?: Variant;
  /** An icon component from ./icons — it paints with the button's own color. */
  icon?: ComponentType<{ size?: number }>;
  /** Leading (default) reads as "do this"; trailing as "go here". */
  iconPosition?: "leading" | "trailing";
  /**
   * Whether the destination is off this site. Inferred from `href` — an anchor
   * or a site-relative path is in-site, anything else is not — so an in-page
   * CTA cannot accidentally open a second tab of the page it is already on.
   * Pass it only to override that reading.
   */
  external?: boolean;
  /**
   * md (default) is the 44px pill the hero and header use. sm is for a CTA
   * inside a band of running text, where a 44px pill sets the height of the
   * whole band rather than sitting in it.
   */
  size?: "md" | "sm";
  onClick?: () => void;
  className?: string;
}

// `group` is here so an icon can react to the button being hovered — the social
// glyphs cross-fade to full colour that way. Icons that paint with currentColor
// ignore it and are unaffected.
const BASE =
  "group inline-flex items-center gap-2 rounded-full no-underline hover:opacity-80 transition-opacity whitespace-nowrap";

const SIZES = {
  md: { className: "h-[44px] px-5", type: TYPE.ui, icon: 20 },
  sm: { className: "h-[34px] px-4 text-[14px] font-medium", type: "", icon: 16 },
} as const;

// Icons inherit the label color via currentColor, so the variant only has to
// set text color — no per-variant icon handling (the primary variant used to
// need filter: invert(1) to turn a black asset white).
const VARIANTS: Record<
  Variant,
  { className: string; background: string; borderColor?: string }
> = {
  primary: { className: "text-white", background: PURPLE },
  secondary: { className: "text-black", background: TEAL_60 },
  outline: { className: "border", background: "transparent", borderColor: PURPLE },
};

/**
 * ConferenceButton — pill CTA for the conference site.
 *
 * Outside links open in a new tab; in-site ones (an anchor on this page, a
 * site-relative path) open in place. That is read off `href` rather than asked
 * for at each call site, and `external` overrides it if a link ever needs the
 * other behaviour.
 */
export function ConferenceButton({
  href,
  children,
  variant = "primary",
  icon: Icon,
  iconPosition = "leading",
  external,
  size = "md",
  onClick,
  className,
}: ConferenceButtonProps) {
  const v = VARIANTS[variant];
  const sz = SIZES[size];
  const isExternal =
    external ?? !(href.startsWith("#") || href.startsWith("/"));
  const iconEl = Icon ? <Icon size={sz.icon} /> : null;

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener" } : {})}
      onClick={onClick}
      className={cn(BASE, sz.className, sz.type, v.className, className)}
      style={{
        background: v.background,
        ...(v.borderColor ? { borderColor: v.borderColor, color: v.borderColor } : {}),
      }}
    >
      {iconPosition === "leading" && iconEl}
      {children}
      {iconPosition === "trailing" && iconEl}
    </a>
  );
}
