"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { ArrowIcon, ExternalLinkIcon, PlusIcon, MinusIcon, ChevronDownIcon, SendIcon } from "@/components/ui/icons";
import { InfoBox } from "@/components/ui/InfoBox";
import { LinkCard } from "@/components/ui/LinkCard";
import { ArrowLinkButton } from "@/components/ui/ArrowLinkButton";
import { QuickLinkPill } from "@/components/ui/QuickLinkPill";
import { InlineLink } from "@/components/ui/InlineLink";
import { SpotIllustrationCard } from "@/components/ui/cards";
import { BulletPoint } from "@/components/ui/BulletPoint";
import { MobileTooltip } from "@/components/ui/MobileTooltip";
import { Container } from "@/components/ui/Container";
import { MemberCard } from "@/components/directory";
import { Navbar, MobileNavbar, HamburgerButton } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { DirectorySubmitForm } from "@/components/forms/DirectorySubmitForm";
import { FormAlert, FieldError, FormSuccess } from "@/components/ui/FormFeedback";
import { PressMention } from "@/components/ui/PressMention";
import {
  FormLabel,
  FormInput,
  FormTextarea,
  FormRadio,
  FormCheckbox,
  FormSelect,
  FormFileUpload,
  FormSubmitButton,
} from "@/components/ui/form-elements";

// Navigation structure
const navigationItems = [
  {
    category: "Navigation",
    items: [
      { id: "nav-desktop", label: "Desktop Navbar" },
      { id: "nav-mobile", label: "Mobile Navbar" },
      { id: "nav-footer", label: "Footer" },
    ],
  },
  {
    category: "Foundation",
    items: [
      { id: "typography-fonts", label: "Font Families" },
      { id: "typography-headings", label: "Headings" },
      { id: "typography-body", label: "Body Text" },
      { id: "typography-special", label: "Special Styles" },
      { id: "typography-bulletpoint", label: "Bullet Point" },
    ],
  },
  {
    category: "Colors",
    items: [
      { id: "colors-teal", label: "Primary — Teal" },
      { id: "colors-purple", label: "Secondary — Purple" },
      { id: "colors-gray", label: "Gray Scale" },
      { id: "colors-beige", label: "Beige" },
      { id: "colors-orange", label: "Orange" },
      { id: "colors-yellow", label: "Yellow" },
      { id: "colors-neutral", label: "Neutral" },
      { id: "colors-semantic", label: "Semantic Colors" },
    ],
  },
  {
    category: "Buttons",
    items: [
      { id: "button-primarycta", label: "Primary CTA" },
      { id: "button-arrowlink", label: "Arrow Link Button" },
      { id: "button-inlinelink", label: "Inline Link" },
      { id: "button-quicklink", label: "Quick Link Pill" },
      { id: "button-css", label: "CSS Utility Classes" },
    ],
  },
  {
    category: "Cards & Modules",
    items: [
      { id: "card-spotillustration", label: "Spot Illustration Card" },
      { id: "card-carousel", label: "Carousel Testimonial" },
      { id: "card-link", label: "Link Card" },
      { id: "card-infobox", label: "Info Box" },
      { id: "card-pressmention", label: "Press Mention" },
      { id: "card-upcomingevent", label: "Upcoming Event" },
      { id: "card-member", label: "Member Card" },
    ],
  },
  {
    category: "Forms",
    items: [
      { id: "form-input", label: "Text Input" },
      { id: "form-textarea", label: "Textarea" },
      { id: "form-radio", label: "Radio Button" },
      { id: "form-checkbox", label: "Checkbox" },
      { id: "form-select", label: "Select Dropdown" },
      { id: "form-file", label: "File Upload" },
      { id: "form-submit", label: "Submit Button" },
      { id: "form-inquiry", label: "Inquiry Form" },
      { id: "form-membership", label: "Membership Form" },
      { id: "form-directory", label: "Directory Submission Form" },
    ],
  },
  {
    category: "Alerts & Feedback",
    items: [
      { id: "feedback-alert", label: "Form Alert" },
      { id: "feedback-fielderror", label: "Field Error" },
      { id: "feedback-success", label: "Form Success" },
    ],
  },
  {
    category: "Interactive",
    items: [
      { id: "interactive-accordion", label: "FAQ Accordion" },
      { id: "interactive-dropdown", label: "Dropdown Menu" },
      { id: "interactive-search", label: "Search Input" },
      { id: "interactive-filter-dropdown", label: "Filter Dropdown" },
      { id: "interactive-toggle", label: "Toggle Button" },
      { id: "interactive-tooltip", label: "Mobile Tooltip" },
    ],
  },
  {
    category: "Layout",
    items: [
      { id: "layout-container", label: "Container" },
      { id: "layout-sanityimage", label: "Sanity Image" },
      { id: "layout-grids", label: "Image Grids" },
      { id: "layout-spacing", label: "Spacing & Container" },
      { id: "layout-radius", label: "Border Radius" },
    ],
  },
  {
    category: "Icons",
    items: [
      { id: "icons-all", label: "Icon Library" },
    ],
  },
];

// Color swatch component
function ColorSwatch({
  name,
  value,
  textColor = "text-gray-140",
  compact = false,
  badge,
}: {
  name: string;
  value: string;
  textColor?: string;
  compact?: boolean;
  badge?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="text-left group"
    >
      <div
        className={`relative w-full ${compact ? "aspect-[3/1]" : "aspect-[4/3]"} rounded-xl mb-2 transition-transform group-hover:scale-105 ${textColor}`}
        style={{ backgroundColor: value }}
      >
        {badge && (
          <span className="absolute bottom-1.5 left-1.5 bg-white/90 text-gray-140 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md leading-tight">
            {badge}
          </span>
        )}
      </div>
      <p className="font-medium text-sm text-gray-140">{name}</p>
      <p className="text-xs text-gray-100 font-mono">
        {copied ? "Copied!" : value}
      </p>
    </button>
  );
}

