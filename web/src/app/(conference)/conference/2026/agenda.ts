import type { AgendaSlot } from "./_components/AgendaSection";

// 2026 run of show, transcribed from the planning sheet.
//
// The sheet's ✅ marks and yellow highlights are editorial status — confirmed
// speaker, copy still to write — and are not content, so they are not here.
//
// The sheet also carries a third column, Blue Box, with no session in any row.
// Rooms are named on each card, so adding it later is a data change.
//
// The open and close follow the 2025 site rather than the sheet: doors with
// coffee and breakfast, and named opening and closing remarks. The sheet ended
// on "Close / Clean up" and "5:00 pm ish — Leave", which are run-of-show notes
// for the organisers rather than anything an attendee needs.
//
// Titles are Title Case. The rest of the site is sentence case; talk titles are
// the deliberate exception, because a run of them stacked in a column reads as
// a list of works rather than a list of sentences.
//
// ⚠️ The icebreaker host is "Sean" on the sheet. Written out here as Sean
//    Tangco, who presents at 11:00 — worth confirming it is the same Sean.

export const AGENDA_2026: AgendaSlot[] = [
  {
    time: "8:00 am",
    sessions: [{ title: "Doors Open", detail: "Coffee and light breakfast" }],
  },
  {
    time: "9:00 am",
    duration: "15 min",
    sessions: [
      { title: "Opening Remarks", speakers: "Kat Duran-Higa & Jennifer Kumura" },
    ],
  },
  {
    time: "9:15 am",
    duration: "40 min",
    sessions: [{ title: "Conference-Wide Icebreaker", speakers: "Sean Tangco" }],
  },
  {
    time: "10:00 am",
    sessions: [{ title: "Keynote", detail: "To be announced" }],
  },
  {
    time: "11:00 am",
    sessions: [
      {
        room: "Main Room",
        title: "Case Study Showcase",
        format: "Lightning Talks",
        speakers: "Carolyn Rojsutivat, Kim Cinco, Amy McKee, Gage Minamoto",
      },
      {
        room: "Purple Box",
        title:
          "The Professional Listener: Deep Listening, Strategic Filtering, and Getting to Action",
        format: "Talk",
        speakers: "Sean Tangco",
      },
    ],
  },
  {
    time: "12:00 pm",
    sessions: [{ title: "Lunch" }],
  },
  {
    time: "1:00 pm",
    sessions: [
      {
        room: "Main Room",
        // The sheet punctuates this with an em dash; the site does not use them.
        title:
          "The Stories We Inherit: Stewarding the Narratives That Shape Our Organizations",
        format: "Talk",
        speakers: "Fai Visuthicho",
      },
      {
        room: "Purple Box",
        title: "If Mom Says No, Ask Dad",
        format: "Workshop",
        speakers: "Steph Lum",
      },
    ],
  },
  {
    time: "2:00 pm",
    sessions: [
      {
        room: "Main Room",
        title: "Designers Are Translators",
        format: "Talk",
        speakers: "Nate Lynch",
      },
      {
        room: "Purple Box",
        title: "Storytelling Framework Workshop",
        format: "Workshop",
        speakers: "Anthology",
      },
    ],
  },
  {
    time: "3:00 pm",
    sessions: [
      {
        room: "Main Room",
        title: "Reciprocity by Design: Tech as a Public Good",
        format: "Talk",
        speakers: "Hanalei Ramos",
      },
      {
        room: "Purple Box",
        title: "Sharing Your Career Moʻolelo",
        format: "Workshop",
        speakers: "Piʻikū",
      },
    ],
  },
  {
    time: "4:00 pm",
    sessions: [
      { title: "Closing Remarks", speakers: "Kat Duran-Higa & Jennifer Kumura" },
    ],
  },
];
