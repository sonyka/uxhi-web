import Link from "next/link";

interface NavItem {
  _key: string;
  label: string;
  linkType: string;
  internalLink?: string;
  externalUrl?: string;
}

interface SocialLink {
  _key: string;
  platform: string;
  url: string;
}

interface FooterProps {
  settings: {
    logo?: {
      asset?: { _id?: string; url?: string };
      alt?: string;
    };
    siteName: string;
    footerText?: string;
    contactEmail?: string;
    socialLinks?: SocialLink[];
    footerNavigation?: NavItem[];
  };
}

// External Link Icon
function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export function Footer({ settings }: FooterProps) {
  const getHref = (item: NavItem) => {
    if (item.linkType === "external") return item.externalUrl || "#";
    return item.internalLink || "/";
  };

  // Static navigation matching Framer design
  const navItems = [
    { _key: "1", label: "Home", href: "/" },
    { _key: "2", label: "Get Involved", href: "/" },
    { _key: "3", label: "Find UX Pro", href: "/find-ux-pro" },
    { _key: "4", label: "Resources", href: "/resources" },
    { _key: "5", label: "About", href: "/about" },
    { _key: "6", label: "Events", href: "/events" },
    { _key: "7", label: "Merch", href: "/merch" },
  ];

  // Get current date
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <footer className="bg-teal-500 py-16 px-6">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - About & Contact */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-10 max-w-[500px]">
              UXHI is a design community for people in Hawaiʻi and those with Hawaiʻi ties.
            </h2>

            <div className="space-y-6">
              <p className="text-white/80 text-sm uppercase tracking-wider">Contact</p>

              <div className="space-y-3">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                >
                  <span>UXHI Slack</span>
                  <ExternalLinkIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="https://www.instagram.com/uxhicommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                >
                  <span>Instagram</span>
                  <ExternalLinkIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="https://www.linkedin.com/company/uxhi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                >
                  <span>Linkedin</span>
                  <ExternalLinkIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="mailto:aloha@uxhi.community"
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                >
                  <span>Get in touch</span>
                  <ExternalLinkIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Navigation */}
          <div className="lg:text-right">
            <p className="text-white/80 text-sm uppercase tracking-wider mb-6">Navigation</p>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item._key}
                  href={item.href}
                  className="block font-display text-2xl md:text-3xl text-white hover:text-white/80 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm">
            Copyright by UXHI ©{today.getFullYear()}
          </p>
          <p className="text-white/80 text-sm mt-2 md:mt-0">
            {dateString}
          </p>
        </div>
      </div>
    </footer>
  );
}
