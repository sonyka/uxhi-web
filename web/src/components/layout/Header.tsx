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

  // At rest the header wears nothing: logo and nav sit bare on the page, which
  // at the top of a page is all they need. Once the page moves, one capsule
  // fades in behind the whole row — logo included. That is the piece the
  // earlier full-width bar got wrong: the logo was the only thing without a
  // ground of its own, so content scrolling up collided with it, and a bar
  // spanning the viewport fixed it by flattening everything else too.
  //
  // Nothing moves when it appears. The padding is the same in both states, so
  // the capsule materialises around the logo and nav rather than shifting them.
  //
  // The capsule keeps the glass the nav pill has always worn — bg-white/90 over
  // backdrop-blur-sm — rather than the solid fill the reference uses. Content
  // still ghosts behind it, which is the point: the capsule reads as a pane
  // over the page rather than a lid on it.
  //
  // A low threshold on purpose: the collision starts within the first hundred
  // pixels of scroll, so waiting for the fold would leave it uncovered exactly
  // where it happens.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // With the menu open the capsule steps aside: the panel is its own white
  // surface, and a white capsule floating above it left a strip of live page
  // showing through the gap between the two. The header takes the page ground
  // instead, so the open menu reads as one state rather than two cards.
  const capsuleOn = scrolled && !mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 xl:px-9 py-4 md:py-6 transition-colors duration-300 ${
        mobileMenuOpen ? "bg-beige-30" : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-[1400px] mx-auto flex items-center justify-between gap-10 rounded-full border pl-6 xl:pl-8 pr-2 py-2 transition-[background-color,border-color,box-shadow] duration-300 ${
          capsuleOn
            ? "bg-white/90 backdrop-blur-sm border-beige-50 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04),0px_6px_20px_0px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-transparent shadow-none"
        }`}
      >
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
