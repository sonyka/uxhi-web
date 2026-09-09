import type { Metadata } from "next";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLead } from "@/components/ui/SectionLead";
import { InlineLink } from "@/components/ui/InlineLink";
import { MEMBER_COUNT } from "@/lib/stats";

export { viewportBeige30 as viewport } from "@/lib/themeColor";

export const metadata: Metadata = {
  title: "Privacy | UXHI",
  description:
    "What UXHI collects, why, how long we keep it, and how to have your information removed.",
};

/**
 * The privacy notice.
 *
 * Written from what the code actually does rather than from a template: the
 * three server actions in lib/actions, the analytics component, the directory
 * query and the Instagram embed between them describe every piece of personal
 * information this site touches. Where the two ever disagree, the code is the
 * fact and this page is the bug.
 *
 * Removal requests route to the contact form, not to an address. UXHI has no
 * published email — neither this site nor the current one has ever shown one —
 * and naming a mailbox nobody has confirmed receives mail would be worse than
 * naming a form that demonstrably works.
 *
 * Not legal advice, and it should be read by someone on the board before the
 * domain is pointed here.
 */

const LAST_UPDATED = "8 September 2026";

/** A heading and its paragraphs, so every section is spaced the same way. */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 first:mt-0">
      <SectionHeading size="sm" className="mb-4">
        {title}
      </SectionHeading>
      <div className="space-y-4 text-base leading-relaxed text-gray-120">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-beige-30">
      <div className="mx-auto max-w-[680px] px-6 pt-32 pb-24 md:pt-40">
        <SectionEyebrow className="mb-3 block">Privacy</SectionEyebrow>

        <SectionHeading as="h1" size="lg" className="mb-6">
          What we collect, and why
        </SectionHeading>

        <SectionLead size="lg" className="mb-4">
          UXHI is a volunteer-run community organisation. We collect as little
          as we can get away with, and we would rather explain it plainly than
          bury it.
        </SectionLead>

        <p className="text-sm text-gray-100">Last updated {LAST_UPDATED}</p>

        <div className="mt-14">
          <Section title="What you give us">
            <p>
              Three forms on this site collect information, and only when you
              choose to fill one in.
            </p>
            <ul className="space-y-3 pl-5 list-disc marker:text-teal-90">
              <li>
                <strong className="font-black text-gray-140">Get in touch</strong> —
                your name, email address, and optionally your role and
                organisation, along with your message.
              </li>
              <li>
                <strong className="font-black text-gray-140">Membership</strong> —
                your name, email address, a link to your LinkedIn or website,
                and details about your experience and interests.
              </li>
              <li>
                <strong className="font-black text-gray-140">
                  Directory submission
                </strong>{" "}
                — the above, plus a photograph and the professional details you
                want shown on your profile.
              </li>
            </ul>
            <p>
              We do not buy information about you, and we do not sell or rent
              what you give us.
            </p>
          </Section>

          <Section title="The member directory is public">
            <p>
              This is the part worth reading twice. The{" "}
              <InlineLink href="/directory">member directory</InlineLink> is a
              public page: the {MEMBER_COUNT}+ profiles on it are visible to
              anyone, and search engines index them. A profile shows the name,
              photograph, job title, island, experience level and LinkedIn link
              that the member provided.
            </p>
            <p>
              That is the point of a directory — it exists so people can find
              and hire UX practitioners in Hawai&#699;i — but it does mean your
              profile is findable outside this site, including in search results
              and in caches we do not control.
            </p>
            <p>
              You can ask to be taken out at any time. See{" "}
              <InlineLink href="#removal">removing your information</InlineLink>{" "}
              below.
            </p>
          </Section>

          <Section title="How long we keep it">
            <ul className="space-y-3 pl-5 list-disc marker:text-teal-90">
              <li>
                <strong className="font-black text-gray-140">
                  Form submissions
                </strong>{" "}
                — 90 days, then deleted.
              </li>
              <li>
                <strong className="font-black text-gray-140">
                  Directory profiles
                </strong>{" "}
                — for as long as you want to be listed. They are removed when
                you ask.
              </li>
              <li>
                <strong className="font-black text-gray-140">
                  Analytics
                </strong>{" "}
                — kept by Google under their own retention settings, and not
                tied to a name.
              </li>
            </ul>
          </Section>

          <Section title="Who else can see it">
            <p>
              We use a small number of services to run the site. Each of them
              handles information on our behalf:
            </p>
            <ul className="space-y-3 pl-5 list-disc marker:text-teal-90">
              <li>
                <strong className="font-black text-gray-140">Sanity</strong> —
                the content system that stores directory profiles and contact
                submissions.
              </li>
              <li>
                <strong className="font-black text-gray-140">Slack</strong> —
                where a notification arrives when a form is submitted, so a
                volunteer sees it.
              </li>
              <li>
                <strong className="font-black text-gray-140">
                  Google Sheets
                </strong>{" "}
                — membership applications, in a spreadsheet only UXHI&rsquo;s
                founding team can open.
              </li>
              <li>
                <strong className="font-black text-gray-140">Netlify</strong> —
                hosting, which means their servers handle every request to this
                site.
              </li>
              <li>
                <strong className="font-black text-gray-140">
                  Google Analytics
                </strong>{" "}
                — visitor statistics.
              </li>
              <li>
                <strong className="font-black text-gray-140">Behold</strong> —
                fetches our public Instagram posts for the feed on the homepage.
              </li>
            </ul>
          </Section>

          <Section title="Analytics and cookies">
            <p>
              We use Google Analytics to understand roughly how many people
              visit and which pages they read. It tells us about pages and
              devices, not about you by name, and we do not use it to advertise
              to anyone.
            </p>
            <p>
              It does set cookies. If you would rather it did not, most browsers
              can block them, and Google publishes a{" "}
              <InlineLink href="https://tools.google.com/dlpage/gaoptout">
                browser opt-out
              </InlineLink>{" "}
              that works across every site using Analytics.
            </p>
          </Section>

          <Section title="Removing your information">
            <p id="removal" className="scroll-mt-28">
              Use the{" "}
              <InlineLink href="/about#contact">contact form</InlineLink> and
              tell us what you would like removed — your directory profile, a
              form submission, or both. You do not have to explain why.
            </p>
            <p>
              We will confirm and remove it as quickly as we can, and within 30
              days. Search engines may keep a cached copy of a public profile
              for a while after it has gone from this site; that is outside our
              control, though we are happy to help you ask them to clear it.
            </p>
          </Section>

          <Section title="Changes to this notice">
            <p>
              If what we collect changes, this page changes with it, and the
              date at the top moves. If a change is significant we will say so
              rather than quietly editing.
            </p>
          </Section>

          <Section title="Questions">
            <p>
              Anything unclear, or anything here that does not match what you
              have experienced, please{" "}
              <InlineLink href="/about#contact">tell us</InlineLink>. We would
              rather know.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
