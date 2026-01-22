import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { FOUNDERS_QUERY, FAQS_QUERY, VALUES_QUERY } from "@/sanity/lib/queries";
import { MissionSection } from "@/components/sections/MissionSection";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ArrowIcon, ExternalLinkIcon } from "@/components/ui/icons";
import { QuickLinkPill } from "@/components/ui/QuickLinkPill";
import { InfoBox } from "@/components/ui/InfoBox";

export const metadata: Metadata = {
  title: "About | UX Hawaii",
  description:
    "Learn about UX Hawaii, Hawaii's premier UX community dedicated to connecting, educating, and empowering UX professionals.",
};

// Lucide Icons with 1.5px stroke
function SquareUserRoundIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M18 21a6 6 0 0 0-12 0" />
      <circle cx="12" cy="11" r="4" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  );
}

function CircleHelpIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function SendIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

export default async function AboutPage() {
  const [foundersResult, faqsResult, valuesResult] = await Promise.all([
    sanityFetch({ query: FOUNDERS_QUERY }),
    sanityFetch({ query: FAQS_QUERY }),
    sanityFetch({ query: VALUES_QUERY }),
  ]);

  const founders = foundersResult.data || [];
  const faqs = faqsResult.data || [];
  const values = valuesResult.data || [];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[700px] lg:min-h-[702px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-8 pt-24 pb-16 lg:pl-32 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[733px]">
          <div className="flex flex-col gap-6 max-w-[605px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-[48px] lg:leading-[84px] text-black">
              About Us
            </h1>
            <p className="text-black text-lg lg:text-[20px] leading-relaxed">
              Learn about UX Hawaii, Hawai&apos;i&apos;s premier UX community dedicated to connecting, educating, and empowering UX professionals.
            </p>

            {/* Quick Link Modules */}
            <div className="flex flex-wrap gap-4">
              <QuickLinkPill
                href="#team"
                icon={<SquareUserRoundIcon className="w-7 h-7" />}
                label="Team"
                subtitle="Meet our founders"
              />
              <QuickLinkPill
                href="#faqs"
                icon={<CircleHelpIcon className="w-7 h-7" />}
                label="FAQs"
                subtitle="Common questions"
              />
              <QuickLinkPill
                href="#contact"
                icon={<SendIcon className="w-7 h-7" />}
                label="Contact"
                subtitle="Get in touch"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Bento Grid */}
        <div className="relative lg:absolute lg:right-[calc(8.33%+22px)] lg:top-0 h-auto lg:h-[655px] w-full lg:w-[320px] px-8 lg:px-0 pb-8 lg:pb-0">
          <div className="grid grid-cols-2 gap-4 w-full max-w-[320px] mx-auto lg:mx-0">
            {/* Column 1 - Left */}
            <div className="flex flex-col gap-4 lg:mt-[92px]">
              {/* Pill-bottom shape */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-lg rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/bento/conference.jpg"
                  alt="UXHI conference"
                  fill
                  className="object-cover"
                />
              </div>
              {/* UXHI Motif Pattern */}
              <div className="w-[128px] mx-auto flex items-center justify-center">
                <Image
                  src="/images/bento/uxhi-motif-1.svg"
                  alt="UXHI motif"
                  width={128}
                  height={128}
                  className="w-[128px] h-[128px]"
                />
              </div>
              {/* Full tall pill */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-[99px] overflow-hidden relative opacity-90">
                <Image
                  src="/images/bento/crowd-community.jpg"
                  alt="UXHI community crowd"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Column 2 - Right */}
            <div className="flex flex-col gap-4">
              {/* Small rectangle (cut off at top) */}
              <div className="w-full h-[100px] lg:h-[128px] rounded-lg overflow-hidden relative lg:-mt-8">
                <Image
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHICon 25"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Medium rectangle */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-lg overflow-hidden relative">
                <Image
                  src="/images/bento/group-leis.jpg"
                  alt="UXHI community members with leis"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Pill-bottom shape */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-lg rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/bento/photobooth.jpg"
                  alt="UXHI photobooth"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MissionSection values={values} />

      {/* Featured Press Section */}
      <section className="pb-16 px-6 bg-cream">
        <div className="max-w-[1100px] mx-auto">
          <InfoBox className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-teal-600 text-sm font-medium uppercase tracking-wider">Featured in Hawai'i Bulletin</span>
              <p className="text-gray-700 font-medium mt-1">Local group explores user experience and interface design</p>
            </div>
            <Link
              href="https://www.hawaiibulletin.com/p/local-group-explores-user-experience"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group shrink-0"
            >
              <span className="text-gray-900">Read Article</span>
              <span className="w-9 h-9 rounded-full bg-yellow flex items-center justify-center group-hover:bg-yellow-hover transition-colors">
                <ExternalLinkIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </InfoBox>
        </div>
      </section>

      <FoundersSection founders={founders} id="team" />
      <FAQSection faqs={faqs} id="faqs" />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-teal-500 scroll-mt-24">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Get in touch
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-[600px] mx-auto">
            Have questions, ideas, or want to collaborate? We&apos;d love to hear from you. Reach out to our team and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:aloha@uxhi.community"
              className="inline-flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-900">Email us</span>
              <span className="w-9 h-9 rounded-full bg-yellow flex items-center justify-center group-hover:bg-yellow-hover transition-colors">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/30 rounded-full pl-6 pr-2 py-2 font-medium text-white hover:bg-white/20 transition-colors group"
            >
              <span>Join our Slack</span>
              <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowIcon className="w-4 h-4 text-white" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
