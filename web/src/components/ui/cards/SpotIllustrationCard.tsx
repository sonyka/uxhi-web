import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SanityImage } from "@/components/ui/SanityImage";
import { BulletPoint } from "@/components/ui/BulletPoint";

type SpotIllustrationCardVariant = "dark" | "beige" | "white" | "translucent";
type SpotIllustrationCardLayout = "stacked" | "anchored" | "detail";

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

interface SpotIllustrationCardProps {
  /** Static image source path */
  imageSrc?: string;
  /** Sanity CMS image object (alternative to imageSrc) */
  image?: SanityImageValue;
  /** Alt text for the image */
  imageAlt?: string;
  /** Card title */
  title: string;
  /**
   * Ground the card sits on. Sets background, radius and every type colour.
   *
   * In practice each ground pairs with one layout — dark is anchored, white is
   * stacked and detail, translucent is detail — because that is how the card
   * styles are drawn. Nothing enforces the pairing.
   *
   * `beige` is the one with no call site left. Section grounds are beige-30
   * now, so a beige card would sit on its own colour; it survives for a card
   * nested on a white surface, which is the only place it would still read.
   */
  variant?: SpotIllustrationCardVariant;
  /**
   * How the card is arranged:
   * - stacked: 96px icon centred above centred prose (values cards)
   * - anchored: the same 96px icon, moved below left-aligned prose and pinned
   *   to the bottom-left, so a row of cards ends on a line of illustrations
   *   (home features)
   * - detail: 56px icon in a header row beside the title, everything left
   *   aligned, body passed as data (committee cards, report findings)
   */
  layout?: SpotIllustrationCardLayout;

  /* --- body, stacked --- */
  /** Simple description text (use children for complex content) */
  description?: ReactNode;
  /** Custom content (alternative to description) — for bullet lists, etc. */
  children?: ReactNode;
  /** Footer content (e.g., ArrowLinkButton) */
  footer?: ReactNode;

  /* --- body, detail --- */
  /**
   * Short line introducing the card, between the header row and the body.
   *
   * Below the header rather than stacked beside the title: next to a 56px icon
   * a lead only gets the card's width minus 72px, which at a phone's card size
   * runs a one-line lead to four — and it would sit on a different left edge
   * from the bullets underneath it.
   */
  lead?: string;
  /** Hero stat, rendered above a rule and before the bullets */
  stat?: CardStat;
  /** Body as an unordered list of facts */
  bullets?: ReactNode[];
  /** Body as a ranked 1-2-3 list. Mutually exclusive with bullets. */
  ranked?: ReactNode[];

  /** Additional CSS classes */
  className?: string;
}

/**
 * Per-ground styling. Every size and colour is resolved here rather than at the
 * call site, so a page composes a card with props alone.
 *
 * Detail sizes track the design onto the nearest step of the shared type scale.
 * The one arbitrary value is the stat, which is a named role with its own
 * responsive ramp — the same pattern SectionHeading uses for display sizes.
 *
 * `[&_strong]` styles emphasis the *page* passes as plain <strong>, so a caller
 * marking up an inline figure never reaches for a colour class of its own.
 */
const variantStyles: Record<
  SpotIllustrationCardVariant,
  {
    card: string;
    title: string;
    description: string;
    lead: string;
    statValue: string;
    statCaption: string;
    rule: string;
    bullet: "teal" | "yellow";
    bulletText: string;
    rankNumeral: string;
    rankText: string;
  }
> = {
  dark: {
    card: "bg-purple-140 border border-purple-100/30 rounded-[24px]",
    title: "font-display text-xl md:text-2xl text-white text-balance",
    description: "text-white",
    lead: "text-base text-purple-10",
    statValue: "text-yellow-80",
    statCaption: "text-base text-purple-10",
    rule: "bg-white/[0.16]",
    bullet: "yellow",
    bulletText: "text-base text-purple-10 [&_strong]:font-black [&_strong]:text-white",
    rankNumeral: "text-yellow-80",
    rankText: "text-base text-white",
  },
  white: {
    card: "bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-[24px]",
    title: "font-display text-lg text-purple-140 text-balance",
    description: "text-gray-110 text-base",
    // text-base, not the text-sm the other grounds give a lead. This is the
    // committee cards on Get Involved, where the lead is the sentence that
    // says what the committee does — a paragraph, and the card's bullets
    // beneath it are already 16. A 14px line above 16px bullets read as a
    // caption for them rather than as the thing they belong to.
    lead: "text-base text-gray-110",
    statValue: "text-purple-120",
    statCaption: "text-base text-gray-110",
    rule: "bg-gray-30",
    bullet: "teal",
    bulletText: "text-base text-gray-110 [&_strong]:font-black [&_strong]:text-gray-140",
    rankNumeral: "text-purple-120",
    rankText: "text-base text-gray-110",
  },
  beige: {
    card: "bg-beige-30 rounded-[24px]",
    title: "text-lg font-extrabold text-gray-140 text-balance",
    // gray-120, not the gray-110 the other light ground uses. Beige-30 is a warm
    // ground rather than white, and gray-110 lands on it at 6.68:1 — still AA,
    // but under AAA and visibly washed out next to the gray-140 title. gray-120
    // reads as body copy again at 9.73:1. On white, gray-110 is 7.53:1 and
    // already clears AAA, so darkening it there would only make the two light
    // grounds disagree for no gain.
    description: "text-base text-gray-120",
    lead: "text-base text-gray-110",
    statValue: "text-purple-120",
    statCaption: "text-base text-gray-110",
    rule: "bg-beige-50",
    bullet: "teal",
    bulletText: "text-base text-gray-120 [&_strong]:font-black [&_strong]:text-gray-140",
    rankNumeral: "text-purple-120",
    rankText: "text-base text-gray-120",
  },
  translucent: {
    card: "bg-white/8 border border-white/[0.16] rounded-[20px]",
    title: "text-lg font-extrabold text-white text-balance",
    description: "text-base text-purple-10",
    lead: "text-base text-purple-10",
    statValue: "text-yellow-80",
    statCaption: "text-base text-purple-10",
    rule: "bg-white/[0.16]",
    bullet: "yellow",
    bulletText: "text-base text-purple-10 [&_strong]:font-black [&_strong]:text-white",
    rankNumeral: "text-yellow-80",
    rankText: "text-base text-white",
  },
};

