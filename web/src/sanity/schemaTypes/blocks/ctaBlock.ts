import { defineType, defineField } from "sanity";
import { InlineIcon } from "@sanity/icons";

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call to Action",
  type: "object",
  icon: InlineIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "buttonLabel",
      type: "string",
    }),
    defineField({
      name: "buttonUrl",
      type: "string",
    }),
    defineField({
      name: "style",
      type: "string",
      options: {
        list: [
          { title: "Purple Background", value: "purple" },
          { title: "Teal Background", value: "teal" },
          { title: "Gradient", value: "gradient" },
        ],
        layout: "radio",
      },
      initialValue: "purple",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: title || "Call to Action",
        subtitle: "CTA Section",
        media: InlineIcon,
      };
    },
  },
});
