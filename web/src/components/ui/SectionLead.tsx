import { cn } from "@/lib/utils";

type LeadSize = "hero" | "lg" | "md";
type LeadColor = "gray" | "black" | "white" | "purple";

interface SectionLeadProps {
  children: React.ReactNode;
  /** Size variant:
   * - hero: lg → xl → 2xl (subheadline under a display/hero heading)
   * - lg: lg → xl (a short one-line lead, where md reads undersized)
   * - md: base → lg (supporting copy under a section heading)
   */
  size?: LeadSize;
  /** Color variant (default: gray) */
  color?: LeadColor;
  className?: string;
}

const sizeStyles: Record<LeadSize, string> = {
  hero: "text-lg md:text-xl lg:text-2xl leading-relaxed",
  lg: "text-lg md:text-xl leading-relaxed",
  md: "text-base md:text-lg leading-relaxed",
};

const colorStyles: Record<LeadColor, string> = {
  gray: "text-gray-120",
  black: "text-black",
  white: "text-white",
  purple: "text-purple-50",
};

/**
 * SectionLead - Supporting paragraph that sits directly beneath a heading.
 *
 * Pairs with SectionHeading: use size="hero" under a "display" or "hero"
 * heading, size="md" under the smaller section headings, and size="lg" for a
 * short one-liner that md leaves looking undersized. Keeps subheadline type
 * out of page files so the ramp lives in one place.
 *
 * Every size owns a responsive ramp; a lead pinned to one value is a lead
 * that stops responding, which is how these two started life as inline
 * text-lg paragraphs.
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
