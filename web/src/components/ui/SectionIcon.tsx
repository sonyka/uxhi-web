import Image from "next/image";
import { cn } from "@/lib/utils";

type SectionIconSize = "default" | "sm";

interface SectionIconProps {
  src: string;
  alt: string;
  /**
   * How big the icon reads above its section.
   *
   * `default` is the 80px mark that opens a section on its own. `sm` is 56px,
   * for the icon that introduces a form rather than a section — there it is a
   * label for what follows, and larger it competes with the heading under it.
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
};

/**
 * SectionIcon - Centered icon above a section intro
 *
 * Size: 80x80px default, 56x56px at `size="sm"`. Centered with bottom margin.
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
