import { cn } from "@/lib/utils";

export interface Principle {
  term: string;
  description: string;
}

interface PrincipleListProps {
  principles: Principle[];
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
 * Each term takes a teal rule above it so the four read as a set at a glance
 * without needing a card or a border box around each one.
 *
 * @see /design-system for usage examples
 */
export function PrincipleList({ principles, className }: PrincipleListProps) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2",
        className
      )}
    >
      {principles.map((principle) => (
        <div key={principle.term} className="flex flex-col gap-2">
          <span className="h-[3px] w-10 rounded-full bg-teal-90" aria-hidden="true" />
          <dt className="font-display text-xl text-purple-140 md:text-2xl">
            {principle.term}
          </dt>
          <dd className="m-0 text-base leading-relaxed text-gray-120 md:text-lg">
            {principle.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
