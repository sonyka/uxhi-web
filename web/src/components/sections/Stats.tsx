"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface Stat {
  _key?: string;
  value: string;
  label: string;
}

interface StatsProps {
  stats?: Stat[];
  backgroundColor?: "teal" | "purple" | "cream" | "white";
}

const bgColors = {
  teal: "bg-teal-500 text-white",
  purple: "bg-purple-700 text-white",
  cream: "bg-cream text-purple-700",
  white: "bg-white text-purple-700",
};

export function Stats({ stats, backgroundColor = "teal" }: StatsProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-20", bgColors[backgroundColor])}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat._key || index}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl lg:text-6xl mb-2">
                {stat.value}
              </div>
              <div
                className={cn(
                  "text-sm md:text-base uppercase tracking-wide",
                  backgroundColor === "teal" || backgroundColor === "purple"
                    ? "text-white/80"
                    : "text-gray-600"
                )}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
