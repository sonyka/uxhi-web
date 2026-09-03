"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SpotIllustrationCard } from "@/components/ui/cards/SpotIllustrationCard";
import { MissionStatement } from "@/components/ui/MissionStatement";
import { MEMBER_COUNT } from "@/lib/stats";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Value {
  _id: string;
  title: string;
  description: string;
  icon?: {
    asset?: { _id?: string; url?: string };
    alt?: string;
  };
}

interface MissionSectionProps {
  values?: Value[];
}

// The "Our values" grid is hidden on /about for now (2026-08-29). The values
// themselves still come from Sanity and the markup below is intact, so
// restoring the section is flipping this one flag back to true.
const SHOW_VALUES = false;

// Fallback values if none from Sanity
const defaultValues = [
  {
    _id: "1",
    title: "Service",
    description:
      "Committed to serve our members with compassion, integrity, and dedication",
    iconPath: "/images/icons/icon-service.svg",
  },
  {
    _id: "2",
    title: "Community",
    description:
      "Foster an inclusive, supportive environment that encourages collaboration, knowledge-sharing, and growth",
    iconPath: "/images/icons/icon-community.svg",
  },
  {
    _id: "3",
    title: "Empowerment",
    description:
      "Provide and connect members to learning and growth opportunities to take charge of their own success",
    iconPath: "/images/icons/icon-empowerment.svg",
  },
  {
    _id: "4",
    title: "Inspire",
    description:
      "Ignite the continued passion and practice for human-centered design",
    iconPath: "/images/icons/icon-inspire.svg",
  },
];

export function MissionSection({ values }: MissionSectionProps) {
  const displayValues = values && values.length > 0 ? values : defaultValues;

  return (
    <section className="pb-16 md:pb-24 bg-beige-10">
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
            className="font-display text-2xl md:text-3xl lg:text-4xl text-purple-120 leading-tight mb-8 max-w-4xl"
          >
            <MissionStatement />
          </motion.h2>

          {/* Description */}
          <motion.div variants={fadeInUp} className="max-w-4xl mb-12">
            <p className="text-gray-120 text-lg leading-relaxed">
              Founded in the summer of 2021, we are a female-founded
              volunteer-run organization that acts as the go-to resource for UX
              in the state. Our primary initiatives include our annual UXHI
              Conference, our State of UX report, our ongoing events, and
              community of over {MEMBER_COUNT} UX practitioners who share feedback and best
              practices with each other via our dedicated Slack channel.
            </p>
          </motion.div>

          {/* Values — hidden for now, see SHOW_VALUES above */}
          {SHOW_VALUES && (
          <motion.div variants={fadeInUp}>
            <h3 className="font-display text-2xl md:text-3xl text-purple-140 mb-8 text-center">
              Our Values
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {displayValues.map((value) => (
                <SpotIllustrationCard
                  key={value._id}
                  variant="white"
                  image={"icon" in value ? value.icon : undefined}
                  imageSrc={"iconPath" in value ? (value as typeof defaultValues[0]).iconPath : undefined}
                  imageAlt={value.title}
                  title={value.title}
                  description={value.description}
                  className="rounded-[20px] !shadow-none"
                />
              ))}
            </div>
          </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
