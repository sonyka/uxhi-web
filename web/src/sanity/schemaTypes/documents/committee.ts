import { defineType, defineField } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export const committee = defineType({
  name: "committee",
  title: "Committee",
  type: "document",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      type: "image",
      title: "Icon",
      description:
        "⚠️ Design-managed — do not update without consulting the project designer. Minimum 192×192px. Accepted format: PNG (SVG not supported by Sanity image pipeline).",
      options: { hotspot: false },
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "icon",
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
