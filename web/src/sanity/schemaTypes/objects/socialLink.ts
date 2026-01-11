import { defineType, defineField } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      type: "string",
      options: {
        list: [
          { title: "LinkedIn", value: "linkedin" },
          { title: "Twitter/X", value: "twitter" },
          { title: "Instagram", value: "instagram" },
          { title: "Facebook", value: "facebook" },
          { title: "YouTube", value: "youtube" },
          { title: "Slack", value: "slack" },
          { title: "Discord", value: "discord" },
        ],
      },
    }),
    defineField({
      name: "url",
      type: "url",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "url" },
  },
});
