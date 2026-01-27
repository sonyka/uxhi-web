import { ReactNode } from "react";

interface InfoBoxProps {
  /** Content to render inside the info box */
  children: ReactNode;
  /** Optional eyebrow/label text displayed above the main content */
  eyebrow?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * InfoBox - Callout component for notes, disclaimers, and featured content
 *
 * Uses: teal-50 background with teal-100 border
 * Border radius: 20px (rounded-[20px])
 * Padding: 24px (p-6)
 *
 * Typography patterns for children:
 * - Simple note: <p className="text-base text-gray-700 font-medium">...</p>
 * - With CTA: Use flex layout with text and PrimaryCTA
 *
 * @see /design-system for usage examples
 */
export function InfoBox({ children, eyebrow, className = "" }: InfoBoxProps) {
  return (
    <div className={`bg-teal-50 border border-teal-100 rounded-[20px] p-6 ${className}`}>
      {eyebrow && (
        <span className="block text-sm font-bold uppercase tracking-wider text-teal-500 mb-1">
          {eyebrow}
        </span>
      )}
      {children}
    </div>
  );
}
