import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: React.ReactNode;
  /**
   * Ground the eyebrow sits on. `light` (beige, white) is purple-120;
   * `dark` (the purple-140 bands) is purple-30, the colour form labels use
   * on purple, so it reads as a quiet label rather than a second heading.
   */
  variant?: "light" | "dark";
  /**
   * `p` when the eyebrow sits above a heading of a higher level than h4, so
   * the outline doesn't jump backwards (e.g. step 2 of the join form, above
   * an h3).
   */
  as?: "h4" | "p";
  className?: string;
}

/**
 * SectionEyebrow - Uppercase label used above section content
 *
 * Style: 20px, uppercase, wide tracking, bold. Renders as <h4> by default.
 *
 * @see /design-system for usage examples
 */
export function SectionEyebrow({ children, variant = "light", as: Tag = "h4", className }: SectionEyebrowProps) {
  return (
    <Tag
      className={cn(
        "text-xl uppercase tracking-wider font-bold",
        variant === "dark" ? "text-purple-30" : "text-purple-120",
        className
      )}
    >
      {children}
    </Tag>
  );
}
