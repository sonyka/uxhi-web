import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | UX Hawaii",
  description:
    "Curated UX resources including student guides, industry reports, and a directory of tech organizations in Hawaii.",
};

// Arrow Icon Component
function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// External Link Icon
function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

// Online Resources
const onlineResources = [
  { name: "Visual Design", url: "https://shiftnudge.com", label: "shiftnudge.com" },
  { name: "Interaction Design", url: "https://interaction-design.org", label: "interaction-design.org" },
  { name: "UX Design", url: "https://nngroup.com", label: "nngroup.com" },
  { name: "Figma", url: "https://help.figma.com", label: "help.figma.com" },
  { name: "Articles", url: "https://uxdesign.cc", label: "uxdesign.cc" },
];

// Local Programs
const localPrograms = [
  { name: "KCC New Media Arts (NMA) Program", url: "https://www.kapiolani.hawaii.edu/academics/programs-of-study/new-media-arts/" },
  { name: "LCC Digital Media Program", url: "https://www.leeward.hawaii.edu/" },
  { name: "UH West Oahu", url: "https://www.uhwo.hawaii.edu/" },
  { name: "Chaminade: Environmental + Interior Design (AA, BFA)", url: "https://chaminade.edu/" },
  { name: "Hawaii Pacific University courses", url: "https://www.hpu.edu/" },
];

