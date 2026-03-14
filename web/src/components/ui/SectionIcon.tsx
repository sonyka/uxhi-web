import Image from "next/image";
import { cn } from "@/lib/utils";

interface SectionIconProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * SectionIcon - Large centered icon used above section content
 *
 * Size: 128x128px (w-32 h-32), centered with bottom margin
 * Uses Next.js Image with fill + object-contain
 *
 * @see /design-system for usage examples
 */
export function SectionIcon({ src, alt, className }: SectionIconProps) {
  return (
    <div className={cn("w-32 h-32 mx-auto mb-6 relative", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
      />
    </div>
  );
}
