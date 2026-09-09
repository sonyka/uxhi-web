import { SideProgramSection } from "web";

// Side programming owns its own content — the three activities are structured
// in the component, not passed in — so a preview's only real variable is the
// width it is given. That is the design decision worth showing: the grid is
// content-driven, and the returning pair splits or stacks on the width of the
// rail rather than on a viewport breakpoint.
//
// The ʻohe kāpala band down Print Your Story is a CSS mask over a beige-50
// fill, and its artwork lives at /conferences/2026/assets/images. The host app
// serves that path; a standalone bundle cannot, so the mask does not resolve
// and the band shows as a plain beige-50 panel instead of a printed pattern.

/** The white card the section sits on, at the width the page gives it. */
function OnCard({ width, children }: { width?: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 24,
        padding: 24,
        width: width ?? "100%",
        maxWidth: "100%",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Full width. Print Your Story leads on its own row with the gold status pill;
 * Portfolio Reviews and Professional Headshots sit side by side under their own
 * eyebrow, one level down from the section's heading.
 */
export const BeyondTheSessions = () => (
  <OnCard>
    <SideProgramSection />
  </OnCard>
);

/**
 * A narrower column. The returning pair stacks here rather than splitting into
 * two half-width cards: the grid's minimum is tuned so this section breaks at
 * the same width the agenda above it does, and the two never disagree about how
 * wide is wide enough.
 */
export const NarrowColumn = () => (
  <OnCard width={617}>
    <SideProgramSection />
  </OnCard>
);
