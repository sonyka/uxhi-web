"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface CallToActionProps {
  heading?: string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  style?: "purple" | "teal" | "gradient";
}

const styleClasses = {
  purple: "bg-purple-700",
  teal: "bg-teal-500",
  gradient: "bg-gradient-to-r from-purple-700 to-teal-500",
};

export function CallToAction({
  heading,
  description,
  buttonLabel,
  buttonUrl,
  style = "purple",
}: CallToActionProps) {
  return (
    <section className={cn("py-16 md:py-24 text-white", styleClasses[style])}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto"
        >
          {heading && (
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl md:text-4xl lg:text-5xl mb-6"
            >
              {heading}
            </motion.h2>
          )}

          {description && (
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/90 mb-8"
            >
              {description}
            </motion.p>
          )}

          {buttonLabel && buttonUrl && (
            <motion.div variants={fadeInUp}>
              <Button
                href={buttonUrl}
                variant={style === "teal" ? "secondary" : "primary"}
                size="lg"
                className={cn(
                  style === "purple" &&
                    "bg-white text-purple-700 hover:bg-gray-100",
                  style === "teal" &&
                    "bg-white text-teal-600 hover:bg-gray-100",
                  style === "gradient" &&
                    "bg-white text-purple-700 hover:bg-gray-100"
                )}
              >
                {buttonLabel}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
