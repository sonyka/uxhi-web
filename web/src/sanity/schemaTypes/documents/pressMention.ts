import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const pressMention = defineType({
  name: "pressMention",
  title: "Press Mention",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "source",
      type: "string",
      title: "Publication / Source",
      description: "e.g. Hawaii Bulletin, Hawaii Public Radio",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      type: "string",
      title: "Article Headline",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Article URL",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      type: "date",
      title: "Publication Date",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured on About Page",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "headline",
      source: "source",
      featured: "featured",
    },
    prepare({ title, source, featured }) {
      return {
        title,
        subtitle: `${source}${featured ? " — Featured" : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Date (Newest)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
