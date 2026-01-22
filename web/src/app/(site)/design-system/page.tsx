"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";

// Section wrapper for consistent styling
function Section({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 border-b border-gray-200 last:border-0">
      <div className="mb-8">
        <h2 className="font-display text-2xl md:text-3xl text-purple-700 mb-2">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
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
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                </svg>
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
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
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

            {/* Neutral / Brand */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Neutral / Brand</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <ColorSwatch name="Cream" value="#f4f1ea" />
                <ColorSwatch name="Cream Dark" value="#e8e4db" />
                <ColorSwatch name="Yellow (Accent)" value="#f5c542" />
                <ColorSwatch name="White" value="#ffffff" />
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
            {/* Variants */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>

            {/* Special CTAs */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Primary CTA (with yellow arrow circle)</h3>
              <p className="text-sm text-gray-500 mb-4">Internal links use right arrow, external links use up-right arrow</p>
              <div className="flex flex-wrap gap-4 items-center">
                <PrimaryCTA href="#">Join us</PrimaryCTA>
                <PrimaryCTA href="#" external>External Link</PrimaryCTA>
              </div>
            </div>

            {/* Arrow Link Button */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Arrow Link Button</h3>
              <p className="text-sm text-gray-500 mb-4">Text with arrow, pill-shaped hover state - used under feature cards on dark backgrounds</p>
              <div className="flex flex-wrap gap-6 items-center p-6 bg-purple-700 rounded-xl">
                <a href="#" className="inline-flex items-center gap-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium group">
                  <span>Arrow Link Button</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Subcategory Link Button */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Subcategory Link Button</h3>
              <p className="text-sm text-gray-500 mb-4">Pill with icon, label, and subtitle - used on hero sections (/get-involved, /resources, /about)</p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group">
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
                    <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                    <path d="m2 15 6 6" />
                    <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
                  </svg>
                  <div className="text-left">
                    <span className="block text-[16px] font-medium text-black">Volunteer</span>
                    <span className="block text-[14px] text-[#6b7282]">Help grow our community</span>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group">
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12" />
                    <circle cx="16" cy="7" r="5" />
                  </svg>
                  <div className="text-left">
                    <span className="block text-[16px] font-medium text-black">Become a Speaker</span>
                    <span className="block text-[14px] text-[#6b7282]">Share your expertise</span>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group">
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                    <path d="m18 15-2-2" />
                    <path d="m15 18-2-2" />
                  </svg>
                  <div className="text-left">
                    <span className="block text-[16px] font-medium text-black">Partner</span>
                    <span className="block text-[14px] text-[#6b7282]">Collaborate with us</span>
                  </div>
                </a>
              </div>
            </div>

            {/* CSS Class Buttons */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">CSS Utility Classes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="btn-primary">btn-primary</button>
                <button className="btn-primary-arrow">
                  <span className="text-white">btn-primary-arrow</span>
                  <span className="w-8 h-8 rounded-full bg-[#f5c542] flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
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
            {/* Standard Cards Grid */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Standard Cards</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Feature Card */}
                <div className="bg-cream p-6 md:p-8 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="text-teal-500 mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl text-purple-700 mb-2">Feature Card</h3>
                  <p className="text-gray-600">Used in feature grids with icon, title, and description.</p>
                </div>

                {/* White Card */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-xl text-purple-700 mb-2">White Card</h3>
                  <p className="text-gray-600">Clean card with subtle shadow for content sections.</p>
                </div>

                {/* Colored Card - Teal */}
                <div className="bg-teal-500 p-6 md:p-8 rounded-2xl text-white">
                  <h3 className="font-semibold text-xl mb-2">Teal Card</h3>
                  <p className="text-white/90">Accent card for highlighting important information.</p>
                </div>

                {/* Colored Card - Purple */}
                <div className="bg-purple-700 p-6 md:p-8 rounded-2xl text-white">
                  <h3 className="font-semibold text-xl mb-2">Purple Card</h3>
                  <p className="text-white/90">Secondary accent card for variety.</p>
                </div>
              </div>
            </div>

            {/* Large Illustrated Icon Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Card with Large Illustrated Icon (Spot Illustration)</h3>
              <p className="text-sm text-gray-500 mb-4">96px icon on desktop (80px mobile) - used for committees, features on dark backgrounds</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Dark Background Version */}
                <div className="bg-purple-700 border border-purple-500/30 rounded-[24px] p-8 text-center flex flex-col">
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/icons/icon-membership.png"
                      alt="Spot illustration"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="font-display text-2xl text-white mb-4">Dark Card with Spot Illustration</h4>
                  <p className="text-purple-200 leading-relaxed flex-grow">96px illustrated icon with description and arrow link button below.</p>
                  <a href="#" className="mt-6 self-center inline-flex items-center gap-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium group">
                    <span>Arrow Link Button</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Cream Background Version (Committee style) */}
                <div className="bg-cream rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 mb-4 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/icons/icon-community-engagement.png"
                      alt="Spot illustration"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">Cream Card with Spot Illustration</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">96px illustrated icon with hover effect, used for committee cards.</p>
                </div>

                {/* White Background Version */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-4 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/icons/icon-resources.png"
                      alt="Spot illustration"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="font-display text-lg text-purple-700 mb-2">White Card with Spot Illustration</h4>
                  <p className="text-gray-600 text-sm">96px illustrated icon on white background with shadow.</p>
                </div>
              </div>
            </div>

            {/* Speech Bubble Testimonial Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Speech Bubble Testimonial Card</h3>
              <p className="text-sm text-gray-500 mb-4">White card with notch, teal quote text, avatar, and author info</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { quote: "Receiving education support has been a life-changing experience for me. It gave me the financial freedom and confidence to focus fully on my studies.", name: "Emma Helson", time: "1 week ago" },
                  { quote: "Getting education support has been truly life-changing. It gave me the stability and assurance to concentrate fully on my learning without distractions.", name: "Sophia Marie", time: "2 weeks ago" },
                  { quote: "Education support has made a world of difference in my life. It offered me the security and confidence to focus completely on my academic goals.", name: "Jackson Lee", time: "3 weeks ago" },
                ].map((testimonial, i) => (
                  <div key={i} className="relative">
                    {/* Speech bubble card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
                      <blockquote className="text-teal-600 text-base leading-relaxed mb-4">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                      {/* Notch at bottom left */}
                      <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white border-b border-r border-gray-100 transform rotate-45" />
                    </div>
                    {/* Author info below */}
                    <div className="flex items-center gap-3 mt-6 ml-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-teal-600">{testimonial.name}</p>
                        <p className="text-teal-500 text-sm">{testimonial.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Testimonial Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Carousel Testimonial Card</h3>
              <p className="text-sm text-gray-500 mb-4">Centered large quote with navigation - used in testimonial carousels</p>
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
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Link Card</h3>
              <p className="text-sm text-gray-500 mb-4">Cream background with title, description (teal text), and external link icon - used on /resources for online resources, programs, communities</p>
              <div className="max-w-sm">
                <a
                  href="#"
                  className="flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-gray-100 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-gray-900">Resource Title</p>
                    <p className="text-sm text-teal-600">Description or label</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M7 7h10v10" />
                    <path d="M7 17L17 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Note / Info Box */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Note / Info Box</h3>
              <p className="text-sm text-gray-500 mb-4">Teal-50 background with teal-100 border - used for informational callouts on /resources</p>
              <div className="space-y-6">
                {/* Simple Note */}
                <div className="bg-teal-50 border border-teal-100 rounded-[20px] p-6">
                  <p className="text-gray-700 font-medium">Note: This is an informational callout for important notes or disclaimers.</p>
                </div>

                {/* Note with CTA */}
                <div className="bg-teal-50 border border-teal-100 rounded-[20px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-gray-700 font-medium">Do you have more resources to suggest?</p>
                  <a href="#" className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group">
                    <span className="text-gray-900">Email Us</span>
                    <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                </div>
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
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">FAQ Accordion</h3>
              <FAQAccordionDemo />
            </div>

            {/* Dropdown */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Dropdown Menu</h3>
              <DropdownDemo />
            </div>

            {/* Navigation Pill */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Navigation Pill</h3>
              <div className="inline-flex items-center gap-1 border border-gray-200 rounded-full px-2 py-2 bg-white/80">
                <span className="px-5 py-2.5 text-[15px] text-gray-700 font-medium">Link One</span>
                <span className="px-5 py-2.5 text-[15px] text-gray-700 font-medium">Link Two</span>
                <span className="px-5 py-2.5 text-[15px] text-gray-700 font-medium">Link Three</span>
                <span className="flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-5 pr-1.5 py-1.5 ml-2">
                  <span className="text-[15px] font-medium text-gray-900">CTA</span>
                  <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
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
          description="Common icons used throughout the site (inline SVGs)."
        >
          <div className="flex flex-wrap gap-6">
            {[
              { name: "Arrow", path: "M5 12h14M12 5l7 7-7 7" },
              { name: "External", path: "M7 7h10v10M7 17L17 7" },
              { name: "Plus", path: "M12 6v12M6 12h12" },
              { name: "Minus", path: "M20 12H4" },
              { name: "Chevron", path: "M19 9l-7 7-7-7" },
              { name: "Users", path: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
              { name: "Calendar", path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
            ].map((icon) => (
              <div key={icon.name} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={icon.path} />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">{icon.name}</span>
              </div>
            ))}
          </div>
        </Section>
      </Container>
    </main>
  );
}
