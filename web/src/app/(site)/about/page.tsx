import Image from "next/image";
import type { Metadata } from "next";
import { sanityFetchCached } from "@/sanity/lib/fetchCached";
import { TEAM_MEMBERS_QUERY, ABOUT_FAQS_QUERY, VALUES_QUERY } from "@/sanity/lib/queries";
import { MissionSection } from "@/components/sections/MissionSection";
import { TeamSection } from "@/components/sections/team";
import { FAQSection } from "@/components/sections/FAQSection";
import { QuickLinkPill } from "@/components/ui/QuickLinkPill";
import { PressMention } from "@/components/ui/PressMention";
import { PrincipleList } from "@/components/ui/PrincipleList";
import { InlineLink } from "@/components/ui/InlineLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionLead } from "@/components/ui/SectionLead";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { HeroContent } from "@/components/ui/HeroContent";
import { HeroSection } from "@/components/ui/HeroSection";
import { HeroEntrance, HeroItem, ScrollReveal, MotionDiv, FadeInOnMount } from "@/components/ui/motion";
import { SectionIcon } from "@/components/ui/SectionIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scaleReveal } from "@/lib/animations";

// The FAQ section is hidden on /about for now (2026-08-29). The FAQs still
// come from Sanity and the markup is intact, so restoring is flipping this
// back to true — but also uncomment the FAQs entry in the About dropdown in
// components/layout/Navbar.tsx, which points at #faqs.
const SHOW_FAQS = false;

// The featured press callout is hidden on /about for now (2026-08-29). The
// Bytemarks Cafe episode it pointed at is already surfaced on /events, so the
// two were carrying the same mention.
const SHOW_PRESS = false;

const ALOHA_PRINCIPLES = [
  {
    term: "People",
    description:
      "Every design decision starts with genuine care for the humans affected by it — not just their needs, but their dignity.",
  },
  {
    term: "Culture",
    description:
      "Honoring the values, language, and ways of knowing that make Hawaiʻi's communities distinct, rather than importing frameworks wholesale.",
  },
  {
    term: "Community",
    description:
      "Designing in relationship, not isolation — building pilina with the people and communities our work touches.",
  },
  {
    term: "Place",
    description:
      "Recognizing that context matters. What works elsewhere doesn't always translate here, and Hawaiʻi's environment, history, and communities shape what good design looks like.",
  },
];

