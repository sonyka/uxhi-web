import Image from "next/image";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { RESOURCE_ITEMS_QUERY, TECH_ORGANIZATIONS_QUERY, STATE_OF_UX_REPORTS_QUERY } from "@/sanity/lib/queries";
import { SanityImage } from "@/components/ui/SanityImage";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { QuickLinkPill } from "@/components/ui/QuickLinkPill";
import { LinkCard } from "@/components/ui/LinkCard";
import { InfoBox } from "@/components/ui/InfoBox";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { SpotIllustrationCard } from "@/components/ui/cards/SpotIllustrationCard";
import { BulletPoint } from "@/components/ui/BulletPoint";

export const metadata: Metadata = {
  title: "Resources | UX Hawaii",
  description:
    "Curated UX resources including student guides, industry reports, and a directory of tech organizations in Hawaii.",
};

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
      <div className="relative min-h-[564px] sm:min-h-[746px] md:min-h-[747px] lg:min-h-[700px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-6 pt-32 pb-8 sm:max-w-[411px] md:max-w-[calc(100%-340px)] md:pl-10 lg:pl-24 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[583px] xl:max-w-[733px]">
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl leading-[40px] lg:text-5xl lg:leading-[60px] xl:leading-[84px] text-black">
              Resources
            </h1>
            <p className="text-black text-lg lg:text-xl leading-relaxed">
              Curated UX resources including student guides, industry reports, and a directory of tech organizations in Hawaii.
            </p>

            {/* Quick Link Modules - hidden on mobile */}
            <div className="hidden sm:flex flex-wrap gap-4">
              <QuickLinkPill
                href="#students"
                icon={<GraduationCapIcon className="w-7 h-7" />}
                label="UX for Students"
                subtitle="Learning resources"
              />
              <QuickLinkPill
                href="#report"
                icon={<BookOpenTextIcon className="w-7 h-7" />}
                label="State of UX Report"
                subtitle="Industry insights"
              />
              <QuickLinkPill
                href="#directory"
                icon={<NotebookTabsIcon className="w-7 h-7" />}
                label="Directory of Tech Orgs"
                subtitle="Local connections"
              />
            </div>
          </div>
        </div>

        {/* Mobile Bento - Horizontal layout (shown on <sm only) */}
        <div className="sm:hidden px-6 pb-8">
          <div className="flex gap-3.5 items-center w-full">
            <div className="flex-1 h-[140px] rounded-t-xl rounded-b-[99px] overflow-hidden relative">
              <Image src="/images/resources/bento-resources-01.png" alt="UX101 group" fill className="object-cover" />
            </div>
            <div className="w-[120px] shrink-0 flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-1.svg" alt="UXHI motif" width={120} height={120} className="w-[120px] h-[120px]" />
            </div>
            <div className="flex-1 h-[140px] rounded-[99px] overflow-hidden relative">
              <Image src="/images/resources/bento-resources-02.png" alt="UXHI conference" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-0 xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only */}
          <div className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            <div className="w-full h-[180px] rounded-t-[7px] rounded-b-[88px] overflow-hidden relative">
              <Image src="/images/resources/bento-resources-01.png" alt="UX101 group" fill className="object-cover" />
            </div>
            <div className="w-[114px] mx-auto flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-1.svg" alt="UXHI motif" width={114} height={114} className="w-[114px] h-[114px]" />
            </div>
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative opacity-90">
              <Image src="/images/resources/bento-resources-02.png" alt="UXHI conference" fill className="object-cover" />
            </div>
          </div>

          {/* MD+ layout - Two columns with absolute positioning */}
          <div className="hidden md:block relative w-full h-full">
            {/* Column 1 - Left (positioned higher) */}
            <div className="absolute bottom-[82px] lg:bottom-[92px] left-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/resources/bento-resources-01.png" alt="UX101 group" fill className="object-cover" />
              </div>
              <div className="w-[114px] lg:w-[128px] mx-auto flex items-center justify-center">
                <Image src="/images/bento/uxhi-motif-1.svg" alt="UXHI motif" width={128} height={128} className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image src="/images/resources/bento-resources-02.png" alt="UXHI conference" fill className="object-cover" />
              </div>
            </div>
            {/* Column 2 - Right (positioned at bottom) */}
            <div className="absolute bottom-0 right-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[114px] lg:h-[128px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/resources/bento-resources-03.png" alt="UXHI community members with leis" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/resources/bento-resources-04.png" alt="UXHI community crowd" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/resources/bento-resources-05.png" alt="UXHI photobooth" fill className="object-cover" />
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
                <LinkCard
                  key={resource._id || resource.name || resource.title}
                  href={resource.url || "#"}
                  title={resource.title || resource.name || ""}
                  description={resource.description || resource.label || new URL(resource.url || "").hostname}
                />
              ))}
            </div>
          </div>

          {/* Local Programs */}
          <div className="mb-12">
            <h3 className="text-base uppercase tracking-widest font-bold text-purple-600 mb-6">Local Programs & Degrees</h3>
            <InfoBox className="mb-6">
              <p className="text-base text-gray-700 font-medium">Note: There are no local programs that specifically and solely focus on UX Design. Most are adjacent degrees that touch on similar theories and concepts.</p>
            </InfoBox>

            {groupedResources['local-programs-degrees'] && groupedResources['local-programs-degrees'].length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedResources['local-programs-degrees'].map((program: { _id?: string; title?: string; url?: string; description?: string }) => (
                  <LinkCard
                    key={program._id}
                    href={program.url || "#"}
                    title={program.title || ""}
                    description={program.description}
                  />
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
                <LinkCard
                  key={program._id || program.name || program.title}
                  href={program.url || "#"}
                  title={program.title || program.name || ""}
                  description={program.description || program.label || new URL(program.url || "").hostname}
                />
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
                <LinkCard
                  key={community._id || community.name || community.title}
                  href={community.url || "#"}
                  title={community.title || community.name || ""}
                  description={community.description}
                />
              ))}
            </div>
            <InfoBox className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-base text-gray-700 font-medium">Do you have more resources to suggest or corrections we should make?</p>
              <PrimaryCTA href="mailto:aloha@uxhi.community?subject=Resource%20Suggestion" external>
                Email Us
              </PrimaryCTA>
            </InfoBox>
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
            <SpotIllustrationCard
              variant="translucent"
              imageSrc="/images/icons/icon-education-findings.png"
              imageAlt="Education Findings"
              title="Education Findings"
              className="rounded-[20px]"
            >
              <ul className="space-y-3 text-base text-left">
                <li className="flex items-start gap-3">
                  <BulletPoint variant="yellow" />
                  <span><span className="font-black text-white">75%</span> of individual contributors surveyed have a bachelor&apos;s degree or higher</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletPoint variant="yellow" />
                  <span><span className="font-black text-white">42%</span> of managers have a master&apos;s degree or higher</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletPoint variant="yellow" />
                  <span><span className="font-black text-white">40%</span> of VPs, Directors, and C-level founders have a bachelor&apos;s degree as the highest level of education</span>
                </li>
              </ul>
            </SpotIllustrationCard>

            {/* Career Findings */}
            <SpotIllustrationCard
              variant="translucent"
              imageSrc="/images/icons/icon-career-findings.png"
              imageAlt="Career Findings"
              title="Career Findings"
              className="rounded-[20px]"
            >
              <ul className="space-y-3 text-base text-left">
                <li className="flex items-start gap-3">
                  <BulletPoint variant="yellow" />
                  <span><span className="font-black text-white">33%</span> of surveyors live on the islands, but do not work for a company that operates in Hawai&apos;i</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletPoint variant="yellow" />
                  <span>UXers in Hawai&apos;i are working harder - to find consistent employment, to be a &quot;jack of all trades&quot; or as a department of one or within small teams</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletPoint variant="yellow" />
                  <span>Are earning an average of <span className="font-black text-white">$75,000</span> versus <span className="font-black text-white">$109,776</span> as the national average</span>
                </li>
              </ul>
            </SpotIllustrationCard>

            {/* Top Challenges */}
            <SpotIllustrationCard
              variant="translucent"
              imageSrc="/images/icons/icon-challenges.png"
              imageAlt="Top Challenges"
              title="Top Challenges"
              className="rounded-[20px]"
            >
              <ul className="space-y-3 text-base text-left">
                <li className="flex items-start gap-3">
                  <BulletPoint variant="yellow" />
                  <span>Many business leaders do not know what UX is</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletPoint variant="yellow" />
                  <span>UX is not prioritized or funded</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletPoint variant="yellow" />
                  <span>The UX job market in Hawai&apos;i is limited</span>
                </li>
              </ul>
            </SpotIllustrationCard>
          </div>

          {/* How Report Helps */}
          <div className="mb-10">
            <p className="text-purple-100 mb-4">The State of UX report charts our progress towards advancing the field of UX by:</p>
            <ul className="text-purple-100 space-y-2">
              <li className="flex items-start gap-3">
                <BulletPoint variant="yellow" />
                <span>Inspiring local business leaders to find and hire UX professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <BulletPoint variant="yellow" />
                <span>Generate opportunities for new UXers to gain experience</span>
              </li>
              <li className="flex items-start gap-3">
                <BulletPoint variant="yellow" />
                <span>Host collaborative events to strengthen the UX community</span>
              </li>
            </ul>
          </div>

          {/* View Report CTA */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrimaryCTA href="https://drive.google.com/file/d/1pfHDt2yB-maAs2gOhywdJJv7HzY4wG7s/" external>
              2025 State of UXHI Report
            </PrimaryCTA>
            <PrimaryCTA href="#" external variant="dark">
              2023 State of UXHI Report
            </PrimaryCTA>
          </div>

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
          <InfoBox className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-base text-gray-700 font-medium">Something missing?</p>
            <PrimaryCTA href="mailto:aloha@uxhi.community?subject=Tech%20Organization%20Suggestion" external>
              Email Us
            </PrimaryCTA>
          </InfoBox>
        </div>
      </section>
    </main>
  );
}
