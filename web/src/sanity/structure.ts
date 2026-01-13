import type { StructureBuilder } from "sanity/structure";
import {
  UsersIcon,
  BookIcon,
  CommentIcon,
  BasketIcon,
  EnvelopeIcon,
} from "@sanity/icons";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
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
