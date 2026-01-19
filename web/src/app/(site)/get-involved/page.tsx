import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved | UX Hawaii",
  description:
    "Join the UXHI community! Volunteer, speak at events, sponsor, partner, or donate to support UX in Hawaii.",
};

// Arrow Icon Component
function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

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

// Committee data with expanded descriptions and icons
const committees = [
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
    description: "Plans and executes our annual UXHICon conference, bringing together speakers, sponsors, and attendees for Hawai'i's premier UX event. Help shape the program, coordinate logistics, and create memorable experiences for our community.",
    icon: "/images/icons/icon-events.png", // placeholder - replace with icon-conference.png
  },
];

// Past partners
const pastPartners = [
  "Pi'iku Co.",
  "Hawaii Coworking",
  "Entrepreneur Sandbox / Hub Coworking Hawaii",
  "Vanta",
  "University of Hawaii",
  "Holoholo App",
  "AI Hawaii",
  "Honolulu Tech Network",
  "Honolulu BitDevs",
];

// Past sponsors with logos
const pastSponsors = [
  { name: "HTDC", logo: null },
  { name: "Entrepreneurs Sandbox", logo: null },
  { name: "Purple Mai'a", logo: null },
  { name: "Zippy's", logo: "/images/company_logos/Zippy Logo RGB.svg", width: 80, height: 40 },
  { name: "Servco", logo: "/images/company_logos/servco.svg", width: 90, height: 28 },
  { name: "Terranox", logo: null },
  { name: "Shaka Guide", logo: null },
];

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[700px] lg:min-h-[702px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-8 pt-24 pb-16 lg:pl-32 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[733px]">
          <div className="flex flex-col gap-6 max-w-[605px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-[48px] lg:leading-[84px] text-black">
              Get Involved
            </h1>
            <p className="text-black text-lg lg:text-[20px] leading-relaxed">
              There are many ways to contribute to the UXHI community. Check out our{" "}
              <Link href="/events" className="text-black underline underline-offset-2 hover:text-purple-700 transition-colors">
                upcoming events
              </Link>{" "}
              or find other ways to get involved below.
            </p>

            {/* Quick Link Modules */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#volunteer"
                className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group"
              >
                <HandHeartIcon className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" />
                <div className="text-left">
                  <span className="block text-[16px] font-medium text-black">Volunteer</span>
                  <span className="block text-[14px] text-[#6b7282]">Help grow our community</span>
                </div>
              </a>
              <a
                href="#speak"
                className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group"
              >
                <MicVocalIcon className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" />
                <div className="text-left">
                  <span className="block text-[16px] font-medium text-black">Become a Speaker</span>
                  <span className="block text-[14px] text-[#6b7282]">Share your expertise</span>
                </div>
              </a>
              <a
                href="#sponsor"
                className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group"
              >
                <MessageSquareHeartIcon className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" />
                <div className="text-left">
                  <span className="block text-[16px] font-medium text-black">Sponsor Us</span>
                  <span className="block text-[14px] text-[#6b7282]">Support UXHI events</span>
                </div>
              </a>
              <a
                href="#partner"
                className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group"
              >
                <HeartHandshakeIcon className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" />
                <div className="text-left">
                  <span className="block text-[16px] font-medium text-black">Partner</span>
                  <span className="block text-[14px] text-[#6b7282]">Collaborate with us</span>
                </div>
              </a>
              <a
                href="#donate"
                className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group"
              >
                <HandCoinsIcon className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" />
                <div className="text-left">
                  <span className="block text-[16px] font-medium text-black">Donate</span>
                  <span className="block text-[14px] text-[#6b7282]">Support our mission</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Bento Grid (Variation 1) */}
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
                  src="/images/bento/ux101-group.jpg"
                  alt="UX101 group"
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

      {/* Volunteer Section */}
      <section id="volunteer" className="pt-12 pb-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-6">
            Volunteer
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Support UXHI by volunteering! There are many ways to be involved:
          </p>
          <ul className="text-gray-700 space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Propose a topic related to the field of UX as a presenter at our UXHI Conference or events</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Propose a topic as a guest author for our Resources</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Join our committees for any of our initiatives, like the UXHI Conference or the State of UX Report</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Provide general assistance with our events</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Support with marketing needs like our newsletter and social media</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>And much more!</span>
            </li>
          </ul>
          <p className="text-gray-700 text-lg mb-8">
            Let us know how you want to get involved!
          </p>

          {/* Committees Subsection */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h3 className="text-base uppercase tracking-widest font-bold text-purple-600 mb-3">
                Our Committees
              </h3>
              <p className="text-gray-600 max-w-[600px] mx-auto">
                Join one of our volunteer committees and help shape the future of UX in Hawai&apos;i
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {committees.map((committee) => (
                <div
                  key={committee.name}
                  className="bg-cream rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 mb-4 relative">
                    <Image
                      src={committee.icon}
                      alt={committee.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                    {committee.name}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {committee.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Opportunities Section */}
      <section id="speak" className="py-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-6">
            Speaking Opportunities
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Have an idea for a talk or a skill you&apos;d like to share?
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Whether you&apos;d like to teach an interactive workshop, host an education webinar, or a casual talk story session, give back to the community by sharing your experience. Preference is given to speakers with Hawai&apos;i ties.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Fill out our speaker application below and we&apos;ll be in touch!
          </p>
          <Link
            href="https://forms.gle/speaker-application"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Inquiry Form</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partner" className="py-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-6">
            Partnerships
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Strong collaboration makes for strong results!
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We&apos;re always open to design-forward organizations and individuals who want to partner with us to build initiatives, host or sponsor events, and help us provide resources to our community.
          </p>
          <ul className="text-gray-700 space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Co-develop resources and/or programs for our membership</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Co-host an event to feature your company at one of our events</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Co-host a joint event to bring together both of our communities</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Sponsor a workshop or speaker series focused on emerging UX topics</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Provide venue space or tech tools to support our events</span>
            </li>
          </ul>

          {/* Past Partners */}
          <div className="mb-10">
            <p className="text-gray-700 mb-3">
              <span className="font-semibold">Successful partnerships include:</span>{" "}
              {pastPartners.join(", ")}
            </p>
          </div>

          <Link
            href="https://forms.gle/partnership-inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Inquiry Form</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* Sponsorships Section */}
      <section id="sponsor" className="py-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-6">
            Sponsorships
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our sponsorship packages are designed to elevate your brand, showcase your products, and facilitate connections with influencers, decision-makers, and potential partners. By partnering with us, you&apos;ll not only enhance your brand recognition but also reinforce your dedication to improving the digital landscape through UX design.
          </p>

          {/* Past Sponsors */}
          <div className="mb-10">
            <h3 className="text-base uppercase tracking-widest font-bold text-purple-600 mb-6">
              Past Event Sponsors
            </h3>
            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              {pastSponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="flex items-center justify-center"
                >
                  {sponsor.logo ? (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={sponsor.width || 100}
                      height={sponsor.height || 40}
                      className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <span className="text-gray-500 font-medium text-lg hover:text-gray-700 transition-colors">
                      {sponsor.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Partner With Us Subsection */}
          <div className="bg-cream rounded-[24px] p-8 mt-10">
            <h3 className="font-display text-xl md:text-2xl text-purple-700 mb-4">
              Partner With Us
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We understand the value of tailored experiences and are open to working together to create a custom package.
            </p>
            <Link
              href="mailto:aloha@uxhi.community?subject=Sponsorship%20Inquiry"
              className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-900">Email us</span>
              <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Donations Section */}
      <section id="donate" className="py-20 px-6 bg-teal-500 scroll-mt-24">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Donations
          </h2>
          <p className="text-white text-xl font-medium mb-4">
            Your support is important to us.
          </p>
          <p className="text-white/90 text-lg leading-relaxed mb-4 max-w-[650px] mx-auto">
            UXHI is a volunteer-run UX design community that connects people in Hawaii and those with Hawaii ties to learn together and make new UX friends.
          </p>
          <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-[650px] mx-auto">
            Your donations help offset the out-of-pocket costs the team spends on website hosting and expenses for in-person events. Thanks in advance for supporting our community!
          </p>
          <Link
            href="https://donate.stripe.com/uxhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Donate</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
