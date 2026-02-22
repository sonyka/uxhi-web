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
 * LinkCard - External link card with cream background
 *
 * Design tokens:
 * - Background: cream (#f4f1ea), hover: beige-40
 * - Border radius: 16px (rounded-[16px])
 * - Padding: 20px (p-5)
 * - Title: text-base, font-medium, gray-140, hover: teal-100
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
      className={`flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-beige-40 transition-colors group ${className}`}
    >
      <div>
        <p className="text-base font-medium text-gray-140 group-hover:text-teal-100 transition-colors">
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
