"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { TeamCard } from "./TeamCard";
import type { TeamMember } from "./index";

const CATEGORY_ORDER = [
  "founder",
  "community-events",
  "annual-conference",
  "professional-development",
  "communication-outreach",
  "standards-credentialing",
  "research-partnerships",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  founder: "Founders",
  "community-events": "Community & Events",
  "annual-conference": "Annual Conference",
  "professional-development": "Professional Development",
  "communication-outreach": "Communication & Outreach",
  "standards-credentialing": "Standards & Credentialing",
  "research-partnerships": "Research & Industry Partnerships",
};

interface TeamSectionProps {
  members: TeamMember[];
  id?: string;
}

export function TeamSection({ members, id }: TeamSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!members || members.length === 0) return null;

  const handleToggle = (memberId: string) => {
    setExpandedId((prev) => (prev === memberId ? null : memberId));
  };

  // Group members by category
  const grouped = CATEGORY_ORDER.reduce<
    { key: string; label: string; members: TeamMember[] }[]
  >((acc, cat) => {
    const catMembers = members.filter((m) => m.category === cat);
    if (catMembers.length > 0) {
      acc.push({ key: cat, label: CATEGORY_LABELS[cat], members: catMembers });
    }
    return acc;
  }, []);

  // Members without a category go at the end
  const uncategorized = members.filter(
    (m) => !m.category || !CATEGORY_ORDER.includes(m.category as (typeof CATEGORY_ORDER)[number])
  );
  if (uncategorized.length > 0) {
    grouped.push({ key: "other", label: "Team", members: uncategorized });
  }

  const founderGroup = grouped.find((g) => g.key === "founder");
  const boardGroups = grouped.filter(
    (g) => g.key !== "founder" && g.key !== "other"
  );
  const otherGroup = grouped.find((g) => g.key === "other");

  return (
    <section id={id} className="py-20 md:py-28 bg-beige-10 scroll-mt-24">
      <Container>
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl text-purple-140 mb-4"
          >
            Who we are
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-110 text-lg max-w-5xl">
            UXHI is a female-founded community organization whose mission is to
            connect and elevate the field of human-centered design for the people
            of Hawai&apos;i.
          </motion.p>
        </motion.div>

        <LayoutGroup>
          {/* Founders */}
          {founderGroup && (
            <div className="mb-16">
              <motion.h3
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-display text-2xl text-purple-140 mb-6"
              >
                {founderGroup.label}
              </motion.h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {founderGroup.members.map((member) => (
                  <motion.div key={member._id} variants={fadeInUp} layout>
                    <TeamCard
                      member={member}
                      isExpanded={expandedId === member._id}
                      onToggle={() => handleToggle(member._id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Board Members */}
          {boardGroups.length > 0 && (
            <div className="mb-16">
              <motion.h3
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-display text-2xl text-purple-140 mb-8"
              >
                Board Members
              </motion.h3>
              <div className="space-y-12">
                {boardGroups.map((group) => (
                  <div key={group.key}>
                    <motion.h4
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="text-gray-110 text-base font-semibold mb-4"
                    >
                      {group.label}
                    </motion.h4>
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                    >
                      {group.members.map((member) => (
                        <motion.div key={member._id} variants={fadeInUp} layout>
                          <TeamCard
                            member={member}
                            isExpanded={expandedId === member._id}
                            onToggle={() => handleToggle(member._id)}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Uncategorized */}
          {otherGroup && (
            <div>
              <motion.h3
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-display text-2xl text-purple-140 mb-6"
              >
                {otherGroup.label}
              </motion.h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {otherGroup.members.map((member) => (
                  <motion.div key={member._id} variants={fadeInUp} layout>
                    <TeamCard
                      member={member}
                      isExpanded={expandedId === member._id}
                      onToggle={() => handleToggle(member._id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </LayoutGroup>
      </Container>
    </section>
  );
}
