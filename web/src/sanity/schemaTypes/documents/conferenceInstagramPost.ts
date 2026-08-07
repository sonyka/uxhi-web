import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons";

// Curated Instagram posts for the conference page. Rather than pull the whole
// @uxhicommunity feed via Instagram's API (a business account + a token that
// expires every ~60 days), editors hand-pick the conference-related posts here:
// paste the post image, a short caption, and the post URL. Zero tokens, nothing
// expires, and full control over exactly which posts appear.
//
// Year-scoped and surfaced in Studio under "Conference" → <year>, exactly like
// conferenceSponsor / conferenceTeam.
export const conferenceInstagramPost = defineType({
  name: "conferenceInstagramPost",
  title: "Conference Instagram Post",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "year",
      title: "Conference Year",
      type: "number",
      description:
        "Auto-set from the year folder you create the post under (defaults to 2026). Read-only so it can't be changed by accident.",
      initialValue: 2026,
      readOnly: true,
      validation: (rule) => rule.required().min(2024).integer(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Display order (lower numbers appear first).",
      initialValue: 0,
    }),
    defineField({
      name: "image",
      title: "Post Image",
      type: "image",
      description:
        "The post's image (a square crop works best — Instagram posts are square). Save the image from the Instagram post and upload it here.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 3,
      description: "A short caption shown under the image (optional — keep it brief).",
    }),
    defineField({
      name: "postUrl",
      title: "Instagram Post URL",
      type: "url",
      description: "Link to the actual post (e.g. https://www.instagram.com/p/…). The card links out to it.",
      validation: (rule) =>
        rule.required().uri({ scheme: ["https"] }).custom((url) =>
          !url || url.includes("instagram.com") ? true : "Must be an instagram.com URL"
        ),
    }),
  ],
  preview: {
    select: { caption: "caption", year: "year", media: "image" },
    prepare({ caption, year, media }) {
      return {
        title: caption ? caption.slice(0, 60) : "Instagram post",
        subtitle: year ? `${year}` : undefined,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
