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
      <div className="flex flex-col lg:flex-row pt-24 lg:pt-0 lg:min-h-[85vh]">
        {/* Left Side - Content */}
        <div className="lg:w-[60%] flex items-center px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-[560px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-[1.1]">
              Find A UX Professional
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Connect with talented UX design professionals in Hawaiʻi and those with Hawaiʻi ties, across all experience levels.
            </p>
            <PrimaryCTA href="https://airtable.com/your-directory-link" external>
              Access the directory
            </PrimaryCTA>
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
                  src="/images/bento/crowd-community.jpg"
                  alt="UXHI community crowd"
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
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHICon 25"
                  fill
                  className="object-cover"
                />
              </div>
              {/* UXHI Motif */}
              <div className="w-full aspect-square flex items-center justify-center">
                <Image
                  src="/images/bento/uxhi-motif-2.svg"
                  alt="UXHI motif"
                  width={200}
                  height={200}
                  className="w-full h-auto max-w-[200px]"
                />
              </div>
              {/* Rounded rectangle */}
              <div className="w-full h-[180px] lg:h-[220px] rounded-[24px] overflow-hidden relative">
                <Image
                  src="/images/bento/conference.jpg"
                  alt="UXHI conference"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Our Member Directory Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-purple-700 mb-8">
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
