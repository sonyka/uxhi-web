import type { StructureBuilder } from "sanity/structure";
import {
  UsersIcon,
  BookIcon,
  BasketIcon,
  EnvelopeIcon,
  ImageIcon,
  ImagesIcon,
  StarIcon,
  FolderIcon,
  DocumentIcon,
  SearchIcon,
  CalendarIcon,
  ComponentIcon,
  CreditCardIcon,
  AddUserIcon,
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
              S.documentTypeListItem("communityPhoto").title("Community Photos").icon(ImagesIcon),
            ])
        ),

      S.divider(),

      // About Page
      S.listItem()
        .title("About Page")
        .icon(UsersIcon)
        .child(
          S.list()
            .title("About Page Content")
            .items([
              S.documentTypeListItem("member").title("Team Members").icon(UsersIcon),
              S.documentTypeListItem("value").title("Values").icon(StarIcon),
              S.documentTypeListItem("aboutFaq").title("FAQs - About").icon(BookIcon),
            ])
        ),

      S.divider(),

      // Events
      S.documentTypeListItem("event").title("Upcoming Events").icon(CalendarIcon),

      // Get Involved
      S.listItem()
        .title("Get Involved")
        .icon(ComponentIcon)
        .child(
          S.list()
            .title("Get Involved Content")
            .items([
              S.documentTypeListItem("partner").title("Partners").icon(UsersIcon),
              S.documentTypeListItem("sponsor").title("Sponsors").icon(CreditCardIcon),
              S.documentTypeListItem("committee").title("Committees").icon(ComponentIcon),
            ])
        ),

      S.divider(),

      // Resources
      S.listItem()
        .title("Resources")
        .icon(FolderIcon)
        .child(
          S.list()
            .title("Resources")
            .items([
              // Resource Categories as folders with their items
              S.listItem()
                .title("Online resources for students")
                .icon(FolderIcon)
                .child(
                  S.documentList()
                    .title("Online resources for students")
                    .filter('_type == "resourceItem" && category._ref == "7e6f0242-ad9e-4b38-95fd-7fc361ca3cfb"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("Local programs & degrees for students")
                .icon(FolderIcon)
                .child(
                  S.documentList()
                    .title("Local programs & degrees for students")
                    .filter('_type == "resourceItem" && category._ref == "b4789204-b1dc-413d-a20a-6f02c4df7a16"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("Online programs for students")
                .icon(FolderIcon)
                .child(
                  S.documentList()
                    .title("Online programs for students")
                    .filter('_type == "resourceItem" && category._ref == "ac47fa97-d00a-4803-a6d6-cbfa34a43044"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.listItem()
                .title("Design communities")
                .icon(FolderIcon)
                .child(
                  S.documentList()
                    .title("Design communities")
                    .filter('_type == "resourceItem" && category._ref == "7cf0efba-e594-45d4-b43c-76da89f310ca"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.divider(),
              S.documentTypeListItem("stateOfUxReport").title("State of UX Report").icon(DocumentIcon),
              S.documentTypeListItem("techOrganization").title("Local Tech Organizations").icon(UsersIcon),
            ])
        ),

      S.divider(),

      // Member Directory
      S.documentTypeListItem("directoryMember").title("Member Directory").icon(SearchIcon),

      S.divider(),

      // Other content
      S.documentTypeListItem("product").title("Shop Products").icon(BasketIcon),
      S.documentTypeListItem("faq").title("FAQs - Join").icon(BookIcon),

      S.divider(),

      // Form submissions
      S.listItem()
        .title("Form Submissions")
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title("Form Submissions")
            .items([
              S.listItem()
                .title("Contact Inquiries")
                .icon(EnvelopeIcon)
                .child(
                  S.documentList()
                    .title("Contact Inquiries")
                    .filter('_type == "submission"')
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("Membership Applications")
                .icon(AddUserIcon)
                .child(
                  S.documentList()
                    .title("Membership Applications")
                    .filter('_type == "membershipApplication"')
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                ),
            ])
        ),
    ]);
