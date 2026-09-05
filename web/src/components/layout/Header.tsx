"use client";

import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  // The header floats: the nav sits on its own white pill, but the logo is a
  // bare mark on the page ground, so anything scrolling up behind it collides
  // with it — a page title crossing the logo reads as two headlines printed on
  // top of each other. Once the page has moved at all, the header takes the
  // site's own background and content passes behind it rather than through it.
  //
  // A low threshold on purpose: the collision starts within the first hundred
  // pixels of scroll, so waiting for the fold would leave it uncovered exactly
  // where it happens. The open mobile menu takes the same ground at any scroll
  // position, so the panel never floats over live page content.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 xl:px-9 py-6 transition-colors duration-300 ${
        scrolled || mobileMenuOpen ? "bg-beige-30 shadow-sm" : "bg-transparent"
      }`}
    >
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
