/**
 * Recovers from a script that failed to download, by reloading the page once.
 *
 * A ChunkLoadError means the browser could not fetch a piece of the site's
 * JavaScript. Checked against the alerts in Nov 2026, every chunk named was
 * still being served — the files were there and the request simply did not
 * come back: a phone between cell towers, a content blocker, a tab closed
 * mid-load. A tab left open across a deploy fails the same way. In each case
 * a fresh load works, and the error screen was offering a visitor a problem
 * they could not solve.
 *
 * Once per page per minute, so a chunk that genuinely cannot load gets one
 * retry and then the error screen and an alert — never a reload loop. The
 * mark lives in sessionStorage because the reload wipes everything else.
 *
 * Returns true when it has started a reload, in which case the caller should
 * not report: the alert would describe a fault the visitor never saw.
 */
const WINDOW_MS = 60_000;

export function reloadOnChunkError(error: Error): boolean {
  if (error.name !== "ChunkLoadError" && !error.message.startsWith("Failed to load chunk")) {
    return false;
  }

  try {
    const key = `chunk-reload:${window.location.pathname}`;
    const last = Number(sessionStorage.getItem(key));
    if (last && Date.now() - last < WINDOW_MS) return false;
    sessionStorage.setItem(key, String(Date.now()));
  } catch {
    // No sessionStorage (some private modes): without a way to remember the
    // retry, a reload could loop. Report instead.
    return false;
  }

  window.location.reload();
  return true;
}