// FAQ Accordion Demo
function FAQAccordionDemo() {
  const [openId, setOpenId] = useState<string | null>("1");

  const demoFaqs = [
    { id: "1", question: "What is UXHI?", answer: "UXHI is Hawaiʻi's premier UX community, connecting designers, researchers, and product professionals across the islands." },
    { id: "2", question: "How can I get involved?", answer: "You can join our events, volunteer, speak at meetups, or become a sponsor. Visit our Get Involved page for more details." },
    { id: "3", question: "Are events free?", answer: "Most of our community events are free to attend. Some workshops and the annual conference may have a fee." },
  ];

  return (
    <div className="space-y-3 max-w-xl">
      {demoFaqs.map((faq) => (
        <div
          key={faq.id}
          className={`overflow-hidden transition-all duration-300 ${
            openId === faq.id ? "rounded-2xl bg-teal-60" : "rounded-[2rem] bg-white shadow-sm"
          }`}
        >
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
              openId === faq.id ? "text-gray-120" : "text-gray-130"
            }`}
          >
            <h4 className="font-medium pr-4">{faq.question}</h4>
            <span className="flex-shrink-0">
              {openId === faq.id ? (
                <MinusIcon className="w-5 h-5" />
              ) : (
                <PlusIcon className="w-5 h-5 text-teal-90" />
              )}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {openId === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-4 text-gray-120 text-base">{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Dropdown Demo
function DropdownDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="flex items-center gap-2 px-5 py-2.5 text-nav text-gray-120 hover:text-gray-140 transition-colors font-medium border border-gray-30 rounded-full bg-white"
      >
        Dropdown Example
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-56"
          >
            <div className="absolute left-6 -top-[7px] w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white z-10" />
            <div className="bg-white rounded-xl shadow-lg border border-gray-20 overflow-hidden py-2">
              {["Option One", "Option Two", "Option Three"].map((item, i) => (
                <button
                  key={i}
                  className="block w-full px-4 py-3 text-left hover:bg-gray-10 transition-colors"
                >
                  <span className="block text-nav font-medium text-gray-140">{item}</span>
                  <span className="block text-sm text-gray-100 mt-0.5">Description text</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Content wrapper for each item
function ContentSection({
  title,
  description,
  componentPath,
  children
}: {
  title: string;
  description?: string;
  componentPath?: string | string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-2xl md:text-3xl text-purple-140 mb-2">{title}</h2>
        {description && <p className="text-gray-110">{description}</p>}
        {componentPath && (
          <div className="mt-2">
            {Array.isArray(componentPath) ? (
              componentPath.map((path) => (
                <p key={path} className="text-xs text-gray-80 font-mono">
                  {path}
                </p>
              ))
            ) : (
              <p className="text-xs text-gray-80 font-mono">{componentPath}</p>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

// Demo nav items for design system (simplified)
const demoNavItems = [
  { key: "find-ux-pro", label: "Find UX Pro", href: "#" },
  {
    key: "get-involved",
    label: "Get Involved",
    href: "#",
    dropdown: [
      { label: "Volunteer", href: "#", description: "Help grow our community" },
      { label: "Become a Speaker", href: "#", description: "Share your expertise" },
    ],
  },
  { key: "events", label: "Events", href: "#" },
  { key: "conference", label: "Conference", href: "#", external: true },
  {
    key: "resources",
    label: "Resources",
    href: "#",
    dropdown: [
      { label: "UX for Students", href: "#", description: "Start your UX journey" },
      { label: "State of UX Report", href: "#", description: "Industry insights" },
    ],
  },
  { key: "shop", label: "Shop", href: "#" },
  {
    key: "about",
    label: "About",
    href: "#",
    dropdown: [
      { label: "Team", href: "#", description: "Meet our volunteers" },
      { label: "FAQs", href: "#", description: "Common questions" },
    ],
  },
];

// Mobile Navbar Demo with state
function MobileNavbarDemo() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="max-w-md">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-100">Toggle to see animation:</span>
        <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>
      <MobileNavbar
        items={demoNavItems}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

// All content components mapped by ID
const contentComponents: Record<string, React.ReactNode> = {
  // Navigation
  "nav-desktop": (
    <ContentSection
      title="Desktop Navbar"
      description="Main navigation component with dropdowns. Used in the site header."
      componentPath="components/layout/Navbar.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-gray-20 p-6 rounded-xl overflow-x-auto">
            <Navbar items={demoNavItems} />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Container</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-white</span> background</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">rounded-full</span> border radius</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">px-7</span> (28px) horizontal padding</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">py-5</span> (20px) vertical padding</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">gap-8</span> (32px) between items</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Typography</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">text-base</span> (16px) font size</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">font-medium</span> weight</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">text-black</span> default color</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">hover:text-gray-120</span> hover</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Icons</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">w-5 h-5</span> (20px) chevron icons</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">rotate-180</span> on dropdown open</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">opacity-60</span> external link icon</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">CTA Button</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]</span></p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">pl-5 pr-2 py-2</span> padding</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">w-[30px] h-[30px]</span> yellow circle</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-yellow-80</span> → <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-yellow-100</span></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Link Types</h4>
          <div className="flex flex-wrap gap-6 items-center p-4 bg-beige-30 rounded-xl">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-100">Standard Link</span>
              <span className="text-base font-medium text-black">Events</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-100">With Dropdown</span>
              <span className="flex items-center gap-0.5 text-base font-medium text-black">
                Get Involved
                <ChevronDownIcon className="w-5 h-5" />
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-100">External Link</span>
              <span className="flex items-center gap-0.5 text-base font-medium text-black">
                Conference
                <ExternalLinkIcon className="w-5 h-5 opacity-60" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "nav-mobile": (
    <ContentSection
      title="Mobile Navbar"
      description="Collapsible mobile navigation with accordion-style dropdowns."
      componentPath="components/layout/Navbar.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <MobileNavbarDemo />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Hamburger Button</h4>
          <div className="flex gap-8 items-center p-4 bg-beige-30 rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-100">Closed</span>
              <div className="p-2 bg-white rounded-lg">
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className="h-0.5 w-full bg-gray-140 rounded" />
                  <span className="h-0.5 w-full bg-gray-140 rounded" />
                  <span className="h-0.5 w-full bg-gray-140 rounded" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-100">Open (X)</span>
              <div className="p-2 bg-white rounded-lg">
                <div className="w-6 h-5 flex flex-col justify-center relative">
                  <span className="h-0.5 w-full bg-gray-140 rounded rotate-45 absolute" />
                  <span className="h-0.5 w-full bg-gray-140 rounded -rotate-45 absolute" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Container</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-white</span> background</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">rounded-2xl</span> border radius</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">border border-gray-30</span></p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">py-4 px-6</span> padding</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Links</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">text-base</span> (16px)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">font-medium</span></p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">text-gray-120</span> default</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">hover:text-teal-90</span></p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Dropdown Items</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">pl-4 ml-2</span> indent</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">border-l-2 border-gray-20</span></p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">text-gray-110</span></p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Animation</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">framer-motion</span></p>
                <p>Height: 0 → auto</p>
                <p>Opacity: 0 → 1</p>
                <p>Duration: 0.2s (menu), 0.15s (dropdown)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "nav-footer": (
    <ContentSection
      title="Footer"
      description="Site-wide footer with headline, logo, copyright, and 4-column navigation grid."
      componentPath="components/layout/Footer.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="rounded-xl overflow-hidden">
            <Footer />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Container</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-teal-60</span> (#60D7E5)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">px-6 py-12</span> (48px vertical) padding</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">max-w-[1300px]</span> content width</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">items-start justify-between</span></p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Headline</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">font-semibold</span> Nunito</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">text-xl</span> (20px)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">leading-[45px]</span> line height</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">text-gray-120</span></p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">gap-14</span> (56px) to logo row</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Logo + Copyright</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>UXHI logo: <span className="font-mono text-xs bg-gray-20 px-1 rounded">76px × 24px</span></p>
                <p>Copyright: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-sm</span> (14px)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">gap-2</span> between logo and text</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">items-end</span> alignment</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Nav Grid</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>4 columns, <span className="font-mono text-xs bg-gray-20 px-1 rounded">gap-12</span> (48px), <span className="font-mono text-xs bg-gray-20 px-1 rounded">flex-nowrap</span></p>
                <p>Items: <span className="font-mono text-xs bg-gray-20 px-1 rounded">gap-3</span> (12px) vertical</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">text-base</span> (16px), font-normal</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">text-gray-120</span></p>
                <p>Social icons: <span className="font-mono text-xs bg-gray-20 px-1 rounded">w-4 h-4</span>, <span className="font-mono text-xs bg-gray-20 px-1 rounded">gap-1.5</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),

  // Typography
  "typography-fonts": (
    <ContentSection title="Font Families" description="The two font families used throughout the site.">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-beige-30 rounded-xl">
          <p className="text-sm text-gray-100 mb-2">Display — Dela Gothic One</p>
          <p className="font-display text-3xl text-purple-140">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="p-6 bg-beige-30 rounded-xl">
          <p className="text-sm text-gray-100 mb-2">Body — Nunito</p>
          <p className="font-body text-xl text-gray-120">The quick brown fox jumps over the lazy dog</p>
        </div>
      </div>
    </ContentSection>
  ),
  "typography-headings": (
    <ContentSection title="Heading Hierarchy" description="Responsive heading sizes. h1-h3 use display font, h4-h5 use body font.">
      <div className="space-y-6 p-6 bg-beige-30 rounded-xl">
        <div>
          <span className="text-xs text-gray-100 font-mono">h1 — font-display text-4xl/5xl/6xl (responsive)</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-purple-140">Heading One</h1>
        </div>
        <div>
          <span className="text-xs text-gray-100 font-mono">h2 — font-display text-3xl/4xl/5xl (responsive)</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-purple-140">Heading Two</h2>
        </div>
        <div>
          <span className="text-xs text-gray-100 font-mono">h3 — font-display text-2xl/3xl/4xl (responsive) — for callouts, mission statements</span>
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-purple-140">Heading Three</h3>
        </div>
        <div>
          <span className="text-xs text-gray-100 font-mono">h4 — text-xl font-semibold</span>
          <h4 className="font-semibold text-xl text-purple-140">Heading Four</h4>
        </div>
        <div>
          <span className="text-xs text-gray-100 font-mono">h5 — text-lg font-semibold</span>
          <h5 className="font-semibold text-lg text-purple-140">Heading Five</h5>
        </div>
      </div>
    </ContentSection>
  ),
  "typography-body": (
    <ContentSection title="Body Text" description="Body text sizes using the Nunito font.">
      <div className="space-y-4 p-6 bg-beige-30 rounded-xl">
        <div>
          <span className="text-xs text-gray-100 font-mono">Extra Large — text-xl (20px)</span>
          <p className="text-xl text-gray-110">UXHI is Hawaiʻi&apos;s premier UX community, connecting designers and researchers.</p>
        </div>
        <div>
          <span className="text-xs text-gray-100 font-mono">Large — text-lg (18px)</span>
          <p className="text-lg text-gray-110">UXHI is Hawaiʻi&apos;s premier UX community, connecting designers and researchers.</p>
        </div>
        <div>
          <span className="text-xs text-gray-100 font-mono">Medium — text-md (16px, same as base)</span>
          <p className="text-base text-gray-110">UXHI is Hawaiʻi&apos;s premier UX community, connecting designers and researchers across the islands.</p>
        </div>
        <div>
          <span className="text-xs text-gray-100 font-mono">Base — text-base (16px)</span>
          <p className="text-base text-gray-110">UXHI is Hawaiʻi&apos;s premier UX community, connecting designers and researchers across the islands.</p>
        </div>
        <div>
          <span className="text-xs text-gray-100 font-mono">Small — text-sm (14px)</span>
          <p className="text-sm text-gray-110">UXHI is Hawaiʻi&apos;s premier UX community, connecting designers and researchers across the islands.</p>
        </div>
      </div>
    </ContentSection>
  ),
  "typography-special": (
    <ContentSection title="Special Styles" description="Badges, eyebrows, and link styles.">
      <div className="flex flex-wrap gap-4 items-center p-6 bg-beige-30 rounded-xl">
        <span className="inline-flex items-center gap-2 bg-teal-30 text-teal-120 px-4 py-2 rounded-full text-sm font-bold">
          <span className="w-2 h-2 bg-teal-90 rounded-full animate-pulse" />
          Badge / Eyebrow
        </span>
        <span className="text-purple-140 font-bold uppercase tracking-wider text-sm">
          EYEBROW TEXT
        </span>
        <InlineLink href="#" variant="teal">Link Style (Teal)</InlineLink>
        <InlineLink href="#" variant="purple">Link Style (Purple)</InlineLink>
      </div>
    </ContentSection>
  ),
  "typography-bulletpoint": (
    <ContentSection
      title="Bullet Point"
      description="Styled bullet dot for list items. Teal variant for light backgrounds, yellow for dark/purple backgrounds."
      componentPath="components/ui/BulletPoint.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Teal (default)</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span className="text-gray-120">List item on a light background</span>
            </li>
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span className="text-gray-120">Another list item example</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Yellow (dark backgrounds)</h4>
          <div className="bg-purple-140 rounded-xl p-6">
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <BulletPoint variant="yellow" />
                <span className="text-white">List item on a dark background</span>
              </li>
              <li className="flex items-start gap-3">
                <BulletPoint variant="yellow" />
                <span className="text-white">Another list item example</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ContentSection>
  ),

  // Colors
  "colors-teal": (
    <ContentSection title="Primary — Teal" description="Primary brand color palette (15-step scale from Figma). Click any swatch to copy its hex value.">
      <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
        <ColorSwatch name="10" value="#F1FDFB" />
        <ColorSwatch name="20" value="#D4F5F7" />
        <ColorSwatch name="30" value="#B7EEF2" />
        <ColorSwatch name="40" value="#9AE6EE" />
        <ColorSwatch name="50" value="#7DDFE9" />
        <ColorSwatch name="60" value="#60D7E5" />
        <ColorSwatch name="70" value="#43CFE0" />
        <ColorSwatch name="80" value="#26C8DC" />
        <ColorSwatch name="90" value="#09C0D7" textColor="text-white" badge="Brand" />
        <ColorSwatch name="100" value="#08A5B8" textColor="text-white" />
        <ColorSwatch name="110" value="#06899A" textColor="text-white" />
        <ColorSwatch name="120" value="#056E7B" textColor="text-white" />
        <ColorSwatch name="130" value="#04525C" textColor="text-white" />
        <ColorSwatch name="140" value="#03373D" textColor="text-white" />
        <ColorSwatch name="150" value="#011B1F" textColor="text-white" />
      </div>
    </ContentSection>
  ),
  "colors-purple": (
    <ContentSection title="Secondary — Purple" description="Secondary brand color palette (15-step scale from Figma). Click any swatch to copy its hex value.">
      <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
        <ColorSwatch name="10" value="#EBE9FA" />
        <ColorSwatch name="20" value="#D7D2F5" />
        <ColorSwatch name="30" value="#C4BCF0" />
        <ColorSwatch name="40" value="#B0A5EB" />
        <ColorSwatch name="50" value="#9C8FE6" />
        <ColorSwatch name="60" value="#8879E1" />
        <ColorSwatch name="70" value="#7562DD" />
        <ColorSwatch name="80" value="#614CD8" textColor="text-white" />
        <ColorSwatch name="90" value="#4D35D3" textColor="text-white" />
        <ColorSwatch name="100" value="#412BC2" textColor="text-white" />
        <ColorSwatch name="110" value="#4424A7" textColor="text-white" badge="Brand" />
        <ColorSwatch name="120" value="#392092" textColor="text-white" />
        <ColorSwatch name="130" value="#2E1B7E" textColor="text-white" />
        <ColorSwatch name="140" value="#231769" textColor="text-white" badge="Brand" />
        <ColorSwatch name="150" value="#120C35" textColor="text-white" />
      </div>
    </ContentSection>
  ),
  "colors-gray": (
    <ContentSection title="Gray Scale" description="Neutral gray palette (15-step scale from Figma). Click any swatch to copy its hex value.">
      <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
        <ColorSwatch name="10" value="#F8F9FA" />
        <ColorSwatch name="20" value="#ECEEF0" />
        <ColorSwatch name="30" value="#DFE2E6" />
        <ColorSwatch name="40" value="#D3D7DC" />
        <ColorSwatch name="50" value="#C6CCD1" />
        <ColorSwatch name="60" value="#BAC0C7" />
        <ColorSwatch name="70" value="#ADB5BD" />
        <ColorSwatch name="80" value="#969DA4" textColor="text-white" />
        <ColorSwatch name="90" value="#7E858C" textColor="text-white" />
        <ColorSwatch name="100" value="#676D73" textColor="text-white" />
        <ColorSwatch name="110" value="#50555A" textColor="text-white" />
        <ColorSwatch name="120" value="#383D42" textColor="text-white" />
        <ColorSwatch name="130" value="#212529" textColor="text-white" />
        <ColorSwatch name="140" value="#16191B" textColor="text-white" />
        <ColorSwatch name="150" value="#0B0C0E" textColor="text-white" />
      </div>
    </ContentSection>
  ),
  "colors-beige": (
    <ContentSection title="Beige" description="Warm neutral palette (15-step scale). Click any swatch to copy its hex value.">
      <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
        <ColorSwatch name="10" value="#FDF9F6" />
        <ColorSwatch name="20" value="#FAF3EB" />
        <ColorSwatch name="30" value="#F5EDE4" />
        <ColorSwatch name="40" value="#EFE6DA" />
        <ColorSwatch name="50" value="#E7DCCE" />
        <ColorSwatch name="60" value="#DED1C0" />
        <ColorSwatch name="70" value="#D2C3AE" />
        <ColorSwatch name="80" value="#C2B198" />
        <ColorSwatch name="90" value="#AF9D81" textColor="text-white" />
        <ColorSwatch name="100" value="#99876A" textColor="text-white" />
        <ColorSwatch name="110" value="#7E6F56" textColor="text-white" />
        <ColorSwatch name="120" value="#655844" textColor="text-white" />
        <ColorSwatch name="130" value="#4C4233" textColor="text-white" />
        <ColorSwatch name="140" value="#352E24" textColor="text-white" />
        <ColorSwatch name="150" value="#1E1A13" textColor="text-white" />
      </div>
    </ContentSection>
  ),
  "colors-neutral": (
    <ContentSection title="Neutral" description="Background and accent colors. Click any swatch to copy its hex value.">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <ColorSwatch name="White" value="#ffffff" />
        <ColorSwatch name="Beige-10" value="#FDF9F6" badge="Background" />
        <ColorSwatch name="Black" value="#000000" textColor="text-white" />
      </div>
    </ContentSection>
  ),
  "colors-semantic": (
    <ContentSection title="Semantic Colors" description="Maps raw scale values to their semantic roles. These are not new CSS variables — they reference the scale tokens above. Use these mappings when choosing colors by purpose.">
      <div className="space-y-10">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Background</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <ColorSwatch name="Background" value="#FDF9F6" badge="beige-10" />
            <ColorSwatch name="Background Elevated" value="#FFFFFF" badge="white" />
            <ColorSwatch name="Background Subtle" value="#F8F9FA" badge="gray-10" />
            <ColorSwatch name="Background Accent" value="#F1FDFB" badge="teal-10" />
            <ColorSwatch name="Background Inverse" value="#231769" textColor="text-white" badge="purple-140" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Text</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <ColorSwatch name="Text Primary" value="#16191B" textColor="text-white" badge="gray-140" />
            <ColorSwatch name="Text Secondary" value="#50555A" textColor="text-white" badge="gray-110" />
            <ColorSwatch name="Text Tertiary" value="#676D73" textColor="text-white" badge="gray-100" />
            <ColorSwatch name="Text Inverse" value="#FFFFFF" badge="white" />
            <ColorSwatch name="Text Inverse Secondary" value="#9C8FE6" badge="purple-50" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Foreground (Icons & Accents)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <ColorSwatch name="Foreground Primary" value="#231769" textColor="text-white" badge="purple-140" />
            <ColorSwatch name="Foreground Secondary" value="#09C0D7" textColor="text-white" badge="teal-90" />
            <ColorSwatch name="Foreground Inverse" value="#FFFFFF" badge="white" />
            <ColorSwatch name="Foreground Muted" value="#969DA4" textColor="text-white" badge="gray-80" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Dividers & Borders</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <ColorSwatch name="Border Default" value="#DFE2E6" badge="gray-30" />
            <ColorSwatch name="Border Subtle" value="#ECEEF0" badge="gray-20" />
            <ColorSwatch name="Border Inverse" value="rgba(255,255,255,0.2)" badge="white/20" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Status</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <ColorSwatch name="Warning" value="#FF6933" textColor="text-white" badge="orange-90" />
            <ColorSwatch name="Warning Subtle" value="rgba(255,105,51,0.2)" badge="orange-90/20" />
            <ColorSwatch name="Success" value="#09C0D7" textColor="text-white" badge="teal-90" />
            <ColorSwatch name="Danger" value="#F34100" textColor="text-white" badge="orange-110" />
            <ColorSwatch name="Info" value="#9C8FE6" badge="purple-50" />
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "colors-orange": (
    <ContentSection title="Orange" description="Orange color palette (15-step scale from Figma). Click any swatch to copy its hex value.">
      <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
        <ColorSwatch name="10" value="#FFE7DE" />
        <ColorSwatch name="20" value="#FFD7C8" />
        <ColorSwatch name="30" value="#FFCBB8" />
        <ColorSwatch name="40" value="#FFBFA8" />
        <ColorSwatch name="50" value="#FFB398" />
        <ColorSwatch name="60" value="#FFA787" />
        <ColorSwatch name="70" value="#FF9B77" />
        <ColorSwatch name="80" value="#FF9066" badge="Brand" />
        <ColorSwatch name="90" value="#FF6933" textColor="text-white" />
        <ColorSwatch name="100" value="#FF571A" textColor="text-white" />
        <ColorSwatch name="110" value="#F34100" textColor="text-white" />
        <ColorSwatch name="120" value="#CC3600" textColor="text-white" />
        <ColorSwatch name="130" value="#A62D00" textColor="text-white" />
        <ColorSwatch name="140" value="#802200" textColor="text-white" />
        <ColorSwatch name="150" value="#4D1400" textColor="text-white" />
      </div>
    </ContentSection>
  ),
  "colors-yellow": (
    <ContentSection title="Yellow" description="Yellow color palette (15-step scale from Figma). Click any swatch to copy its hex value.">
      <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
        <ColorSwatch name="10" value="#FFF4D7" />
        <ColorSwatch name="20" value="#FFEDBC" />
        <ColorSwatch name="30" value="#FFE8A8" />
        <ColorSwatch name="40" value="#FFE293" />
        <ColorSwatch name="50" value="#FFDD7F" />
        <ColorSwatch name="60" value="#FFD76B" />
        <ColorSwatch name="70" value="#FFD257" />
        <ColorSwatch name="80" value="#FFCC40" badge="Brand" />
        <ColorSwatch name="90" value="#FFC420" />
        <ColorSwatch name="100" value="#FCB900" />
        <ColorSwatch name="110" value="#DBA000" textColor="text-white" />
        <ColorSwatch name="120" value="#B88700" textColor="text-white" />
        <ColorSwatch name="130" value="#966800" textColor="text-white" />
        <ColorSwatch name="140" value="#735400" textColor="text-white" />
        <ColorSwatch name="150" value="#2E2200" textColor="text-white" />
      </div>
    </ContentSection>
  ),

  // Buttons
  "button-primarycta": (
    <ContentSection
      title="Primary CTA"
      description="Pill button with arrow circle. Variants: default (yellow circle), subdued (gray circle, for secondary CTAs), dark (for dark backgrounds). Internal links use right arrow, external links use up-right arrow."
      componentPath="components/ui/PrimaryCTA.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Default Variant</h4>
          <div className="flex flex-wrap gap-4 items-center">
            <PrimaryCTA href="#">Join us</PrimaryCTA>
            <PrimaryCTA href="#" external>External Link</PrimaryCTA>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Subdued Variant</h4>
          <div className="flex flex-wrap gap-4 items-center">
            <PrimaryCTA href="#" variant="subdued">Secondary action</PrimaryCTA>
            <PrimaryCTA href="#" external variant="subdued">External Subdued</PrimaryCTA>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Dark Variant</h4>
          <div className="flex flex-wrap gap-4 items-center p-6 bg-purple-140 rounded-xl">
            <PrimaryCTA href="#" variant="dark">Dark Variant</PrimaryCTA>
            <PrimaryCTA href="#" external variant="dark">External Dark</PrimaryCTA>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "button-arrowlink": (
    <ContentSection
      title="Arrow Link Button"
      description="Text with arrow, pill-shaped hover state. Supports dark (default, for purple backgrounds) and light (for white/beige backgrounds) variants."
      componentPath="components/ui/ArrowLinkButton.tsx"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-6 items-center p-6 bg-purple-140 rounded-xl">
          <ArrowLinkButton href="#">Dark (default)</ArrowLinkButton>
        </div>
        <div className="flex flex-wrap gap-6 items-center p-6 bg-white rounded-xl border border-gray-30">
          <ArrowLinkButton href="#" variant="light">Light</ArrowLinkButton>
        </div>
      </div>
    </ContentSection>
  ),
  "button-inlinelink": (
    <ContentSection
      title="Inline Link"
      description="Styled inline text links for use within paragraphs. Auto-detects external links and uses Next.js Link for internal navigation."
      componentPath="components/ui/InlineLink.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Teal Variant (Rich Text / Content)</h4>
          <p className="text-base text-gray-110 mb-4">Used for links within rich text content. Font-semibold with teal colors.</p>
          <div className="p-6 bg-beige-30 rounded-xl">
            <p className="text-base text-gray-120 leading-relaxed">
              Learn more about our community on the{" "}
              <InlineLink href="/about" variant="teal">About page</InlineLink>{" "}
              or visit the{" "}
              <InlineLink href="https://uxhicon.com" variant="teal">UXHI Conference website</InlineLink>.
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Purple Variant (Paragraph Links)</h4>
          <p className="text-base text-gray-110 mb-4">Used for inline paragraph links. Purple colors with underline-offset. External links show icon by default.</p>
          <div className="p-6 bg-beige-30 rounded-xl">
            <p className="text-base text-gray-120 leading-relaxed">
              Propose a topic as a presenter at our{" "}
              <InlineLink href="https://uxhicon.com" variant="purple">UXHI Conference</InlineLink>{" "}
              or{" "}
              <InlineLink href="/events" variant="purple">local events</InlineLink>.
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Icon Control</h4>
          <p className="text-base text-gray-110 mb-4">You can override the default icon behavior with showIcon prop.</p>
          <div className="p-6 bg-beige-30 rounded-xl space-y-3">
            <p className="text-base text-gray-120">
              External with icon (default):{" "}
              <InlineLink href="https://example.com" variant="purple">Example Link</InlineLink>
            </p>
            <p className="text-base text-gray-120">
              External without icon:{" "}
              <InlineLink href="https://example.com" variant="purple" showIcon={false}>Example Link</InlineLink>
            </p>
            <p className="text-base text-gray-120">
              Internal with icon:{" "}
              <InlineLink href="/about" variant="purple" showIcon>About Page</InlineLink>
            </p>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "button-quicklink": (
    <ContentSection
      title="Quick Link Pill"
      description="Pill with icon, label, and subtitle. Used on hero sections (/get-involved, /resources, /about)."
      componentPath="components/ui/QuickLinkPill.tsx"
    >
      <div className="flex flex-wrap gap-4">
        <QuickLinkPill
          href="#"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
              <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
              <path d="m2 15 6 6" />
              <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
            </svg>
          }
          label="Volunteer"
          subtitle="Help grow our community"
        />
        <QuickLinkPill
          href="#"
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12" />
              <circle cx="16" cy="7" r="5" />
            </svg>
          }
          label="Become a Speaker"
          subtitle="Share your expertise"
        />
      </div>
    </ContentSection>
  ),
  "button-css": (
    <ContentSection
      title="CSS Utility Classes"
      description="CSS classes for custom button styling (not component-based)."
      componentPath="globals.css"
    >
      <div className="flex flex-wrap gap-4 items-center">
        <button className="btn-primary">btn-primary</button>
        <button className="btn-primary-arrow">
          <span className="text-white">btn-primary-arrow</span>
          <span className="w-8 h-8 rounded-full bg-yellow-80 flex items-center justify-center">
            <ArrowIcon className="w-4 h-4 text-gray-140" />
          </span>
        </button>
      </div>
    </ContentSection>
  ),

  // Cards
  "card-spotillustration": (
    <ContentSection
      title="Spot Illustration Card"
      description="Card with large illustrated icon (96px desktop, 80px mobile). Supports description text or custom children for complex content. Also supports Sanity CMS images."
      componentPath="components/ui/cards/SpotIllustrationCard.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">All Variants</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SpotIllustrationCard
              variant="dark"
              imageSrc="/images/icons/icon-membership.png"
              imageAlt="Membership illustration"
              title="Dark"
              description="For purple backgrounds. Used on home features section."
              footer={<ArrowLinkButton href="#">With Footer</ArrowLinkButton>}
            />
            <SpotIllustrationCard
              variant="beige"
              imageSrc="/images/icons/icon-community-engagement.png"
              imageAlt="Community engagement illustration"
              title="Beige"
              description="For light backgrounds with hover shadow. Used for committee cards."
            />
            <SpotIllustrationCard
              variant="white"
              imageSrc="/images/icons/icon-resources.png"
              imageAlt="Resources illustration"
              title="White"
              description="For beige backgrounds. Used for values cards."
            />
            <div className="bg-purple-140 rounded-xl p-4">
              <SpotIllustrationCard
                variant="translucent"
                imageSrc="/images/icons/icon-education-findings.png"
                imageAlt="Education findings"
                title="Translucent"
                description="Semi-transparent for purple backgrounds. Used for findings cards."
              />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">With Custom Children (Bullet List)</h4>
          <div className="bg-purple-140 rounded-xl p-6">
            <div className="max-w-sm">
              <SpotIllustrationCard
                variant="translucent"
                imageSrc="/images/icons/icon-challenges.png"
                imageAlt="Challenges"
                title="Custom Content"
              >
                <ul className="space-y-2 text-left text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-80 rounded-full mt-1.5 flex-shrink-0" />
                    <span>First bullet point item</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-80 rounded-full mt-1.5 flex-shrink-0" />
                    <span>Second bullet point item</span>
                  </li>
                </ul>
              </SpotIllustrationCard>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "card-carousel": (
    <ContentSection
      title="Carousel Testimonial Card"
      description="Centered large quote with photo and author. Used in testimonial carousels."
      componentPath="Inline pattern (not a separate component)"
    >
      <div className="bg-beige-30 p-8 rounded-2xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-2xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl text-gray-120 mb-6">
            &ldquo;This is a testimonial carousel card style with larger centered quote text and author attribution below.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-30" />
            <div className="text-center">
              <p className="font-semibold text-purple-140">Author Name</p>
              <p className="text-gray-100 text-sm">Role at Company</p>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "card-link": (
    <ContentSection
      title="Link Card"
      description="Beige card with title, teal description, and external link icon. Title turns teal on hover. Used on /resources."
      componentPath="components/ui/LinkCard.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">With Description</h4>
          <div className="max-w-sm">
            <LinkCard
              href="#"
              title="Resource Title"
              description="Description or label"
            />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Title Only</h4>
          <div className="max-w-sm">
            <LinkCard
              href="#"
              title="External Resource Link"
            />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Grid Layout (2 columns)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <LinkCard href="#" title="Visual Design" description="shiftnudge.com" />
            <LinkCard href="#" title="Interaction Design" description="interaction-design.org" />
            <LinkCard href="#" title="UX Design" description="nngroup.com" />
            <LinkCard href="#" title="Articles" description="uxdesign.cc" />
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "card-infobox": (
    <ContentSection
      title="Info Box"
      description="Teal-50 background with teal-30 border. Used for notes, callouts, and featured content."
      componentPath="components/ui/InfoBox.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Simple Note</h4>
          <InfoBox>
            <p className="text-base text-gray-120 font-medium">Note: This is an informational callout for important notes or disclaimers.</p>
          </InfoBox>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">With Eyebrow Label</h4>
          <InfoBox eyebrow="Featured in Hawai'i Bulletin">
            <p className="text-base text-gray-120 font-medium">Local group explores user experience and interface design</p>
          </InfoBox>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Note with CTA</h4>
          <InfoBox className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-base text-gray-120 font-medium">Do you have more resources to suggest?</p>
            <PrimaryCTA href="#">Email Us</PrimaryCTA>
          </InfoBox>
        </div>
      </div>
    </ContentSection>
  ),
  "card-pressmention": (
    <ContentSection
      title="Press Mention"
      description="Reusable callout for press/media features. Built on InfoBox with standardized eyebrow, title, and CTA layout."
      componentPath="components/ui/PressMention.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="space-y-4">
            <PressMention
              source="Hawai'i Bulletin"
              title="Local group explores user experience and interface design"
              href="https://www.hawaiibulletin.com/p/local-group-explores-user-experience"
            />
            <PressMention
              source="Hawaii Public Radio"
              title="Bytemarks Cafe — UXHI Conference coverage"
              href="https://www.hawaiipublicradio.org/podcast/bytemarks-cafe"
              ctaLabel="Listen Now"
            />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Props</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">source</span> — publication name (used in eyebrow)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">title</span> — article headline or description</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">href</span> — link to the article</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">ctaLabel</span> — button text (default: &quot;Read Article&quot;)</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Built on <span className="font-mono text-xs bg-gray-20 px-1 rounded">InfoBox</span></p>
                <p>Eyebrow: <span className="font-mono text-xs bg-gray-20 px-1 rounded">Featured in {"{source}"}</span></p>
                <p>Responsive: stacks on mobile, row on sm+</p>
                <p>CTA: <span className="font-mono text-xs bg-gray-20 px-1 rounded">PrimaryCTA</span> with external link</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "card-upcomingevent": (
    <ContentSection
      title="Upcoming Event"
      description="Card-style list item for upcoming events. Displays date, title (optionally linked), time, and location with clear visual hierarchy."
      componentPath="app/(site)/events/page.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="max-w-[700px] space-y-4">
            <div className="bg-beige-30 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5">
              <span className="text-teal-90 font-bold text-sm uppercase tracking-wide shrink-0">
                Mar 15, 2026
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-140">
                  <a href="#" className="underline underline-offset-2 hover:text-teal-90 transition-colors">UX Portfolio Workshop</a>
                </span>
                <span className="text-sm text-gray-100 mt-0.5">6:00 PM HST · Impact Hub Honolulu</span>
              </div>
            </div>
            <div className="bg-beige-30 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5">
              <span className="text-teal-90 font-bold text-sm uppercase tracking-wide shrink-0">
                Apr 5, 2026 (TBC)
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-140">Design Systems Meetup</span>
                <span className="text-sm text-gray-100 mt-0.5">10:00 AM HST</span>
              </div>
            </div>
            <div className="bg-beige-30 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5">
              <span className="text-teal-90 font-bold text-sm uppercase tracking-wide shrink-0">
                May 20, 2026
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-140">UXHICon 2026</span>
                <span className="text-sm text-gray-100 mt-0.5">9:00 AM – 5:00 PM · Honolulu Convention Center</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Card: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-beige-30 rounded-2xl px-6 py-5</span></p>
                <p>Date: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-teal-90 font-bold text-sm uppercase</span></p>
                <p>Title: <span className="font-mono text-xs bg-gray-20 px-1 rounded">font-semibold text-gray-140</span></p>
                <p>Meta: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-sm text-gray-100</span></p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Layout</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Stacks vertically on mobile</p>
                <p>Date + content side-by-side on <span className="font-mono text-xs bg-gray-20 px-1 rounded">sm+</span></p>
                <p>Time and location joined with &quot;·&quot; separator</p>
                <p>Title links externally when URL is provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "card-member": (
    <ContentSection
      title="Member Card"
      description="Directory member card with photo, badges, tags, and hover overlay. Used on /find-ux-pro."
      componentPath="components/directory/MemberCard.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Card States</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
            <MemberCard
              member={{
                _id: "1",
                name: "Jane Doe",
                title: "Senior Product Designer",
                photo: { asset: undefined },
                openToWork: true,
                focus: ["product-design", "user-research", "interaction-design"],
                experienceLevel: "5-9-years",
                location: "Honolulu",
                linkedIn: "https://linkedin.com",
                portfolio: "https://example.com",
              }}
            />
            <MemberCard
              member={{
                _id: "2",
                name: "John Smith",
                title: "UX Researcher",
                photo: { asset: undefined },
                openToWork: false,
                focus: ["user-research"],
                experienceLevel: "3-4-years",
                location: "Maui",
              }}
            />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Key Elements</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl">
              <p className="text-sm font-semibold text-gray-120 mb-2">Open to Work Badge</p>
              <div className="flex items-center gap-1.5 bg-teal-90 text-teal-130 px-3 py-1.5 rounded-full text-xs font-medium w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-130 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-130"></span>
                </span>
                Open to Work
              </div>
              <p className="text-xs text-gray-100 font-mono mt-2">bg-teal-90, rounded-full, animate-ping</p>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl">
              <p className="text-sm font-semibold text-gray-120 mb-2">Focus Tags</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-teal-10 text-teal-120 px-2 py-0.5 rounded-full text-xs">Product Design</span>
                <span className="bg-teal-10 text-teal-120 px-2 py-0.5 rounded-full text-xs">User Research</span>
                <span className="bg-gray-20 text-gray-100 px-2 py-0.5 rounded-full text-xs">+2</span>
              </div>
              <p className="text-xs text-gray-100 font-mono mt-2">bg-teal-10, text-teal-120, rounded-full</p>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),

  // Form Elements
  "form-input": (
    <ContentSection
      title="Text Input"
      description="Glassmorphic text input for purple form backgrounds. Shared across all forms."
      componentPath="components/ui/form-elements/FormInput.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8 space-y-4 max-w-md">
            <div>
              <FormLabel htmlFor="demo-text">Default</FormLabel>
              <FormInput type="text" id="demo-text" placeholder="Placeholder text" />
            </div>
            <div>
              <FormLabel htmlFor="demo-text-filled">With Value</FormLabel>
              <FormInput type="text" id="demo-text-filled" defaultValue="John Doe" />
            </div>
            <div>
              <FormLabel htmlFor="demo-email">Email Type</FormLabel>
              <FormInput type="email" id="demo-email" placeholder="you@example.com" />
            </div>
            <div>
              <FormLabel htmlFor="demo-url">URL Type</FormLabel>
              <FormInput type="url" id="demo-url" placeholder="https://" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Background: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-white/10</span></p>
                <p>Border: <span className="font-mono text-xs bg-gray-20 px-1 rounded">border-white/20</span></p>
                <p>Radius: <span className="font-mono text-xs bg-gray-20 px-1 rounded">rounded-xl</span></p>
                <p>Placeholder: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-purple-60/60</span></p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">States</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Focus: <span className="font-mono text-xs bg-gray-20 px-1 rounded">ring-2 ring-teal-90</span></p>
                <p>Text color: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-white</span></p>
                <p>Supports all native input types</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "form-textarea": (
    <ContentSection
      title="Textarea"
      description="Glassmorphic textarea with vertical resize. Matches FormInput styling."
      componentPath="components/ui/form-elements/FormTextarea.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8 space-y-4 max-w-md">
            <div>
              <FormLabel htmlFor="demo-textarea">Default</FormLabel>
              <FormTextarea id="demo-textarea" rows={3} placeholder="Type your message..." />
            </div>
            <div>
              <FormLabel htmlFor="demo-textarea-filled">With Value</FormLabel>
              <FormTextarea id="demo-textarea-filled" rows={3} defaultValue="This textarea is resizable vertically. It uses the same glassmorphic styling as FormInput." />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="p-4 bg-beige-30 rounded-xl space-y-3 max-w-md">
            <p className="text-sm font-semibold text-gray-120">Behavior</p>
            <div className="text-sm text-gray-110 space-y-1">
              <p>Inherits all FormInput styles</p>
              <p>Resize: <span className="font-mono text-xs bg-gray-20 px-1 rounded">resize-y</span></p>
              <p>Default rows configurable via props</p>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "form-radio": (
    <ContentSection
      title="Radio Button"
      description="Custom-styled radio with teal fill and inner white dot. Uses sr-only native input for FormData compatibility and keyboard navigation."
      componentPath="components/ui/form-elements/FormRadio.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8 space-y-4 max-w-md">
            <FormLabel as="legend">Select an option</FormLabel>
            <div className="space-y-2">
              <FormRadio name="demo-radio" value="option1" label="Option one" defaultChecked />
              <FormRadio name="demo-radio" value="option2" label="Option two" />
              <FormRadio name="demo-radio" value="option3" label="Option three" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Unchecked: <span className="font-mono text-xs bg-gray-20 px-1 rounded">border-white/30 bg-white/5</span></p>
                <p>Checked: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-teal-90 border-teal-90</span></p>
                <p>Inner dot: white, scales in on check</p>
                <p>Label: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-purple-50</span>, white on hover</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Behavior</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Native radio mutual exclusion</p>
                <p>Keyboard navigable (arrow keys)</p>
                <p>Focus ring via <span className="font-mono text-xs bg-gray-20 px-1 rounded">:focus-visible</span></p>
                <p>FormData-compatible (sr-only native input)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "form-checkbox": (
    <ContentSection
      title="Checkbox"
      description="Custom-styled checkbox with teal fill and SVG checkmark. Matches the directory's custom checkbox rendering."
      componentPath="components/ui/form-elements/FormCheckbox.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8 space-y-4 max-w-md">
            <FormLabel as="legend">Select multiple</FormLabel>
            <div className="space-y-2">
              <FormCheckbox name="demo-cb" value="a" label="Mentorship" defaultChecked />
              <FormCheckbox name="demo-cb" value="b" label="Speaking" />
              <FormCheckbox name="demo-cb" value="c" label="Volunteering" defaultChecked />
              <FormCheckbox name="demo-cb" value="d" label="Content creation" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Unchecked: <span className="font-mono text-xs bg-gray-20 px-1 rounded">border-white/30 bg-white/5</span></p>
                <p>Checked: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-teal-90 border-teal-90</span></p>
                <p>Checkmark: white SVG stroke</p>
                <p>4px rounded corners</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Behavior</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Click and keyboard toggle</p>
                <p>Hidden native checkbox (sr-only)</p>
                <p>State managed via React useState</p>
                <p>FormData-compatible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "form-select": (
    <ContentSection
      title="Select Dropdown"
      description="Custom dropdown with purple glassmorphic styling. Uses hidden input for FormData compatibility."
      componentPath="components/ui/form-elements/FormSelect.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8 space-y-4 max-w-md">
            <div>
              <FormLabel>Experience Level</FormLabel>
              <FormSelect
                name="demo-select"
                placeholder="Select..."
                options={[
                  { title: "Student", value: "student" },
                  { title: "Junior (0-2 years)", value: "junior" },
                  { title: "Mid-level (3-5 years)", value: "mid" },
                  { title: "Senior (6-10 years)", value: "senior" },
                  { title: "Lead / Principal (10+ years)", value: "lead" },
                ]}
              />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Trigger: matches FormInput style</p>
                <p>Panel: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-purple-120 border-white/20</span></p>
                <p>Selected: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-teal-90/20 text-teal-60</span></p>
                <p>Chevron rotates on open</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Behavior</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Click-outside to close</p>
                <p>Hidden input for FormData</p>
                <p>Scrollable when many options</p>
                <p>Single-select only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "form-file": (
    <ContentSection
      title="File Upload"
      description="Styled file upload button with optional circular image preview. Hides the native file input."
      componentPath="components/ui/form-elements/FormFileUpload.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8 space-y-6 max-w-md">
            <div>
              <FormLabel>With Preview</FormLabel>
              <FormFileUpload
                name="demo-file-preview"
                showPreview
                helpText="JPG, PNG, or WebP. Max 5MB."
              />
            </div>
            <div>
              <FormLabel>Without Preview</FormLabel>
              <FormFileUpload
                name="demo-file-basic"
                helpText="Upload any supported file."
              />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Button: pill shape, <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-white/10 border-white/20</span></p>
                <p>Preview: 80px circle with border</p>
                <p>Help text: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-purple-60/60</span></p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Behavior</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Native file input hidden, triggered via ref</p>
                <p>Preview via <span className="font-mono text-xs bg-gray-20 px-1 rounded">URL.createObjectURL</span></p>
                <p>Shows selected filename</p>
                <p>Configurable accept types</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "form-submit": (
    <ContentSection
      title="Submit Button"
      description="Pill-shaped submit button with icon circle. Two icon variants: send (paper plane) and arrow."
      componentPath="components/ui/form-elements/FormSubmitButton.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-purple-60 uppercase tracking-wide">Send Icon (InquiryForm)</p>
              <FormSubmitButton label="Send message" pendingLabel="Sending..." isPending={false} icon="send" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-purple-60 uppercase tracking-wide">Arrow Icon (Membership / Directory)</p>
              <FormSubmitButton label="Submit application" pendingLabel="Submitting..." isPending={false} icon="arrow" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-purple-60 uppercase tracking-wide">Pending State</p>
              <FormSubmitButton label="Send message" pendingLabel="Sending..." isPending={true} icon="send" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Shape: <span className="font-mono text-xs bg-gray-20 px-1 rounded">rounded-full</span></p>
                <p>Background: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-white/10 border-white/30</span></p>
                <p>Icon circle: <span className="font-mono text-xs bg-gray-20 px-1 rounded">w-9 h-9 bg-white/20</span></p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Variants</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">icon=&quot;send&quot;</span> — paper plane (InquiryForm)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">icon=&quot;arrow&quot;</span> — right arrow (default)</p>
                <p>Disabled state: 50% opacity, not-allowed cursor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),

  // Forms
  "form-inquiry": (
    <ContentSection
      title="Inquiry Form"
      description="Contact form on /about#contact. Saves to Sanity submission + Slack notification. Designed for purple (bg-purple-140) backgrounds."
      componentPath={["components/forms/InquiryForm.tsx", "lib/actions/inquiry.ts"]}
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8">
            <InquiryForm />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Fields</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>First Name, Last Name (required)</p>
                <p>Email (required)</p>
                <p>Role, Company Name (optional)</p>
                <p>Interest type — radio (required)</p>
                <p>Message — textarea (required)</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Labels: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-purple-50</span></p>
                <p>Inputs: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-white/10 border-white/20</span></p>
                <p>Errors: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-yellow-80</span></p>
                <p>Button: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-white/10 border-white/30</span></p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Integrations</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Saves to Sanity <span className="font-mono text-xs bg-gray-20 px-1 rounded">submission</span> schema</p>
                <p>Slack notification via webhook</p>
                <p>Honeypot spam protection</p>
                <p>Rate limiting (1/hr per email)</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Pattern</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>React 19 <span className="font-mono text-xs bg-gray-20 px-1 rounded">useActionState</span></p>
                <p>Zod validation (client + server)</p>
                <p>Server Action in <span className="font-mono text-xs bg-gray-20 px-1 rounded">lib/actions/inquiry.ts</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "form-membership": (
    <ContentSection
      title="Membership Form"
      description="Join form on /join. Appends to Google Sheet + Slack notification. Designed for purple (bg-purple-140) backgrounds."
      componentPath={["components/forms/MembershipForm.tsx", "lib/actions/membership.ts"]}
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8">
            <MembershipForm />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Fields</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>First Name, Last Name (required)</p>
                <p>Email (required)</p>
                <p>LinkedIn or Website — url (required)</p>
                <p>Experience Level — radio, 6 options (required)</p>
                <p>Hopes — textarea (optional)</p>
                <p>Contributions — checkboxes, 5 options (optional)</p>
                <p>How did you hear about us — radio (optional)</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Integrations</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Appends row to Google Sheet</p>
                <p>Slack notification via webhook</p>
                <p>Honeypot spam protection</p>
                <p>Rate limiting (1/hr per email)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "form-directory": (
    <ContentSection
      title="Directory Submission Form"
      description="Directory submission form on /find-ux-pro. Creates draft directoryMember in Sanity + Slack notification. Designed for purple (bg-purple-140) backgrounds."
      componentPath={["components/forms/DirectorySubmitForm.tsx", "lib/actions/directory-submit.ts"]}
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8">
            <DirectorySubmitForm />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Fields</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>First Name, Last Name (required)</p>
                <p>Job Title (optional)</p>
                <p>Photo — file upload with preview (required)</p>
                <p>Open to Work — checkbox (optional)</p>
                <p>Focus — multi-select, 15 options (optional)</p>
                <p>Experience Level — dropdown, 7 options (optional)</p>
                <p>Industries — multi-select, 16 options (optional)</p>
                <p>Location, Education/Bootcamp (optional)</p>
                <p>LinkedIn URL, Portfolio URL (optional)</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Integrations</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Uploads photo to Sanity assets</p>
                <p>Creates draft <span className="font-mono text-xs bg-gray-20 px-1 rounded">directoryMember</span> doc</p>
                <p>Admin publishes in Sanity Studio</p>
                <p>Slack notification via webhook</p>
                <p>Honeypot spam protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),

  // Alerts & Feedback
  "feedback-alert": (
    <ContentSection
      title="Form Alert"
      description="Banner for form-level error or info messages. Used on purple (bg-purple-140) backgrounds."
      componentPath="components/ui/FormFeedback.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Variants</h4>
          <div className="bg-purple-140 rounded-2xl p-8 space-y-4">
            <div>
              <span className="text-xs text-purple-60 mb-2 block">error (default)</span>
              <FormAlert message="Something went wrong. Please try again." />
            </div>
            <div>
              <span className="text-xs text-purple-60 mb-2 block">info</span>
              <FormAlert message="Your session has been restored." variant="info" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Props</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">message</span> — string (required)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">variant</span> — &quot;error&quot; | &quot;info&quot; (default: &quot;error&quot;)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">className</span> — optional overrides</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Error: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-orange-90/20 border-orange-70/30 text-orange-30</span></p>
                <p>Info: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-white/10 border-white/20 text-purple-50</span></p>
                <p>Adds <span className="font-mono text-xs bg-gray-20 px-1 rounded">role=&quot;alert&quot;</span> for accessibility</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "feedback-fielderror": (
    <ContentSection
      title="Field Error"
      description="Inline field-level validation message. Renders below form inputs on purple (bg-purple-140) backgrounds."
      componentPath="components/ui/FormFeedback.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-140 rounded-2xl p-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-purple-50 mb-1.5">Email *</label>
              <input
                type="email"
                disabled
                placeholder="invalid-email"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-purple-60/60"
              />
              <FieldError errors={{ email: ["Please enter a valid email address."] }} field="email" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-purple-50 mb-1.5">Name *</label>
              <input
                type="text"
                disabled
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-purple-60/60"
              />
              <FieldError errors={{ name: ["Name is required."] }} field="name" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Props</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">errors</span> — Record&lt;string, string[]&gt; (optional)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">field</span> — string (required)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">className</span> — optional overrides</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Text: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-yellow-80 text-sm mt-1</span></p>
                <p>Adds <span className="font-mono text-xs bg-gray-20 px-1 rounded">role=&quot;alert&quot;</span> and <span className="font-mono text-xs bg-gray-20 px-1 rounded">id=&quot;&#123;field&#125;-error&quot;</span></p>
                <p>Returns null when no errors for the given field</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "feedback-success": (
    <ContentSection
      title="Form Success"
      description="Post-submission success card. Replaces the form after a successful submit. Used on purple (bg-purple-140) backgrounds."
      componentPath="components/ui/FormFeedback.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Examples</h4>
          <div className="bg-purple-140 rounded-2xl p-8 space-y-6">
            <div>
              <span className="text-xs text-purple-60 mb-2 block">Inquiry form</span>
              <FormSuccess icon="&#9989;" title="Message sent!" message="We'll get back to you within a few business days." />
            </div>
            <div>
              <span className="text-xs text-purple-60 mb-2 block">Membership form</span>
              <FormSuccess icon="&#127881;" title="Application received!" message="Welcome to the UXHI community!" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Props</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">icon</span> — string (required, e.g. emoji or HTML entity)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">title</span> — string (required)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">message</span> — string (required)</p>
                <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">className</span> — optional overrides</p>
              </div>
            </div>
            <div className="p-4 bg-beige-30 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-120">Styling</p>
              <div className="text-sm text-gray-110 space-y-1">
                <p>Container: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-white/10 border-white/20 rounded-2xl p-8</span></p>
                <p>Title: <span className="font-mono text-xs bg-gray-20 px-1 rounded">font-display text-2xl text-white</span></p>
                <p>Message: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-purple-50</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),

  // Interactive
  "interactive-accordion": (
    <ContentSection
      title="FAQ Accordion"
      description="Expandable accordion with teal active state. Uses PlusIcon/MinusIcon from components/ui/icons/."
      componentPath="components/sections/FAQSection.tsx"
    >
      <FAQAccordionDemo />
    </ContentSection>
  ),
  "interactive-dropdown": (
    <ContentSection
      title="Dropdown Menu"
      description="Animated dropdown with tail pointer. Uses ChevronDownIcon from components/ui/icons/."
      componentPath="components/layout/Header.tsx (inline)"
    >
      <DropdownDemo />
    </ContentSection>
  ),
  "interactive-search": (
    <ContentSection
      title="Search Input"
      description="Inline search field with icon and clear button. Used in the member directory filter bar to search by name or title."
      componentPath="components/directory/MemberFilters.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">States</h4>
          <div className="space-y-4 max-w-md">
            {/* Empty */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-100">Empty</span>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-80 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  readOnly
                  placeholder="Search by name or title..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-30 text-sm text-gray-140 placeholder:text-gray-80 focus:outline-none"
                />
              </div>
            </div>
            {/* With value */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-100">With value + clear button</span>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-80 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  readOnly
                  value="Jane"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-teal-90 ring-1 ring-teal-90 text-sm text-gray-140 focus:outline-none"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-30 flex items-center justify-center">
                  <svg className="w-3 h-3 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Styling</h4>
          <div className="text-sm text-gray-110 space-y-1">
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">rounded-lg border-gray-30</span> default border</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">border-teal-90 ring-1 ring-teal-90</span> on focus</p>
            <p>Search icon: <span className="font-mono text-xs bg-gray-20 px-1 rounded">text-gray-80</span>, clear button: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-gray-30 rounded-full</span></p>
            <p>Auto-switches sort to A–Z while searching</p>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "interactive-filter-dropdown": (
    <ContentSection
      title="Filter Dropdown"
      description="Dropdown for filtering content. Supports single-select and multi-select with checkboxes. Active state shows teal styling."
      componentPath="components/directory/MemberFilters.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">States</h4>
          <div className="flex flex-wrap gap-4">
            {/* Default State */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-100">Default</span>
              <button className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg border bg-white border-gray-30 text-gray-120 text-sm font-medium min-w-[160px]">
                <span>Focus</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>
            {/* Active/Selected State */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-100">Selected</span>
              <button className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg border bg-teal-10 border-teal-50 text-teal-120 text-sm font-medium min-w-[160px]">
                <span>Focus (3)</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Dropdown Panel</h4>
          <div className="w-64 bg-white rounded-xl border border-gray-30 shadow-lg p-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm bg-teal-10 text-teal-120">
              <div className="w-4 h-4 rounded border bg-teal-90 border-teal-90 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Product Design</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-gray-120 hover:bg-gray-10">
              <div className="w-4 h-4 rounded border border-gray-40 flex-shrink-0" />
              <span>User Research</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-gray-120 hover:bg-gray-10">
              <div className="w-4 h-4 rounded border border-gray-40 flex-shrink-0" />
              <span>UI Design</span>
            </button>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Styling</h4>
          <div className="text-sm text-gray-110 space-y-1">
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">rounded-lg</span> for trigger button</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">rounded-xl</span> for dropdown panel</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-teal-10 border-teal-50 text-teal-120</span> for selected state</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-teal-90</span> for checkbox fill</p>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "interactive-toggle": (
    <ContentSection
      title="Toggle Button"
      description="Toggle button with pulsing indicator. Used for Open to Work filter."
      componentPath="components/directory/MemberFilters.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">States</h4>
          <div className="flex flex-wrap gap-6">
            {/* Inactive State */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-100">Inactive</span>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-white border-gray-30 text-gray-120 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-90"></span>
                </span>
                Open to Work
              </button>
            </div>
            {/* Active State */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-100">Active</span>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-teal-90 border-teal-90 text-teal-130 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-130 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-130"></span>
                </span>
                Open to Work
              </button>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Styling</h4>
          <div className="text-sm text-gray-110 space-y-1">
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">rounded-lg</span> border radius</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-teal-90 border-teal-90 text-teal-130</span> for active state</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">animate-ping</span> for pulsing dot when active</p>
          </div>
        </div>
      </div>
    </ContentSection>
  ),

  "interactive-tooltip": (
    <ContentSection
      title="Mobile Tooltip"
      description="Tap-to-reveal tooltip on mobile, hover on desktop. Shows dotted underline on mobile to indicate interactivity. Used for inline definitions."
      componentPath="components/ui/MobileTooltip.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Live Example</h4>
          <p className="text-gray-120 text-lg">
            UXHI&apos;s mission is to grow and elevate the professional standard of{" "}
            <MobileTooltip tooltip="Human-centered design is an approach that prioritizes the unique needs of users.">
              human-centered design
            </MobileTooltip>{" "}
            in Hawai&apos;i.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Styling</h4>
          <div className="text-sm text-gray-110 space-y-1">
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">decoration-dotted</span> underline on mobile, hidden on desktop</p>
            <p>Tooltip: <span className="font-mono text-xs bg-gray-20 px-1 rounded">bg-white rounded-xl shadow-lg</span> with tail arrow</p>
            <p>Accepts optional <span className="font-mono text-xs bg-gray-20 px-1 rounded">decorationElement</span> prop for custom visuals</p>
          </div>
        </div>
      </div>
    </ContentSection>
  ),

  // Layout
  "layout-container": (
    <ContentSection
      title="Container"
      description="Responsive max-width wrapper with horizontal padding. Three size variants for consistent page layouts."
      componentPath="components/ui/Container.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Size Variants</h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-gray-100 mb-1 block">default — max-w-7xl (1280px)</span>
              <Container className="bg-teal-10 border border-teal-30 rounded-lg py-3 text-center text-sm text-teal-120">Container default</Container>
            </div>
            <div>
              <span className="text-xs text-gray-100 mb-1 block">narrow — max-w-4xl (896px)</span>
              <Container size="narrow" className="bg-purple-10 border border-purple-30 rounded-lg py-3 text-center text-sm text-purple-140">Container narrow</Container>
            </div>
            <div>
              <span className="text-xs text-gray-100 mb-1 block">wide — max-w-[1440px]</span>
              <Container size="wide" className="bg-gray-10 border border-gray-30 rounded-lg py-3 text-center text-sm text-gray-110">Container wide</Container>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Props</h4>
          <div className="text-sm text-gray-110 space-y-1">
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">size</span> — &quot;default&quot; | &quot;narrow&quot; | &quot;wide&quot;</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">className</span> — additional CSS classes merged via <span className="font-mono text-xs bg-gray-20 px-1 rounded">cn()</span></p>
            <p>Padding: <span className="font-mono text-xs bg-gray-20 px-1 rounded">px-4 sm:px-6 lg:px-8</span></p>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "layout-sanityimage": (
    <ContentSection
      title="Sanity Image"
      description="Wrapper around Next.js Image for Sanity CMS assets. Handles URL building, LQIP blur placeholders, hotspot/crop, and responsive sizing."
      componentPath="components/ui/SanityImage.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Props</h4>
          <div className="text-sm text-gray-110 space-y-1">
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">value</span> — Sanity image object with asset, alt, hotspot, crop</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">width</span> — render width in px (default: 800)</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">height</span> — render height in px (default: width &times; 0.66)</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">fill</span> — use fill mode for parent-sized containers</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">priority</span> — enable LCP priority loading</p>
            <p><span className="font-mono text-xs bg-gray-20 px-1 rounded">sizes</span> — responsive sizes string</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Features</h4>
          <div className="text-sm text-gray-110 space-y-1">
            <p>Auto-generates optimized URLs via <span className="font-mono text-xs bg-gray-20 px-1 rounded">urlFor()</span></p>
            <p>LQIP blur placeholder when available from Sanity metadata</p>
            <p>Returns <span className="font-mono text-xs bg-gray-20 px-1 rounded">null</span> if no asset — safe to render unconditionally</p>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "layout-grids": (
    <ContentSection title="Image Grid Patterns" description="Responsive image layouts used on the site.">
      <div className="space-y-12">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Staggered Community Grid</h4>
          <p className="text-sm text-gray-100 mb-4">Used by <code className="bg-gray-20 px-2 py-1 rounded">CommunityPhotosGrid</code> on the homepage. 9-column desktop grid, 5-column tablet, 3-column mobile. Each column has a vertical offset for a staggered look, with 3:4 aspect-ratio photo cells.</p>
          <div className="grid grid-cols-9 gap-4">
            {[
              { offset: "pt-16", rows: 2 },
              { offset: "",      rows: 2 },
              { offset: "pt-24", rows: 1 },
              { offset: "pt-8",  rows: 1 },
              { offset: "pt-24", rows: 1 },
              { offset: "pt-8",  rows: 1 },
              { offset: "pt-24", rows: 1 },
              { offset: "",      rows: 2 },
              { offset: "pt-16", rows: 2 },
            ].map((col, i) => (
              <div key={i} className={`flex flex-col gap-4 ${col.offset}`}>
                {Array.from({ length: col.rows }).map((_, j) => (
                  <div key={j} className="w-full aspect-[3/4] rounded-[16px] bg-gray-30" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "layout-spacing": (
    <ContentSection title="Spacing & Container" description="Container widths, section padding, and spacing tokens.">
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Container</h4>
          <p className="text-sm text-gray-110 mb-4">
            Max width: <code className="bg-gray-20 px-2 py-1 rounded">1380px</code> (custom 2xl breakpoint) with <code className="bg-gray-20 px-2 py-1 rounded">px-6</code> padding
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-4">Section Padding</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-beige-30 rounded-lg">
              <p className="font-mono text-gray-100">py-16 md:py-24</p>
              <p className="text-gray-120">Standard section</p>
            </div>
            <div className="p-4 bg-beige-30 rounded-lg">
              <p className="font-mono text-gray-100">py-20 md:py-28</p>
              <p className="text-gray-120">Large section</p>
            </div>
            <div className="p-4 bg-beige-30 rounded-lg">
              <p className="font-mono text-gray-100">py-20 md:py-32</p>
              <p className="text-gray-120">Hero section</p>
            </div>
            <div className="p-4 bg-beige-30 rounded-lg">
              <p className="font-mono text-gray-100">gap-4 / gap-8</p>
              <p className="text-gray-120">Grid gaps</p>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "layout-radius": (
    <ContentSection title="Border Radius" description="Border radius tokens used throughout the site.">
      <div>
        <div className="flex flex-wrap gap-4">
          <div className="w-20 h-20 bg-gray-30 rounded" />
          <div className="w-20 h-20 bg-gray-30 rounded-lg" />
          <div className="w-20 h-20 bg-gray-30 rounded-xl" />
          <div className="w-20 h-20 bg-gray-30 rounded-2xl" />
          <div className="w-20 h-20 bg-gray-30 rounded-[2rem]" />
          <div className="w-20 h-20 bg-gray-30 rounded-full" />
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-100 font-mono">
          <span className="w-20 text-center">rounded</span>
          <span className="w-20 text-center">rounded-lg</span>
          <span className="w-20 text-center">rounded-xl</span>
          <span className="w-20 text-center">rounded-2xl</span>
          <span className="w-20 text-center">rounded-[2rem]</span>
          <span className="w-20 text-center">rounded-full</span>
        </div>
      </div>
    </ContentSection>
  ),

  // Icons
  "icons-all": (
    <ContentSection
      title="Icon Library"
      description="Centralized icon components used throughout the site."
      componentPath="components/ui/icons/"
    >
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-20 flex items-center justify-center">
            <ArrowIcon className="w-6 h-6 text-gray-120" />
          </div>
          <span className="text-xs text-gray-100">ArrowIcon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-20 flex items-center justify-center">
            <ExternalLinkIcon className="w-6 h-6 text-gray-120" />
          </div>
          <span className="text-xs text-gray-100">ExternalLinkIcon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-20 flex items-center justify-center">
            <PlusIcon className="w-6 h-6 text-gray-120" />
          </div>
          <span className="text-xs text-gray-100">PlusIcon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-20 flex items-center justify-center">
            <MinusIcon className="w-6 h-6 text-gray-120" />
          </div>
          <span className="text-xs text-gray-100">MinusIcon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-20 flex items-center justify-center">
            <ChevronDownIcon className="w-6 h-6 text-gray-120" />
          </div>
          <span className="text-xs text-gray-100">ChevronDownIcon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-20 flex items-center justify-center">
            <SendIcon className="w-6 h-6 text-gray-120" />
          </div>
          <span className="text-xs text-gray-100">SendIcon</span>
        </div>
      </div>
    </ContentSection>
  ),
};

// Mobile navigation dropdown component
function MobileNav({
  activeItem,
  onItemSelect
}: {
  activeItem: string;
  onItemSelect: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Find current item label
  const currentLabel = navigationItems
    .flatMap(section => section.items)
    .find(item => item.id === activeItem)?.label || "Select section";

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-30 rounded-xl text-left"
      >
        <span className="font-medium text-gray-140">{currentLabel}</span>
        <ChevronDownIcon className={`w-5 h-5 text-gray-100 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mx-6 mt-2 bg-white border border-gray-30 rounded-xl shadow-lg z-50 max-h-[60vh] overflow-y-auto"
          >
            {navigationItems.map((section) => (
              <div key={section.category} className="py-2">
                <p className="px-4 py-1 text-xs font-semibold text-gray-100 uppercase tracking-wide">
                  {section.category}
                </p>
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onItemSelect(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      activeItem === item.id
                        ? "text-teal-100 bg-teal-10 font-medium"
                        : "text-gray-120 hover:bg-gray-10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sidebar navigation component
function Sidebar({
  activeItem,
  onItemSelect
}: {
  activeItem: string;
  onItemSelect: (id: string) => void;
}) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    navigationItems.map(item => item.category)
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <nav className="hidden lg:block w-64 flex-shrink-0 overflow-y-auto pr-4 pb-8">
      <div className="space-y-1">
        {navigationItems.map((section) => (
          <div key={section.category}>
            <button
              onClick={() => toggleCategory(section.category)}
              className="w-full flex items-center justify-between py-2 px-3 text-sm font-semibold text-gray-140 hover:bg-gray-10 rounded-lg transition-colors"
            >
              {section.category}
              <ChevronDownIcon
                className={`w-4 h-4 text-gray-80 transition-transform duration-200 ${
                  expandedCategories.includes(section.category) ? '' : '-rotate-90'
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {expandedCategories.includes(section.category) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-3 border-l border-gray-30 pl-3 py-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onItemSelect(item.id)}
                        className={`w-full text-left py-1.5 px-2 text-sm rounded-md transition-colors ${
                          activeItem === item.id
                            ? "text-teal-100 bg-teal-10 font-medium"
                            : "text-gray-110 hover:text-gray-140 hover:bg-gray-10"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default function DesignSystemPage() {
  const [activeItem, setActiveItem] = useState("typography-fonts");

  return (
    <main className="pt-24 bg-white h-screen flex flex-col overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 w-full flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="py-6 border-b border-gray-30 flex-shrink-0">
          <h1 className="font-display text-3xl md:text-4xl text-purple-140 mb-2">
            UXHI Design System
          </h1>
          <p className="text-lg text-gray-110 max-w-2xl">
            A living documentation of the design tokens, components, and patterns used across the UXHI website.
          </p>
        </div>

        {/* Main layout with sidebar - both independently scrollable */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 flex-1 overflow-hidden py-8 relative">
          {/* Mobile navigation dropdown */}
          <MobileNav activeItem={activeItem} onItemSelect={setActiveItem} />

          {/* Left sidebar (desktop only) */}
          <Sidebar activeItem={activeItem} onItemSelect={setActiveItem} />

          {/* Right content area */}
          <div className="flex-1 min-w-0 overflow-y-auto lg:pr-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {contentComponents[activeItem]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
