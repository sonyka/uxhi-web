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
 * - Background: cream (#f4f1ea), hover: gray-100
 * - Border radius: 16px (rounded-[16px])
 * - Padding: 20px (p-5)
 * - Title: text-base, font-medium, gray-900, hover: teal-600
 * - Description: text-sm, teal-600
 * - Icon: gray-400, hover: teal-500
 *
 * @see /design-system for usage examples
 */
export function LinkCard({ href, title, description, className = "" }: LinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-gray-100 transition-colors group ${className}`}
    >
      <div>
        <p className="text-base font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
          {title}
        </p>
        {description && (
          <p className="text-sm text-teal-600">{description}</p>
        )}
      </div>
      <ExternalLinkIcon className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors flex-shrink-0" />
    </a>
  );
}
