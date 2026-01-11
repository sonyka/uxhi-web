import { defineType, defineField } from "sanity";

export const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "linkType",
      type: "string",
      options: {
        list: [
          { title: "Internal Page", value: "internal" },
          { title: "External URL", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    }),
    defineField({
      name: "internalLink",
      type: "string",
      title: "Page Path",
      description: "e.g., /events, /about, /resources",
      hidden: ({ parent }) => parent?.linkType !== "internal",
    }),
    defineField({
      name: "externalUrl",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
  ],
  preview: {
    select: { title: "label" },
  },
});
