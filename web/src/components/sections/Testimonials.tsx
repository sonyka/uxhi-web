"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import { fadeInUp } from "@/lib/animations";

interface Author {
  name: string;
  role?: string;
  company?: string;
  photo?: {
    asset?: { _id?: string; url?: string };
    alt?: string;
  };
}

interface Testimonial {
  _id: string;
  quote: string;
  author: Author;
}

interface TestimonialsProps {
  heading?: string;
  testimonials?: Testimonial[];
  displayStyle?: "carousel" | "grid";
}

function TestimonialCard({
  testimonial,
  variant = "default",
}: {
  testimonial: Testimonial;
  variant?: "default" | "large";
}) {
  return (
    <div className={variant === "large" ? "text-center" : ""}>
      <blockquote
        className={`text-gray-700 ${
          variant === "large" ? "text-xl md:text-2xl" : "text-base"
        } mb-6`}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div
        className={`flex items-center gap-4 ${
          variant === "large" ? "justify-center" : ""
        }`}
      >
        {testimonial.author.photo?.asset && (
          <SanityImage
            value={testimonial.author.photo}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover"
          />
        )}
        <div className={variant === "large" ? "text-center" : ""}>
          <div className="font-semibold text-purple-700">
            {testimonial.author.name}
          </div>
          {(testimonial.author.role || testimonial.author.company) && (
            <div className="text-sm text-gray-500">
              {testimonial.author.role}
              {testimonial.author.role && testimonial.author.company && " at "}
              {testimonial.author.company}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Testimonials({
  heading,
  testimonials,
  displayStyle = "carousel",
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const next = () =>
    setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (i) => (i - 1 + testimonials.length) % testimonials.length
    );

  if (displayStyle === "grid") {
    return (
      <section className="py-16 md:py-24 bg-white">
        <Container>
          {heading && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl text-purple-700 text-center mb-12"
            >
              {heading}
            </motion.h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cream p-6 rounded-2xl"
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container>
        {heading && (
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl text-purple-700 text-center mb-12"
          >
            {heading}
          </motion.h2>
        )}

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <TestimonialCard
                testimonial={testimonials[currentIndex]}
                variant="large"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-6 h-6 text-purple-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      index === currentIndex ? "bg-teal-500" : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-6 h-6 text-purple-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
