import { Bricolage_Grotesque } from "next/font/google";

// The 2026 conference's visual shell: its typeface and page background.
//
// This lives at the year level, not the (conference) level, because each year
// is its own design. 2027 will bring a different font and a different
// background and should not have to undo anything set here.

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-bricolage",
});

export default function Conference2026Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={bricolage.variable} style={{ fontFamily: "var(--font-bricolage), sans-serif" }}>
      {/* Match body/safe-area background to the page's beige-30, so iOS
          overscroll and safe-area insets don't show the main site's beige-10. */}
      <style>{`html, body { background: var(--color-beige-30); }`}</style>
      {children}
    </div>
  );
}
