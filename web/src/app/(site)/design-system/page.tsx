"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { ArrowIcon, ExternalLinkIcon, PlusIcon, MinusIcon, ChevronDownIcon } from "@/components/ui/icons";
import { InfoBox } from "@/components/ui/InfoBox";
import { LinkCard } from "@/components/ui/LinkCard";
import { ArrowLinkButton } from "@/components/ui/ArrowLinkButton";
import { QuickLinkPill } from "@/components/ui/QuickLinkPill";
import { InlineLink } from "@/components/ui/InlineLink";
import { FeatureCard, SpotIllustrationCard, SpeechBubbleCard } from "@/components/ui/cards";

// Navigation structure
const navigationItems = [
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
    ],
  },
  {
    category: "Interactive",
    items: [
      { id: "interactive-accordion", label: "FAQ Accordion" },
      { id: "interactive-dropdown", label: "Dropdown Menu" },
      { id: "interactive-navpill", label: "Navigation Pill" },
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
    { id: "1", question: "What is UXHI?", answer: "UXHI is Hawaii's premier UX community, connecting designers, researchers, and product professionals across the islands." },
    { id: "2", question: "How can I get involved?", answer: "You can join our events, volunteer, speak at meetups, or become a sponsor. Visit our Get Involved page for more details." },
    { id: "3", question: "Are events free?", answer: "Most of our community events are free to attend. Some workshops and the annual conference may have a fee." },
  ];

  return (
    <div className="space-y-3 max-w-xl">
      {demoFaqs.map((faq) => (
        <div
          key={faq.id}
          className={`rounded-[2rem] overflow-hidden transition-colors duration-300 ${
            openId === faq.id ? "bg-teal-500" : "bg-white shadow-sm"
          }`}
        >
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
              openId === faq.id ? "text-white" : "text-gray-800"
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
                <div className="px-6 pb-4 text-white/90 text-base">{faq.answer}</div>
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

// All content components mapped by ID
const contentComponents: Record<string, React.ReactNode> = {
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
          <p className="text-xl text-gray-600">UXHI is Hawaii&apos;s premier UX community, connecting designers and researchers.</p>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">Large — text-lg (18px)</span>
          <p className="text-lg text-gray-600">UXHI is Hawaii&apos;s premier UX community, connecting designers and researchers.</p>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">Medium — text-md (16px, same as base)</span>
          <p className="text-base text-gray-600">UXHI is Hawaii&apos;s premier UX community, connecting designers and researchers across the islands.</p>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">Base — text-base (16px)</span>
          <p className="text-base text-gray-600">UXHI is Hawaii&apos;s premier UX community, connecting designers and researchers across the islands.</p>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono">Small — text-sm (14px)</span>
          <p className="text-sm text-gray-600">UXHI is Hawaii&apos;s premier UX community, connecting designers and researchers across the islands.</p>
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
      description="Pill button with arrow circle. Variants: default (yellow circle), dark (for dark backgrounds). Internal links use right arrow, external links use up-right arrow."
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
  "interactive-navpill": (
    <ContentSection
      title="Navigation Pill"
      description="Header navigation container with pill-shaped border."
      componentPath="components/layout/Header.tsx (inline)"
    >
      <div className="inline-flex items-center gap-1 border border-gray-200 rounded-full px-2 py-2 bg-white/80">
        <span className="px-5 py-2.5 text-nav text-gray-700 font-medium">Link One</span>
        <span className="px-5 py-2.5 text-nav text-gray-700 font-medium">Link Two</span>
        <span className="px-5 py-2.5 text-nav text-gray-700 font-medium">Link Three</span>
        <span className="flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-5 pr-1.5 py-1.5 ml-2">
          <span className="text-nav font-medium text-gray-900">CTA</span>
          <span className="w-9 h-9 rounded-full bg-yellow flex items-center justify-center">
            <ArrowIcon className="w-4 h-4 text-gray-900" />
          </span>
        </span>
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
      </div>
    </ContentSection>
  ),
};

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
    <nav className="w-64 flex-shrink-0 overflow-y-auto pr-4 pb-8">
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
        <div className="flex gap-12 flex-1 overflow-hidden py-8">
          {/* Left sidebar */}
          <Sidebar activeItem={activeItem} onItemSelect={setActiveItem} />

          {/* Right content area */}
          <div className="flex-1 min-w-0 overflow-y-auto pr-4">
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
