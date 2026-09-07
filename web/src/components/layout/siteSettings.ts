/**
 * The site's navigation, CTA and footer links.
 *
 * Lifted out of the (site) layout because the 404 page cannot use that layout.
 * An unmatched URL is served by app/not-found.tsx, which Next renders inside
 * the ROOT layout only — route-group layouts do not apply to it — so the 404
 * has to mount the Header and Footer itself, and needs the same settings they
 * are given everywhere else. Two copies of a nav is how a nav starts to
 * disagree with itself.
 */
export const siteSettings = {
  siteName: "UXHI",
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
