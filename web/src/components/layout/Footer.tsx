import Link from "next/link";
import Image from "next/image";
import { ExternalLinkIcon, SendIcon } from "@/components/ui/icons";

/**
 * Footer Component
 *
 * Figma specs:
 * - Background: bg-teal-300 (#4ddce9)
 * - Headline: font-display, text-4xl (36px), leading-[45px], text-gray-700
 * - Logo row: UXHI logo (76px) + "© {year}" text-sm (14px), text-gray-700, gap-2, items-end
 * - Nav grid: 4 columns, gap-12 (48px), vertically centered
 * - Nav links: text-base (16px), font-normal, text-gray-700, gap-3 (12px) between items
 * - Social icons: w-4 h-4 (16px), gap-1.5 (6px) between icon and text
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const navColumns = [
    {
      links: [
        { label: "Home", href: "/" },
        { label: "Find UX Pro", href: "/find-ux-pro" },
        { label: "Get Involved", href: "/get-involved" },
      ],
    },
    {
      links: [
        { label: "Events", href: "/events" },
        { label: "Conference", href: "/conferences/2025/", external: true },
        { label: "Resources", href: "/resources" },
      ],
    },
    {
      links: [
        { label: "Shop", href: "/merch" },
        { label: "About", href: "/about" },
        { label: "Join us", href: "/join" },
      ],
    },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/uxhi/",
      icon: (
        <Image
          src="/images/nav/glyph-linkedin.svg"
          alt=""
          width={16}
          height={16}
        />
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/uxhicommunity",
      icon: (
        <Image
          src="/images/nav/glyph-insta.png"
          alt=""
          width={16}
          height={16}
        />
      ),
    },
    {
      label: "Get in touch",
      href: "mailto:aloha@uxhi.community",
      icon: <SendIcon className="w-4 h-4 text-gray-700" />,
    },
  ];

  return (
    <footer className="bg-teal-300 px-6 py-10">
      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
        {/* Left: Headline + Logo/Copyright */}
        <div className="lg:w-[58%] shrink-0">
          <h2 className="font-display text-4xl leading-[45px] text-gray-700 max-w-[604px] mb-8">
            UXHI is a design community for people in Hawaiʻi.
          </h2>
          <div className="flex items-end gap-2">
            <Image
              src="/images/nav/uxhi-logo.svg"
              alt="UXHI"
              width={76}
              height={24}
            />
            <span className="text-sm leading-[10px] text-gray-700">
              © {currentYear}
            </span>
          </div>
        </div>

        {/* Right: 4-column nav grid */}
        <div className="flex flex-wrap gap-12">
          {/* Nav columns */}
          {navColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {column.links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-0.5 text-base text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                    <ExternalLinkIcon className="w-5 h-5 opacity-60" />
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          ))}

          {/* Social column */}
          <div className="flex flex-col gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-1.5 text-base text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
