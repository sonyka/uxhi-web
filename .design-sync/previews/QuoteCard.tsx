import { QuoteCard } from "web";

/**
 * The conference refrain. The shaka mark above it is served by the host app
 * from /conferences/2026/assets/, so it is absent here and on any design that
 * does not serve that path — the type below it is the component's substance.
 */
export const Refrain = () => (
  <div style={{ background: "var(--color-beige-30)", borderRadius: 12, padding: 8 }}>
    <QuoteCard />
  </div>
);
