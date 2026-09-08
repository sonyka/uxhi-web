import type { ReactNode } from "react";
import { TYPE } from "../theme";

// Single source of truth for the 2026 conference section titles — Moʻolelo,
// The Venue, FAQs, Meet the Organizers. Change the heading style here once and
// all four stay in sync (no more editing the class string in four places).
//
// Conference-specific; intentionally separate from the main site's
// design-system SectionHeading component. The ramp itself now lives in the
// year's theme as TYPE.sectionTitle, so it sits beside display and hero rather
// than being the one heading size defined in a component.
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className={TYPE.sectionTitle}>
      {children}
    </h2>
  );
}
