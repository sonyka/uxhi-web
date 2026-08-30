import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  darkGray?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * LogoImage - Grayscale logo with hover color reveal
 *
 * Used for partner/sponsor logo grids. Sits as a dark neutral tint at rest
 * and reveals full colour on hover.
 *
 * The resting treatment is grayscale + brightness/contrast rather than plain
 * opacity. Opacity alone fades a logo toward the page background, which read
 * as washed-out grey; dropping brightness and contrast instead keeps the mark
 * solid while draining the colour. Matches the conference sponsor grid, which
 * arrived at the same values independently — kept in step deliberately, though
 * the two are not shared code (see CLAUDE.md on conference isolation).
 *
 * `darkGray` is a per-logo CMS flag for marks that still read too light at the
 * default, and simply removes the remaining opacity step.
 *
 * @see /design-system for usage examples
 */
export function LogoImage({ src, alt, width, height, darkGray = false, className, style }: LogoImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "object-contain grayscale brightness-75 contrast-75 transition duration-300",
        "hover:grayscale-0 hover:opacity-100 hover:brightness-100 hover:contrast-100",
        darkGray ? "opacity-100" : "opacity-90",
        className
      )}
      style={style}
    />
  );
}
