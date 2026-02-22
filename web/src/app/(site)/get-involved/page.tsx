import Image from "next/image";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { PARTNERS_QUERY, SPONSORS_QUERY, COMMITTEES_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { QuickLinkPill } from "@/components/ui/QuickLinkPill";
import { SpotIllustrationCard } from "@/components/ui/cards/SpotIllustrationCard";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { InlineLink } from "@/components/ui/InlineLink";
import { BulletPoint } from "@/components/ui/BulletPoint";

export const metadata: Metadata = {
  title: "Get Involved | UX Hawaii",
  description:
    "Join the UXHI community! Volunteer, speak at events, sponsor, partner, or donate to support UX in Hawaii.",
};

// Lucide Icons with 1.5px stroke
function HandHeartIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 15 6 6" />
      <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
    </svg>
  );
}

function MicVocalIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12" />
      <path d="M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5" />
      <circle cx="16" cy="7" r="5" />
    </svg>
  );
}

function MessageSquareHeartIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M14.8 7.5a1.84 1.84 0 0 0-2.6 0l-.2.3-.3-.3a1.84 1.84 0 1 0-2.4 2.8L12 13l2.7-2.7c.9-.9.8-2.1.1-2.8" />
    </svg>
  );
}

function HeartHandshakeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" />
      <path d="m15 18-2-2" />
    </svg>
  );
}

function HandCoinsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
      <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 16 6 6" />
      <circle cx="16" cy="9" r="2.9" />
      <circle cx="6" cy="5" r="3" />
    </svg>
  );
}

// Hardcoded fallback committees
const fallbackCommittees = [
  {
    name: "Educational Outreach",
    description: "Fosters UX education at foundational levels. Initiatives focus on engaging K-12 students through introductory workshops and programs, and collaborating with colleges and universities to support their UX curricula, offer guest lectures, and connect with emerging talent.",
    icon: "/images/icons/icon-educational-outreach.png",
  },
  {
    name: "Workforce Outreach",
    description: "Develop and deliver educational workshops and presentations to companies, helping them integrate UX principles, methodologies, and best practices into their operations.",
    icon: "/images/icons/icon-workforce-outreach.png",
  },
  {
    name: "Community Engagement",
    description: "Organize social events, networking opportunities, member spotlights, and initiatives to welcome new members and ensure active participation.",
    icon: "/images/icons/icon-community-engagement.png",
  },
  {
    name: "Professional Development",
    description: "Provides continuous learning and upskilling opportunities for our members through workshops, webinars, speaker events, and hands-on sessions designed to enhance practical UX skills.",
    icon: "/images/icons/icon-professional-development.png",
  },
  {
    name: "Communications",
    description: "Manages all external and internal communications for the community including maintaining the website, managing social media channels, creating newsletters, promoting events, and ensuring consistent branding and messaging.",
    icon: "/images/icons/icon-communications.png",
  },
  {
    name: "Conference",
    description: "Plans and executes our annual UXHICon conference, bringing together speakers, sponsors, and attendees for Hawai\u2018i\u2019s premier UX event. Help shape the program, coordinate logistics, and create memorable experiences for our community.",
    icon: "/images/icons/icon-conference.png",
  },
];

// Hardcoded fallback partners
const fallbackPartners = [
  { name: "Pi'iku Co.", logo: "/images/company_logos/piiku-logo.png", width: 80, height: 32 },
  { name: "Hawaii Coworking", logo: "/images/company_logos/hawaii-coworking-logo.jpg", width: 128, height: 44 },
  { name: "Hub Coworking Hawaii", logo: "/images/company_logos/hub-logo.png", width: 90, height: 36 },
  { name: "Entrepreneurs Sandbox", logo: "/images/company_logos/sandbox-logo.svg", width: 100, height: 32 },
  { name: "Vanta", logo: "/images/company_logos/vanta-logo.png", width: 128, height: 48 },
  { name: "Holoholo App", logo: "/images/company_logos/holoholo-logo.png", width: 128, height: 128 },
  { name: "Purple Mai'a", logo: "/images/company_logos/purple-maia.png", width: 72, height: 32 },
  { name: "University of Hawaii", logo: "/images/company_logos/uh-logo.png", width: 80, height: 32 },
  { name: "AI Hawaii", logo: "/images/company_logos/HiAI-logo.jpg", width: 80, height: 32 },
  { name: "Honolulu Tech Network", logo: "/images/company_logos/htn-logo.jpeg", width: 80, height: 28 },
  { name: "Honolulu BitDevs", logo: "/images/company_logos/hnl-bitdevs-logo.jpg", width: 80, height: 28 },
  { name: "HTW", logo: "/images/company_logos/htw-logo.webp", width: 80, height: 32 },
];

