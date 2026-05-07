import type { Metadata } from "next";
import { ConferenceNav } from "./_components/ConferenceNav";
import { CountdownTimer } from "./_components/CountdownTimer";

export const metadata: Metadata = {
  title: "UXHI Conference 2026",
  description: "The UXHI Conference returns in 2026. Coming to Honolulu, HI on October 17.",
};

export default function Conference2026Page() {
  return (
    <div className="flex min-h-screen">
      <ConferenceNav />

      <main className="flex-1 md:ml-56 pt-14 md:pt-0 flex flex-col">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="flex-1 bg-[#faf8f5] flex flex-col justify-center px-8 md:px-14 xl:px-20 py-16 md:py-24">
          <div className="max-w-3xl flex flex-col gap-8">

            {/* Eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
              UXHI Conference 2026
            </p>

            {/* Tagline */}
            <h1 className="text-stone-700 text-xl md:text-2xl leading-relaxed max-w-lg">
              The UXHI Conference returns in 2026. Stay tuned — details are on their way.
            </h1>

            {/* Date / location tags */}
            <div className="flex flex-wrap gap-2">
              {["October 17, 2026", "Honolulu, HI"].map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-stone-500 border border-stone-300 rounded-full px-4 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Countdown */}
            <div className="bg-[#0f0d0b] rounded-2xl px-4 py-5 md:px-8 md:py-7 flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-amber-400/80">
                Counting Down
              </p>
              <CountdownTimer />
            </div>


          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────── */}
        <footer className="bg-[#0f0d0b] px-8 md:px-14 xl:px-20 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-stone-600">© 2026 UX Hawaii. All rights reserved.</p>
            <a
              href="mailto:aloha@uxhiconference.com"
              className="text-xs text-stone-600 hover:text-stone-400 transition-colors"
            >
              aloha@uxhiconference.com
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
}
