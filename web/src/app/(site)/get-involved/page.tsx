import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved | UX Hawaii",
  description:
    "Join the UXHI community! Volunteer, speak at events, sponsor, partner, or donate to support UX in Hawaii.",
};

// Arrow Icon Component
function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-purple-700">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Get Involved
          </h1>
          <p className="text-purple-200 text-lg md:text-xl max-w-[600px] mx-auto">
            There are many ways to contribute to the UXHI community. Find the opportunity that fits you best.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 px-6 bg-purple-600">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#volunteer" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Volunteer
            </a>
            <a href="#speak" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Become a Speaker
            </a>
            <a href="#sponsor" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Sponsor Us
            </a>
            <a href="#partner" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Partner
            </a>
            <a href="#donate" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Donate
            </a>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-teal-500 text-sm font-medium uppercase tracking-wider mb-3 block">Volunteer</span>
              <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-6">
                Help grow our community
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Support UXHI by volunteering! There are many ways to be involved: join our committees, assist with events, contribute to our resources, support marketing efforts, and much more.
              </p>
              <ul className="text-gray-600 space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Join committees for initiatives like the UXHI Conference or State of UX Report</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Provide general assistance with our events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Support marketing needs like newsletters and social media</span>
                </li>
              </ul>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
              >
                <span className="text-gray-900">Learn more</span>
                <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                  <ArrowIcon className="w-4 h-4 text-gray-900" />
                </span>
              </Link>
            </div>
            <div className="rounded-[32px] overflow-hidden aspect-[4/3] relative bg-gray-100">
              <Image
                src="/images/bento/crowd-community.jpg"
                alt="UXHI volunteers at community event"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Speak Section */}
      <section id="speak" className="py-20 px-6 bg-cream scroll-mt-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-[32px] overflow-hidden aspect-[4/3] relative bg-gray-100">
              <Image
                src="/images/bento/conference.jpg"
                alt="Speaker presenting at UXHI event"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-teal-500 text-sm font-medium uppercase tracking-wider mb-3 block">Become a Speaker</span>
              <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-6">
                Share your expertise
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Have insights to share? Propose a topic related to UX and present at our UXHI Conference or monthly events. We welcome speakers of all experience levels.
              </p>
              <ul className="text-gray-600 space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Present at our annual UXHI Conference</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Lead workshops or webinars</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Contribute as a guest author for our resources</span>
                </li>
              </ul>
              <Link
                href="mailto:aloha@uxhi.community?subject=Speaker%20Inquiry"
                className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
              >
                <span className="text-gray-900">Get in touch</span>
                <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                  <ArrowIcon className="w-4 h-4 text-gray-900" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section id="sponsor" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-teal-500 text-sm font-medium uppercase tracking-wider mb-3 block">Sponsor Us</span>
              <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-6">
                Support UXHI events
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Help us create impactful events and programs by becoming a sponsor. Your support enables us to bring quality UX education and networking opportunities to Hawaii.
              </p>
              <ul className="text-gray-600 space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Sponsor our annual UXHI Conference</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Support monthly community events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Get visibility with Hawaii&apos;s UX community</span>
                </li>
              </ul>
              <Link
                href="mailto:aloha@uxhi.community?subject=Sponsorship%20Inquiry"
                className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
              >
                <span className="text-gray-900">Become a sponsor</span>
                <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                  <ArrowIcon className="w-4 h-4 text-gray-900" />
                </span>
              </Link>
            </div>
            <div className="rounded-[32px] overflow-hidden aspect-[4/3] relative bg-gray-100">
              <Image
                src="/images/bento/uxhicon-25.jpg"
                alt="UXHI Conference sponsors"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section id="partner" className="py-20 px-6 bg-cream scroll-mt-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-[32px] overflow-hidden aspect-[4/3] relative bg-gray-100">
              <Image
                src="/images/bento/group-leis.jpg"
                alt="UXHI partners at event"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-teal-500 text-sm font-medium uppercase tracking-wider mb-3 block">Partner</span>
              <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-6">
                Collaborate with us
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Partner with UXHI to co-create events, share resources, and build connections between our communities. We&apos;re always looking for like-minded organizations to collaborate with.
              </p>
              <ul className="text-gray-600 space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Co-host events and workshops</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Cross-promote to each other&apos;s communities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>Share resources and knowledge</span>
                </li>
              </ul>
              <Link
                href="mailto:aloha@uxhi.community?subject=Partnership%20Inquiry"
                className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
              >
                <span className="text-gray-900">Partner with us</span>
                <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                  <ArrowIcon className="w-4 h-4 text-gray-900" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-20 px-6 bg-teal-500 scroll-mt-24">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="text-white/80 text-sm font-medium uppercase tracking-wider mb-3 block">Donate</span>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Support our mission
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-[600px] mx-auto">
            Your donation helps us continue to grow and elevate the professional standard of Human-Centered Design in Hawaii. Every contribution makes a difference.
          </p>
          <Link
            href="mailto:aloha@uxhi.community?subject=Donation%20Inquiry"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Make a donation</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
