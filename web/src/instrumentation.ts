/**
 * Server-side error reporting.
 *
 * Next calls onRequestError for anything thrown while handling a request — a
 * page that fails to render, a server action that blows up, a route handler.
 * It is the one hook that sees those, and without it they land in a log nobody
 * is watching.
 *
 * The browser half is separate: error boundaries post to /api/report-error.
 * Between them they cover both sides of the app, which matters — the
 * navigation fault we shipped this week was a browser-side React crash and
 * would have gone unseen by this hook alone.
 */
/**
 * Requests Next refused as malformed, which are not faults of ours.
 *
 * Both arrive in bursts from vulnerability scanners working through /join:
 * a form post whose hidden action ID has been tampered with, and an RSC
 * request whose router-state header carries an injection string such as
 * "(select 19…". Next rejects them correctly and then reports the rejection
 * as an error, which put a dozen alerts at a time into the channel and none
 * of them actionable.
 *
 * A third shape followed the first ship: a POST carrying both an action ID
 * and `RSC: 1`, sent to any path at all (/api/ among them, which has no
 * page). The unknown ID is rejected as above, and Next then stumbles over
 * its own plain-text rejection and throws "Expected RSC response, got
 * text/plain". Next's browser code never sends `RSC: 1` with an action, so
 * that pairing is a tool, never a visitor. Next strips `RSC` before this hook
 * sees the request, so the test is the invariant on an action POST — which
 * a real browser's stale action cannot produce: measured, it gets a clean
 * 404 and no invariant.
 *
 * Nothing real is hidden by skipping them. A visitor whose page predates a
 * deploy can meet "Failed to find Server Action" too, but their form then
 * fails in the browser, and the error boundary reports that on its own.
 */
type RequestInfo = {
  path?: string;
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
};

function isRejectedRequest(err: Error, request: RequestInfo): boolean {
  if (err.message.startsWith("Failed to find Server Action")) return true;
  const headers = request.headers ?? {};
  if (
    err.message.includes("Expected RSC response, got text/plain") &&
    request.method === "POST" &&
    headers["next-action"] !== undefined
  ) {
    return true;
  }
  // Production lets the raw JSON.parse failure through; dev wraps it.
  if (err.message.startsWith("The router state header was sent but could not be parsed")) return true;
  const frames = err.stack?.split("\n").slice(1, 3).join("\n") ?? "";
  return (
    err.name === "SyntaxError" &&
    err.message.includes("is not valid JSON") &&
    frames.includes("JSON.parse") &&
    frames.includes("/node_modules/next/")
  );
}

export async function onRequestError(
  error: unknown,
  request: RequestInfo,
) {
  const err = error instanceof Error ? error : new Error(String(error));
  if (isRejectedRequest(err, request)) return;

  // Imported here rather than at module scope: instrumentation is loaded in
  // every runtime Next uses, including edge, and this pulls in the Slack
  // helper only when something has actually gone wrong.
  const { reportError } = await import("@/lib/errorReport");
  await reportError({
    source: "server",
    message: err.message,
    stack: err.stack,
    path: request?.path,
  });
}
