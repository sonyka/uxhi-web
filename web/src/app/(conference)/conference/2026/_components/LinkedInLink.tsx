import Image from "next/image";

/**
 * LinkedIn mark as a link: grey at rest, full colour on hover.
 *
 * Deliberately a copy of the main site's components/ui/LinkedInLink rather than
 * an import of it. A conference year owns its own visual components, so that
 * 2027 can restyle without touching the parent — the duplication is the price
 * of that rule, and it is written down in both files so neither looks accidental.
 *
 * The brand glyph itself is shared from /public, since it is LinkedIn's mark
 * rather than a UXHI design decision.
 */
export function LinkedInLink({
  href,
  name,
  size = 24,
}: {
  href: string;
  name: string;
  size?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={(e) => e.stopPropagation()}
      aria-label={`${name} on LinkedIn`}
      className="inline-block w-fit group/linkedin"
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
