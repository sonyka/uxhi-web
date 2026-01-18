import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { FAQS_QUERY } from "@/sanity/lib/queries";
import { FAQSection } from "@/components/sections/FAQSection";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";

// Arrow Icon Component (Feather arrow-right)
function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// Placeholder images for the grid - using existing bento images
const gridImages = [
  { id: "1", src: "/images/bento/group-leis.jpg", alt: "UXHI community members with leis" },
  { id: "2", src: "/images/bento/conference.jpg", alt: "UXHI conference" },
  { id: "3", src: "/images/bento/ux101-group.jpg", alt: "UX101 group" },
  { id: "4", src: "/images/bento/crowd-community.jpg", alt: "UXHI community crowd" },
  { id: "5", src: "/images/bento/photobooth.jpg", alt: "UXHI photobooth" },
  { id: "6", src: "/images/bento/uxhicon-25.jpg", alt: "UXHICon 25" },
];

// Sample testimonials
const testimonials = [
  {
    id: "1",
    quote: "UXHI has been an incredible resource for networking and professional growth. The community is welcoming and supportive.",
    author: {
      name: "Karli Young",
      role: "UX Designer",
      company: "Hawaiian Airlines",
    },
  },
  {
    id: "2",
    quote: "As someone transitioning into UX, UXHI gave me the connections and confidence I needed to make the switch.",
    author: {
      name: "Emily Lee",
      role: "Product Designer",
      company: "Kamehameha Schools",
    },
  },
  {
    id: "3",
    quote: "The events and Slack community have been invaluable. I've learned so much and made lasting friendships.",
    author: {
      name: "Michelle Tran",
      role: "Senior UX Researcher",
      company: "Google",
    },
  },
  {
    id: "4",
    quote: "Moving back to Hawaii, I was worried about finding a design community. UXHI exceeded all my expectations—it's like having a built-in ohana.",
    author: {
      name: "Carlo Liquido",
      role: "Design Lead",
      company: "Salesforce",
    },
  },
  {
    id: "5",
    quote: "The mentorship opportunities through UXHI helped me level up my career. I went from junior to senior in two years thanks to the guidance I received.",
    author: {
      name: "Patrick Lutz",
      role: "Senior Product Designer",
      company: "First Hawaiian Bank",
    },
  },
  {
    id: "6",
    quote: "Being part of UXHI while working remotely keeps me connected to Hawaii's tech scene. The virtual events and Slack channels make distance feel irrelevant.",
    author: {
      name: "Tyler Nishida",
      role: "UX Manager",
      company: "Amazon",
    },
  },
];

// Company logos
const companyLogos = [
  { name: "Codecademy", src: "/images/company_logos/Codecademy Logo.svg", width: 140, height: 28 },
  { name: "LinkedIn", src: "/images/company_logos/LinkedIn 2021.svg", width: 100, height: 26 },
  { name: "Servco", src: "/images/company_logos/servco.svg", width: 100, height: 32 },
  { name: "Zippy's", src: "/images/company_logos/Zippy Logo RGB.svg", width: 96, height: 48 },
  { name: "Google", src: "/images/company_logos/Google Logo.svg", width: 110, height: 48 },
];

export default async function JoinPage() {
  const { data: faqs } = await sanityFetch({ query: FAQS_QUERY });

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[700px] lg:min-h-[702px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-8 pt-24 pb-16 lg:pl-32 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[733px]">
          <div className="flex flex-col gap-6 max-w-[605px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-[48px] lg:leading-[84px] text-black">
              Become a member!
            </h1>
            <p className="text-black text-lg lg:text-[20px] leading-relaxed">
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

        {/* Right Side - Bento Grid (Variation 2) */}
        <div className="relative lg:absolute lg:right-[calc(8.33%+22px)] lg:top-0 h-auto lg:h-[655px] w-full lg:w-[320px] px-8 lg:px-0 pb-8 lg:pb-0">
          <div className="grid grid-cols-2 gap-4 w-full max-w-[320px] mx-auto lg:mx-0">
            {/* Column 1 - Left */}
            <div className="flex flex-col gap-4 lg:mt-[92px]">
              {/* Rounded rectangle (cut off at top) */}
              <div className="w-full h-[100px] lg:h-[128px] rounded-[24px] overflow-hidden relative lg:-mt-8">
                <Image
                  src="/images/bento/conference.jpg"
                  alt="UXHI conference"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Full tall pill */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-[99px] overflow-hidden relative opacity-90">
                <Image
                  src="/images/bento/couple-sunglasses.png"
                  alt="UXHI members"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Pill-bottom shape */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-lg rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHICon 25"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Column 2 - Right */}
            <div className="flex flex-col gap-4">
              {/* Pill-bottom shape */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-lg rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/bento/group-leis.jpg"
                  alt="UXHI community members with leis"
                  fill
                  className="object-cover"
                />
              </div>
              {/* UXHI Motif Pattern */}
              <div className="w-[128px] mx-auto flex items-center justify-center">
                <Image
                  src="/images/bento/uxhi-motif-2.svg"
                  alt="UXHI motif"
                  width={128}
                  height={128}
                  className="w-[128px] h-[128px]"
                />
              </div>
              {/* Regular rectangle */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-lg overflow-hidden relative">
                <Image
                  src="/images/bento/photobooth.jpg"
                  alt="UXHI photobooth"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who are we? Section */}
      <section className="pt-12 pb-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-[36px] text-purple-700 mb-8">
            Who are we?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            Our membership includes UX professionals and those transitioning into the field, with ties to Hawai&apos;i. Members work across a mix of local and national companies, as well as freelance, and come from a variety of backgrounds and skill levels. Whether you&apos;re just starting out or an experienced practitioner, UXHI is a community where you can connect, learn, and grow.
          </p>
          <Link
            href="/directory"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Membership Directory</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* Large Team Photo */}
      <section className="px-6 pb-16 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="rounded-[32px] overflow-hidden aspect-[16/7] relative">
            <Image
              src="/images/community-photo.jpg"
              alt="UXHI community group photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-teal-500 mb-2">
              What our members are saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-cream rounded-[20px] p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-300 to-teal-400" />
                  <div>
                    <p className="font-medium text-purple-700">{testimonial.author.name}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.author.role} at {testimonial.author.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="py-16 px-6 bg-[#f5f5f5]">
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
                  className="object-contain brightness-0 invert-[0.7] hover:invert-[0.5] transition-all"
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

          {/* Google Form Embed */}
          <div className="bg-cream rounded-[24px] p-8">
            <iframe
              src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
              width="100%"
              height="800"
              className="rounded-lg border-0"
              title="UXHI Membership Form"
            >
              Loading…
            </iframe>
          </div>
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
          <Link
            href="#join-form"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-900">Become a member</span>
            <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
              <ArrowIcon className="w-4 h-4 text-gray-900" />
            </span>
          </Link>
        </div>
      </section>

      {/* FAQs Section */}
      <FAQSection faqs={faqs || []} />
    </main>
  );
}
