"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  id?: string;
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v12M6 12h12"
      />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12H4"
      />
    </svg>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-[2rem] overflow-hidden transition-colors duration-300 ${
        isOpen ? "bg-teal-500" : "bg-white shadow-sm"
      }`}
    >
      <button
        onClick={onToggle}
        className={`w-full px-8 py-5 flex items-center justify-between text-left transition-colors ${
          isOpen ? "text-white" : "text-gray-800"
        }`}
        aria-expanded={isOpen}
      >
        <span className="font-medium pr-4">{faq.question}</span>
        <span className="flex-shrink-0">
          {isOpen ? (
            <MinusIcon className="w-6 h-6" />
          ) : (
            <PlusIcon className="w-6 h-6 text-teal-500" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-6 text-white/90">{faq.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({ faqs, id }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?._id || null);

  if (!faqs || faqs.length === 0) return null;

  const handleToggle = (faqId: string) => {
    setOpenId(openId === faqId ? null : faqId);
  };

  return (
    <section id={id} className="py-20 md:py-28 bg-gray-50 scroll-mt-24">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-purple-700 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Questions about what we offer, and how to be a part of it? If the
              answer to your question isn&apos;t found below, just{" "}
              <Link
                href="/contact"
                className="text-teal-500 hover:text-teal-600 transition-colors"
              >
                contact us
              </Link>
              .
            </p>
          </motion.div>

          {/* FAQ List */}
          <motion.div variants={fadeInUp} className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq) => (
              <FAQItem
                key={faq._id}
                faq={faq}
                isOpen={openId === faq._id}
                onToggle={() => handleToggle(faq._id)}
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
