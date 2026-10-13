import type { Metadata } from "next";
import { DirectorySubmitForm } from "@/components/forms/DirectorySubmitForm";
import { SectionIcon } from "@/components/ui/SectionIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLead } from "@/components/ui/SectionLead";
import { InlineLink } from "@/components/ui/InlineLink";
import { ScrollReveal, MotionDiv } from "@/components/ui/motion";

export { viewportBeige30 as viewport } from "@/lib/themeColor";

/**
 * Where members add a directory profile after the fact. New members get the
 * same form as step 2 of /join; this page is for everyone else: members
 * invited by email (the links can carry ?firstName=…&email=… to pre-fill),
 * people who skipped step 2, and members the email missed.
 *
 * It assumes the visitor is a member rather than asking. Sorting members from
 * non-members in a paragraph above the form is what made the old version on
 * /directory feel clunky. The directory is members-only, and that is checked
 * when a person reviews the submission.
 *
 * noindex, for the reason given in design-system/layout.tsx: search should
 * send non-members to /join, not to a form that assumes membership. Also left
 * out of the sitemap.
 */
export const metadata: Metadata = {
  title: "Join our member directory | UXHI",
  description: "Add your profile to the UXHI member directory.",
  robots: { index: false, follow: true },
};

export default function AddProfilePage() {
  return (
    <main className="min-h-screen bg-beige-30">
      <ScrollReveal stagger className="mx-auto max-w-[800px] px-6 pt-32 pb-16 md:pt-40 text-center">
        <MotionDiv>
          <SectionIcon src="/images/icons/icon-directory.svg" alt="" />
        </MotionDiv>
        <MotionDiv>
          <SectionHeading as="h1" size="hero" className="mb-6">
            Join our member directory!
          </SectionHeading>
        </MotionDiv>
        <MotionDiv>
          <SectionLead size="lg" className="mb-4">
            Are you passionate about designing better experiences and making a positive
            impact in Hawaiʻi? Request to be included in the UXHI Directory to connect with
            others, discover opportunities, find collaborators, and share your knowledge
            with our growing community.
          </SectionLead>
        </MotionDiv>
        <MotionDiv>
          <SectionLead size="lg">
            Whether you&apos;re an experienced practitioner, a student, transitioning into
            the field, or applying human-centered approaches in your work, we welcome you.
            Anyone who lives in Hawaiʻi or has strong ties to Hawaiʻi and is passionate
            about design, people, and community is encouraged to apply.
          </SectionLead>
        </MotionDiv>
      </ScrollReveal>

      <section className="py-20 px-6 bg-purple-140">
        <div className="max-w-[800px] mx-auto">
          <DirectorySubmitForm />
          <p className="text-white text-center mt-12">
            Not a member yet? <InlineLink href="/join#join-form">Join the community</InlineLink>.
          </p>
        </div>
      </section>
    </main>
  );
}
