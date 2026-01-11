import { defineType, defineField, defineArrayMember } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export const featuresBlock = defineType({
  name: "featuresBlock",
  title: "Features Section",
  type: "object",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow Text",
    }),
    defineField({
      name: "heading",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "features",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              title: "Icon Name",
              description: "e.g., users, calendar, book, star",
            }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
    }),
    defineField({
      name: "layout",
      type: "string",
      options: {
        list: [
          { title: "Grid (3 columns)", value: "grid" },
          { title: "List", value: "list" },
          { title: "Cards", value: "cards" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: title || "Features Section",
        subtitle: "Features",
        media: ComponentIcon,
      };
    },
  },
});
