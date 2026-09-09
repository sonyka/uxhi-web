import { LogoBadge } from "web";

/**
 * ⚠ This component is one image and nothing else: the circular UXHICon mark at
 * /conferences/2026/assets/logos/uxhicon_circular.svg, served by the host app.
 * In a standalone bundle that path cannot resolve, so the card shows the mark's
 * reserved 96×96 box and no artwork. Nothing here stands in for the logo — the
 * box and its `role="img"` label are the whole of what the component adds.
 */
export const Mark = () => (
  <div
    style={{
      background: "var(--color-beige-30)",
      borderRadius: 12,
      padding: 24,
      width: "fit-content",
      outline: "1px dashed var(--color-gray-80)",
      outlineOffset: -24,
    }}
  >
    <LogoBadge />
  </div>
);
