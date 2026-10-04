import { useMemo, useState } from "react";
import type { Part, Section } from "../content/guide";
import {
  bandIndexFor,
  GEO_OPTIONS,
  geoPhrase,
  MODE_OPTIONS,
  modePhrase,
  PRIORITY_OPTIONS,
  rationaleFor,
  rankSections,
  SIZE_OPTIONS,
  sizePhrase,
  STAGE_OPTIONS,
  stagePhrase,
  thisWeekFor,
  type Geography,
  type Picks,
  type Priority,
  type Size,
  type Stage,
  type WorkMode,
} from "../content/configurator";

type Props = {
  parts: Part[];
  archiveHref: string;
  toolkitHref: string;
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function Issue({ parts, archiveHref, toolkitHref }: Props) {
  const [stage, setStage] = useState<Stage | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [mode, setMode] = useState<WorkMode | null>(null);
  const [geo, setGeo] = useState<Geography | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [built, setBuilt] = useState(false);

  const ready = !!stage && !!size && !!mode && !!geo && priorities.length > 0;

  const picks: Picks | null = ready
    ? ({ stage: stage!, size: size!, workMode: mode!, geography: geo!, priorities } as Picks)
    : null;

  const ranked = useMemo(() => (picks ? rankSections(parts, picks) : []), [picks, parts]);

  function togglePriority(p: Priority) {
    setPriorities((prev) => {
      if (prev.includes(p)) return prev.filter((x) => x !== p);
      if (prev.length >= 3) return prev;
      return [...prev, p];
    });
  }

  function reset() {
    setBuilt(false);
  }

  return (
    <>
      <section className={`configurator ${built ? "configurator-stuck" : ""}`} aria-labelledby="build-your-issue">
        <div className="config-head">
          <span className="config-eyebrow">The configurator</span>
          <h2 id="build-your-issue" className="config-title">
            Build <em>your</em> issue
          </h2>
          <p className="config-standfirst">
            Five picks. We turn them into the comms playbook you'd actually run next week.
          </p>
        </div>

        <div className="config-rows">
          <ConfigRow label="Stage">
            {STAGE_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                selected={stage === opt.value}
                onClick={() => setStage(opt.value)}
                label={opt.label}
              />
            ))}
          </ConfigRow>

          <ConfigRow label="Headcount">
            {SIZE_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                selected={size === opt.value}
                onClick={() => setSize(opt.value)}
                label={opt.label}
              />
            ))}
          </ConfigRow>

          <ConfigRow label="Where you work">
            {MODE_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                selected={mode === opt.value}
                onClick={() => setMode(opt.value)}
                label={opt.label}
              />
            ))}
          </ConfigRow>

          <ConfigRow label="Spread of people">
            {GEO_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                selected={geo === opt.value}
                onClick={() => setGeo(opt.value)}
                label={opt.label}
              />
            ))}
          </ConfigRow>

          <ConfigRow
            label={`What are you trying to fix? (pick 1–3)`}
            hint={`${priorities.length} of 3 picked`}
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                selected={priorities.includes(opt.value)}
                onClick={() => togglePriority(opt.value)}
                label={opt.label}
                hint={opt.hint}
                disabled={!priorities.includes(opt.value) && priorities.length >= 3}
                multi
              />
            ))}
          </ConfigRow>
        </div>

        <div className="config-cta">
          <button
            className="btn btn-build"
            disabled={!ready}
            onClick={() => setBuilt(true)}
          >
            {built ? "Rebuild my issue" : "Print my issue"}
          </button>
          {built && (
            <button className="btn btn-ghost" onClick={reset} type="button">
              Hide the spread
            </button>
          )}
          {!ready && (
            <span className="config-cta-hint">
              Pick each row to unlock. One priority is enough.
            </span>
          )}
        </div>
      </section>

      {built && picks && (
        <Playbook
          picks={picks}
          sections={ranked}
          toolkitHref={toolkitHref}
          archiveHref={archiveHref}
        />
      )}
    </>
  );
}

function ConfigRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="config-row">
      <div className="config-row-label">
        <span>{label}</span>
        {hint && <span className="config-row-hint">{hint}</span>}
      </div>
      <div className="config-chips">{children}</div>
    </div>
  );
}

function Chip({
  selected,
  onClick,
  label,
  hint,
  disabled,
  multi,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
  disabled?: boolean;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      className={`chip ${selected ? "chip-selected" : ""} ${multi ? "chip-multi" : ""}`}
      aria-pressed={selected}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="chip-label">{label}</span>
      {hint && <span className="chip-hint">{hint}</span>}
    </button>
  );
}

