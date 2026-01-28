import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { FAQS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { FAQSection } from "@/components/sections/FAQSection";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { SanityImage } from "@/components/ui/SanityImage";
import { SpeechBubbleCard } from "@/components/ui/cards/SpeechBubbleCard";

// Placeholder images for the grid - using existing bento images
const gridImages = [
  { id: "1", src: "/images/join/bento-join-01.png", alt: "UXHI members" },
  { id: "2", src: "/images/join/bento-join-02.png", alt: "UXHICon" },
  { id: "3", src: "/images/join/bento-join-03.png", alt: "UXHI conference" },
  { id: "4", src: "/images/join/bento-join-04.png", alt: "UXHI community members with leis" },
  { id: "5", src: "/images/join/bento-join-05.png", alt: "UXHI photobooth" },
  { id: "6", src: "/images/join/bento-join-01.png", alt: "UXHI members" },
];


// Company logos
const companyLogos = [
  { name: "Codecademy", src: "/images/company_logos/Codecademy Logo.svg", width: 140, height: 28 },
  { name: "LinkedIn", src: "/images/company_logos/LinkedIn 2021.svg", width: 100, height: 26 },
  { name: "Servco", src: "/images/company_logos/servco.svg", width: 100, height: 32 },
  { name: "Zippy's", src: "/images/company_logos/Zippy Logo RGB.svg", width: 96, height: 48, darkGray: true },
  { name: "Google", src: "/images/company_logos/Google Logo.svg", width: 110, height: 48 },
];

export default async function JoinPage() {
  const [{ data: faqs }, { data: testimonials }] = await Promise.all([
    sanityFetch({ query: FAQS_QUERY }),
    sanityFetch({ query: TESTIMONIALS_QUERY }),
  ]);

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[564px] sm:min-h-[746px] md:min-h-[747px] lg:min-h-[700px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-6 pt-32 pb-8 sm:max-w-[411px] md:max-w-[calc(100%-340px)] md:pl-10 lg:pl-24 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[583px] xl:max-w-[733px]">
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl leading-[40px] lg:text-5xl lg:leading-[60px] text-black">
              Become a member!
            </h1>
            <p className="text-black text-lg lg:text-xl leading-relaxed">
              Joining UXHI is free! As a member, you gain access to our community
              Slack group with 400+ designers, an invitation to join our member
              directory, and early updates on the latest UX events through our
              monthly emails.
            </p>
            <div>
              <PrimaryCTA href="#join-form">Join us</PrimaryCTA>
            </div>
          </div>
        </div>

        {/* Mobile Bento - Horizontal layout (shown on <sm only) */}
        <div className="sm:hidden px-6 pb-8">
          <div className="flex gap-3.5 items-center w-full">
            <div className="flex-1 h-[140px] rounded-[99px] overflow-hidden relative">
              <Image src="/images/join/bento-join-01.png" alt="UXHI members" fill className="object-cover" />
            </div>
            <div className="w-[120px] shrink-0 flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={120} height={120} className="w-[120px] h-[120px]" />
            </div>
            <div className="flex-1 h-[140px] rounded-t-xl rounded-b-[99px] overflow-hidden relative">
              <Image src="/images/join/bento-join-02.png" alt="UXHICon 25" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-0 xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only */}
          <div className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative">
              <Image src="/images/join/bento-join-01.png" alt="UXHI members" fill className="object-cover" />
            </div>
            <div className="w-[114px] mx-auto flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={114} height={114} className="w-[114px] h-[114px]" />
            </div>
            <div className="w-full h-[180px] rounded-t-[7px] rounded-b-[88px] overflow-hidden relative">
              <Image src="/images/join/bento-join-02.png" alt="UXHICon 25" fill className="object-cover" />
            </div>
          </div>

          {/* MD+ layout - Two columns with absolute positioning */}
          <div className="hidden md:block relative w-full h-full">
            {/* Column 1 - Left (positioned higher) */}
            <div className="absolute bottom-[82px] lg:bottom-[92px] left-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[114px] lg:h-[128px] rounded-[24px] overflow-hidden relative">
                <Image src="/images/join/bento-join-03.png" alt="UXHI conference" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image src="/images/join/bento-join-01.png" alt="UXHI members" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/join/bento-join-02.png" alt="UXHICon 25" fill className="object-cover" />
              </div>
            </div>
            {/* Column 2 - Right (positioned at bottom) */}
            <div className="absolute bottom-0 right-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/join/bento-join-04.png" alt="UXHI community members with leis" fill className="object-cover" />
              </div>
              <div className="w-[114px] lg:w-[128px] mx-auto flex items-center justify-center">
                <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={128} height={128} className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/join/bento-join-05.png" alt="UXHI photobooth" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who are we? Section */}
      <section className="pt-12 pb-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-4xl text-purple-700 mb-8">
            Who are we?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            Our membership includes UX professionals and those transitioning into the field, with ties to Hawai&apos;i. Members work across a mix of local and national companies, as well as freelance, and come from a variety of backgrounds and skill levels. Whether you&apos;re just starting out or an experienced practitioner, UXHI is a community where you can connect, learn, and grow.
          </p>
          <PrimaryCTA href="/directory">Membership Directory</PrimaryCTA>
        </div>
      </section>

      {/* Large Team Photo */}
      <section className="px-6 pb-16 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="rounded-[32px] overflow-hidden aspect-[16/7] relative">
            <Image
              src="/images/home/community-photo.jpg"
              alt="UXHI community group photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-2">
                What our members are saying
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial: { _id: string; quote: string; author?: { name?: string; role?: string; company?: string; photo?: { asset?: { _id?: string; url?: string } } } }) => (
                <SpeechBubbleCard
                  key={testimonial._id}
                  variant="testimonial"
                  quote={testimonial.quote}
                  authorName={testimonial.author?.name || "Anonymous"}
                  authorRole={testimonial.author?.role}
                  authorCompany={testimonial.author?.company}
                  authorImageNode={
                    testimonial.author?.photo?.asset ? (
                      <SanityImage
                        value={testimonial.author.photo}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : undefined
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Company Logos Section */}
      <section className="py-16 px-6 bg-section-gray">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-purple-700 text-center mb-12">
            Representing companies in Hawai&apos;i and beyond
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
            {companyLogos.map((company) => (
              <div
                key={company.name}
                className="flex items-center justify-center"
              >
                <Image
                  src={company.src}
                  alt={company.name}
                  width={company.width}
                  height={company.height}
                  className={`object-contain grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${company.darkGray ? 'opacity-70' : 'opacity-50'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section id="join-form" className="py-20 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            {/* Slack Icon */}
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <Image
                src="/images/icons/icon-slack.png"
                alt="Slack"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-purple-700 mb-6">
              How to Join
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Membership is free and easy – simply fill out the quick form below and we&apos;ll be in touch in a few days after we review your profile. As a member, you&apos;ll get access to our Membership Directory and Slack Community with 400+ designers!{" "}
              <span className="relative inline-block group/slack-link">
                <span className="text-purple-700 underline underline-offset-2 cursor-help">What is Slack?</span>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-4 py-3 bg-white text-gray-700 text-sm font-normal leading-relaxed rounded-xl shadow-lg border border-gray-100 w-72 text-left opacity-0 invisible group-hover/slack-link:opacity-100 group-hover/slack-link:visible transition-all duration-200 z-50">
                  Slack is a messaging app for teams that makes it easy to communicate and collaborate. Our UXHI Slack has 400+ designers sharing resources, job opportunities, and community support.
                  <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm" />
                </span>
              </span>
            </p>
          </div>

          {/* Membership Form Embed */}
          <iframe
            src="https://uxhicommunity.aidaform.com/membership"
            width="100%"
            height="1600"
            frameBorder="0"
            className="border-0"
            title="UXHI Membership Form"
            allowFullScreen
          />
        </div>
      </section>

      {/* Slack Community Section */}
      <section className="py-20 px-6 bg-purple-700">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            400+ Slack members and growing
          </h2>
          <p className="text-purple-200 text-lg leading-relaxed mb-10">
            A primary benefit of membership at UXHI (which is free!) is access to our Slack community of over 400+ designers connected to Hawai&apos;i and beyond. Become a member today and receive your invite to join!
          </p>
          <PrimaryCTA href="#join-form">Become a member</PrimaryCTA>
        </div>
      </section>

      {/* FAQs Section */}
      <FAQSection faqs={faqs || []} />
    </main>
  );
}
