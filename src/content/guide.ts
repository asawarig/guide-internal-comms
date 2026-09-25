// Every content string for the guide lives here.
// Edit copy in this file without touching layout code.

export const meta = {
  title: "The Plum guide to internal communications",
  tagline: "Best practices for founders and heads of ops at Indian startups of 5 to 150 people.",
  publisher: "Plum",
  authorLabel: "From the Plum content team",
};

export const intro = {
  heading: "Why this guide exists",
  paragraphs: [
    "Plum is a group health insurance and employee benefits broker. We see, up close, what happens when a good benefits programme lands inside a bad comms setup. Employees do not know what they are covered for. Parents are not added because the memo went out on the wrong channel. Preventive check-ups sit unused. The gap is not in the policy. The gap is in how it was told.",
    "Two sourced numbers make the case.",
  ],
  stats: [
    {
      value: "41%",
      body: "of corporate employees said they were fully aware of the specific features and benefits in their company's group medical cover.",
      source: "Tata AIG Corporate Health Protection Pulse 2026. 748 respondents across eight Indian metros.",
    },
    {
      value: "83%",
      body: "of Indian employees were unaware whether their plan covered preventive check-ups. 71% were unsure whether it covered their parents.",
      source: "Onsurity Employee Healthcare and Benefits Study, 2024.",
    },
  ],
  closing: [
    "This is not a benefits problem. It is an internal communications problem. And internal comms in most Indian startups is not designed. It is inherited from whoever set up Slack first, and hardened into culture from there.",
    "This guide is our best attempt to help founders design it on purpose. It is opinionated, staged by team size, and built to be used, not just read.",
  ],
};

export const promise = {
  heading: "Reader promise",
  intro: "A founder or head of ops with 5 to 150 employees finishes this page knowing:",
  items: [
    "What internal comms setup they should have in place today, given their team size.",
    "What to add next as they grow.",
    "Which mistakes to avoid before they harden into culture.",
    "What to copy-paste to get started this week.",
  ],
  outro: "The tone is a friend who has done this before, not a consultant selling a framework.",
};

export type Section = {
  id: string;
  number: string;
  title: string;
  why: string;
  whatGood: string;
  bands: {
    label: string;
    range: string;
    body: string;
  }[];
  mistake: string;
  takeAwayTitle: string;
  takeAwayBody: string | string[];
  editorsNote: string;
  interactiveSlot?: "what-goes-where" | "decision-tree" | "response-policy";
};

export type Part = {
  id: string;
  romanNumeral: string;
  title: string;
  blurb: string;
  sections: Section[];
};

