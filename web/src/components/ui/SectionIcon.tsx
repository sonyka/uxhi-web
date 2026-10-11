import Image from "next/image";
import { cn } from "@/lib/utils";

type SectionIconSize = "default" | "sm" | "lg";

interface SectionIconProps {
  src: string;
  alt: string;
  /**
   * How big the icon reads above its section.
   *
   * `default` is the 80px mark that opens a section on its own, and is what
   * every section intro on the site uses.
   *
   * `sm` is 56px, for an icon that labels what follows rather than opening a
   * section. FormSuccess uses it: the illustration on a form's success card
   * marks the outcome inside a card, so a full 80px section mark would
   * outweigh the title beneath it.
   *
   * `lg` is 96px and exists for exactly one mark — the UXHI conference icon on
   * the events page, which is a logo standing in for the conference rather
   * than a spot illustration, and reads as undersized at 80 next to the others.
   * It is a deliberate exception, not a tier: a second caller means the
   * default is wrong, not that `lg` needs company.
   */
  size?: SectionIconSize;
  className?: string;
}

/**
 * Per-size box and the matching `sizes` hint, resolved here so a call site
 * never hand-writes a width — the two have to agree or Next serves the wrong
 * candidate.
 */
const sizeStyles: Record<SectionIconSize, { box: string; sizes: string }> = {
  default: { box: "w-20 h-20", sizes: "80px" },
  sm: { box: "w-14 h-14", sizes: "56px" },
  lg: { box: "w-24 h-24", sizes: "96px" },
};

/**
 * SectionIcon - Centered icon above a section intro
 *
 * Size: 80x80px default, 56x56px at `size="sm"`, 96x96px at `size="lg"`.
 * Centered with bottom margin (overridable via className).
 * Uses Next.js Image with fill + object-contain.
 *
 * @see /design-system for usage examples
 */
export function SectionIcon({ src, alt, size = "default", className }: SectionIconProps) {
  const { box, sizes } = sizeStyles[size];

  return (
    <div className={cn(box, "mx-auto mb-6 relative", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-contain"
      />
    </div>
  );
}
