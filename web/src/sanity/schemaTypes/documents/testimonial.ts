import { defineType, defineField } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "object",
      fields: [
        defineField({
          name: "name",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({ name: "role", type: "string" }),
        defineField({ name: "company", type: "string" }),
        defineField({
          name: "photo",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Show on Homepage",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
    }),
  ],
  preview: {
    select: {
      quote: "quote",
      author: "author.name",
      media: "author.photo",
    },
    prepare({ quote, author, media }) {
      return {
        title: quote?.substring(0, 50) + "...",
        subtitle: author,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