export const parts: Part[] = [
  {
    id: "rituals",
    romanNumeral: "I",
    title: "Rituals",
    blurb: "How the company gathers and updates itself.",
    sections: [
      {
        id: "all-hands",
        number: "1",
        title: "The all-hands",
        why:
          "The all-hands is the loudest signal a company sends about how it makes decisions and who gets to hear about them. Gallup's 2026 report put Indian employee engagement at 23%, a four-year low, and manager engagement in India fell from 39% to 30% in a single year. When managers pass along less, the all-hands has to carry more.",
        whatGood:
          "Cadence matches company size. Every all-hands has a written agenda circulated 24 hours before, and 20 minutes of unrehearsed Q&A. Anyone can add a question in advance and anonymously.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "Weekly, 30 minutes, informal. Founder carries it. Everyone speaks.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "Fortnightly, 45 minutes. Rotating updates from function leads. Written agenda in advance.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "Monthly, 60 minutes. Prepared deck, prepared Q&A, one live and one anonymous. Recording posted the same day.",
          },
        ],
        mistake:
          "Keeping the weekly cadence past 40 people. The format quietly turns from conversation into broadcast, and nobody notices until people stop showing up.",
        takeAwayTitle: "All-hands agenda template",
        takeAwayBody: [
          "Business update — 10 min",
          "Function updates — 15 min",
          "One deep dive — 10 min",
          "Live Q&A — 10 min",
          "Anonymous Q&A — 5 min",
        ],
        editorsNote:
          "Cadence is the least important decision here. What matters is whether people leave with real answers to real questions.",
      },
      {
        id: "newsletter",
        number: "2",
        title: "The internal newsletter",
        why:
          "Most Indian startups do not have one, and the ones that do run it out of HR. It reads like HR. A newsletter is the only piece of the stack that becomes a permanent record of what the company was thinking at each phase. Ten years in, the archive is the truest history of the company.",
        whatGood:
          "Monthly, from the founder or a rotating leadership author, 400 to 600 words. Three fixed sections: what we shipped, what we are watching, one thing on the founder's mind. Sent Friday morning.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "Skip it. The all-hands carries the same load.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "Fortnightly founder note. Personal, short, written the day it goes out.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "Monthly leadership digest. Rotating author. Same three sections every time.",
          },
        ],
        mistake:
          "Making it a corporate roundup nobody reads. If you would not forward it to a friend, employees will not read it either.",
        takeAwayTitle: "Newsletter template",
        takeAwayBody: [
          "Section 1 — What we shipped",
          "Section 2 — What we are watching",
          "Section 3 — One thing on my mind",
          "Prompts for section 3: a decision you almost got wrong, a customer conversation that shifted your thinking, a metric you are watching for the first time, a book or essay reshaping how you work this month, a thing you were embarrassed about a year ago.",
        ],
        editorsNote:
          "The best newsletter I have read from an Indian company was 350 words long and always came in on a Friday. It got forwarded around like gossip.",
      },
      {
        id: "async-update",
        number: "3",
        title: "The async update",
        why:
          "The async update replaces the standing status meeting. Done well, it saves a full afternoon a week per team. Microsoft's 2025 Work Trend Index, based on Microsoft 365 telemetry across 31 markets including India, found employees are interrupted every two minutes during core work hours. The async update is the format that fights back.",
        whatGood:
          "One written update per team per week, in a shared channel or a Notion page, following the same three-part shape: what we shipped, what is next, what we need help with.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "Not required. Conversation is the update.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "Weekly written update from every team lead. Same day, same format.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "Weekly written updates plus a monthly Loom from the leadership team for context that does not fit in text.",
          },
        ],
        mistake:
          "Letting the format drift. Once one team writes bullet points and another writes essays, the practice dies within a quarter.",
        takeAwayTitle: "Async update one-pager",
        takeAwayBody: [
          "What we shipped — up to 5 bullets",
          "What is next — up to 5 bullets",
          "What we need help with — up to 5 bullets",
          "Traffic light for the week: green, amber or red, with one sentence of why.",
        ],
        editorsNote:
          "The rule I would enforce is that if two teams write updates and nobody reads them, the format is broken. Fix the format, not the writers.",
      },
    ],
  },
  {
    id: "tools",
    romanNumeral: "II",
    title: "Tools",
    blurb: "The infrastructure of comms.",
    sections: [
      {
        id: "slack-setup",
        number: "4",
        title: "The Slack (or Teams, or Google Chat) setup",
        why:
          "The Slack setup is the most consequential design decision a company makes about comms, and the one leadership least often owns. It defaults into whatever the first three engineers set up. Most Indian companies actually run on a mix: Slack for tech teams, Google Chat inside Workspace, Teams at the enterprise end, and WhatsApp for everything else. The tool matters less than the discipline.",
        whatGood:
          "A channel taxonomy the whole team knows. #announcements is leadership only with threads off, #team-x runs one per team, #proj-x runs per project and gets archived when the project ends, #random holds everything else. DMs are discouraged for anything a third person could learn from.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "Five channels total. One general, three team, one random. Any more is premature.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "One channel per team, one per active project. Rename #general to #announcements and lock it to leadership. Archive quarterly.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "A named channel taxonomy, written down in the wiki. Someone owns Slack hygiene as part of their role.",
          },
        ],
        mistake:
          "Bolting on new channels without ever archiving old ones. Within 18 months the workspace nobody designed becomes the workspace nobody can defend.",
        takeAwayTitle: "Starter channel list for a 20-person team",
        takeAwayBody: [
          "#announcements — leadership only, threads off",
          "#eng, #product, #design, #sales, #ops — one per team",
          "#proj-<name> — one per active project, archived on close",
          "#help-it, #help-people — request channels routed to an owner",
          "#random — social, memes, non-work",
          "#kudos — visible peer recognition",
        ],
        editorsNote:
          "The best Slack setups I have seen delete more channels than they add each quarter. That is the whole discipline.",
      },
      {
        id: "wiki",
        number: "5",
        title: "The company wiki",
        why:
          "The wiki is the difference between context that compounds and context that leaves when someone quits. Every founder knows they need one. Most underinvest, because the payoff shows up only after the person who wrote it has left.",
        whatGood:
          "A single home for policies, how-to guides, team pages, and decisions. Every new joiner can find the answers to the ten questions they will ask in their first month without asking anyone. Ownership is named on each page.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "A Notion workspace with five pages: how we work, benefits and leave, tools and access, org chart, decision log.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "The same pages, plus one team page per team, updated by the team lead. A weekly reminder to add a new decision to the log.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "Named page owners. A quarterly clean-up ritual. A new-joiner path that walks a hire through the wiki in their first week.",
          },
        ],
        mistake:
          "Letting the Google Docs graveyard grow in parallel. If half the answers are in Notion and half are in someone's Drive, nobody uses either.",
        takeAwayTitle: "Wiki starter structure",
        takeAwayBody: [
          "Five foundation pages: how we work, benefits and leave, tools and access, org chart, decision log.",
          "Ten questions a new joiner will ask: What am I working on this week? Who is my manager? How do I get IT access? Where is my offer letter? What is our leave policy? How do I add a dependent to insurance? Where do I raise an expense? Who owns the tool I need? What is my probation? What are the norms nobody wrote down?",
        ],
        editorsNote:
          "A well-kept Google Docs setup beats a neglected Notion. The tool matters less than whether someone owns it.",
      },
      {
        id: "announcements",
        number: "6",
        title: "The announcement channel",
        why:
          "How you announce something reveals what you think announcements are for. Getting this wrong is how a benefits update lands in a channel nobody reads, and 83% of employees end up unaware whether their plan covers preventive check-ups (Onsurity, 2024). Matching the weight of the news to the medium is the single highest-leverage change in this guide.",
        whatGood:
          "Small changes go in the wiki. Medium changes go in a Slack #announcements channel. Big changes go at the all-hands. Hard changes such as layoffs, restructures, or exits at the top happen in person or on a live call, never over Slack or email.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "One #announcements channel, leadership only, threads off. Everything else in the all-hands.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "Add a monthly HR digest to the wiki for policy and benefits updates. Cross-post the headline in Slack with a link.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "A named comms owner. Every announcement of any weight has one channel and one messenger, decided before it goes out.",
          },
        ],
        mistake:
          "Announcing a layoff by email, or burying a policy change deep in the all-hands. Either one costs trust for years.",
        takeAwayTitle: "What goes where",
        takeAwayBody:
          "The interactive grid in this section is the copy-paste version. Print or screenshot the result of your matches for your wiki.",
        editorsNote:
          "The benefits update is the thing your team is most likely to miss. Please, for the love of your renewal, put it somewhere people will actually see it.",
        interactiveSlot: "what-goes-where",
      },
      {
        id: "whatsapp",
        number: "7",
        title: "WhatsApp and the shadow comms layer",
        why:
          "WhatsApp is the shadow comms layer at almost every Indian company. It is the default for founders, field teams, factory floors, and anyone who checks personal phones more than laptops. It is also the layer with zero governance. When an employee leaves, they walk out with every group chat still on their phone.",
        whatGood:
          "WhatsApp is used for two things and two things only: urgent operational pings, and social. Everything else lives in Slack or the wiki. Every WhatsApp group has a named admin who removes ex-employees the day they leave.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "One WhatsApp group for social, one for operational urgencies. No policy discussion, ever.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "Written rules on what belongs on WhatsApp and what does not, pinned in each group. A monthly member cleanup.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "A shift to Slack or Teams for all operational comms. WhatsApp reserved for genuine emergencies and social.",
          },
        ],
        mistake:
          "Making salary or performance decisions inside a WhatsApp DM. There is no record, no audit trail, and no way to remove access when the person leaves.",
        takeAwayTitle: "WhatsApp policy",
        takeAwayBody: [
          "What it is for: urgent operational pings and social.",
          "What it is not for: policy discussion, performance feedback, salary, offers, terminations, anything a third person should see.",
          "Every group has a named admin.",
          "Ex-employees are removed on their last working day.",
          "If a decision happens on WhatsApp, it is repeated in Slack or the wiki within 24 hours.",
        ],
        editorsNote:
          "If a message about someone's salary is on a founder's personal WhatsApp, the company has a governance problem, not a WhatsApp problem.",
      },
    ],
  },
  {
    id: "norms",
    romanNumeral: "III",
    title: "Norms",
    blurb: "The unwritten rules that shape everything else.",
    sections: [
      {
        id: "meeting-norms",
        number: "8",
        title: "Meeting norms",
        why:
          "Meeting norms are the invisible rules of how a company runs its time. Microsoft's telemetry found meetings starting after 8 pm are up 16% year over year (Work Trend Index 2025, 31 markets including India). Most Indian startups have never written meeting norms down. The best ones do, and revisit them every six months.",
        whatGood:
          "A shared document that answers: when is video on by default, when are cameras optional, what counts as a no-meeting block, what needs an agenda, and what does not. Reviewed twice a year.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "Two norms are enough. No meeting without a written agenda. Cameras optional.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "Add a protected block: one afternoon a week with no internal meetings. Enforce it from the top.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "A full meeting charter in the wiki. One no-meeting day a week. A quarterly meeting audit that deletes recurring meetings nobody defends.",
          },
        ],
        mistake:
          "Meetings that exist because they are on the calendar. If nobody can say what a recurring meeting is for, it should not survive the next audit.",
        takeAwayTitle: "Meeting audit checklist",
        takeAwayBody: [
          "What decision does this meeting produce?",
          "Who owns that decision?",
          "Could this be an async update instead?",
          "Has anyone read the agenda before joining in the last three sessions?",
          "If we cancelled it tomorrow, who would object and why?",
          "Cancel script: 'We are retiring this recurring meeting on [date]. If you rely on it, reply here with what you use it for and we will find a lighter replacement.'",
        ],
        editorsNote:
          "The exercise of writing meeting norms down is more useful than the norms themselves. It forces a conversation the company was avoiding.",
        interactiveSlot: "decision-tree",
      },
      {
        id: "dm-culture",
        number: "9",
        title: "DM culture",
        why:
          "Whether a workplace conversation happens in a public channel or a private DM is a cultural decision, not a personal one. A DM-heavy culture creates silos, gossip, and the political dynamics that come with them. A public-by-default culture creates transparency and, if unchecked, performance anxiety.",
        whatGood:
          "A written rule of thumb. DMs for sensitive, personal, or one-to-one matters. Threads for team work. Channels for anything a third person could learn from. Not no DMs ever, but here is when a channel is better.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "The founder models it. If the founder uses DMs for everything, so will everyone else.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "A one-page written policy. Discussed at an all-hands, then pinned in the wiki.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "The same policy, plus onboarding for new joiners on the threading discipline.",
          },
        ],
        mistake:
          "Salary conversations, performance feedback, and interpersonal conflict all get resolved in DMs. This is fine until it is not. The absence of a record is felt sharpest when a dispute needs one.",
        takeAwayTitle: "DM etiquette one-pager",
        takeAwayBody: [
          "Right for a DM: sensitive feedback, one-to-one scheduling, personal matters, anything you would say behind a closed door.",
          "Right for a thread: a team question with a defined audience, a decision that needs a small group's input, a status update on a project.",
          "Right for a channel: anything a third person could learn from, a decision with cross-team impact, kudos, requests for help you do not know the owner of.",
        ],
        editorsNote:
          "The DM-heavy companies I have worked at all had the same problem. Leadership found out about things last.",
      },
      {
        id: "response-time",
        number: "10",
        title: "Response time etiquette",
        why:
          "Response time expectations are the least-discussed comms decision and the most consequential for burnout, focus, and trust. An Indeed survey of 500 Indian employees and 500 employers found that 88% of Indian employees are frequently contacted by employers outside work hours, and 79% worry about missed promotions or reputational damage if they tune out. The Right to Disconnect Bill 2025, tabled in the Lok Sabha in December 2025, would make it illegal for employers to demand responses outside official hours.",
        whatGood:
          "Written response-time norms, agreed at a team level. Same-day for critical, next-day for the rest, 24 to 48 hours for anything async. An escalation path for genuinely urgent items that does not run through Slack.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "Two norms. Same-day for @mentions, next-day for everything else. Nothing expected after 7 pm.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "Written policy, one page, in the wiki. A quiet-hours window nobody messages inside without an apologies-for-the-hour note.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "The full policy, plus no-response-needed markers on messages that do not need action. Onboarding covers this in week one.",
          },
        ],
        mistake:
          "Founders who message at midnight and then say 'no rush.' The team hears the timestamp, not the disclaimer.",
        takeAwayTitle: "Reset-the-expectation note",
        takeAwayBody:
          "'I have been messaging late and want to reset. From next week, anything I send after 7 pm can wait until the next working morning. If it is genuinely urgent I will call. I want to hold myself to this. Please push back if I slip.'",
        editorsNote:
          "The single highest-leverage ten minutes at your next all-hands is spent writing down what response times you actually expect.",
        interactiveSlot: "response-policy",
      },
      {
        id: "no-hello",
        number: "11",
        title: "The 'no hello' rule",
        why:
          "The single most-shared internal comms rule on the internet, and one of the easiest to adopt. 'Hi, are you there?' then waiting for a reply before saying what you need wastes both people's time. The sender gets one context switch. The receiver gets two: once to answer the hello, once to answer the actual question. There is a whole website (nohello.net) dedicated to this rule, and every remote-first company eventually adopts a version of it.",
        whatGood:
          "One message that says who you are (if needed), what you want, and by when you need it. If the answer is long, offer to jump on a call. Never send 'hi' and stop.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "Founder mentions it once at an all-hands. Sets the tone.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "Add it to the DM etiquette one-pager. Show two examples of a good and a bad ping.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "Include it in onboarding. Managers model it in the first week.",
          },
        ],
        mistake:
          "Sending 'Hi, quick question?' on a Friday at 6 pm and going offline. The receiver spends the weekend guessing what the question was.",
        takeAwayTitle: "Before and after",
        takeAwayBody: [
          "Bad: 'Hey Priya, you there?'",
          "Good: 'Hey Priya, need your sign-off on the vendor invoice by tomorrow EOD. Draft is in this thread. Call if easier.'",
        ],
        editorsNote:
          "The teams that adopt this rule get a small productivity dividend and a large mood dividend. Nobody misses the 'hello, are you there?' ping.",
      },
      {
        id: "feedback-loop",
        number: "12",
        title: "The feedback loop",
        why:
          "How feedback flows through a company is the deepest layer of its internal comms, and the one most Indian startups leave undesigned. A well-run feedback loop compounds over time. A performative one destroys trust faster than the absence of one.",
        whatGood:
          "At least two channels. A quarterly anonymous engagement survey with results shared back within two weeks. Skip-level 1:1s at least twice a year. Leadership acts visibly on at least one thing per cycle, so the loop feels real.",
        bands: [
          {
            label: "Under 15",
            range: "5 to 15 people",
            body: "A monthly 'one thing we should change' question at the all-hands. Founder acts on one item every cycle.",
          },
          {
            label: "15 to 50",
            range: "The messy middle",
            body: "Quarterly anonymous survey. Officevibe, Culture Amp, or a Google Form works. Results shared in two weeks. One visible action per cycle.",
          },
          {
            label: "50 to 150",
            range: "Series A onwards",
            body: "Add skip-level 1:1s twice a year. A public Q&A channel where leadership answers within a week.",
          },
        ],
        mistake:
          "Running the survey, sitting on the results, and running the next one three months later. This is how surveys become theatre and how trust erodes.",
        takeAwayTitle: "Four-week feedback loop",
        takeAwayBody: [
          "Week 1 — Run the survey.",
          "Week 2 — Analyse the results.",
          "Week 3 — Share the findings back with the team, unedited.",
          "Week 4 — Commit publicly to one action, with a named owner and a date.",
        ],
        editorsNote:
          "The feedback loop is where you learn what your team actually thinks. The version that works is the one you act on.",
      },
    ],
  },
];

