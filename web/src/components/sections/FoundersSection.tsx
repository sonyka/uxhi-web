"use client";

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

function LinkedInIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
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
                      className="inline-flex items-center justify-center w-10 h-10 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
                      aria-label={`${founder.name}'s LinkedIn profile`}
                    >
                      <LinkedInIcon />
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
