import Link from "next/link";
import { ReactNode } from "react";
import { ExternalLinkIcon } from "./icons";

interface InlineLinkProps {
  /** URL to link to */
  href: string;
  /** Link content */
  children: ReactNode;
  /**
   * Force external link behavior (opens in new tab).
   * Auto-detected if href starts with http:// or https://
   */
  external?: boolean;
  /**
   * Show external link icon after text.
   * Default: true when the link is external, false otherwise.
   */
  showIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * InlineLink - Styled inline text link for use within paragraphs
 *
 * A link in running copy takes the colour of the copy it sits in. It used to
 * come in two: teal-90 at semibold, and purple-140. Both were markers stacked
 * on a marker — the dotted rule already says "link", and a coloured word in a
 * sentence pulls the eye off the sentence, which is the opposite of what an
 * inline link is for. Teal on the purple bands was the loudest case.
 *
 * So: no colour of its own, font-medium against the paragraph's normal, and
 * the dotted rule. Weight and rule do the marking; inheriting the colour means
 * it reads correctly on the beige plane, on the purple bands and inside a dark
 * card without a variant for each.
 *
 * The rule is drawn in the text's own colour at 40%, not a fixed grey. A grey
 * rule under white text on purple is dimmer than the text; under gray-120 on
 * beige it is lighter. Tracking the text keeps one relationship on every
 * ground. Hover fades the whole link rather than recolouring it.
 *
 * This is where the 2026 conference site already stood (its `LINK` token in
 * conferences/2026/theme.ts): inherited colour, dotted rule, opacity on hover.
 * The two sites share no code, so the decision travels by hand.
 *
 * Features:
 * - Auto-detects external links (http/https)
 * - Uses Next.js Link for internal navigation
 * - External link icon on external links by default
 *
 * @see /design-system for usage examples
 */
export function InlineLink({
  href,
  children,
  external,
  showIcon,
  className = "",
}: InlineLinkProps) {
  // Auto-detect external links
  const isExternal = external ?? (href.startsWith("http://") || href.startsWith("https://"));

  const shouldShowIcon = showIcon ?? isExternal;

  const baseStyles =
    "font-medium underline decoration-dotted decoration-current/40 underline-offset-2 hover:opacity-70 transition-opacity";
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