// Take-away pack, listed at the bottom of the page.
export const takeAways = [
  { section: "1", title: "All-hands agenda template" },
  { section: "2", title: "Newsletter template with three fixed sections and five prompts" },
  { section: "3", title: "Async update one-pager" },
  { section: "4", title: "Starter Slack channel list for a 20-person team" },
  { section: "5", title: "Wiki starter structure with the five foundation pages" },
  { section: "6", title: "What goes where announcement grid" },
  { section: "7", title: "WhatsApp policy one-pager" },
  { section: "8", title: "Meeting audit checklist" },
  { section: "9", title: "DM etiquette one-pager" },
  { section: "10", title: "Response-time policy (from the interactive builder)" },
  { section: "11", title: "No-hello before-and-after card" },
  { section: "12", title: "Four-week feedback loop template" },
];

export const sources = [
  {
    label: "Tata AIG Corporate Health Protection Pulse 2026",
    detail:
      "41% of corporate employees fully aware of the features and benefits in their group medical cover. 748 respondents aged 28 to 55 across Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Ahmedabad, Pune and Kolkata. Published August 2026.",
  },
  {
    label: "Onsurity Employee Healthcare and Benefits Study",
    detail:
      "83% of Indian employees unaware whether their plan covered preventive check-ups. 71% unsure whether it covered their parents. Published 2024.",
  },
  {
    label: "Gallup State of the Global Workplace 2026",
    detail:
      "India employee engagement fell to 23% in 2025, a four-year low. India manager engagement fell from 39% in 2024 to 30% in 2025.",
  },
  {
    label: "Microsoft Work Trend Index 2025",
    detail:
      "Employees interrupted every two minutes during core work hours (up to 275 times a day). Meetings starting after 8 pm up 16% year over year. Microsoft 365 telemetry plus 31,000-respondent survey across 31 markets including India. Published April 2025.",
  },
  {
    label: "Indeed India Right to Disconnect Survey",
    detail:
      "88% of Indian employees frequently contacted by employers outside work hours. 79% worry about missed promotions or reputational damage if they tune out. 500 employees and 500 employers, July to September 2024.",
  },
  {
    label: "Right to Disconnect Bill 2025",
    detail:
      "Private member's bill tabled in the Lok Sabha by Supriya Sule (NCP-SP) on 5 December 2025 during the Winter Session. Proposes fines of 1% of the total wage bill for companies that violate.",
  },
];

