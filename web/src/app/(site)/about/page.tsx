import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { FOUNDERS_QUERY, FAQS_QUERY } from "@/sanity/lib/queries";
import { AboutHero } from "@/components/sections/AboutHero";
import { MissionSection } from "@/components/sections/MissionSection";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { FAQSection } from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "About | UX Hawaii",
  description:
    "Learn about UX Hawaii, Hawaii's premier UX community dedicated to connecting, educating, and empowering UX professionals.",
};

// Arrow Icon Component
function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default async function AboutPage() {
  const [foundersResult, faqsResult] = await Promise.all([
    sanityFetch({ query: FOUNDERS_QUERY }),
    sanityFetch({ query: FAQS_QUERY }),
  ]);

  const founders = foundersResult.data || [];
  const faqs = faqsResult.data || [];

  return (
    <main>
      <AboutHero />

      {/* Quick Links */}
      <section className="py-6 px-6 bg-purple-600">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#team" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Team
            </a>
            <a href="#faqs" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              FAQs
            </a>
            <a href="#contact" className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors">
              Contact
            </a>
          </div>
        </div>
      </section>

      <MissionSection />
      <FoundersSection founders={founders} id="team" />
      <FAQSection faqs={faqs} id="faqs" />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-teal-500 scroll-mt-24">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Get in touch
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-[600px] mx-auto">
            Have questions, ideas, or want to collaborate? We&apos;d love to hear from you. Reach out to our team and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:aloha@uxhi.community"
              className="inline-flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-900">Email us</span>
              <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/30 rounded-full pl-6 pr-2 py-2 font-medium text-white hover:bg-white/20 transition-colors group"
            >
              <span>Join our Slack</span>
              <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowIcon className="w-4 h-4 text-white" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
