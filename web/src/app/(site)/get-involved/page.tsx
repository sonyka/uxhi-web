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

// Committee data with expanded descriptions
const committees = [
  {
    name: "Educational Outreach",
    description: "Fosters UX education at foundational levels. Initiatives focus on engaging K-12 students through introductory workshops and programs, and collaborating with colleges and universities to support their UX curricula, offer guest lectures, and connect with emerging talent.",
  },
  {
    name: "Workforce Outreach",
    description: "Develop and deliver educational workshops and presentations to companies, helping them integrate UX principles, methodologies, and best practices into their operations.",
  },
  {
    name: "Community Engagement",
    description: "Organize social events, networking opportunities, member spotlights, and initiatives to welcome new members and ensure active participation.",
  },
  {
    name: "Professional Development",
    description: "Provides continuous learning and upskilling opportunities for our members through workshops, webinars, speaker events, and hands-on sessions designed to enhance practical UX skills.",
  },
  {
    name: "Communications",
    description: "Manages all external and internal communications for the community including maintaining the website, managing social media channels, creating newsletters, promoting events, and ensuring consistent branding and messaging.",
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

// Past sponsors
const pastSponsors = [
  "HTDC",
  "Entrepreneurs Sandbox",
  "Purple Mai'a",
  "Zippy's",
  "Servco",
  "Terranox",
  "Shaka Guide",
];

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row pt-24 lg:pt-0 lg:min-h-[85vh]">
        {/* Left Side - Content */}
        <div className="lg:w-[60%] flex items-center px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-[560px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-[1.1]">
              Get Involved
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              There are many ways to contribute to the UXHI community. Check out our{" "}
              <Link href="/events" className="text-teal-500 underline underline-offset-2 hover:text-teal-600">
                upcoming events
              </Link>{" "}
              or find other ways to get involved below.
            </p>
            <Link
              href="#volunteer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Start volunteering
              <span className="w-7 h-7 bg-[#f5c542] rounded-full flex items-center justify-center">
                <ArrowIcon className="w-3.5 h-3.5 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="lg:w-[40%] flex items-start justify-end pr-0 lg:pr-0 py-8 lg:py-0 overflow-hidden">
          <div className="grid grid-cols-2 gap-4 w-full max-w-[480px] lg:max-w-none lg:w-[480px] px-8 lg:px-0 lg:mr-[-40px]">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              {/* Rounded rectangle - cut off at top */}
              <div className="w-full h-[180px] lg:h-[220px] rounded-[24px] overflow-hidden lg:-mt-12 relative">
                <Image
                  src="/images/bento/conference.jpg"
                  alt="UXHI conference"
                  fill
                  className="object-cover"
                />
              </div>
              {/* UXHI Motif */}
              <div className="w-full aspect-square flex items-center justify-center">
                <Image
                  src="/images/bento/uxhi-motif-1.svg"
                  alt="UXHI motif"
                  width={200}
                  height={200}
                  className="w-full h-auto max-w-[200px]"
                />
              </div>
              {/* Tall pill shape */}
              <div className="w-full h-[280px] lg:h-[320px] rounded-[999px] overflow-hidden relative">
                <Image
                  src="/images/bento/crowd-community.jpg"
                  alt="UXHI community crowd"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-4 pt-8">
              {/* Rounded rectangle 1 */}
              <div className="w-full h-[200px] lg:h-[288px] rounded-[24px] overflow-hidden relative">
                <Image
                  src="/images/bento/group-leis.jpg"
                  alt="UXHI community members with leis"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Rounded rectangle 2 */}
              <div className="w-full h-[200px] lg:h-[288px] rounded-[24px] overflow-hidden relative">
                <Image
                  src="/images/bento/ux101-group.jpg"
                  alt="UX101 group"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <section className="py-8 px-6 bg-purple-700">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#volunteer" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Volunteer
            </a>
            <a href="#speak" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Speaking Opportunities
            </a>
            <a href="#partner" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Partnerships
            </a>
            <a href="#sponsor" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Sponsorships
            </a>
            <a href="#donate" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Donations
            </a>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 px-6 bg-cream scroll-mt-24">
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
            <h3 className="font-display text-2xl md:text-3xl text-purple-700 mb-8">
              Committees
            </h3>
            <div className="space-y-4">
              {committees.map((committee) => (
                <div key={committee.name} className="bg-white rounded-[20px] p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{committee.name}</h4>
                  <p className="text-gray-600 leading-relaxed">{committee.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Opportunities Section */}
      <section id="speak" className="py-20 px-6 scroll-mt-24">
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
      <section id="partner" className="py-20 px-6 bg-cream scroll-mt-24">
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
      <section id="sponsor" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-6">
            Sponsorships
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our sponsorship packages are designed to elevate your brand, showcase your products, and facilitate connections with influencers, decision-makers, and potential partners. By partnering with us, you&apos;ll not only enhance your brand recognition but also reinforce your dedication to improving the digital landscape through UX design.
          </p>

          {/* Past Sponsors */}
          <div className="mb-10">
            <p className="text-gray-700">
              <span className="font-semibold">Past event sponsors:</span>{" "}
              {pastSponsors.join(", ")}
            </p>
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
