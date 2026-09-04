"use client";

// SocialLink attaches an onClick, so the module is a client one. The footer is
// a server component and imports the glyphs from here, which is fine — it just
// means these few presentational nodes render on the client.
import Image from "next/image";

/**
 * The conference's social marks: grey at rest, full colour on hover.
 *
 * Replaces two treatments that had drifted apart. Instagram was an inline SVG
 * painting with currentColor; LinkedIn was a filled brand tile desaturated with
 * a CSS filter. Side by side at 24px the tile read heavier and darker than the
 * outline glyph, because a solid square and a stroked camera carry different
 * weight even at the same size. Both are now drawn as outline marks in one
 * 48x48 box at one stroke weight, so the pair reads as a set.
 *
 * The reveal is a cross-fade between two files rather than a filter, because
 * the resting grey is a chosen neutral (#50555A, the body grey) and not a
 * desaturation of either brand colour — grayscale() on LinkedIn blue lands
 * near #6a6a6a, which is close enough to look like a mistake rather than a
 * decision.
 *
 * The assets live in the year's own tree. The conference host rewrites any
 * unmatched path into the current year, so a shared /images/nav/ asset 404s
 * there; everything under /conferences/<year>/assets/ is passed through and
 * served straight off the CDN.
 */

const ASSETS = "/conferences/2026/assets/logos";

export type Network = "instagram" | "linkedin";

const NETWORKS: Record<Network, { label: string; grey: string; colour: string }> = {
  instagram: {
    label: "Instagram",
    grey: `${ASSETS}/glyph-instagram.svg`,
    colour: `${ASSETS}/glyph-instagram-color.svg`,
  },
  linkedin: {
    label: "LinkedIn",
    grey: `${ASSETS}/glyph-linkedin.svg`,
    colour: `${ASSETS}/glyph-linkedin-color.svg`,
  },
};

/**
 * The mark on its own.
 *
 * Colour is revealed by `group-hover`, so the hover target is whatever ancestor
 * carries `group` — the link around it, or the button it sits inside. That is
 * what lets one glyph serve the footer, the bio drawers and the pill CTAs
 * without each one restating the behaviour.
 */
export function SocialGlyph({
  network,
  size = 24,
}: {
  network: Network;
  size?: number;
}) {
  const { grey, colour } = NETWORKS[network];

  return (
    <span
      className="relative inline-block shrink-0 align-middle"
      style={{ width: size, height: size }}
    >
      <Image
        src={grey}
        alt=""
        width={size}
        height={size}
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
      />
      <Image
        src={colour}
        alt=""
        width={size}
        height={size}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </span>
  );
}

/**
 * The mark as a link, for a profile or a footer row.
 *
 * `name` names whose profile it is, so the label reads "UXHI on LinkedIn"
 * rather than just "LinkedIn" when several sit near each other.
 */
export function SocialLink({
  network,
  href,
  name,
  size = 24,
}: {
  network: Network;
  href: string;
  name: string;
  size?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      // The bio drawers sit on top of a clickable card; without this, opening a
      // profile would also toggle the card underneath.
      onClick={(e) => e.stopPropagation()}
      aria-label={`${name} on ${NETWORKS[network].label}`}
      className="group inline-flex items-center w-fit"
    >
      <SocialGlyph network={network} size={size} />
    </a>
  );
}

/**
 * Size-only wrappers, satisfying ConferenceButton's `icon` contract.
 *
 * The button carries `group`, so a glyph inside one colours on hover along with
 * the rest of the pill.
 */
export function InstagramGlyph({ size = 24 }: { size?: number }) {
  return <SocialGlyph network="instagram" size={size} />;
}

export function LinkedInGlyph({ size = 24 }: { size?: number }) {
  return <SocialGlyph network="linkedin" size={size} />;
}
