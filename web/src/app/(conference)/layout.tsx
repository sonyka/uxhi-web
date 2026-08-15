import { GoogleAnalytics } from "@next/third-parties/google";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-bricolage",
});

// GA4 for the conference site. Un-gated (fires on staging too) so it can be
// verified before launch; the property has no live data to protect.
const GA_CONFERENCE_ID = "G-CT4QB1KDE2";

export default function ConferenceLayout({ children }: { children: React.ReactNode }) {
  // Apply Bricolage Grotesque independently from the main site's font stack.
  return (
    <div className={bricolage.variable} style={{ fontFamily: "var(--font-bricolage), sans-serif" }}>
      {/* Match body/safe-area background to the conference page's beige-30, so iOS
          overscroll and safe-area insets don't show the main site's beige-10. */}
      <style>{`html, body { background: var(--color-beige-30); }`}</style>
      {children}
      <GoogleAnalytics gaId={GA_CONFERENCE_ID} />
    </div>
  );
}
