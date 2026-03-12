"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowIcon, ExternalLinkIcon, ChevronDownIcon } from "@/components/ui/icons";
import { TextSlideUp } from "@/components/ui/TextSlideUp";

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  key: string;
  label: string;
  href: string;
  dropdown?: DropdownItem[];
  external?: boolean;
}

interface NavbarProps {
  items: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Desktop Navbar Component
 *
 * Specs from Figma:
 * - Container: bg-white, gap-8 (32px), pl-8 (32px), pr-6 (24px), py-5 (20px), rounded-full
 * - Text: text-base (16px), font-medium, text-black
 * - Nav icon gap: gap-0.5 (2px) between text and icon
 * - Chevron icons: w-4 h-4 (16px), text-gray-100 (#676D73)
 * - External link icons: w-4 h-4 (16px), text-gray-80 (#969DA4)
 * - CTA: shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)], pl-5, pr-2, py-2, gap-2
 * - Yellow circle: bg-yellow-80, w-[30px] h-[30px], rounded-full
 */
export function Navbar({ items, ctaLabel = "Join us", ctaHref = "/join" }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="flex items-center gap-4 xl:gap-8 rounded-full bg-white/90 backdrop-blur-sm px-5 xl:pl-8 xl:pr-6 py-4 xl:py-5 whitespace-nowrap">
      {items.map((item) =>
        item.dropdown ? (
          <div
            key={item.key}
            className="relative"
            onMouseEnter={() => setOpenDropdown(item.key)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              href={item.href}
              className="flex items-center gap-0.5 text-base font-medium text-black hover:text-gray-120 transition-colors group/link"
            >
              <TextSlideUp group="group/link">
                {item.label}
              </TextSlideUp>
              <ChevronDownIcon
                className={`w-4 h-4 text-gray-100 transition-transform duration-200 ${
                  openDropdown === item.key ? 'rotate-180' : ''
                }`}
              />
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

                  <div className="bg-white rounded-xl shadow-lg border border-gray-20 overflow-hidden py-2 relative">
                    {item.dropdown.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        href={dropdownItem.href}
                        className="block px-4 py-3 hover:bg-gray-10 transition-colors"
                      >
                        <span className="block text-base font-medium text-gray-140">
                          {dropdownItem.label}
                        </span>
                        {dropdownItem.description && (
                          <span className="block text-sm text-gray-100 mt-0.5">
                            {dropdownItem.description}
                          </span>
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
            className="flex items-center gap-0.5 text-base font-medium text-black hover:text-gray-120 transition-colors group/link"
          >
            <TextSlideUp group="group/link">
              {item.label}
            </TextSlideUp>
            <ExternalLinkIcon className="w-4 h-4 text-gray-80" />
          </a>
        ) : (
          <Link
            key={item.key}
            href={item.href}
            className="text-base font-medium text-black hover:text-gray-120 transition-colors group/link"
          >
            <TextSlideUp group="group/link">
              {item.label}
            </TextSlideUp>
          </Link>
        )
      )}

      {/* CTA Button */}
      <Link
        href={ctaHref}
        className="flex items-center gap-1.5 xl:gap-2 bg-white rounded-full pl-4 xl:pl-5 pr-2 py-2 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:bg-gray-10 transition-colors group"
      >
        <TextSlideUp className="text-base font-medium text-black">
          {ctaLabel}
        </TextSlideUp>
        <span className="w-[30px] h-[30px] rounded-full bg-yellow-80 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
          <ArrowIcon className="w-4 h-4 text-black" />
        </span>
      </Link>
    </nav>
  );
}

/**
 * Mobile Navbar Component
 *
 * Collapsible menu with accordion-style dropdowns
 */
interface MobileNavbarProps {
  items: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavbar({
  items,
  ctaLabel = "Join us",
  ctaHref = "/join",
  isOpen,
  onClose
}: MobileNavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-gray-30 rounded-2xl mt-4 overflow-hidden"
        >
          <div className="py-4 px-6 space-y-1">
            {items.map((item) =>
              item.dropdown ? (
                <div key={item.key}>
                  <div className="flex items-center justify-between py-3">
                    <Link
                      href={item.href}
                      className="text-base font-medium text-gray-120 hover:text-teal-90"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                      className="p-1 text-gray-120 hover:text-teal-90"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.key ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                  <AnimatePresence>
                    {openDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 border-l-2 border-gray-20 ml-2 space-y-1">
                          {item.dropdown.map((dropdownItem, index) => (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className="block py-2.5 text-base text-gray-110 hover:text-teal-90 font-medium"
                              onClick={onClose}
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
                  className="flex items-center py-3 text-base font-medium text-gray-120 hover:text-teal-90"
                  onClick={onClose}
                >
                  {item.label}
                  <ExternalLinkIcon className="w-4 h-4 ml-1.5 opacity-50" />
                </a>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center justify-between py-3 text-base font-medium text-gray-120 hover:text-teal-90"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href={ctaHref}
                className="flex items-center justify-center gap-3 bg-white border border-gray-30 rounded-full py-2.5 pl-6 pr-2.5 font-medium hover:bg-gray-10 transition-colors group"
                onClick={onClose}
              >
                <span className="text-base text-black">{ctaLabel}</span>
                <span className="w-9 h-9 rounded-full bg-yellow-80 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                  <ArrowIcon className="w-4 h-4 text-black" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hamburger Menu Button
 */
interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      className="lg:hidden p-2 -mr-2"
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <div className="w-6 h-5 flex flex-col justify-between relative">
        <span
          className={`h-0.5 w-full bg-gray-140 rounded transition-all duration-300 ${
            isOpen ? "rotate-45 absolute top-1/2 -translate-y-1/2" : ""
          }`}
        />
        <span
          className={`h-0.5 w-full bg-gray-140 rounded transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-full bg-gray-140 rounded transition-all duration-300 ${
            isOpen ? "-rotate-45 absolute top-1/2 -translate-y-1/2" : ""
          }`}
        />
      </div>
    </button>
  );
}

// Default navigation items used across the site
export const defaultNavItems: NavItem[] = [
  { key: "find-ux-pro", label: "Find Experts", href: "/find-ux-pro" },
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
  { key: "conference", label: "Conference", href: "/conferences/2025/", external: true },
  {
    key: "resources",
    label: "Resources",
    href: "/resources",
    dropdown: [
      { label: "UX for Students", href: "/resources#students", description: "Start your UX journey" },
      { label: "State of UX in Hawaiʻi Report", href: "/resources#report", description: "Industry insights" },
      { label: "Directory of Local Tech Orgs", href: "/resources#directory", description: "Local tech community" },
    ],
  },
  { key: "shop", label: "Shop", href: "/merch" },
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
