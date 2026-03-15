import Link from "next/link";
import Image from "next/image";
import { ExternalLinkIcon, SendIcon } from "@/components/ui/icons";

/**
 * Footer Component
 *
 * Figma specs:
 * - Background: bg-teal-60 (#60D7E5)
 * - Layout: justify-between, items-start, px-6 py-12 (48px vertical)
 * - Headline: font-semibold, text-xl (20px), leading-[45px], text-gray-120
 * - Left column: gap-14 (56px) between headline and logo row
 * - Logo row: UXHI logo (76px) + "© {year}" text-sm (14px), text-gray-120, gap-2, items-end
 * - Nav grid: 4 columns, gap-12 (48px), flex-nowrap
 * - Nav links: text-base (16px), font-normal, text-gray-120, gap-3 (12px) between items
 * - Social icons: w-4 h-4 (16px), gap-1.5 (6px) between icon and text
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const navColumns = [
    {
      links: [
        { label: "Home", href: "/" },
        { label: "Find Experts", href: "/find-experts" },
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
        { label: "Shop", href: "/shop" },
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
      href: "/about#contact",
      icon: <SendIcon className="w-4 h-4 text-gray-120" />,
    },
  ];

  return (
    <footer className="bg-teal-60 px-6 py-12">
      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
        {/* Headline — on desktop sits above logo in left column via lg:flex wrapper */}
        <div className="flex flex-col gap-14 shrink-0 order-1">
          <p className="font-semibold text-xl text-gray-120 max-w-[604px]">
            UXHI is a design community for people in Hawaiʻi.
          </p>
          {/* Logo/Copyright — visible only on desktop (inline with headline column) */}
          <div className="hidden lg:flex items-end gap-2">
            <Image
              src="/images/nav/uxhi-logo.svg"
              alt="UXHI"
              width={76}
              height={24}
            />
            <span className="text-sm leading-[10px] text-gray-120">
              © {currentYear}
            </span>
          </div>
        </div>

        {/* Nav grid */}
        <div className="flex flex-wrap lg:flex-nowrap gap-12 shrink-0 order-2">
          {navColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {column.links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-0.5 text-base text-gray-120 hover:text-gray-140 transition-colors"
                  >
                    {link.label}
                    <ExternalLinkIcon className="w-5 h-5 opacity-60" />
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base text-gray-120 hover:text-gray-140 transition-colors"
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
                className="flex items-center gap-1.5 text-base text-gray-120 hover:text-gray-140 transition-colors"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Logo/Copyright — mobile/tablet: appears last, below links */}
        <div className="flex lg:hidden items-end gap-2 order-3">
          <Image
            src="/images/nav/uxhi-logo.svg"
            alt="UXHI"
            width={76}
            height={24}
          />
          <span className="text-sm leading-[10px] text-gray-120">
            © {currentYear}
          </span>
        </div>
      </div>
    </footer>
  );
}
