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
 * - **teal**: Rich text/content links - font-semibold, teal-90 → teal-100
 * - **purple**: Paragraph links - purple-140 → purple-150
 *
 * Both underline with a dotted rule in gray-80 rather than a solid one in the
 * link colour: the line marks the link without competing with the label. This
 * matches the treatment the 2026 conference site arrived at (its `LINK` token
 * in `conferences/2026/theme.ts`) — the two sites share no code, so the
 * decision travels by hand and has to be made in both places.
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

  // font-medium on teal, not semibold. Teal is the variant that sits on the
  // purple bands, where a bright link at semibold reads as shouting — the
  // colour is already doing the work of marking it, and the dotted rule
  // finishes the job. purple carries no weight of its own and inherits the
  // paragraph's, so medium is the closest the two get to agreeing while teal
  // still has to hold against a dark ground.
  const variantStyles = {
    teal: "text-teal-90 hover:text-teal-100 transition-colors font-medium underline decoration-dotted decoration-gray-80 underline-offset-2",
    purple: "text-purple-140 underline decoration-dotted decoration-gray-80 underline-offset-2 hover:text-purple-150 transition-colors",
  };

  const baseStyles = variantStyles[variant];
  const combinedStyles = `${baseStyles} ${shouldShowIcon ? "inline-flex items-center gap-0.5" : ""} ${className}`.trim();

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
