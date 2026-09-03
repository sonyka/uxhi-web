import type { AgendaSlot } from "./_components/AgendaSection";

// 2026 run of show, transcribed from the planning sheet.
//
// The sheet's ✅ marks and yellow highlights are editorial status — confirmed
// speaker, copy still to write — and are not content, so they are not here.
//
// The sheet also carries a third column, Blue Box, with no session in any row.
// The room list below is the two that are actually programmed; the component
// takes any number, so adding it later is a data change.
//
// ⚠️ Two rows read as internal run-of-show rather than anything an attendee
//    needs: "Close / Clean up" and "5:00 pm ish — Leave". They are kept so the
//    day is complete, but they want a decision before this goes public.

export const AGENDA_ROOMS = ["Main Room", "Purple Box"];

export const AGENDA_2026: AgendaSlot[] = [
  {
    time: "8:00 am",
    sessions: [{ title: "Doors open" }],
  },
  {
    time: "9:00 am",
    duration: "15 min",
    sessions: [{ title: "Opening remarks", speakers: "Kat and Jenn" }],
  },
  {
    time: "9:15 am",
    duration: "40 min",
    sessions: [{ title: "Conference-wide icebreaker", speakers: "Sean" }],
  },
  {
    time: "10:00 am",
    duration: "1 hr",
    sessions: [{ title: "Keynote" }],
  },
  {
    time: "11:00 am",
    duration: "1 hr",
    sessions: [
      {
        room: "Main Room",
        title: "Case study showcase",
        format: "Lightning Talks",
        speakers: "Carolyn Rojsutivat, Kim Cinco, Amy McKee, Gage Minamoto",
      },
      {
        room: "Purple Box",
        title:
          "The professional listener: deep listening, strategic filtering, and getting to action",
        format: "Talk",
        speakers: "Sean Tangco",
      },
    ],
  },
  {
    time: "12:00 pm",
    duration: "1 hr",
    sessions: [{ title: "Lunch" }],
  },
  {
    time: "1:00 pm",
    duration: "1 hr",
    sessions: [
      {
        room: "Main Room",
        // The sheet punctuates this with an em dash; the site does not use them.
        title:
          "The Stories We Inherit: stewarding the narratives that shape our organizations",
        format: "Talk",
        speakers: "Fai Visuthicho",
      },
      {
        room: "Purple Box",
        title: "If mom says no, ask dad",
        format: "Workshop",
        speakers: "Steph Lum",
      },
    ],
  },
  {
    time: "2:00 pm",
    duration: "1 hr",
    sessions: [
      {
        room: "Main Room",
        title: "Designers are translators",
        format: "Talk",
        speakers: "Nate Lynch",
      },
      {
        room: "Purple Box",
        title: "Storytelling framework workshop",
        format: "Workshop",
        speakers: "Anthology",
      },
    ],
  },
  {
    time: "3:00 pm",
    duration: "1 hr",
    sessions: [
      {
        room: "Main Room",
        title: "Reciprocity by design: tech as a public good",
        format: "Talk",
        speakers: "Hanalei Ramos",
      },
      {
        room: "Purple Box",
        title: "Sharing your career moʻolelo",
        format: "Workshop",
        speakers: "Piʻikū",
      },
    ],
  },
  {
    time: "4:00 pm",
    sessions: [{ title: "Close and clean up" }],
  },
  {
    time: "5:00 pm",
    sessions: [{ title: "Leave" }],
  },
];
