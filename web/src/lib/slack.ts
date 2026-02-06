"use server";

interface SlackBlock {
  type: string;
  text?: { type: string; text: string; emoji?: boolean };
  fields?: { type: string; text: string }[];
  elements?: { type: string; text: string }[];
}

export async function sendSlackNotification(blocks: SlackBlock[]) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("SLACK_WEBHOOK_URL not set — skipping Slack notification");
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
