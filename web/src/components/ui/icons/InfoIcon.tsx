interface IconProps {
  className?: string;
}

/**
 * InfoIcon - filled circle with a knocked-out "i".
 *
 * Filled rather than outlined because this renders at roughly 1em beside
 * inline text, where a stroked circle and a stroked "i" muddy into each
 * other. The glyph is punched out with evenodd so the icon takes its colour
 * from `currentColor` alone.
 */
export function InfoIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16A8 8 0 108 0a8 8 0 000 16zM8 3.6a.95.95 0 100 1.9.95.95 0 000-1.9zM7.1 7.3a.9.9 0 011.8 0v4.4a.9.9 0 01-1.8 0V7.3z"
      />
    </svg>
  );
}
