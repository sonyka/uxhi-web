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

// Committee data
const committees = [
  {
    name: "Educational Outreach",
    description: "Fosters UX education at foundational levels (K-12, colleges).",
  },
  {
    name: "Workforce Outreach",
    description: "Develops educational workshops for companies.",
  },
  {
    name: "Community Engagement",
    description: "Organizes social events and networking.",
  },
  {
    name: "Professional Development",
    description: "Provides continuous learning opportunities (workshops, webinars).",
  },
  {
    name: "Communications",
    description: "Manages website, social media, newsletters, and branding.",
  },
];

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
              Speaking Opportunities
            </a>
            <a href="#partner" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Partnerships
            </a>
            <a href="#sponsor" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Sponsorships
            </a>
            <a href="#donate" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Donations
            </a>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-6">
            Volunteer
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Support UXHI by volunteering! There are many ways to be involved:
          </p>
          <ul className="text-gray-700 space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Propose a topic related to the field of UX as a presenter at our UXHI Conference or events.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Propose a topic as a guest author for our Resources.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Join our committees for any of our initiatives, like the UXHI Conference or the State of UX Report.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Provide general assistance with our events.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Support with marketing needs like our newsletter and social media.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>And much more!</span>
            </li>
          </ul>
          <Link
            href="https://forms.gle/volunteer-inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Inquiry Form</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>

          {/* Committees Subsection */}
          <div className="mt-16">
            <h3 className="font-display text-2xl md:text-3xl text-purple-700 mb-8">
              Committees
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {committees.map((committee) => (
                <div key={committee.name} className="bg-cream rounded-[20px] p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{committee.name}</h4>
                  <p className="text-gray-600">{committee.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Opportunities Section */}
      <section id="speak" className="py-20 px-6 bg-cream scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-6">
            Speaking Opportunities
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Have an idea for a talk or a skill you&apos;d like to share? Whether you&apos;d like to teach an interactive workshop, host an education webinar, or a casual talk story session, give back to the community by sharing your experience. Preference is given to speakers with Hawai&apos;i ties.
          </p>
          <Link
            href="https://forms.gle/speaker-application"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Speaker Application Form</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partner" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-6">
            Partnerships
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Strong collaboration makes for strong results! We&apos;re always open to design-forward organizations and individuals who want to partner with us to build initiatives, host or sponsor events, and help us provide resources to our community.
          </p>
          <ul className="text-gray-700 space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Co-develop resources and/or programs.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Co-host events.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Sponsor workshops.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
              <span>Provide venue space or tech tools.</span>
            </li>
          </ul>
          <Link
            href="https://forms.gle/partnership-inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Inquiry Form</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* Sponsorships Section */}
      <section id="sponsor" className="py-20 px-6 bg-cream scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-purple-700 mb-6">
            Sponsorships
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Our sponsorship packages are designed to elevate your brand, showcase your products, and facilitate connections.
          </p>
          <Link
            href="mailto:aloha@uxhi.community?subject=Sponsorship%20Inquiry"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Email Us</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* Donations Section */}
      <section id="donate" className="py-20 px-6 bg-teal-500 scroll-mt-24">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Donations
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-[600px] mx-auto">
            Your donations help offset the out-of-pocket costs the team spends on website hosting and expenses for in-person events.
          </p>
          <Link
            href="https://donate.stripe.com/uxhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Donate</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
