// Configurator: picks → playbook mapping.
// Takes a reader's situation and returns an ordered list of the sections
// that matter most for them, plus intro / rationale copy.

import type { Section, Part } from "./guide";

export type Stage = "idea" | "seed" | "seriesA" | "seriesB";
export type Size = "under15" | "15to50" | "50to150" | "150plus";
export type WorkMode = "office" | "hybrid" | "remote";
export type Geography = "india" | "indiaPlus" | "global";
export type Priority =
  | "alignment"
  | "focus"
  | "speed"
  | "transparency"
  | "burnout"
  | "onboarding";

export type Picks = {
  stage: Stage;
  size: Size;
  workMode: WorkMode;
  geography: Geography;
  priorities: Priority[];
};

export const STAGE_OPTIONS: { value: Stage; label: string }[] = [
  { value: "idea", label: "Idea / pre-seed" },
  { value: "seed", label: "Seed" },
  { value: "seriesA", label: "Series A" },
  { value: "seriesB", label: "Series B and beyond" },
];

export const SIZE_OPTIONS: { value: Size; label: string }[] = [
  { value: "under15", label: "Under 15" },
  { value: "15to50", label: "15 to 50" },
  { value: "50to150", label: "50 to 150" },
  { value: "150plus", label: "150+" },
];

