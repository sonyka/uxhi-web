"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface HeroProps {
  badge?: string;
  headline: string;
  subheadline?: string;
  primaryCta?: { label: string; url: string };
  secondaryCta?: { label: string; url: string };
  backgroundImage?: {
    asset?: { _id?: string; url?: string };
    alt?: string;
  };
}

export function Hero({
  badge,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-cream overflow-hidden">
      {/* Background Image */}
      {backgroundImage?.asset && (
        <div className="absolute inset-0 z-0">
          <SanityImage
            value={backgroundImage}
            fill
            className="object-cover opacity-10"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Wave Pattern */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto fill-white"
          preserveAspectRatio="none"
        >
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>

      <Container className="relative z-20 py-20 md:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {badge && (
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-purple-700 leading-tight mb-6"
          >
            {headline}
          </motion.h1>

          {subheadline && (
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl"
            >
              {subheadline}
            </motion.p>
          )}

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            {primaryCta?.label && (
              <Button href={primaryCta.url} variant="primary" size="lg">
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta?.label && (
              <Button href={secondaryCta.url} variant="outline" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
