import { cn } from "@/lib/utils";

export interface DistributionBand {
  label: string;
  /** Percentage of respondents, 0–100 */
  value: number;
}

interface DistributionBarsProps {
  bands: DistributionBand[];
  /** Accessible description of what the distribution shows */
  caption: string;
  className?: string;
}

/**
 * Sequential orange ramp, low band to high.
 *
 * The State of UX report encodes ordered bands as a light-to-dark orange
 * ramp. Every step it uses is already a token in the palette, so the ramp is
 * aliased here rather than restated as hex.
 */
const RAMP = [
  "bg-orange-30",
  "bg-orange-50",
  "bg-orange-70",
  "bg-orange-90",
  "bg-orange-100",
  "bg-orange-110",
];

function rampStep(index: number, total: number) {
  if (total <= 1) return RAMP[RAMP.length - 1];
  const position = (index / (total - 1)) * (RAMP.length - 1);
  return RAMP[Math.round(position)];
}

/**
 * DistributionBars - An ordered percentage distribution.
 *
 * Renders the report's 100% stacked bar on desktop, where the full width is
 * available and segment proportions read at a glance, and reflows to labelled
 * rows below `md`, where six segments and their captions cannot share a line.
 * Both are decorative; the data itself is exposed once to assistive tech as a
 * table, so the reflow costs nothing in meaning.
 *
 * @see /design-system for usage examples
 */
export function DistributionBars({
  bands,
  caption,
  className,
}: DistributionBarsProps) {
  const total = bands.length;

  return (
    <figure className={cn("m-0", className)}>
      {/* Desktop: the report's stacked bar */}
      <div className="hidden md:block" aria-hidden="true">
        <div className="flex w-full overflow-hidden rounded-sm">
          {bands.map((band, i) => (
            <div
              key={band.label}
              className={cn("h-28", rampStep(i, total))}
              style={{ width: `${band.value}%` }}
            />
          ))}
        </div>

        <div className="flex w-full">
          {bands.map((band) => (
            <div
              key={band.label}
              className="flex flex-col items-center gap-1 px-1 pt-4 text-center"
              style={{ width: `${band.value}%` }}
            >
              <span className="font-display text-base text-purple-140 tabular-nums">
                {band.value}%
              </span>
              <span
                className={cn(
                  "text-xs font-bold text-purple-140 tabular-nums",
                  // narrow segments cannot hold the full range on one line
                  band.value < 12 && "leading-tight"
                )}
              >
                {band.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Below md: the same data as rows */}
      <ul className="flex flex-col gap-4 md:hidden" aria-hidden="true">
        {bands.map((band, i) => (
          <li
            key={band.label}
            className="grid grid-cols-[minmax(0,8.5rem)_1fr_auto] items-center gap-x-3"
          >
            <span className="text-sm text-purple-140 font-bold tabular-nums">
              {band.label}
            </span>
            <span className="h-3 overflow-hidden rounded-full bg-gray-20">
              <span
                className={cn("block h-full rounded-full", rampStep(i, total))}
                style={{ width: `${band.value}%` }}
              />
            </span>
            <span className="text-sm text-gray-120 tabular-nums text-right">
              {band.value}%
            </span>
          </li>
        ))}
      </ul>

      {/* The data, once, for assistive technology */}
      <table className="sr-only">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Salary range</th>
            <th scope="col">Share of respondents</th>
          </tr>
        </thead>
        <tbody>
          {bands.map((band) => (
            <tr key={band.label}>
              <th scope="row">{band.label}</th>
              <td>{band.value}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
