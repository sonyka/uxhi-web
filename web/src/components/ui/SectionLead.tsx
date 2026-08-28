import { cn } from "@/lib/utils";

type LeadSize = "hero" | "md";
type LeadColor = "gray" | "black" | "white";

interface SectionLeadProps {
  children: React.ReactNode;
  /** Size variant:
   * - hero: lg → xl → 2xl (subheadline under a display/hero heading)
   * - md: base → lg (supporting copy under a section heading)
   */
  size?: LeadSize;
  /** Color variant (default: gray) */
  color?: LeadColor;
  className?: string;
}

const sizeStyles: Record<LeadSize, string> = {
  hero: "text-lg md:text-xl lg:text-2xl leading-relaxed",
  md: "text-base md:text-lg leading-relaxed",
};

const colorStyles: Record<LeadColor, string> = {
  gray: "text-gray-120",
  black: "text-black",
  white: "text-white",
};

/**
 * SectionLead - Supporting paragraph that sits directly beneath a heading.
 *
 * Pairs with SectionHeading: use size="hero" under a "display" or "hero"
 * heading, size="md" under the smaller section headings. Keeps subheadline
 * type out of page files so the ramp lives in one place.
 *
 * @see /design-system for usage examples
 */
export function SectionLead({
  children,
  size = "hero",
  color = "gray",
  className,
}: SectionLeadProps) {
  return (
    <p className={cn(sizeStyles[size], colorStyles[color], className)}>
      {children}
    </p>
  );
}
