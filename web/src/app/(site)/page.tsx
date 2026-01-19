import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SocialFeed } from "@/components/sections/SocialFeed";
import { CommunityPhotosGrid } from "@/components/sections/CommunityPhotosGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { COMMUNITY_PHOTOS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "UXHI - A UX design community for people in Hawaiʻi",
  description:
    "Join 500+ UX professionals, students, and curious individuals in Hawaiʻi. Connect, learn, and grow together with UXHI.",
};

// Arrow Icon Component (Feather arrow-right)
function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default async function HomePage() {
  // Fetch data from Sanity
  const { data: communityPhotos } = await sanityFetch({ query: COMMUNITY_PHOTOS_QUERY });

  return (
    <>
      {/* Hero Section */}
      <section className="pt-[200px] pb-12 px-4">
        <div className="max-w-[1280px] mx-auto text-center">
          {/* Member Badge */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-6 py-2 mb-10 border border-gray-100 shadow-sm">
            <Image
              src="/images/members.png"
              alt="UXHI community members"
              width={130}
              height={36}
              className="h-9 w-auto"
            />
            <span className="text-[15px] text-gray-700 font-medium">500 members and growing</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-[40px] md:text-[60px] lg:text-[80px] leading-[1.05] lg:leading-[84px] tracking-tight text-black mb-12">
            A{" "}
            <span className="text-black hover:text-purple-700 transition-colors relative inline-block cursor-pointer group/ux">
              UX
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ux-circle.svg?v=3"
                alt=""
                className="absolute pointer-events-none"
                style={{ width: '270px', height: '110px', left: '-70px', top: '-10px', maxWidth: 'none' }}
              />
              {/* Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-3 bg-white text-gray-700 text-sm font-body font-normal leading-relaxed tracking-normal rounded-xl shadow-lg border border-gray-100 w-72 text-left opacity-0 invisible group-hover/ux:opacity-100 group-hover/ux:visible transition-all duration-200 delay-300 z-50" style={{ wordSpacing: '0.1em' }}>
                UX is the overall experience a user has when interacting with a product or service.
                {/* Tail */}
                <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm" />
              </span>
            </span>{" "}
            design<br className="hidden md:block" /> community for<br className="hidden md:block" /> people in Hawaiʻi
          </h1>

          {/* CTA Button */}
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-5 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] group"
          >
            <span className="text-black text-[16px]">Join us</span>
            <span className="w-[30px] h-[30px] rounded-full bg-[#ffcc40] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-black" />
            </span>
          </Link>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="pt-8 pb-0 px-4 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          {/* Desktop: 5-column layout matching Figma */}
          <div className="hidden lg:flex gap-4 items-end justify-center">
            {/* Column 1: Tall pill + teal rectangle */}
            <div className="flex flex-col gap-4 w-[234px]">
              <div className="h-[382px] rounded-[999px] overflow-hidden relative">
                <Image
                  src="/images/bento/ux101-group.jpg"
                  alt="UXHI UX 101 workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-[182px] rounded-[24px] bg-teal-500 p-5 flex flex-col justify-end text-white">
                <span className="font-display text-[36px] leading-none">2021</span>
                <span className="text-base mt-1 opacity-90">Year founded</span>
              </div>
            </div>

            {/* Column 2: Tall pill only (same height as col 1 pill) */}
            <div className="flex flex-col justify-end w-[234px]">
              <div className="h-[382px] rounded-[999px] overflow-hidden relative">
                <Image
                  src="/images/bento/crowd-community.jpg"
                  alt="UXHI community gathering"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <span className="font-display text-4xl text-white">500+</span>
                  <span className="block text-white/90 text-sm mt-1">Members and counting</span>
                </div>
              </div>
            </div>

            {/* Column 3: Tallest purple pill (center) */}
            <div className="w-[234px]">
              <div className="h-[582px] rounded-[999px] bg-purple-700 px-6 pt-16 pb-14 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <span className="absolute -right-4 top-1/4 font-display text-[180px] text-purple-600/30 leading-none select-none pointer-events-none">52</span>
                <p className="text-white/90 text-[15px] leading-relaxed relative z-10">
                  Come join our free UXHI community to connect and learn with new UX friends, expand your professional network, and stay updated on the latest UXHI events.
                </p>
                <Link
                  href="/join"
                  className="mt-4 inline-flex items-center gap-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium relative z-10"
                >
                  <span>Join us</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Column 4: Tall pill only */}
            <div className="flex flex-col justify-end w-[234px]">
              <div className="h-[382px] rounded-[999px] overflow-hidden relative">
                <Image
                  src="/images/bento/photobooth.jpg"
                  alt="UXHI members at photo booth"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-600/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-4 right-4 text-center">
                  <span className="font-display text-[20px] text-white leading-tight">Connect,<br/>learn, grow<br/>together</span>
                </div>
              </div>
            </div>

            {/* Column 5: Teal rounded-top + gray rectangle */}
            <div className="flex flex-col gap-4 w-[234px]">
              <div className="h-[382px] rounded-t-[999px] rounded-b-[40px] bg-teal-500 px-5 pt-20 pb-6 flex items-end justify-end text-white text-right">
                <span className="text-[15px] leading-snug font-medium">From students to<br/>industry leaders,<br/>all designers are<br/>welcome</span>
              </div>
              <div className="h-[182px] rounded-[24px] overflow-hidden relative">
                <Image
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHI Annual Conference"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-display text-lg text-white leading-tight">UXHI Annual<br/>Conference</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet: 3-column layout */}
          <div className="hidden md:flex lg:hidden gap-4 items-end justify-center">
            {/* Column 1: Tall pill + teal rectangle */}
            <div className="flex flex-col gap-4 w-[200px]">
              <div className="h-[320px] rounded-[999px] overflow-hidden relative">
                <Image
                  src="/images/bento/ux101-group.jpg"
                  alt="UXHI UX 101 workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-[150px] rounded-[24px] bg-teal-500 p-4 flex flex-col justify-end text-white">
                <span className="font-display text-[28px] leading-none">2021</span>
                <span className="text-sm mt-1 opacity-90">Year founded</span>
              </div>
            </div>

            {/* Column 2: Tallest purple pill (center) */}
            <div className="w-[200px]">
              <div className="h-[486px] rounded-[999px] bg-purple-700 px-5 py-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <span className="absolute -right-4 top-1/4 font-display text-[140px] text-purple-600/30 leading-none select-none pointer-events-none">52</span>
                <p className="text-white/90 text-[14px] leading-relaxed relative z-10">
                  Come join our free UXHI community to connect and learn with new UX friends.
                </p>
                <Link
                  href="/join"
                  className="mt-4 inline-flex items-center gap-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium relative z-10"
                >
                  <span>Join us</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Column 3: Teal rounded-top + gray rectangle */}
            <div className="flex flex-col gap-4 w-[200px]">
              <div className="h-[320px] rounded-t-[999px] rounded-b-[40px] bg-teal-500 px-4 pt-16 pb-5 flex items-end justify-end text-white text-right">
                <span className="text-[14px] leading-snug font-medium">From students to<br/>industry leaders,<br/>all designers are<br/>welcome</span>
              </div>
              <div className="h-[150px] rounded-[24px] overflow-hidden relative">
                <Image
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHI Annual Conference"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="font-display text-base text-white leading-tight">UXHI Annual<br/>Conference</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: 3-column simplified layout */}
          <div className="flex md:hidden gap-3 items-end justify-center px-2">
            {/* Column 1: Pill + teal rect */}
            <div className="flex flex-col gap-3 flex-1 max-w-[160px]">
              <div className="h-[240px] rounded-[999px] overflow-hidden relative">
                <Image
                  src="/images/bento/ux101-group.jpg"
                  alt="UXHI UX 101 workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-[100px] rounded-[20px] bg-teal-500 p-3 flex flex-col justify-end text-white">
                <span className="font-display text-[24px] leading-none">2021</span>
                <span className="text-xs mt-0.5 opacity-90">Year founded</span>
              </div>
            </div>

            {/* Column 2: Tall purple pill */}
            <div className="flex-1 max-w-[160px]">
              <div className="h-[356px] rounded-[999px] bg-purple-700 px-4 py-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <p className="text-white/90 text-[12px] leading-relaxed relative z-10">
                  Join our free community to connect with UX friends.
                </p>
                <Link
                  href="/join"
                  className="mt-3 inline-flex items-center gap-1 text-purple-200 hover:text-white text-xs font-medium relative z-10"
                >
                  <span>Join us</span>
                  <ArrowIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Column 3: Teal top + gray rect */}
            <div className="flex flex-col gap-3 flex-1 max-w-[160px]">
              <div className="h-[240px] rounded-t-[999px] rounded-b-[32px] bg-teal-500 px-3 pt-12 pb-4 flex items-end justify-end text-white text-right">
                <span className="text-[11px] leading-snug font-medium">From students to<br/>industry leaders,<br/>all welcome</span>
              </div>
              <div className="h-[100px] rounded-[20px] overflow-hidden relative">
                <Image
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHI Annual Conference"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="font-display text-xs text-white leading-tight">UXHI Conference</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          {/* Decorative Motif */}
          <div className="mb-6">
            <Image
              src="/images/bento/uxhi-rounds-motif.svg"
              alt=""
              width={200}
              height={120}
              className="mx-auto"
            />
          </div>
          <span className="text-teal-500 text-sm font-medium uppercase tracking-wider mb-4 block">What we do</span>
          <h2 className="font-display text-[22px] md:text-[28px] lg:text-[34px] leading-tight text-gray-900">
            UXHI&apos;s mission is to grow and elevate the professional standard of{" "}
            <span className="text-gray-900 hover:text-purple-700 transition-colors relative inline-block cursor-pointer group/hcd whitespace-nowrap">
              Human-Centered Design
              {/* Underline image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hcd-underline.svg"
                alt=""
                className="absolute left-0 right-0 -bottom-2 w-full h-auto pointer-events-none"
              />
              {/* Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-3 bg-white text-gray-700 text-sm font-body font-normal leading-relaxed tracking-normal rounded-xl shadow-lg border border-gray-100 w-80 text-left opacity-0 invisible group-hover/hcd:opacity-100 group-hover/hcd:visible transition-all duration-200 delay-300 z-50 whitespace-normal" style={{ wordSpacing: '0.1em' }}>
                Human-centered design is an approach that prioritizes the unique needs of users.
                {/* Tail */}
                <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm" />
              </span>
            </span>{" "}
            in Hawaiʻi through career development, community networking, and industry advocacy{" "}
            <span className="inline-block">🌺</span>
          </h2>
        </div>
      </section>

      {/* Large Community Photo */}
      <section className="px-6 pb-16">
        <div className="max-w-[1300px] mx-auto">
          <div className="rounded-[32px] overflow-hidden aspect-[16/7] relative">
            <Image
              src="/images/community-photo.jpg"
              alt="UXHI community group photo on rooftop"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Connect Learn Grow Section */}
      <section className="py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-6">
            Connect, learn, grow together
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-[600px] mx-auto">
            Whether you&apos;re curious about UX, looking to make a career switch, or are a working professional in the field, come join our free UXHI community to connect and learn with new UX friends, expand your professional network, and stay updated on the latest UXHI events.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Learn more</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* Features Section - Dark Purple */}
      <section className="bg-purple-700 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Together, we shape the future of UX
            </h2>
            <p className="text-purple-200 text-lg">
              UXHI is the perfect place to learn, network, and grow your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Membership */}
            <div className="border border-purple-500/30 rounded-[24px] p-8 text-center flex flex-col">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <Image
                  src="/images/icons/icon-membership.png"
                  alt="Free Membership"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-2xl text-white mb-4">Free Membership</h3>
              <p className="text-purple-200 leading-relaxed flex-grow">
                Connect with other UX&apos;ers, then keep the conversation going in our{" "}
                <Link href="/join" className="underline hover:text-white transition-colors">Slack community</Link>
                {" "}or tap into our{" "}
                <Link href="/find-ux-pro" className="underline hover:text-white transition-colors">membership directory</Link>.
              </p>
              <Link
                href="/join"
                className="mt-6 self-center inline-flex items-center gap-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium"
              >
                <span>Join free</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Events */}
            <div className="border border-purple-500/30 rounded-[24px] p-8 text-center flex flex-col">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <Image
                  src="/images/icons/icon-events.png"
                  alt="Events"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-2xl text-white mb-4">Events</h3>
              <p className="text-purple-200 leading-relaxed flex-grow">
                Experience an array of educational webinars, interactive workshops, and casual meetups we host each month, both virtual and in-person
              </p>
              <Link
                href="/events"
                className="mt-6 self-center inline-flex items-center gap-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium"
              >
                <span>View events</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Resources */}
            <div className="border border-purple-500/30 rounded-[24px] p-8 text-center flex flex-col">
              <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <div className="w-24 h-24 relative">
                  <Image
                    src="/images/icons/icon-resources.png"
                    alt="Resources"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="font-display text-2xl text-white mb-4">Resources</h3>
              <p className="text-purple-200 leading-relaxed flex-grow">
                Discover and share resources in our online content hub to support your UX journey and growth.
              </p>
              <Link
                href="/resources"
                className="mt-6 self-center inline-flex items-center gap-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 transition-all text-sm font-medium"
              >
                <span>Browse resources</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Feed Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-2">
              IRL &gt; Instagram
            </h2>
            <p className="text-gray-600 text-lg">Stay connected with our latest events and community updates</p>
          </div>

          <SocialFeed />
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Community Photos Grid - managed in Sanity */}
          <CommunityPhotosGrid photos={communityPhotos || []} />

          {/* CTA Content */}
          <div className="text-center pt-4">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] text-teal-500 mb-6 leading-tight">
              A community<br />
              for designers,<br />
              by designers
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-10 max-w-[680px] mx-auto leading-relaxed">
              UXHI is built and run entirely by volunteers who share a passion for human-centered design. We create the spaces we wish existed—to learn together, support each other, and elevate UX across Hawaiʻi.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-900">Join us</span>
              <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
