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
 * It also owns the hero ground. Interior pages set `bg-beige-10` on <main>,
 * a step lighter than the beige-30 the homepage hero shows — and since every
 * section below a hero paints its own background, that lighter ground was
 * visible in exactly one place per page: behind the hero. So the interior
 * heroes read whiter than the homepage's, which is the one they sit next to
 * in a visitor's memory. The ground is painted here, in the component all
 * seven share, rather than in seven page files.
 *
 * The colour goes on an outer, full-width box rather than on the capped one:
 * a background on a 1400px box stops at 1400px, and above that width the
 * <main> ground would show through as gutters either side of the hero.
 *
 * Not used on the homepage, which has its own centred hero.
 *
 * @see /design-system for usage examples
 */
export function HeroSection({ children, className }: HeroSectionProps) {
  return (
    // beige-30 is what --background resolves to, which is the ground the
    // homepage hero shows. Matching the token rather than restating a hex
    // keeps the two heroes on one colour if the page ground ever moves.
    <div className="bg-beige-30">
      <div
        className={cn(
          "relative mx-auto w-full max-w-[1400px]",
          "min-h-[564px] sm:min-h-[746px] md:min-h-[747px] lg:min-h-[790px]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
