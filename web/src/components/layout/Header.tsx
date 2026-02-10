"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar, MobileNavbar, HamburgerButton, defaultNavItems } from "./Navbar";

interface HeaderProps {
  settings: {
    logo?: {
      asset?: { _id?: string; url?: string };
      alt?: string;
    };
    siteName: string;
    mainNavigation?: unknown[];
    ctaButton?: {
      label: string;
      url: string;
    };
  };
}

export function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 xl:px-9 pt-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/nav/uxhi-logo.svg"
            alt="UXHI"
            width={96}
            height={22}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <Navbar
            items={defaultNavItems}
            ctaLabel={settings.ctaButton?.label || "Join us"}
            ctaHref={settings.ctaButton?.url || "/join"}
          />
        </div>

        {/* Mobile Menu Button */}
        <HamburgerButton
          isOpen={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden max-w-[1400px] mx-auto">
        <MobileNavbar
          items={defaultNavItems}
          ctaLabel={settings.ctaButton?.label || "Join us"}
          ctaHref={settings.ctaButton?.url || "/join"}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}
