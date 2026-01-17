import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

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

// Placeholder images for the grid
const gridImages = [
  { id: "1", src: "/images/bento/group-leis.jpg", alt: "UXHI community members with leis" },
  { id: "2", src: "/images/bento/conference.jpg", alt: "UXHI conference" },
  { id: "3", src: "/images/bento/ux101-group.jpg", alt: "UX101 group" },
  { id: "4", src: "/images/bento/crowd-community.jpg", alt: "UXHI community crowd" },
  { id: "5", src: "/images/bento/photobooth.jpg", alt: "UXHI photobooth" },
  { id: "6", src: "/images/bento/uxhicon-25.jpg", alt: "UXHICon 25" },
];

export default function FindUXProPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-[#f5f5f5]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Side - Content */}
            <div className="lg:w-1/2">
              <h1 className="font-display text-4xl md:text-5xl text-purple-700 mb-6">
                Find A UX Professional
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Connect with talented UX design professionals in Hawaiʻi and those with Hawaiʻi ties, across all experience levels.
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

            {/* Right Side - Image Grid */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                {gridImages.slice(0, 6).map((image) => (
                  <div
                    key={image.id}
                    className="aspect-square rounded-[12px] bg-gray-200 overflow-hidden relative"
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
      </section>

      {/* Join Our Member Directory Section */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-8">
            Join Our Member Directory!
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
