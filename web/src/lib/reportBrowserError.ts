/**
 * Posts a browser-side error to /api/report-error.
 *
 * Fire and forget, and silent on failure: an error reporter that throws while
 * reporting an error turns one broken page into a loop. keepalive so the
 * request survives the visitor immediately closing the tab, which is exactly
 * what someone does when a page breaks.
 *
 * The trailing slash is required, not cosmetic. next.config sets
 * trailingSlash: true, so the bare path answers 308 and the POST only arrives
 * after a redirect — measured, not assumed.
 */
export function reportBrowserError(error: Error & { digest?: string }): void {
  try {
    void fetch("/api/report-error/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        path: window.location.pathname,
      }),
    }).catch(() => {});
  } catch {
    // Nothing useful to do here, and nothing worth breaking the page over.
  }
}
