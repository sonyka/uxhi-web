import { GoogleAnalytics } from "@next/third-parties/google";

// Year-agnostic conference shell.
//
// Deliberately holds NOTHING visual. Each conference year is a new design over
// the same parent UXHI tokens — 2024, 2025 and 2026 look nothing alike — so
// font, background, palette and layout all belong to the year
// (conferences/<year>/layout.tsx), never here. Anything that creeps into this
// file becomes an accidental constraint on every future year.
//
// See docs/CONFERENCE-DESIGN-SYSTEM.md.

// GA4 for the conference domain, shared across years. Un-gated (fires on
// staging too) so it can be verified before launch; the property has no live
// data to protect.
const GA_CONFERENCE_ID = "G-CT4QB1KDE2";

export default function ConferenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId={GA_CONFERENCE_ID} />
    </>
  );
}
