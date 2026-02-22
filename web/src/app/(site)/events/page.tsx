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
              <Image src="/images/motifs/uxhi-motif-2.svg" alt="UXHI motif" width={120} height={120} className="w-[120px] h-[120px]" />
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
              <Image src="/images/motifs/uxhi-motif-2.svg" alt="UXHI motif" width={114} height={114} className="w-[114px] h-[114px]" />
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
                <Image src="/images/motifs/uxhi-motif-2.svg" alt="UXHI motif" width={128} height={128} className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/events/bento-events-05.png" alt="UXHI community crowd" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section - Luma Embed */}
      <section className="pt-12 pb-20 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto text-center">
          {/* Upcoming Events Icon */}
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <Image
              src="/images/icons/icon-upcoming-events.png"
              alt="Upcoming Events"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-4xl text-purple-140 mb-12">
            Upcoming Events
          </h2>

          <iframe
            src="https://luma.com/embed/calendar/cal-eVKNyHwNb84u0D4/events?lt=light"
            width="100%"
            className="border-0 rounded-lg min-h-[400px] h-[60vh] bg-white"
            title="UXHI Upcoming Events on Luma"
            allowFullScreen
          />

          <div className="text-center mt-8">
            <PrimaryCTA href="https://luma.com/user/uxhi" variant="subdued" external>
              View All Events on Luma
            </PrimaryCTA>
          </div>
        </div>
      </section>


      {/* Conference Attendees Bento Grid */}
      <section className="px-6 pb-16 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* Row 1, Left — wide */}
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem_+_1px)] max-lg:rounded-t-[calc(2rem_+_1px)] lg:rounded-tl-[calc(2rem_+_1px)]">
                <div className="relative aspect-[3/2] lg:aspect-auto w-full lg:flex-1">
                  <Image src="/images/events/bentogrid-events-1.jpg" alt="UXHI community members posing together" fill className="object-cover" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            </div>
            {/* Row 1, Right — narrow */}
            <div className="relative">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem_+_1px)] lg:rounded-tr-[calc(2rem_+_1px)]">
                <div className="relative aspect-[3/2] w-full">
                  <Image src="/images/events/bentogrid-events-2.jpg" alt="UXHI meetup audience gathering" fill className="object-cover" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
            </div>
            {/* Row 2, Left — narrow */}
            <div className="relative">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem_+_1px)] lg:rounded-bl-[calc(2rem_+_1px)]">
                <div className="relative aspect-[3/2] w-full">
                  <Image src="/images/events/bentogrid-events-3.jpg" alt="UXHI members at photobooth with sunglasses" fill className="object-cover" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
            </div>
            {/* Row 2, Right — wide */}
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem_+_1px)] max-lg:rounded-b-[calc(2rem_+_1px)] lg:rounded-br-[calc(2rem_+_1px)]">
                <div className="relative aspect-[3/2] lg:aspect-auto w-full lg:flex-1">
                  <Image src="/images/events/bentogrid-events-4.jpg" alt="UXHI holiday dinner gathering" fill className="object-cover" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* Conference Section */}
      <section className="py-20 px-6 bg-purple-140">
        <div className="max-w-[900px] mx-auto">
          {/* Conference Icon */}
          <div className="w-32 h-32 mx-auto mb-6 relative">
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
          <p className="text-purple-30 text-lg leading-relaxed mb-6 text-center max-w-[750px] mx-auto">
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
                className="inline-flex items-center gap-1 text-purple-50 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium"
              >
                <span>2024 UXHI Conference</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </Link>
              <Link
                href="https://2023.uxhiconference.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-50 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium"
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
