import Image from "next/image";
import Link from "next/link";

// Arrow Icon Component (Feather arrow-right)
function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// Placeholder images for the grid - using existing bento images
const gridImages = [
  { id: "1", src: "/images/bento/group-leis.jpg", alt: "UXHI community members with leis" },
  { id: "2", src: "/images/bento/conference.jpg", alt: "UXHI conference" },
  { id: "3", src: "/images/bento/ux101-group.jpg", alt: "UX101 group" },
  { id: "4", src: "/images/bento/crowd-community.jpg", alt: "UXHI community crowd" },
  { id: "5", src: "/images/bento/photobooth.jpg", alt: "UXHI photobooth" },
  { id: "6", src: "/images/bento/uxhicon-25.jpg", alt: "UXHICon 25" },
];

export default function JoinPage() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Content */}
        <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center justify-center px-8 py-16 lg:py-0">
          <div className="max-w-md">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-purple-700 mb-6">
              Become a member!
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Joining UXHI is free! As a member, you gain access to our community
              Slack group with 400+ designers, an invitation to join our member
              directory, and early updates on the latest UX events through our
              monthly emails.
            </p>
            <Link
              href="https://forms.gle/your-google-form-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Join us
              <span className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="lg:w-1/2 bg-cream flex items-center justify-center p-8 lg:p-12">
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
    </main>
  );
}
