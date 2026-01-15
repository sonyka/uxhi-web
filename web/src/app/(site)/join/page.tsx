import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { FAQS_QUERY } from "@/sanity/lib/queries";
import { FAQSection } from "@/components/sections/FAQSection";

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
      name: "Sarah K.",
      role: "UX Designer",
      company: "Local Tech Company",
    },
  },
  {
    id: "2",
    quote: "As someone transitioning into UX, UXHI gave me the connections and confidence I needed to make the switch.",
    author: {
      name: "Michael T.",
      role: "Product Designer",
      company: "Startup",
    },
  },
  {
    id: "3",
    quote: "The events and Slack community have been invaluable. I've learned so much and made lasting friendships.",
    author: {
      name: "Jennifer L.",
      role: "Senior UX Researcher",
      company: "Enterprise Company",
    },
  },
];

// Company logos
const companyLogos = [
  { name: "Code Academy", placeholder: true },
  { name: "LinkedIn", placeholder: true },
  { name: "Servco", placeholder: true },
  { name: "Zippy's", placeholder: true },
  { name: "Google", placeholder: true },
];

export default async function JoinPage() {
  const { data: faqs } = await sanityFetch({ query: FAQS_QUERY });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Content */}
        <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center justify-center px-8 py-16 lg:py-0">
          <div className="max-w-md">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-purple-700 mb-6">
              Become a member!
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Joining UXHI is free! As a member, you gain access to our community
              Slack group with 400+ designers, an invitation to join our member
              directory, and early updates on the latest UX events through our
              monthly emails.
            </p>
            <Link
              href="#join-form"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Join us
              <span className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center justify-center p-8 lg:p-12">
          <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
            {/* Column 1 - offset down */}
            <div className="flex flex-col gap-4 pt-8">
              {gridImages.slice(0, 3).map((image) => (
                <div
                  key={image.id}
                  className="w-full aspect-[3/4] rounded-[16px] bg-gray-200 overflow-hidden relative"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Column 2 - no offset */}
            <div className="flex flex-col gap-4">
              {gridImages.slice(3, 6).map((image) => (
                <div
                  key={image.id}
                  className="w-full aspect-[3/4] rounded-[16px] bg-gray-200 overflow-hidden relative"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Who are we? Section */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-purple-700 mb-8">
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
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companyLogos.map((company) => (
              <div
                key={company.name}
                className="h-12 px-6 flex items-center justify-center bg-white rounded-lg border border-gray-200"
              >
                <span className="text-gray-400 font-medium">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section id="join-form" className="py-20 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-purple-700 mb-6">
              How to Join
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Membership is free and easy – simply fill out the quick form below and we&apos;ll be in touch in a few days after we review your profile. As a member, you&apos;ll get access to our Membership Directory and Slack Community with 400+ designers!{" "}
              <a
                href="https://slack.com/what-is-slack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 underline hover:text-teal-600"
              >
                (What&apos;s Slack?)
              </a>
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
