interface BulletPointProps {
  /**
   * Color variant:
   * - teal: For use on light backgrounds (default)
   * - yellow: For use on dark/purple backgrounds
   */
  variant?: "teal" | "yellow";
  /** Additional CSS classes */
  className?: string;
}

/**
 * BulletPoint - Consistent styled bullet for list items
 *
 * Usage:
 * ```tsx
 * <li className="flex items-start gap-3">
 *   <BulletPoint />
 *   <span>List item text</span>
 * </li>
 * ```
 *
 * @see /design-system for usage examples
 */
export function BulletPoint({ variant = "teal", className = "" }: BulletPointProps) {
  const variantStyles = {
    teal: "bg-teal-500",
    yellow: "bg-yellow",
  };

  return (
    <span
      className={`w-1.5 h-1.5 ${variantStyles[variant]} rounded-full mt-2 flex-shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
}
