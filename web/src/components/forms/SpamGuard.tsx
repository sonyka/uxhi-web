"use client";

import { useEffect, useRef } from "react";
import { HONEYPOT_FIELD, RENDERED_AT_FIELD } from "@/lib/spam";

/**
 * The two hidden fields every public form carries.
 *
 * Was three copies of a honeypot pasted into three forms, and they had already
 * drifted — the directory form's field was named company_url while the other
 * two used website, so the three actions each checked a different name. One
 * component, one name.
 *
 * The timestamp has to be written on the client, which is the reason this is a
 * client component at all. These forms sit on pages Next can render once and
 * serve for hours; a server-rendered timestamp would be the build's, not the
 * visitor's, and every honest submission would look like a two-hour-old replay.
 * Setting it in an effect means it is stamped when the page is actually in
 * front of someone.
 *
 * Until that effect runs the field is empty, and the server treats an empty
 * value as "no opinion" rather than as a failure — someone submitting faster
 * than hydration should not be turned away, and the honeypot still stands.
 *
 * Written straight to the input through a ref rather than held in state. This
 * is a value for the DOM to carry to the server, nothing renders from it, and
 * setting state in an effect only to re-render an input React already put
 * there is the cascading render the lint rule is warning about.
 */
export function SpamGuard() {
  const stamp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stamp.current) stamp.current.value = String(Date.now());
  }, []);

  return (
    <>
      {/* Off-screen rather than display:none — a bot that skips hidden inputs
          still sees this one, which is the point of it. */}
      <div className="absolute opacity-0 -z-10" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Website</label>
        <input
          type="text"
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name={RENDERED_AT_FIELD} ref={stamp} defaultValue="" />
    </>
  );
}
