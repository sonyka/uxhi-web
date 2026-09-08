import { GoogleAnalyticsGated } from "@/components/analytics/GoogleAnalyticsGated";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { Footer } from "@/components/layout/Footer";
import { siteSettings } from "@/components/layout/siteSettings";

// GA4 for the community site. Gated to uxhi.community so staging/preview
// traffic never pollutes the live property (G-DMCWLCQD08) — it activates
// automatically when the domain is pointed to uxhi.community at launch.
const GA_COMMUNITY_ID = "G-DMCWLCQD08";
const COMMUNITY_HOST = "uxhi.community";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <Header settings={siteSettings} />
      {/* tabIndex -1 so the skip link can move focus here, not just scroll —
          without it a screen reader follows the link and keeps reading from
          the header it was trying to leave. */}
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <GoogleAnalyticsGated gaId={GA_COMMUNITY_ID} productionHost={COMMUNITY_HOST} />
    </>
  );
}