// Data for the four interactive elements.

export const headcountBands = [
  {
    size: 5,
    label: "5 people",
    band: "under-15",
    now: "You are close enough that a Slack DM reaches everyone. Focus on rituals: a weekly informal all-hands and two WhatsApp groups (social, urgencies).",
    next: "The moment you hire your sixth person you should already have a wiki with five pages and one #announcements channel.",
  },
  {
    size: 15,
    label: "15 people",
    band: "under-15",
    now: "The messy middle is about to start. Lock #announcements to leadership. Write down response-time norms. Start a fortnightly founder note.",
    next: "By 25, weekly written team updates. By 30, a meeting audit.",
  },
  {
    size: 30,
    label: "30 people",
    band: "15-50",
    now: "Weekly written updates from every team lead. A one-page DM etiquette policy. A quarterly anonymous engagement survey with results back inside two weeks.",
    next: "Somebody needs to own Slack hygiene before you hit 50 channels.",
  },
  {
    size: 50,
    label: "50 people",
    band: "15-50",
    now: "The all-hands moves from fortnightly to monthly. A named comms owner. A meeting charter. A no-meeting day a week enforced from the top.",
    next: "Skip-level 1:1s twice a year. A new-joiner wiki path in week one.",
  },
  {
    size: 100,
    label: "100 people",
    band: "50-150",
    now: "A recorded monthly all-hands with a prepared deck, live and anonymous Q&A, and a same-day recording. Monthly leadership digest with a rotating author.",
    next: "A public Q&A channel where leadership answers within a week.",
  },
  {
    size: 150,
    label: "150 people",
    band: "50-150",
    now: "Everything above, plus a quarterly meeting audit that deletes what nobody defends. A written meeting charter reviewed twice a year.",
    next: "Above 150 you are past the scope of this guide. The rituals hold; the tooling gets heavier.",
  },
];

