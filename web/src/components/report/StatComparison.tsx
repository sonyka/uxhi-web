import { cn } from "@/lib/utils";
import { CountUp } from "@/components/ui/motion";

interface StatComparisonProps {
  /** The figure being highlighted — rendered in teal at the larger size */
  primaryLabel: string;
  primaryValue: number;
  /** The figure it is measured against — rendered in a quieter grey */
  comparisonLabel: string;
  comparisonValue: number;
  /** Prefix applied to both figures, e.g. "$" */
  prefix?: string;
  /** Sentence beneath the pair stating what the gap means */
  gapNote?: React.ReactNode;
  className?: string;
}

/**
 * StatComparison - Two headline figures set against each other.
 *
 * Built for the State of UX report sections, where nearly every key finding
 * is "Hawaiʻi vs. the national number". The primary figure carries the teal
 * emphasis; the comparison sits back in grey so the contrast reads at a
 * glance rather than needing to be parsed.
 *
 * @see /design-system for usage examples
 */
export function StatComparison({
  primaryLabel,
  primaryValue,
  comparisonLabel,
  comparisonValue,
  prefix,
  gapNote,
  className,
}: StatComparisonProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-wrap items-end gap-x-12 gap-y-8">
        <div className="flex flex-col gap-2">
          <CountUp
            to={primaryValue}
            prefix={prefix}
            grouped
            className="font-display text-4xl md:text-5xl lg:text-6xl text-teal-100 tabular-nums"
          />
          <span className="text-base md:text-lg text-gray-120">
            {primaryLabel}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <CountUp
            to={comparisonValue}
            prefix={prefix}
            grouped
            className="font-display text-3xl md:text-4xl text-gray-90 tabular-nums"
          />
          <span className="text-base md:text-lg text-gray-120">
            {comparisonLabel}
          </span>
        </div>
      </div>

      {gapNote && (
        <p className="text-base md:text-lg text-gray-120 max-w-2xl">
          {gapNote}
        </p>
      )}
    </div>
  );
}
