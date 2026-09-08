/**
 * Shared spam defences for the three public forms.
 *
 * What was already here and works: a honeypot field named "website", hidden,
 * aria-hidden, tabIndex -1 and autocomplete off. A bot that fills every input
 * it finds fills that one and is turned away. Keep it.
 *
 * What did not work is the rate limit. Each action kept a module-level Map of
 * email -> timestamp, which is a fine idea on a server that stays up and close
 * to useless on this one: Netlify and Vercel run these as functions that are
 * created, used and discarded, and run several at once. The Map is empty on
 * most cold starts and never shared between instances, so the limit it appears
 * to enforce is mostly imaginary. It also grew without bound and its comment
 * claimed "3 submissions per hour" while the code allowed one.
 *
 * So: a stateless check first, and the in-memory one demoted to what it
 * honestly is.
 *
 * The stateless check is elapsed time. The form stamps when it was rendered;
 * a submission arriving in under three seconds was not typed by a person, and
 * one arriving more than two hours later is a stale replay. Neither needs
 * storage, so both survive a cold start — which is the whole point.
 *
 * This is proportioned to drive-by bots that walk the web filling in forms,
 * which is what a small site actually gets. It is not proof against someone
 * who reads this file and targets UXHI specifically; that wants a captcha, and
 * a captcha is a real cost paid by every honest person filling the form.
 */

export const HONEYPOT_FIELD = "website";
export const RENDERED_AT_FIELD = "renderedAt";

/** Under this and nobody typed it. */
const MIN_FILL_MS = 3_000;
/** Over this and the page has been sitting open, or the value is replayed. */
const MAX_FILL_MS = 2 * 60 * 60 * 1000;

/**
 * True when the submission looks automated.
 *
 * Callers should answer a bot with the same success message a person gets.
 * Telling a bot why it failed is free tuning information, and the handful of
 * real people who trip this are better served by a message that does not
 * accuse them of anything.
 */
export function looksAutomated(formData: FormData): boolean {
  if (formData.get(HONEYPOT_FIELD)) return true;

  const renderedAt = Number(formData.get(RENDERED_AT_FIELD));
  // Absent or unparseable: fail open. An older cached page, a browser that
  // stripped the field, or a person with scripting off should still be able to
  // reach us — the honeypot is still standing behind this.
  if (!Number.isFinite(renderedAt) || renderedAt <= 0) return false;

  const elapsed = Date.now() - renderedAt;
  return elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS;
}

/**
 * Best-effort repeat-submission check, in memory.
 *
 * Deliberately not presented as a rate limiter any more. On serverless it
 * catches the case it can actually catch — the same person pressing submit
 * twice inside one warm instance — and misses the rest. It is cheap, so it
 * stays; it is not load-bearing, so nothing should be built on it.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_TRACKED = 500;

const lastSeen = new Map<string, number>();

export function isRepeatSubmission(key: string): boolean {
  if (!key) return false;
  const previous = lastSeen.get(key);
  return previous !== undefined && Date.now() - previous < WINDOW_MS;
}

export function rememberSubmission(key: string): void {
  if (!key) return;
  const now = Date.now();

  // Evict on write rather than on a timer: the old Map only ever grew, so a
  // long-lived instance leaked one entry per submission forever.
  for (const [k, seen] of lastSeen) {
    if (now - seen > WINDOW_MS) lastSeen.delete(k);
  }
  if (lastSeen.size >= MAX_TRACKED) {
    const oldest = lastSeen.keys().next();
    if (!oldest.done) lastSeen.delete(oldest.value);
  }

  lastSeen.set(key, now);
}
