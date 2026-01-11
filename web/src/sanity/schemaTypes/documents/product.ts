import { defineType, defineField, defineArrayMember } from "sanity";
import { BasketIcon } from "@sanity/icons";

export const product = defineType({
  name: "product",
  title: "Merch Product",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "price",
      type: "number",
      description: "Price in USD",
      validation: (r) => r.positive(),
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "purchaseUrl",
      type: "url",
      title: "Purchase URL",
      description: "External link to purchase (e.g., Shopify, Gumroad)",
    }),
    defineField({
      name: "available",
      type: "boolean",
      title: "Currently Available",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Product",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      price: "price",
      media: "images.0",
    },
    prepare({ title, price, media }) {
      return {
        title,
        subtitle: price ? `$${price}` : "Price not set",
        media,
      };
    },
  },
});
