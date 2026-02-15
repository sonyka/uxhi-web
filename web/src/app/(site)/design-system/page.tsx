"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { ArrowIcon, ExternalLinkIcon, PlusIcon, MinusIcon, ChevronDownIcon, SendIcon } from "@/components/ui/icons";
import { InfoBox } from "@/components/ui/InfoBox";
import { LinkCard } from "@/components/ui/LinkCard";
import { ArrowLinkButton } from "@/components/ui/ArrowLinkButton";
import { QuickLinkPill } from "@/components/ui/QuickLinkPill";
import { InlineLink } from "@/components/ui/InlineLink";
import { FeatureCard, SpotIllustrationCard, SpeechBubbleCard } from "@/components/ui/cards";
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
    ],
  },
  {
    category: "Colors",
    items: [
      { id: "colors-teal", label: "Primary — Teal" },
      { id: "colors-purple", label: "Secondary — Purple" },
      { id: "colors-gray", label: "Gray Scale" },
      { id: "colors-neutral", label: "Neutral / Brand" },
      { id: "colors-yellow", label: "Accent — Yellow" },
    ],
  },
  {
    category: "Buttons",
    items: [
      { id: "button-base", label: "Button Component" },
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
      { id: "card-feature", label: "Feature Card" },
      { id: "card-spotillustration", label: "Spot Illustration Card" },
      { id: "card-speechbubble", label: "Speech Bubble Card" },
      { id: "card-carousel", label: "Carousel Testimonial" },
      { id: "card-link", label: "Link Card" },
      { id: "card-infobox", label: "Info Box" },
      { id: "card-pressmention", label: "Press Mention" },
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
      { id: "interactive-filter-dropdown", label: "Filter Dropdown" },
      { id: "interactive-toggle", label: "Toggle Button" },
    ],
  },
  {
    category: "Layout",
    items: [
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
  textColor = "text-gray-900",
  compact = false
}: {
  name: string;
  value: string;
  textColor?: string;
  compact?: boolean;
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
        className={`w-full ${compact ? "aspect-[3/1]" : "aspect-[4/3]"} rounded-xl mb-2 transition-transform group-hover:scale-105 ${textColor}`}
        style={{ backgroundColor: value }}
      />
      <p className="font-medium text-sm text-gray-900">{name}</p>
      <p className="text-xs text-gray-500 font-mono">
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
            openId === faq.id ? "rounded-2xl bg-teal-300" : "rounded-[2rem] bg-white shadow-sm"
          }`}
        >
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
              openId === faq.id ? "text-gray-700" : "text-gray-800"
            }`}
          >
            <h4 className="font-medium pr-4">{faq.question}</h4>
            <span className="flex-shrink-0">
              {openId === faq.id ? (
                <MinusIcon className="w-5 h-5" />
              ) : (
                <PlusIcon className="w-5 h-5 text-teal-500" />
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
                <div className="px-6 pb-4 text-gray-700 text-base">{faq.answer}</div>
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
        className="flex items-center gap-2 px-5 py-2.5 text-nav text-gray-700 hover:text-gray-900 transition-colors font-medium border border-gray-200 rounded-full bg-white"
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-2">
              {["Option One", "Option Two", "Option Three"].map((item, i) => (
                <button
                  key={i}
                  className="block w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="block text-nav font-medium text-gray-900">{item}</span>
                  <span className="block text-sm text-gray-500 mt-0.5">Description text</span>
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
        <h2 className="font-display text-2xl md:text-3xl text-purple-700 mb-2">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
        {componentPath && (
          <div className="mt-2">
            {Array.isArray(componentPath) ? (
              componentPath.map((path) => (
                <p key={path} className="text-xs text-gray-400 font-mono">
                  {path}
                </p>
              ))
            ) : (
              <p className="text-xs text-gray-400 font-mono">{componentPath}</p>
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
        <span className="text-sm text-gray-500">Toggle to see animation:</span>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-gray-100 p-6 rounded-xl overflow-x-auto">
            <Navbar items={demoNavItems} />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Container</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-white</span> background</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">rounded-full</span> border radius</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">px-7</span> (28px) horizontal padding</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">py-5</span> (20px) vertical padding</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">gap-8</span> (32px) between items</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Typography</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">text-base</span> (16px) font size</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">font-medium</span> weight</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">text-black</span> default color</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">hover:text-gray-700</span> hover</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Icons</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">w-5 h-5</span> (20px) chevron icons</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">rotate-180</span> on dropdown open</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">opacity-60</span> external link icon</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">CTA Button</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]</span></p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">pl-5 pr-2 py-2</span> padding</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">w-[30px] h-[30px]</span> yellow circle</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-yellow</span> → <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-yellow-hover</span></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Link Types</h4>
          <div className="flex flex-wrap gap-6 items-center p-4 bg-cream rounded-xl">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">Standard Link</span>
              <span className="text-base font-medium text-black">Events</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">With Dropdown</span>
              <span className="flex items-center gap-0.5 text-base font-medium text-black">
                Get Involved
                <ChevronDownIcon className="w-5 h-5" />
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">External Link</span>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <MobileNavbarDemo />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Hamburger Button</h4>
          <div className="flex gap-8 items-center p-4 bg-cream rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500">Closed</span>
              <div className="p-2 bg-white rounded-lg">
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className="h-0.5 w-full bg-gray-900 rounded" />
                  <span className="h-0.5 w-full bg-gray-900 rounded" />
                  <span className="h-0.5 w-full bg-gray-900 rounded" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500">Open (X)</span>
              <div className="p-2 bg-white rounded-lg">
                <div className="w-6 h-5 flex flex-col justify-center relative">
                  <span className="h-0.5 w-full bg-gray-900 rounded rotate-45 absolute" />
                  <span className="h-0.5 w-full bg-gray-900 rounded -rotate-45 absolute" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Container</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-white</span> background</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">rounded-2xl</span> border radius</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">border border-gray-200</span></p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">py-4 px-6</span> padding</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Links</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">text-base</span> (16px)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">font-medium</span></p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">text-gray-700</span> default</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">hover:text-teal-500</span></p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Dropdown Items</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">pl-4 ml-2</span> indent</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">border-l-2 border-gray-100</span></p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">text-gray-600</span></p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Animation</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">framer-motion</span></p>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="rounded-xl overflow-hidden">
            <Footer />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Container</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-teal-300</span> (#4ddce9)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">px-6 py-12</span> (48px vertical) padding</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">max-w-[1300px]</span> content width</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">items-start justify-between</span></p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Headline</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">font-semibold</span> Nunito</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">text-xl</span> (20px)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">leading-[45px]</span> line height</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">text-gray-700</span></p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">gap-14</span> (56px) to logo row</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Logo + Copyright</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>UXHI logo: <span className="font-mono text-xs bg-gray-100 px-1 rounded">76px × 24px</span></p>
                <p>Copyright: <span className="font-mono text-xs bg-gray-100 px-1 rounded">text-sm</span> (14px)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">gap-2</span> between logo and text</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">items-end</span> alignment</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Nav Grid</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>4 columns, <span className="font-mono text-xs bg-gray-100 px-1 rounded">gap-12</span> (48px), <span className="font-mono text-xs bg-gray-100 px-1 rounded">flex-nowrap</span></p>
                <p>Items: <span className="font-mono text-xs bg-gray-100 px-1 rounded">gap-3</span> (12px) vertical</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">text-base</span> (16px), font-normal</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">text-gray-700</span></p>
                <p>Social icons: <span className="font-mono text-xs bg-gray-100 px-1 rounded">w-4 h-4</span>, <span className="font-mono text-xs bg-gray-100 px-1 rounded">gap-1.5</span></p>
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
        <div className="p-6 bg-cream rounded-xl">
          <p className="text-sm text-gray-500 mb-2">Display — Dela Gothic One</p>
          <p className="font-display text-3xl text-purple-700">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="p-6 bg-cream rounded-xl">
          <p className="text-sm text-gray-500 mb-2">Body — Nunito</p>
          <p className="font-body text-xl text-gray-700">The quick brown fox jumps over the lazy dog</p>
        </div>
      </div>
    </ContentSection>
  ),
  "typography-headings": (
    <ContentSection title="Heading Hierarchy" description="Responsive heading sizes. h1-h3 use display font, h4-h5 use body font.">
      <div className="space-y-6 p-6 bg-cream rounded-xl">
        <div>
          <span className="text-xs text-gray-500 font-mono">h1 — font-display text-4xl/5xl/6xl (responsive)</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-purple-700">Heading One</h1>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">h2 — font-display text-3xl/4xl/5xl (responsive)</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-purple-700">Heading Two</h2>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">h3 — font-display text-2xl/3xl/4xl (responsive) — for callouts, mission statements</span>
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-purple-700">Heading Three</h3>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">h4 — text-xl font-semibold</span>
          <h4 className="font-semibold text-xl text-purple-700">Heading Four</h4>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">h5 — text-lg font-semibold</span>
          <h5 className="font-semibold text-lg text-purple-700">Heading Five</h5>
        </div>
      </div>
    </ContentSection>
  ),
  "typography-body": (
    <ContentSection title="Body Text" description="Body text sizes using the Nunito font.">
      <div className="space-y-4 p-6 bg-cream rounded-xl">
        <div>
          <span className="text-xs text-gray-500 font-mono">Extra Large — text-xl (20px)</span>
          <p className="text-xl text-gray-600">UXHI is Hawaiʻi&apos;s premier UX community, connecting designers and researchers.</p>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">Large — text-lg (18px)</span>
          <p className="text-lg text-gray-600">UXHI is Hawaiʻi&apos;s premier UX community, connecting designers and researchers.</p>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">Medium — text-md (16px, same as base)</span>
          <p className="text-base text-gray-600">UXHI is Hawaiʻi&apos;s premier UX community, connecting designers and researchers across the islands.</p>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">Base — text-base (16px)</span>
          <p className="text-base text-gray-600">UXHI is Hawaiʻi&apos;s premier UX community, connecting designers and researchers across the islands.</p>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">Small — text-sm (14px)</span>
          <p className="text-sm text-gray-600">UXHI is Hawaiʻi&apos;s premier UX community, connecting designers and researchers across the islands.</p>
        </div>
      </div>
    </ContentSection>
  ),
  "typography-special": (
    <ContentSection title="Special Styles" description="Badges, eyebrows, and link styles.">
      <div className="flex flex-wrap gap-4 items-center p-6 bg-cream rounded-xl">
        <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold">
          <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          Badge / Eyebrow
        </span>
        <span className="text-teal-500 font-bold uppercase tracking-wider text-sm">
          EYEBROW TEXT
        </span>
        <InlineLink href="#" variant="teal">Link Style (Teal)</InlineLink>
        <InlineLink href="#" variant="purple">Link Style (Purple)</InlineLink>
      </div>
    </ContentSection>
  ),

  // Colors
  "colors-teal": (
    <ContentSection title="Primary — Teal" description="Primary brand color palette. Click any swatch to copy its hex value.">
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        <ColorSwatch name="50" value="#e6fafb" />
        <ColorSwatch name="100" value="#b3f0f5" />
        <ColorSwatch name="200" value="#80e6ef" />
        <ColorSwatch name="300" value="#4ddce9" />
        <ColorSwatch name="400" value="#1ad2e3" />
        <ColorSwatch name="500" value="#09c0d7" textColor="text-white" />
        <ColorSwatch name="600" value="#079aac" textColor="text-white" />
        <ColorSwatch name="700" value="#057381" textColor="text-white" />
        <ColorSwatch name="800" value="#034d56" textColor="text-white" />
        <ColorSwatch name="900" value="#01262b" textColor="text-white" />
      </div>
    </ContentSection>
  ),
  "colors-purple": (
    <ContentSection title="Secondary — Purple" description="Secondary brand color palette. Click any swatch to copy its hex value.">
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        <ColorSwatch name="50" value="#edeafc" />
        <ColorSwatch name="100" value="#c9c0f5" />
        <ColorSwatch name="200" value="#a596ee" />
        <ColorSwatch name="300" value="#816ce7" />
        <ColorSwatch name="400" value="#5d42e0" />
        <ColorSwatch name="500" value="#4329c7" textColor="text-white" />
        <ColorSwatch name="600" value="#34209b" textColor="text-white" />
        <ColorSwatch name="700" value="#231769" textColor="text-white" />
        <ColorSwatch name="800" value="#1a1150" textColor="text-white" />
        <ColorSwatch name="900" value="#110b34" textColor="text-white" />
      </div>
    </ContentSection>
  ),
  "colors-gray": (
    <ContentSection title="Gray Scale" description="Neutral gray palette for text and backgrounds. Click any swatch to copy its hex value.">
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        <ColorSwatch name="50" value="#f9fafb" />
        <ColorSwatch name="100" value="#f3f4f6" />
        <ColorSwatch name="200" value="#e5e7eb" />
        <ColorSwatch name="300" value="#d1d5db" />
        <ColorSwatch name="400" value="#9ca3af" />
        <ColorSwatch name="500" value="#6b7280" textColor="text-white" />
        <ColorSwatch name="600" value="#4b5563" textColor="text-white" />
        <ColorSwatch name="700" value="#374151" textColor="text-white" />
        <ColorSwatch name="800" value="#1f2937" textColor="text-white" />
        <ColorSwatch name="900" value="#111827" textColor="text-white" />
      </div>
    </ContentSection>
  ),
  "colors-neutral": (
    <ContentSection title="Neutral / Brand" description="Background and accent colors. Click any swatch to copy its hex value.">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <ColorSwatch name="White" value="#ffffff" compact />
        <ColorSwatch name="Section Gray" value="#f5f5f5" compact />
        <ColorSwatch name="Cream" value="#f4f1ea" compact />
        <ColorSwatch name="Cream Dark" value="#e8e4db" compact />
        <ColorSwatch name="Black" value="#000000" textColor="text-white" compact />
      </div>
    </ContentSection>
  ),
  "colors-yellow": (
    <ContentSection title="Accent — Yellow" description="Accent color for CTAs and highlights. Click any swatch to copy its hex value.">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 max-w-xs">
        <ColorSwatch name="Yellow" value="#ffcc40" compact />
        <ColorSwatch name="Yellow Hover" value="#e5b532" compact />
      </div>
    </ContentSection>
  ),

  // Buttons
  "button-base": (
    <ContentSection
      title="Button Component"
      description="Base button with variants (primary, secondary, outline, ghost) and sizes (sm, md, lg)."
      componentPath="components/ui/Button.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Variants</h4>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Sizes</h4>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "button-primarycta": (
    <ContentSection
      title="Primary CTA"
      description="Pill button with arrow circle. Variants: default (yellow circle), subdued (gray circle, for secondary CTAs), dark (for dark backgrounds). Internal links use right arrow, external links use up-right arrow."
      componentPath="components/ui/PrimaryCTA.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Default Variant</h4>
          <div className="flex flex-wrap gap-4 items-center">
            <PrimaryCTA href="#">Join us</PrimaryCTA>
            <PrimaryCTA href="#" external>External Link</PrimaryCTA>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Subdued Variant</h4>
          <div className="flex flex-wrap gap-4 items-center">
            <PrimaryCTA href="#" variant="subdued">Secondary action</PrimaryCTA>
            <PrimaryCTA href="#" external variant="subdued">External Subdued</PrimaryCTA>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Dark Variant</h4>
          <div className="flex flex-wrap gap-4 items-center p-6 bg-purple-700 rounded-xl">
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
      description="Text with arrow, pill-shaped hover state. Used under feature cards on dark backgrounds."
      componentPath="components/ui/ArrowLinkButton.tsx"
    >
      <div className="flex flex-wrap gap-6 items-center p-6 bg-purple-700 rounded-xl">
        <ArrowLinkButton href="#">Learn more</ArrowLinkButton>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Teal Variant (Rich Text / Content)</h4>
          <p className="text-base text-gray-600 mb-4">Used for links within rich text content. Font-semibold with teal colors.</p>
          <div className="p-6 bg-cream rounded-xl">
            <p className="text-base text-gray-700 leading-relaxed">
              Learn more about our community on the{" "}
              <InlineLink href="/about" variant="teal">About page</InlineLink>{" "}
              or visit the{" "}
              <InlineLink href="https://uxhicon.com" variant="teal">UXHI Conference website</InlineLink>.
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Purple Variant (Paragraph Links)</h4>
          <p className="text-base text-gray-600 mb-4">Used for inline paragraph links. Purple colors with underline-offset. External links show icon by default.</p>
          <div className="p-6 bg-cream rounded-xl">
            <p className="text-base text-gray-700 leading-relaxed">
              Propose a topic as a presenter at our{" "}
              <InlineLink href="https://uxhicon.com" variant="purple">UXHI Conference</InlineLink>{" "}
              or{" "}
              <InlineLink href="/events" variant="purple">local events</InlineLink>.
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Icon Control</h4>
          <p className="text-base text-gray-600 mb-4">You can override the default icon behavior with showIcon prop.</p>
          <div className="p-6 bg-cream rounded-xl space-y-3">
            <p className="text-base text-gray-700">
              External with icon (default):{" "}
              <InlineLink href="https://example.com" variant="purple">Example Link</InlineLink>
            </p>
            <p className="text-base text-gray-700">
              External without icon:{" "}
              <InlineLink href="https://example.com" variant="purple" showIcon={false}>Example Link</InlineLink>
            </p>
            <p className="text-base text-gray-700">
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
          <span className="w-8 h-8 rounded-full bg-yellow flex items-center justify-center">
            <ArrowIcon className="w-4 h-4 text-gray-900" />
          </span>
        </button>
      </div>
    </ContentSection>
  ),

  // Cards
  "card-feature": (
    <ContentSection
      title="Feature Card"
      description="Card with optional icon, title, and description. Variants: cream (default), white, teal, purple."
      componentPath="components/ui/cards/FeatureCard.tsx"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          variant="cream"
          icon={
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          title="Cream Card"
          description="Default variant with icon, title, and description."
        />
        <FeatureCard
          variant="white"
          title="White Card"
          description="Clean card with subtle shadow for content sections."
        />
        <FeatureCard
          variant="teal"
          title="Teal Card"
          description="Accent card for highlighting important information."
        />
        <FeatureCard
          variant="purple"
          title="Purple Card"
          description="Secondary accent card for variety."
        />
      </div>
    </ContentSection>
  ),
  "card-spotillustration": (
    <ContentSection
      title="Spot Illustration Card"
      description="Card with large illustrated icon (96px desktop, 80px mobile). Supports description text or custom children for complex content. Also supports Sanity CMS images."
      componentPath="components/ui/cards/SpotIllustrationCard.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">All Variants</h4>
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
              variant="cream"
              imageSrc="/images/icons/icon-community-engagement.png"
              imageAlt="Community engagement illustration"
              title="Cream"
              description="For light backgrounds with hover shadow. Used for committee cards."
            />
            <SpotIllustrationCard
              variant="white"
              imageSrc="/images/icons/icon-resources.png"
              imageAlt="Resources illustration"
              title="White"
              description="For cream backgrounds. Used for values cards."
            />
            <div className="bg-purple-700 rounded-xl p-4">
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">With Custom Children (Bullet List)</h4>
          <div className="bg-purple-700 rounded-xl p-6">
            <div className="max-w-sm">
              <SpotIllustrationCard
                variant="translucent"
                imageSrc="/images/icons/icon-challenges.png"
                imageAlt="Challenges"
                title="Custom Content"
              >
                <ul className="space-y-2 text-left text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow rounded-full mt-1.5 flex-shrink-0" />
                    <span>First bullet point item</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow rounded-full mt-1.5 flex-shrink-0" />
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
  "card-speechbubble": (
    <ContentSection
      title="Speech Bubble Card"
      description="Testimonial card with notch, quote, avatar placeholder, and author info."
      componentPath="components/ui/cards/SpeechBubbleCard.tsx"
    >
      <div className="grid md:grid-cols-3 gap-6">
        <SpeechBubbleCard
          quote="Receiving education support has been a life-changing experience for me. It gave me the financial freedom and confidence to focus fully on my studies."
          authorName="Emma Helson"
          timestamp="1 week ago"
        />
        <SpeechBubbleCard
          quote="Getting education support has been truly life-changing. It gave me the stability and assurance to concentrate fully on my learning without distractions."
          authorName="Sophia Marie"
          timestamp="2 weeks ago"
        />
        <SpeechBubbleCard
          quote="Education support has made a world of difference in my life. It offered me the security and confidence to focus completely on my academic goals."
          authorName="Jackson Lee"
          timestamp="3 weeks ago"
        />
      </div>
    </ContentSection>
  ),
  "card-carousel": (
    <ContentSection
      title="Carousel Testimonial Card"
      description="Centered large quote with photo and author. Used in testimonial carousels."
      componentPath="Inline pattern (not a separate component)"
    >
      <div className="bg-cream p-8 rounded-2xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-2xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl text-gray-700 mb-6">
            &ldquo;This is a testimonial carousel card style with larger centered quote text and author attribution below.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200" />
            <div className="text-center">
              <p className="font-semibold text-purple-700">Author Name</p>
              <p className="text-gray-500 text-sm">Role at Company</p>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "card-link": (
    <ContentSection
      title="Link Card"
      description="Cream card with title, teal description, and external link icon. Title turns teal on hover. Used on /resources."
      componentPath="components/ui/LinkCard.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">With Description</h4>
          <div className="max-w-sm">
            <LinkCard
              href="#"
              title="Resource Title"
              description="Description or label"
            />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Title Only</h4>
          <div className="max-w-sm">
            <LinkCard
              href="#"
              title="External Resource Link"
            />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Grid Layout (2 columns)</h4>
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
      description="Teal-50 background with teal-100 border. Used for notes, callouts, and featured content."
      componentPath="components/ui/InfoBox.tsx"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Simple Note</h4>
          <InfoBox>
            <p className="text-base text-gray-700 font-medium">Note: This is an informational callout for important notes or disclaimers.</p>
          </InfoBox>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">With Eyebrow Label</h4>
          <InfoBox eyebrow="Featured in Hawai'i Bulletin">
            <p className="text-base text-gray-700 font-medium">Local group explores user experience and interface design</p>
          </InfoBox>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Note with CTA</h4>
          <InfoBox className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-base text-gray-700 font-medium">Do you have more resources to suggest?</p>
            <PrimaryCTA href="#">Email Us</PrimaryCTA>
          </InfoBox>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Featured with Eyebrow + CTA</h4>
          <InfoBox eyebrow="New Feature" className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-base text-gray-700 font-medium">Check out our latest community resources</p>
            <PrimaryCTA href="#">Learn More</PrimaryCTA>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Props</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">source</span> — publication name (used in eyebrow)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">title</span> — article headline or description</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">href</span> — link to the article</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">ctaLabel</span> — button text (default: &quot;Read Article&quot;)</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Built on <span className="font-mono text-xs bg-gray-100 px-1 rounded">InfoBox</span></p>
                <p>Eyebrow: <span className="font-mono text-xs bg-gray-100 px-1 rounded">Featured in {"{source}"}</span></p>
                <p>Responsive: stacks on mobile, row on sm+</p>
                <p>CTA: <span className="font-mono text-xs bg-gray-100 px-1 rounded">PrimaryCTA</span> with external link</p>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Card States</h4>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Key Elements</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl">
              <p className="text-sm font-semibold text-gray-700 mb-2">Open to Work Badge</p>
              <div className="flex items-center gap-1.5 bg-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-medium w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Open to Work
              </div>
              <p className="text-xs text-gray-500 font-mono mt-2">bg-teal-500, rounded-full, animate-ping</p>
            </div>
            <div className="p-4 bg-cream rounded-xl">
              <p className="text-sm font-semibold text-gray-700 mb-2">Focus Tags</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-xs">Product Design</span>
                <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-xs">User Research</span>
                <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">+2</span>
              </div>
              <p className="text-xs text-gray-500 font-mono mt-2">bg-teal-50, text-teal-700, rounded-full</p>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8 space-y-4 max-w-md">
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Background: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-white/10</span></p>
                <p>Border: <span className="font-mono text-xs bg-gray-100 px-1 rounded">border-white/20</span></p>
                <p>Radius: <span className="font-mono text-xs bg-gray-100 px-1 rounded">rounded-xl</span></p>
                <p>Placeholder: <span className="font-mono text-xs bg-gray-100 px-1 rounded">text-purple-300/60</span></p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">States</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Focus: <span className="font-mono text-xs bg-gray-100 px-1 rounded">ring-2 ring-teal-500</span></p>
                <p>Text color: <span className="font-mono text-xs bg-gray-100 px-1 rounded">text-white</span></p>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8 space-y-4 max-w-md">
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="p-4 bg-cream rounded-xl space-y-3 max-w-md">
            <p className="text-sm font-semibold text-gray-700">Behavior</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Inherits all FormInput styles</p>
              <p>Resize: <span className="font-mono text-xs bg-gray-100 px-1 rounded">resize-y</span></p>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8 space-y-4 max-w-md">
            <FormLabel as="legend">Select an option</FormLabel>
            <div className="space-y-2">
              <FormRadio name="demo-radio" value="option1" label="Option one" defaultChecked />
              <FormRadio name="demo-radio" value="option2" label="Option two" />
              <FormRadio name="demo-radio" value="option3" label="Option three" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Unchecked: <span className="font-mono text-xs bg-gray-100 px-1 rounded">border-white/30 bg-white/5</span></p>
                <p>Checked: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-teal-500 border-teal-500</span></p>
                <p>Inner dot: white, scales in on check</p>
                <p>Label: <span className="font-mono text-xs bg-gray-100 px-1 rounded">text-purple-200</span>, white on hover</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Behavior</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Native radio mutual exclusion</p>
                <p>Keyboard navigable (arrow keys)</p>
                <p>Focus ring via <span className="font-mono text-xs bg-gray-100 px-1 rounded">:focus-visible</span></p>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8 space-y-4 max-w-md">
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Unchecked: <span className="font-mono text-xs bg-gray-100 px-1 rounded">border-white/30 bg-white/5</span></p>
                <p>Checked: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-teal-500 border-teal-500</span></p>
                <p>Checkmark: white SVG stroke</p>
                <p>4px rounded corners</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Behavior</p>
              <div className="text-sm text-gray-600 space-y-1">
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8 space-y-4 max-w-md">
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Trigger: matches FormInput style</p>
                <p>Panel: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-purple-600 border-white/20</span></p>
                <p>Selected: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-teal-500/20 text-teal-300</span></p>
                <p>Chevron rotates on open</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Behavior</p>
              <div className="text-sm text-gray-600 space-y-1">
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8 space-y-6 max-w-md">
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Button: pill shape, <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-white/10 border-white/20</span></p>
                <p>Preview: 80px circle with border</p>
                <p>Help text: <span className="font-mono text-xs bg-gray-100 px-1 rounded">text-purple-300/60</span></p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Behavior</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Native file input hidden, triggered via ref</p>
                <p>Preview via <span className="font-mono text-xs bg-gray-100 px-1 rounded">URL.createObjectURL</span></p>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-purple-300 uppercase tracking-wide">Send Icon (InquiryForm)</p>
              <FormSubmitButton label="Send message" pendingLabel="Sending..." isPending={false} icon="send" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-purple-300 uppercase tracking-wide">Arrow Icon (Membership / Directory)</p>
              <FormSubmitButton label="Submit application" pendingLabel="Submitting..." isPending={false} icon="arrow" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-purple-300 uppercase tracking-wide">Pending State</p>
              <FormSubmitButton label="Send message" pendingLabel="Sending..." isPending={true} icon="send" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Shape: <span className="font-mono text-xs bg-gray-100 px-1 rounded">rounded-full</span></p>
                <p>Background: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-white/10 border-white/30</span></p>
                <p>Icon circle: <span className="font-mono text-xs bg-gray-100 px-1 rounded">w-9 h-9 bg-white/20</span></p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Variants</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">icon=&quot;send&quot;</span> — paper plane (InquiryForm)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">icon=&quot;arrow&quot;</span> — right arrow (default)</p>
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
      description="Contact form on /about#contact. Saves to Sanity submission + Slack notification. Designed for purple (bg-purple-700) backgrounds."
      componentPath={["components/forms/InquiryForm.tsx", "lib/actions/inquiry.ts"]}
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8">
            <InquiryForm />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Fields</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>First Name, Last Name (required)</p>
                <p>Email (required)</p>
                <p>Role, Company Name (optional)</p>
                <p>Interest type — radio (required)</p>
                <p>Message — textarea (required)</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Labels: <span className="font-mono text-xs bg-gray-100 px-1 rounded">text-purple-200</span></p>
                <p>Inputs: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-white/10 border-white/20</span></p>
                <p>Errors: <span className="font-mono text-xs bg-gray-100 px-1 rounded">text-yellow</span></p>
                <p>Button: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-white/10 border-white/30</span></p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Integrations</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Saves to Sanity <span className="font-mono text-xs bg-gray-100 px-1 rounded">submission</span> schema</p>
                <p>Slack notification via webhook</p>
                <p>Honeypot spam protection</p>
                <p>Rate limiting (1/hr per email)</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Pattern</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>React 19 <span className="font-mono text-xs bg-gray-100 px-1 rounded">useActionState</span></p>
                <p>Zod validation (client + server)</p>
                <p>Server Action in <span className="font-mono text-xs bg-gray-100 px-1 rounded">lib/actions/inquiry.ts</span></p>
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
      description="Join form on /join. Appends to Google Sheet + Slack notification. Designed for purple (bg-purple-700) backgrounds."
      componentPath={["components/forms/MembershipForm.tsx", "lib/actions/membership.ts"]}
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8">
            <MembershipForm />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Fields</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>First Name, Last Name (required)</p>
                <p>Email (required)</p>
                <p>LinkedIn or Website — url (required)</p>
                <p>Experience Level — radio, 6 options (required)</p>
                <p>Hopes — textarea (optional)</p>
                <p>Contributions — checkboxes, 5 options (optional)</p>
                <p>How did you hear about us — radio (optional)</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Integrations</p>
              <div className="text-sm text-gray-600 space-y-1">
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
      description="Directory submission form on /find-ux-pro. Creates draft directoryMember in Sanity + Slack notification. Designed for purple (bg-purple-700) backgrounds."
      componentPath={["components/forms/DirectorySubmitForm.tsx", "lib/actions/directory-submit.ts"]}
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8">
            <DirectorySubmitForm />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Fields</p>
              <div className="text-sm text-gray-600 space-y-1">
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
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Integrations</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Uploads photo to Sanity assets</p>
                <p>Creates draft <span className="font-mono text-xs bg-gray-100 px-1 rounded">directoryMember</span> doc</p>
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
      description="Banner for form-level error or info messages. Used on purple (bg-purple-700) backgrounds."
      componentPath="components/ui/FormFeedback.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Variants</h4>
          <div className="bg-purple-700 rounded-2xl p-8 space-y-4">
            <div>
              <span className="text-xs text-purple-300 mb-2 block">error (default)</span>
              <FormAlert message="Something went wrong. Please try again." />
            </div>
            <div>
              <span className="text-xs text-purple-300 mb-2 block">info</span>
              <FormAlert message="Your session has been restored." variant="info" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Props</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">message</span> — string (required)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">variant</span> — &quot;error&quot; | &quot;info&quot; (default: &quot;error&quot;)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">className</span> — optional overrides</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Error: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-red-500/20 border-red-400/30 text-red-200</span></p>
                <p>Info: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-white/10 border-white/20 text-purple-200</span></p>
                <p>Adds <span className="font-mono text-xs bg-gray-100 px-1 rounded">role=&quot;alert&quot;</span> for accessibility</p>
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
      description="Inline field-level validation message. Renders below form inputs on purple (bg-purple-700) backgrounds."
      componentPath="components/ui/FormFeedback.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Component</h4>
          <div className="bg-purple-700 rounded-2xl p-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-purple-200 mb-1.5">Email *</label>
              <input
                type="email"
                disabled
                placeholder="invalid-email"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-purple-300/60"
              />
              <FieldError errors={{ email: ["Please enter a valid email address."] }} field="email" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-purple-200 mb-1.5">Name *</label>
              <input
                type="text"
                disabled
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-purple-300/60"
              />
              <FieldError errors={{ name: ["Name is required."] }} field="name" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Props</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">errors</span> — Record&lt;string, string[]&gt; (optional)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">field</span> — string (required)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">className</span> — optional overrides</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Text: <span className="font-mono text-xs bg-gray-100 px-1 rounded">text-yellow text-sm mt-1</span></p>
                <p>Adds <span className="font-mono text-xs bg-gray-100 px-1 rounded">role=&quot;alert&quot;</span> and <span className="font-mono text-xs bg-gray-100 px-1 rounded">id=&quot;&#123;field&#125;-error&quot;</span></p>
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
      description="Post-submission success card. Replaces the form after a successful submit. Used on purple (bg-purple-700) backgrounds."
      componentPath="components/ui/FormFeedback.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Examples</h4>
          <div className="bg-purple-700 rounded-2xl p-8 space-y-6">
            <div>
              <span className="text-xs text-purple-300 mb-2 block">Inquiry form</span>
              <FormSuccess icon="&#9989;" title="Message sent!" message="We'll get back to you within a few business days." />
            </div>
            <div>
              <span className="text-xs text-purple-300 mb-2 block">Membership form</span>
              <FormSuccess icon="&#127881;" title="Application received!" message="Welcome to the UXHI community!" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Props</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">icon</span> — string (required, e.g. emoji or HTML entity)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">title</span> — string (required)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">message</span> — string (required)</p>
                <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">className</span> — optional overrides</p>
              </div>
            </div>
            <div className="p-4 bg-cream rounded-xl space-y-3">
              <p className="text-sm font-semibold text-gray-700">Styling</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Container: <span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-white/10 border-white/20 rounded-2xl p-8</span></p>
                <p>Title: <span className="font-mono text-xs bg-gray-100 px-1 rounded">font-display text-2xl text-white</span></p>
                <p>Message: <span className="font-mono text-xs bg-gray-100 px-1 rounded">text-purple-200</span></p>
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
  "interactive-filter-dropdown": (
    <ContentSection
      title="Filter Dropdown"
      description="Dropdown for filtering content. Supports single-select and multi-select with checkboxes. Active state shows teal styling."
      componentPath="components/directory/MemberFilters.tsx"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">States</h4>
          <div className="flex flex-wrap gap-4">
            {/* Default State */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500">Default</span>
              <button className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg border bg-white border-gray-200 text-gray-700 text-sm font-medium min-w-[160px]">
                <span>Focus</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>
            {/* Active/Selected State */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500">Selected</span>
              <button className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg border bg-teal-50 border-teal-200 text-teal-700 text-sm font-medium min-w-[160px]">
                <span>Focus (3)</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Dropdown Panel</h4>
          <div className="w-64 bg-white rounded-xl border border-gray-200 shadow-lg p-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm bg-teal-50 text-teal-700">
              <div className="w-4 h-4 rounded border bg-teal-500 border-teal-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Product Design</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-gray-700 hover:bg-gray-50">
              <div className="w-4 h-4 rounded border border-gray-300 flex-shrink-0" />
              <span>User Research</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-gray-700 hover:bg-gray-50">
              <div className="w-4 h-4 rounded border border-gray-300 flex-shrink-0" />
              <span>UI Design</span>
            </button>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Styling</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">rounded-lg</span> for trigger button</p>
            <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">rounded-xl</span> for dropdown panel</p>
            <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-teal-50 border-teal-200 text-teal-700</span> for selected state</p>
            <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-teal-500</span> for checkbox fill</p>
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
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">States</h4>
          <div className="flex flex-wrap gap-6">
            {/* Inactive State */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500">Inactive</span>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-white border-gray-200 text-gray-700 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Open to Work
              </button>
            </div>
            {/* Active State */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500">Active</span>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-teal-500 border-teal-500 text-white text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Open to Work
              </button>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Styling</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">rounded-lg</span> border radius</p>
            <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">bg-teal-500 border-teal-500 text-white</span> for active state</p>
            <p><span className="font-mono text-xs bg-gray-100 px-1 rounded">animate-ping</span> for pulsing dot when active</p>
          </div>
        </div>
      </div>
    </ContentSection>
  ),

  // Layout
  "layout-grids": (
    <ContentSection title="Image Grid Patterns" description="Responsive image layouts and bento-style grids.">
      <div className="space-y-12">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Staggered Community Grid</h4>
          <p className="text-sm text-gray-500 mb-4">9-column desktop, 5-column tablet, 3-column mobile with offset columns</p>
          <div className="grid grid-cols-5 gap-3">
            {[0, 16, 24, 8, 16].map((offset, i) => (
              <div key={i} className="flex flex-col gap-3" style={{ paddingTop: `${offset}px` }}>
                <div className="w-full aspect-[3/4] rounded-[16px] bg-gray-200" />
                {i !== 2 && <div className="w-full aspect-[3/4] rounded-[16px] bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Standard Image Grid</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-gray-200" />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Bento Grid</h4>
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[400px]">
            <div className="col-span-2 row-span-2 rounded-xl bg-purple-700 p-6 text-white flex flex-col justify-end">
              <h4 className="font-display text-2xl">Large Feature</h4>
              <p className="text-white/80">2x2 cell</p>
            </div>
            <div className="rounded-xl bg-teal-500 p-4 text-white flex flex-col justify-end">
              <p className="font-medium">Small</p>
            </div>
            <div className="rounded-xl bg-cream p-4 flex flex-col justify-end">
              <p className="font-medium text-purple-700">Small</p>
            </div>
            <div className="col-span-2 rounded-xl bg-gray-200 p-4 flex flex-col justify-end">
              <p className="font-medium text-gray-700">Wide (2x1)</p>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  ),
  "layout-spacing": (
    <ContentSection title="Spacing & Container" description="Container widths, section padding, and spacing tokens.">
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Container</h4>
          <p className="text-sm text-gray-600 mb-4">
            Max width: <code className="bg-gray-100 px-2 py-1 rounded">1380px</code> (custom 2xl breakpoint) with <code className="bg-gray-100 px-2 py-1 rounded">px-6</code> padding
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Section Padding</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-cream rounded-lg">
              <p className="font-mono text-gray-500">py-16 md:py-24</p>
              <p className="text-gray-700">Standard section</p>
            </div>
            <div className="p-4 bg-cream rounded-lg">
              <p className="font-mono text-gray-500">py-20 md:py-28</p>
              <p className="text-gray-700">Large section</p>
            </div>
            <div className="p-4 bg-cream rounded-lg">
              <p className="font-mono text-gray-500">py-20 md:py-32</p>
              <p className="text-gray-700">Hero section</p>
            </div>
            <div className="p-4 bg-cream rounded-lg">
              <p className="font-mono text-gray-500">gap-4 / gap-8</p>
              <p className="text-gray-700">Grid gaps</p>
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
          <div className="w-20 h-20 bg-gray-200 rounded" />
          <div className="w-20 h-20 bg-gray-200 rounded-lg" />
          <div className="w-20 h-20 bg-gray-200 rounded-xl" />
          <div className="w-20 h-20 bg-gray-200 rounded-2xl" />
          <div className="w-20 h-20 bg-gray-200 rounded-[2rem]" />
          <div className="w-20 h-20 bg-gray-200 rounded-full" />
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500 font-mono">
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
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <ArrowIcon className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs text-gray-500">ArrowIcon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <ExternalLinkIcon className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs text-gray-500">ExternalLinkIcon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <PlusIcon className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs text-gray-500">PlusIcon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <MinusIcon className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs text-gray-500">MinusIcon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <ChevronDownIcon className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs text-gray-500">ChevronDownIcon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <SendIcon className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs text-gray-500">SendIcon</span>
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
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-left"
      >
        <span className="font-medium text-gray-900">{currentLabel}</span>
        <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mx-6 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[60vh] overflow-y-auto"
          >
            {navigationItems.map((section) => (
              <div key={section.category} className="py-2">
                <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                        ? "text-teal-600 bg-teal-50 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
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
              className="w-full flex items-center justify-between py-2 px-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {section.category}
              <ChevronDownIcon
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
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
                  <div className="ml-3 border-l border-gray-200 pl-3 py-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onItemSelect(item.id)}
                        className={`w-full text-left py-1.5 px-2 text-sm rounded-md transition-colors ${
                          activeItem === item.id
                            ? "text-teal-600 bg-teal-50 font-medium"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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
        <div className="py-6 border-b border-gray-200 flex-shrink-0">
          <h1 className="font-display text-3xl md:text-4xl text-purple-700 mb-2">
            UXHI Design System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
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
