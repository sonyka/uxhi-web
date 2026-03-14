import { cn } from "@/lib/utils";

interface HeroContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * HeroContent - Left-side content wrapper for interior page heroes
 *
 * Provides responsive padding, max-width constraints, and z-index
 * for the text content area of hero sections (about, events, join, etc.)
 *
 * Not used on the homepage (which has a centered hero layout).
 *
 * @see /design-system for usage examples
 */
export function HeroContent({ children, className }: HeroContentProps) {
  return (
    <div
      className={cn(
        "relative z-10 px-6 pt-32 pb-8 sm:max-w-[411px] md:max-w-[calc(100%-340px)] md:pl-10 lg:pl-24 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[583px] xl:max-w-[733px]",
        className
      )}
    >
      {children}
    </div>
  );
}
