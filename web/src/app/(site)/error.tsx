"use client";

import { useEffect } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionIcon } from "@/components/ui/SectionIcon";
import { SectionLead } from "@/components/ui/SectionLead";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { reportBrowserError } from "@/lib/reportBrowserError";

/**
 * What a visitor sees when a page throws, and how we find out it did.
 *
 * Inside the (site) segment, so the header and footer are still there and the
 * page is still navigable — unlike the 404, which sits at the root and has to
 * mount them itself.
 *
 * `reset` re-renders the segment. Worth offering first: a good share of these
 * are a failed fetch rather than a broken page, and trying again genuinely
 * works. Home is the fallback for when it does not.
 *
 * In production `error.message` is replaced by React with a generic string and
 * the real one is only findable by `digest`, which is why the digest is sent
 * and shown. It is the handle that ties this screen to the Slack alert.
 */
export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportBrowserError(error);
  }, [error]);

  return (
    <section className="bg-beige-30 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-[720px] text-center">
        <SectionIcon src="/images/icons/icon-empty.svg" alt="" />

        <SectionEyebrow className="mb-3 block">Something went wrong</SectionEyebrow>

        <SectionHeading as="h1" size="lg" className="mb-6">
          This page didn&apos;t load
        </SectionHeading>

        <SectionLead size="lg" className="mx-auto max-w-[46ch]">
          The fault is ours, not yours, and we have been told about it. Trying
          again often works &mdash; it is frequently a request that did not come
          back rather than a page that is broken.
        </SectionLead>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <PrimaryCTA href="/" variant="subdued">
            Back to home
          </PrimaryCTA>
        </div>

        {error.digest && (
          <p className="mt-8 text-sm text-gray-100">
            Reference <code className="font-mono">{error.digest}</code>
          </p>
        )}
      </div>
    </section>
  );
}
