import { cn } from "@/lib/utils";

type HeadingSize = "statement" | "sm" | "md" | "lg" | "xl" | "hero" | "display";
type HeadingColor = "purple" | "white" | "black" | "gray";
type HeadingTag = "h1" | "h2" | "h3";

interface SectionHeadingProps {
  children: React.ReactNode;
  /** Size variant:
   * - display: 36 → 60 → 72px (homepage hero only — the largest type on the site)
   * - hero: 4xl → 5xl (interior page hero h1)
   * - xl: 4xl → 5xl → 6xl (large CTA headings)
   * - lg: 4xl → 5xl (section headings)
   *
   * Every size carries its own leading. Tailwind's default line-height falls to
   * 1.0 by text-5xl, which reads as cramped on display type, so xl and lg pin
   * theirs rather than inherit it.
   * - md: 2xl → 4xl (most common section heading)
   * - sm: xl → 3xl (smaller subsections)
   * - statement: xl → 3xl → 4xl (the mission sentence)
   *
   * On a phone the ramp reads 20 · 24 · 28 · 28 · 32 · 40, smallest first.
   * Roles that share a desktop step do not share the phone one.
   *
   * `statement` and `sm` now share a phone step and part company above it:
   * the sentence keeps climbing to 4xl where the subsection heading stops at
   * 3xl, and it carries its own tight leading. They set different things — one
   * a sentence, one a two-word label — which is why they stay separate roles
   * even where the numbers agree.
   */
  size?: HeadingSize;
  /** Color variant (default: purple) */
  color?: HeadingColor;
  /** HTML heading tag (default: h2) */
  as?: HeadingTag;
  className?: string;
}

// Every role carries a phone step of its own below md. The desktop ramp was
// doing double duty: four roles all landed on text-4xl at the small end, so a
// section heading, a CTA heading and an interior h1 were the same 36px on a
// phone, and the only thing left telling them apart was where they sat on the
// page. The phone column now separates them, and it separates them downward —
// 36px of display type across a 390px column is three or four words a line.
//
// display stays at 40. It is the homepage hero, the one place on the site whose
// job is to be the largest thing on the screen.
const sizeStyles: Record<HeadingSize, string> = {
  display: "text-[36px] md:text-[60px] lg:text-[72px] leading-[1.05] lg:leading-[76px] tracking-tight",
  hero: "text-[32px] leading-[36px] md:text-4xl md:leading-[40px] lg:text-5xl lg:leading-[60px]",
  xl: "text-[28px] md:text-5xl lg:text-6xl leading-tight",
  lg: "text-[28px] md:text-5xl leading-tight",
  md: "text-2xl md:text-4xl",
  sm: "text-xl md:text-3xl",
  statement: "text-xl md:text-3xl lg:text-4xl leading-tight",
};

const colorStyles: Record<HeadingColor, string> = {
  purple: "text-purple-140",
  white: "text-white",
  black: "text-black",
  gray: "text-gray-130",
};

/**
 * SectionHeading - Display heading for page sections
 *
 * Uses Dela Gothic One (font-display) with responsive sizing.
 * Covers hero titles, section headings, and subsection headings.
 *
 * @see /design-system for usage examples
 */
export function SectionHeading({
  children,
  size = "md",
  color = "purple",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display",
        sizeStyles[size],
        colorStyles[color],
        className
      )}
    >
      {children}
    </Tag>
  );
}
