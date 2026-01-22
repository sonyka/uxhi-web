import Link from "next/link";
import { ReactNode } from "react";
import { ExternalLinkIcon } from "./icons";

interface InlineLinkProps {
  /** URL to link to */
  href: string;
  /** Link content */
  children: ReactNode;
  /**
   * Visual variant:
   * - teal: For rich text/content links (font-semibold, teal colors)
   * - purple: For inline paragraph links (purple colors, underline-offset)
   */
  variant?: "teal" | "purple";
  /**
   * Force external link behavior (opens in new tab).
   * Auto-detected if href starts with http:// or https://
   */
  external?: boolean;
  /**
   * Show external link icon after text.
   * Default: true for purple variant when external, false otherwise
   */
  showIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * InlineLink - Styled inline text link for use within paragraphs
 *
 * Variants:
 * - **teal**: Rich text/content links - font-semibold, teal-500 → teal-600
 * - **purple**: Paragraph links - purple-700 → purple-900, underline-offset-2
 *
 * Features:
 * - Auto-detects external links (http/https)
 * - Uses Next.js Link for internal navigation
 * - Optional external link icon (default on purple external links)
 *
 * @see /design-system for usage examples
 */
export function InlineLink({
  href,
  children,
  variant = "teal",
  external,
  showIcon,
  className = "",
}: InlineLinkProps) {
  // Auto-detect external links
  const isExternal = external ?? (href.startsWith("http://") || href.startsWith("https://"));

  // Default showIcon: true for purple external links, false otherwise
  const shouldShowIcon = showIcon ?? (variant === "purple" && isExternal);

  const variantStyles = {
    teal: "text-teal-500 hover:text-teal-600 transition-colors font-semibold underline",
    purple: "text-purple-700 underline underline-offset-2 hover:text-purple-900 transition-colors",
  };

  const baseStyles = variantStyles[variant];
  const combinedStyles = `${baseStyles} ${shouldShowIcon ? "inline-flex items-center gap-1" : ""} ${className}`.trim();

  const content = (
    <>
      {children}
      {shouldShowIcon && <ExternalLinkIcon className="w-3.5 h-3.5" />}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedStyles}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedStyles}>
      {content}
    </Link>
  );
}
