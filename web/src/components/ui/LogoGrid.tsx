import Image from "next/image";
import { cn } from "@/lib/utils";

export interface GridLogo {
  /** Logo image. Omit to fall back to the name as text. */
  src?: string;
  /** Organisation name. Used as alt text, and rendered when there is no src. */
  name: string;
  /** True intrinsic dimensions of the asset, crop applied. */
  width?: number;
  height?: number;
  href?: string;
  /**
   * Optical multiplier on the rendered height, evening out visual mass across
   * marks of different density. 1 = plain height normalisation.
   * @see lib/logoWeights.ts
   */
  weight?: number;
}

interface LogoGridProps {
  logos: GridLogo[];
  /** Base logo height in px before each logo's optical weight is applied. */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const HEIGHTS = { sm: 28, md: 36, lg: 44 } as const;

/**
 * LogoGrid - Partner/sponsor logos in a bordered tile grid.
 *
 * Logos sit muted inside uniform cells and come up in full colour on hover.
 * The grid is what makes the muting work: a ragged row of desaturated marks
 * reads as visual noise, but once every mark occupies an identical cell the
 * eye has a structure to scan and the colour becomes the reward for pointing
 * at one.
 *
 * Cells are TRANSPARENT — the rules are drawn with borders rather than by
 * showing a container colour through gaps — so the grid sits on whatever
 * ground the page already has instead of introducing a panel.
 *
 * A partial last row would leave the rectangle open on the bottom right, so
 * empty cells pad it out. The column count is responsive and unknowable from
 * here, so the padding is computed for every breakpoint and the wrong ones are
 * hidden with responsive classes — cheaper than measuring in the browser.
 *
 * Within a cell, logos size by optical VOLUME rather than height. Equal height
 * makes a wide wordmark carry several times the mass of a compact badge, which
 * is what makes a mixed wall look arbitrary; see lib/logoWeights.ts for how the
 * multipliers are measured.
 *
 * The resting tint matches the conference sponsor grid: grayscale plus reduced
 * brightness and contrast, not opacity. Opacity fades a mark toward the page
 * behind it and leaves it looking washed out; dropping brightness keeps it
 * solid while draining the colour.
 *
 * @see /design-system for usage examples
 */
export function LogoGrid({ logos, size = "md", className }: LogoGridProps) {
  if (!logos.length) return null;

  const height = HEIGHTS[size];

  // Cells needed to complete the last row, per breakpoint's column count.
  const COLS = { base: 2, sm: 3, lg: 5 };
  const missing = (cols: number) => (cols - (logos.length % cols)) % cols;
  const pad = {
    base: missing(COLS.base),
    sm: missing(COLS.sm),
    lg: missing(COLS.lg),
  };
  const fillers = Array.from(
    { length: Math.max(pad.base, pad.sm, pad.lg) },
    (_, i) => ({
      // Each filler shows only at the breakpoints that actually need it.
      className: cn(
        i < pad.base ? "block" : "hidden",
        i < pad.sm ? "sm:block" : "sm:hidden",
        i < pad.lg ? "lg:block" : "lg:hidden"
      ),
      key: `filler-${i}`,
    })
  );

  return (
    <ul
      className={cn(
        // Container draws the top and left rules; each cell draws its own right
        // and bottom. Internal lines stay a single 1px that way, at every
        // breakpoint, without a background showing through gaps.
        "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
        "border-t border-l border-gray-30",
        className
      )}
    >
      {logos.map((logo) => {
        const content = logo.src ? (
          <Image
            src={logo.src}
            alt={logo.name}
            width={logo.width ?? 400}
            height={logo.height ?? 200}
            className={cn(
              "w-auto max-w-full object-contain",
              "grayscale brightness-75 contrast-75 transition duration-300",
              "group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100"
            )}
            style={{ height: Math.round(height * (logo.weight ?? 1)) }}
          />
        ) : (
          <span className="text-gray-100 font-medium text-center text-sm transition-colors duration-300 group-hover:text-gray-130">
            {logo.name}
          </span>
        );

        return (
          <li
            key={logo.name}
            className="group flex h-[104px] items-center justify-center border-r border-b border-gray-30 px-5 md:h-[120px] md:px-7"
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full items-center justify-center"
                aria-label={logo.name}
              >
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      })}

      {fillers.map((f) => (
        <li key={f.key} aria-hidden className={cn("border-r border-b border-gray-30", f.className)} />
      ))}
    </ul>
  );
}
