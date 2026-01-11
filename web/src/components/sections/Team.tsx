"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Member {
  _id: string;
  name: string;
  photo?: {
    asset?: { _id?: string; url?: string };
    alt?: string;
  };
  role?: string;
  company?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

interface TeamProps {
  heading?: string;
  description?: string;
  members?: Member[];
  showAllLink?: boolean;
}

export function Team({
  heading,
  description,
  members,
  showAllLink = true,
}: TeamProps) {
  if (!members || members.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Header */}
          {(heading || description) && (
            <div className="text-center mb-12">
              {heading && (
                <motion.h2
                  variants={fadeInUp}
                  className="font-display text-3xl md:text-4xl text-purple-700 mb-4"
                >
                  {heading}
                </motion.h2>
              )}
              {description && (
                <motion.p
                  variants={fadeInUp}
                  className="text-gray-600 text-lg max-w-2xl mx-auto"
                >
                  {description}
                </motion.p>
              )}
            </div>
          )}

          {/* Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {members.map((member) => (
              <motion.div
                key={member._id}
                variants={fadeInUp}
                className="group text-center"
              >
                <div className="relative mb-4 aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  {member.photo?.asset ? (
                    <SanityImage
                      value={member.photo}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-300">
                      <svg
                        className="w-16 h-16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  {/* Social Links Overlay */}
                  {member.socialLinks && (
                    <div className="absolute inset-0 bg-purple-700/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {member.socialLinks.linkedin && (
                        <a
                          href={member.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-teal-300 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a
                          href={member.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-teal-300 transition-colors"
                          aria-label="Twitter"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      )}
                      {member.socialLinks.website && (
                        <a
                          href={member.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-teal-300 transition-colors"
                          aria-label="Website"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-purple-700">{member.name}</h3>
                {member.role && (
                  <p className="text-gray-500 text-sm">{member.role}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          {showAllLink && (
            <motion.div variants={fadeInUp} className="text-center mt-10">
              <Link
                href="/find-ux-pro"
                className="text-teal-500 hover:text-teal-600 font-semibold inline-flex items-center gap-2 transition-colors"
              >
                View all members
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
