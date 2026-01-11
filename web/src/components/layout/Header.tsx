"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";

interface NavItem {
  _key: string;
  label: string;
  linkType: string;
  internalLink?: string;
  externalUrl?: string;
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {settings.logo?.asset ? (
              <SanityImage
                value={settings.logo}
                width={120}
                height={40}
                priority
                className="h-10 w-auto"
              />
            ) : (
              <span className="font-display text-xl text-purple-700">
                {settings.siteName || "UXHI"}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {settings.mainNavigation?.map((item) => (
              <Link
                key={item._key}
                href={getHref(item)}
                className="text-gray-700 hover:text-teal-500 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            {settings.ctaButton && (
              <Button href={settings.ctaButton.url} variant="primary" size="sm">
                {settings.ctaButton.label}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
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
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <Container>
              <div className="py-4 space-y-1">
                {settings.mainNavigation?.map((item) => (
                  <Link
                    key={item._key}
                    href={getHref(item)}
                    className="block py-3 text-gray-700 hover:text-teal-500 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {settings.ctaButton && (
                  <div className="pt-4">
                    <Button
                      href={settings.ctaButton.url}
                      variant="primary"
                      className="w-full"
                    >
                      {settings.ctaButton.label}
                    </Button>
                  </div>
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
