import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";

export const metadata: Metadata = {
  title: "Find UX Pro | UX Hawaii",
  description:
    "Connect with UX professionals in Hawaii. Browse our member directory to find designers, researchers, and UX specialists.",
};

// Arrow Icon Component (Feather arrow-right)
function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function FindUXProPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[700px] lg:min-h-[702px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-8 pt-24 pb-16 lg:pl-32 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[733px]">
          <div className="flex flex-col gap-6 max-w-[605px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-[48px] lg:leading-[84px] text-black">
              Find A UX Professional
            </h1>
            <p className="text-black text-lg lg:text-[20px] leading-relaxed">
              Connect with talented UX design professionals in Hawaiʻi and those with Hawaiʻi ties, across all experience levels.
            </p>
            <div>
              <PrimaryCTA href="https://airtable.com/your-directory-link" external>
                Access the directory
              </PrimaryCTA>
            </div>
          </div>
        </div>

        {/* Right Side - Bento Grid (Variation 2) */}
        <div className="relative lg:absolute lg:right-[calc(8.33%+22px)] lg:top-0 h-auto lg:h-[655px] w-full lg:w-[320px] px-8 lg:px-0 pb-8 lg:pb-0">
          <div className="grid grid-cols-2 gap-4 w-full max-w-[320px] mx-auto lg:mx-0">
            {/* Column 1 - Left */}
            <div className="flex flex-col gap-4 lg:mt-[92px]">
              {/* Rounded rectangle (cut off at top) */}
              <div className="w-full h-[100px] lg:h-[128px] rounded-[24px] overflow-hidden relative lg:-mt-8">
                <Image
                  src="/images/bento/ux101-group.jpg"
                  alt="UX101 group"
                  fill
                  className="object-cover"
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
              {/* Pill-bottom shape */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-lg rounded-b-[99px] overflow-hidden relative">
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
              {/* Pill-bottom shape */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-lg rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHICon 25"
                  fill
                  className="object-cover"
                />
              </div>
              {/* UXHI Motif Pattern */}
              <div className="w-[128px] mx-auto flex items-center justify-center">
                <Image
                  src="/images/bento/uxhi-motif-2.svg"
                  alt="UXHI motif"
                  width={128}
                  height={128}
                  className="w-[128px] h-[128px]"
                />
              </div>
              {/* Regular rectangle */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-lg overflow-hidden relative">
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

      {/* Browse Member Directory Section */}
      <section className="pt-12 pb-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-[36px] text-purple-700 mb-8">
            Browse our member directory
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            Welcome to the UXHI Member Directory, your hub for connecting with UX design professionals in Hawaiʻi and those with Hawaiʻi ties, across all experience levels. Not only does this serve as a go-to resource for companies and recruiters seeking talented local UX professionals, but it also fosters connections between UX practitioners themselves.
          </p>
          <Link
            href="https://airtable.com/your-directory-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Access the Directory</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* Criteria Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-6">
            What criteria must be met to join?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            UX professionals and anyone transitioning into UX design who lives in Hawaiʻi or has strong ties to Hawaiʻi can join. Your request will automatically be added to the directory and a UXHI team member will manually add your head shot and island, if applicable, within a few business days.
          </p>
        </div>
      </section>

    </main>
  );
}
