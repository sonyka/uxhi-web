import { ExternalLinkIcon } from "./icons";

interface LinkCardProps {
  /** URL to link to (opens in new tab) */
  href: string;
  /** Main title text */
  title: string;
  /** Optional description or label text */
  description?: string;
  /** Optional leading visual shown before the title — e.g. an organisation logo */
  media?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * LinkCard - External link card that sits on the beige plane
 *
 * White at rest and beige-10 on hover. It was the other way round — beige-10
 * on a white section — until the section grounds became beige-30, at which
 * point the hover colour WAS the ground and the card dissolved into the page
 * under the cursor. A card is lighter than the plane it sits on; the hover
 * then darkens it a step without reaching the plane.
 *
 * Design tokens:
 * - Background: white, hover: beige-10 (#FDFBF7)
 * - Border radius: 16px (rounded-[16px])
 * - Padding: 20px (p-5)
 * - Title: text-base, font-medium, gray-140 — unchanged on hover
 * - Description: text-sm, purple-140
 * - Icon: gray-80, hover: teal-90
 * - Optional leading `media` slot (32px logos on the tech-organisation list)
 *
 * @see /design-system for usage examples
 */
export function LinkCard({ href, title, description, media, className = "" }: LinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between bg-white rounded-[16px] p-5 hover:bg-beige-10 transition-colors group ${className}`}
    >
      <div className="flex items-center gap-3">
        {media}
        <div>
          {/* Title colour is deliberately NOT changed on hover. It used to go
              teal-100, which measured 2.63:1 against the beige-30 hover
              background — under the 4.5:1 AA threshold, and a drop from
              17.09:1 at rest. The background shift already signals hover. */}
          <p className="text-base font-medium text-gray-140">
            {title}
          </p>
          {description && (
            <p className="text-sm text-purple-140">{description}</p>
          )}
        </div>
      </div>
      <ExternalLinkIcon className="w-5 h-5 text-gray-80 group-hover:text-teal-90 transition-colors flex-shrink-0" />
    </a>
  );
}
