"use client";

// SocialLink attaches an onClick, so the module is a client one. The footer is
// a server component and imports the glyphs from here, which is fine — it just
// means these few presentational nodes render on the client.
import {
  InstagramMarkColour,
  InstagramMarkGrey,
  LinkedInMarkColour,
  LinkedInMarkGrey,
} from "./marks";

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
 * Both marks are inline SVG rather than files under /conferences/2026/assets/.
 * A URL only resolves on this site, so a component carrying one is whole here
 * and a broken-image box anywhere else it is used — a preview, an export, a
 * design tool. See marks.tsx.
 */

export type Network = "instagram" | "linkedin";

const NETWORKS: Record<
  Network,
  { label: string; Grey: typeof InstagramMarkGrey; Colour: typeof InstagramMarkColour }
> = {
  instagram: { label: "Instagram", Grey: InstagramMarkGrey, Colour: InstagramMarkColour },
  linkedin: { label: "LinkedIn", Grey: LinkedInMarkGrey, Colour: LinkedInMarkColour },
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
  const { Grey, Colour } = NETWORKS[network];

  return (
    <span
      className="relative inline-block shrink-0 align-middle"
      style={{ width: size, height: size }}
    >
      <Grey
        size={size}
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
      />
      <Colour
        size={size}
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
