import { GoogleAnalyticsGated } from "@/components/analytics/GoogleAnalyticsGated";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// GA4 for the community site. Gated to uxhi.community so staging/preview
// traffic never pollutes the live property (G-DMCWLCQD08) — it activates
// automatically when the domain is pointed to uxhi.community at launch.
const GA_COMMUNITY_ID = "G-DMCWLCQD08";
const COMMUNITY_HOST = "uxhi.community";

const siteSettings = {
  siteName: "UX Hawaii",
  tagline: "Hawaii's Premier UX Community",
  mainNavigation: [
    { _key: "1", label: "Get Involved", linkType: "internal", internalLink: "/" },
    { _key: "2", label: "Find Experts", linkType: "internal", internalLink: "/find-ux-pro" },
    { _key: "3", label: "Events", linkType: "internal", internalLink: "/events" },
    { _key: "4", label: "About", linkType: "internal", internalLink: "/about" },
    { _key: "5", label: "Resources", linkType: "internal", internalLink: "/resources" },
    { _key: "6", label: "Merch", linkType: "internal", internalLink: "/merch" },
  ],
  ctaButton: { label: "Join us", url: "/join" },
  footerNavigation: [
    { _key: "1", label: "Home", linkType: "internal", internalLink: "/" },
    { _key: "2", label: "Get Involved", linkType: "internal", internalLink: "/" },
    { _key: "3", label: "Find Experts", linkType: "internal", internalLink: "/find-ux-pro" },
    { _key: "4", label: "Resources", linkType: "internal", internalLink: "/resources" },
    { _key: "5", label: "About", linkType: "internal", internalLink: "/about" },
    { _key: "6", label: "Events", linkType: "internal", internalLink: "/events" },
    { _key: "7", label: "Merch", linkType: "internal", internalLink: "/merch" },
  ],
  contactEmail: "aloha@uxhi.community",
  socialLinks: [
    { _key: "1", platform: "slack", url: "#" },
    { _key: "2", platform: "instagram", url: "https://www.instagram.com/uxhicommunity" },
    { _key: "3", platform: "linkedin", url: "https://www.linkedin.com/company/uxhi/" },
  ],
};

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
