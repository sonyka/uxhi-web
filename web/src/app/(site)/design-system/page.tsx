"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { ArrowIcon, ExternalLinkIcon, PlusIcon, MinusIcon, ChevronDownIcon } from "@/components/ui/icons";
import { InfoBox } from "@/components/ui/InfoBox";
import { LinkCard } from "@/components/ui/LinkCard";
import { ArrowLinkButton } from "@/components/ui/ArrowLinkButton";
import { QuickLinkPill } from "@/components/ui/QuickLinkPill";
import { FeatureCard, SpotIllustrationCard, SpeechBubbleCard } from "@/components/ui/cards";

// Section wrapper for consistent styling
function Section({
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
    <section className="py-16 border-b border-gray-200 last:border-0">
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
    </section>
  );
}

// Color swatch component
function ColorSwatch({
  name,
  value,
  textColor = "text-gray-900"
}: {
  name: string;
  value: string;
  textColor?: string;
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
        className={`w-full aspect-[4/3] rounded-xl mb-2 transition-transform group-hover:scale-105 ${textColor}`}
        style={{ backgroundColor: value }}
      />
      <p className="font-medium text-sm text-gray-900">{name}</p>
      <p className="text-xs text-gray-500 font-mono">
        {copied ? "Copied!" : value}
      </p>
    </button>
  );
}

// FAQ Accordion Demo (isolated from data)
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
        className="flex items-center gap-2 px-5 py-2.5 text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium border border-gray-200 rounded-full bg-white"
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
                  <span className="block text-[15px] font-medium text-gray-900">{item}</span>
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

