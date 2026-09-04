import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * SocialGlyph — a social mark, grey at rest and full colour on hover.
 *
 * The marks used to be three different kinds of thing: LinkedIn a filled brand
 * tile desaturated with a CSS filter, Instagram a PNG, and the conference site
 * an inline SVG painting with currentColor. At 16 and 24px beside each other
 * that reads as three unrelated icons — a solid square and a stroked camera
 * carry different weight even at the same size. All of them are now outline
 * marks drawn in one 48x48 box at one stroke weight.
 *
 * The reveal cross-fades two files rather than filtering one. The resting grey
 * is a chosen neutral (#50555A, the body grey), not a desaturation of either
 * brand colour: grayscale() on LinkedIn blue lands near #6a6a6a, close enough
 * to look like a mistake rather than a decision.
 *
 * Colour is revealed by `group-hover`, so the hover target is whatever ancestor
 * carries `group` — the link around it, or a row it sits inside.
 *
 * The conference years keep their own copy of this by design — see
 * `conference/2026/_components/SocialLink.tsx`. A year owning its visuals is
 * the rule; the duplication is the cost of it.
 *
 * @see /design-system for usage examples
 */

export type Network = "instagram" | "linkedin";

const NETWORKS: Record<Network, { label: string; grey: string; colour: string }> = {
  instagram: {
    label: "Instagram",
    grey: "/images/nav/glyph-instagram.svg",
    colour: "/images/nav/glyph-instagram-color.svg",
  },
  linkedin: {
    label: "LinkedIn",
    grey: "/images/nav/glyph-linkedin.svg",
    colour: "/images/nav/glyph-linkedin-color.svg",
  },
};

export function socialLabel(network: Network) {
  return NETWORKS[network].label;
}

export function SocialGlyph({
  network,
  size = 24,
  className,
}: {
  network: Network;
  size?: number;
  className?: string;
}) {
  const { grey, colour } = NETWORKS[network];

  return (
    <span
      className={cn("relative inline-block shrink-0 align-middle", className)}
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
