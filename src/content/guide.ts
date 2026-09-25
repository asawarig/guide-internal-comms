// Every content string for the guide lives here.
// Edit copy in this file without touching layout code.

export const meta = {
  title: "The Plum guide to internal communications",
  tagline: "Best practices for founders and heads of ops at Indian startups of 5 to 150 people.",
  publisher: "Plum",
  authorLabel: "From the Plum content team",
  toolkitFileName: "plum-internal-comms-toolkit.docx",
};

export const intro = {
  heading: "Why this guide exists",
  paragraphs: [
    "Internal comms in most Indian startups is not designed. It is inherited from whoever set up Slack first, and it hardens into culture from there. The channel structure, the meeting cadence, the response-time expectations were not chosen on purpose. All of it still shapes how the company runs.",
    "The cost of getting this wrong is not always visible from the founder's chair. Employees miss things they should have seen. Decisions get made in DMs and never surface. The founder ends up as the human router, forwarding messages between teams that should be talking to each other directly. By the time it starts to hurt, it has been that way for a year.",
    "This guide is an opinionated attempt to help founders design their internal comms on purpose. It is staged by team size and backed with sourced numbers where they help. Use it as a working reference: pick your team size, start with the sections you have not yet thought about, and copy the templates at the end of each one.",
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

// A block inside a section's take-away. Renders as a subheading with either
// a paragraph, a checklist, or both. Multiple blocks per section let each
// take-away read as a full playbook: setup, template, scripts, rollout.
export type TakeAwayBlock = {
  subheading: string;
  intro?: string;
  items?: string[];
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
  takeAwayBlocks: TakeAwayBlock[];
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
          "The all-hands is the loudest signal a company sends about how it makes decisions and who gets to hear about them. Gallup's 2026 report put Indian employee engagement at 23%, a four-year low, and manager engagement in India fell from 39% to 30% in a single year. When managers pass along less of the strategy sideways, the all-hands has to carry more of it directly. The founder who treats it as a status update is missing the room's real question: is this still a place I want to work in a year.",
        whatGood:
          "Cadence matches company size. Every all-hands has a written agenda circulated 24 hours before, and 20 minutes of unrehearsed Q&A. Anyone can add a question in advance and anonymously. The meeting ends with three things the audience can quote back: one number, one decision, one thing that is changing. The recording, when there is one, is posted the same day.",
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
        takeAwayTitle: "The all-hands playbook",
        takeAwayBlocks: [
          {
            subheading: "Prep checklist (T minus 48 hours)",
            items: [
              "Draft the agenda in the shared doc. Time-box every item.",
              "Open the anonymous Q&A form. Post the link in #announcements.",
              "Pull the three numbers you will show. Verify them with the owner.",
              "Send the agenda to all speakers 24 hours before. Ask them to trim.",
              "Test the recording setup. Confirm captions work in English.",
              "Send a calendar reminder with the agenda pasted in the invite body.",
            ],
          },
          {
            subheading: "Agenda template with time boxes",
            items: [
              "Business update — 10 minutes. One slide with the top three numbers.",
              "Function updates — 15 minutes. Three functions, five minutes each.",
              "One deep dive — 10 minutes. A single decision, project, or shift.",
              "Live Q&A — 10 minutes. Read questions in the order they arrived.",
              "Anonymous Q&A — 5 minutes. Read the top-voted questions verbatim.",
              "Closing frame — 2 minutes. Name the one thing changing this week.",
            ],
          },
          {
            subheading: "Scripts for the hard moments",
            items: [
              "Opening: 'Good morning. Agenda is in the invite. We are ending at [time] on the dot. Anonymous questions go in [link]. First up is [name].'",
              "Deflecting a rambling answer: 'Let me pull that back. What is the decision the team needs to see today?'",
              "Answering a question you do not know: 'I do not know. [Name] will answer in #announcements by end of day tomorrow.'",
              "Answering a hostile question: 'That is a fair thing to ask. Here is what I know. Here is what I do not.'",
              "Closing when the room is quiet: 'One number, one decision, one thing changing. See you next time.'",
            ],
          },
          {
            subheading: "After the meeting (same day)",
            items: [
              "Post the recording in #announcements with a two-sentence summary.",
              "Send owners of any 'I will get back to you' answers a deadline in DM.",
              "Log unanswered anonymous questions in a running doc for next time.",
              "Ask three people whose faces you did not see: what did we miss.",
            ],
          },
        ],
        editorsNote:
          "Cadence is the least important decision here. What matters is whether people leave with real answers to real questions.",
      },
      {
        id: "newsletter",
        number: "2",
        title: "The internal newsletter",
        why:
          "Most Indian startups do not have one, and the ones that do run it out of HR. It reads like HR. A newsletter is the only piece of the stack that becomes a permanent record of what the company was thinking at each phase. Ten years in, the archive is the truest history of the company. The founder who sends it in their own voice, in the first year, will be grateful in year three that they did.",
        whatGood:
          "Monthly, from the founder or a rotating leadership author, 400 to 600 words. Three fixed sections every issue: what we shipped, what we are watching, one thing on the founder's mind. Written the day it goes out, not curated over a week. Sent Friday morning at the same time. Signed by a person, not by 'The Team'.",
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
        takeAwayTitle: "The newsletter playbook",
        takeAwayBlocks: [
          {
            subheading: "The three-section template",
            intro: "Same headings every time. Readers should recognise the shape from the subject line.",
            items: [
              "What we shipped — three to five bullets. Real ships, not activity. Link the artefact where possible.",
              "What we are watching — one paragraph. The metric, market, or customer signal that will decide the next quarter. Say why you are watching it.",
              "One thing on my mind — three short paragraphs. The unscripted section. Personal, current, not a lesson.",
            ],
          },
          {
            subheading: "Ten prompts for the 'one thing on my mind' section",
            items: [
              "A decision I almost got wrong this month, and what changed my mind.",
              "A customer conversation this week that shifted how I see the product.",
              "A metric I am watching for the first time. Why now.",
              "Something I got embarrassed about a year ago that I would do the same way today.",
              "A hire we made recently. What they are quietly changing about how we work.",
              "A thing I keep saying in meetings that I am now starting to believe.",
              "A number that surprised me. What I think it means.",
              "A competitor's move I have been thinking about. What it says about the market.",
              "A book, essay, or memo shaping the way I work this month.",
              "A hard call coming up. How I am thinking about it, without pre-empting the answer.",
            ],
          },
          {
            subheading: "First-issue kick-off template",
            intro: "Send this as issue #1. Sets the shape and the tone for what comes after.",
            items: [
              "Subject: 'Founder note #1: [three-word summary of the month]'",
              "Opening line: 'This is the first of a monthly note from me. It is going to be short, honest, and personal. Reply directly if something lands or does not.'",
              "Three-section body as above.",
              "Sign-off with your name, not the company's. First name is enough.",
            ],
          },
          {
            subheading: "Publishing checklist (Friday morning)",
            items: [
              "Read it aloud once. Cut every sentence you would not say to a friend.",
              "Check every link. Broken links cost the next issue's open rate.",
              "Send from a person's address, not noreply@.",
              "Post the same text in #announcements with the subject line as the message.",
              "Save the sent version in the wiki archive folder. Date the file.",
            ],
          },
        ],
        editorsNote:
          "The best newsletter I have read from an Indian company was 350 words long and always came in on a Friday. It got forwarded around like gossip.",
      },
      {
        id: "async-update",
        number: "3",
        title: "The async update",
        why:
          "The async update replaces the standing status meeting. Done well, it saves a full afternoon a week per team and gives leadership a written record of what is happening without pulling anyone into a room. Microsoft's 2025 Work Trend Index, based on Microsoft 365 telemetry across 31 markets including India, found employees are interrupted every two minutes during core work hours. The async update is the format that fights back. The company that does it well ends up with a searchable history of every team's week; the one that does it badly ends up with a graveyard of unread Notion pages.",
        whatGood:
          "One written update per team per week, in a shared channel or a Notion page, following the same three-part shape: what we shipped, what is next, what we need help with. Posted on the same day every week, by the same time. Read by leadership within 48 hours, with a reaction or a comment on each so the team knows the update landed. No slide decks, no long paragraphs, no dashboards pasted in as screenshots.",
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
        takeAwayTitle: "The async update playbook",
        takeAwayBlocks: [
          {
            subheading: "The one-page template",
            intro: "Three sections. Five bullets each, hard cap. Traffic light on top.",
            items: [
              "Header: Team name · week of · author · traffic light (green, amber, red) with one sentence of why.",
              "Shipped this week — up to five bullets. Past tense. Link each ship.",
              "Next up — up to five bullets. Named owner and the day it is due.",
              "Blocked or need help — up to five bullets. Say what you need and from whom. If empty, write 'nothing this week.'",
              "Footer: one line the team is proud of, or one thing that made the week hard.",
            ],
          },
          {
            subheading: "The traffic light rubric",
            intro: "Take the top of the update seriously. If everyone writes green, the signal is broken.",
            items: [
              "Green — plan is holding, no help needed. Use only when true.",
              "Amber — a specific thing is off track. Name it in one sentence. Leadership should know to pay attention.",
              "Red — the team cannot land the quarter without a decision from someone else. Escalate now, not next week.",
            ],
          },
          {
            subheading: "The publishing ritual",
            items: [
              "Same day every week (Friday afternoon works for most teams; Monday morning works for some).",
              "Same channel or Notion database. Never move it without telling everyone.",
              "Author is the team lead, always. If the lead is out, name a delegate for the week.",
              "Leadership acknowledges each update within 48 hours with an emoji or a comment. Silence kills the practice faster than criticism.",
              "The founder's own team writes one too. Modelling matters more than mandating.",
            ],
          },
          {
            subheading: "Scripts for the awkward parts",
            items: [
              "Writing a red for the first time: 'Red this week. [Specific project] is blocked on [decision]. Cannot land it without [name] confirming by [date]. Happy to jump on a 15-minute call.'",
              "Nudging a team that skipped: 'No update from [team] this week. Anything blocking you writing one? Ping me if the format is not working.'",
              "Killing the format when it stops mattering: 'We are pausing the async update for [team] for a month. If nothing surfaces that we would have missed, we retire it. If something does, we bring it back with a new shape.'",
            ],
          },
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
          "The Slack setup is the most consequential design decision a company makes about comms, and the one leadership least often owns. It defaults into whatever the first three engineers set up. Most Indian companies actually run on a mix: Slack for tech teams, Google Chat inside Workspace, Teams at the enterprise end, and WhatsApp for everything else. The tool matters less than the discipline. The workspace that is designed on purpose in month six is the one that still scales at month sixty; the one that is not, is not.",
        whatGood:
          "A channel taxonomy the whole team knows. #announcements is leadership only with threads off, #team-x runs one per team, #proj-x runs per project and gets archived when the project ends, #random holds everything else. DMs are discouraged for anything a third person could learn from. Every channel has a purpose in its topic, a named owner in its description, and a retention plan. Every quarter, someone whose job includes it archives the channels that stopped moving.",
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
        takeAwayTitle: "The Slack playbook",
        takeAwayBlocks: [
          {
            subheading: "Starter channel list for a 20-person team",
            intro: "Every channel gets a purpose in its topic and an owner in its description. If a channel cannot answer 'what belongs here' in one line, it does not belong.",
            items: [
              "#announcements — leadership-only broadcasts. Threads off. Read-only for everyone else.",
              "#general — everyone's default. Non-urgent, cross-team.",
              "#random — memes, food photos, non-work.",
              "#kudos — visible peer recognition. React-to-boost culture lives here.",
              "#eng, #product, #design, #sales, #ops, #people — one per team. Team lead is the owner.",
              "#proj-<name> — one per active project. Archived within a week of the project closing.",
              "#help-it, #help-people, #help-finance — request channels. Route to a rota, not a person.",
              "#customers — inbound customer signal. Screenshots, quotes, wins, complaints.",
              "#leaks — a private channel for leadership to talk about anything that will one day be an #announcements post but is not yet.",
              "#watercooler-<city> — one per office location, for the in-person crew.",
            ],
          },
          {
            subheading: "Naming conventions",
            items: [
              "All lowercase. Hyphens, not underscores.",
              "Prefix by function: #team-, #proj-, #help-, #watercooler-, #ext- (for shared channels with external partners).",
              "No project acronyms in channel names. Full words age better.",
              "Rename before archiving with a 'zz-' prefix so the archive sorts to the bottom.",
              "One channel, one purpose. If two teams want their own version, they get two channels.",
            ],
          },
          {
            subheading: "Quarterly archive checklist",
            items: [
              "Pull the list of channels sorted by last message.",
              "Every channel with no message in 60 days: ping the owner. Decide keep, rename, or archive.",
              "Archive every channel where the project has shipped and no follow-up is active.",
              "Merge duplicate team channels ('#growth' and '#growth-team' become one).",
              "Post a summary in #announcements: how many archived, how many renamed, what changed.",
              "Update the wiki page listing the current taxonomy.",
            ],
          },
          {
            subheading: "Slack onboarding for a new joiner (first week)",
            items: [
              "Add to #general, #announcements, #random, #kudos, their team channel, their help channels.",
              "Do not auto-add to every channel. Let them join what they need.",
              "Send the new joiner the wiki page for channel taxonomy on day one.",
              "Pair them with a Slack buddy who fields their 'is this the right channel' pings.",
              "In week two, review which channels they muted. That is signal about the taxonomy.",
            ],
          },
        ],
        editorsNote:
          "The best Slack setups I have seen delete more channels than they add each quarter. That is the whole discipline.",
      },
      {
        id: "wiki",
        number: "5",
        title: "The company wiki",
        why:
          "The wiki is the difference between context that compounds and context that leaves when someone quits. Every founder knows they need one. Most underinvest, because the payoff shows up only after the person who wrote it has left. Startups that treat the wiki as the operating system, not the intranet, spend fewer hours a week answering the same questions and lose less institutional memory when someone moves on.",
        whatGood:
          "A single home for policies, how-to guides, team pages, and decisions. Every new joiner can find the answers to the ten questions they will ask in their first month without asking anyone. Ownership is named on each page. The homepage is a directory, not a dashboard. Every page has a last-reviewed date, and there is a person whose job includes reviewing pages when they expire.",
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
        takeAwayTitle: "The wiki playbook",
        takeAwayBlocks: [
          {
            subheading: "Starter structure — five foundation pages",
            intro: "Every page names an owner at the top and a last-reviewed date. Every page is one of these five templates.",
            items: [
              "How we work — mission, values as lived (not aspirational), decision-making style, meeting norms, response-time policy.",
              "Benefits and leave — insurance summary, how to add a dependent, leave types and how to apply, working hours, public holidays.",
              "Tools and access — every tool the company uses, who owns access, how a new joiner requests it, how ex-employees are offboarded.",
              "Org chart — reporting lines, who owns what function, who a new joiner should meet in week one.",
              "Decision log — one row per real decision: date, decision, alternatives considered, owner, expected review date.",
            ],
          },
          {
            subheading: "New-joiner path (week one)",
            intro: "The week-one path is a single wiki page that links out to everything. It replaces the 'ask around' first week.",
            items: [
              "Day one: read 'How we work' end to end. Set up tools per the tools page.",
              "Day two: meet three people from the org chart. Post an intro in #general.",
              "Day three: shadow one customer call or one internal review meeting.",
              "Day four: read the last three months of the decision log.",
              "Day five: write your own intro doc — background, first-30-days plan, one thing you already want to change.",
            ],
          },
          {
            subheading: "The ten questions every new joiner will ask",
            intro: "Answer these directly on the wiki. If any one is missing, it lives in someone's head instead of the company's.",
            items: [
              "What am I working on this week and who decided that?",
              "Who is my manager and how often do we meet?",
              "How do I get access to [tool]?",
              "Where is my offer letter, salary breakdown, and PF details?",
              "What is our leave policy and how do I apply?",
              "How do I add a dependent to our health insurance?",
              "Where do I raise an expense or reimbursement?",
              "Who owns the tool or process I need to unblock myself?",
              "What is my probation period and how is it reviewed?",
              "What are the norms nobody wrote down (video on/off, response times, DM etiquette)?",
            ],
          },
          {
            subheading: "Quarterly wiki clean-up",
            items: [
              "Pull the list of pages sorted by last-edited date.",
              "Every page over 180 days without an edit: ping the owner. Confirm still accurate, update the review date, or archive.",
              "Retire pages that describe tools or processes no longer in use.",
              "Merge duplicates. If two pages answer the same question, only one survives.",
              "Post the clean-up summary in #announcements so the team knows the wiki is being tended.",
            ],
          },
        ],
        editorsNote:
          "A well-kept Google Docs setup beats a neglected Notion. The tool matters less than whether someone owns it.",
      },
      {
        id: "announcements",
        number: "6",
        title: "The announcement channel",
        why:
          "How you announce something reveals what you think announcements are for. Big news dropped in the wrong channel gets missed, misheard, or reframed as gossip before leadership can tell the real story. Matching the weight of the news to the medium is the single highest-leverage change in this guide. The company that gets this right builds trust every time it opens its mouth; the one that gets it wrong pays for it in ways that show up in the exit interview.",
        whatGood:
          "Small changes go in the wiki. Medium changes go in a Slack #announcements channel. Big changes go at the all-hands. Hard changes such as layoffs, restructures, or exits at the top happen in person or on a live call, never over Slack or email. Every announcement has one channel and one messenger, decided before it goes out. Nothing lands cold: the people affected first hear it directly, not from an all-team broadcast.",
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
        takeAwayTitle: "The announcement playbook",
        takeAwayBlocks: [
          {
            subheading: "The what-goes-where grid",
            intro: "Print this. Stick it in the wiki. The interactive version in this section is the drill; this is the reference.",
            items: [
              "New hire → Slack #announcements post the day they start. Deeper welcome at the next all-hands.",
              "Small team win → the team channel and #kudos. Do not save it for the all-hands.",
              "Wiki update → the wiki page itself, with the change noted at the top for a week.",
              "Policy or benefits change → wiki page + Slack #announcements post with the headline and a link. Deeper walk-through at the next all-hands.",
              "Product launch or big project ship → all-hands live, then a Slack post, then a customer-facing comms plan.",
              "Mid-quarter target miss → all-hands. Own it live. Silence reads as denial.",
              "New compensation band or leveling framework → all-hands live, then wiki page.",
              "Office move or return-to-office change → Slack post first (lead time), then all-hands.",
              "Fundraise or major partnership → all-hands the day it becomes public, then a written note.",
              "Layoff, restructure, or senior exit → in person or live call, small group first, then all-hands, never as a first-touch broadcast.",
            ],
          },
          {
            subheading: "The pre-flight checklist for a heavy announcement",
            items: [
              "Who hears it first, in person, before the broadcast? Name them.",
              "Who owns questions after? Name them and confirm they are available for the two hours after.",
              "What is the one-line headline? What is the two-paragraph explanation?",
              "What are the three most likely questions? Draft an answer to each before the broadcast.",
              "Where will the record live? Which wiki page carries the long form.",
              "Is there a follow-up? Book it now, do not promise it into the void.",
            ],
          },
          {
            subheading: "Templates you will need before you need them",
            items: [
              "New hire post: 'Please welcome [name], joining as [role] on [start date]. [One sentence about their background]. Say hi in this thread.'",
              "Policy change: 'Effective [date], [one-line change]. The full policy lives here: [link]. [Owner name] will answer questions in this thread until [date and time].'",
              "Mid-quarter miss (all-hands script): 'We are behind on [target] this quarter. Here is what we know about why. Here is what changes this month. Here is what does not change.'",
              "Senior exit: 'After [tenure], [name] is moving on from [company]. [Two lines about impact and gratitude]. [Successor or interim plan]. We will host an all-hands on [date] to answer questions.'",
              "Layoff (never Slack): scheduled 30-minute call, small groups, the exact same script for every group, followed by an all-team all-hands within 24 hours.",
            ],
          },
          {
            subheading: "Recovery script when you announce in the wrong channel",
            items: [
              "Acknowledge fast, without spinning: 'I dropped [news] in [channel] this morning. It should have been in [correct channel] with more context. Reposting now.'",
              "Repost in the correct channel with what was missing.",
              "Name the pattern out loud so the team sees it: 'This is on me. We will pre-flight the next one.'",
            ],
          },
        ],
        editorsNote:
          "If you find yourself explaining the same news three times to three different people, it needed a bigger channel than the one you picked.",
        interactiveSlot: "what-goes-where",
      },
      {
        id: "whatsapp",
        number: "7",
        title: "WhatsApp and the shadow comms layer",
        why:
          "WhatsApp is the shadow comms layer at almost every Indian company. It is the default for founders, field teams, factory floors, and anyone who checks personal phones more than laptops. It is also the layer with zero governance. When an employee leaves, they walk out with every group chat still on their phone, including whatever was said inside them. The company that treats WhatsApp as invisible pays for it during an audit, a dispute, or a data-privacy question years later.",
        whatGood:
          "WhatsApp is used for two things and two things only: urgent operational pings, and social. Everything else lives in Slack or the wiki. Every WhatsApp group has a named admin who removes ex-employees the day they leave. Any decision that happens on WhatsApp is repeated in Slack or the wiki within 24 hours, so it lands in the searchable record. Nothing sensitive touches the layer at all.",
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
        takeAwayTitle: "The WhatsApp playbook",
        takeAwayBlocks: [
          {
            subheading: "The one-page policy (pin in every group)",
            items: [
              "This group is for [social / operational urgencies]. It is not for anything else.",
              "Nothing sensitive: no salary, no performance feedback, no offers, no terminations, no legal matters.",
              "If a decision happens here, the decision-maker reposts it in Slack or the wiki within 24 hours.",
              "The admin listed at the top is responsible for adding and removing members.",
              "Ex-employees are removed on their last working day, without exception.",
              "Screenshots of this group do not go outside it. If you want the record shared, cross-post the source in Slack.",
              "For emergencies out of hours, the escalation is a phone call, not a WhatsApp message.",
            ],
          },
          {
            subheading: "Group admin off-boarding checklist",
            intro: "Runs on every last working day. Owner: the admin listed on the group.",
            items: [
              "Remove the ex-employee from every WhatsApp group on their exit checklist.",
              "Confirm in the exit call that they will delete company groups from their phone.",
              "Update the group admin list in the wiki if the exiting person was an admin.",
              "Rotate the group's shared drive link, if any was ever posted, in the same day.",
              "Note the off-boarding action in the decision log with the date and the admin's name.",
            ],
          },
          {
            subheading: "Templates you will need",
            items: [
              "Emergency ping (out of hours): 'Urgent [ops/customer/production]. [One line]. Calling [name] now.'",
              "Redirecting a policy question in WhatsApp: 'Not the right place for this. Posting in #people or #ops so we have a record. Will link here.'",
              "Removing an ex-employee: 'Housekeeping: removing [name] from the group as of today. Thanks for everything, [name].'",
              "Setting up a new group: 'Purpose of this group: [one line]. Admin: [name]. Policy pinned above. No policy, salary, or performance talk. Cross-post decisions to Slack.'",
            ],
          },
          {
            subheading: "What never goes on WhatsApp",
            items: [
              "Any salary or compensation number.",
              "Any performance feedback about a specific person.",
              "Any legal, HR, or policy decision.",
              "Any customer PII, contract, or NDA-covered material.",
              "Any board or investor conversation, unless the group is a formal board group with retention set.",
            ],
          },
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
          "Meeting norms are the invisible rules of how a company runs its time. Microsoft's telemetry found meetings starting after 8 pm are up 16% year over year (Work Trend Index 2025, 31 markets including India). Most Indian startups have never written meeting norms down. The best ones do, and revisit them every six months. Not writing them down is a decision: it says the loudest people in the room set the rules, and everyone else adapts to that.",
        whatGood:
          "A shared document that answers: when is video on by default, when are cameras optional, what counts as a no-meeting block, what needs an agenda, and what does not. Reviewed twice a year. A protected no-meeting window at least once a week. A quarterly audit that retires recurring meetings nobody can defend. A culture where 'this could have been a message' is a safe thing to say.",
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
        takeAwayTitle: "The meetings playbook",
        takeAwayBlocks: [
          {
            subheading: "The meeting charter (pin in the wiki)",
            items: [
              "Every meeting has a written agenda in the invite. No agenda, decline.",
              "Cameras are optional. Presence is not.",
              "Default duration is 30 minutes. 60 is a request that needs a reason.",
              "One no-meeting block a week: [day, time]. Only urgent customer or production issues break it.",
              "Recurring meetings are audited every quarter. The default is retire.",
              "The last five minutes are for the decision or the action. If a meeting cannot land one, it should have been a message.",
              "Recording is on for any meeting more than four people cannot attend live.",
            ],
          },
          {
            subheading: "The audit checklist (10 questions per recurring meeting)",
            items: [
              "What decision does this meeting produce?",
              "Who owns that decision?",
              "Could this be an async update instead?",
              "Has anyone read the agenda before joining in the last three sessions?",
              "Who has skipped in the last three sessions, and did anything break?",
              "Would we still create this meeting from scratch today?",
              "Is anyone attending only to feel included?",
              "Is the meeting shorter than we set it to be, week after week?",
              "If we cancelled it tomorrow, who would object and why?",
              "What is the smallest version of this meeting that still works?",
            ],
          },
          {
            subheading: "Scripts",
            items: [
              "Declining a meeting with no agenda: 'Skipping this one. Happy to join if there is an agenda in the invite by [tomorrow morning]. Otherwise, will read the notes.'",
              "Cancelling a recurring: 'We are retiring this recurring meeting on [date]. If you rely on it, reply here with what you use it for and we will find a lighter replacement.'",
              "Shortening a 60 to a 30: 'Booking this as 30 to test. If we need more, we will add. Agenda in the invite.'",
              "Protecting the no-meeting block: 'This is on the no-meeting day. Moving to [alternative]. If it is urgent, call.'",
            ],
          },
          {
            subheading: "Meeting-invite hygiene",
            items: [
              "Title reads as an outcome, not a topic ('Approve Q3 spend plan', not 'Q3 review').",
              "Agenda in the invite body, not attached.",
              "Named decision-maker in the agenda.",
              "Required attendees vs optional attendees split, not everyone required.",
              "Recording and notes destination linked in the invite.",
            ],
          },
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
          "Whether a workplace conversation happens in a public channel or a private DM is a cultural decision, not a personal one. A DM-heavy culture creates silos, gossip, and the political dynamics that come with them. A public-by-default culture creates transparency and, if unchecked, performance anxiety. The founder who lives in DMs turns leadership into a series of one-to-one relationships that nobody else can see; the team learns that access matters more than information.",
        whatGood:
          "A written rule of thumb. DMs for sensitive, personal, or one-to-one matters. Threads for team work. Channels for anything a third person could learn from. Not no DMs ever, but here is when a channel is better. The founder models it: their answer to 'can I DM you?' is usually 'let's take it to [channel] if that works for you.' A new joiner sees the pattern in week one and copies it by week four.",
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
        takeAwayTitle: "The DM playbook",
        takeAwayBlocks: [
          {
            subheading: "When a DM is right",
            items: [
              "Sensitive feedback: performance, conflict, health, personal circumstances.",
              "One-to-one scheduling: 'do you have 15 minutes today?'",
              "Anything you would say behind a closed door.",
              "Bounced-back plans that are still half-formed and would waste a team's time if broadcast.",
              "Personal check-ins with a peer.",
            ],
          },
          {
            subheading: "When a thread is right",
            items: [
              "A team question with a defined audience (three to eight people).",
              "A decision that needs a small group's input inside a broader channel.",
              "A status update on a project that lives in a specific channel.",
              "A follow-up to a message that already exists in that channel.",
              "A back-and-forth that would flood the main channel view if posted as top-level.",
            ],
          },
          {
            subheading: "When a channel is right",
            items: [
              "Anything a third person could learn from.",
              "A decision with cross-team impact.",
              "Kudos, wins, customer signal.",
              "Requests for help where you do not know the owner.",
              "Anything you would repost in the all-hands anyway.",
            ],
          },
          {
            subheading: "Scripts for moving a DM into the open",
            items: [
              "'This is worth the team seeing. Copying my last message into #[channel]. Let's continue there.'",
              "'Not sure I have the answer to this. Posting in #help-[function] so the owner can weigh in.'",
              "'Making a decision on this today. Putting the question in #[channel] so anyone with a view can chime in by [time].'",
              "'This started as a DM but it is really a policy question. Kicking it into #people so we have a record.'",
            ],
          },
          {
            subheading: "Weekly review (for founders and leads)",
            items: [
              "Look at your sent DMs from the week.",
              "Count how many should have been threads or channels.",
              "Aim to move at least three next week.",
              "If more than 50% of your Slack traffic is DMs, the pattern is you.",
            ],
          },
        ],
        editorsNote:
          "The DM-heavy companies I have worked at all had the same problem. Leadership found out about things last.",
      },
      {
        id: "response-time",
        number: "10",
        title: "Response time etiquette",
        why:
          "Response time expectations are the least-discussed comms decision and the most consequential for burnout, focus, and trust. An Indeed survey of 500 Indian employees and 500 employers found that 88% of Indian employees are frequently contacted by employers outside work hours, and 79% worry about missed promotions or reputational damage if they tune out. The Right to Disconnect Bill 2025, tabled in the Lok Sabha in December 2025, would make it illegal for employers to demand responses outside official hours. The company that writes its response-time norms down is the one that is ready for that shift, not scrambling under it.",
        whatGood:
          "Written response-time norms, agreed at a team level. Same-day for critical, next-day for the rest, 24 to 48 hours for anything async. An escalation path for genuinely urgent items that does not run through Slack. Quiet-hours markers on late-night messages, so the sender's convenience does not become the receiver's obligation. A founder who models it, out loud, and apologises when they slip.",
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
        takeAwayTitle: "The response-time playbook",
        takeAwayBlocks: [
          {
            subheading: "The full policy (long-form; the interactive builder above generates a shorter version)",
            items: [
              "Default expected response time: next working day.",
              "Same-day: an @mention with a decision needed by end of day, plus anything customer-facing or production.",
              "Async: any Slack message without an @mention. Answered within 48 hours.",
              "Quiet hours: 8 pm to 8 am local. No expectation of reply. Messages sent inside the window carry the 'apologies for the hour' line.",
              "Urgent: means a customer outage, a production issue, or a person's safety. Anything else is not urgent.",
              "Escalation: for genuinely urgent items, the path is a phone call, not a Slack ping.",
              "Weekends: off by default. If a project needs weekend work, it is agreed with the team in advance, and treated as an exception.",
              "No response needed: mark messages with '(no reply needed)' if you are broadcasting information the team can read without acknowledging.",
            ],
          },
          {
            subheading: "Templates",
            items: [
              "The late-hour message: 'Apologies for the hour, this is for tomorrow morning: [request]. No expectation of a reply tonight.'",
              "The no-reply-needed broadcast: '(no reply needed) FYI, [update]. Nothing to action, just closing the loop.'",
              "The urgent escalation: 'Calling [name] now about [issue]. Will post the resolution here after.'",
              "The reset-the-expectation note (send once, from the founder): 'I have been messaging late and want to reset. From next week, anything I send after 7 pm can wait until the next working morning. If it is genuinely urgent I will call. I want to hold myself to this. Please push back if I slip.'",
              "The team-level norm agreement: 'For [team], quiet hours are [window]. Same-day for @mentions. Escalation for urgent is a call to [rota]. Reviewed every six months.'",
            ],
          },
          {
            subheading: "On-call rota template",
            intro: "For teams that genuinely need out-of-hours cover. Everyone else does not.",
            items: [
              "Named rota, one person on for one week at a time.",
              "Compensated (time off in lieu or a stipend, per policy). Not implicit.",
              "Escalation path defined: page → call → escalation manager.",
              "Handover doc every Monday morning. What is open, what the team is watching.",
              "Post-mortem for anything that woke someone up outside their shift.",
            ],
          },
          {
            subheading: "How to enforce it as a manager",
            items: [
              "Reply to late messages the next morning, not the same night.",
              "Push back visibly when someone messages you inside quiet hours: 'Answering tomorrow. Grab me on call if this is a real emergency.'",
              "Call out the pattern when it recurs: 'Three late messages this week. Let us look at what needs changing.'",
              "Model it in your own outgoing messages first. The team is watching you, not the policy.",
            ],
          },
        ],
        editorsNote:
          "The single highest-leverage ten minutes at your next all-hands is spent writing down what response times you actually expect.",
        interactiveSlot: "response-policy",
      },
      {
        id: "no-hello",
        number: "11",
        title: "The 'no hello' rule",
        why:
          "The single most-shared internal comms rule on the internet, and one of the easiest to adopt. 'Hi, are you there?' then waiting for a reply before saying what you need wastes both people's time. The sender gets one context switch. The receiver gets two: once to answer the hello, once to answer the actual question. There is a whole website (nohello.net) dedicated to this rule, and every remote-first company eventually adopts a version of it. The small productivity dividend from adopting it is real; the larger mood dividend is bigger.",
        whatGood:
          "One message that says who you are (if needed), what you want, and by when you need it. If the answer is long, offer to jump on a call. Never send 'hi' and stop. New joiners hear it in week one, managers model it in week two, and the founder's own DMs prove it out.",
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
        takeAwayTitle: "The no-hello playbook",
        takeAwayBlocks: [
          {
            subheading: "Before and after (six examples across contexts)",
            items: [
              "Bad: 'Hey Priya, you there?'  Good: 'Hey Priya, need your sign-off on the vendor invoice by tomorrow EOD. Draft in this thread. Call if easier.'",
              "Bad (sales): 'Rohan, quick one?'  Good (sales): 'Rohan, customer [X] asked for a proposal by Friday. Sending you the deal notes now, need pricing sign-off by Wednesday.'",
              "Bad (eng): 'Anushka available?'  Good (eng): 'Anushka, prod is showing 500s on /checkout. Rolling back the last deploy now. Can you page in for review in 15 minutes?'",
              "Bad (HR): 'Hi, got a minute?'  Good (HR): 'Hi, need to discuss my leave request for next month. Fine to type here, or 10 minutes on Zoom whenever suits.'",
              "Bad (design): 'Ping!'  Good (design): 'Sharing the v3 hero for the landing page. Async review in this thread. Ship-blocking feedback by Thursday, nice-to-haves later.'",
              "Bad (founder to hire): 'Hey, you there?'  Good (founder to hire): 'Hey, thinking about how we structure the sales function next quarter. Do you have 30 minutes this week? Async is fine if you would rather type.'",
            ],
          },
          {
            subheading: "Teach it in week one",
            items: [
              "Include the rule in the new-joiner wiki page.",
              "Manager models it in their first Slack message to the new joiner.",
              "Share the two-example card in week one, not week four.",
              "Post the nohello.net link once in #general when the rule first comes up.",
            ],
          },
          {
            subheading: "How to respond when someone breaks it",
            intro: "Do not lecture. Model the fix.",
            items: [
              "Reply once with: 'Hi. Fire away.' Sets the norm without shaming.",
              "If it happens twice from the same person, a short DM: 'Hey, one thing: drop the whole question in one message. Saves us both the ping-back. Thanks.'",
              "For a founder or senior lead who is the culprit: point it out in the next 1:1, not in Slack.",
            ],
          },
        ],
        editorsNote:
          "The teams that adopt this rule get a small productivity dividend and a large mood dividend. Nobody misses the 'hello, are you there?' ping.",
      },
      {
        id: "feedback-loop",
        number: "12",
        title: "The feedback loop",
        why:
          "How feedback flows through a company is the deepest layer of its internal comms, and the one most Indian startups leave undesigned. A well-run feedback loop compounds over time. A performative one destroys trust faster than the absence of one. Every founder who has run a survey and then gone quiet for three months has taught their team not to answer the next one honestly.",
        whatGood:
          "At least two channels. A quarterly anonymous engagement survey with results shared back within two weeks. Skip-level 1:1s at least twice a year. Leadership acts visibly on at least one thing per cycle, so the loop feels real. The survey questions do not change every quarter, so the team can see movement. The share-back is unedited: the good, the bad, the confusing.",
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
        takeAwayTitle: "The feedback loop playbook",
        takeAwayBlocks: [
          {
            subheading: "The four-week loop",
            items: [
              "Week 1 — Run the survey. Send Monday, close Friday. Reminders on Wednesday.",
              "Week 2 — Analyse the results. Cluster into three to five themes. Do not edit the raw quotes.",
              "Week 3 — Share the findings back with the team, unedited. Say what surprised you and what did not.",
              "Week 4 — Commit publicly to one action, with a named owner and a date. Just one. The loop is proven by action, not by ambition.",
            ],
          },
          {
            subheading: "Survey question bank (12 questions; use 8 to 10 per round)",
            intro: "Same questions round after round. The value is in the trend, not the wording.",
            items: [
              "I know what is expected of me at work. (1 to 5)",
              "I have the tools and information I need to do my job well. (1 to 5)",
              "I understand how my work connects to the company's goals. (1 to 5)",
              "My manager gives me feedback that helps me improve. (1 to 5)",
              "I can raise a concern with leadership and expect to be heard. (1 to 5)",
              "The way decisions are made at this company is clear to me. (1 to 5)",
              "I would recommend this company as a place to work. (1 to 10)",
              "In the last month, I have felt overworked in a way that is not sustainable. (agree / disagree)",
              "What is the one thing you would change about how we work?",
              "What is the one thing you would protect no matter what?",
              "What is a decision leadership made recently that you disagreed with, and why?",
              "What is something you wish leadership talked about more openly?",
            ],
          },
          {
            subheading: "Share-back template",
            intro: "Post in a real all-hands, then paste in the wiki archive. Do not send it as a slide deck attached to an email.",
            items: [
              "'Here is what we asked.' — list the questions verbatim.",
              "'Here is what we heard.' — three to five themes with two or three quotes each, unedited.",
              "'Here is what surprised us.' — one paragraph. Be honest.",
              "'Here is what we are doing about it.' — one action, named owner, date.",
              "'Here is what we are not doing about it, and why.' — one action you are not taking, one paragraph on why.",
            ],
          },
          {
            subheading: "Skip-level 1:1 script",
            intro: "For companies past 50. Twice a year, senior leaders sit with people two levels below them.",
            items: [
              "'What is going well in your team that I might not see from where I sit?'",
              "'What is broken in a way you think leadership has not clocked?'",
              "'What is your manager doing well that I should thank them for?'",
              "'What is one thing you would change about our comms in the next quarter?'",
              "'Is there anything you would ask me if there were no consequences?'",
            ],
          },
        ],
        editorsNote:
          "The feedback loop is where you learn what your team actually thinks. The version that works is the one you act on.",
      },
    ],
  },
];

// Take-away pack, listed at the bottom of the page.
export const takeAways = [
  { section: "1", title: "The all-hands playbook (prep, agenda, scripts, after-meeting)" },
  { section: "2", title: "The newsletter playbook (template, ten prompts, first-issue kick-off)" },
  { section: "3", title: "The async update playbook (template, traffic-light rubric, publishing ritual)" },
  { section: "4", title: "The Slack playbook (starter channels, naming, archive checklist, onboarding)" },
  { section: "5", title: "The wiki playbook (five foundation pages, new-joiner path, ten questions)" },
  { section: "6", title: "The announcement playbook (what-goes-where grid, pre-flight, templates)" },
  { section: "7", title: "The WhatsApp playbook (policy, off-boarding checklist, templates)" },
  { section: "8", title: "The meetings playbook (charter, audit checklist, scripts, invite hygiene)" },
  { section: "9", title: "The DM playbook (when a DM/thread/channel is right, move-to-open scripts)" },
  { section: "10", title: "The response-time playbook (full policy, templates, on-call rota)" },
  { section: "11", title: "The no-hello playbook (six before/afters, teach in week one)" },
  { section: "12", title: "The feedback-loop playbook (four-week loop, question bank, share-back, skip-level)" },
];

export const sources = [
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

// Placeholder for the "How other companies do it" section.
// Once real examples land, add entries here as { company, docType, blurb, sourceUrl }.
export const companyExamples: {
  heading: string;
  blurb: string;
  awaitingContent: boolean;
  examples: {
    company: string;
    docType: string;
    blurb: string;
    sourceUrl?: string;
  }[];
} = {
  heading: "How other companies do it",
  blurb:
    "The best internal comms docs from other companies, with a one-paragraph note on what makes each one work. Names, links, and short excerpts.",
  awaitingContent: true,
  examples: [],
};

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
