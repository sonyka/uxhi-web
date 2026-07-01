"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

/**
 * Loads Google Analytics only when the page is served from the given
 * production hostname (or its www. variant).
 *
 * Why: the community property (G-DMCWLCQD08) is already collecting live
 * uxhi.community traffic. Gating keeps staging/preview hits (uxhi.hisony.com,
 * *.vercel.app, localhost) out of the live reports. When the Netlify site is
 * re-pointed to uxhi.community at launch, tracking activates automatically —
 * same property, no loss of historical continuity.
 *
 * Omit `productionHost` to always load (for tags with no live data to protect
 * that should be verifiable on staging).
 */
export function GoogleAnalyticsGated({
  gaId,
  productionHost,
}: {
  gaId: string;
  productionHost?: string;
}) {
  // Start disabled so the server and first client render agree (no GA script),
  // then decide on the client where window.location.hostname is available.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    const allowed =
      !productionHost || host === productionHost || host === `www.${productionHost}`;
    if (allowed) {
      // Reading the client-only hostname after mount is what an effect is for;
      // this runs once and only ever enables.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEnabled(true);
    }
  }, [productionHost]);

  return enabled ? <GoogleAnalytics gaId={gaId} /> : null;
}