export const metadata: Metadata = {
  title: "About | UX Hawaii",
  description:
    "Learn about UXHI, Hawaiʻi's home for aloha-centered design. Meet the team and get in touch.",
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

function HeartIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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
  const [membersResult, faqsResult, valuesResult] = await Promise.all([
    sanityFetchCached({ query: TEAM_MEMBERS_QUERY }),
    sanityFetchCached({ query: ABOUT_FAQS_QUERY }),
    sanityFetchCached({ query: VALUES_QUERY }),
  ]);

  const members = membersResult.data || [];
  const faqs = faqsResult.data || [];
  const values = valuesResult.data || [];

  return (
    <main className="min-h-screen bg-beige-10">
      {/* Hero Section */}
      <HeroSection>
        {/* Left Side - Content */}
        <HeroContent>
          <HeroEntrance className="flex flex-col gap-6">
            <HeroItem>
              <SectionHeading as="h1" size="hero" color="black">
                About Us
              </SectionHeading>
            </HeroItem>
            <HeroItem>
              <p className="text-black text-lg lg:text-xl leading-relaxed">
                Learn about UXHI, Hawaiʻi&apos;s home for aloha-centered design.
              </p>
            </HeroItem>

            {/* Quick Link Modules - hidden on mobile */}
            <HeroItem>
              <div className="hidden sm:flex flex-wrap gap-4">
                <QuickLinkPill
                  href="#team"
                  icon={<SquareUserRoundIcon className="w-7 h-7" />}
                  label="Team"
                  subtitle="Meet our team"
                />
                {SHOW_FAQS && (
                  <QuickLinkPill
                    href="#faqs"
                    icon={<CircleHelpIcon className="w-7 h-7" />}
                    label="FAQs"
                    subtitle="Common questions"
                  />
                )}
                <QuickLinkPill
                  href="#aloha-centered-design"
                  icon={<HeartIcon className="w-7 h-7" />}
                  label="Our Approach"
                  subtitle="Aloha-centered design"
                />
                <QuickLinkPill
                  href="#contact"
                  icon={<SendIcon className="w-7 h-7" />}
                  label="Contact"
                  subtitle="Get in touch"
                />
              </div>
            </HeroItem>
          </HeroEntrance>
        </HeroContent>

        {/* Mobile Bento - Horizontal layout (shown on <sm only) */}
        <div className="sm:hidden px-6 pb-8">
          <FadeInOnMount delay={0.5} className="flex gap-3.5 items-center w-full">
            <div className="flex-1 h-[140px] rounded-t-xl rounded-b-[99px] overflow-hidden relative">
              <Image src="/images/about/bento-about-01.png" alt="UXHI conference" fill className="object-cover" />
            </div>
            <div className="w-[120px] shrink-0 flex items-center justify-center">
              <Image src="/images/motifs/uxhi-motif-1.svg" alt="UXHI motif" width={120} height={120} className="w-[120px] h-[120px]" />
            </div>
            <div className="flex-1 h-[140px] rounded-[99px] overflow-hidden relative">
              <Image src="/images/about/bento-about-02.png" alt="UXHI community crowd" fill className="object-cover" />
            </div>
          </FadeInOnMount>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-[110px] xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only */}
          <FadeInOnMount delay={0.5} className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            <div className="w-full h-[180px] rounded-t-[7px] rounded-b-[88px] overflow-hidden relative">
              <Image src="/images/about/bento-about-01.png" alt="UXHI conference" fill className="object-cover" />
            </div>
            <div className="w-[114px] mx-auto flex items-center justify-center">
              <Image src="/images/motifs/uxhi-motif-1.svg" alt="UXHI motif" width={114} height={114} className="w-[114px] h-[114px]" />
            </div>
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative opacity-90">
              <Image src="/images/about/bento-about-02.png" alt="UXHI community crowd" fill className="object-cover" />
            </div>
          </FadeInOnMount>

          {/* MD+ layout - Two columns with absolute positioning */}
          <div className="hidden md:block relative w-full h-full">
            {/* Column 1 - Left (positioned higher) */}
            <FadeInOnMount delay={0.5} className="absolute bottom-[82px] lg:bottom-[92px] left-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/about/bento-about-01.png" alt="UXHI conference" fill className="object-cover" />
              </div>
              <div className="w-[114px] lg:w-[128px] mx-auto flex items-center justify-center">
                <Image src="/images/motifs/uxhi-motif-1.svg" alt="UXHI motif" width={128} height={128} className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image src="/images/about/bento-about-02.png" alt="UXHI community crowd" fill className="object-cover" />
              </div>
            </FadeInOnMount>
            {/* Column 2 - Right (positioned at bottom) */}
            <FadeInOnMount delay={0.7} className="absolute bottom-0 right-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[114px] lg:h-[128px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/about/bento-about-03.png" alt="UXHICon 25" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/about/bento-about-04.png" alt="UXHI community members with leis" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/about/bento-about-05.png" alt="UXHI photobooth" fill className="object-cover" />
              </div>
            </FadeInOnMount>
          </div>
        </div>
      </HeroSection>

      <MissionSection values={values} />

      {/* Aloha-Centered Design */}
      <section
        id="aloha-centered-design"
        className="scroll-mt-24 bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-[900px]">
          <ScrollReveal stagger>
            <MotionDiv>
              <SectionEyebrow className="mb-3">Our approach</SectionEyebrow>
            </MotionDiv>

            <MotionDiv>
              <SectionHeading size="md" className="mb-6">
                What is aloha-centered design?
              </SectionHeading>
            </MotionDiv>

            <MotionDiv>
              <SectionLead size="md" className="mb-5">
                Aloha-centered design is our Hawaiʻi-rooted approach to
                human-centered design — built on the same foundation as UX, but
                grounded in something more specific to where we practice it.
              </SectionLead>
            </MotionDiv>

            <MotionDiv>
              <SectionLead size="md">
                Where human-centered design generally asks you to design{" "}
                <em className="italic">for</em> the user, aloha-centered design
                asks you to design <em className="italic">with</em> aloha: for
                the people who&apos;ll use what you build, the culture and place
                they come from, and the communities they&apos;re part of.
              </SectionLead>
            </MotionDiv>

            <MotionDiv>
              <p className="mt-10 mb-8 text-base font-bold text-purple-140 md:text-lg">
                In practice, that means grounding our work in four things:
              </p>
            </MotionDiv>

            <MotionDiv>
              <PrincipleList principles={ALOHA_PRINCIPLES} />
            </MotionDiv>

            <MotionDiv>
              <SectionLead size="md" className="mt-12">
                UX remains our professional foundation — the skills, methods,
                and rigor don&apos;t change. Aloha-centered design is our
                distinctive point of view on how and why we practice it here.
              </SectionLead>
            </MotionDiv>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Press — hidden for now, see SHOW_PRESS above */}
      {SHOW_PRESS && (
        <section className="pb-16 px-6 bg-beige-10">
          <div className="max-w-[1100px] mx-auto">
            <ScrollReveal>
              <PressMention
                source="Hawaiʻi Public Radio"
                title="Bytemarks Cafe: UXHI Conference"
                href="https://www.hawaiipublicradio.org/show/bytemarks-cafe/2024-10-09/bytemarks-cafe-uxhi-conference"
                ctaLabel="Listen Now"
              />
            </ScrollReveal>
          </div>
        </section>
      )}

      <TeamSection members={members} id="team" />
      {SHOW_FAQS && <FAQSection faqs={faqs} id="faqs" />}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-purple-140 scroll-mt-24">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal stagger className="text-center">
            <MotionDiv>
              <SectionIcon src="/images/icons/icon-contact.svg" alt="Contact" />
            </MotionDiv>
            <MotionDiv>
              <SectionHeading color="white" className="mb-6">
                Get in touch
              </SectionHeading>
            </MotionDiv>
            <MotionDiv>
              <p className="text-purple-50 text-lg leading-relaxed mb-6 max-w-[600px] mx-auto">
                Whether you have a question, an idea, or something you want to
                build with us, we read every message and we&apos;ll get back to you.
              </p>
            </MotionDiv>
            <MotionDiv>
              <p className="text-purple-50 text-lg leading-relaxed mb-10 max-w-[600px] mx-auto">
                Looking to join the community instead?{" "}
                <InlineLink href="/join" variant="teal">Becoming a member is free</InlineLink>
                {" "}and gets you into our Slack, our member directory, and our monthly events email.
              </p>
            </MotionDiv>
          </ScrollReveal>
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
