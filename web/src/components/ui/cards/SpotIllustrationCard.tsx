import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SanityImage } from "@/components/ui/SanityImage";

type SpotIllustrationCardVariant = "dark" | "beige" | "white" | "translucent";

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
   * - beige: Beige background with hover shadow
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
    card: "bg-purple-140 border border-purple-100/30",
    title: "font-display text-2xl text-white",
    description: "text-white",
  },
  beige: {
    card: "bg-beige-30 hover:shadow-lg transition-shadow duration-300",
    title: "font-semibold text-gray-140 group-hover:text-purple-140 transition-colors",
    // gray-120, not the gray-110 the light variants otherwise share. Beige-30 is
    // a warm ground rather than white, and gray-110 lands on it at 6.68:1 —
    // still AA, but under AAA and visibly washed out next to the gray-140
    // title. gray-120 reads as body copy again at 9.73:1.
    //
    // The white variant keeps gray-110 on purpose: on white that same colour is
    // 7.53:1 and already clears AAA, so darkening it would only make two light
    // cards disagree for no gain.
    description: "text-gray-120 text-base",
  },
  white: {
    card: "bg-white shadow-sm hover:shadow-lg transition-shadow duration-300",
    title: "font-display text-lg text-purple-140",
    description: "text-gray-110 text-base",
  },
  translucent: {
    card: "bg-white/10",
    title: "font-display text-lg text-white",
    description: "text-white",
  },
};

/**
 * SpotIllustrationCard - Card with large illustrated icon
 *
 * Icon size: 96px desktop (w-24), 80px mobile (w-20)
 * Border radius: 24px (rounded-[24px])
 * Padding: 24px mobile, 32px desktop (p-6 md:p-8)
 *
 * Copy is white on the purple grounds and gray on the light ones. The tinted
 * purples it used to carry on dark — purple-50 and purple-30 — read as washed
 * out rather than quiet.
 *
 * Variants:
 * - dark: For purple backgrounds (home features section)
 * - beige: For light backgrounds (committee cards)
 * - white: For beige backgrounds (values cards)
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
  variant = "beige",
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
            width={192}
            height={192}
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
          <div className="w-full h-full bg-purple-30 rounded-full" />
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
