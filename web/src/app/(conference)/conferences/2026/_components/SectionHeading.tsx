import type { ReactNode } from "react";

// Single source of truth for the 2026 conference section titles — Moʻolelo,
// The Venue, FAQs, Meet the Organizers. Change the heading style here once and
// all four stay in sync (no more editing the class string in four places).
//
// Conference-specific (Bricolage font, bespoke size ramp); intentionally
// separate from the main site's design-system SectionHeading component.
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-semibold leading-[1.3] tracking-[-0.02em] text-[18px] md:text-[20px] lg:text-[26px] xl:text-[32px]">
      {children}
    </h2>
  );
}
