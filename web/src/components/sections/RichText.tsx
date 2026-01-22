"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { InlineLink } from "@/components/ui/InlineLink";
import { urlFor } from "@/sanity/lib/image";
import { fadeInUp } from "@/lib/animations";

interface RichTextProps {
  content?: Array<{
    _key: string;
    _type: string;
    [key: string]: unknown;
  }>;
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-3xl md:text-4xl text-purple-700 mt-12 mb-6 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-semibold text-2xl text-purple-700 mt-8 mb-4">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-teal-500 pl-6 my-6 text-gray-600 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <InlineLink href={value?.href || "#"} variant="teal">
        {children}
      </InlineLink>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).auto("format").url()}
            alt={value.alt || ""}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.alt && (
            <figcaption className="text-center text-gray-500 text-sm mt-2">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function RichText({ content }: RichTextProps) {
  if (!content || content.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container size="narrow">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="prose prose-lg max-w-none"
        >
          <PortableText value={content} components={components} />
        </motion.div>
      </Container>
    </section>
  );
}
