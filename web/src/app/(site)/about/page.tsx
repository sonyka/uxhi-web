import Image from "next/image";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { FOUNDERS_QUERY, FAQS_QUERY, VALUES_QUERY } from "@/sanity/lib/queries";
import { MissionSection } from "@/components/sections/MissionSection";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { QuickLinkPill } from "@/components/ui/QuickLinkPill";
import { InfoBox } from "@/components/ui/InfoBox";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";

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
      <div className="relative min-h-[564px] sm:min-h-[746px] md:min-h-[747px] lg:min-h-[700px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-6 pt-32 pb-8 sm:max-w-[411px] md:max-w-[calc(100%-340px)] md:pl-10 lg:pl-24 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[583px] xl:max-w-[733px]">
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl leading-[40px] lg:text-5xl lg:leading-[60px] xl:leading-[84px] text-black">
              About Us
            </h1>
            <p className="text-black text-lg lg:text-xl leading-relaxed">
              Learn about UX Hawaii, Hawai&apos;i&apos;s premier UX community dedicated to connecting, educating, and empowering UX professionals.
            </p>

            {/* Quick Link Modules - hidden on mobile */}
            <div className="hidden sm:flex flex-wrap gap-4">
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

        {/* Mobile Bento - Horizontal layout (shown on <sm only) */}
        <div className="sm:hidden px-6 pb-8">
          <div className="flex gap-3.5 items-center w-full">
            <div className="flex-1 h-[140px] rounded-t-xl rounded-b-[99px] overflow-hidden relative">
              <Image src="/images/about/bento-about-01.png" alt="UXHI conference" fill className="object-cover" />
            </div>
            <div className="w-[120px] shrink-0 flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-1.svg" alt="UXHI motif" width={120} height={120} className="w-[120px] h-[120px]" />
            </div>
            <div className="flex-1 h-[140px] rounded-[99px] overflow-hidden relative">
              <Image src="/images/about/bento-about-02.png" alt="UXHI community crowd" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-0 xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only */}
          <div className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            <div className="w-full h-[180px] rounded-t-[7px] rounded-b-[88px] overflow-hidden relative">
              <Image src="/images/about/bento-about-01.png" alt="UXHI conference" fill className="object-cover" />
            </div>
            <div className="w-[114px] mx-auto flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-1.svg" alt="UXHI motif" width={114} height={114} className="w-[114px] h-[114px]" />
            </div>
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative opacity-90">
              <Image src="/images/about/bento-about-02.png" alt="UXHI community crowd" fill className="object-cover" />
            </div>
          </div>

          {/* MD+ layout - Two columns with absolute positioning */}
          <div className="hidden md:block relative w-full h-full">
            {/* Column 1 - Left (positioned higher) */}
            <div className="absolute bottom-[82px] lg:bottom-[92px] left-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/about/bento-about-01.png" alt="UXHI conference" fill className="object-cover" />
              </div>
              <div className="w-[114px] lg:w-[128px] mx-auto flex items-center justify-center">
                <Image src="/images/bento/uxhi-motif-1.svg" alt="UXHI motif" width={128} height={128} className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image src="/images/about/bento-about-02.png" alt="UXHI community crowd" fill className="object-cover" />
              </div>
            </div>
            {/* Column 2 - Right (positioned at bottom) */}
            <div className="absolute bottom-0 right-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[114px] lg:h-[128px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/about/bento-about-03.png" alt="UXHICon 25" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/about/bento-about-04.png" alt="UXHI community members with leis" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/about/bento-about-05.png" alt="UXHI photobooth" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MissionSection values={values} />

      {/* Featured Press Section */}
      <section className="pb-16 px-6 bg-cream">
        <div className="max-w-[1100px] mx-auto">
          <InfoBox
            eyebrow="Featured in Hawai'i Bulletin"
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-base text-gray-700 font-medium">Local group explores user experience and interface design</p>
            <PrimaryCTA href="https://www.hawaiibulletin.com/p/local-group-explores-user-experience" external>
              Read Article
            </PrimaryCTA>
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
            <PrimaryCTA href="mailto:aloha@uxhi.community" external>
              Email us
            </PrimaryCTA>
            <PrimaryCTA href="/join" variant="dark">
              Join our Slack
            </PrimaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}
