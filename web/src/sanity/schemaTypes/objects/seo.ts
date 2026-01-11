import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      type: "string",
      title: "Meta Title",
      validation: (r) => r.max(60).warning("Keep under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      rows: 3,
      title: "Meta Description",
      validation: (r) => r.max(160).warning("Keep under 160 characters"),
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Open Graph Image",
      description: "1200x630px recommended",
    }),
  ],
});
