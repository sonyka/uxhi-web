import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { CommunityPhotosGrid } from "@/components/sections/CommunityPhotosGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { INSTAGRAM_POSTS_QUERY, COMMUNITY_PHOTOS_QUERY } from "@/sanity/lib/queries";

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

// Slack Icon (Feather)
function SlackIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
      <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
      <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
      <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
      <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
      <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
      <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
    </svg>
  );
}

// Calendar Icon (Feather)
function CalendarIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// Book Open Icon (Feather)
function BookOpenIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default async function HomePage() {
  // Fetch data from Sanity
  const [{ data: instagramPosts }, { data: communityPhotos }] = await Promise.all([
    sanityFetch({ query: INSTAGRAM_POSTS_QUERY }),
    sanityFetch({ query: COMMUNITY_PHOTOS_QUERY }),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
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
          <h1 className="font-display text-5xl md:text-6xl lg:text-[80px] leading-[1.05] tracking-tight text-gray-900 mb-10 max-w-[900px] mx-auto">
            A UX design community for people in Hawaiʻi
          </h1>

          {/* CTA Button */}
          <Link
            href="/join"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium text-lg hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Join us</span>
            <span className="w-10 h-10 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-5 h-5 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-12 px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" style={{ gridTemplateRows: 'repeat(3, 180px)' }}>
            {/* Column 1, Rows 1-2: UX 101 group photo (tall oval) */}
            <div className="hidden lg:block lg:col-start-1 lg:row-start-1 lg:row-span-2 rounded-[999px] overflow-hidden relative">
              <Image
                src="/images/bento/ux101-group.jpg"
                alt="UXHI UX 101 workshop presenters"
                fill
                className="object-cover"
              />
            </div>

            {/* Column 1, Row 3: Year Founded */}
            <div className="lg:col-start-1 lg:row-start-3 rounded-[24px] bg-teal-500 p-5 flex flex-col justify-end text-white">
              <span className="font-display text-5xl lg:text-[36px] leading-none">2021</span>
              <span className="text-base mt-1 opacity-90">Year founded</span>
            </div>

            {/* Column 2, Rows 2-3: Large Community Image (tall oval, offset down) */}
            <div className="hidden lg:block lg:col-start-2 lg:row-start-2 lg:row-span-2 rounded-[999px] overflow-hidden relative">
              <Image
                src="/images/bento/crowd-community.jpg"
                alt="UXHI community gathering"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="font-display text-5xl text-white">500+</span>
                <span className="block text-white/90 text-sm mt-1">Members and counting</span>
              </div>
            </div>

            {/* Column 3, Rows 1-3: Join Community Card (tall purple) */}
            <div className="lg:col-start-3 lg:row-start-1 lg:row-span-3 rounded-[999px] bg-purple-700 px-6 pt-16 pb-14 flex flex-col relative overflow-hidden">
              {/* Decorative background number */}
              <span className="absolute -right-4 top-1/4 font-display text-[180px] text-purple-600/30 leading-none select-none pointer-events-none">52</span>
              <p className="text-white/90 text-[16px] leading-relaxed flex-1 relative z-10">
                Come join our free UXHI community to connect and learn with new UX friends, expand your professional network, and stay updated on the latest UXHI events.
              </p>
              <Link
                href="/join"
                className="mt-4 inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-4 pr-1.5 py-1.5 font-medium text-sm hover:bg-gray-50 transition-colors relative z-10 group"
              >
                <span className="text-gray-900">Join us</span>
                <span className="w-7 h-7 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                  <ArrowIcon className="w-3.5 h-3.5 text-gray-900" />
                </span>
              </Link>
            </div>

            {/* Column 4, Rows 2-3: Connect Card with Photo (shorter oval) */}
            <div className="hidden lg:block lg:col-start-4 lg:row-start-2 lg:row-span-2 rounded-[999px] overflow-hidden relative">
              <Image
                src="/images/bento/photobooth.jpg"
                alt="UXHI members at photo booth"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-600/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-4 right-4 text-center">
                <span className="font-display text-[22px] text-white leading-tight">Connect,<br/>learn, grow<br/>together</span>
              </div>
            </div>

            {/* Column 5, Rows 1-2: From Students Card (rounded top teal) */}
            <div className="hidden lg:flex lg:col-start-5 lg:row-start-1 lg:row-span-2 rounded-t-[999px] rounded-b-[40px] bg-teal-500 px-5 pt-20 pb-6 items-start justify-end text-white text-right">
              <span className="text-[16px] leading-snug font-medium">From students to<br/>industry leaders,<br/>all designers are<br/>welcome</span>
            </div>

            {/* Column 5, Row 3: Annual Conference */}
            <div className="lg:col-start-5 lg:row-start-3 rounded-[24px] overflow-hidden relative">
              <Image
                src="/images/bento/uxhicon-25.jpg"
                alt="UXHI Annual Conference"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-display text-xl text-white leading-tight">UXHI Annual<br/>Conference</span>
              </div>
            </div>

            {/* Mobile: Show simplified layout */}
            <div className="lg:hidden rounded-[100px] overflow-hidden relative min-h-[350px]">
              <Image
                src="/images/bento/ux101-group.jpg"
                alt="UXHI UX 101 workshop presenters"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:hidden rounded-[100px] overflow-hidden relative min-h-[350px]">
              <Image
                src="/images/bento/crowd-community.jpg"
                alt="UXHI community gathering"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="font-display text-5xl text-white">500+</span>
                <span className="block text-white/90 text-sm mt-1">Members and counting</span>
              </div>
            </div>
            <div className="lg:hidden rounded-[80px] overflow-hidden relative min-h-[280px]">
              <Image
                src="/images/bento/photobooth.jpg"
                alt="UXHI members at photo booth"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-600/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-4 right-4 text-center">
                <span className="font-display text-2xl text-white leading-tight">Connect, learn, grow together</span>
              </div>
            </div>
            <div className="lg:hidden rounded-t-[100px] rounded-b-[28px] bg-teal-500 p-6 pt-10 flex items-start justify-center text-white text-center min-h-[200px]">
              <span className="text-lg leading-snug font-medium">From students to industry leaders, all designers are welcome</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-[26px] md:text-[34px] lg:text-[42px] leading-tight text-gray-900">
            UXHI&apos;s mission is to connect and elevate the field of{" "}
            <span className="text-teal-500 relative inline-block cursor-pointer group/ux hover:text-gray-900 transition-colors">
              UX
              <Image
                src="/images/ux-circle.png"
                alt=""
                width={70}
                height={55}
                className="absolute -left-3 -right-2 -top-2 -bottom-1 w-[calc(100%+20px)] h-[calc(100%+12px)] pointer-events-none object-contain"
              />
              {/* Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-3 bg-white text-gray-700 text-sm font-body font-normal rounded-xl shadow-lg border border-gray-100 w-64 text-left opacity-0 invisible group-hover/ux:opacity-100 group-hover/ux:visible transition-all duration-200 delay-300 z-50">
                UX is the overall experience a user has when interacting with a product or service.
                {/* Tail */}
                <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm" />
              </span>
            </span>{" "}
            and{" "}
            <span className="text-teal-500 relative inline-block cursor-pointer group/hcd hover:text-gray-900 transition-colors whitespace-nowrap">
              human-centered design
              {/* Underline image */}
              <Image
                src="/images/underline.png"
                alt=""
                width={300}
                height={10}
                className="absolute left-0 right-0 -bottom-1 w-full h-auto pointer-events-none"
              />
              {/* Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-3 bg-white text-gray-700 text-sm font-body font-normal rounded-xl shadow-lg border border-gray-100 w-80 text-left opacity-0 invisible group-hover/hcd:opacity-100 group-hover/hcd:visible transition-all duration-200 delay-300 z-50 whitespace-normal">
                Human-centered design is an approach that prioritizes the unique needs of users.
                {/* Tail */}
                <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm" />
              </span>
            </span>{" "}
            for the people of Hawaiʻi{" "}
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
            <div className="border border-purple-500/30 rounded-[24px] p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-6 text-teal-400">
                <SlackIcon className="w-full h-full" />
              </div>
              <h3 className="font-display text-2xl text-white mb-4">Free Membership</h3>
              <p className="text-purple-200 leading-relaxed">
                Connect with other UX&apos;ers, then keep the conversation going in our Slack community or tap into our membership directory.
              </p>
            </div>

            {/* Events */}
            <div className="border border-purple-500/30 rounded-[24px] p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-6 text-teal-400">
                <CalendarIcon className="w-full h-full" />
              </div>
              <h3 className="font-display text-2xl text-white mb-4">Events</h3>
              <p className="text-purple-200 leading-relaxed">
                Experience an array of educational webinars, interactive workshops, and casual meetups we host each month, both virtual and in-person
              </p>
            </div>

            {/* Resources */}
            <div className="border border-purple-500/30 rounded-[24px] p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-6 text-teal-400">
                <BookOpenIcon className="w-full h-full" />
              </div>
              <h3 className="font-display text-2xl text-white mb-4">Resources</h3>
              <p className="text-purple-200 leading-relaxed">
                Discover and share resources in our online content hub to support your UX journey and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-2">
              Follow us on Linkedin and Instagram
            </h2>
            <p className="text-gray-600 text-lg">Stay connected with our latest events and community updates</p>
          </div>

          <InstagramFeed posts={instagramPosts || []} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-2">
              Member sentiments title
            </h2>
            <p className="text-gray-600 text-lg">Trusted by Thousands of Successful Students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm">
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;Receiving education support has been a life-changing experience for me. It gave me the financial freedom and confidence to focus fully on my studies without&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-pink-400" />
                <div>
                  <p className="font-medium text-teal-500">Emma Helson</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm">
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;Getting education support has been truly life-changing. It gave me the stability and assurance to concentrate fully on my learning without distractions.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-400" />
                <div>
                  <p className="font-medium text-teal-500">Sophia Marie</p>
                  <p className="text-sm text-gray-500">2 week ago</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm">
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;Education support has made a world of difference in my life. It offered me the security and confidence to focus completely on my academic goals without worry.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-300 to-green-400" />
                <div>
                  <p className="font-medium text-teal-500">Jackson Lee</p>
                  <p className="text-sm text-gray-500">3week ago</p>
                </div>
              </div>
            </div>
          </div>
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
              Joining UXHI is free! As a member, you gain access to our community Slack group with 400+ designers, an invitation to join our member directory, and early updates on the latest UX events through our monthly emails.
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
