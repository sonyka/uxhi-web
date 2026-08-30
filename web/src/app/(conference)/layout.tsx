import { GoogleAnalyticsGated } from "@/components/analytics/GoogleAnalyticsGated";

// Year-agnostic conference shell.
//
// Deliberately holds NOTHING visual. Each conference year is a new design over
// the same parent UXHI tokens — 2024, 2025 and 2026 look nothing alike — so
// font, background, palette and layout all belong to the year
// (conferences/<year>/layout.tsx), never here. Anything that creeps into this
// file becomes an accidental constraint on every future year.
//
// See docs/CONFERENCE-DESIGN-SYSTEM.md.

// GA4 for the conference domain, shared across years.
//
// Was deliberately un-gated so the tag could be verified before launch. That
// verification happened on 2026-08-28 against live uxhiconference.com traffic,
// so the property now holds real data and staging hits would pollute it. Gated
// from 2026-08-30 — same pattern as the community tag.
const GA_CONFERENCE_ID = "G-CT4QB1KDE2";
const CONFERENCE_HOST = "uxhiconference.com";

export default function ConferenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <GoogleAnalyticsGated gaId={GA_CONFERENCE_ID} productionHost={CONFERENCE_HOST} />
    </>
  );
}
