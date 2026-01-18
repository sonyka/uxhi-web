import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";

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

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row pt-24 lg:pt-0 lg:min-h-[85vh]">
        {/* Left Side - Content */}
        <div className="lg:w-[60%] flex items-center px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-[560px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-[1.1]">
              Events
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              We host a mix of educational webinars, interactive workshops, and casual meetups every month, as well as our annual conference. Become a member and you&apos;ll receive advanced notice on all our events!
            </p>
            <PrimaryCTA href="/join">Become a member</PrimaryCTA>
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
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHICon 25"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Tall pill shape */}
              <div className="w-full h-[320px] lg:h-[400px] rounded-[999px] overflow-hidden relative">
                <Image
                  src="/images/bento/photobooth.jpg"
                  alt="UXHI photobooth"
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
                  src="/images/bento/conference.jpg"
                  alt="UXHI conference"
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
                  src="/images/bento/group-leis.jpg"
                  alt="UXHI community members with leis"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className="py-20 px-6 bg-white">
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

      {/* Conference Section */}
      <section className="py-20 px-6 bg-purple-700">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-8 text-center">
            Conference
          </h2>
          <p className="text-purple-100 text-lg leading-relaxed mb-6 text-center max-w-[750px] mx-auto">
            Our third annual conference is a hub for those infused in human-centered design, user experience, design thinking, and everything in between, offering an opportunity to deepen your expertise. Whether you&apos;re a newcomer eager to learn more about UX or an industry pro, you&apos;ll find value in the immersive day filled with inspiration, knowledge-sharing, and networking!
          </p>

          {/* Press Mention */}
          <p className="text-purple-200 text-center mb-10">
            <span className="font-medium">Press:</span>{" "}
            <a
              href="https://www.hawaiipublicradio.org/podcast/bytemarks-cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              Hawaii Public Radio - Bytemarks Cafe
            </a>{" "}
            UXHI Conference coverage
          </p>

          {/* CTA */}
          <div className="text-center mb-16">
            <Link
              href="https://uxhiconference.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-900">Visit Conference Site</span>
              <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>

          {/* Placeholder Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Speakers Placeholder */}
            <div className="bg-white/10 rounded-[20px] p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Speakers</h3>
              <p className="text-purple-200 text-sm">Coming soon</p>
            </div>

            {/* Photos Placeholder */}
            <div className="bg-white/10 rounded-[20px] p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Photos</h3>
              <p className="text-purple-200 text-sm">Coming soon</p>
            </div>

            {/* Testimonials Placeholder */}
            <div className="bg-white/10 rounded-[20px] p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Testimonials</h3>
              <p className="text-purple-200 text-sm">Coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
