import { sendSlackNotification } from "@/lib/slack";

/**
 * Tells us the site broke, in the place we already look.
 *
 * Not a monitoring service. There is no dashboard, no grouping across days and
 * no stack trace mapped back to source — a Slack message is what this is, and
 * the reason to choose it over Sentry for a site this size is that a message
 * arriving where someone already reads beats a dashboard nobody opens.
 *
 * Sent to SLACK_ALERT_WEBHOOK_URL when that is set, so errors can have their
 * own channel, and to SLACK_WEBHOOK_URL otherwise — the one the forms already
 * use. Both unset means nothing is sent and a line goes to the server log,
 * which is the same quiet degradation the form notifications have. Worth
 * knowing: unset in production means no alerts at all, silently.
 */

export type ErrorSource = "server" | "browser";

interface ReportInput {
  source: ErrorSource;
  message: string;
  stack?: string;
  /** Where the person was when it happened. */
  path?: string;
  /** Next's digest, which is the only handle a production client error has. */
  digest?: string;
}

/**
 * Throttle, keyed on what makes two reports "the same error".
 *
 * A broken page found by two hundred visitors is two hundred identical
 * messages, and a channel that cries wolf is a channel people mute — which
 * would cost more than having no alerts at all.
 *
 * In memory, so on serverless this is best-effort in the same way the forms'
 * repeat-submission check is: instances are created and discarded and do not
 * share this Map. It collapses a burst inside one warm instance, which is the
 * common shape of a flood, and misses bursts spread across cold ones. Said
 * plainly here so nobody later assumes it is a guarantee.
 */
const THROTTLE_MS = 5 * 60 * 1000;
const MAX_TRACKED = 200;
const lastSent = new Map<string, number>();

function shouldSend(fingerprint: string): boolean {
  const now = Date.now();
  const previous = lastSent.get(fingerprint);
  if (previous !== undefined && now - previous < THROTTLE_MS) return false;

  for (const [key, at] of lastSent) {
    if (now - at > THROTTLE_MS) lastSent.delete(key);
  }
  if (lastSent.size >= MAX_TRACKED) {
    const oldest = lastSent.keys().next();
    if (!oldest.done) lastSent.delete(oldest.value);
  }

  lastSent.set(fingerprint, now);
  return true;
}

/** Slack rejects oversized blocks, and a wall of stack helps nobody read it. */
function clamp(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

export async function reportError(input: ReportInput): Promise<void> {
  const { source, message, stack, path, digest } = input;

  // The first line of the stack is where it happened; the message alone would
  // group every "Cannot read properties of null" on the site into one.
  const fingerprint = `${source}:${message}:${stack?.split("\n")[1]?.trim() ?? ""}`;
  if (!shouldSend(fingerprint)) return;

  const where = source === "server" ? "Server" : "Browser";
  const lines = [
    `*${where} error*${path ? ` — \`${clamp(path, 200)}\`` : ""}`,
    "```" + clamp(message, 500) + "```",
  ];
  if (digest) lines.push(`Digest \`${clamp(digest, 60)}\``);
  if (stack) lines.push("```" + clamp(stack, 1200) + "```");

  await sendSlackNotification([
    {
      type: "section",
      text: { type: "mrkdwn", text: lines.join("\n") },
    },
  ]);
}