export const wgwItems = [
  { id: "new-hire", label: "A new hire joining next week", answer: "slack", reason: "A #announcements post welcomes them without pulling anyone off work." },
  { id: "benefits-update", label: "An update to the health insurance plan", answer: "all-hands", reason: "Big enough that people need to hear it live and get a chance to ask questions. Follow with a wiki page." },
  { id: "policy-change", label: "A change to the leave policy", answer: "wiki", reason: "The wiki is the record. Cross-post the headline in Slack with a link." },
  { id: "small-win", label: "A small team win", answer: "slack", reason: "#kudos or the team channel. Do not save it for the all-hands." },
  { id: "target-miss", label: "A mid-quarter target miss", answer: "all-hands", reason: "Own it in person. Silence on a miss reads as either denial or bad news held back." },
  { id: "layoff", label: "A layoff", answer: "in-person", reason: "Never over Slack or email. In person or a live call, with a written follow-up for the record." },
  { id: "office-move", label: "An office move", answer: "slack", reason: "Logistical, cross-team, needs a searchable record but not a live conversation." },
  { id: "comp-band", label: "A new compensation band", answer: "all-hands", reason: "Explain the thinking live, then land the detail in the wiki." },
  { id: "wiki-update", label: "A wiki update", answer: "wiki", reason: "Update the page. If it needs a broadcast, it was not a wiki update." },
];

