import { cn } from "@/lib/utils";

export interface Principle {
  term: string;
  description: string;
}

interface PrincipleListProps {
  principles: Principle[];
  /** "dark" for purple grounds: white terms, purple-30 definitions. */
  tone?: "light" | "dark";
  /**
   * "sm" is one column with h5-style terms (body font, semibold) for narrow
   * spots like a form panel, where a display-font term would outrank its heading.
   */
  size?: "md" | "sm";
  className?: string;
}

/**
 * PrincipleList - A set of named ideas, each with a short definition.
 *
 * Rendered as a description list, because that is what it is: the term is
 * the thing being defined and the sentence defines it. Deliberately has no
 * icons — these are concepts rather than features, and a decorative icon per
 * term reads as filler next to words doing real work.
 *
 * At "md", each term takes a teal rule above it so the four read as a set at
 * a glance without needing a card or a border box around each one. At "sm"
 * (inside a form panel) the rules go: there the panel already holds the set,
 * and four cyan bars competed with the checkbox and heading for attention.
 *
 * @see /design-system for usage examples
 */
export function PrincipleList({ principles, tone = "light", size = "md", className }: PrincipleListProps) {
  const dark = tone === "dark";
  const sm = size === "sm";
  return (
    <dl
      className={cn(
        "grid grid-cols-1",
        sm ? "gap-y-5" : "gap-x-10 gap-y-8 sm:grid-cols-2",
        className
      )}
    >
      {principles.map((principle) => (
        <div key={principle.term} className={cn("flex flex-col", sm ? "gap-1.5" : "gap-2")}>
          {!sm && <span className="h-[3px] w-10 rounded-full bg-teal-90" aria-hidden="true" />}
          <dt
            className={cn(
              "text-balance",
              dark ? "text-white" : "text-purple-140",
              sm ? "font-semibold text-lg" : "font-display text-xl md:text-2xl"
            )}
          >
            {principle.term}
          </dt>
          <dd
            className={cn(
              "m-0 text-base leading-relaxed",
              dark ? "text-purple-30" : "text-gray-120",
              !sm && "md:text-lg"
            )}
          >
            {principle.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
