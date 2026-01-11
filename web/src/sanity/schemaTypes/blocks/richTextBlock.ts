import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Rich Text",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                  }),
                ],
              },
            ],
            decorators: [
              { value: "strong", title: "Strong" },
              { value: "em", title: "Emphasis" },
            ],
          },
          lists: [
            { value: "bullet", title: "Bulleted list" },
            { value: "number", title: "Numbered list" },
          ],
          styles: [
            { value: "normal", title: "Normal" },
            { value: "h2", title: "H2" },
            { value: "h3", title: "H3" },
            { value: "blockquote", title: "Quote" },
          ],
        }),
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
          ],
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Rich Text Block",
        subtitle: "Content",
        media: DocumentTextIcon,
      };
    },
  },
});
