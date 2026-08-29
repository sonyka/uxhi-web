import { cn } from "@/lib/utils";
import { CountUp } from "@/components/ui/motion";

interface StatFigure {
  value: number;
  label: string;
  /** Provenance note shown beneath the figure, as the report prints it */
  source?: string;
}

interface StatComparisonProps {
  primary: StatFigure;
  comparison: StatFigure;
  /** Prefix applied to both figures, e.g. "$" */
  prefix?: string;
  /** Word set between the pair (default: "vs") */
  separator?: string;
  className?: string;
}

function Figure({
  figure,
  prefix,
  tone,
}: {
  figure: StatFigure;
  prefix?: string;
  tone: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <CountUp
        to={figure.value}
        prefix={prefix}
        grouped
        className={cn(
          "font-display text-4xl md:text-5xl lg:text-6xl tabular-nums",
          tone
        )}
      />
      <span className="text-xl md:text-2xl text-purple-140">
        {figure.label}
      </span>
      {figure.source && (
        <span className="mt-1 max-w-xs text-xs leading-relaxed text-gray-120">
          {figure.source}
        </span>
      )}
    </div>
  );
}

/**
 * StatComparison - Two headline figures set against each other.
 *
 * Mirrors how the State of UX report presents nearly every key finding: a
 * Hawaiʻi figure and the national figure it is measured against, at equal
 * weight with "vs" between them, each carrying its own provenance note. Both
 * figures sit on the orange ramp the report uses for data; the comparison
 * takes the darker step so the pair still has a reading order.
 *
 * @see /design-system for usage examples
 */
export function StatComparison({
  primary,
  comparison,
  prefix,
  separator = "vs",
  className,
}: StatComparisonProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center sm:gap-6 md:gap-10",
        className
      )}
    >
      <Figure figure={primary} prefix={prefix} tone="text-orange-90" />

      <span
        className="font-display text-xl text-purple-140 sm:mt-6 md:text-2xl"
        aria-hidden="true"
      >
        {separator}
      </span>

      <Figure figure={comparison} prefix={prefix} tone="text-orange-110" />
    </div>
  );
}
