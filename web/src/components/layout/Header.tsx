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
  // The capsule is glass rather than the solid fill the reference uses: content
  // ghosts behind it, so it reads as a pane over the page rather than a lid on
  // it. white/70 over backdrop-blur-md, where it used to be white/90 over
  // blur-sm — at 90% the ghosting was barely there and the pane read as opaque.
  //
  // The blur goes up as the fill comes down, and has to: the fill was doing the
  // legibility work, and at 70% what is behind the nav labels is a photograph
  // rather than a wash. blur-md averages it into one field for the labels to
  // sit on. Nav links are text-black, which clears AA on the composite even
  // over purple-140, the darkest thing that scrolls under it.
  //
  // The full-bleed bar below lg stays at 90%. The capsule can afford this
  // because it floats with slack around it; a bar flush to both edges of a
  // 390px screen is the only ground its labels have.
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

  // Below lg the glass rides the header itself — full-bleed, square, flush to
  // both edges — because that is the width a phone has to give. The capsule is
  // a desktop shape: it needs slack on either side to read as a floating object,
  // and at 390px there is none, so a rounded bar inset from the edges would just
  // look like a bar that missed.
  //
  // It also settles the open menu. The panel is its own white surface; a capsule
  // floating above it left a strip of live page showing through the gap, whereas
  // one sheet of glass behind both rows covers the whole header at once.
  const barOn = scrolled || mobileMenuOpen;
  const capsuleOn = scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 xl:px-9 py-4 md:py-6 transition-colors duration-300 lg:bg-transparent lg:backdrop-blur-none lg:border-b-0 ${
        barOn
          ? "bg-white/90 backdrop-blur-sm border-b border-beige-50"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-[1400px] mx-auto flex items-center justify-between gap-10 lg:rounded-full lg:border lg:py-3 lg:pr-3 lg:pl-8 transition-[background-color,border-color,box-shadow] duration-300 ${
          capsuleOn
            ? "lg:bg-white/70 lg:backdrop-blur-md lg:border-beige-50 lg:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03),0px_4px_12px_0px_rgba(0,0,0,0.035)]"
            : "lg:bg-transparent lg:border-transparent lg:shadow-none"
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
