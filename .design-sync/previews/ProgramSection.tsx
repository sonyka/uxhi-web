import { ProgramSection } from "web";

// The programme overview owns its copy and its CTAs, so a preview varies the
// width. The Pau Hana ticket stub splits into body + tear-off at lg and stacks
// below it, with the perforation changing axis to match — that split is keyed
// to the VIEWPORT, not to the card, so at the 900px capture viewport both cells
// show the stacked stub and its horizontal perforation.
//
// The LinkedIn mark inside "Follow @uxhi" is served by the host app from
// /conferences/2026/assets/logos; outside Next that path cannot resolve, so the
// glyph renders as a broken image.

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
 * Share, Learn, & Connect — the eyebrow, the dated section title, the lead, and
 * the Pre UXHICon Pau Hana stub with its gold "New this year" badge straddling
 * the top edge and the teal-40 tear-off carrying the date, the venue and the
 * ticket CTA.
 */
export const Overview = () => (
  <OnCard>
    <ProgramSection />
  </OnCard>
);

/**
 * The same section in a narrower column, which is where the stub earns its
 * stacked form: the tear-off keeps a full row under the body, the date and
 * address run on as sentences rather than fixed lines, and the lead reflows
 * without the title or the CTA changing size.
 */
export const NarrowColumn = () => (
  <OnCard width={700}>
    <ProgramSection />
  </OnCard>
);
