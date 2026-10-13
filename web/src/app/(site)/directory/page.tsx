import Image from "next/image";
import type { Metadata } from "next";
import { sanityFetchCached } from "@/sanity/lib/fetchCached";
import { DIRECTORY_MEMBERS_QUERY } from "@/sanity/lib/queries";
import { MemberDirectory } from "@/components/directory";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { InlineLink } from "@/components/ui/InlineLink";
import { SectionIcon } from "@/components/ui/SectionIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLead } from "@/components/ui/SectionLead";
import { HeroContent } from "@/components/ui/HeroContent";
import { HeroSection } from "@/components/ui/HeroSection";
import { HeroEntrance, HeroItem, ScrollReveal, MotionDiv, FadeInOnMount } from "@/components/ui/motion";

export { viewportBeige30 as viewport } from "@/lib/themeColor";

export const metadata: Metadata = {
  title: "Member Directory | UXHI",
  description:
    "Connect with UX professionals in Hawaii. Browse our member directory to find designers, researchers, and UX specialists.",
};

export default async function DirectoryPage() {
  const { data: members } = await sanityFetchCached({ query: DIRECTORY_MEMBERS_QUERY });

  return (
    <main className="min-h-screen bg-beige-30">
      {/* Hero Section */}
      <HeroSection>
        {/* Left Side - Content */}
        <HeroContent>
          <HeroEntrance className="flex flex-col gap-6">
            <HeroItem>
              {/* The browser tab says the same; the nav shortens it to "Members". */}
              <SectionHeading as="h1" size="hero">
                Member Directory
              </SectionHeading>
            </HeroItem>
            <HeroItem>
              <SectionLead size="lg">
                Connect with a growing community of people passionate about
                human-centered, aloha-centered design in Hawaiʻi and beyond.
              </SectionLead>
            </HeroItem>
            <HeroItem>
              <div className="flex flex-wrap gap-3">
                <PrimaryCTA href="#directory">Browse the directory</PrimaryCTA>
              </div>
            </HeroItem>
          </HeroEntrance>
        </HeroContent>

        {/* Mobile Bento - Horizontal layout (shown on <sm only) */}
        <div className="sm:hidden px-6 pb-8">
          <FadeInOnMount delay={0.5} className="flex gap-3.5 items-center w-full">
            <div className="flex-1 h-[140px] rounded-[99px] overflow-hidden relative">
              <Image
                src="/images/find-ux-pro/bento-find-ux-01.png"
                alt="UXHI community"
                fill sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="w-[120px] shrink-0 flex items-center justify-center">
              <Image
                src="/images/motifs/uxhi-motif-2.svg"
                alt="UXHI motif"
                width={120}
                height={120}
                className="w-[120px] h-[120px]"
              />
            </div>
            <div className="flex-1 h-[140px] rounded-t-xl rounded-b-[99px] overflow-hidden relative">
              <Image
                src="/images/find-ux-pro/bento-find-ux-02.png"
                alt="UXHI conference"
                fill sizes="200px"
                className="object-cover"
              />
            </div>
          </FadeInOnMount>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-[110px] xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only */}
          <FadeInOnMount delay={0.5} className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative">
              <Image
                src="/images/find-ux-pro/bento-find-ux-01.png"
                alt="UXHI community"
                fill sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="w-[114px] mx-auto flex items-center justify-center">
              <Image
                src="/images/motifs/uxhi-motif-2.svg"
                alt="UXHI motif"
                width={114}
                height={114}
                className="w-[114px] h-[114px]"
              />
            </div>
            <div className="w-full h-[180px] rounded-t-[7px] rounded-b-[88px] overflow-hidden relative">
              <Image
                src="/images/find-ux-pro/bento-find-ux-02.png"
                alt="UXHI conference"
                fill sizes="200px"
                className="object-cover"
              />
            </div>
          </FadeInOnMount>

          {/* MD+ layout - Two columns with absolute positioning */}
          <div className="hidden md:block relative w-full h-full">
            {/* Column 1 - Left (positioned higher) */}
            <FadeInOnMount delay={0.5} className="absolute bottom-[82px] lg:bottom-[92px] left-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[114px] lg:h-[128px] rounded-[24px] overflow-hidden relative">
                <Image
                  src="/images/find-ux-pro/bento-find-ux-03.png"
                  alt="UX101 group"
                  fill sizes="200px"
                  className="object-cover"
                />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image
                  src="/images/find-ux-pro/bento-find-ux-01.png"
                  alt="UXHI community"
                  fill sizes="200px"
                  className="object-cover"
                />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/find-ux-pro/bento-find-ux-02.png"
                  alt="UXHI conference"
                  fill sizes="200px"
                  className="object-cover"
                />
              </div>
            </FadeInOnMount>
            {/* Column 2 - Right (positioned at bottom) */}
            <FadeInOnMount delay={0.7} className="absolute bottom-0 right-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/find-ux-pro/bento-find-ux-04.png"
                  alt="UXHICon"
                  fill sizes="200px"
                  className="object-cover"
                />
              </div>
              <div className="w-[114px] lg:w-[128px] mx-auto flex items-center justify-center">
                <Image
                  src="/images/motifs/uxhi-motif-2.svg"
                  alt="UXHI motif"
                  width={128}
                  height={128}
                  className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]"
                />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image
                  src="/images/find-ux-pro/bento-find-ux-05.png"
                  alt="UXHI photobooth"
                  fill sizes="200px"
                  className="object-cover"
                />
              </div>
            </FadeInOnMount>
          </div>
        </div>
      </HeroSection>

      {/* Member directory listing. No heading of its own: the hero names it
          and its button lands here. */}
      <section id="directory" className="py-12 px-6 bg-beige-30 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto">
          <MemberDirectory members={members || []} />
        </div>
      </section>

      {/* Get Listed Section. The profile form itself lives on /add-profile:
          new people join first (and add a profile as step 2 of /join), and
          existing members are invited there by email. Kept as #join-directory
          so older links still land here. */}
      <section id="join-directory" className="py-20 px-6 bg-purple-140 scroll-mt-24">
        <ScrollReveal stagger className="max-w-[700px] mx-auto text-center">
          <MotionDiv>
            <SectionIcon src="/images/icons/icon-directory.svg" alt="" />
          </MotionDiv>
          <MotionDiv>
            <SectionHeading color="white" className="mb-6">
              Want to be listed?
            </SectionHeading>
          </MotionDiv>
          <MotionDiv>
            <SectionLead size="lg" color="white" className="mb-10">
              The directory is for UXHI members. Membership is free, and you can
              add your profile as soon as you join.
            </SectionLead>
          </MotionDiv>
          <MotionDiv>
            {/* Straight to the form: /join's hero is for people still deciding,
                and anyone pressing this has already decided. */}
            <div className="flex flex-wrap justify-center gap-3">
              <PrimaryCTA href="/join#join-form">Join the community</PrimaryCTA>
              <PrimaryCTA href="/add-profile" variant="dark">Add your profile</PrimaryCTA>
            </div>
          </MotionDiv>
          <MotionDiv>
            <p className="text-white mt-10">
              Need to change your listing?{" "}
              <InlineLink href="/about?interest=Updating+my+directory+profile#contact">Let us know</InlineLink>
            </p>
          </MotionDiv>
        </ScrollReveal>
      </section>
    </main>
  );
}
