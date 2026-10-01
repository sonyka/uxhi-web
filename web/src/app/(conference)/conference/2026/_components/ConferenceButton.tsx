import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { PURPLE, TEAL_60, TYPE } from "../theme";

// The conference pill CTA. Six call sites shared this exact class string plus a
// hand-written <img> and eslint-disable each; the spec ("44px height · 15px ·
// Bricolage Grotesque 400") was a comment in page.tsx rather than a component.
//
// Year-owned, and this comment used to say the opposite. It was written when
// Phase 3 put the button at (conference)/_components/ on the assumption that
// 2027 would reuse it; Phase 4 was then cancelled — every year is a full
// redesign — and `aad1ad4` moved the file back down here with the three other
// things that had drifted up. The height, radius, fills and type are 2026's
// design, not cross-year infrastructure.
//
// See docs/CONFERENCE-DESIGN-SYSTEM.md, Phase 4 and its table of moves.

type Variant = "primary" | "secondary" | "outline";

interface CommonProps {
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
  className?: string;
}

/**
 * Either a destination or an action, never neither.
 *
 * `href` is the normal case and stays required for it. Omitting it renders a
 * <button> instead of an <a> — for the one thing on this site that is a real
 * in-page action rather than a link: the reload on the error page. A reload
 * cannot be an anchor, because the conference domain rewrites its paths and
 * `href="/conference/2026/"` would put that path in the URL bar in place of
 * the clean one the visitor arrived on.
 *
 * Expressed as a union so a button without a handler, or a link that does
 * nothing, fails to compile rather than rendering an inert pill.
 */
type ConferenceButtonProps = CommonProps &
  (
    | { href: string; onClick?: () => void }
    | { href?: undefined; onClick: () => void }
  );

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
  const iconEl = Icon ? <Icon size={sz.icon} /> : null;
  const style = {
    background: v.background,
    ...(v.borderColor ? { borderColor: v.borderColor, color: v.borderColor } : {}),
  };
  const label = (
    <>
      {iconPosition === "leading" && iconEl}
      {children}
      {iconPosition === "trailing" && iconEl}
    </>
  );

  // No destination means this is an action, not a link. cursor-pointer is
  // explicit because Tailwind v4's preflight leaves a <button> on the default
  // arrow, where an <a> gets the hand for free.
  if (href === undefined) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(BASE, "cursor-pointer", sz.className, sz.type, v.className, className)}
        style={style}
      >
        {label}
      </button>
    );
  }

  const isExternal =
    external ?? !(href.startsWith("#") || href.startsWith("/"));

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener" } : {})}
      onClick={onClick}
      className={cn(BASE, sz.className, sz.type, v.className, className)}
      style={style}
    >
      {label}
    </a>
  );
}
