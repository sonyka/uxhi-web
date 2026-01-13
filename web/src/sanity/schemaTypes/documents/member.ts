import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

export const member = defineType({
  name: "member",
  title: "Team",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Display order (lower numbers appear first)",
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g., Co-Founder, Events Manager, Advisor",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter/X URL",
          type: "url",
        }),
        defineField({
          name: "website",
          title: "Personal Website",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "isFounder",
      title: "Is Founder",
      type: "boolean",
      description: "Check if this member is a founder/core team member shown on About page",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show in featured team sections",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
