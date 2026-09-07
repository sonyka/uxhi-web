import { GoogleAnalyticsGated } from "@/components/analytics/GoogleAnalyticsGated";
import { Header } from "@/components/layout/Header";
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
      <Header settings={siteSettings} />
      <main>{children}</main>
      <Footer />
      <GoogleAnalyticsGated gaId={GA_COMMUNITY_ID} productionHost={COMMUNITY_HOST} />
    </>
  );
}