function Playbook({
  picks,
  sections,
  toolkitHref,
  archiveHref,
}: {
  picks: Picks;
  sections: Section[];
  toolkitHref: string;
  archiveHref: string;
}) {
  const bandIdx = bandIndexFor(picks.size);

  return (
    <article className="playbook" aria-live="polite">
      <header className="playbook-head">
        <span className="playbook-slug">Issue 01 · Printed for you</span>
        <h2 className="playbook-title">
          <em>Your</em> comms stack, in print
        </h2>
        <p className="playbook-standfirst">
          A {stagePhrase(picks.stage)}, {sizePhrase(picks.size)}, {modePhrase(picks.workMode)}, {geoPhrase(picks.geography)} outfit. Here are the {sections.length}{" "}
          sections of the guide that matter most for your week.
        </p>
        <div className="playbook-byline">
          <span>Byline: The Plum editorial desk</span>
          <span className="playbook-byline-sep">·</span>
          <span>
            Fixing:{" "}
            {picks.priorities
              .map((p) => PRIORITY_OPTIONS.find((o) => o.value === p)?.label)
              .filter(Boolean)
              .join(" · ")}
          </span>
        </div>
      </header>

      <ol className="chapters">
        {sections.map((s, i) => (
          <li className="chapter" key={s.id} id={`playbook-${s.id}`}>
            <aside className="chapter-numeral" aria-hidden="true">
              {ROMAN[i] ?? i + 1}
            </aside>
            <div className="chapter-body">
              <span className="chapter-slug">Chapter {i + 1} · {s.title}</span>
              <h3 className="chapter-title">{s.title}</h3>
              <p className="chapter-rationale">
                <span className="chapter-rationale-label">Why for you.</span>{" "}
                {rationaleFor(s.id, picks)}
              </p>
              <blockquote className="chapter-pull">
                <span className="chapter-pull-mark">&ldquo;</span>
                <span dangerouslySetInnerHTML={{ __html: pullQuoteOf(s) }} />
                <span className="chapter-pull-mark chapter-pull-mark-close">&rdquo;</span>
              </blockquote>
              <p className="chapter-prose chapter-prose-drop" dangerouslySetInnerHTML={{ __html: s.why }} />

              <div className="chapter-grid">
                <div>
                  <span className="chapter-sub">At your size</span>
                  <p>
                    <span className="chapter-size-tag">{s.bands[bandIdx].range}</span>{" "}
                    {s.bands[bandIdx].body}
                  </p>
                </div>
                <div>
                  <span className="chapter-sub">What good looks like</span>
                  <p dangerouslySetInnerHTML={{ __html: s.whatGood }} />
                </div>
              </div>

              <div className="chapter-mistake">
                <span className="chapter-sub">Common mistake</span>
                <p dangerouslySetInnerHTML={{ __html: s.mistake }} />
              </div>

              <div className="chapter-takeaway">
                <span className="chapter-sub">Take this with you</span>
                <h4>{s.takeAwayTitle}</h4>
                {s.takeAwayBlocks.slice(0, 2).map((block) => (
                  <div key={block.subheading} className="chapter-take-block">
                    <p className="chapter-take-sub">{block.subheading}</p>
                    {block.intro && <p>{block.intro}</p>}
                    {block.items && (
                      <ul>
                        {block.items.slice(0, 6).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {s.takeAwayBlocks.length > 2 && (
                  <p className="chapter-take-more">
                    <a href={`${archiveHref}#${s.id}`}>Read the full section →</a>
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section className="playbook-weekahead">
        <span className="playbook-slug">The week ahead</span>
        <h3>Pick one. Start Monday.</h3>
        <ol>
          {sections.map((s) => (
            <li key={s.id}>
              <span className="weekahead-tag">{s.title}</span>
              <span>{thisWeekFor(s.id, picks)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="playbook-closer">
        <div>
          <h3>Take the toolkit</h3>
          <p>Every checklist and script from the guide in one editable Word document.</p>
          <a className="btn btn-primary" href={toolkitHref}>Download the full toolkit (.docx)</a>
        </div>
        <div>
          <h3>Browse the archive</h3>
          <p>Twelve sections, every band, every take-away.</p>
          <a className="btn btn-ghost" href={archiveHref}>Open the full guide →</a>
        </div>
      </section>
    </article>
  );
}

function pullQuoteOf(s: Section): string {
  const quotes: Record<string, string> = {
    "all-hands": "Below a certain size, it's a conversation. Above it, it's a broadcast.",
    "async-update": "A written daily update is the two-minute standup you don't attend.",
    newsletter: "A round-up is the quiet backbone that reinforces what the all-hands said.",
    "slack-setup": "Channel discipline is the cheapest thing you can set up now.",
    wiki: "Decisions written down outlive the Slack thread they were made in.",
    announcements: "Change doesn't leak out through DMs if you've written how it goes.",
    whatsapp: "Decide what WhatsApp is for before it decides for you.",
    "meeting-norms": "The invisible meeting tax is the one your calendar never bills you.",
    "dm-culture": "DMs are the inverse of transparency. Keep the work in the open.",
    "response-time": "Writing your response-time norms down takes an afternoon and saves a year of resentment.",
    "no-hello": "A one-line fix that compounds across every message in your workspace.",
    "feedback-loop": "Without a loop, you're guessing. The guesses are usually wrong.",
  };
  return quotes[s.id] ?? s.mistake.replace(/<[^>]+>/g, "");
}
