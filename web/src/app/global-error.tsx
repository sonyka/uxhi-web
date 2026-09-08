"use client";

import { useEffect } from "react";
import { reportBrowserError } from "@/lib/reportBrowserError";

/**
 * The last resort: an error in the root layout itself.
 *
 * This replaces the whole document, so it has to supply its own html and body
 * and cannot use the site's components — the layout that loads the fonts and
 * the stylesheet is the thing that just failed. Everything here is inline and
 * self-contained on purpose.
 *
 * It should be rare enough that plain and legible beats designed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportBrowserError(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F4F1EA",
          color: "#231769",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <h1 style={{ fontSize: "1.75rem", lineHeight: 1.2, margin: "0 0 1rem" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "#383D42", margin: "0 0 1.75rem" }}>
            The fault is ours, and we have been told about it. Reloading usually
            fixes it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              font: "inherit",
              fontWeight: 600,
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              border: "1px solid #DFE2E6",
              background: "#FFFFFF",
              color: "#231769",
              cursor: "pointer",
            }}
          >
            Reload the page
          </button>
          {error.digest && (
            <p style={{ marginTop: "2rem", fontSize: "0.875rem", color: "#676D73" }}>
              Reference {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
