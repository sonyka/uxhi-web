"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const values = [
  {
    title: "Service",
    description:
      "Committed to serve our members with compassion, integrity, and dedication",
  },
  {
    title: "Community",
    description:
      "Foster an inclusive, supportive environment that encourages collaboration, knowledge-sharing, and growth",
  },
  {
    title: "Empowerment",
    description:
      "Provide and connect members to learning and growth opportunities to take charge of their own success",
  },
  {
    title: "Inspire",
    description:
      "Ignite the continued passion and practice for human-centered design",
  },
];

export function MissionSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Mission Statement */}
          <motion.h2
            variants={fadeInUp}
            className="font-display text-2xl md:text-3xl lg:text-4xl text-teal-500 leading-tight mb-8 max-w-4xl"
          >
            UXHI&apos;s mission is to grow and elevate the professional standard of{" "}
            <span className="text-teal-500 hover:text-purple-700 transition-colors relative inline-block cursor-pointer group/hcd whitespace-nowrap">
              Human-Centered Design
              {/* Underline image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hcd-underline.svg"
                alt=""
                className="absolute left-0 right-0 -bottom-1 w-full h-auto pointer-events-none"
              />
              {/* Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-3 bg-white text-gray-700 text-sm font-body font-normal leading-relaxed tracking-normal rounded-xl shadow-lg border border-gray-100 w-80 text-left opacity-0 invisible group-hover/hcd:opacity-100 group-hover/hcd:visible transition-all duration-200 delay-300 z-50 whitespace-normal" style={{ wordSpacing: '0.1em' }}>
                Human-centered design is an approach that prioritizes the unique needs of users.
                {/* Tail */}
                <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm" />
              </span>
            </span>{" "}
            in Hawaiʻi through career development, community networking, and industry advocacy.
          </motion.h2>

          {/* Description */}
          <motion.div variants={fadeInUp} className="max-w-4xl mb-12">
            <p className="text-gray-700 text-lg leading-relaxed">
              Founded in the summer of 2021, we are a female-founded
              volunteer-run organization that acts as the go-to resource for UX
              in the state. Our primary initiatives include our annual UXHI
              Conference, our State of UX report, our ongoing events, and
              community of over 400 UX practitioners who share feedback and best
              practices with each other via our dedicated Slack channel.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-gray-700 text-lg font-semibold mb-6">
              Our values:
            </h3>
            <ul className="space-y-4">
              {values.map((value) => (
                <li key={value.title} className="flex items-start gap-3">
                  <span className="text-gray-700 mt-1.5">•</span>
                  <div>
                    <span className="font-semibold text-gray-800">
                      {value.title}
                    </span>
                    <span className="text-gray-600"> – {value.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
