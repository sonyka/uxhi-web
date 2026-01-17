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

// Sample resources for each category
const studentResources = [
  {
    title: "Getting Started in UX",
    description: "A beginner's guide to understanding UX design fundamentals and career paths.",
    type: "Guide",
  },
  {
    title: "UX Portfolio Tips",
    description: "Learn how to build an impressive UX portfolio that stands out to employers.",
    type: "Article",
  },
  {
    title: "Figma for Beginners",
    description: "Free course covering the basics of Figma for aspiring UX/UI designers.",
    type: "Course",
  },
  {
    title: "UX Research Methods",
    description: "An overview of different UX research methods and when to use them.",
    type: "Guide",
  },
];

const techOrgs = [
  {
    name: "Hawaii Technology Development Corporation",
    description: "Supporting technology innovation and economic development in Hawaii.",
    website: "https://htdc.org",
  },
  {
    name: "Purple Mai'a",
    description: "Empowering Native Hawaiian and underserved youth through technology education.",
    website: "https://purplemaia.org",
  },
  {
    name: "DevLeague",
    description: "Hawaii's premier coding bootcamp offering full-stack development training.",
    website: "https://devleague.com",
  },
  {
    name: "Hawaii Women in Technology",
    description: "Promoting the advancement of women in technology fields across Hawaii.",
    website: "https://hawaiiwomenintechnology.org",
  },
  {
    name: "Startup Paradise",
    description: "Connecting and supporting Hawaii's entrepreneurial ecosystem.",
    website: "https://startupparadise.com",
  },
  {
    name: "Blue Startups",
    description: "Hawaii-based accelerator helping startups scale globally.",
    website: "https://bluestartups.com",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-teal-500">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Resources
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-[600px] mx-auto">
            Curated resources to support your UX journey and growth.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 px-6 bg-teal-600">
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
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-12">
            <span className="text-teal-500 text-sm font-medium uppercase tracking-wider mb-3 block">For Students</span>
            <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">
              Start your UX journey
            </h2>
            <p className="text-gray-600 text-lg max-w-[700px]">
              Whether you&apos;re curious about UX or ready to dive in, these resources will help you get started on your design career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentResources.map((resource) => (
              <div
                key={resource.title}
                className="bg-white border border-gray-200 rounded-[20px] p-6 hover:shadow-lg hover:border-teal-300 transition-all"
              >
                <span className="text-xs uppercase tracking-wide bg-purple-100 text-purple-700 px-2 py-1 rounded mb-3 inline-block">
                  {resource.type}
                </span>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* State of UX Report Section */}
      <section id="report" className="py-20 px-6 bg-purple-700 scroll-mt-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-purple-200 text-sm font-medium uppercase tracking-wider mb-3 block">Industry Insights</span>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
                State of UX in Hawaii Report
              </h2>
              <p className="text-purple-200 text-lg leading-relaxed mb-6">
                Our annual report provides insights into the UX industry in Hawaii, including salary data, job trends, skills in demand, and the overall state of human-centered design in our islands.
              </p>
              <ul className="text-purple-200 space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-2.5 flex-shrink-0" />
                  <span>Salary benchmarks for UX roles in Hawaii</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-2.5 flex-shrink-0" />
                  <span>Industry trends and growth areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-2.5 flex-shrink-0" />
                  <span>Skills and tools most in demand</span>
                </li>
              </ul>
              <Link
                href="mailto:aloha@uxhi.community?subject=State%20of%20UX%20Report"
                className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
              >
                <span className="text-gray-900">Get the report</span>
                <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                  <ArrowIcon className="w-4 h-4 text-gray-900" />
                </span>
              </Link>
            </div>
            <div className="bg-purple-600 rounded-[32px] p-8 text-center">
              <span className="font-display text-[120px] lg:text-[160px] text-white/20 leading-none block">2025</span>
              <p className="text-white text-lg font-medium -mt-4">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Directory of Tech Orgs Section */}
      <section id="directory" className="py-20 px-6 bg-cream scroll-mt-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-12">
            <span className="text-teal-500 text-sm font-medium uppercase tracking-wider mb-3 block">Local Community</span>
            <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">
              Directory of Tech Orgs in Hawaii
            </h2>
            <p className="text-gray-600 text-lg max-w-[700px]">
              Connect with other technology and design organizations in Hawaii. Together, we&apos;re building a stronger tech community in the islands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techOrgs.map((org) => (
              <a
                key={org.name}
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-[20px] p-6 hover:shadow-lg hover:border-teal-300 transition-all group"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {org.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{org.description}</p>
                <span className="text-teal-500 text-sm font-medium flex items-center gap-1">
                  Visit website
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-teal-500 mb-6">
            Have a resource to share?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-[600px] mx-auto">
            We&apos;re always looking for valuable resources to share with our community. If you have something that could help others on their UX journey, let us know!
          </p>
          <Link
            href="mailto:aloha@uxhi.community?subject=Resource%20Submission"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Submit a resource</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
