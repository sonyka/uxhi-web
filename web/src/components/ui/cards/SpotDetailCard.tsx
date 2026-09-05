import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SanityImage } from "@/components/ui/SanityImage";
import { BulletPoint } from "@/components/ui/BulletPoint";

type SpotDetailCardVariant = "beige" | "translucent";

interface SanityImageValue {
  asset?: { _id?: string; url?: string };
  alt?: string;
}

interface CardStat {
  /** The one number that matters — set in display type */
  value: string;
  /** Sentence the number belongs to */
  caption: ReactNode;
}

interface SpotDetailCardProps {
  /** Static image source path */
  imageSrc?: string;
  /** Sanity CMS image object (alternative to imageSrc) */
  image?: SanityImageValue;
  /** Alt text for the image */
  imageAlt?: string;
  /** Card title, sits beside the icon */
  title: string;
  /**
   * Short line introducing the card, between the header row and the body.
   *
   * Below the header rather than stacked beside the title: next to a 56px icon
   * a lead only gets the card's width minus 72px, which at a phone's card size
   * runs a one-line lead to four — and it would sit on a different left edge
   * from the bullets underneath it.
   */
  lead?: string;
  /** Prose body, for a card that has no bullets or ranking to itemise */
  description?: ReactNode;
  /** Hero stat, rendered above a rule and before the bullets */
  stat?: CardStat;
  /** Body as an unordered list of facts */
  bullets?: ReactNode[];
  /** Body as a ranked 1-2-3 list. Mutually exclusive with bullets. */
  ranked?: ReactNode[];
  /**
   * Visual variant:
   * - beige: beige-30 card for light sections (committee cards)
   * - translucent: white-on-purple card for purple sections (report findings)
   */
  variant?: SpotDetailCardVariant;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Per-variant styling. Every size and colour is resolved here rather than at the
 * call site, so a page composes this card with props alone.
 *
 * Sizes track the design file's intent onto the nearest step of the shared type
 * scale. The one arbitrary value is the stat, which is a named role with its own
 * responsive ramp — the same pattern SectionHeading uses for display sizes.
 *
 * `[&_strong]` styles emphasis the *page* passes as plain <strong>, so a caller
 * marking up an inline figure never reaches for a colour class of its own.
 */
const variantStyles: Record<
  SpotDetailCardVariant,
  {
    card: string;
    title: string;
    lead: string;
    statValue: string;
    statCaption: string;
    rule: string;
    description: string;
    bullet: "teal" | "yellow";
    bulletText: string;
    rankNumeral: string;
    rankText: string;
  }
> = {
  beige: {
    card: "bg-beige-30 rounded-[24px]",
    title: "text-lg font-extrabold text-gray-140",
    lead: "text-sm text-gray-110",
    statValue: "text-purple-120",
    statCaption: "text-sm text-gray-110",
    rule: "bg-beige-50",
    description: "text-base text-gray-120",
    bullet: "teal",
    // gray-120 rather than gray-110: beige-30 is a warm ground and gray-110
    // lands on it under AAA. Same reasoning as SpotIllustrationCard's beige.
    bulletText: "text-base text-gray-120 [&_strong]:font-black [&_strong]:text-gray-140",
    rankNumeral: "text-purple-120",
    rankText: "text-base text-gray-120",
  },
  translucent: {
    card: "bg-white/8 border border-white/[0.16] rounded-[20px]",
    title: "text-lg font-extrabold text-white",
    lead: "text-sm text-purple-10",
    statValue: "text-yellow-80",
    statCaption: "text-sm text-purple-10",
    rule: "bg-white/[0.16]",
    description: "text-sm text-purple-10",
    bullet: "yellow",
    bulletText: "text-sm text-purple-10 [&_strong]:font-black [&_strong]:text-white",
    rankNumeral: "text-yellow-80",
    rankText: "text-sm text-white",
  },
};

/**
 * SpotDetailCard - Spot illustration card whose body carries structured detail
 *
 * Sibling to SpotIllustrationCard, not a variant of it. The difference is
 * structural rather than cosmetic: the icon shrinks to 56px and moves into a
 * header row beside the title, and the whole card reads left-aligned, so a
 * reader meets the name before 96px of art. The body is passed as data — a
 * lead, a hero stat, bullets or a ranking — rather than as markup, which is
 * what keeps colour and size decisions out of the calling page.
 *
 * SpotIllustrationCard still owns the centred icon-over-prose cards (home
 * features, values).
 *
 * Icon size: 56px (w-14)
 * Border radius: 24px beige, 20px translucent
 * Padding: 24px mobile, 28px desktop (p-6 md:p-7)
 *
 * @see /design-system for usage examples
 */
export function SpotDetailCard({
  imageSrc,
  image,
  imageAlt = "",
  title,
  lead,
  description,
  stat,
  bullets,
  ranked,
  variant = "beige",
  className = "",
}: SpotDetailCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        // h-full so a row of cards ends level without the page asking for it.
        "h-full p-6 md:p-7 flex flex-col gap-4",
        styles.card,
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 relative shrink-0">
          {image?.asset ? (
            <SanityImage
              value={image}
              width={112}
              height={112}
              className="w-full h-full object-contain"
            />
          ) : imageSrc ? (
            <Image src={imageSrc} alt={imageAlt} fill className="object-contain" />
          ) : (
            <div className="w-full h-full bg-purple-30 rounded-full" />
          )}
        </div>
        <h4 className={styles.title}>{title}</h4>
      </div>

      {lead && <p className={cn("leading-snug", styles.lead)}>{lead}</p>}

      {description && (
        <p className={cn("leading-relaxed", styles.description)}>{description}</p>
      )}

      {stat && (
        <>
          <div>
            <div
              className={cn(
                "font-display text-[28px] md:text-[32px] leading-none",
                styles.statValue
              )}
            >
              {stat.value}
            </div>
            <p className={cn("mt-1.5 leading-relaxed", styles.statCaption)}>
              {stat.caption}
            </p>
          </div>
          <div className={cn("h-px", styles.rule)} aria-hidden="true" />
        </>
      )}

      {bullets && bullets.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {bullets.map((item, i) => (
            <li
              key={i}
              className={cn("flex items-start gap-3 leading-relaxed", styles.bulletText)}
            >
              <BulletPoint variant={styles.bullet} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {ranked && ranked.length > 0 && (
        <ol className="flex flex-col gap-4">
          {ranked.map((item, i) => (
            <li key={i} className="flex items-start gap-3.5">
              <span
                // Fixed column, not intrinsic width: Dela Gothic's "1" is a
                // narrower glyph than its "2", so an intrinsically sized numeral
                // starts each line of a ranking at a different x.
                className={cn(
                  "font-display text-2xl leading-tight shrink-0 w-6",
                  styles.rankNumeral
                )}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className={cn("pt-1 leading-relaxed", styles.rankText)}>{item}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
