import { defineType, defineField, defineArrayMember } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const testimonialsBlock = defineType({
  name: "testimonialsBlock",
  title: "Testimonials Section",
  type: "object",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
    }),
    defineField({
      name: "sourceType",
      type: "string",
      title: "Testimonial Source",
      options: {
        list: [
          { title: "Featured Testimonials (automatic)", value: "featured" },
          { title: "Manual Selection", value: "manual" },
        ],
        layout: "radio",
      },
      initialValue: "featured",
    }),
    defineField({
      name: "testimonials",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
      hidden: ({ parent }) => parent?.sourceType !== "manual",
    }),
    defineField({
      name: "displayStyle",
      type: "string",
      options: {
        list: [
          { title: "Carousel", value: "carousel" },
          { title: "Grid", value: "grid" },
        ],
        layout: "radio",
      },
      initialValue: "carousel",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: title || "Testimonials",
        subtitle: "Testimonials Section",
        media: CommentIcon,
      };
    },
  },
});
