import { defineType, defineField, defineArrayMember } from "sanity";
import { ActivityIcon } from "@sanity/icons";

export const statsBlock = defineType({
  name: "statsBlock",
  title: "Stats Section",
  type: "object",
  icon: ActivityIcon,
  fields: [
    defineField({
      name: "stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              type: "string",
              title: "Value (e.g., '480+')",
            }),
            defineField({
              name: "label",
              type: "string",
              title: "Label (e.g., 'Members')",
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "backgroundColor",
      type: "string",
      options: {
        list: [
          { title: "Teal", value: "teal" },
          { title: "Purple", value: "purple" },
          { title: "Cream", value: "cream" },
          { title: "White", value: "white" },
        ],
        layout: "radio",
      },
      initialValue: "teal",
    }),
  ],
  preview: {
    select: { stats: "stats" },
    prepare({ stats }) {
      return {
        title: `${stats?.length || 0} Stats`,
        subtitle: "Stats Section",
        media: ActivityIcon,
      };
    },
  },
});
