import Image from "next/image";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { DIRECTORY_MEMBERS_QUERY } from "@/sanity/lib/queries";
import { MemberDirectory } from "@/components/directory";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { DirectorySubmitForm } from "@/components/forms/DirectorySubmitForm";
import { SectionIcon } from "@/components/ui/SectionIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroContent } from "@/components/ui/HeroContent";
import { HeroEntrance, HeroItem, ScrollReveal, MotionDiv, FadeInOnMount } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Find Experts | UX Hawaii",
  description:
    "Connect with UX professionals in Hawaii. Browse our member directory to find designers, researchers, and UX specialists.",
};

export default async function FindUXProPage() {
  const { data: members } = await sanityFetch({ query: DIRECTORY_MEMBERS_QUERY });

  return (
    <main className="min-h-screen bg-beige-10">
      {/* Hero Section */}
      <div className="relative min-h-[564px] sm:min-h-[746px] md:min-h-[747px] lg:min-h-[700px]">
        {/* Left Side - Content */}
        <HeroContent>
          <HeroEntrance className="flex flex-col gap-6">
            <HeroItem>
              <SectionHeading as="h1" size="hero" color="black">
                Find A UX Professional
              </SectionHeading>
            </HeroItem>
            <HeroItem>
              <p className="text-black text-lg lg:text-xl leading-relaxed">
                Connect with talented UX design professionals in Hawaiʻi and those
                with Hawaiʻi ties, across all experience levels.
              </p>
            </HeroItem>
            <HeroItem>
              <div className="flex flex-wrap gap-3">
                <PrimaryCTA href="#directory">Browse the directory</PrimaryCTA>
                <PrimaryCTA href="#join-directory" variant="subdued">Join the directory</PrimaryCTA>
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
                fill
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
                fill
                className="object-cover"
              />
            </div>
          </FadeInOnMount>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-0 xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only */}
          <FadeInOnMount delay={0.5} className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative">
              <Image
                src="/images/find-ux-pro/bento-find-ux-01.png"
                alt="UXHI community"
                fill
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
                fill
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
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image
                  src="/images/find-ux-pro/bento-find-ux-01.png"
                  alt="UXHI community"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/find-ux-pro/bento-find-ux-02.png"
                  alt="UXHI conference"
                  fill
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
                  fill
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
                  fill
                  className="object-cover"
                />
              </div>
            </FadeInOnMount>
          </div>
        </div>
      </div>

      {/* Member Directory Section */}
      <section id="directory" className="py-12 px-6 bg-white scroll-mt-24">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal stagger className="max-w-[900px] mx-auto text-center mb-10">
            <MotionDiv>
              <SectionHeading className="mb-4">
                Member Directory
              </SectionHeading>
            </MotionDiv>
            <MotionDiv>
              <p className="text-gray-120 text-lg leading-relaxed">
                Welcome to the UXHI Member Directory, your hub for connecting with
                UX design professionals in Hawaiʻi and those with Hawaiʻi ties,
                across all experience levels. Not only does this serve as a go-to
                resource for companies and recruiters seeking talented local UX
                professionals, but it also fosters connections between UX
                practitioners themselves.
              </p>
            </MotionDiv>
          </ScrollReveal>
          <MemberDirectory members={members || []} />
        </div>
      </section>

      {/* Join Directory Section */}
      <section id="join-directory" className="py-20 px-6 bg-purple-140 scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal stagger className="text-center">
            {/* Directory Icon */}
            <MotionDiv>
              <SectionIcon src="/images/icons/icon-directory.svg" alt="Directory" />
            </MotionDiv>
            <MotionDiv>
              <SectionHeading color="white" className="mb-8">
                Join our member directory!
              </SectionHeading>
            </MotionDiv>
            <MotionDiv>
              <p className="text-purple-50 text-lg leading-relaxed mb-4">
                Are you a UX professional with ties to Hawaiʻi? Add yourself to the
                directory and connect with our growing community. Whether you&apos;re
                looking for new opportunities, seeking collaborators, or wanting to
                give back as a mentor, this is your chance to be discovered.
              </p>
            </MotionDiv>
            <MotionDiv>
              <p className="text-purple-50 text-lg leading-relaxed mb-10">
                UX professionals and anyone transitioning into UX design who lives
                in Hawaiʻi or has strong ties to Hawaiʻi can join. Your request
                will automatically be added to the directory and a UXHI team
                member will manually add your head shot and island, if applicable,
                within a few business days.
              </p>
            </MotionDiv>
          </ScrollReveal>

          {/* Directory Submission Form */}
          <DirectorySubmitForm />
        </div>
      </section>
    </main>
  );
}
