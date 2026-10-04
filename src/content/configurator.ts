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
    hint: "Everyone pointing the same way.",
  },
  {
    value: "focus",
    label: "Focus",
    hint: "Fewer interruptions, more deep work.",
  },
  {
    value: "speed",
    label: "Speed",
    hint: "Decisions and launches move faster.",
  },
  {
    value: "transparency",
    label: "Transparency",
    hint: "What's decided, and why, is visible.",
  },
  {
    value: "burnout",
    label: "Burnout",
    hint: "Comms is adding to the load.",
  },
  {
    value: "onboarding",
    label: "Onboarding",
    hint: "New hires ramp without draining a manager.",
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
    if (chosen.includes("alignment")) return "You said alignment is the thing to fix. The all-hands is the single lever that moves it.";
    if (chosen.includes("transparency")) return "Transparency starts in the room where decisions get named. For you, that's the all-hands.";
    return `At ${sizePhrase(picks.size)}, the all-hands sets what everyone else can echo for the week.`;
  }
  if (sectionId === "async-update") {
    if (distributed) return "You're not all in one room. The async update is how work travels without a meeting.";
    if (chosen.includes("speed")) return "You said speed. Written updates compress a 30-minute standup into a two-minute scan.";
    return "Written daily updates give you a paper trail nobody has to chase for.";
  }
  if (sectionId === "newsletter") {
    if (chosen.includes("alignment")) return "You said alignment. A weekly round-up is the quiet backbone that reinforces what the all-hands said.";
    return "A simple weekly round-up catches the people who missed the meeting without needing another one.";
  }
  if (sectionId === "slack-setup") {
    if (chosen.includes("focus")) return "You said focus. Most of what breaks focus happens because channels have no rules.";
    return "Channel discipline is the cheapest thing you can set up now that pays back for every hire after.";
  }
  if (sectionId === "wiki") {
    if (chosen.includes("onboarding")) return "You said onboarding. A real wiki is the only way new hires ramp without draining a manager.";
    if (chosen.includes("transparency")) return "Transparency without a written source of truth is a culture claim, not a practice.";
    if (distributed) return "You're distributed. The wiki is the one place everyone has equal access to.";
    return "Decisions written down outlive the Slack thread they were made in.";
  }
  if (sectionId === "announcements") {
    if (chosen.includes("alignment")) return "You said alignment. Change comms is where alignment survives contact with a decision.";
    if (chosen.includes("transparency")) return "You said transparency. This is the section about how decisions get told, in what order, to whom.";
    return "A written announcement structure means change doesn't leak out through DMs.";
  }
  if (sectionId === "whatsapp") {
    return "You're in India. WhatsApp will be in the stack whether you plan it or not. Better to decide what belongs there.";
  }
  if (sectionId === "meeting-norms") {
    if (chosen.includes("burnout")) return "You said burnout. The calendar is where most of it lives.";
    if (chosen.includes("focus")) return "You said focus. Meeting norms are the single biggest focus multiplier available.";
    return "Written meeting norms are how you stop paying the invisible meeting tax.";
  }
  if (sectionId === "dm-culture") {
    if (chosen.includes("focus")) return "You said focus. DMs are the hidden cost: nobody sees them, so nothing moderates them.";
    if (chosen.includes("transparency")) return "DMs are the inverse of transparency. The guidance here moves work back into the open.";
    return "DMs scale badly. Set the norm before the muscle memory sets in.";
  }
  if (sectionId === "response-time") {
    if (chosen.includes("burnout")) return "You said burnout. Response-time expectations are the single comms decision most tied to it.";
    if (chosen.includes("focus")) return "You said focus. Response-time norms turn every ping into something you can defer.";
    if (distributed) return "You're distributed. Timezones won't fix themselves — a written response policy will.";
    return "Writing your response-time norms down takes an afternoon and saves a year of resentment.";
  }
  if (sectionId === "no-hello") {
    if (chosen.includes("focus")) return "You said focus. The 'hi' message that doesn't say what it wants is the small, free fix.";
    return "A one-line fix that costs nothing and compounds across every message in your workspace.";
  }
  if (sectionId === "feedback-loop") {
    if (chosen.includes("onboarding")) return "You said onboarding. The feedback loop is what tells a new hire whether they're actually settling in.";
    return "Without a feedback loop, you're guessing about how people feel. The guesses are usually wrong.";
  }
  return "This one belongs on your list given your picks.";
}

// A one-line this-week action for each section, used in the summary checklist.
export function thisWeekFor(sectionId: string, picks: Picks): string {
  const map: Record<string, string> = {
    "all-hands": `Lock the next all-hands at a cadence that matches ${sizePhrase(picks.size)}, with a 24-hour-ahead agenda.`,
    "async-update": "Pick one team to pilot a written daily update for two weeks. Keep the format minimal.",
    newsletter: "Draft the first weekly round-up. Three sections. Fifteen minutes to write, two minutes to read.",
    "slack-setup": "Rename your top five channels. Pin a one-line charter in each.",
    wiki: "Create a 'Decisions' page in your wiki. Backfill the last three decisions this week.",
    announcements: "Draft an announcement template with the five sections: what, why, who, when, where to ask.",
    whatsapp: "Decide the one thing WhatsApp is for. Say it out loud at the next all-hands.",
    "meeting-norms": "Audit your calendar for one week. Cancel anything with no agenda and no owner.",
    "dm-culture": "Write the DM norm — one paragraph — and post it in your #general.",
    "response-time": "Publish response-time expectations: same-day, next-day, 24–48 hours. Three sentences, no more.",
    "no-hello": "Add 'no hello' to onboarding and the #general channel description.",
    "feedback-loop": "Run one skip-level this week. Ask: what's on your mind that nobody has heard yet?",
  };
  return map[sectionId] ?? "Open the full section in the guide and pick the first checklist item.";
}
