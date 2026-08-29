import { ExternalLinkIcon } from "./icons";

interface LinkCardProps {
  /** URL to link to (opens in new tab) */
  href: string;
  /** Main title text */
  title: string;
  /** Optional description or label text (displayed in teal) */
  description?: string;
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
 *
 * @see /design-system for usage examples
 */
export function LinkCard({ href, title, description, className = "" }: LinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between bg-beige-10 rounded-[16px] p-5 hover:bg-beige-30 transition-colors group ${className}`}
    >
      <div>
        {/* Title colour is deliberately NOT changed on hover. It used to go
            teal-100, which measured 2.63:1 against the beige-30 hover
            background — under the 4.5:1 AA threshold, and a drop from 17.09:1
            at rest. The background shift already signals hover. */}
        <p className="text-base font-medium text-gray-140">
          {title}
        </p>
        {description && (
          <p className="text-sm text-purple-140">{description}</p>
        )}
      </div>
      <ExternalLinkIcon className="w-5 h-5 text-gray-80 group-hover:text-teal-90 transition-colors flex-shrink-0" />
    </a>
  );
}
