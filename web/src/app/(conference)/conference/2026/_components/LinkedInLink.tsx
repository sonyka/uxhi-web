import Image from "next/image";

/**
 * LinkedIn mark as a link: grey at rest, full colour on hover.
 *
 * Deliberately a copy of the main site's components/ui/LinkedInLink rather than
 * an import of it. A conference year owns its own visual components, so that
 * 2027 can restyle without touching the parent — the duplication is the price
 * of that rule, and it is written down in both files so neither looks accidental.
 *
 * The glyph is a copy inside the year's own asset tree, not the shared one at
 * /images/nav/. It has to be: the conference host rewrites any unmatched path
 * into the current year, so a request for /images/nav/glyph-linkedin.svg became
 * /conference/2026/images/nav/glyph-linkedin.svg and 404'd — the mark was broken
 * in the footer, the Pau Hana CTA and every speaker drawer at once. Everything
 * under /conferences/<year>/assets/ is passed through untouched and served
 * straight off the CDN, which is why every other asset here kept working.
 *
 * Middleware now also passes file requests through, but this does not lean on
 * that: the asset sits where the year's other assets sit, and the routing it
 * depends on is the same routing they depend on.
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
        src="/conferences/2026/assets/logos/glyph-linkedin.svg"
        alt=""
        width={size}
        height={size}
        className="grayscale opacity-70 group-hover/linkedin:grayscale-0 group-hover/linkedin:opacity-100 transition-all duration-300"
      />
    </a>
  );
}

/**
 * The same mark, monochrome and static.
 *
 * For navigation and calls to action, where LinkedIn is a destination rather
 * than someone's profile. Shares the bio links' asset purely for its rounded
 * corners; the colour and the hover reveal belong to the profile treatment and
 * would be saying the wrong thing next to a monochrome Instagram icon.
 *
 * Takes `size` so it satisfies ConferenceButton's icon contract.
 */
export function LinkedInGlyph({ size = 24 }: { size?: number }) {
  return (
    <Image
      src="/conferences/2026/assets/logos/glyph-linkedin.svg"
      alt=""
      width={size}
      height={size}
      // Greyscaled and left there. The asset is used for its rounded corners,
      // not its blue: in a footer or on a button label this sits beside
      // monochrome icons and should match them, so there is no hover reveal.
      className="grayscale"
    />
  );
}
