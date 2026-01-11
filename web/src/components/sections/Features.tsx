"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface Feature {
  _key?: string;
  icon?: string;
  title: string;
  description?: string;
}

interface FeaturesProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  features?: Feature[];
  layout?: "grid" | "list" | "cards";
}

// Simple icon mapping - you can expand this
const iconMap: Record<string, React.ReactNode> = {
  users: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  calendar: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  book: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  star: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  ),
  chat: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),
  gift: (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
      />
    </svg>
  ),
};

export function Features({
  eyebrow,
  heading,
  description,
  features,
  layout = "grid",
}: FeaturesProps) {
  if (!features || features.length === 0) return null;

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
          {(eyebrow || heading || description) && (
            <div className="text-center mb-12 md:mb-16">
              {eyebrow && (
                <motion.p
                  variants={fadeInUp}
                  className="text-teal-500 font-semibold uppercase tracking-wide text-sm mb-3"
                >
                  {eyebrow}
                </motion.p>
              )}
              {heading && (
                <motion.h2
                  variants={fadeInUp}
                  className="font-display text-3xl md:text-4xl lg:text-5xl text-purple-700 mb-4"
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

          {/* Features Grid */}
          <div
            className={cn("grid gap-8", {
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3":
                layout === "grid" || layout === "cards",
              "grid-cols-1 max-w-2xl mx-auto": layout === "list",
            })}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature._key || index}
                variants={fadeInUp}
                className={cn(
                  "group",
                  layout === "cards" &&
                    "bg-cream p-6 md:p-8 rounded-2xl hover:shadow-lg transition-shadow"
                )}
              >
                {feature.icon && iconMap[feature.icon] && (
                  <div className="text-teal-500 mb-4">
                    {iconMap[feature.icon]}
                  </div>
                )}
                <h3 className="font-semibold text-xl text-purple-700 mb-2">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-gray-600">{feature.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