// Hardcoded fallback sponsors
const fallbackSponsors = [
  { name: "HTDC", logo: "/images/company_logos/htdc-logo.svg", width: 80, height: 32 },
  { name: "Entrepreneurs Sandbox", logo: "/images/company_logos/sandbox-logo.svg", width: 100, height: 32 },
  { name: "Purple Mai'a", logo: "/images/company_logos/purple-maia.png", width: 72, height: 32 },
  { name: "Zippy's", logo: "/images/company_logos/Zippy Logo RGB.svg", width: 80, height: 40, darkGray: true },
  { name: "Servco", logo: "/images/company_logos/servco.svg", width: 80, height: 24 },
  { name: "Anthology Finn", logo: "/images/company_logos/anthology-finn.png", width: 80, height: 32 },
  { name: "Terranox", logo: "/images/company_logos/terranox-logo.svg", width: 90, height: 28 },
  { name: "Shaka Guide", logo: "/images/company_logos/shakaguide-logo.png", width: 128, height: 40 },
  { name: "Adobe", logo: "/images/company_logos/adobe-logo.svg", width: 90, height: 36 },
  { name: "Hub Coworking", logo: "/images/company_logos/hub-logo.png", width: 90, height: 36 },
  { name: "OER", logo: "/images/company_logos/OER Logo.png", width: 80, height: 32 },
  { name: "Mantle", logo: "/images/company_logos/mantle-logo.svg", width: 90, height: 32 },
  { name: "KCC NMA", logo: "/images/company_logos/kccnma-logo.png", width: 80, height: 32 },
  { name: "RVCM", logo: "/images/company_logos/rvcm-logo.svg", width: 72, height: 28 },
];

