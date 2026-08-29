import { cn } from "@/lib/utils";

export interface DistributionBand {
  label: string;
  /** Percentage of respondents, 0–100 */
  value: number;
  /** Pull this band forward — used for the band that carries the finding */
  emphasis?: boolean;
}

interface DistributionBarsProps {
  bands: DistributionBand[];
  /** Accessible description of what the distribution shows */
  caption: string;
  className?: string;
}

/**
 * DistributionBars - Horizontal percentage distribution.
 *
 * Replaces the report's pie and column charts, which do not survive a phone
 * viewport. Bars are laid out with a grid so the labels align in a column and
 * every bar shares one baseline; the scale is fixed to the largest band so
 * proportions stay honest rather than filling the row.
 *
 * @see /design-system for usage examples
 */
export function DistributionBars({
  bands,
  caption,
  className,
}: DistributionBarsProps) {
  const max = Math.max(...bands.map((b) => b.value));

  return (
    <figure className={cn("flex flex-col gap-5", className)}>
      <figcaption className="sr-only">{caption}</figcaption>

      <ul className="flex flex-col gap-4">
        {bands.map((band) => (
          <li
            key={band.label}
            className="grid grid-cols-[minmax(0,9.5rem)_1fr_auto] items-center gap-x-4 md:grid-cols-[minmax(0,12rem)_1fr_auto] md:gap-x-6"
          >
            <span
              className={cn(
                "text-sm md:text-base tabular-nums",
                band.emphasis ? "text-purple-140 font-bold" : "text-gray-120"
              )}
            >
              {band.label}
            </span>

            <span
              className="h-3 rounded-full bg-gray-20 overflow-hidden"
              aria-hidden="true"
            >
              <span
                className={cn(
                  "block h-full rounded-full",
                  band.emphasis ? "bg-teal-90" : "bg-teal-40"
                )}
                style={{ width: `${(band.value / max) * 100}%` }}
              />
            </span>

            <span
              className={cn(
                "text-sm md:text-base tabular-nums text-right",
                band.emphasis ? "text-purple-140 font-bold" : "text-gray-120"
              )}
            >
              {band.value}%
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
