import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { Footer } from "@/components/layout/Footer";
import { siteSettings } from "@/components/layout/siteSettings";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionIcon } from "@/components/ui/SectionIcon";
import { SectionLead } from "@/components/ui/SectionLead";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { QuickLinkPill } from "@/components/ui/QuickLinkPill";

export const metadata: Metadata = {
  title: "Page not found | UXHI",
  description:
    "That page isn't here. Find UX events, the member directory, resources and the UXHI Conference instead.",
};

/* Pill icons are drawn inline, as they are on Resources and About — the site
   has no icon library, and three glyphs used once do not warrant one. */

function UsersIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function BookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

/**
 * The 404.
 *
 * Next serves this for any URL that matches no route, and renders it inside
 * the ROOT layout — the (site) layout, and therefore the header and footer,
 * do not apply. Until this file existed a wrong address landed on the
 * framework's own bare default: black text on white, no navigation, and no
 * way back to the site other than the browser's back button. The header and
 * footer are mounted here by hand for exactly that reason; a dead end is the
 * one page that most needs the way out.
 *
 * Everything below is the design system as-is — beige-30 ground, a spot
 * illustration, SectionHeading in purple, and the same quick-link pills the
 * About and Resources heroes use. A 404 is not the place to invent a look.
 *
 * The pills are the useful part. "Back to home" is the polite answer, but
 * someone who typed or followed a broken link was usually after one of four
 * things, and naming them costs a row.
 */
export default function NotFound() {
  return (
    <>
      <SkipLink />
      <Header settings={siteSettings} />
      <main id="main" tabIndex={-1}>
        <section className="bg-beige-30 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-[720px] text-center">
            <SectionIcon src="/images/icons/icon-empty.svg" alt="" />

            <SectionEyebrow className="mb-3 block">Error 404</SectionEyebrow>

            <SectionHeading as="h1" size="lg" className="mb-6">
              We can&apos;t find that page
            </SectionHeading>

            <SectionLead size="lg" className="mx-auto max-w-[46ch]">
              The link may be out of date, or the page may have moved. Nothing is
              lost — here is where most people are heading.
            </SectionLead>

            <div className="mt-10">
              <PrimaryCTA href="/">Back to home</PrimaryCTA>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <QuickLinkPill
                href="/directory"
                icon={<UsersIcon className="w-7 h-7" />}
                label="Find a pro"
                subtitle="Member directory"
              />
              <QuickLinkPill
                href="/events"
                icon={<CalendarIcon className="w-7 h-7" />}
                label="Events"
                subtitle="What&rsquo;s coming up"
              />
              <QuickLinkPill
                href="/resources"
                icon={<BookIcon className="w-7 h-7" />}
                label="Resources"
                subtitle="Guides and reports"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
