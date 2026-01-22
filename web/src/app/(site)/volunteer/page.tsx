import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Volunteer | UX Hawaii",
  description:
    "Support UXHI by volunteering! Join our committees, present at events, contribute to resources, and help grow the UX community in Hawaii.",
};

// Placeholder images for the grid
const gridImages = [
  { id: "1", src: "/images/bento/group-leis.jpg", alt: "UXHI community members with leis" },
  { id: "2", src: "/images/bento/conference.jpg", alt: "UXHI conference" },
  { id: "3", src: "/images/bento/ux101-group.jpg", alt: "UX101 group" },
  { id: "4", src: "/images/bento/crowd-community.jpg", alt: "UXHI community crowd" },
  { id: "5", src: "/images/bento/photobooth.jpg", alt: "UXHI photobooth" },
  { id: "6", src: "/images/bento/uxhicon-25.jpg", alt: "UXHICon 25" },
];

// Committees data
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

export default function VolunteerPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Content */}
        <div className="lg:w-1/2 bg-section-gray flex items-center justify-center px-8 py-16 lg:py-0">
          <div className="max-w-md">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-purple-700 mb-6">
              Volunteer
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Support UXHI by volunteering! There are many ways to be involved:
            </p>
            <ul className="text-gray-700 text-base leading-relaxed mb-6 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>Propose a topic related to the field of UX as a presenter at our UXHI Conference or events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>Propose a topic as a guest author for our resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>Join our committees for any of our initiatives, like the UXHI Conference or the State of UX Report</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>Provide general assistance with our events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>Support with marketing needs like our newsletter and social media</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>And much more!</span>
              </li>
            </ul>
            <Link
              href="#inquiry-form"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Get Involved
              <span className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="lg:w-1/2 bg-section-gray flex items-center justify-center p-8 lg:p-12">
          <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
            {/* Column 1 - offset down */}
            <div className="flex flex-col gap-4 pt-8">
              {gridImages.slice(0, 3).map((image) => (
                <div
                  key={image.id}
                  className="w-full aspect-[3/4] rounded-[16px] bg-gray-200 overflow-hidden relative"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Column 2 - no offset */}
            <div className="flex flex-col gap-4">
              {gridImages.slice(3, 6).map((image) => (
                <div
                  key={image.id}
                  className="w-full aspect-[3/4] rounded-[16px] bg-gray-200 overflow-hidden relative"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Committees Section */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-12 text-center">
            Committees
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((committee) => (
              <div
                key={committee.name}
                className="bg-white rounded-[20px] p-6 border border-gray-100"
              >
                <h3 className="font-display text-xl text-purple-700 mb-3">
                  {committee.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {committee.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-20 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-purple-700 mb-6">
              Let us know how you want to get involved!
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Fill out the form below and a UXHI team member will be in touch.
            </p>
          </div>

          {/* Google Form Embed */}
          <div className="bg-cream rounded-[24px] p-8">
            <iframe
              src="https://docs.google.com/forms/d/e/YOUR_VOLUNTEER_FORM_ID/viewform?embedded=true"
              width="100%"
              height="800"
              className="rounded-lg border-0"
              title="UXHI Volunteer Inquiry Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
