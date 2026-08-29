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
  title: "Average UX salaries in Hawaiʻi | 2025 State of UX in Hawaiʻi",
  description:
    "UX practitioners in Hawaiʻi earn an average of $110,203 against a national average of $121,196 — a 9% gap. From the 2025 State of UX in Hawaiʻi report by UX Hawaiʻi.",
};

const REPORT_PDF = "/reports/2025-state-of-ux-in-hawaii.pdf";

/**
 * Salary bands reported by survey respondents working in UX (n = 37).
 *
 * NOTE: extracted from the report PDF's text layer, where the bands and their
 * percentages are interleaved. The six values sum to 100% and the shape is
 * consistent with the $110,203 average, but the band-to-percentage mapping has
 * not yet been checked against the rendered slide. Verify before this page
 * goes to production.
 */
const SALARY_BANDS = [
  { label: "Under $25,000", value: 10 },
  { label: "$25,000–$49,999", value: 10 },
  { label: "$50,000–$74,999", value: 15 },
  { label: "$75,000–$99,999", value: 15 },
  { label: "$100,000–$124,999", value: 10 },
  { label: "$125,000+", value: 40, emphasis: true },
];

export default function StateOfUx2025Page() {
  return (
    <main>
      {/* Section intro */}
      <section className="bg-beige-10 py-20 px-6">
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
              <SectionLead size="md" className="mt-6">
                UX practitioners in Hawaiʻi earn meaningfully less than their
                counterparts on the continent — while paying more to live here.
              </SectionLead>
            </MotionDiv>
          </ScrollReveal>
        </Container>
      </section>

      {/* The headline comparison */}
      <section className="bg-white py-16 px-6">
        <Container size="narrow">
          <ScrollReveal>
            <StatComparison
              prefix="$"
              primaryLabel="Average in Hawaiʻi"
              primaryValue={110203}
              comparisonLabel="National average"
              comparisonValue={121196}
              gapNote={
                <>
                  A gap of <strong className="font-black text-purple-140">$10,993</strong>{" "}
                  — Hawaiʻi averages roughly 9% below the national figure. In
                  2023, the cost of living here ran 8.6% above the national
                  average.
                </>
              }
            />
          </ScrollReveal>

          <ScrollReveal>
            <p className="mt-10 text-sm text-gray-100 leading-relaxed">
              Hawaiʻi figure based on 3 salaries from Indeed job postings over a
              36-month period, updated November 19, 2025. National figure based
              on 968 salaries over the same period, updated December 8, 2025.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* The distribution behind the average */}
      <section className="bg-beige-10 py-16 px-6">
        <Container size="narrow">
          <ScrollReveal stagger>
            <MotionDiv>
              <SectionHeading size="sm">
                The average hides a split
              </SectionHeading>
            </MotionDiv>

            <MotionDiv>
              <SectionLead size="md" className="mt-4">
                Two in five respondents earn $125,000 or more. Another one in
                five earns under $50,000. The community is not clustered around
                its own average — it is pulled toward both ends.
              </SectionLead>
            </MotionDiv>

            <MotionDiv>
              <DistributionBars
                className="mt-10"
                bands={SALARY_BANDS}
                caption="Salary range of survey respondents working in UX, by percentage of respondents"
              />
            </MotionDiv>
          </ScrollReveal>

          <ScrollReveal>
            <p className="mt-8 text-sm text-gray-100 leading-relaxed">
              Source: 2024 community survey, n = 37. Percentages are not offered
              for direct comparison with the 2022 report, which had a different
              response count (n = 74).
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Read the rest */}
      <section className="bg-purple-140 py-16 px-6">
        <Container size="narrow">
          <ScrollReveal stagger>
            <MotionDiv>
              <SectionHeading size="sm" color="white">
                This is one section of the report
              </SectionHeading>
            </MotionDiv>

            <MotionDiv>
              <SectionLead size="md" color="white" className="mt-4">
                A preview of what the 2025 State of UX in Hawaiʻi looks like
                published as a page rather than a download. The full report
                covers research methodology, community strengths, our digital
                landscape, and where UX in Hawaiʻi is heading.
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
