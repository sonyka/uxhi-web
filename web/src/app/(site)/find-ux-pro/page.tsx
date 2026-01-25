import Image from "next/image";
import type { Metadata } from "next";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";

export const metadata: Metadata = {
  title: "Find UX Pro | UX Hawaii",
  description:
    "Connect with UX professionals in Hawaii. Browse our member directory to find designers, researchers, and UX specialists.",
};

export default function FindUXProPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[564px] sm:min-h-[746px] md:min-h-[747px] lg:min-h-[700px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-6 pt-32 pb-8 sm:max-w-[411px] md:max-w-[calc(100%-340px)] md:pl-10 lg:pl-24 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[583px] xl:max-w-[733px]">
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl leading-[40px] lg:text-5xl lg:leading-[60px] xl:leading-[84px] text-black">
              Find A UX Professional
            </h1>
            <p className="text-black text-lg lg:text-xl leading-relaxed">
              Connect with talented UX design professionals in Hawaiʻi and those with Hawaiʻi ties, across all experience levels.
            </p>
            <div>
              <PrimaryCTA href="https://uxhi.notion.site/Member-Directory-4ee43831f57d4909801dc3528de957b6" external>
                Access the directory
              </PrimaryCTA>
            </div>
          </div>
        </div>

        {/* Mobile Bento - Horizontal layout (shown on <sm only) */}
        <div className="sm:hidden px-6 pb-8">
          <div className="flex gap-3.5 items-center w-full">
            <div className="flex-1 h-[140px] rounded-[99px] overflow-hidden relative">
              <Image src="/images/bento/crowd-community.jpg" alt="UXHI community crowd" fill className="object-cover" />
            </div>
            <div className="w-[120px] shrink-0 flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={120} height={120} className="w-[120px] h-[120px]" />
            </div>
            <div className="flex-1 h-[140px] rounded-t-xl rounded-b-[99px] overflow-hidden relative">
              <Image src="/images/bento/conference.jpg" alt="UXHI conference" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-0 xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only */}
          <div className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative">
              <Image src="/images/bento/crowd-community.jpg" alt="UXHI community crowd" fill className="object-cover" />
            </div>
            <div className="w-[114px] mx-auto flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={114} height={114} className="w-[114px] h-[114px]" />
            </div>
            <div className="w-full h-[180px] rounded-t-[7px] rounded-b-[88px] overflow-hidden relative">
              <Image src="/images/bento/conference.jpg" alt="UXHI conference" fill className="object-cover" />
            </div>
          </div>

          {/* MD+ layout - Two columns with absolute positioning */}
          <div className="hidden md:block relative w-full h-full">
            {/* Column 1 - Left (positioned higher) */}
            <div className="absolute bottom-[82px] lg:bottom-[92px] left-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[114px] lg:h-[128px] rounded-[24px] overflow-hidden relative">
                <Image src="/images/bento/ux101-group.jpg" alt="UX101 group" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image src="/images/bento/crowd-community.jpg" alt="UXHI community crowd" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/bento/conference.jpg" alt="UXHI conference" fill className="object-cover" />
              </div>
            </div>
            {/* Column 2 - Right (positioned at bottom) */}
            <div className="absolute bottom-0 right-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/bento/uxhicon-25.jpg" alt="UXHICon 25" fill className="object-cover" />
              </div>
              <div className="w-[114px] lg:w-[128px] mx-auto flex items-center justify-center">
                <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={128} height={128} className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/bento/photobooth.jpg" alt="UXHI photobooth" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browse Member Directory Section */}
      <section className="pt-12 pb-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto text-center">
          {/* Directory Icon */}
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <Image
              src="/images/icons/icon-directory.png"
              alt="Directory"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-4xl text-purple-700 mb-8">
            Join our member directory!
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            Welcome to the UXHI Member Directory, your hub for connecting with UX design professionals in Hawaiʻi and those with Hawaiʻi ties, across all experience levels. Not only does this serve as a go-to resource for companies and recruiters seeking talented local UX professionals, but it also fosters connections between UX practitioners themselves.
          </p>

          {/* Aidaform Embed */}
          <iframe
            src="https://uxhicommunity.aidaform.com/directory"
            width="100%"
            height="1600"
            frameBorder="0"
            className="border-0 mb-10"
            title="UXHI Member Directory Form"
            allowFullScreen
          />

          <PrimaryCTA href="https://uxhi.notion.site/Member-Directory-4ee43831f57d4909801dc3528de957b6" external>
            Access the Directory
          </PrimaryCTA>
        </div>
      </section>

      {/* Large Directory Photo */}
      <section className="px-6 pb-16 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="rounded-[32px] overflow-hidden aspect-[16/7] relative">
            <Image
              src="/images/bento/directory.png"
              alt="UXHI member directory"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Criteria Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-teal-50 border border-teal-100 rounded-[20px] p-6">
            <h2 className="font-display text-2xl text-purple-700 mb-3">
              Join criteria
            </h2>
            <p className="text-gray-700 font-medium">
              UX professionals and anyone transitioning into UX design who lives in Hawaiʻi or has strong ties to Hawaiʻi can join. Your request will automatically be added to the directory and a UXHI team member will manually add your head shot and island, if applicable, within a few business days.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
