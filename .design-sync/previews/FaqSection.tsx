import { FaqSection } from "web";

// The FAQ carries its own nine questions, so a preview varies the width, not
// the content. Rows are closed at rest and open on a click, which is state the
// component owns and a still frame cannot reach — every cell here shows the
// resting accordion.

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
 * The resting accordion. Beige-30 pill rows on the white card, each question at
 * the item size with a grey "+" that rotates into a "×" once the answer opens.
 */
export const Accordion = () => (
  <OnCard>
    <FaqSection />
  </OnCard>
);

/**
 * In the conference's scroll rail. The rows keep their shape as the column
 * narrows: the question wraps against the toggle rather than shrinking, and the
 * toggle stays a fixed 20px on the right edge.
 */
export const InTheScrollRail = () => (
  <OnCard width={424}>
    <FaqSection />
  </OnCard>
);
