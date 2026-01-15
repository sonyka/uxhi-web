import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | UX Hawaii",
  description:
    "Discover upcoming UX events, workshops, and meetups in Hawaii. Connect with local UX professionals and grow your skills.",
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

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Content */}
        <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center justify-center px-8 py-16 lg:py-0">
          <div className="max-w-md">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-purple-700 mb-6">
              Events
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              We host a mix of educational webinars, interactive workshops, and casual meetups every month, as well as our annual conference. Become a member and you&apos;ll receive advanced notice on all our events!
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Become a Member
              <span className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center justify-center p-8 lg:p-12">
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

      {/* Upcoming Events Section */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-8">
            Upcoming Events
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We have no upcoming events scheduled at this time. Check back soon or join our email list!
          </p>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-purple-700 mb-12 text-center">
            Past Events
          </h2>

          {/* Luma Embed */}
          <div className="rounded-[24px] overflow-hidden bg-cream p-4">
            <iframe
              src="https://lu.ma/embed/calendar/cal-gT2HhpGHlTpnIvZ/events?lt=light"
              width="100%"
              height="700"
              frameBorder="0"
              className="rounded-lg border-0"
              title="UXHI Past Events on Luma"
              allowFullScreen
            />
          </div>

          <div className="text-center mt-8">
            <Link
              href="https://lu.ma/uxhi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-900">View All Events on Luma</span>
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
