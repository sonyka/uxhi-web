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
export async function onRequestError(
  error: unknown,
  request: { path?: string },
) {
  // Imported here rather than at module scope: instrumentation is loaded in
  // every runtime Next uses, including edge, and this pulls in the Slack
  // helper only when something has actually gone wrong.
  const { reportError } = await import("@/lib/errorReport");

  const err = error instanceof Error ? error : new Error(String(error));
  await reportError({
    source: "server",
    message: err.message,
    stack: err.stack,
    path: request?.path,
  });
}
