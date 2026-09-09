import { ConferenceButton, ArrowRightIcon, ShakaIcon, GlobeIcon } from "web";

/** The three fills, in the order the page uses them. */
export const Variants = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
    <ConferenceButton href="https://uxhiconference.com">Get tickets</ConferenceButton>
    <ConferenceButton href="https://uxhiconference.com" variant="secondary">
      Become a sponsor
    </ConferenceButton>
    <ConferenceButton href="https://uxhiconference.com" variant="outline">
      View on map
    </ConferenceButton>
  </div>
);

/** Leading reads as "do this"; trailing as "go here". */
export const WithIcons = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
    <ConferenceButton href="https://uxhiconference.com" icon={ShakaIcon}>
      Get tickets
    </ConferenceButton>
    <ConferenceButton
      href="https://uxhiconference.com"
      variant="secondary"
      icon={ArrowRightIcon}
      iconPosition="trailing"
    >
      See the agenda
    </ConferenceButton>
    <ConferenceButton
      href="https://uxhiconference.com"
      variant="outline"
      icon={GlobeIcon}
      iconPosition="trailing"
    >
      Entrepreneurs Sandbox
    </ConferenceButton>
  </div>
);

/**
 * On the purple band. Only the teal fill survives here — primary is purple on
 * purple, which reads as a bare link, and outline draws a purple hairline that
 * disappears into the ground.
 */
export const OnDarkGround = () => (
  <div
    style={{
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      alignItems: "center",
      background: "var(--color-purple-140)",
      padding: 24,
      borderRadius: 12,
    }}
  >
    <ConferenceButton href="https://uxhiconference.com" variant="secondary">
      Get tickets
    </ConferenceButton>
    <ConferenceButton
      href="https://uxhiconference.com"
      variant="secondary"
      icon={ArrowRightIcon}
      iconPosition="trailing"
    >
      Read the mo&#699;olelo
    </ConferenceButton>
  </div>
);
