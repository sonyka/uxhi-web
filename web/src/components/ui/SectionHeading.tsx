import { cn } from "@/lib/utils";

type HeadingSize = "sm" | "md" | "lg" | "xl" | "hero";
type HeadingColor = "purple" | "white" | "black" | "gray";
type HeadingTag = "h1" | "h2" | "h3";

interface SectionHeadingProps {
  children: React.ReactNode;
  /** Size variant:
   * - hero: 4xl → 5xl (interior page hero h1)
   * - xl: 4xl → 5xl → 6xl (large CTA headings)
   * - lg: 4xl → 5xl (section headings)
   * - md: 3xl → 4xl (most common section heading)
   * - sm: 2xl → 3xl (smaller subsections)
   */
  size?: HeadingSize;
  /** Color variant (default: purple) */
  color?: HeadingColor;
  /** HTML heading tag (default: h2) */
  as?: HeadingTag;
  className?: string;
}

const sizeStyles: Record<HeadingSize, string> = {
  hero: "text-4xl leading-[40px] lg:text-5xl lg:leading-[60px]",
  xl: "text-4xl md:text-5xl lg:text-6xl",
  lg: "text-4xl md:text-5xl",
  md: "text-3xl md:text-4xl",
  sm: "text-2xl md:text-3xl",
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
