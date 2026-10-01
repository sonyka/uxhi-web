"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { reportBrowserError } from "@/lib/reportBrowserError";
import { ConferenceButton } from "./_components/ConferenceButton";
import { LogoBadge } from "./_components/LogoBadge";
import { TYPE } from "./theme";

/**
 * What a visitor sees when the 2026 conference page throws.
 *
 * At the year level, not at `(conference)/`, because an error page is
 * unavoidably visual — a font, a ground, a measure — and anything visual placed
 * at the cross-year level becomes a constraint on 2027. 2027 brings its own.
 * The 2024 and 2025 archives need none: they are frozen static files under
 * `public/`, not routes, so nothing here can throw for them.
 *
 * Without this file these faults escalated to app/global-error.tsx, which
 * replaces the whole document — so a visitor to uxhiconference.com landed on a
 * system-font page with no Bricolage, no badge and no way back. This keeps the
 * fault inside the page.
 *
 * ⚠️ `reset` is deliberately not used, which is why it is not destructured.
 *    The common fault here is a tab carrying an older deployment's JavaScript
 *    (there is no Skew Protection on Vercel Hobby), and `reset()` re-renders
 *    the segment against that same broken module graph — it would fail again on
 *    every press. Only a fresh document fixes it, so the one action is a hard
 *    reload. `location.reload()` rather than a link, so the conference domain
 *    keeps the clean URL the visitor arrived on instead of showing the
 *    rewritten /conference/2026/ path.
 */
export default function Conference2026Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    reportBrowserError(error);
  }, [error]);

  // Colours as Tailwind token classes rather than style props with the theme's
  // var() aliases: both track the parent palette, and theme.ts asks for the
  // class form wherever a className is already being written.
  return (
    <main className="min-h-screen bg-beige-30 flex items-center justify-center px-6 py-24">
      <div className="flex flex-col items-center text-center max-w-[62ch]">
        <LogoBadge />

        <p className={cn(TYPE.eyebrow, "mt-8 mb-3 text-gray-100")}>
          Something went wrong
        </p>

        <h1 className={cn(TYPE.sectionTitle, "text-gray-140")}>
          This page didn&apos;t load
        </h1>

        <p className={cn(TYPE.body, "mt-5 text-gray-120")}>
          The fault is ours, not yours, and we have been told about it. Often
          this is a tab that has been open since before our last update, holding
          an older copy of the page &mdash; reloading hands you the current one
          and it works again.
        </p>

        <div className="mt-10">
          <ConferenceButton onClick={() => window.location.reload()}>
            Reload the page
          </ConferenceButton>
        </div>

        {error.digest && (
          <p className={cn(TYPE.fine, "mt-8 text-gray-100")}>
            Reference <code className="font-mono">{error.digest}</code>
          </p>
        )}
      </div>
    </main>
  );
}
