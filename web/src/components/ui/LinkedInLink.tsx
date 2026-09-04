import { cn } from "@/lib/utils";
import { SocialGlyph } from "./SocialGlyph";

/**
 * LinkedInLink - the brand mark as a link, grey at rest and full colour on hover.
 *
 * The treatment was already in three places — the team card, the directory
 * drawer, and the conference bio cards — each with its own opacity and its own
 * hover group name. This is the one the site settled on.
 *
 The mark itself comes from SocialGlyph, so LinkedIn and Instagram stay the
 * same kind of drawing. This is now only the link and label around it.
 *
 * The conference years keep their own copy of this by design — see
 * `conference/2026/_components/SocialLink.tsx`. A year owning its visuals is
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
      className={cn("group inline-block", className)}
    >
      <SocialGlyph network="linkedin" size={size} />
    </a>
  );
}
