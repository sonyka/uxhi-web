import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

export const apiSettings = defineType({
  name: "apiSettings",
  title: "API Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "API Settings",
      readOnly: true,
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn API",
      type: "object",
      fields: [
        defineField({
          name: "accessToken",
          title: "Access Token",
          type: "string",
          description: "LinkedIn OAuth access token (auto-refreshed)",
        }),
        defineField({
          name: "refreshToken",
          title: "Refresh Token",
          type: "string",
          description: "LinkedIn OAuth refresh token",
        }),
        defineField({
          name: "expiresAt",
          title: "Expires At",
          type: "datetime",
          description: "When the access token expires",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "API Settings",
        subtitle: "LinkedIn and other API credentials",
      };
    },
  },
});
