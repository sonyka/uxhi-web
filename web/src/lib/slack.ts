"use server";

interface SlackBlock {
  type: string;
  text?: { type: string; text: string; emoji?: boolean };
  fields?: { type: string; text: string }[];
  elements?: { type: string; text: string }[];
}

/**
 * Module-local on purpose, and it must stay that way.
 *
 * Every export of a "use server" file is a server action — a POST endpoint the
 * browser can call. A function that takes a webhook URL as an argument would
 * therefore be an open relay: anyone could make this server POST a body of
 * their choosing to a host of their choosing. Keeping the URL out of the
 * signature, and the function out of the exports, is what prevents that.
 */
async function post(
  webhookUrl: string | undefined,
  envName: string,
  blocks: SlackBlock[],
) {
  if (!webhookUrl) {
    console.warn(`${envName} not set — skipping Slack notification`);
    return;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks }),
    });

    if (!res.ok) {
      console.error("Slack notification failed:", res.status, await res.text());
    }
  } catch (error) {
    console.error("Slack notification error:", error);
  }
}

/** Form submissions — the #form-submissions channel. */
export async function sendSlackNotification(blocks: SlackBlock[]) {
  return post(process.env.SLACK_WEBHOOK_URL, "SLACK_WEBHOOK_URL", blocks);
}

/**
 * Site errors, which want their own channel.
 *
 * SLACK_ALERT_WEBHOOK_URL when it is set, the forms' webhook otherwise — the
 * behaviour errorReport.ts has described since it was written, and which until
 * now nothing implemented: this module read SLACK_WEBHOOK_URL and only that,
 * so every alert landed among the form submissions regardless.
 *
 * The fallback is deliberate. An alert in a busy channel is worse than an alert
 * in a quiet one, but both beat an alert nobody sent.
 */
export async function sendSlackAlert(blocks: SlackBlock[]) {
  const alertUrl = process.env.SLACK_ALERT_WEBHOOK_URL;
  return alertUrl
    ? post(alertUrl, "SLACK_ALERT_WEBHOOK_URL", blocks)
    : post(process.env.SLACK_WEBHOOK_URL, "SLACK_WEBHOOK_URL", blocks);
}
