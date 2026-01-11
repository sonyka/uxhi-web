import { defineType, defineField } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero Section",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "badge",
      type: "string",
      title: "Badge Text",
      description: "Small text above headline (e.g., '500 members and growing')",
    }),
    defineField({
      name: "headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryCta",
      type: "object",
      title: "Primary Button",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "url", type: "string" }),
      ],
    }),
    defineField({
      name: "secondaryCta",
      type: "object",
      title: "Secondary Button",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "url", type: "string" }),
      ],
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "headline" },
    prepare({ title }) {
      return {
        title: title || "Hero Section",
        subtitle: "Hero",
        media: BlockContentIcon,
      };
    },
  },
});
