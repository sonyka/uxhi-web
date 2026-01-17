"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  key: string;
  label: string;
  href: string;
  dropdown?: DropdownItem[];
  external?: boolean;
}

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);

  // Navigation structure
  const navItems: NavItem[] = [
    { key: "find-ux-pro", label: "Find UX Pro", href: "/find-ux-pro" },
    {
      key: "get-involved",
      label: "Get Involved",
      href: "/get-involved",
      dropdown: [
        { label: "Volunteer", href: "/get-involved#volunteer", description: "Help grow our community" },
        { label: "Become a Speaker", href: "/get-involved#speak", description: "Share your expertise" },
        { label: "Sponsor Us", href: "/get-involved#sponsor", description: "Support UXHI events" },
        { label: "Partner", href: "/get-involved#partner", description: "Collaborate with us" },
        { label: "Donate", href: "/get-involved#donate", description: "Support our mission" },
      ],
    },
    { key: "events", label: "Events", href: "/events" },
    { key: "conference", label: "Conference", href: "https://uxhiconference.com/", external: true },
    {
      key: "resources",
      label: "Resources",
      href: "/resources",
      dropdown: [
        { label: "UX for Students", href: "/resources#students", description: "Start your UX journey" },
        { label: "State of UX in Hawaii Report", href: "/resources#report", description: "Industry insights" },
        { label: "Directory of Tech Orgs", href: "/resources#directory", description: "Local tech community" },
      ],
    },
    { key: "merch", label: "Merch", href: "/merch" },
    {
      key: "about",
      label: "About",
      href: "/about",
      dropdown: [
        { label: "Team", href: "/about#team", description: "Meet our volunteers" },
        { label: "FAQs", href: "/about#faqs", description: "Common questions" },
        { label: "Contact", href: "/about#contact", description: "Get in touch" },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/uxhi-logo.svg"
            alt="UXHI"
            width={96}
            height={22}
            priority
          />
        </Link>

        {/* Desktop Navigation - Pill shaped container */}
        <nav className="hidden lg:flex items-center">
          <div className="flex items-center gap-1 border border-gray-200 rounded-full px-2 py-2 bg-white/80 backdrop-blur-sm">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.key)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-5 py-2.5 text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 ml-0.5 transition-transform duration-200 ${openDropdown === item.key ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {openDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64"
                      >
                        {/* Tail/Arrow */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-[7px] w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white z-10" />

                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-2 relative">
                          {item.dropdown.map((dropdownItem, index) => (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                              <span className="block text-[15px] font-medium text-gray-900">{dropdownItem.label}</span>
                              {dropdownItem.description && (
                                <span className="block text-sm text-gray-500 mt-0.5">{dropdownItem.description}</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : item.external ? (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-5 py-2.5 text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-1 px-5 py-2.5 text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )
            )}

            {/* CTA Button inside nav pill */}
            <Link
              href="/join"
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-5 pr-1.5 py-1.5 ml-2 hover:bg-gray-50 transition-colors group"
            >
              <span className="text-[15px] font-medium text-gray-900">Join us</span>
              <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
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
              {navItems.map((item) =>
                item.dropdown ? (
                  <div key={item.key}>
                    <div className="flex items-center justify-between py-3">
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-teal-500 font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() => setMobileOpenDropdown(mobileOpenDropdown === item.key ? null : item.key)}
                        className="p-1 text-gray-700 hover:text-teal-500"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${mobileOpenDropdown === item.key ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <AnimatePresence>
                      {mobileOpenDropdown === item.key && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 border-l-2 border-gray-100 ml-2 space-y-1">
                            {item.dropdown.map((dropdownItem, index) => (
                              <Link
                                key={index}
                                href={dropdownItem.href}
                                className="block py-2.5 text-gray-600 hover:text-teal-500 font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.external ? (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 text-gray-700 hover:text-teal-500 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="flex items-center justify-between py-3 text-gray-700 hover:text-teal-500 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-4">
                <Link
                  href="/join"
                  className="flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-full py-2.5 pl-6 pr-2.5 font-medium hover:bg-gray-50 transition-colors group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-gray-900">Join us</span>
                  <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
