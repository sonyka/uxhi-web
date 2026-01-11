import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  // Default settings if none exist in Sanity yet
  const defaultSettings = {
    siteName: "UX Hawaii",
    tagline: "Hawaii's Premier UX Community",
    mainNavigation: [
      { _key: "1", label: "Find UX Pro", linkType: "internal", internalLink: "/find-ux-pro" },
      { _key: "2", label: "Events", linkType: "internal", internalLink: "/events" },
      { _key: "3", label: "About", linkType: "internal", internalLink: "/about" },
      { _key: "4", label: "Resources", linkType: "internal", internalLink: "/resources" },
      { _key: "5", label: "Merch", linkType: "internal", internalLink: "/merch" },
    ],
    ctaButton: { label: "Join Us", url: "/join" },
    footerNavigation: [
      { _key: "1", label: "Events", linkType: "internal", internalLink: "/events" },
      { _key: "2", label: "About", linkType: "internal", internalLink: "/about" },
      { _key: "3", label: "Resources", linkType: "internal", internalLink: "/resources" },
    ],
    contactEmail: "aloha@uxhi.community",
    socialLinks: [
      { _key: "1", platform: "slack", url: "#" },
      { _key: "2", platform: "instagram", url: "#" },
      { _key: "3", platform: "linkedin", url: "#" },
    ],
  };

  const siteSettings = settings || defaultSettings;

  return (
    <>
      <Header settings={siteSettings} />
      <div className="pt-16 md:pt-20">{children}</div>
      <Footer settings={siteSettings} />
    </>
  );
}
