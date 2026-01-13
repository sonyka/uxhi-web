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
      <MissionSection />
      <FoundersSection founders={founders} />
      <FAQSection faqs={faqs} />
    </main>
  );
}