export const MODE_OPTIONS: { value: WorkMode; label: string }[] = [
  { value: "office", label: "All in office" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Fully remote" },
];

export const GEO_OPTIONS: { value: Geography; label: string }[] = [
  { value: "india", label: "All in India, one or two cities" },
  { value: "indiaPlus", label: "India + a few international hires" },
  { value: "global", label: "Multi-timezone, global" },
];

export const PRIORITY_OPTIONS: { value: Priority; label: string; hint: string }[] = [
  {
    value: "alignment",
    label: "Alignment",
    hint: "Everyone's pointing the same way.",
  },
  {
    value: "focus",
    label: "Focus",
    hint: "Fewer interruptions; more deep work.",
  },
  {
    value: "speed",
    label: "Speed",
    hint: "Decisions and launches move faster.",
  },
  {
    value: "transparency",
    label: "Transparency",
    hint: "What's decided, and why, is visible to the people living with it.",
  },
  {
    value: "burnout",
    label: "Burnout",
    hint: "Comms is adding to the load, not relieving it.",
  },
  {
    value: "onboarding",
    label: "Onboarding",
    hint: "New hires can ramp without draining a manager.",
  },
];

// Each section's three bands are ordered: under 15 / 15–50 / 50+.
// Map a size pick to the matching band index.
const SIZE_TO_BAND: Record<Size, 0 | 1 | 2> = {
  under15: 0,
  "15to50": 1,
  "50to150": 2,
  "150plus": 2,
};

export function bandIndexFor(size: Size): 0 | 1 | 2 {
  return SIZE_TO_BAND[size];
}

// Priority → the section ids that most directly address it.
const PRIORITY_EMPHASIS: Record<Priority, string[]> = {
  alignment: ["all-hands", "announcements", "newsletter"],
  focus: ["response-time", "dm-culture", "slack-setup", "no-hello"],
  speed: ["async-update", "meeting-norms", "slack-setup"],
  transparency: ["wiki", "announcements", "all-hands"],
  burnout: ["response-time", "meeting-norms", "async-update"],
  onboarding: ["wiki", "all-hands", "feedback-loop"],
};

// Section ids that get a boost when work is distributed or multi-timezone.
const DISTRIBUTED_BOOST = ["async-update", "response-time", "wiki", "no-hello"];

// Section ids that get a boost at larger sizes.
const LARGE_BOOST = ["feedback-loop", "meeting-norms", "newsletter", "announcements"];

// Section ids that get a boost at smaller sizes (where the right habits
// cost nothing to start now).
const SMALL_BOOST = ["slack-setup", "no-hello", "whatsapp"];

export function rankSections(parts: Part[], picks: Picks): Section[] {
  const allSections = parts.flatMap((p) => p.sections);
  const score = new Map<string, number>();

  for (const s of allSections) {
    score.set(s.id, 1);
  }

  for (const p of picks.priorities) {
    for (const id of PRIORITY_EMPHASIS[p]) {
      score.set(id, (score.get(id) ?? 0) + 4);
    }
  }

  if (picks.workMode !== "office" || picks.geography !== "india") {
    for (const id of DISTRIBUTED_BOOST) {
      score.set(id, (score.get(id) ?? 0) + 2);
    }
  }

  if (picks.geography === "global") {
    for (const id of ["async-update", "response-time", "wiki"]) {
      score.set(id, (score.get(id) ?? 0) + 2);
    }
  }

  if (picks.size === "under15") {
    for (const id of SMALL_BOOST) {
      score.set(id, (score.get(id) ?? 0) + 1);
    }
  }

  if (picks.size === "50to150" || picks.size === "150plus") {
    for (const id of LARGE_BOOST) {
      score.set(id, (score.get(id) ?? 0) + 2);
    }
  }

  const sortedIds = [...score.entries()]
    .sort((a, b) => b[1] - a[1])
    .map((e) => e[0]);

  const topN = picks.size === "under15" ? 5 : 7;
  const topIds = new Set(sortedIds.slice(0, topN));

  return allSections.filter((s) => topIds.has(s.id)).sort(
    (a, b) => (sortedIds.indexOf(a.id)) - (sortedIds.indexOf(b.id))
  );
}

// Short descriptors used in the generated standfirst.
export function sizePhrase(size: Size): string {
  return {
    under15: "under 15 people",
    "15to50": "15 to 50 people",
    "50to150": "50 to 150 people",
    "150plus": "150+ people",
  }[size];
}

export function modePhrase(mode: WorkMode): string {
  return { office: "in-office", hybrid: "hybrid", remote: "fully remote" }[mode];
}

export function geoPhrase(geo: Geography): string {
  return {
    india: "India-first",
    indiaPlus: "India plus a few international hires",
    global: "multi-timezone",
  }[geo];
}

export function stagePhrase(stage: Stage): string {
  return {
    idea: "pre-seed",
    seed: "seed-stage",
    seriesA: "Series A",
    seriesB: "Series B+",
  }[stage];
}

// One-line "why this is top of your list" rationale, tailored to picks.
export function rationaleFor(sectionId: string, picks: Picks): string {
  const chosen = picks.priorities;
  const distributed =
    picks.workMode !== "office" || picks.geography !== "india";

  if (sectionId === "all-hands") {
    if (chosen.includes("alignment"))
      return "If alignment is what you're trying to put right, the all-hands is the lever that moves it furthest, because it's the one meeting where everyone's in the room at the same time hearing the same thing from the same person.";
    if (chosen.includes("transparency"))
      return "Transparency starts in the room where decisions get named out loud, and for a company your size that room is the all-hands, which is why it's the first thing to get right.";
    return `At ${sizePhrase(picks.size)}, the all-hands is where the week's narrative gets set, and everything else (the Slack posts, the manager one-to-ones, the hallway chats) ends up echoing it, so it's worth over-investing in.`;
  }

  if (sectionId === "async-update") {
    if (distributed)
      return "You're not all sitting in one room, which means half the context travels in meetings nobody wants to double-book, so the written daily update is how work actually gets passed around the company.";
    if (chosen.includes("speed"))
      return "If speed is the thing you're after, a two-minute written update is the cheapest trade you can make: thirty minutes of standup disappear from everyone's calendar, and the record sticks around.";
    return "A written daily update gives you the paper trail nobody has to go hunting for, and it costs each team member five minutes to produce.";
  }

  if (sectionId === "newsletter") {
    if (chosen.includes("alignment"))
      return "A weekly round-up is the backbone that lets the all-hands land a second time, catching the people who missed the meeting and the ones who caught it but have slept since.";
    return "A simple weekly round-up catches the people who missed the meeting and reminds the ones who didn't, and it does so without asking anyone to put another thing on the calendar.";
  }

  if (sectionId === "slack-setup") {
    if (chosen.includes("focus"))
      return "If focus is the thing you're trying to protect, the first place to look is Slack, because almost everything that breaks focus is a channel with no agreed purpose and a notification setting nobody has thought about.";
    return "Channel discipline is the cheapest fix available to you now, and it pays itself back for every hire you make after without anyone noticing.";
  }

  if (sectionId === "wiki") {
    if (chosen.includes("onboarding"))
      return "If onboarding keeps draining a senior manager, it's because the thing a new hire needs to read on day one doesn't exist, and the wiki is where that thing lives.";
    if (chosen.includes("transparency"))
      return "A company that claims transparency without a written source of truth isn't being transparent so much as unusually fond of DMs, which is why the wiki section is top of your list.";
    if (distributed)
      return "Distributed teams can only be as aligned as their shared written record, which makes the wiki less of a nice-to-have and more of the thing that holds the company together.";
    return "Decisions written down outlive the Slack thread they were made in, which is useful six months later when nobody can remember why you picked Notion over Confluence.";
  }

  if (sectionId === "announcements") {
    if (chosen.includes("alignment"))
      return "Change comms is the place alignment goes to die if you let it, so having a written template for how a decision gets told, in what order, and to whom is the single biggest alignment fix available.";
    if (chosen.includes("transparency"))
      return "This is the section about how a decision travels from the room it was made in to the people it affects, which is to say, the mechanics of actually being transparent rather than just saying you are.";
    return "A written template for how change gets announced is what stops decisions from leaking out through DMs, slack threads and three different versions of the story.";
  }

  if (sectionId === "whatsapp") {
    return "WhatsApp is going to end up in your comms stack whether you plan for it or not, so the useful thing is to decide now what belongs there and what belongs elsewhere, before the muscle memory sets in.";
  }

  if (sectionId === "meeting-norms") {
    if (chosen.includes("burnout"))
      return "If burnout is the thing you're worried about, start with the calendar: most of it lives there, and most of what lives there could be a doc, a Loom or a decision somebody already had the authority to make.";
    if (chosen.includes("focus"))
      return "Meeting norms are the single biggest focus multiplier available to you, because every hour you give back to the team is an hour that doesn't have to be won back from an interruption later.";
    return "Written meeting norms are the only way to stop paying the invisible meeting tax, which is the one your calendar never itemises for you.";
  }

  if (sectionId === "dm-culture") {
    if (chosen.includes("focus"))
      return "DMs are the hidden tax on focus because nobody can see how many you're sending, which means nobody self-regulates, which means your senior people have 40 conversations open at any given moment.";
    if (chosen.includes("transparency"))
      return "A DM is the inverse of transparency: the moment a conversation moves into one, the work stops being everyone's and starts being two people's, and the rest of the company has to go asking.";
    return "DMs scale badly, so the time to agree a norm is now, before the muscle memory of 'I'll just send you a quick DM' sets in across the whole company.";
  }

  if (sectionId === "response-time") {
    if (chosen.includes("burnout"))
      return "Response-time expectations are the single comms decision most tied to burnout, because every unspoken 'reply by evening' adds up to a workweek that never really ends.";
    if (chosen.includes("focus"))
      return "Written response-time norms turn every ping into something you can defer with a clear conscience, which is the condition deep work actually depends on.";
    if (distributed)
      return "Timezones won't resolve themselves, which is why a written response-time policy is the one piece of comms hygiene distributed teams can't skip.";
    return "Writing your response-time norms down takes an afternoon and saves a year of resentment, and the saving starts the first time somebody doesn't reply to a Saturday-night message.";
  }

  if (sectionId === "no-hello") {
    if (chosen.includes("focus"))
      return "The 'hi' message that doesn't say what it wants is the small, free fix that reads trivial on paper and compounds into something meaningful across a few hundred messages a week.";
    return "This is the one-line fix that costs you nothing to put in place and compounds across every message in the workspace, in the way small norms always do when nobody has to think about them.";
  }

  if (sectionId === "feedback-loop") {
    if (chosen.includes("onboarding"))
      return "Without a feedback loop, a new hire can look perfectly fine from the outside for six weeks and still be drowning on the inside without ever saying so, which is how good people leave early and nobody saw it coming.";
    return "Without a feedback loop you're guessing at how the team feels, and the guesses are usually wrong in the direction most convenient to the person making them.";
  }

  return "This one belongs on your list given your picks, and the full section goes into why in some depth.";
}

// A one-line this-week action for each section, used in the summary checklist.
export function thisWeekFor(sectionId: string, picks: Picks): string {
  const map: Record<string, string> = {
    "all-hands": `Put the next all-hands on the calendar at a cadence that matches ${sizePhrase(picks.size)}, and send the agenda 24 hours ahead so people turn up having actually read it.`,
    "async-update": "Pick one team to pilot a written daily update for a fortnight, keep the format to three lines, and let the paper trail do the talking.",
    newsletter: "Write the first weekly round-up at the end of the week: three sections, fifteen minutes to draft, two minutes to read, and nothing nobody asked for.",
    "slack-setup": "Rename your five busiest channels so a new joiner can tell what each one is for, and pin a one-line charter at the top of each.",
    wiki: "Create a 'Decisions' page in the wiki and backfill the last three decisions you made this quarter, with a date and the name of the person who made the call.",
    announcements: "Draft an announcement template that covers the five sections every announcement should answer: what's changing, why now, who's affected, when it happens, and where to put the questions.",
    whatsapp: "Decide the one thing WhatsApp is actually for in your company, write it down somewhere people will see it, and say it out loud at the next all-hands.",
    "meeting-norms": "Audit one week of your calendar end to end, and cancel anything that doesn't have a written agenda, a named owner, and a decision it's trying to reach.",
    "dm-culture": "Write the DM norm as a single paragraph (what belongs in a DM, what doesn't) and post it in your #general so the whole company can see it was said once.",
    "response-time": "Publish three sentences on response-time expectations (same-day for critical, next-day for the rest, 24 to 48 hours for anything async), and then stop pinging people on Saturdays.",
    "no-hello": "Add the 'no hello' rule to the onboarding doc and to the description on your #general channel, and let it do its work.",
    "feedback-loop": "Run one skip-level this week with the question 'what's on your mind that nobody above you has heard yet', and resist the urge to defend anything you hear.",
  };
  return map[sectionId] ?? "Open the full section in the guide and work the first checklist item on the page.";
}