export const wgwChannels = [
  { id: "all-hands", label: "All-hands" },
  { id: "slack", label: "Slack post" },
  { id: "wiki", label: "Wiki" },
  { id: "in-person", label: "In person" },
];

export const decisionTree = {
  intro: "Slack, email, or meeting? Answer three questions.",
  questions: [
    {
      id: "q1",
      prompt: "Does this need a decision in the next 24 hours?",
      options: [
        { label: "Yes", next: "q2" },
        { label: "No", next: "async" },
      ],
    },
    {
      id: "q2",
      prompt: "Would a back-and-forth of more than three messages be needed?",
      options: [
        { label: "Yes", next: "meeting" },
        { label: "No", next: "slack" },
      ],
    },
  ],
  outcomes: {
    async: {
      recommendation: "Send an email or a wiki page.",
      body: "It is not urgent and it needs a record. Async wins.",
    },
    slack: {
      recommendation: "Send a Slack message.",
      body: "One clear message, one question, and by when you need the answer. If it turns into a thread of six, move it to a call.",
    },
    meeting: {
      recommendation: "Book a short call.",
      body: "Thirty minutes with an agenda and a named decision-maker. Post the decision in the relevant channel afterwards.",
    },
  },
};

export const responseBuilder = {
  intro: "Set the four values and copy the policy into your wiki or #announcements.",
  fields: [
    {
      id: "default",
      label: "Default expected response time",
      options: ["same day", "next working day", "within 24 hours", "within 48 hours"],
      default: "next working day",
    },
    {
      id: "hours",
      label: "Hours that count as on",
      options: ["9 am to 6 pm", "10 am to 7 pm", "flexible, any 8 hours", "team-defined"],
      default: "10 am to 7 pm",
    },
    {
      id: "urgent",
      label: "What counts as urgent",
      options: [
        "a customer outage",
        "a production issue",
        "anything a founder marks urgent",
        "only a phone call",
      ],
      default: "a customer outage",
    },
    {
      id: "override",
      label: "Who can override quiet hours",
      options: ["nobody", "on-call engineers", "leadership only", "anyone with a written reason"],
      default: "on-call engineers",
    },
  ],
};