/**
 * SpotIllustrationCard - Card led by a spot illustration
 *
 * Three arrangements of the same card, chosen with `layout`:
 *
 * - **stacked** — a 96px icon centred over centred prose, with an optional
 *   footer link. The About values cards.
 * - **anchored** — the same 96px icon, but read last: title, prose and footer
 *   sit left-aligned at the top and the illustration is pushed to the
 *   bottom-left corner. Cards are `h-full` and the icon takes the leftover
 *   space as a top margin, so across a row the words start on one line and the
 *   art lands on another, however unevenly the copy fills each card. The home
 *   features band.
 * - **detail** — the icon drops to 56px and moves into a header row beside the
 *   title, and the card reads left-aligned throughout, so a reader scanning a
 *   grid meets the name before the art. The body arrives as data — a lead, a
 *   hero stat, bullets, or a ranking — rather than as markup, which is what
 *   keeps colour and size decisions out of the calling page. The committee
 *   cards on Get Involved and the State of UX findings on Resources.
 *
 * Copy is white on the purple grounds and gray on the light ones. The tinted
 * purples the dark variants used to carry read as washed out rather than quiet.
 *
 * The dark title takes a phone step of its own — 20px below md, 24 above. Held
 * flat at 24 it landed level with an `md` section heading on a phone and only
 * 4px under the `lg` heading these cards sit beneath, which read as one level
 * where there are two.
 *
 * Icon size: 96px desktop / 80px mobile stacked, 56px detail
 * Border radius: 24px, or 20px on translucent
 *
 * @see /design-system for usage examples
 */
export function SpotIllustrationCard({
  imageSrc,
  image,
  imageAlt = "",
  title,
  variant = "white",
  layout = "stacked",
  description,
  children,
  footer,
  lead,
  stat,
  bullets,
  ranked,
  className = "",
}: SpotIllustrationCardProps) {
  const styles = variantStyles[variant];
  const isDetail = layout === "detail";
  const isAnchored = layout === "anchored";

  const icon = (
    <div
      className={cn(
        "relative shrink-0",
        isDetail && "w-14 h-14",
        !isDetail && "w-20 h-20 md:w-24 md:h-24",
        // Anchored spaces the icon from above, in the wrapper that pins it.
        layout === "stacked" && "mb-4 md:mb-6"
      )}
    >
      {image?.asset ? (
        <SanityImage
          value={image}
          width={isDetail ? 112 : 192}
          height={isDetail ? 112 : 192}
          className="w-full h-full object-contain"
        />
      ) : imageSrc ? (
        <Image src={imageSrc} alt={imageAlt} fill className="object-contain" />
      ) : (
        <div className="w-full h-full bg-purple-30 rounded-full" />
      )}
    </div>
  );

  return (
    <div
      className={cn(
        // h-full on detail only: a grid of detail cards ends level without the
        // page asking for it, whereas adding it to stacked would change the
        // home and values grids that never asked for equal heights.
        isDetail && "h-full p-6 md:p-7 flex flex-col gap-4",
        // h-full on anchored too, and for the same reason detail has it: the
        // bottom edge is doing work, so the row has to agree on where it is.
        isAnchored && "h-full p-6 md:p-8 flex flex-col items-start group",
        layout === "stacked" && "p-6 md:p-8 flex flex-col items-center text-center group",
        styles.card,
        className
      )}
    >
      {isDetail ? (
        <div className="flex items-center gap-4">
          {icon}
          <h4 className={styles.title}>{title}</h4>
        </div>
      ) : (
        <>
          {!isAnchored && icon}
          <h4 className={cn("mb-3 md:mb-4", styles.title)}>{title}</h4>
        </>
      )}

      {lead && <p className={cn("leading-snug", styles.lead)}>{lead}</p>}

      {children ? (
        <div
          className={cn(
            // text-pretty by hand here: children is a div, so it misses the
            // base rule that gives every <p> and <li> the same treatment.
            "leading-relaxed w-full text-pretty",
            // Anchored grows the body for the same reason stacked does: it pins
            // the footer link, so a row's links line up the way its icons do.
            !isDetail && "flex-grow",
            styles.description
          )}
        >
          {children}
        </div>
      ) : description ? (
        <p
          className={cn(
            "leading-relaxed",
            !isDetail && "flex-grow",
            styles.description
          )}
        >
          {description}
        </p>
      ) : null}

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
        <ul className="flex flex-col gap-2.5 w-full">
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
        <ol className="flex flex-col gap-4 w-full">
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

      {footer && <div className="mt-6">{footer}</div>}

      {/* pt-10 keeps a floor under the gap on the card whose copy runs longest,
          the one where mt-auto has nothing left to give. */}
      {isAnchored && <div className="mt-auto pt-10">{icon}</div>}
    </div>
  );
}
