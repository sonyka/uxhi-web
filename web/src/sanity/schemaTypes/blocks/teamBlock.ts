import { defineType, defineField, defineArrayMember } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const teamBlock = defineType({
  name: "teamBlock",
  title: "Team Section",
  type: "object",
  icon: UsersIcon,
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
      name: "sourceType",
      type: "string",
      options: {
        list: [
          { title: "Featured Members (automatic)", value: "featured" },
          { title: "Manual Selection", value: "manual" },
        ],
        layout: "radio",
      },
      initialValue: "featured",
    }),
    defineField({
      name: "members",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "member" }] })],
      hidden: ({ parent }) => parent?.sourceType !== "manual",
    }),
    defineField({
      name: "showAllLink",
      type: "boolean",
      title: "Show 'View All' Link",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: title || "Team Section",
        subtitle: "Team",
        media: UsersIcon,
      };
    },
  },
});