export default async function GetInvolvedPage() {
  const [partnersResult, sponsorsResult, committeesResult] = await Promise.all([
    sanityFetch({ query: PARTNERS_QUERY }),
    sanityFetch({ query: SPONSORS_QUERY }),
    sanityFetch({ query: COMMITTEES_QUERY }),
  ]);

  type SanityImage = { asset?: { _id?: string; url?: string; metadata?: { lqip?: string; dimensions?: unknown } }; alt?: string; hotspot?: unknown; crop?: unknown };
  type PartnerSponsor = { _id: string; name: string; logo: SanityImage | null; website: string | null; displayWidth: number | null; darkGray: boolean | null };
  type Committee = { _id: string; name: string; description: string; icon: SanityImage | null };

  const partners: PartnerSponsor[] = partnersResult.data || [];
  const sponsors: PartnerSponsor[] = sponsorsResult.data || [];
  const committees: Committee[] = committeesResult.data || [];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[564px] sm:min-h-[746px] md:min-h-[747px] lg:min-h-[700px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-6 pt-32 pb-8 sm:max-w-[411px] md:max-w-[calc(100%-340px)] md:pl-10 lg:pl-24 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[583px] xl:max-w-[733px]">
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl leading-[40px] lg:text-5xl lg:leading-[60px] text-black">
              Get Involved
            </h1>
            <p className="text-black text-lg lg:text-xl leading-relaxed">
              There are many ways to contribute to the UXHI community. Check out our{" "}
              <InlineLink href="/events" variant="purple">
                upcoming events
              </InlineLink>{" "}
              or find other ways to get involved below.
            </p>

            {/* Quick Link Modules - hidden on mobile (iPhone) */}
            <div className="hidden sm:flex flex-wrap gap-4">
              <QuickLinkPill
                href="#volunteer"
                icon={<HandHeartIcon className="w-7 h-7" />}
                label="Volunteer"
                subtitle="Help grow our community"
              />
              <QuickLinkPill
                href="#speak"
                icon={<MicVocalIcon className="w-7 h-7" />}
                label="Become a Speaker"
                subtitle="Share your expertise"
              />
              <QuickLinkPill
                href="#sponsor"
                icon={<MessageSquareHeartIcon className="w-7 h-7" />}
                label="Sponsor Us"
                subtitle="Support UXHI events"
              />
              <QuickLinkPill
                href="#partner"
                icon={<HeartHandshakeIcon className="w-7 h-7" />}
                label="Partner"
                subtitle="Collaborate with us"
              />
              <QuickLinkPill
                href="#donate"
                icon={<HandCoinsIcon className="w-7 h-7" />}
                label="Donate"
                subtitle="Support our mission"
              />
            </div>
          </div>
        </div>

        {/* Mobile Bento - Horizontal layout (shown on <sm only) */}
        <div className="sm:hidden px-6 pb-8">
          <div className="flex gap-3.5 items-center w-full">
            {/* Pill-bottom shape */}
            <div className="flex-1 h-[140px] rounded-t-xl rounded-b-[99px] overflow-hidden relative">
              <Image
                src="/images/get-involved/bento-getinvolved-01.png"
                alt="UXHI conference"
                fill
                className="object-cover"
              />
            </div>
            {/* UXHI Motif Pattern */}
            <div className="w-[120px] shrink-0 flex items-center justify-center">
              <Image
                src="/images/motifs/uxhi-motif-1.svg"
                alt="UXHI motif"
                width={120}
                height={120}
                className="w-[120px] h-[120px]"
              />
            </div>
            {/* Full pill */}
            <div className="flex-1 h-[140px] rounded-[99px] overflow-hidden relative">
              <Image
                src="/images/get-involved/bento-getinvolved-02.png"
                alt="UXHI community crowd"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-0 xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only (left column items) */}
          <div className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            {/* Pill-bottom shape */}
            <div className="w-full h-[180px] rounded-t-[7px] rounded-b-[88px] overflow-hidden relative">
              <Image
                src="/images/get-involved/bento-getinvolved-01.png"
                alt="UXHI conference"
                fill
                className="object-cover"
              />
            </div>
            {/* UXHI Motif Pattern */}
            <div className="w-[114px] mx-auto flex items-center justify-center">
              <Image
                src="/images/motifs/uxhi-motif-1.svg"
                alt="UXHI motif"
                width={114}
                height={114}
                className="w-[114px] h-[114px]"
              />
            </div>
            {/* Full pill */}
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative opacity-90">
              <Image
                src="/images/get-involved/bento-getinvolved-02.png"
                alt="UXHI community crowd"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* MD+ layout - Two columns with absolute positioning */}
          <div className="hidden md:block relative w-full h-full">
            {/* Column 1 - Left (positioned higher, bottom-82px on MD, bottom-92px on LG) */}
            <div className="absolute bottom-[82px] lg:bottom-[92px] left-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              {/* Pill-bottom shape */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/get-involved/bento-getinvolved-01.png"
                  alt="UXHI conference"
                  fill
                  className="object-cover"
                />
              </div>
              {/* UXHI Motif Pattern */}
              <div className="w-[114px] lg:w-[128px] mx-auto flex items-center justify-center">
                <Image
                  src="/images/motifs/uxhi-motif-1.svg"
                  alt="UXHI motif"
                  width={128}
                  height={128}
                  className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]"
                />
              </div>
              {/* Full tall pill */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image
                  src="/images/get-involved/bento-getinvolved-02.png"
                  alt="UXHI community crowd"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Column 2 - Right (positioned at bottom) */}
            <div className="absolute bottom-0 right-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              {/* Small rectangle */}
              <div className="w-full h-[114px] lg:h-[128px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image
                  src="/images/get-involved/bento-getinvolved-03.png"
                  alt="UX101 group"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Medium rectangle */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image
                  src="/images/get-involved/bento-getinvolved-04.png"
                  alt="UXHI community members with leis"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Pill-bottom shape */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/get-involved/bento-getinvolved-05.png"
                  alt="UXHI photobooth"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer Section */}
      <section id="volunteer" className="pt-12 pb-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-140 mb-6">
            Volunteer
          </h2>
          <p className="text-gray-120 text-lg leading-relaxed mb-6">
            Support UXHI by volunteering! There are many ways to be involved:
          </p>
          <ul className="text-gray-120 space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>
                Propose a topic related to the field of UX as a presenter at our{" "}
                <InlineLink href="https://uxhi.hisony.com/conferences/2025/" variant="purple">UXHI Conference</InlineLink>{" "}
                or{" "}
                <InlineLink href="/events" variant="purple">events</InlineLink>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>
                Propose a topic as a guest author for our{" "}
                <InlineLink href="/resources" variant="purple">Resources</InlineLink>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>
                Join our committees for any of our initiatives, like the{" "}
                <InlineLink href="https://uxhi.hisony.com/conferences/2025/" variant="purple">UXHI Conference</InlineLink>{" "}
                or the{" "}
                <InlineLink href="/resources#report" variant="purple">State of UX Report</InlineLink>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>
                Provide general assistance with our{" "}
                <InlineLink href="/events" variant="purple">events</InlineLink>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>Support with marketing needs like our newsletter and social media</span>
            </li>
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>And much more!</span>
            </li>
          </ul>
          <p className="text-gray-120 text-lg mb-8">
            Let us know how you want to get involved!
          </p>
          <PrimaryCTA href="/about?interest=Becoming+a+volunteer#contact">
            Sign up to volunteer
          </PrimaryCTA>

          {/* Committees Subsection */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h3 className="text-sm uppercase tracking-wider font-bold text-purple-120 mb-3">
                Our Committees
              </h3>
              <p className="text-gray-110 max-w-[600px] mx-auto">
                Join one of our volunteer committees and help shape the future of UX in Hawai&apos;i
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {committees.length > 0 ? (
                committees.map((committee) => (
                  <SpotIllustrationCard
                    key={committee._id}
                    image={committee.icon ?? undefined}
                    imageAlt={committee.name}
                    title={committee.name}
                    description={committee.description}
                    variant="cream"
                  />
                ))
              ) : (
                fallbackCommittees.map((committee) => (
                  <SpotIllustrationCard
                    key={committee.name}
                    imageSrc={committee.icon}
                    imageAlt={committee.name}
                    title={committee.name}
                    description={committee.description}
                    variant="cream"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Opportunities Section */}
      <section id="speak" className="py-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-140 mb-6">
            Speaking Opportunities
          </h2>
          <p className="text-gray-120 text-lg leading-relaxed mb-4">
            Have an idea for a talk or a skill you&apos;d like to share?
          </p>
          <p className="text-gray-120 text-lg leading-relaxed mb-4">
            Whether you&apos;d like to teach an interactive workshop, host an education webinar, or a casual talk story session, give back to the community by sharing your experience. Preference is given to speakers with Hawai&apos;i ties.
          </p>
          <p className="text-gray-120 text-lg leading-relaxed mb-8">
            Fill out our speaker application below and we&apos;ll be in touch!
          </p>
          <PrimaryCTA href="/about?interest=Becoming+a+speaker#contact">
            Submit your idea
          </PrimaryCTA>
        </div>
      </section>

      {/* Speaker Photo Bento Grid */}
      <section className="px-6 pb-16 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:h-[500px]">
            {/* Left column — tall */}
            <div className="relative flex-1 min-h-0">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-l-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem_+_1px)] max-lg:rounded-t-[calc(2rem_+_1px)] lg:rounded-l-[calc(2rem_+_1px)]">
                <div className="relative aspect-[3/4] lg:aspect-auto w-full lg:flex-1">
                  <Image src="/images/get-involved/bentogrid-getinvolved-1.jpg" alt="UXHI speaker with lei" fill className="object-cover" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-l-[2rem]" />
            </div>
            {/* Center column — two stacked images */}
            <div className="flex flex-col gap-4 flex-1 min-h-0">
              <div className="relative flex-1 min-h-0">
                <div className="absolute inset-px rounded-lg bg-white" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem_+_1px)]">
                  <div className="relative aspect-[3/2] lg:aspect-auto w-full lg:flex-1">
                    <Image src="/images/get-involved/bentogrid-getinvolved-2.jpg" alt="UXHI conference audience" fill className="object-cover" />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
              </div>
              <div className="relative flex-1 min-h-0">
                <div className="absolute inset-px rounded-lg bg-white" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem_+_1px)]">
                  <div className="relative aspect-[3/2] lg:aspect-auto w-full lg:flex-1">
                    <Image src="/images/get-involved/bentogrid-getinvolved-3.jpg" alt="UXHI panelists speaking" fill className="object-cover" />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
              </div>
            </div>
            {/* Right column — tall */}
            <div className="relative flex-1 min-h-0">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem_+_1px)] max-lg:rounded-b-[calc(2rem_+_1px)] lg:rounded-r-[calc(2rem_+_1px)]">
                <div className="relative aspect-[3/4] lg:aspect-auto w-full lg:flex-1">
                  <Image src="/images/get-involved/bentogrid-getinvolved-4.jpg" alt="UX means no user gets left behind sticker" fill className="object-cover" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partner" className="py-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-140 mb-6">
            Partnerships
          </h2>
          <p className="text-gray-120 text-lg leading-relaxed mb-4">
            Strong collaboration makes for strong results!
          </p>
          <p className="text-gray-120 text-lg leading-relaxed mb-6">
            We&apos;re always open to design-forward organizations and individuals who want to partner with us to build initiatives, host or sponsor events, and help us provide resources to our community.
          </p>
          <ul className="text-gray-120 space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>Co-develop resources and/or programs for our membership</span>
            </li>
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>Co-host an event to feature your company at one of our events</span>
            </li>
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>Co-host a joint event to bring together both of our communities</span>
            </li>
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>Sponsor a workshop or speaker series focused on emerging UX topics</span>
            </li>
            <li className="flex items-start gap-3">
              <BulletPoint />
              <span>Provide venue space or tech tools to support our events</span>
            </li>
          </ul>

          <PrimaryCTA href="/about?interest=Becoming+partners+and+collaborators#contact">
            Let&apos;s connect
          </PrimaryCTA>
        </div>
      </section>

      {/* Successful Partnerships Section */}
      <section className="py-16 px-6 bg-gray-10">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="text-sm uppercase tracking-wider font-bold text-purple-120 text-center mb-12">
            Successful Partnerships
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
            {partners.length > 0 ? (
              partners.map((partner) => (
                <div
                  key={partner._id}
                  className="flex items-center justify-center"
                >
                  {partner.logo?.asset ? (
                    <Image
                      src={urlFor(partner.logo).width((partner.displayWidth || 100) * 2).url()}
                      alt={partner.name}
                      width={partner.displayWidth || 100}
                      height={40}
                      className={`object-contain grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${partner.darkGray ? 'opacity-70' : 'opacity-50'}`}
                      style={{ width: partner.displayWidth || 100, height: 'auto' }}
                    />
                  ) : (
                    <span className="text-gray-100 font-medium text-lg hover:text-gray-120 transition-colors">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))
            ) : (
              fallbackPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.width || 100}
                    height={partner.height || 40}
                    className="object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Sponsorships Section */}
      <section id="sponsor" className="py-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-140 mb-6">
            Sponsorships
          </h2>
          <p className="text-gray-120 text-lg leading-relaxed">
            Our sponsorship packages are designed to elevate your brand, showcase your products, and facilitate connections with influencers, decision-makers, and potential partners. By partnering with us, you&apos;ll not only enhance your brand recognition but also reinforce your dedication to improving the digital landscape through UX design.
          </p>
        </div>
      </section>

      {/* Past Event Sponsors Section */}
      <section className="py-16 px-6 bg-gray-10">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="text-sm uppercase tracking-wider font-bold text-purple-120 text-center mb-12">
            Past Event Sponsors
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
            {sponsors.length > 0 ? (
              sponsors.map((sponsor) => (
                <div
                  key={sponsor._id}
                  className="flex items-center justify-center"
                >
                  {sponsor.logo?.asset ? (
                    <Image
                      src={urlFor(sponsor.logo).width((sponsor.displayWidth || 100) * 2).url()}
                      alt={sponsor.name}
                      width={sponsor.displayWidth || 100}
                      height={40}
                      className={`object-contain grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${sponsor.darkGray ? 'opacity-70' : 'opacity-50'}`}
                      style={{ width: sponsor.displayWidth || 100, height: 'auto' }}
                    />
                  ) : (
                    <span className="text-gray-100 font-medium text-lg hover:text-gray-120 transition-colors">
                      {sponsor.name}
                    </span>
                  )}
                </div>
              ))
            ) : (
              fallbackSponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={sponsor.width || 100}
                    height={sponsor.height || 40}
                    className={`object-contain grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${sponsor.darkGray ? 'opacity-70' : 'opacity-50'}`}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Ready to Collaborate Section */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-[600px] mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <Image
              src="/images/icons/icon-collaborate.png"
              alt="Collaborate"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-display text-xl md:text-2xl text-purple-140 mb-4">
            Ready to collaborate?
          </h3>
          <p className="text-gray-120 leading-relaxed mb-6">
            We understand the value of tailored experiences and are open to working together to create a custom package.
          </p>
          <PrimaryCTA href="/about?interest=Becoming+partners+and+collaborators#contact">
            Collaborate with us
          </PrimaryCTA>
        </div>
      </section>

      {/* Donations Section */}
      <section id="donate" className="py-20 px-6 bg-purple-140 scroll-mt-24">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Donate Icon */}
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <Image
              src="/images/icons/icon-donate.png"
              alt="Donate"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Donations
          </h2>
          <p className="text-white text-xl font-medium mb-4">
            Your support is important to us.
          </p>
          <p className="text-purple-50 text-lg leading-relaxed mb-4 max-w-[650px] mx-auto">
            UXHI is a volunteer-run UX design community that connects people in Hawaiʻi and those with Hawaiʻi ties to learn together and make new UX friends.
          </p>
          <p className="text-purple-50 text-lg leading-relaxed mb-8 max-w-[650px] mx-auto">
            Your donations help offset the out-of-pocket costs the team spends on website hosting and expenses for in-person events. Thanks in advance for supporting our community!
          </p>
          <PrimaryCTA href="https://ko-fi.com/uxhicommunity" external>
            Donate
          </PrimaryCTA>
        </div>
      </section>
    </main>
  );
}
