import Image from "next/image";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { HeroContent } from "@/components/ui/HeroContent";
import { HeroSection } from "@/components/ui/HeroSection";
import { HeroEntrance, HeroItem, ScrollReveal, MotionDiv, FadeInOnMount } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MobileTooltip } from "@/components/ui/MobileTooltip";
import type { Metadata } from "next";
import { scaleReveal } from "@/lib/animations";

export const metadata: Metadata = {
  title: "Join us | UXHI",
  description:
    "Membership is free. Join UXHI to grow as a practitioner, build pilina with fellow designers, and help bring aloha-centered design to organizations across Hawaii.",
};

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-beige-10">
      {/* Hero Section */}
      <HeroSection>
        {/* Left Side - Content */}
        <HeroContent>
          <HeroEntrance className="flex flex-col gap-6">
            <HeroItem>
              <SectionHeading as="h1" size="hero" color="black">
                Become a member!
              </SectionHeading>
            </HeroItem>
            <HeroItem>
              <p className="text-black text-lg lg:text-xl leading-relaxed">
                Joining UXHI is free! As a member, you gain access to our community
                Slack group with 400+ designers, an invitation to join our member
                directory, and early updates on the latest UX events through our
                monthly emails.
              </p>
            </HeroItem>
            <HeroItem>
              <div>
                <PrimaryCTA href="#join-form">Join us</PrimaryCTA>
              </div>
            </HeroItem>
          </HeroEntrance>
        </HeroContent>

        {/* Mobile Bento - Horizontal layout (shown on <sm only) */}
        <div className="sm:hidden px-6 pb-8">
          <FadeInOnMount delay={0.5} className="flex gap-3.5 items-center w-full">
            <div className="flex-1 h-[140px] rounded-[99px] overflow-hidden relative">
              <Image src="/images/join/bento-join-01.png" alt="UXHI members" fill className="object-cover" />
            </div>
            <div className="w-[120px] shrink-0 flex items-center justify-center">
              <Image src="/images/motifs/uxhi-motif-2.svg" alt="UXHI motif" width={120} height={120} className="w-[120px] h-[120px]" />
            </div>
            <div className="flex-1 h-[140px] rounded-t-xl rounded-b-[99px] overflow-hidden relative">
              <Image src="/images/join/bento-join-02.png" alt="UXHICon 25" fill className="object-cover" />
            </div>
          </FadeInOnMount>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-[110px] xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only */}
          <FadeInOnMount delay={0.5} className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative">
              <Image src="/images/join/bento-join-01.png" alt="UXHI members" fill className="object-cover" />
            </div>
            <div className="w-[114px] mx-auto flex items-center justify-center">
              <Image src="/images/motifs/uxhi-motif-2.svg" alt="UXHI motif" width={114} height={114} className="w-[114px] h-[114px]" />
            </div>
            <div className="w-full h-[180px] rounded-t-[7px] rounded-b-[88px] overflow-hidden relative">
              <Image src="/images/join/bento-join-02.png" alt="UXHICon 25" fill className="object-cover" />
            </div>
          </FadeInOnMount>

          {/* MD+ layout - Two columns with absolute positioning */}
          <div className="hidden md:block relative w-full h-full">
            {/* Column 1 - Left (positioned higher) */}
            <FadeInOnMount delay={0.5} className="absolute bottom-[82px] lg:bottom-[92px] left-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[114px] lg:h-[128px] rounded-[24px] overflow-hidden relative">
                <Image src="/images/join/bento-join-03.png" alt="UXHI conference" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image src="/images/join/bento-join-01.png" alt="UXHI members" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/join/bento-join-02.png" alt="UXHICon 25" fill className="object-cover" />
              </div>
            </FadeInOnMount>
            {/* Column 2 - Right (positioned at bottom) */}
            <FadeInOnMount delay={0.7} className="absolute bottom-0 right-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/join/bento-join-04.png" alt="UXHI community members with leis" fill className="object-cover" />
              </div>
              <div className="w-[114px] lg:w-[128px] mx-auto flex items-center justify-center">
                <Image src="/images/motifs/uxhi-motif-2.svg" alt="UXHI motif" width={128} height={128} className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/join/bento-join-05.png" alt="UXHI photobooth" fill className="object-cover" />
              </div>
            </FadeInOnMount>
          </div>
        </div>
      </HeroSection>

      {/* How to Join Section */}
      <section id="join-form" className="py-20 px-6 bg-purple-140">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal stagger className="text-center mb-10">
            <MotionDiv>
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/motifs/uxhi-rounds-motif.svg"
                  alt=""
                  width={256}
                  height={256}
                />
              </div>
            </MotionDiv>
            <MotionDiv>
              <SectionHeading size="lg" color="white" className="mb-6">
                Join the community
              </SectionHeading>
            </MotionDiv>
            <MotionDiv>
              <p className="text-purple-50 text-lg leading-relaxed">
                Membership is free and easy – simply fill out the quick form below and we&apos;ll be in touch in a few days after we review your profile. As a member, you&apos;ll get access to our Membership Directory and Slack Community with 400+ designers!
                {/* Its own line: inline, it trailed a long paragraph and read
                    as part of the sentence rather than as a thing to tap. */}
                <MobileTooltip
                  tone="dark"
                  iconGap={2}
                  tooltip="Slack is a messaging app for teams that makes it easy to communicate and collaborate. Our UXHI Slack has 400+ designers sharing resources, job opportunities, and community support."
                  className="mt-3 !block underline underline-offset-2 w-fit mx-auto"
                >
                  What is Slack?
                </MobileTooltip>
              </p>
            </MotionDiv>
          </ScrollReveal>

          {/* Membership Form */}
          <MembershipForm />
        </div>
      </section>

      {/* Large Team Photo */}
      <section className="px-6 py-16 bg-white">
        <ScrollReveal variants={scaleReveal} className="max-w-[1300px] mx-auto">
          <div className="rounded-[32px] overflow-hidden aspect-[16/7] relative">
            <Image
              src="/images/join/image-conferece.jpg"
              alt="UXHI community group photo"
              fill
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
