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

// Arrow Up Right Icon (Feather)
function ArrowUpRightIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export function Footer({ settings }: FooterProps) {
  // All top-level navigation links
  const navLinks: { label: string; href: string; external?: boolean }[] = [
    { label: "Find UX Pro", href: "/find-ux-pro" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Events", href: "/events" },
    { label: "Conference", href: "https://uxhiconference.com/", external: true },
    { label: "Resources", href: "/resources" },
    { label: "Merch", href: "/merch" },
    { label: "About", href: "/about" },
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
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
                >
                  <span className="text-[18px]">UXHI Slack</span>
                  <ArrowUpRightIcon className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                </Link>

                <a
                  href="https://www.instagram.com/uxhicommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
                >
                  <span className="text-[18px]">Instagram</span>
                  <ArrowUpRightIcon className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                </a>

                <a
                  href="https://www.linkedin.com/company/uxhi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
                >
                  <span className="text-[18px]">Linkedin</span>
                  <ArrowUpRightIcon className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                </a>

                <a
                  href="mailto:aloha@uxhi.community"
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
                >
                  <span className="text-[18px]">Get in touch</span>
                  <ArrowUpRightIcon className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Navigation */}
          <div className="lg:text-right">
            <p className="text-white/80 text-sm uppercase tracking-wider mb-6">Navigation</p>

            {/* Page Links - 2 columns */}
            <nav className="grid grid-cols-2 gap-x-10 gap-y-2 lg:justify-items-end mb-8">
              {navLinks.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[18px] text-white hover:text-white/80 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[18px] text-white hover:text-white/80 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Primary CTA */}
            <Link
              href="/join"
              className="inline-flex items-center gap-3 bg-white rounded-full pl-6 pr-2 py-2 font-medium hover:bg-white/90 transition-colors group"
            >
              <span className="text-gray-900">Join us</span>
              <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                <ArrowUpRightIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
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
