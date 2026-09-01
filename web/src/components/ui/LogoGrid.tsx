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
  /**
   * Render in the given order instead of balancing rows by weight. Set this
   * when the sequence carries meaning — sponsor tiers, a headline partner
   * first. See `balanceRows` for what is otherwise done, and why.
   */
  preserveOrder?: boolean;
  className?: string;
}

const HEIGHTS = { sm: 28, md: 36, lg: 44 } as const;

/**
 * Reorders logos so no row ends up carrying all the heavy marks.
 *
 * Optical weights even out any single pair of logos, but they say nothing
 * about who a logo sits NEXT to, and a wall can be perfectly even per-cell
 * and still look wrong. The partner grid was the case in point: source order
 * happened to put every compact badge in row 2, giving row means of
 * 34 / 55 / 37px. Each mark was the right size and the grid still read as a
 * big row wedged between two small ones. The sponsor grid, with the same 2.7x
 * size spread, looked fine purely because its badges were scattered.
 *
 * Lowering the size spread barely touches this — it only takes that 21px row
 * gap to 11px, and pays for it by undoing the evening-out. Reordering takes it
 * to 3px and costs nothing.
 *
 * Heaviest-first into whichever row is currently lightest, then alternate big
 * and small within each row so the balance holds horizontally too.
 *
 * Rows are computed for the 5-column desktop layout, the widest and the one
 * this is most visible in. The sequence it produces alternates heavy and light
 * throughout, so 2- and 3-column breakpoints inherit a decent arrangement
 * rather than an optimal one — a real limit, but the alternative is measuring
 * in the browser to lay out a static grid.
 *
 * This overrides the CMS "Display Order" field, which is why `preserveOrder`
 * exists. Both current grids leave that field at plain insertion order, so
 * nothing meaningful is being discarded today.
 */
function balanceRows(logos: GridLogo[], cols = 5): GridLogo[] {
  if (logos.length <= cols) return logos;

  const w = (l: GridLogo) => l.weight ?? 1;
  const rowCount = Math.ceil(logos.length / cols);
  const capacity = Array.from({ length: rowCount }, (_, i) =>
    Math.min(cols, logos.length - i * cols)
  );
  const rows: GridLogo[][] = capacity.map(() => []);

  for (const logo of [...logos].sort((a, b) => w(b) - w(a))) {
    // Lightest row by MEAN, not sum: a short final row must not soak up the
    // heavy marks just because it has fewer of them.
    let best = -1;
    let bestMean = Infinity;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].length >= capacity[i]) continue;
      const mean = rows[i].reduce((s, l) => s + w(l), 0) / capacity[i];
      if (mean < bestMean) {
        bestMean = mean;
        best = i;
      }
    }
    rows[best].push(logo);
  }

  return rows.flatMap((row) => {
    const desc = [...row].sort((a, b) => w(b) - w(a));
    const half = Math.ceil(desc.length / 2);
    const heavy = desc.slice(0, half);
    const light = desc.slice(half).reverse();
    const out: GridLogo[] = [];
    for (let i = 0; i < half; i++) {
      out.push(heavy[i]);
      if (i < light.length) out.push(light[i]);
    }
    return out;
  });
}

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
 * The resting tint is grayscale plus a contrast reduction that LIFTS rather
 * than darkens. Read the filter as a transfer function and it has a fixed
 * point — the luminance it leaves alone — with everything below getting
 * lighter and everything above getting darker. Muting on a light ground wants
 * that point high, so nearly all of a mark fades toward the page.
 *
 * It used to sit at L=0.29 (`brightness-75 contrast-75`), which was tuned on
 * line art: dark ink does fall below 0.29 and so did fade. But every mid-tone
 * above it was pushed the wrong way, and a filled mark — an app icon, a
 * colour badge, a seal — is mostly mid-tones. Those went to a flat 0.35-0.49
 * mass, i.e. the "mute" made the densest logos the LOUDEST things in the grid.
 * Holoholo, Honolulu Tech Network, Honolulu BitDevs and OER were all bricks.
 *
 * `brightness-[1.18] contrast-[.55]` puts the fixed point at L=0.64, above
 * essentially everything, so filled marks lighten into the page while line art
 * still lands dark enough to read. Not opacity: opacity fades the whole mark
 * uniformly toward the ground and leaves thin strokes too weak to see.
 *
 * The conference sponsor grids deliberately do NOT track this — each year owns
 * its own design, so 2026 keeps the tint it shipped with.
 *
 * @see /design-system for usage examples
 */
export function LogoGrid({
  logos: sourceLogos,
  size = "md",
  preserveOrder = false,
  className,
}: LogoGridProps) {
  if (!sourceLogos.length) return null;

  const logos = preserveOrder ? sourceLogos : balanceRows(sourceLogos);
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
              "grayscale brightness-[1.18] contrast-[.55] transition duration-300",
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
