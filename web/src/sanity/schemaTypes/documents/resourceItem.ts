import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const resourceItem = defineType({
  name: "resourceItem",
  title: "Resource Item",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Link URL",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "resourceCategory" }],
      description: "Select the category this resource belongs to",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      type: "image",
      title: "Icon/Logo",
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
      title: "title",
      subtitle: "category.title",
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