// Tech Organizations
const techOrgs = [
  { name: "Hawai'i Tech Development Corporation (HTDC)", url: "https://htdc.org" },
  { name: "Hawai'i Angel", url: "https://hawaiiangel.com" },
  { name: "Blue Startups / East Meets West", url: "https://bluestartups.com" },
  { name: "Pi'iku", url: "https://piiku.co" },
  { name: "Hawaiians in Tech", url: "https://hawaiiansintech.org" },
  { name: "TRUE Hawaii", url: "https://truehawaii.org" },
  { name: "Hawaii Women in Tech", url: "https://hawaiiwomenintechnology.org" },
  { name: "Honolulu Tech Network", url: "https://www.meetup.com/honolulu-tech-network/" },
  { name: "Honolulu Bitcoin", url: "https://www.meetup.com/honolulu-bitdevs/" },
  { name: "Hawaii Center for AI", url: "https://hawaiiai.org" },
  { name: "Hawaii AI and XR", url: "https://hawaiiai.org" },
  { name: "Pacific Asian Center for Entrepreneurship (PACE)", url: "https://pace.shidler.hawaii.edu" },
  { name: "Honolulu Tech Week", url: "https://honolulutechweek.com" },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row pt-24 lg:pt-0 lg:min-h-[85vh]">
        {/* Left Side - Content */}
        <div className="lg:w-[60%] flex items-center px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-[560px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-[1.1]">
              Resources
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Curated UX resources including student guides, industry reports, and a directory of tech organizations in Hawaii.
            </p>
            <Link
              href="#students"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Explore resources
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
                  src="/images/bento/ux101-group.jpg"
                  alt="UX101 group"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Tall pill shape */}
              <div className="w-full h-[320px] lg:h-[400px] rounded-[999px] overflow-hidden relative">
                <Image
                  src="/images/bento/conference.jpg"
                  alt="UXHI conference"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-4 pt-8">
              {/* Rounded rectangle - cut off at top */}
              <div className="w-full h-[160px] lg:h-[200px] rounded-[24px] overflow-hidden lg:-mt-16 relative">
                <Image
                  src="/images/bento/crowd-community.jpg"
                  alt="UXHI community crowd"
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
              {/* Rounded rectangle */}
              <div className="w-full h-[180px] lg:h-[220px] rounded-[24px] overflow-hidden relative">
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

      {/* Quick Links */}
      <section className="py-8 px-6 bg-purple-700">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#students" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              UX for Students
            </a>
            <a href="#report" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              State of UX Report
            </a>
            <a href="#directory" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Directory of Tech Orgs
            </a>
          </div>
        </div>
      </section>

      {/* UX for Students Section */}
      <section id="students" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-10">
            UX for Students
          </h2>

          {/* Online Resources */}
          <div className="mb-12">
            <h3 className="font-semibold text-xl text-gray-900 mb-6">Online Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {onlineResources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-gray-100 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-gray-900">{resource.name}</p>
                    <p className="text-sm text-teal-600">{resource.label}</p>
                  </div>
                  <ExternalLinkIcon className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Local Programs */}
          <div>
            <h3 className="font-semibold text-xl text-gray-900 mb-4">Local Programs/Degrees</h3>
            <p className="text-gray-600 text-sm mb-6 bg-purple-50 border border-purple-100 rounded-[12px] p-4">
              <strong>Note:</strong> There are no local programs that specifically and solely focus on UX Design. Most are adjacent degrees that touch on similar theories and concepts.
            </p>
            <ul className="space-y-3">
              {localPrograms.map((program) => (
                <li key={program.name}>
                  <a
                    href={program.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-teal-600 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
                    {program.name}
                    <ExternalLinkIcon className="w-3.5 h-3.5 text-gray-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* UX for Practitioners & Businesses (Coming Soon) */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[20px] p-8 border border-gray-200">
              <h3 className="font-display text-2xl text-purple-700 mb-3">UX for Practitioners</h3>
              <p className="text-gray-500">Coming soon</p>
            </div>
            <div className="bg-white rounded-[20px] p-8 border border-gray-200">
              <h3 className="font-display text-2xl text-purple-700 mb-3">UX for Businesses</h3>
              <p className="text-gray-500">Coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* State of UX Report Section */}
      <section id="report" className="py-20 px-6 bg-purple-700 scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            State of UX in Hawaii Report
          </h2>
          <p className="text-purple-100 text-lg leading-relaxed mb-4">
            To answer that question, we conducted our own study on the status of UX jobs, hiring, education, awareness, and audiences to give us a better understanding of how our programming could best support UXers in Hawai&apos;i.
          </p>
          <p className="text-purple-200 mb-10">
            The report is currently done on a bi-annual basis to gain a better understanding of our UX design community.
          </p>

          {/* Findings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Education Findings */}
            <div className="bg-white/10 rounded-[20px] p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Education Findings</h3>
              <ul className="text-purple-100 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-1.5 flex-shrink-0" />
                  <span>75% of individual contributors surveyed have a bachelor&apos;s degree or higher</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-1.5 flex-shrink-0" />
                  <span>42% of managers have a master&apos;s degree or higher</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-1.5 flex-shrink-0" />
                  <span>40% of VPs, Directors, and C-level founders have a bachelor&apos;s degree as the highest level of education</span>
                </li>
              </ul>
            </div>

            {/* Career Findings */}
            <div className="bg-white/10 rounded-[20px] p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Career Findings</h3>
              <ul className="text-purple-100 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-1.5 flex-shrink-0" />
                  <span>33% of surveyors live on the islands, but do not work for a company that operates in Hawai&apos;i</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-1.5 flex-shrink-0" />
                  <span>UXers in Hawai&apos;i are working harder - to find consistent employment, to be a &quot;jack of all trades&quot; or as a department of one or within small teams</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-1.5 flex-shrink-0" />
                  <span>Are earning an average of $75,000 versus $109,776 as the national average</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Top Challenges */}
          <div className="bg-white/10 rounded-[20px] p-6 mb-10">
            <h3 className="text-white font-semibold text-lg mb-4">Top Challenges</h3>
            <ul className="text-purple-100 space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-2 flex-shrink-0" />
                <span>Many business leaders do not know what UX is</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-2 flex-shrink-0" />
                <span>UX is not prioritized or funded</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-2 flex-shrink-0" />
                <span>The UX job market in Hawai&apos;i is limited</span>
              </li>
            </ul>
          </div>

          {/* How Report Helps */}
          <div className="mb-10">
            <p className="text-purple-100 mb-4">The State of UX report charts our progress towards advancing the field of UX by:</p>
            <ul className="text-purple-100 space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-2 flex-shrink-0" />
                <span>Inspiring local business leaders to find and hire UX professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-2 flex-shrink-0" />
                <span>Generate opportunities for new UXers to gain experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-2 flex-shrink-0" />
                <span>Host collaborative events to strengthen the UX community</span>
              </li>
            </ul>
          </div>

          {/* Download CTA */}
          <Link
            href="https://drive.google.com/uxhi-reports"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Download Reports</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* Directory of Tech Organizations */}
      <section id="directory" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-4">
            Directory of Tech Organizations
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            The tech ecosystem and community in Hawai&apos;i is thriving and growing! This list is a work in progress for UXers to connect with the many communities that advance our shared mission.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {techOrgs.map((org) => (
              <a
                key={org.name}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-gray-100 transition-colors group"
              >
                <p className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors">{org.name}</p>
                <ExternalLinkIcon className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>

          {/* Something Missing CTA */}
          <div className="bg-teal-50 border border-teal-100 rounded-[20px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-700 font-medium">Something missing?</p>
            <Link
              href="mailto:aloha@uxhi.community?subject=Tech%20Organization%20Suggestion"
              className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-900">Email Us</span>
              <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
