import { sanityFetch } from "@/sanity/lib/live";
import { LANDING_PAGE_QUERY } from "@/sanity/lib/queries";
import { PageBuilder } from "@/components/blocks/PageBuilder";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Features } from "@/components/sections/Features";
import { CallToAction } from "@/components/sections/CallToAction";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: LANDING_PAGE_QUERY,
    stega: false,
  });

  return {
    title:
      data?.seo?.metaTitle || "UX Hawaii - Hawaii's Premier UX Community",
    description:
      data?.seo?.metaDescription ||
      "Join 500+ UX professionals, students, and curious individuals in Hawaii. Connect, learn, and grow together with UXHI.",
    openGraph: {
      images: data?.seo?.ogImage?.asset?.url
        ? [{ url: data.seo.ogImage.asset.url }]
        : [],
    },
  };
}

export default async function HomePage() {
  const { data } = await sanityFetch({ query: LANDING_PAGE_QUERY });

  // If we have page builder content from Sanity, use it
  if (data?.pageBuilder && data.pageBuilder.length > 0) {
    return <PageBuilder content={data.pageBuilder} />;
  }

  // Fallback: Default landing page content when Sanity is empty
  return (
    <main>
      <Hero
        badge="500 members and growing"
        headline="A UX design community for people in Hawai'i"
        subheadline="Join our community of UX professionals, students, and curious individuals. Connect, learn, and grow together."
        primaryCta={{ label: "Join Us", url: "/join" }}
        secondaryCta={{ label: "Learn More", url: "/about" }}
      />

      <Stats
        stats={[
          { value: "2020", label: "Year Founded" },
          { value: "480+", label: "Members" },
          { value: "50+", label: "Events" },
          { value: "100%", label: "Free" },
        ]}
        backgroundColor="teal"
      />

      <Features
        eyebrow="Why Join UXHI"
        heading="Connect, Learn, Grow Together"
        description="UXHI is dedicated to fostering a supportive and inclusive community for UX professionals in Hawaii."
        features={[
          {
            icon: "users",
            title: "Community Slack",
            description:
              "Connect with 400+ designers in our active Slack community. Share ideas, get feedback, and build relationships.",
          },
          {
            icon: "calendar",
            title: "Regular Events",
            description:
              "From workshops to conferences, we host events that help you learn new skills and meet fellow UX professionals.",
          },
          {
            icon: "gift",
            title: "Free Membership",
            description:
              "Joining UXHI is completely free. Get access to all community resources, events, and our member directory.",
          },
        ]}
        layout="grid"
      />

      <CallToAction
        heading="Ready to join Hawaii's UX community?"
        description="Joining UXHI is free! As a member, you gain access to our community Slack group with 400+ designers, an invitation to join our member directory, and early updates on the latest UX events."
        buttonLabel="Join the Community"
        buttonUrl="/join"
        style="purple"
      />
    </main>
  );
}
