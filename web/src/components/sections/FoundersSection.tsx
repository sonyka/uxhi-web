"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";

interface Founder {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: {
    asset?: { _id?: string; url?: string };
    alt?: string;
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

interface FoundersSectionProps {
  founders: Founder[];
  id?: string;
}

export function FoundersSection({ founders, id }: FoundersSectionProps) {
  if (!founders || founders.length === 0) return null;

  return (
    <section id={id} className="py-20 md:py-28 bg-cream scroll-mt-24">
      <Container>
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-purple-700 mb-4">
            Who we are
          </h2>
          <p className="text-gray-600 text-lg max-w-5xl">
            UXHI is a female-founded community organization whose mission is to
            connect and elevate the field of human-centered design for the
            people of Hawai&apos;i.
          </p>
        </div>

        {/* Founders List */}
        <div className="space-y-20 md:space-y-28">
          {founders.map((founder, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={founder._id}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center"
              >
                {/* Photo */}
                <div className={isEven ? "md:order-1" : "md:order-2"}>
                  <div className="relative aspect-square max-w-[420px] rounded-lg overflow-hidden bg-gray-100 mx-auto md:mx-0">
                    {founder.photo?.asset ? (
                      <SanityImage
                        value={founder.photo}
                        width={420}
                        height={420}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-300">
                        <svg
                          className="w-24 h-24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className={isEven ? "md:order-2" : "md:order-1"}>
                  <h3 className="font-display text-3xl md:text-4xl text-teal-500 mb-2">
                    {founder.name}
                  </h3>
                  {founder.role && (
                    <p className="text-gray-500 text-base mb-5">
                      {founder.role.includes("Co-Founder")
                        ? "Co-Founder"
                        : founder.role}
                    </p>
                  )}
                  {founder.bio && (
                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                      {founder.bio}
                    </p>
                  )}
                  {founder.socialLinks?.linkedin && (
                    <a
                      href={founder.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block group"
                      aria-label={`${founder.name}'s LinkedIn profile`}
                    >
                      <Image
                        src="/images/nav/glyph-linkedin.svg"
                        alt="LinkedIn"
                        width={32}
                        height={32}
                        className="grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
