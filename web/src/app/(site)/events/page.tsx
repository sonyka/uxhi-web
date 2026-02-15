import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { PressMention } from "@/components/ui/PressMention";
import { ExternalLinkIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Events | UX Hawaii",
  description:
    "Discover upcoming UX events, workshops, and meetups in Hawaii. Connect with local UX professionals and grow your skills.",
};

// Hardcoded fallback events (shown when Sanity has no data)
const fallbackEvents = [
  { date: "Feb. 26", title: "Resume Review Day", time: "3:00pm - 5:00pm", tentative: false },
  { date: "March 6", title: "Careers in Tech and Intelligence Fair (UH Manoa)", time: "1:00pm - 4:00pm", tentative: false },
  { date: "March 12", title: "UH West Oahu Career Fair", time: "10:00am - 1:00pm", tentative: true },
  { date: "April 7", title: "Leeward CC Career Fair", time: "12:00pm - 2:00pm", tentative: false },
  { date: "March 12 OR April 7", title: "Talk Story with Tech Pros", time: "evening", tentative: false },
];

function formatEventDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function EventsPage() {
  const eventsResult = await sanityFetch({ query: EVENTS_QUERY });

  type Event = { _id: string; title: string; date: string; time: string | null; location: string | null; description: string | null; url: string | null; tentative: boolean | null };

  const events: Event[] = eventsResult.data || [];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[564px] sm:min-h-[746px] md:min-h-[747px] lg:min-h-[700px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-6 pt-32 pb-8 sm:max-w-[411px] md:max-w-[calc(100%-340px)] md:pl-10 lg:pl-24 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[583px] xl:max-w-[733px]">
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl leading-[40px] lg:text-5xl lg:leading-[60px] text-black">
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

        {/* Mobile Bento - Horizontal layout (shown on <sm only) */}
        <div className="sm:hidden px-6 pb-8">
          <div className="flex gap-3.5 items-center w-full">
            <div className="flex-1 h-[140px] rounded-[99px] overflow-hidden relative">
              <Image src="/images/events/bento-events-01.png" alt="UXHI photobooth" fill className="object-cover" />
            </div>
            <div className="w-[120px] shrink-0 flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={120} height={120} className="w-[120px] h-[120px]" />
            </div>
            <div className="flex-1 h-[140px] rounded-t-xl rounded-b-[99px] overflow-hidden relative">
              <Image src="/images/events/bento-events-02.png" alt="UXHI conference" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-0 xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only */}
          <div className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative">
              <Image src="/images/events/bento-events-01.png" alt="UXHI photobooth" fill className="object-cover" />
            </div>
            <div className="w-[114px] mx-auto flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={114} height={114} className="w-[114px] h-[114px]" />
            </div>
            <div className="w-full h-[180px] rounded-t-[7px] rounded-b-[88px] overflow-hidden relative">
              <Image src="/images/events/bento-events-02.png" alt="UXHI conference" fill className="object-cover" />
            </div>
          </div>

          {/* MD+ layout - Two columns with absolute positioning */}
          <div className="hidden md:block relative w-full h-full">
            {/* Column 1 - Left (positioned higher) */}
            <div className="absolute bottom-[82px] lg:bottom-[92px] left-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[114px] lg:h-[128px] rounded-[24px] overflow-hidden relative">
                <Image src="/images/events/bento-events-03.png" alt="UXHICon 25" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image src="/images/events/bento-events-01.png" alt="UXHI photobooth" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/events/bento-events-02.png" alt="UXHI conference" fill className="object-cover" />
              </div>
            </div>
            {/* Column 2 - Right (positioned at bottom) */}
            <div className="absolute bottom-0 right-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/events/bento-events-04.png" alt="UXHI community members with leis" fill className="object-cover" />
              </div>
              <div className="w-[114px] lg:w-[128px] mx-auto flex items-center justify-center">
                <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={128} height={128} className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/events/bento-events-05.png" alt="UXHI community crowd" fill className="object-cover" />
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

          <div className="bg-cream rounded-[20px] p-6 md:p-8 text-left max-w-[700px] mx-auto">
            {events.length > 0 ? (
              <ul className="space-y-3 text-gray-700">
                {events.map((event) => (
                  <li key={event._id} className="flex gap-3">
                    <span className="text-teal-500 font-semibold shrink-0">
                      {formatEventDate(event.date)}{event.tentative ? " (TBC)" : ""}
                    </span>
                    <span>
                      {event.url ? (
                        <a href={event.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-teal-500 transition-colors">
                          {event.title}
                        </a>
                      ) : (
                        event.title
                      )}
                      {event.time && ` (${event.time})`}
                      {event.location && ` — ${event.location}`}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="text-sm uppercase tracking-wider font-bold text-purple-600 mb-4">From Notion (Draft)</p>
                <ul className="space-y-3 text-gray-700">
                  {fallbackEvents.map((event) => (
                    <li key={event.title} className="flex gap-3">
                      <span className="text-teal-500 font-semibold shrink-0">
                        {event.date}{event.tentative ? " (TBC)" : ""}
                      </span>
                      <span>{event.title} ({event.time})</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-gray-600 text-sm italic">
                  ** They are interested in hosting another UX 101 session, we will just need to respond with preferred date(s)/time(s)
                </p>
              </>
            )}
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
            <PrimaryCTA href="https://lu.ma/user/uxhi" external>
              View All Events on Luma
            </PrimaryCTA>
          </div>
        </div>
      </section>

      {/* Conference Attendees Photo */}
      <section className="px-6 pb-16 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="rounded-[32px] overflow-hidden aspect-[16/7] relative">
            <Image
              src="/images/events/image-events.jpg"
              alt="UXHI conference attendees"
              fill
              className="object-cover"
            />
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

          {/* CTA */}
          <div className="text-center mb-16">
            <PrimaryCTA href="/conferences/2025/" external>
              UXHI Conference
            </PrimaryCTA>

            {/* Past Archives */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/conferences/2024/"
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

          {/* Press Mention */}
          <PressMention
            source="Hawaii Public Radio"
            title="Bytemarks Cafe — UXHI Conference coverage"
            href="https://www.hawaiipublicradio.org/podcast/bytemarks-cafe"
            ctaLabel="Listen Now"
          />

        </div>
      </section>
    </main>
  );
}
