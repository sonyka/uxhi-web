"use client";

// The speaker drawer: portrait, bio, links.
//
// Reached from two places now — a name under a session in the agenda, and a
// tile in Meet the Speakers — and it has to be the same panel from both, since
// it is the same person either way. Written out twice it would not stay that
// way for long.

import { AgendaDrawer, Paragraphs } from "./AgendaDrawer";
import { SocialLink } from "./SocialLink";
import { GlobeIcon } from "./icons";
import { GRAY_100 } from "../theme";
import type { AgendaSpeaker } from "./agendaTypes";

export function SpeakerDrawer({
  speaker,
  onClose,
}: {
  speaker: AgendaSpeaker | null;
  onClose: () => void;
}) {
  return (
    <AgendaDrawer
      open={Boolean(speaker)}
      onClose={onClose}
      byline={speaker?.title}
      title={speaker?.name ?? ""}
    >
      {speaker?.kind === "organization"
        ? speaker.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={speaker.logo}
              alt={`${speaker.name} logo`}
              // contain, not cover, and no fixed ratio: a wordmark cropped to
              // a portrait is a wordmark with its ends cut off.
              className="w-full max-w-[280px] h-auto max-h-[120px] object-contain object-left"
            />
          )
        : speaker?.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={speaker.photo}
              alt=""
              // 168px on a phone, 280 from sm up. The drawer is a bottom
              // sheet at that width, so a 280px portrait is 350px tall and
              // takes most of the sheet before the bio has started.
              className="w-full max-w-[168px] sm:max-w-[280px] aspect-[4/5] rounded-2xl object-cover"
            />
          )}
      {speaker?.bio ? (
        <Paragraphs text={speaker.bio} />
      ) : (
        <p style={{ color: GRAY_100 }}>A bio for {speaker?.name} is on the way.</p>
      )}
      {/* Every link the speaker has, rather than one per kind. It used to be
          LinkedIn for a person and a website for an organization, which meant
          a speaker with both showed only the LinkedIn — Sean Tangco has a site
          as well, and there was nowhere for it to go.

          Marks alone, no labels: two shapes doing the same job in the same
          row should look like it, and the aria-labels carry the meaning. */}
      {(speaker?.linkedin || speaker?.website) && (
        <div className="flex items-center gap-3">
          {speaker.linkedin && (
            <SocialLink
              network="linkedin"
              href={speaker.linkedin}
              name={speaker.name}
              size={22}
            />
          )}
          {speaker.website && (
            <a
              href={speaker.website}
              target="_blank"
              rel="noopener"
              aria-label={`${speaker.name} website`}
              // Gray-110 at rest, which is the grey the LinkedIn mark is
              // drawn in — the two sit side by side and were reading as
              // different kinds of thing purely because one was already
              // purple. Purple is the hover, so both marks now do the same
              // thing: quiet until you reach for them.
              className="inline-flex items-center w-fit text-gray-110 hover:text-purple-140 transition-colors"
            >
              <GlobeIcon size={22} />
            </a>
          )}
        </div>
      )}
    </AgendaDrawer>
  );
}
