import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * LinkedInLink - the brand mark as a link, grey at rest and full colour on hover.
 *
 * The treatment was already in three places — the team card, the directory
 * drawer, and the conference bio cards — each with its own opacity and its own
 * hover group name. This is the one the site settled on.
 *
 * Grey is `grayscale opacity-70`, not a grey fill: the mark keeps its shape and
 * only loses its colour, so the hover restores rather than replaces it.
 *
 * The conference years keep their own copy of this by design — see
 * `conference/2026/_components/LinkedInLink.tsx`. A year owning its visuals is
 * the rule; the duplication is the cost of it.
 *
 * @see /design-system for usage examples
 */
export function LinkedInLink({
  href,
  name,
  size = 24,
  className,
}: {
  href: string;
  /** Whose profile it is, for the accessible label. */
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Cards that are themselves clickable sit behind some of these.
      onClick={(e) => e.stopPropagation()}
      aria-label={`${name} on LinkedIn`}
      className={cn("inline-block group/linkedin", className)}
    >
      <Image
        src="/images/nav/glyph-linkedin.svg"
        alt=""
        width={size}
        height={size}
        className="grayscale opacity-70 group-hover/linkedin:grayscale-0 group-hover/linkedin:opacity-100 transition-all duration-300"
      />
    </a>
  );
}
