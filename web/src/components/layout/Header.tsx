"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  _key: string;
  label: string;
  linkType: string;
  internalLink?: string;
  externalUrl?: string;
  hasDropdown?: boolean;
}

interface HeaderProps {
  settings: {
    logo?: {
      asset?: { _id?: string; url?: string };
      alt?: string;
    };
    siteName: string;
    mainNavigation?: NavItem[];
    ctaButton?: {
      label: string;
      url: string;
    };
  };
}

export function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getHref = (item: NavItem) => {
    if (item.linkType === "external") return item.externalUrl || "#";
    return item.internalLink || "/";
  };

  // Static navigation matching Framer design
  const navItems: NavItem[] = [
    { _key: "1", label: "Get Involved", linkType: "internal", internalLink: "/", hasDropdown: true },
    { _key: "2", label: "Find UX Pro", linkType: "internal", internalLink: "/find-ux-pro" },
    { _key: "3", label: "Events", linkType: "internal", internalLink: "/events" },
    { _key: "4", label: "About", linkType: "internal", internalLink: "/about" },
    { _key: "5", label: "Resources", linkType: "internal", internalLink: "/resources" },
    { _key: "6", label: "Merch", linkType: "internal", internalLink: "/merch" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/uxhi-logo.svg"
            alt="UXHI"
            width={70}
            height={22}
            priority
          />
        </Link>

        {/* Desktop Navigation - Pill shaped container */}
        <nav className="hidden lg:flex items-center">
          <div className="flex items-center gap-1 border border-gray-200 rounded-full px-2 py-2 bg-white/80 backdrop-blur-sm">
            {navItems.map((item) => (
              <Link
                key={item._key}
                href={getHref(item)}
                className="flex items-center gap-1 px-5 py-2.5 text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium rounded-full hover:bg-gray-50"
              >
                {item.label}
                {item.hasDropdown && (
                  <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
            ))}

            {/* CTA Button inside nav pill */}
            <Link
              href="/join"
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-5 pr-1.5 py-1.5 ml-2 hover:bg-gray-50 transition-colors group"
            >
              <span className="text-[15px] font-medium text-gray-900">Join us</span>
              <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <span
              className={`h-0.5 w-full bg-gray-900 rounded transition-all duration-300 ${
                mobileMenuOpen
                  ? "rotate-45 absolute top-1/2 -translate-y-1/2"
                  : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-gray-900 rounded transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-gray-900 rounded transition-all duration-300 ${
                mobileMenuOpen
                  ? "-rotate-45 absolute top-1/2 -translate-y-1/2"
                  : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border border-gray-200 rounded-2xl mt-4 mx-auto max-w-[1400px] overflow-hidden"
          >
            <div className="py-4 px-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item._key}
                  href={getHref(item)}
                  className="flex items-center justify-between py-3 text-gray-700 hover:text-teal-500 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/join"
                  className="flex items-center justify-center gap-3 bg-purple-700 text-white rounded-full py-3 px-6 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
