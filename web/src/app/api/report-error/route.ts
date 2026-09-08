import { NextRequest, NextResponse } from "next/server";
import { reportError } from "@/lib/errorReport";

/**
 * Where the browser reports its own errors.
 *
 * A public endpoint that posts into Slack is an obvious way to make a nuisance
 * of yourself, so it is deliberately dull: same-origin only, a small body, a
 * short message, and the reporter throttles by fingerprint on the way out. It
 * answers 204 to everything, including junk — an endpoint that tells you it
 * refused you is an endpoint worth probing.
 */
const MAX_BODY_BYTES = 8_000;

export async function POST(request: NextRequest) {
  const noContent = new NextResponse(null, { status: 204 });

  // Same-origin only. Not a security boundary — a header is trivially forged —
  // but it turns away every drive-by that is not bothering to try.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && !origin.endsWith(host)) return noContent;

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return noContent;
  }
  if (raw.length > MAX_BODY_BYTES) return noContent;

  let body: { message?: unknown; stack?: unknown; path?: unknown; digest?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return noContent;
  }

  const str = (value: unknown) => (typeof value === "string" ? value : undefined);
  const message = str(body.message);
  if (!message) return noContent;

  await reportError({
    source: "browser",
    message,
    stack: str(body.stack),
    path: str(body.path),
    digest: str(body.digest),
  });

  return noContent;
}
