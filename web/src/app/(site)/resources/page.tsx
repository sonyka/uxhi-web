import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { RESOURCE_ITEMS_QUERY, TECH_ORGANIZATIONS_QUERY, STATE_OF_UX_REPORTS_QUERY } from "@/sanity/lib/queries";
import { SanityImage } from "@/components/ui/SanityImage";

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

// Lucide Icons with 1.5px stroke
function GraduationCapIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function BookOpenTextIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 7v14" />
      <path d="M16 12h2" />
      <path d="M16 8h2" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
      <path d="M6 12h2" />
      <path d="M6 8h2" />
    </svg>
  );
}

function NotebookTabsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <path d="M15 2v20" />
      <path d="M15 7h5" />
      <path d="M15 12h5" />
      <path d="M15 17h5" />
      <rect width="16" height="20" x="4" y="2" rx="2" />
    </svg>
  );
}

// External Link Icon (Lucide arrow-up-right)
function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
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

// Online Programs
const onlinePrograms = [
  { name: "Google UX Design Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design", label: "coursera.org" },
  { name: "General Assembly UX Design Bootcamp", url: "https://generalassemb.ly/students/courses/user-experience-design-bootcamp", label: "generalassemb.ly" },
];

// Communities
const communities = [
  { name: "UXHI", url: "https://uxhi.community/" },
  { name: "Design Buddies", url: "https://www.designbuddies.community/" },
  { name: "Designer Slack", url: "https://www.designerslack.community/" },
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

export default async function ResourcesPage() {
  const [{ data: resourceItems }, { data: techOrganizations }, { data: reports }] = await Promise.all([
    sanityFetch({ query: RESOURCE_ITEMS_QUERY }),
    sanityFetch({ query: TECH_ORGANIZATIONS_QUERY }),
    sanityFetch({ query: STATE_OF_UX_REPORTS_QUERY }),
  ]);

  // Group resource items by category
  const groupedResources = (resourceItems || []).reduce((acc: Record<string, typeof resourceItems>, item: { category?: { slug?: string } }) => {
    const categorySlug = item.category?.slug || "uncategorized";
    if (!acc[categorySlug]) acc[categorySlug] = [];
    acc[categorySlug].push(item);
    return acc;
  }, {} as Record<string, typeof resourceItems>);

  // Use Sanity data or fall back to hardcoded data
  const displayTechOrgs = techOrganizations && techOrganizations.length > 0 ? techOrganizations : techOrgs;

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[700px] lg:min-h-[702px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-8 pt-24 pb-16 lg:pl-32 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[733px]">
          <div className="flex flex-col gap-6 max-w-[605px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-[48px] lg:leading-[84px] text-black">
              Resources
            </h1>
            <p className="text-black text-lg lg:text-[20px] leading-relaxed">
              Curated UX resources including student guides, industry reports, and a directory of tech organizations in Hawaii.
            </p>

            {/* Quick Link Modules */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#students"
                className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group"
              >
                <GraduationCapIcon className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" />
                <div className="text-left">
                  <span className="block text-[16px] font-medium text-black">UX for Students</span>
                  <span className="block text-[14px] text-[#6b7282]">Learning resources</span>
                </div>
              </a>
              <a
                href="#report"
                className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group"
              >
                <BookOpenTextIcon className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" />
                <div className="text-left">
                  <span className="block text-[16px] font-medium text-black">State of UX Report</span>
                  <span className="block text-[14px] text-[#6b7282]">Industry insights</span>
                </div>
              </a>
              <a
                href="#directory"
                className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-md transition-all group"
              >
                <NotebookTabsIcon className="w-7 h-7 text-gray-400 group-hover:text-purple-600 transition-colors" />
                <div className="text-left">
                  <span className="block text-[16px] font-medium text-black">Directory of Tech Orgs</span>
                  <span className="block text-[14px] text-[#6b7282]">Local connections</span>
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
                  src="/images/bento/ux101-group.jpg"
                  alt="UX101 group"
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
                  src="/images/bento/conference.jpg"
                  alt="UXHI conference"
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
                  src="/images/bento/group-leis.jpg"
                  alt="UXHI community members with leis"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Medium rectangle */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-lg overflow-hidden relative">
                <Image
                  src="/images/bento/crowd-community.jpg"
                  alt="UXHI community crowd"
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

      {/* UX for Students Section */}
      <section id="students" className="pt-12 pb-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-10">
            UX for Students
          </h2>

          {/* Online Resources */}
          <div className="mb-12">
            <h3 className="text-base uppercase tracking-widest font-bold text-purple-600 mb-6">Online Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(groupedResources['online-resources-students'] && groupedResources['online-resources-students'].length > 0
                ? groupedResources['online-resources-students']
                : onlineResources
              ).map((resource: { _id?: string; name?: string; title?: string; url?: string; description?: string; label?: string }) => (
                <a
                  key={resource._id || resource.name || resource.title}
                  href={resource.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-gray-100 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-gray-900">{resource.title || resource.name}</p>
                    <p className="text-sm text-teal-600">{resource.description || resource.label || new URL(resource.url || "").hostname}</p>
                  </div>
                  <ExternalLinkIcon className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Local Programs */}
          <div className="mb-12">
            <h3 className="text-base uppercase tracking-widest font-bold text-purple-600 mb-6">Local Programs & Degrees</h3>
            <div className="bg-teal-50 border border-teal-100 rounded-[20px] p-6 mb-6">
              <p className="text-gray-700 font-medium">Note: There are no local programs that specifically and solely focus on UX Design. Most are adjacent degrees that touch on similar theories and concepts.</p>
            </div>

            {groupedResources['local-programs-degrees'] && groupedResources['local-programs-degrees'].length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedResources['local-programs-degrees'].map((program: { _id?: string; title?: string; url?: string; description?: string }) => (
                  <a
                    key={program._id}
                    href={program.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-gray-100 transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{program.title}</p>
                      {program.description && (
                        <p className="text-sm text-teal-600">{program.description}</p>
                      )}
                    </div>
                    <ExternalLinkIcon className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Online Programs */}
          <div className="mb-12">
            <h3 className="text-base uppercase tracking-widest font-bold text-purple-600 mb-6">Online Programs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(groupedResources['online-programs-students'] && groupedResources['online-programs-students'].length > 0
                ? groupedResources['online-programs-students']
                : onlinePrograms
              ).map((program: { _id?: string; name?: string; title?: string; url?: string; description?: string; label?: string }) => (
                <a
                  key={program._id || program.name || program.title}
                  href={program.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-gray-100 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-gray-900">{program.title || program.name}</p>
                    <p className="text-sm text-teal-600">{program.description || program.label || new URL(program.url || "").hostname}</p>
                  </div>
                  <ExternalLinkIcon className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Communities */}
          <div>
            <h3 className="text-base uppercase tracking-widest font-bold text-purple-600 mb-6">Communities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {(groupedResources['design-communities'] && groupedResources['design-communities'].length > 0
                ? groupedResources['design-communities']
                : communities
              ).map((community: { _id?: string; name?: string; title?: string; url?: string; description?: string }) => (
                <a
                  key={community._id || community.name || community.title}
                  href={community.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-gray-100 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-gray-900">{community.title || community.name}</p>
                    {community.description && (
                      <p className="text-sm text-teal-600">{community.description}</p>
                    )}
                  </div>
                  <ExternalLinkIcon className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" />
                </a>
              ))}
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-[20px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-700 font-medium">Do you have more resources to suggest or corrections we should make?</p>
              <Link
                href="mailto:aloha@uxhi.community?subject=Resource%20Suggestion"
                className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
              >
                <span className="text-gray-900">Email Us</span>
                <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                  <ArrowIcon className="w-4 h-4 text-gray-900" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* UX for Practitioners & Businesses (Coming Soon) */}
      <section className="py-16 px-6 bg-white">
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
        <div className="max-w-[1100px] mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Education Findings */}
            <div className="bg-white/10 rounded-[20px] p-6">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/images/icons/icon-education-findings.png"
                  alt="Education Findings"
                  fill
                  className="object-contain"
                />
              </div>
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
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/images/icons/icon-career-findings.png"
                  alt="Career Findings"
                  fill
                  className="object-contain"
                />
              </div>
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

            {/* Top Challenges */}
            <div className="bg-white/10 rounded-[20px] p-6">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src="/images/icons/icon-challenges.png"
                  alt="Top Challenges"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-white font-semibold text-lg mb-4">Top Challenges</h3>
              <ul className="text-purple-100 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-1.5 flex-shrink-0" />
                  <span>Many business leaders do not know what UX is</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-1.5 flex-shrink-0" />
                  <span>UX is not prioritized or funded</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-1.5 flex-shrink-0" />
                  <span>The UX job market in Hawai&apos;i is limited</span>
                </li>
              </ul>
            </div>
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

          {/* Report Preview Image */}
          <div className="mt-12 rounded-[20px] overflow-hidden">
            <Image
              src="/images/bento/state-of-ux.png"
              alt="State of UX in Hawaii Report preview"
              width={1100}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Directory of Tech Organizations */}
      <section id="directory" className="py-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-4">
            Directory of Local Tech Organizations
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            The tech ecosystem and community in Hawai&apos;i is thriving and growing! This list is a work in progress for UXers to connect with the many communities that advance our shared mission.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {displayTechOrgs.map((org: { _id?: string; name: string; website?: string; url?: string; logo?: { asset?: { _id?: string; url?: string } } }) => (
              <a
                key={org._id || org.name}
                href={org.website || org.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-cream rounded-[16px] p-5 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {org.logo?.asset && (
                    <SanityImage
                      value={org.logo}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <p className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors">{org.name}</p>
                </div>
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
