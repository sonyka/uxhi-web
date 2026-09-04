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
      rows: 8,
      description:
        "An opening sentence or two, then one line per responsibility starting with •. The card renders those as a bulleted list; without them it shows the whole thing as a paragraph.",
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
