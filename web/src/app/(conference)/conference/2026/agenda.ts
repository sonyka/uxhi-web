import type { AgendaSlot } from "./_components/agendaTypes";

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
// Each speaker carries a `slug`, which is how the page finds their Sanity
// record for a photo and bio. The name stays here so the agenda still renders
// in full without Sanity — the CMS enriches it rather than owning it.
//
// A session with a `description` is tappable and opens a drawer; one without is
// inert, and shows no chevron promising otherwise. Four are deliberately
// without and are not waiting on copy: Doors Open, Opening Remarks, Lunch and
// Closing Remarks. The one still bare — the icebreaker — has copy coming.
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
    sessions: [
      { room: "Main Room", title: "Opening Remarks", inLineup: false, speakers: [{ name: "Kat Duran-Higa", slug: "kat-duran-higa" }, { name: "Jennifer Kumura", slug: "jennifer-kumura" }] },
    ],
  },
  {
    time: "9:15 am",
    sessions: [{ room: "Main Room", title: "Conference-Wide Icebreaker", speakers: [{ name: "Sean Tangco", slug: "sean-tangco" }] }],
  },
  {
    time: "10:00 am",
    sessions: [
      {
        room: "Main Room",
        badge: "Keynote",
        title: "MO\u02bbO: Stories Shaping Tomorrow",
        description:
          "Mo\u02bbolelo (stories, histories, and traditions) connects mo\u02bbo, a succession or series, with \u02bb\u014dlelo, speech or language. Through mo\u02bbolelo, collective knowledge and experience travel across generations. This presentation explores stories not simply as something to communicate, but as a framework of knowledge that guides our design decisions and helps form personal and shared experiences.\n\nWhile our disciplines vary, our relationships with Hawai\u02bbi offer common ground. As k\u0101naka maoli and kama\u02bb\u0101ina, our distinct perspectives are shaped by geography, interwoven cultures, and complex histories. Our experiences differ, yet our values and responsibilities often align and complement.\n\nThe familial and interdependent relationship between \u02bb\u0101ina and k\u0101naka (land and people) provides the why, we are both children and stewards of this land. A personal application of WCIT\u2019s Mo\u02bbo methodology offers the how: researching a project\u2019s genealogy, developing its emerging story, and translating that understanding into design through a Hawaiian and local lens. Existing values guide this process, while projects create opportunities for people to cultivate new meaning, relationships, and value through lived experience.\n\nThrough an architectural perspective, this talk invites connections with graphic, web, product, service, and experience design. Our methods may differ, but questions of care, meaning, and responsibility connect our practices. How do a people\u2019s and place\u2019s stories shape design decisions? As stewards, how do we perpetuate a place\u2019s collective knowledge and experience for future generations?",
        speakers: [{ name: "Reuben Chock", slug: "reuben-chock" }],
      },
    ],
  },
  {
    time: "11:00 am",
    sessions: [
      {
        room: "Main Room",
        title: "Case Study Showcase",
        description:
          "Join us for a showcase of case studies from a diverse group of Hawai\u02bbi-based practitioners working across design, technology, culture, and community. Each speaker will share a project or experience that offers a glimpse into their process, the challenges they encountered, and what they learned along the way. Featuring perspectives from people working with indigenous knowledge, place-based technology, and creative practice, this session is an opportunity to hear a variety of individual mo\u02bbolelo through the work they share.",
        speakers: [{ name: "Kim Cinco", slug: "kim-cinco" }, { name: "Gage Minamoto", slug: "gage-minamoto" }, { name: "Dr. Kari Noe", slug: "dr-kari-noe" }],
      },
      {
        room: "Purple Box",
        title:
          "The Professional Listener: Deep Listening, Strategic Filtering, and Getting to Action",
        description:
          "My training is in applied sociocultural anthropology, and the most useful description of my job I’ve heard is “professional listener.” But listening only counts if something happens after. This session covers the middle step almost nobody teaches, strategic filtering: how you take everything you heard and decide what actually matters, without flattening it into the answer a stakeholder already wanted. Practical ground: methods for capturing stories in the moment so you don’t lose them, and how to translate what you heard into actions a team can own.",
        speakers: [{ name: "Sean Tangco", slug: "sean-tangco" }],
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
        description:
          "This year’s theme, moʻolelo, challenged me to think differently about storytelling. I realized that the stories shaping our organizations are not just the ones we intentionally tell, they are also the ones we inherit: the explanations, assumptions, and narratives that quietly become “the way things work.”\n\nWe often celebrate storytelling as one of UX’s greatest strengths. Stories help us understand users, align teams, and create clarity. But stories have another quality we talk about far less: they endure.\n\nEvery organization inherits stories about its customers, products, processes, and even itself. They become onboarding materials, product vocabulary, roadmaps, personas, conventions, and shared assumptions. They help organizations move quickly by giving people a shared understanding of the world around them.\n\nYet the longer a story is carried forward, the easier it becomes to mistake continuity for truth.\n\nThroughout my career in enterprise software and nonprofit leadership, the most consequential outcomes of research often had surprisingly little to do with discovering something new about users. Instead, they revealed that inherited narratives no longer matched the people, workflows, or systems organizations were designing for. Whether redefining customer roles, exposing hidden complexity in enterprise onboarding, or revealing how internal language quietly shapes product decisions, the greatest impact came from helping organizations revisit the stories they believed about themselves.\n\nRather than presenting another research methodology or storytelling framework, this talk invites us to reconsider one of our profession’s greatest responsibilities: not simply creating stories that endure, but returning to the stories we’ve inherited with enough humility to ask whether they’re still true.",
        speakers: [{ name: "Fai Visuthicho", slug: "fai-visuthicho" }],
      },
      {
        room: "Purple Box",
        title: "If Mom Says No, Ask Dad",
        description:
          "Ever notice how the same request lands completely differently depending on who’s hearing it? This interactive session explores why, and what to do about it. Starting with a familiar, funny example, we unpack a simple framework: Data, Story, and Relationship, that explains why some people need evidence first, others need context, and others need trust before they’ll say yes.\n\nWe’ll connect this to the DiSC framework to help you read communication styles and preferences in the room, walk through a practical Conversation Planner you can use on your next high-stakes ask, and then put it into practice. Working in small groups with real stakeholder personas, you’ll rank communication approaches and see how quickly the \u201cright\u201d answer changes depending on who you’re talking to. Come away with a tool for planning any conversation where you need buy-in.\n\nParticipants will be able to:\nIdentify the three components, Data, Story, and Relationship, that drive buy-in, and recognize which one a given stakeholder needs first.\nApply a DiSC-informed lens to adapt a message’s tone, pacing, and level of detail to different communication styles.\nUse a Conversation Planner to structure a real, high-stakes ask, from framing evidence and context to addressing concerns and stating a clear next step.",
        speakers: [{ name: "Steph Lum", slug: "steph-lum" }],
      },
    ],
  },
  {
    time: "2:00 pm",
    sessions: [
      {
        room: "Main Room",
        title: "Designers Are Translators",
        description:
          "Great products begin with great conversations. Designers sit at the intersection of end users, business, engineering, research, and AI, translating between people who often speak different languages and hold different assumptions. Through stories, research, and facilitation, designers uncover unmet needs, assess competing hypotheses against reality, and help organizations build a shared understanding before a single screen is designed. This session reframes design as the practice of translating meaning rather than producing interfaces. Before we create products, we help people understand one another.",
        speakers: [{ name: "Nate Lynch", slug: "nate-lynch" }],
      },
      {
        room: "Purple Box",
        title: "Narrative Arc: A Workshop with Anthology FINN Partners",
        description:
          "In Hawaiʻi, moʻolelo is a highly intentional act that shapes how people relate to experiences, systems, and each other. For human-centered designers, storytelling isn’t just fluff. It is a powerful design tool that breathes life into brands and builds meaningful connections with audiences.\n\nLed by April Rutherford (EVP/Executive Creative Director, Anthology FINN Partners), this interactive storytelling workshop will equip attendees with a practical framework for creating a narrative architecture. From extracting core human insights to understanding brand statements, they will actively engage in finding “The Why” in storytelling.\n\nAttendees will leave with actionable storytelling frameworks that change how they look at their life and their work.",
        speakers: [{ name: "Anthology Finn Partners", slug: "anthology" }],
      },
    ],
  },
  {
    time: "3:00 pm",
    sessions: [
      {
        room: "Main Room",
        title: "Reciprocity by Design: Tech as a Public Good",
        description:
          "Designing tech as a public good is vital in Hawaiʻi. Beyond the workforce-pipeline focus (jobs, access, upskilling), we have to ask: who decides what gets built, for whom, and how? This session reframes reciprocity as the foundation of that authority: technology made for Hawaiians must be built in relationship with this place, not just deployed onto it. That means designing alongside a community, where local priorities shape the work as it’s created, not reviewed at the end. Grounded in real projects shaped by that relationship from other parts of the world, the session explores how tech built this way can serve Hawaiʻi’s communities, and carry lessons well beyond them.\n\nThis is for designers and technologists coming to Hawaiʻi from elsewhere. It’s for anyone who wants to know how to build as a guest: how to enter with respect, follow the lead of those who call this place home, and to make something that helps rather than harms.",
        speakers: [{ name: "Hanalei Ramos", slug: "hanalei-ramos" }],
      },
      {
        room: "Purple Box",
        title: "Sharing Your Career Moʻolelo with Piʻikū Co.",
        description:
          "How do you turn a collection of experiences, hobbies, and projects into a cohesive story that feels like you? In this workshop, we invite you to reflect on the experiences and defining moments that have shaped your journey and uncover the threads that connect them. Through guided reflection and small-group activities, you’ll identify the themes that show up across your experiences and turn them into a clear, cohesive story you can feel confident using in interviews, networking events, or with friends and family. This workshop is led by Kim, May, and Michelle from Piʻikū Co., a Hawaiʻi nonprofit dedicated to expanding opportunities in tech for Hawaiʻi’s community.",
        speakers: [{ name: "May Sermonia", slug: "may-sermonia" }, { name: "Kim Davidson", slug: "kim-davidson" }, { name: "Michelle Tran", slug: "michelle-tran" }],
      },
    ],
  },
  {
    time: "4:00 pm",
    sessions: [
      { room: "Main Room", title: "Closing Remarks", inLineup: false, speakers: [{ name: "Kat Duran-Higa", slug: "kat-duran-higa" }, { name: "Jennifer Kumura", slug: "jennifer-kumura" }] },
    ],
  },
];
