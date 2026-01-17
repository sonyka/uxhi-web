import Link from "next/link";

interface FooterProps {
  settings: {
    logo?: {
      asset?: { _id?: string; url?: string };
      alt?: string;
    };
    siteName: string;
    footerText?: string;
    contactEmail?: string;
    socialLinks?: unknown[];
    footerNavigation?: unknown[];
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

interface NavSection {
  title: string;
  links: { label: string; href: string }[];
}

export function Footer({ settings }: FooterProps) {
  // Navigation sections matching header structure
  const navSections: NavSection[] = [
    {
      title: "Get Involved",
      links: [
        { label: "Volunteer", href: "/volunteer" },
        { label: "Become a Speaker", href: "/speak" },
        { label: "Sponsor Us", href: "/sponsor" },
        { label: "Partner", href: "/partner" },
        { label: "Donate", href: "/donate" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "UX for Students", href: "/resources/students" },
        { label: "State of UX in Hawaii Report", href: "/resources/report" },
        { label: "Directory of Tech Orgs", href: "/resources/directory" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "Team", href: "/about/team" },
        { label: "FAQs", href: "/about/faqs" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  // Main navigation links (no dropdowns)
  const mainLinks = [
    { label: "Find UX Pro", href: "/find-ux-pro" },
    { label: "Events", href: "/events" },
    { label: "Conference", href: "/conference" },
    { label: "Merch", href: "/merch" },
    { label: "Join us", href: "/join" },
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
              UXHI is a design community for people in Hawaiʻi.
            </h2>

            <div className="space-y-6">
              <p className="text-white/80 text-sm uppercase tracking-wider">Contact</p>

              <div className="space-y-3">
                <Link
                  href="/join"
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

            {/* Main Links */}
            <nav className="space-y-2 mb-8">
              {mainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block font-display text-2xl md:text-3xl text-white hover:text-white/80 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Dropdown Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:justify-items-end">
              {navSections.map((section) => (
                <div key={section.title} className="lg:text-right">
                  <p className="text-white/60 text-sm uppercase tracking-wider mb-3">{section.title}</p>
                  <div className="space-y-2">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-white hover:text-white/80 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
