import type { StructureBuilder } from "sanity/structure";
import {
  UsersIcon,
  BookIcon,
  CommentIcon,
  BasketIcon,
  EnvelopeIcon,
  ImageIcon,
  ImagesIcon,
} from "@sanity/icons";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Homepage Content
      S.listItem()
        .title("Homepage")
        .icon(ImageIcon)
        .child(
          S.list()
            .title("Homepage Content")
            .items([
              S.documentTypeListItem("instagramPost").title("Instagram Feed").icon(ImageIcon),
              S.documentTypeListItem("communityPhoto").title("Community Photos").icon(ImagesIcon),
            ])
        ),

      S.divider(),

      // Regular document lists
      S.documentTypeListItem("member").title("Team").icon(UsersIcon),
      S.documentTypeListItem("testimonial").title("Testimonials").icon(CommentIcon),
      S.documentTypeListItem("product").title("Merch Products").icon(BasketIcon),
      S.documentTypeListItem("faq").title("FAQs").icon(BookIcon),

      S.divider(),

      // Form submissions
      S.listItem()
        .title("Form Submissions")
        .icon(EnvelopeIcon)
        .child(
          S.documentList()
            .title("Submissions")
            .filter('_type == "submission"')
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
        ),
    ]);
