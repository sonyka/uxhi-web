import { ConferenceBadge } from "./marks";

// Inline rather than an <img> of the same file, so the badge travels with the
// component instead of resolving only on this site. See marks.tsx.
export function LogoBadge() {
  return (
    <div className="w-24 h-24 flex-shrink-0" role="img" aria-label="UXHI Conference 2026 logo">
      <ConferenceBadge size={96} style={{ display: "block" }} />
    </div>
  );
}
