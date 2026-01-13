import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const siteSettings = {
  siteName: "UX Hawaii",
  tagline: "Hawaii's Premier UX Community",
  mainNavigation: [
    { _key: "1", label: "Get Involved", linkType: "internal", internalLink: "/" },
    { _key: "2", label: "Find UX Pro", linkType: "internal", internalLink: "/find-ux-pro" },
    { _key: "3", label: "Events", linkType: "internal", internalLink: "/events" },
    { _key: "4", label: "About", linkType: "internal", internalLink: "/about" },
    { _key: "5", label: "Resources", linkType: "internal", internalLink: "/resources" },
    { _key: "6", label: "Merch", linkType: "internal", internalLink: "/merch" },
  ],
  ctaButton: { label: "Join Us", url: "/join" },
  footerNavigation: [
    { _key: "1", label: "Home", linkType: "internal", internalLink: "/" },
    { _key: "2", label: "Get Involved", linkType: "internal", internalLink: "/" },
    { _key: "3", label: "Find UX Pro", linkType: "internal", internalLink: "/find-ux-pro" },
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
      <Footer settings={siteSettings} />
    </>
  );
}
