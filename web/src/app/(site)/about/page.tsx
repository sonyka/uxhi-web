import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | UX Hawaii",
  description:
    "Learn about UX Hawaii, Hawaii's premier UX community dedicated to connecting, educating, and empowering UX professionals.",
};

export default function AboutPage() {
  return (
    <main className="py-20">
      <Container size="narrow">
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-5xl text-purple-700 mb-6">
            About UXHI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            UX Hawaii (UXHI) is a community-driven organization dedicated to
            fostering a supportive and inclusive environment for UX
            professionals in Hawaii.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="prose prose-lg max-w-none">
            <h2 className="font-display text-2xl text-purple-700 mt-12 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6">
              We believe in the power of community to elevate the practice of
              user experience design in Hawaii. Our mission is to connect UX
              professionals, provide educational opportunities, and create a
              platform for sharing knowledge and experiences.
            </p>

            <h2 className="font-display text-2xl text-purple-700 mt-12 mb-4">
              What We Do
            </h2>
            <ul className="text-gray-700 space-y-4 mb-6">
              <li>
                <strong>Community Building:</strong> We maintain an active Slack
                community with 400+ members where designers connect, share
                opportunities, and support each other.
              </li>
              <li>
                <strong>Events:</strong> From workshops to our annual conference,
                we host events that help UX professionals learn new skills and
                network with peers.
              </li>
              <li>
                <strong>Resources:</strong> We curate and share resources to help
                UX professionals at all levels grow their skills and careers.
              </li>
              <li>
                <strong>Member Directory:</strong> Our Find UX Pro directory
                helps connect businesses with local UX talent.
              </li>
            </ul>

            <h2 className="font-display text-2xl text-purple-700 mt-12 mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 mb-6">
              Founded in 2020, UXHI started as a small group of UX designers who
              wanted to build a local community. What began as informal meetups
              has grown into Hawaii&apos;s largest UX community with hundreds of
              members across the islands.
            </p>

            <h2 className="font-display text-2xl text-purple-700 mt-12 mb-4">
              Join Us
            </h2>
            <p className="text-gray-700">
              Whether you&apos;re a seasoned UX professional or just curious
              about the field, we welcome you to join our community. Membership
              is free and includes access to our Slack group, events, and
              resources.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </main>
  );
}
