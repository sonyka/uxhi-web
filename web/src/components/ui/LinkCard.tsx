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
 * LinkCard - External link card with beige-30 background
 *
 * Design tokens:
 * - Background: beige-30 (#f4f1ea), hover: beige-30
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
      className={`flex items-center justify-between bg-beige-10 rounded-[16px] p-5 hover:bg-beige-30 transition-colors group ${className}`}
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
