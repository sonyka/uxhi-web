import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const instagramPost = defineType({
  name: "instagramPost",
  title: "Instagram Post",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "permalink",
      title: "Instagram Link",
      type: "url",
      description: "Link to the original Instagram post",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 2,
      description: "Optional caption for accessibility",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (1 = newest)",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      media: "image",
      order: "order",
      caption: "caption",
    },
    prepare({ media, order, caption }) {
      return {
        title: `Post ${order || ""}`,
        subtitle: caption?.substring(0, 50) || "No caption",
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
