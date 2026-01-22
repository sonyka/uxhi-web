import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { ArrowIcon, ExternalLinkIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Events | UX Hawaii",
  description:
    "Discover upcoming UX events, workshops, and meetups in Hawaii. Connect with local UX professionals and grow your skills.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[700px] lg:min-h-[702px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-8 pt-24 pb-16 lg:pl-32 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[733px]">
          <div className="flex flex-col gap-6 max-w-[605px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl lg:leading-[84px] text-black">
              Events
            </h1>
            <p className="text-black text-lg lg:text-xl leading-relaxed">
              We host a mix of educational webinars, interactive workshops, and casual meetups every month, as well as our annual conference. Become a member and you&apos;ll receive advanced notice on all our events!
            </p>
            <div>
              <PrimaryCTA href="/join">Become a member</PrimaryCTA>
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
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHICon 25"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Full tall pill */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-[99px] overflow-hidden relative opacity-90">
                <Image
                  src="/images/bento/photobooth.jpg"
                  alt="UXHI photobooth"
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
                  src="/images/bento/group-leis.jpg"
                  alt="UXHI community members with leis"
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
                  src="/images/bento/crowd-community.jpg"
                  alt="UXHI community crowd"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className="pt-12 pb-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto text-center">
          {/* Upcoming Events Icon */}
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <Image
              src="/images/icons/icon-upcoming-events.png"
              alt="Upcoming Events"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-4xl text-teal-500 mb-8">
            Upcoming Events
          </h2>

          {/* Temporary content from Notion */}
          <div className="bg-cream rounded-[20px] p-6 md:p-8 text-left max-w-[700px] mx-auto">
            <p className="text-xs uppercase tracking-widest font-bold text-purple-600 mb-4">From Notion (Draft)</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-teal-500 font-semibold shrink-0">Feb. 26</span>
                <span>Resume Review Day (3:00pm - 5:00pm)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-500 font-semibold shrink-0">March 6</span>
                <span>Careers in Tech and Intelligence Fair (UH Manoa) (1:00pm - 4:00pm)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-500 font-semibold shrink-0">March 12 (TBC)</span>
                <span>UH West Oahu Career Fair (10:00am - 1:00pm)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-500 font-semibold shrink-0">April 7</span>
                <span>Leeward CC Career Fair (12:00pm - 2:00pm)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-500 font-semibold shrink-0">March 12 OR April 7</span>
                <span>Talk Story with Tech Pros (evening)</span>
              </li>
            </ul>
            <p className="mt-6 text-gray-600 text-sm italic">
              ** They are interested in hosting another UX 101 session, we will just need to respond with preferred date(s)/time(s)
            </p>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-purple-700 mb-12 text-center">
            Past Events
          </h2>

          {/* Luma Embed - Past Events */}
          <iframe
            src="https://lu.ma/embed/calendar/cal-gT2HhpGHlTpnIvZ/events?lt=light&period=past"
            width="100%"
            height="700"
            frameBorder="0"
            className="border-0 rounded-lg"
            title="UXHI Past Events on Luma"
            allowFullScreen
          />

          <div className="text-center mt-8">
            <Link
              href="https://lu.ma/user/uxhi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-900">View All Events on Luma</span>
              <span className="w-9 h-9 rounded-full bg-yellow flex items-center justify-center group-hover:bg-yellow-hover transition-colors">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Conference Section */}
      <section className="py-20 px-6 bg-purple-700">
        <div className="max-w-[900px] mx-auto">
          {/* Conference Icon */}
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <Image
              src="/images/icons/icon-uxhicon.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
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
              <span className="text-gray-900">UXHI Conference</span>
              <span className="w-9 h-9 rounded-full bg-yellow flex items-center justify-center group-hover:bg-yellow-hover transition-colors">
                <ExternalLinkIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>

            {/* Past Archives */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="https://2024.uxhiconference.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium"
              >
                <span>2024 UXHI Conference</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </Link>
              <Link
                href="https://2023.uxhiconference.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium"
              >
                <span>2023 UXHI Conference</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </Link>
            </div>
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
