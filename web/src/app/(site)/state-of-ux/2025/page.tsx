import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLead } from "@/components/ui/SectionLead";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { InlineLink } from "@/components/ui/InlineLink";
import { ScrollReveal, MotionDiv } from "@/components/ui/motion";
import { StatComparison } from "@/components/report/StatComparison";
import { DistributionBars } from "@/components/report/DistributionBars";

export const metadata: Metadata = {
  title: "Average salaries remain a challenge | 2025 State of UX in Hawaiʻi",
  description:
    "UX practitioners in Hawaiʻi earn an average of $110,203 against a national average of $121,196. From the 2025 State of UX in Hawaiʻi report by UX Hawaiʻi.",
};

const REPORT_PDF = "/reports/2025-state-of-ux-in-hawaii.pdf";

/**
 * Page 40 of the 2025 report, rebuilt as HTML.
 *
 * Everything in the report section below is taken from that slide — heading,
 * both averages, the salary bands and both source notes. Nothing is
 * paraphrased, summarised or inferred: the point of this page is to show that
 * a native rebuild can be faithful, so any authored copy would defeat it.
 * The only non-report copy is the closing band, which is explicitly about
 * this preview rather than about the research.
 */

/**
 * Salary bands reported by survey respondents working in UX.
 * Verified against the rendered page 40, which shows these six bands as a
 * single 100% stacked bar running low to high.
 */
const SALARY_BANDS = [
  { label: "Under $25,000", value: 10 },
  { label: "$25,000–$49,999", value: 10 },
  { label: "$50,000–$74,999", value: 15 },
  { label: "$75,000–$99,999", value: 15 },
  { label: "$100,000–$124,999", value: 10 },
  { label: "$125,000+", value: 40 },
];

export default function StateOfUx2025Page() {
  return (
    <main>
      {/* Report page 40 */}
      <section className="bg-teal-10 py-20 px-6">
        <Container size="narrow">
          <ScrollReveal stagger>
            <MotionDiv>
              <SectionEyebrow>Challenges</SectionEyebrow>
            </MotionDiv>

            <MotionDiv>
              <SectionHeading size="lg" as="h1" className="mt-4">
                Average salaries remain a challenge
              </SectionHeading>
            </MotionDiv>

            <MotionDiv>
              <StatComparison
                className="mt-16"
                prefix="$"
                primary={{
                  value: 110203,
                  label: "Average in Hawaiʻi",
                  source:
                    "Based on 3 salaries taken from job postings on Indeed within a 36-month period (updated November 19, 2025).",
                }}
                comparison={{
                  value: 121196,
                  label: "National Average",
                  source:
                    "Based on 968 salaries taken from job postings on Indeed within a 36-month period (updated December 8, 2025).",
                }}
              />
            </MotionDiv>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-teal-10 pb-20 px-6">
        <Container size="narrow">
          <ScrollReveal stagger>
            <MotionDiv>
              <SectionHeading size="sm" className="text-center">
                Salary range of survey respondents working in UX
              </SectionHeading>
            </MotionDiv>

            <MotionDiv>
              <DistributionBars
                className="mt-10"
                bands={SALARY_BANDS}
                caption="Salary range of survey respondents working in UX, by percentage of respondents"
              />
            </MotionDiv>
          </ScrollReveal>
        </Container>
      </section>

      {/* About this preview — not report content */}
      <section className="bg-purple-140 py-16 px-6">
        <Container size="narrow">
          <ScrollReveal stagger>
            <MotionDiv>
              <SectionHeading size="sm" color="white">
                This is one page of the report
              </SectionHeading>
            </MotionDiv>

            <MotionDiv>
              <SectionLead size="md" color="white" className="mt-4">
                Page 40 of the 2025 State of UX in Hawaiʻi, rebuilt as a web
                page to show what the full report would look like published on
                our own site. The report itself covers research methodology,
                community strengths, our digital landscape within Hawaiʻi&rsquo;s
                economy, and how we might continue to grow UX in Hawaiʻi.
              </SectionLead>
            </MotionDiv>

            <MotionDiv>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <PrimaryCTA href={REPORT_PDF} external>
                  Download the full report
                </PrimaryCTA>
                <InlineLink href="/resources" variant="teal">
                  Back to resources
                </InlineLink>
              </div>
            </MotionDiv>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
