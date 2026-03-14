import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * SectionEyebrow - Uppercase label used above section content
 *
 * Style: 20px (h4), uppercase, wide tracking, bold, purple-120
 * Renders as <h4> by default.
 *
 * @see /design-system for usage examples
 */
export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <h4
      className={cn(
        "text-xl uppercase tracking-wider font-bold text-purple-120",
        className
      )}
    >
      {children}
    </h4>
  );
}
