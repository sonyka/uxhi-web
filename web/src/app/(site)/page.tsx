import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UXHI - A UX design community for people in Hawai'i",
  description:
    "Join 500+ UX professionals, students, and curious individuals in Hawaii. Connect, learn, and grow together with UXHI.",
};

// Arrow Icon Component
function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

// Person Icon for membership
function PersonIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 11l1.5 1.5L13 10" />
    </svg>
  );
}

// Calendar Icon
function CalendarIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

// Document Icon
function DocumentIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          {/* Member Badge */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-6 py-2 mb-10 border border-gray-100 shadow-sm">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 border-2 border-white overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-amber-400 to-amber-600 opacity-80" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-300 via-sky-400 to-sky-500 border-2 border-white overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-sky-400 to-sky-600 opacity-80" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-500 border-2 border-white overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-emerald-400 to-emerald-600 opacity-80" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 via-rose-300 to-rose-400 border-2 border-white overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-rose-400 to-rose-500 opacity-80" />
              </div>
            </div>
            <span className="text-[15px] text-gray-700 font-medium">500 members and growing</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-[80px] leading-[1.05] tracking-tight text-gray-900 mb-10 max-w-[900px] mx-auto">
            A UX design community for people in Hawai&apos;i
          </h1>

          {/* CTA Button */}
          <Link
            href="/join"
            className="inline-flex items-center gap-3 bg-purple-700 text-white rounded-full pl-7 pr-2 py-2 font-medium text-lg hover:bg-purple-800 transition-colors group"
          >
            <span>Join us</span>
            <span className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center group-hover:bg-teal-400 transition-colors">
              <ArrowIcon className="w-5 h-5 text-white" />
            </span>
          </Link>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-12 px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* Image 1 - Group photo with QR (tall oval) */}
            <div className="lg:col-span-1 lg:row-span-2 min-h-[420px] rounded-[120px] overflow-hidden bg-gradient-to-br from-slate-600 to-slate-800 relative">
              <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
                <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 text-center p-1">
                  Take our pre-session survey
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/30" />
                  <div className="w-10 h-10 rounded-full bg-white/30" />
                  <div className="w-10 h-10 rounded-full bg-white/30" />
                </div>
              </div>
            </div>

            {/* Year Founded */}
            <div className="lg:col-span-1 min-h-[200px] rounded-[32px] bg-teal-500 p-6 flex flex-col justify-end text-white">
              <span className="font-display text-6xl leading-none">2021</span>
              <span className="text-lg mt-2 opacity-90">Year founded</span>
            </div>

            {/* Large Community Image (tall oval) */}
            <div className="lg:col-span-1 lg:row-span-2 min-h-[420px] rounded-[120px] overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 relative">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <span className="font-display text-5xl text-white">488+</span>
                <span className="block text-white/90 text-lg">Members and counting</span>
              </div>
            </div>

            {/* Join Community Card (tall) */}
            <div className="lg:col-span-1 lg:row-span-2 min-h-[420px] rounded-[32px] bg-purple-700 p-6 flex flex-col">
              <p className="text-white/90 text-[15px] leading-relaxed flex-1">
                Whether you&apos;re curious about UX, looking to make a career switch, or are a working professional in the field, come join our free UXHI community to connect and learn with new UX friends, expand your professional network, and stay updated on the latest UXHI events.
              </p>
              <Link
                href="/join"
                className="mt-4 inline-flex items-center justify-center gap-2 bg-white text-purple-700 rounded-full py-3 px-6 font-medium hover:bg-gray-100 transition-colors"
              >
                Join Community
              </Link>
            </div>

            {/* Connect Card with Photo (tall oval) */}
            <div className="lg:col-span-1 lg:row-span-2 min-h-[420px] rounded-[120px] overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 relative">
              <div className="absolute bottom-8 left-6 right-6 text-center">
                <span className="font-display text-2xl text-white leading-tight">Connect, learn, grow together</span>
              </div>
            </div>

            {/* From Students Card (tall half-oval) */}
            <div className="lg:col-span-1 lg:row-span-2 min-h-[420px] rounded-t-[120px] rounded-b-[32px] bg-teal-500 p-6 pt-12 flex items-start justify-center text-white text-center">
              <span className="text-lg leading-snug font-medium max-w-[180px]">From students to industry leaders, all designers are welcome</span>
            </div>

            {/* Annual Conference */}
            <div className="lg:col-span-1 min-h-[200px] rounded-[32px] overflow-hidden bg-gradient-to-br from-slate-600 to-slate-800 relative">
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <span className="font-display text-xl text-white leading-tight">UXHI Annual Conference</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900">
            UXHI&apos;s mission is to connect and elevate the field of{" "}
            <span className="text-teal-500 relative inline-block">
              UX
              <svg className="absolute -bottom-1 left-0 w-full h-4" viewBox="0 0 60 15" preserveAspectRatio="none">
                <ellipse cx="30" cy="7" rx="28" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-500" />
              </svg>
            </span>{" "}
            and{" "}
            <span className="text-teal-500 underline decoration-wavy decoration-teal-500 underline-offset-4">
              human-centered design
            </span>{" "}
            for the people of Hawai&apos;i{" "}
            <span className="inline-block">🌺</span>
          </h2>
        </div>
      </section>

      {/* Large Community Photo */}
      <section className="px-6 pb-16">
        <div className="max-w-[1300px] mx-auto">
          <div className="rounded-[32px] overflow-hidden aspect-[16/7] relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800">
            <div className="absolute inset-0 flex items-end justify-center pb-8">
              <div className="flex gap-2">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Learn Grow Section */}
      <section className="py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-6">
            Connect, Learn, Grow Together
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-[600px] mx-auto">
            Whether you&apos;re curious about UX, looking to make a career switch, or are a working professional in the field, come join our free UXHI community to connect and learn with new UX friends, expand your professional network, and stay updated on the latest UXHI events.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Learn more</span>
            <span className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center group-hover:bg-teal-400 transition-colors">
              <ArrowIcon className="w-4 h-4 text-white" />
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
                <PersonIcon className="w-full h-full" />
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
                <DocumentIcon className="w-full h-full" />
              </div>
              <h3 className="font-display text-2xl text-white mb-4">Resources</h3>
              <p className="text-purple-200 leading-relaxed">
                Discover and share resources in our online content hub to support your UX journey and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media / Instagram Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-2">
              Social Media Title
            </h2>
            <p className="text-gray-600">Subtitle</p>
          </div>

          {/* Instagram Grid - Speaker Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1 - UXHI 2025 */}
            <div className="rounded-[20px] overflow-hidden aspect-square relative bg-gradient-to-br from-slate-500 to-slate-700 p-4">
              <span className="text-white font-display text-xl">UXHI 2025</span>
            </div>

            {/* Card 2 - Speaker Series */}
            <div className="rounded-[20px] overflow-hidden aspect-square relative bg-teal-700 p-4 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-white/80 text-xs uppercase tracking-wider">Speaker Series</span>
                <span className="text-white font-display text-sm">UXHI<span className="text-teal-400">CONF25</span></span>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-12 h-12 rounded-full bg-white/30" />
                <div className="w-12 h-12 rounded-full bg-white/30" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/30 mx-auto mb-2" />
              <h3 className="font-display text-white text-xs leading-tight text-center mt-auto">
                Innovating Within Boundaries: Designing Change in Regulated Systems
              </h3>
            </div>

            {/* Card 3 - Kim Davidson */}
            <div className="rounded-[20px] overflow-hidden aspect-square relative bg-teal-700 p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-white/80 text-xs uppercase tracking-wider">Speaker Series</span>
                <span className="text-white font-display text-sm">UXHI<span className="text-teal-400">CONF25</span></span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/30 mb-2" />
                <p className="text-white text-xs text-center">Kim Davidson</p>
                <p className="text-white/70 text-[9px] text-center mb-2">CPO, New River Strategies</p>
              </div>
              <h3 className="font-display text-white text-xs text-center leading-tight">
                An Introduction to Tech Criticism
              </h3>
            </div>

            {/* Card 4 - Michelle & Gage */}
            <div className="rounded-[20px] overflow-hidden aspect-square relative bg-teal-700 p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-white/80 text-xs uppercase tracking-wider">Speaker Series</span>
                <span className="text-white font-display text-sm">UXHI<span className="text-teal-400">CONF25</span></span>
              </div>
              <div className="flex gap-2 justify-center mb-2 flex-1 items-center">
                <div className="w-12 h-12 rounded-full bg-white/30" />
                <div className="w-12 h-12 rounded-full bg-white/30" />
              </div>
              <p className="text-white text-xs text-center mb-1">Michelle Tran &amp; Gage Minamoto</p>
              <h3 className="font-display text-white text-xs text-center leading-tight">
                Impossible to Ignore: Expanding Your Luck for Design Opportunities
              </h3>
            </div>

            {/* Row 2 */}
            {/* Card 5 - Panel Series */}
            <div className="rounded-[20px] overflow-hidden aspect-square relative bg-teal-700 p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-white/80 text-xs uppercase tracking-wider">Panel Series</span>
                <span className="text-white font-display text-sm">UXHI<span className="text-teal-400">CONF25</span></span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2 flex-1 content-center">
                <div className="w-10 h-10 rounded-full bg-white/30 mx-auto" />
                <div className="w-10 h-10 rounded-full bg-white/30 mx-auto" />
                <div className="w-10 h-10 rounded-full bg-white/30 mx-auto" />
                <div className="w-10 h-10 rounded-full bg-white/30 mx-auto" />
              </div>
              <h3 className="font-display text-white text-xs text-center leading-tight">
                Generative AI and the Future of UX
              </h3>
            </div>

            {/* Card 6 - Listening with Aloha */}
            <div className="rounded-[20px] overflow-hidden aspect-square relative bg-teal-700 p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-white/80 text-xs uppercase tracking-wider">Speaker Series</span>
                <span className="text-white font-display text-sm">UXHI<span className="text-teal-400">CONF25</span></span>
              </div>
              <div className="flex gap-2 justify-center flex-1 items-center">
                <div className="w-12 h-12 rounded-full bg-white/30" />
                <div className="w-12 h-12 rounded-full bg-white/30" />
              </div>
              <h3 className="font-display text-white text-xs text-center leading-tight">
                Listening with Aloha: Designing research that feeds the people who feed us
              </h3>
            </div>

            {/* Card 7 - State of UX */}
            <div className="rounded-[20px] overflow-hidden aspect-square relative bg-teal-700 p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-white/80 text-xs uppercase tracking-wider">Speaker Series</span>
                <span className="text-white font-display text-sm">UXHI<span className="text-teal-400">CONF25</span></span>
              </div>
              <div className="flex gap-2 justify-center flex-1 items-center">
                <div className="w-12 h-12 rounded-full bg-white/30" />
                <div className="w-12 h-12 rounded-full bg-white/30" />
              </div>
              <h3 className="font-display text-white text-xs text-center leading-tight">
                State of UX in Hawai&apos;i: A Snapshot of Our Strengths &amp; Challenges
              </h3>
            </div>

            {/* Card 8 - Sponsors */}
            <div className="rounded-[20px] overflow-hidden aspect-square relative bg-teal-700 p-4 flex flex-col">
              <div className="flex justify-end items-start mb-2">
                <span className="text-white font-display text-sm">UXHI<span className="text-teal-400">CONF25</span></span>
              </div>
              <h3 className="font-display text-white text-lg mb-3">
                Mahalo to Our Sponsors
              </h3>
              <div className="grid grid-cols-2 gap-2 flex-1 content-start">
                <div className="bg-white/10 rounded-lg p-2 h-8 flex items-center justify-center">
                  <span className="text-white text-xs">HTDC</span>
                </div>
                <div className="bg-white/10 rounded-lg p-2 h-8 flex items-center justify-center">
                  <span className="text-white text-xs">Sandbox</span>
                </div>
                <div className="bg-white/10 rounded-lg p-2 h-8 flex items-center justify-center">
                  <span className="text-white text-xs">Purple</span>
                </div>
                <div className="bg-white/10 rounded-lg p-2 h-8 flex items-center justify-center">
                  <span className="text-white text-xs">OER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-2">
              Member sentiments title
            </h2>
            <p className="text-gray-600">Trusted by Thousands of Successful Students</p>
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
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Floating Photos Grid */}
          <div className="relative h-[250px] mb-8 overflow-hidden">
            {[
              { left: "2%", top: "10%", w: 80, h: 100, rotate: -5 },
              { left: "12%", top: "35%", w: 70, h: 90, rotate: 3 },
              { left: "22%", top: "5%", w: 90, h: 115, rotate: -2 },
              { left: "35%", top: "20%", w: 80, h: 100, rotate: 5 },
              { left: "48%", top: "30%", w: 70, h: 90, rotate: -3 },
              { left: "58%", top: "8%", w: 80, h: 100, rotate: 2 },
              { left: "70%", top: "25%", w: 90, h: 115, rotate: -4 },
              { left: "82%", top: "12%", w: 70, h: 90, rotate: 6 },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute rounded-xl bg-gradient-to-br from-gray-300 to-gray-400"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: pos.w,
                  height: pos.h,
                  transform: `rotate(${pos.rotate}deg)`,
                }}
              />
            ))}
          </div>

          {/* CTA Content */}
          <div className="text-center">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-teal-500 mb-6">
              A community for designers, by designers
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-[700px] mx-auto">
              Joining UXHI is free! As a member, you gain access to our community Slack group with 400+ designers, an invitation to join our member directory, and early updates on the latest UX events through our monthly emails.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-3 bg-purple-700 text-white rounded-full pl-7 pr-2 py-2 font-medium text-lg hover:bg-purple-800 transition-colors group"
            >
              <span>Join us</span>
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowIcon className="w-5 h-5 text-white" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
