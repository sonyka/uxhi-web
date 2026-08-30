import Image from "next/image";
import { cn } from "@/lib/utils";

export interface MarqueeLogo {
  /** Logo image. Omit to fall back to the name as text. */
  src?: string;
  /** Organisation name. Used as alt text, and rendered when there is no src. */
  name: string;
  /** Intrinsic dimensions, for Next/Image. Display size comes from `size`. */
  width?: number;
  height?: number;
  href?: string;
}

interface LogoMarqueeProps {
  logos: MarqueeLogo[];
  /** Seconds for one full pass. */
  speed?: "slow" | "normal" | "fast";
  /** Rendered logo height. Widths follow each logo's own aspect ratio. */
  size?: "md" | "lg";
  direction?: "left" | "right";
  /** Soft edges, so logos enter and leave rather than being clipped. */
  fade?: boolean;
  className?: string;
}

const SPEEDS = { slow: 70, normal: 50, fast: 32 } as const;
const HEIGHTS = { md: 56, lg: 72 } as const;

const FADE_MASK =
  "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)";

/**
 * LogoMarquee - Full-colour logo strip that scrolls horizontally, forever.
 *
 * For partner and sponsor walls. Logos keep their own colour: a wall of
 * greyed-out marks reads as a wall of grey, and a scrolling strip already
 * gives the section its rhythm without needing a uniform tint.
 *
 * Sizing normalises on HEIGHT, not width, so marks of different aspect
 * ratios sit at the same optical weight — the thing a mixed logo wall
 * usually gets wrong.
 *
 * The loop works by rendering the list several times and translating the
 * track by exactly one set, which lands the next copy where the last began.
 * No pixel distances to keep in sync when logos are added or removed.
 *
 * Pauses on hover, and honours prefers-reduced-motion by holding still and
 * becoming a normal horizontal scroller instead. Both live in globals.css
 * under "logo marquee".
 *
 * Best placed full-bleed — outside any max-width container — so logos run to
 * the edge of the viewport rather than stopping short.
 *
 * @see /design-system for usage examples
 */
export function LogoMarquee({
  logos,
  speed = "normal",
  size = "md",
  direction = "left",
  fade = true,
  className,
}: LogoMarqueeProps) {
  if (!logos.length) return null;

  const height = HEIGHTS[size];

  // How many copies of the list the track holds. The loop is seamless only
  // while the copies NOT being scrolled past still cover the viewport, so two
  // is not enough on a wide screen with few logos: one set can be narrower
  // than the window, and a gap opens at the trailing edge. Three copies keeps
  // twice the set width on screen at all times, and short lists repeat more.
  const copies = Math.max(3, Math.ceil(24 / logos.length));
  const track = Array.from({ length: copies }, () => logos).flat();
  // Shift by exactly one set, whatever the count, so speed stays constant.
  const shift = `${100 / copies}%`;

  return (
    <div
      className={cn("logo-marquee relative w-full overflow-hidden", className)}
      style={fade ? { maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK } : undefined}
    >
      <ul
        className="logo-marquee-track flex w-max items-center gap-12 md:gap-[60px]"
        data-direction={direction}
        style={
          {
            "--marquee-duration": `${SPEEDS[speed]}s`,
            "--marquee-shift": shift,
          } as React.CSSProperties
        }
      >
        {track.map((logo, i) => {
          // Only the first copy is announced; the rest are decorative duplication.
          const duplicate = i >= logos.length;
          const content = logo.src ? (
            <Image
              src={logo.src}
              alt={duplicate ? "" : logo.name}
              width={logo.width ?? 200}
              height={logo.height ?? 80}
              className="w-auto max-w-[220px] object-contain"
              style={{ height }}
            />
          ) : (
            <span className="text-gray-120 font-medium text-lg whitespace-nowrap">
              {logo.name}
            </span>
          );

          return (
            <li
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center"
              aria-hidden={duplicate || undefined}
            >
              {logo.href ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center transition-opacity hover:opacity-70"
                  tabIndex={duplicate ? -1 : undefined}
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
