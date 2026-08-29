import { cn } from "@/lib/utils";

interface HeroSectionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * HeroSection - Outer wrapper for interior page heroes.
 *
 * Holds the two halves of the hero: `HeroContent` on the left and the bento
 * art absolutely positioned on the right. Because it is the nearest positioned
 * ancestor, capping and centring it brings BOTH halves in together — the art
 * anchors to this box's right edge rather than the viewport's.
 *
 * That cap is the point of the component. Before it existed, this exact class
 * string was inline on all seven interior pages, the hero text sat 96px from
 * the screen edge, and the body content below sat in a centred 1280–1400px
 * column. The two agreed at roughly 1592px wide and diverged from there — 164px
 * apart at 1920, 544px at 2560, with over half the screen empty between the
 * heading and the art.
 *
 * Not used on the homepage, which has its own centred hero.
 *
 * @see /design-system for usage examples
 */
export function HeroSection({ children, className }: HeroSectionProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[1400px]",
        "min-h-[564px] sm:min-h-[746px] md:min-h-[747px] lg:min-h-[790px]",
        className
      )}
    >
      {children}
    </div>
  );
}
