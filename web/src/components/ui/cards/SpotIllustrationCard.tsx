import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SanityImage } from "@/components/ui/SanityImage";

type SpotIllustrationCardVariant = "dark" | "cream" | "white" | "translucent";

interface SanityImageValue {
  asset?: { _id?: string; url?: string };
  alt?: string;
}

interface SpotIllustrationCardProps {
  /** Static image source path */
  imageSrc?: string;
  /** Sanity CMS image object (alternative to imageSrc) */
  image?: SanityImageValue;
  /** Alt text for the image */
  imageAlt?: string;
  /** Card title */
  title: string;
  /** Simple description text (use children for complex content) */
  description?: string;
  /** Custom content (alternative to description) - for bullet lists, etc. */
  children?: ReactNode;
  /**
   * Visual variant:
   * - dark: Purple background with border (for dark sections)
   * - cream: Cream background with hover shadow
   * - white: White background with shadow
   * - translucent: Semi-transparent white (for purple backgrounds like findings)
   */
  variant?: SpotIllustrationCardVariant;
  /** Footer content (e.g., ArrowLinkButton) */
  footer?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

const variantStyles: Record<SpotIllustrationCardVariant, { card: string; title: string; description: string }> = {
  dark: {
    card: "bg-purple-700 border border-purple-500/30",
    title: "font-display text-2xl text-white",
    description: "text-purple-200",
  },
  cream: {
    card: "bg-cream hover:shadow-lg transition-shadow duration-300",
    title: "font-semibold text-gray-900 group-hover:text-purple-700 transition-colors",
    description: "text-gray-600 text-sm",
  },
  white: {
    card: "bg-white shadow-sm hover:shadow-lg transition-shadow duration-300",
    title: "font-display text-lg text-purple-700",
    description: "text-gray-600 text-base",
  },
  translucent: {
    card: "bg-white/10",
    title: "font-display text-lg text-white",
    description: "text-purple-100",
  },
};

/**
 * SpotIllustrationCard - Card with large illustrated icon
 *
 * Icon size: 96px desktop (w-24), 80px mobile (w-20)
 * Border radius: 24px (rounded-[24px])
 * Padding: 24px mobile, 32px desktop (p-6 md:p-8)
 *
 * Variants:
 * - dark: For purple backgrounds (home features section)
 * - cream: For light backgrounds (committee cards)
 * - white: For cream backgrounds (values cards)
 * - translucent: For purple backgrounds with semi-transparent bg (findings cards)
 *
 * @see /design-system for usage examples
 */
export function SpotIllustrationCard({
  imageSrc,
  image,
  imageAlt = "",
  title,
  description,
  children,
  variant = "cream",
  footer,
  className = "",
}: SpotIllustrationCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-[24px] p-6 md:p-8 flex flex-col items-center text-center group",
        styles.card,
        className
      )}
    >
      <div className="w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-6 relative">
        {image?.asset ? (
          <SanityImage
            value={image}
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full bg-purple-100 rounded-full" />
        )}
      </div>
      <h4 className={cn("mb-3 md:mb-4", styles.title)}>
        {title}
      </h4>
      {children ? (
        <div className={cn("leading-relaxed flex-grow w-full", styles.description)}>
          {children}
        </div>
      ) : description ? (
        <p className={cn("leading-relaxed flex-grow", styles.description)}>
          {description}
        </p>
      ) : null}
      {footer && (
        <div className="mt-6">
          {footer}
        </div>
      )}
    </div>
  );
}
