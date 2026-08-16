import { cn } from "@/lib/utils";
import { PURPLE, TEAL_60, TYPE } from "../_theme";

// The conference pill CTA. Six call sites shared this exact class string plus a
// hand-written <img> and eslint-disable each; the spec ("44px height · 15px ·
// Bricolage Grotesque 400") was a comment in page.tsx rather than a component.
//
// Lives at (conference)/_components/ rather than under a year, since nothing
// here is 2026-specific — `icon` takes a full path so each year passes its own
// assets. See docs/CONFERENCE-DESIGN-SYSTEM.md Phase 3.

type Variant = "primary" | "secondary";

interface ConferenceButtonProps {
  href: string;
  children: React.ReactNode;
  /**
   * primary   — purple fill, white label (Get tickets)
   * secondary — teal fill, black label (Become a sponsor, View on Map)
   */
  variant?: Variant;
  /** Full path to the icon SVG, e.g. "/conferences/2026/assets/icons/icon-shaka.svg" */
  icon?: string;
  /** Leading (default) reads as "do this"; trailing as "go here". */
  iconPosition?: "leading" | "trailing";
  className?: string;
}

const BASE =
  "inline-flex items-center gap-2 h-[44px] px-5 rounded-full font-normal no-underline hover:opacity-80 transition-opacity whitespace-nowrap";

const VARIANTS: Record<Variant, { className: string; background: string; invertIcon: boolean }> = {
  // The icon assets are dark, so the purple variant inverts them to read white.
  primary: { className: "text-white", background: PURPLE, invertIcon: true },
  secondary: { className: "text-black", background: TEAL_60, invertIcon: false },
};

/**
 * ConferenceButton — pill CTA for the conference site.
 *
 * Every current use is an external link, so target/rel are baked in. Add an
 * `external` prop if an in-site destination ever needs one.
 */
export function ConferenceButton({
  href,
  children,
  variant = "primary",
  icon,
  iconPosition = "leading",
  className,
}: ConferenceButtonProps) {
  const v = VARIANTS[variant];

  const iconEl = icon ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon}
      alt=""
      width={20}
      height={20}
      style={{ width: 20, height: 20, filter: v.invertIcon ? "invert(1)" : undefined }}
    />
  ) : null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={cn(BASE, TYPE.ui, v.className, className)}
      style={{ background: v.background }}
    >
      {iconPosition === "leading" && iconEl}
      {children}
      {iconPosition === "trailing" && iconEl}
    </a>
  );
}
