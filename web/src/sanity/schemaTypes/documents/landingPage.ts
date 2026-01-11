import { defineType, defineField, defineArrayMember } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Internal Title",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
    defineField({
      name: "pageBuilder",
      type: "array",
      title: "Page Sections",
      of: [
        defineArrayMember({ type: "heroBlock" }),
        defineArrayMember({ type: "statsBlock" }),
        defineArrayMember({ type: "featuresBlock" }),
        defineArrayMember({ type: "testimonialsBlock" }),
        defineArrayMember({ type: "teamBlock" }),
        defineArrayMember({ type: "ctaBlock" }),
        defineArrayMember({ type: "richTextBlock" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
