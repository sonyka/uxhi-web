import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General" },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO Defaults" },
  ],
  fields: [
    // General
    defineField({
      name: "siteName",
      type: "string",
      title: "Site Name",
      group: "general",
      initialValue: "UX Hawaii",
    }),
    defineField({
      name: "tagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "logo",
      type: "image",
      group: "general",
      options: { hotspot: true },
    }),

    // Navigation
    defineField({
      name: "mainNavigation",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "navItem" })],
    }),
    defineField({
      name: "ctaButton",
      type: "object",
      title: "CTA Button",
      group: "navigation",
      fields: [
        defineField({ name: "label", type: "string", initialValue: "Join Us" }),
        defineField({ name: "url", type: "string" }),
      ],
    }),

    // Footer
    defineField({
      name: "footerText",
      type: "text",
      group: "footer",
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      title: "Contact Email",
      group: "footer",
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      group: "footer",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
    defineField({
      name: "footerNavigation",
      type: "array",
      group: "footer",
      of: [defineArrayMember({ type: "navItem" })],
    }),

    // SEO
    defineField({
      name: "defaultSeo",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