export default function DesignSystemPage() {
  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="py-12 border-b border-gray-200">
          <h1 className="font-display text-4xl md:text-5xl text-purple-700 mb-4">
            UXHI Design System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            A living documentation of the design tokens, components, and patterns used across the UXHI website.
          </p>
        </div>

        {/* Typography */}
        <Section
          title="Typography"
          description="Font families, sizes, and text styles used throughout the site."
        >
          <div className="space-y-12">
            {/* Font Families */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Font Families</h3>
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
            </div>

            {/* Heading Hierarchy */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Heading Hierarchy</h3>
              <div className="space-y-6 p-6 bg-cream rounded-xl">
                <div>
                  <span className="text-xs text-gray-500 font-mono">h1 — text-4xl/5xl/6xl (responsive)</span>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-purple-700">Heading One</h1>
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-mono">h2 — text-3xl/4xl/5xl (responsive)</span>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-purple-700">Heading Two</h2>
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-mono">h3 — text-xl font-semibold</span>
                  <h3 className="font-semibold text-xl text-purple-700">Heading Three</h3>
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-mono">h4 — text-lg font-semibold</span>
                  <h4 className="font-semibold text-lg text-purple-700">Heading Four</h4>
                </div>
              </div>
            </div>

            {/* Body Text */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Body Text</h3>
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
            </div>

            {/* Special Text Styles */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Special Styles</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold">
                  <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                  Badge / Eyebrow
                </span>
                <span className="text-teal-500 font-bold uppercase tracking-wider text-sm">
                  EYEBROW TEXT
                </span>
                <a href="#" className="text-teal-500 hover:text-teal-600 transition-colors font-semibold underline">
                  Link Style
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* Colors */}
        <Section
          title="Color Palette"
          description="Brand colors and their variations. Click any swatch to copy its hex value."
        >
          <div className="space-y-10">
            {/* Primary - Teal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Primary — Teal</h3>
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
            </div>

            {/* Secondary - Purple */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Secondary — Purple</h3>
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
            </div>

            {/* Gray Scale */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Gray Scale</h3>
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
              <p className="text-xs text-gray-500 mt-3">Note: <code className="bg-gray-100 px-1 rounded">#6b7282</code> is used in QuickLinkPill subtitle — consider standardizing to gray-500.</p>
            </div>

            {/* Neutral / Brand */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Neutral / Brand</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <ColorSwatch name="White" value="#ffffff" />
                <ColorSwatch name="Section Gray" value="#f5f5f5" />
                <ColorSwatch name="Cream" value="#f4f1ea" />
                <ColorSwatch name="Cream Dark" value="#e8e4db" />
                <ColorSwatch name="Black" value="#000000" textColor="text-white" />
              </div>
            </div>

            {/* Accent - Yellow */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Accent — Yellow</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <ColorSwatch name="Yellow" value="#f5c542" />
                <ColorSwatch name="Yellow Hover" value="#e5b532" />
                <ColorSwatch name="Yellow Alt" value="#ffcc40" />
                <ColorSwatch name="Yellow 400" value="#facc15" />
              </div>
            </div>
          </div>
        </Section>

        {/* Buttons */}
        <Section
          title="Buttons"
          description="Button variants and sizes used across the site."
        >
          <div className="space-y-10">
            {/* Button Component - Variants & Sizes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Button Component</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/ui/Button.tsx</p>
              <p className="text-sm text-gray-500 mb-4">Base button with variants (primary, secondary, outline, ghost) and sizes (sm, md, lg)</p>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>
            </div>

            {/* PrimaryCTA Component */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Primary CTA</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/ui/PrimaryCTA.tsx</p>
              <p className="text-sm text-gray-500 mb-4">Pill button with yellow arrow circle. Internal links use right arrow, external links use up-right arrow.</p>
              <div className="flex flex-wrap gap-4 items-center">
                <PrimaryCTA href="#">Join us</PrimaryCTA>
                <PrimaryCTA href="#" external>External Link</PrimaryCTA>
              </div>
            </div>

            {/* ArrowLinkButton Component */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Arrow Link Button</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/ui/ArrowLinkButton.tsx</p>
              <p className="text-sm text-gray-500 mb-4">Text with arrow, pill-shaped hover state. Used under feature cards on dark backgrounds.</p>
              <div className="flex flex-wrap gap-6 items-center p-6 bg-purple-700 rounded-xl">
                <ArrowLinkButton href="#">Learn more</ArrowLinkButton>
              </div>
            </div>

            {/* QuickLinkPill Component */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Quick Link Pill</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/ui/QuickLinkPill.tsx</p>
              <p className="text-sm text-gray-500 mb-4">Pill with icon, label, and subtitle. Used on hero sections (/get-involved, /resources, /about).</p>
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
            </div>

            {/* CSS Utility Classes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">CSS Utility Classes</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">globals.css</p>
              <p className="text-sm text-gray-500 mb-4">CSS classes for custom button styling (not component-based).</p>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="btn-primary">btn-primary</button>
                <button className="btn-primary-arrow">
                  <span className="text-white">btn-primary-arrow</span>
                  <span className="w-8 h-8 rounded-full bg-[#f5c542] flex items-center justify-center">
                    <ArrowIcon className="w-4 h-4 text-gray-900" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Cards & Modules */}
        <Section
          title="Cards & Modules"
          description="Reusable card patterns and container styles."
        >
          <div className="space-y-12">
            {/* Feature Cards */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Feature Card</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/ui/cards/FeatureCard.tsx</p>
              <p className="text-sm text-gray-500 mb-4">Card with optional icon, title, and description. Variants: cream (default), white, teal, purple.</p>
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
            </div>

            {/* Spot Illustration Cards */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Spot Illustration Card</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/ui/cards/SpotIllustrationCard.tsx</p>
              <p className="text-sm text-gray-500 mb-4">Card with large illustrated icon (96px desktop, 80px mobile). Variants: dark, cream, white.</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SpotIllustrationCard
                  variant="dark"
                  imageSrc="/images/icons/icon-membership.png"
                  imageAlt="Membership illustration"
                  title="Dark Card with Spot Illustration"
                  description="96px illustrated icon with description and arrow link button below."
                  footer={<ArrowLinkButton href="#">Arrow Link Button</ArrowLinkButton>}
                />
                <SpotIllustrationCard
                  variant="cream"
                  imageSrc="/images/icons/icon-community-engagement.png"
                  imageAlt="Community engagement illustration"
                  title="Cream Card with Spot Illustration"
                  description="96px illustrated icon with hover effect, used for committee cards."
                />
                <SpotIllustrationCard
                  variant="white"
                  imageSrc="/images/icons/icon-resources.png"
                  imageAlt="Resources illustration"
                  title="White Card with Spot Illustration"
                  description="96px illustrated icon on white background with shadow."
                />
              </div>
            </div>

            {/* Speech Bubble Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Speech Bubble Card</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/ui/cards/SpeechBubbleCard.tsx</p>
              <p className="text-sm text-gray-500 mb-4">Testimonial card with notch, quote, avatar placeholder, and author info.</p>
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
            </div>

            {/* Carousel Testimonial Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Carousel Testimonial Card</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">Inline pattern (not a separate component)</p>
              <p className="text-sm text-gray-500 mb-4">Centered large quote with photo and author. Used in testimonial carousels.</p>
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
            </div>

            {/* Link Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Link Card</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/ui/LinkCard.tsx</p>
              <p className="text-sm text-gray-500 mb-4">Cream card with title, teal description, and external link icon. Used on /resources.</p>
              <div className="max-w-sm">
                <LinkCard
                  href="#"
                  title="Resource Title"
                  description="Description or label"
                />
              </div>
            </div>

            {/* Info Box */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Info Box</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/ui/InfoBox.tsx</p>
              <p className="text-sm text-gray-500 mb-4">Teal-50 background with teal-100 border. Used for notes and callouts.</p>
              <div className="space-y-6">
                {/* Simple Note */}
                <InfoBox>
                  <p className="text-gray-700 font-medium">Note: This is an informational callout for important notes or disclaimers.</p>
                </InfoBox>

                {/* Note with CTA */}
                <InfoBox className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-gray-700 font-medium">Do you have more resources to suggest?</p>
                  <PrimaryCTA href="#">Email Us</PrimaryCTA>
                </InfoBox>
              </div>
            </div>
          </div>
        </Section>

        {/* Interactive Components */}
        <Section
          title="Interactive Components"
          description="Toggles, accordions, and dropdown menus."
        >
          <div className="space-y-12">
            {/* FAQ Accordion */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">FAQ Accordion</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/sections/FAQSection.tsx</p>
              <p className="text-sm text-gray-500 mb-4">Expandable accordion with teal active state. Uses PlusIcon/MinusIcon from components/ui/icons/.</p>
              <FAQAccordionDemo />
            </div>

            {/* Dropdown */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Dropdown Menu</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/layout/Header.tsx (inline)</p>
              <p className="text-sm text-gray-500 mb-4">Animated dropdown with tail pointer. Uses ChevronDownIcon from components/ui/icons/.</p>
              <DropdownDemo />
            </div>

            {/* Navigation Pill */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Navigation Pill</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">components/layout/Header.tsx (inline)</p>
              <p className="text-sm text-gray-500 mb-4">Header navigation container with pill-shaped border.</p>
              <div className="inline-flex items-center gap-1 border border-gray-200 rounded-full px-2 py-2 bg-white/80">
                <span className="px-5 py-2.5 text-[15px] text-gray-700 font-medium">Link One</span>
                <span className="px-5 py-2.5 text-[15px] text-gray-700 font-medium">Link Two</span>
                <span className="px-5 py-2.5 text-[15px] text-gray-700 font-medium">Link Three</span>
                <span className="flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-5 pr-1.5 py-1.5 ml-2">
                  <span className="text-[15px] font-medium text-gray-900">CTA</span>
                  <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center">
                    <ArrowIcon className="w-4 h-4 text-gray-900" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* Image Grid Patterns */}
        <Section
          title="Image Grid Patterns"
          description="Responsive image layouts and bento-style grids."
        >
          <div className="space-y-12">
            {/* Staggered Grid */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Staggered Community Grid</h3>
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

            {/* Standard Grid */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Standard Image Grid</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-gray-200" />
                ))}
              </div>
            </div>

            {/* Bento Grid */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Bento Grid</h3>
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
        </Section>

        {/* Spacing & Layout */}
        <Section
          title="Spacing & Layout"
          description="Container widths, section padding, and spacing tokens."
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Container</h3>
              <p className="text-sm text-gray-600 mb-4">
                Max width: <code className="bg-gray-100 px-2 py-1 rounded">1380px</code> (custom 2xl breakpoint) with <code className="bg-gray-100 px-2 py-1 rounded">px-6</code> padding
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Section Padding</h3>
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

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Border Radius</h3>
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
          </div>
        </Section>

        {/* Icons */}
        <Section
          title="Icons"
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
        </Section>
      </Container>
    </main>
  );
}
