"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MemberCard, type DirectoryMember } from "./MemberCard";

interface MemberGridProps {
  members: DirectoryMember[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MemberGrid({ members }: MemberGridProps) {
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 relative mb-4">
          <Image
            src="/images/icons/icon-empty.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No members found</h3>
        <p className="text-sm text-gray-500 text-center max-w-sm">
          Try adjusting your filters to see more results, or clear all filters to see everyone.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={members.map((m) => m._id).join(",")}
    >
      {members.map((member) => (
        <motion.div key={member._id} variants={itemVariants}>
          <MemberCard member={member} />
        </motion.div>
      ))}
    </motion.div>
  );
}
