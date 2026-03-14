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
 * Used for partner/sponsor logo grids. Starts grayscale with
 * reduced opacity, reveals full color on hover.
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
        "object-contain grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300",
        darkGray ? "opacity-70" : "opacity-50",
        className
      )}
      style={style}
    />
  );
}
