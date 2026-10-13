import { useEffect, useMemo, useRef, useState } from "react";
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

// Single-digit margin numeral. We cap selections at 7 sections, so one
// glyph is always enough — keeps the big italic numeral narrow and well
// clear of the body column.
function marginNumeral(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export default function Issue({ parts, archiveHref, toolkitHref }: Props) {
  const [stage, setStage] = useState<Stage | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [mode, setMode] = useState<WorkMode | null>(null);
  const [geo, setGeo] = useState<Geography | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [built, setBuilt] = useState(false);
  // Increments on every Build / Rebuild click. Playbook watches it to
  // scroll itself into view after each build, including rebuilds (where
  // `built` stays true so a plain [built] effect wouldn't re-fire).
  const [buildTick, setBuildTick] = useState(0);

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

  function build() {
    setBuilt(true);
    setBuildTick((t) => t + 1);
  }

  function reset() {
    setBuilt(false);
  }

  return (
    <>
      <section className={`configurator ${built ? "configurator-stuck" : ""}`} aria-labelledby="build-your-blueprint">
        <div className="config-head">
          <span className="config-eyebrow">The configurator</span>
          <h2 id="build-your-blueprint" className="config-title">
            Build <em>your</em> blueprint
          </h2>
          <p className="config-standfirst">
            Give us five things about the company you're running, and we'll put
            together the internal-comms playbook a thoughtful founder with a
            free weekend would have written for you themselves.
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
            label={`What are you trying to fix? (pick one, two, or three)`}
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
            onClick={build}
          >
            {built ? "Rebuild my blueprint" : "Build my blueprint"}
          </button>
          {built && (
            <button className="btn btn-ghost" onClick={reset} type="button">
              Hide the blueprint
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
          buildTick={buildTick}
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
  buildTick,
}: {
  picks: Picks;
  sections: Section[];
  toolkitHref: string;
  archiveHref: string;
  buildTick: number;
}) {
  const bandIdx = bandIndexFor(picks.size);
  const [currentIdx, setCurrentIdx] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLElement>(null);

  // Each Build / Rebuild bumps buildTick. Scroll the playbook head into
  // view so the reader lands at "Built for you" instead of staying on
  // the configurator. Honours prefers-reduced-motion.
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    });
    // Also reset to chapter 1 on a fresh build.
    setCurrentIdx(0);
  }, [buildTick]);

  // If the picks change and the new ranking has fewer sections than
  // currentIdx points at, snap back to 0.
  useEffect(() => {
    if (currentIdx > sections.length - 1) setCurrentIdx(0);
  }, [sections.length, currentIdx]);

  const current = sections[currentIdx];
  const atStart = currentIdx === 0;
  const atEnd = currentIdx === sections.length - 1;

  function go(delta: number) {
    const next = currentIdx + delta;
    if (next < 0 || next >= sections.length) return;
    setCurrentIdx(next);
    // Scroll the slider's top into view so the reader lands on the new
    // chapter's header, not somewhere mid-way.
    requestAnimationFrame(() => {
      sliderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function jumpTo(idx: number) {
    if (idx === currentIdx) return;
    setCurrentIdx(idx);
    requestAnimationFrame(() => {
      sliderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Keyboard navigation when the slider is in view and the active
  // element isn't an input/textarea/button.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(+1);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [currentIdx, sections.length]);

  return (
    <article className="playbook" aria-live="polite">
      <header className="playbook-head" ref={headRef}>
        <span className="playbook-slug">Built for you</span>
        <h2 className="playbook-title">
          <em>Your</em> comms blueprint
        </h2>
        <p className="playbook-standfirst">
          A {stagePhrase(picks.stage)}, {sizePhrase(picks.size)}, {modePhrase(picks.workMode)}, {geoPhrase(picks.geography)} outfit, which puts {sections.length}{" "}
          of the guide's twelve sections squarely on your desk for the week in front of you.
        </p>
        <div className="playbook-byline">
          <span>From the Plum editorial desk</span>
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

      <nav className="chapter-tabs" aria-label="Jump to section">
        <div className="chapter-tabs-track">
          {sections.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`chapter-tab ${i === currentIdx ? "chapter-tab-active" : ""}`}
              onClick={() => jumpTo(i)}
              aria-current={i === currentIdx ? "page" : undefined}
            >
              <span className="chapter-tab-num">{marginNumeral(i)}</span>
              <span className="chapter-tab-title">{s.title}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="chapter-slider" ref={sliderRef}>
        <article
          className="chapter"
          key={current.id}
          id={`playbook-${current.id}`}
        >
          <aside className="chapter-numeral" aria-hidden="true">
            {marginNumeral(currentIdx)}
          </aside>
          <div className="chapter-body">
            <span className="chapter-slug">No. {currentIdx + 1} of {sections.length} · {current.title}</span>
            <h3 className="chapter-title">{current.title}</h3>
            <p className="chapter-rationale">
              <span className="chapter-rationale-label">Why for you.</span>{" "}
              {rationaleFor(current.id, picks)}
            </p>
            <blockquote className="chapter-pull">
              <span className="chapter-pull-mark">&ldquo;</span>
              <span dangerouslySetInnerHTML={{ __html: pullQuoteOf(current) }} />
              <span className="chapter-pull-mark chapter-pull-mark-close">&rdquo;</span>
            </blockquote>
            <p className="chapter-prose chapter-prose-drop" dangerouslySetInnerHTML={{ __html: current.why }} />

            <div className="chapter-grid">
              <div>
                <span className="chapter-sub">At your size</span>
                <p>
                  <span className="chapter-size-tag">{current.bands[bandIdx].range}</span>{" "}
                  {current.bands[bandIdx].body}
                </p>
              </div>
              <div>
                <span className="chapter-sub">What good looks like</span>
                <p dangerouslySetInnerHTML={{ __html: current.whatGood }} />
              </div>
            </div>

            <div className="chapter-mistake">
              <span className="chapter-sub">Common mistake</span>
              <p dangerouslySetInnerHTML={{ __html: current.mistake }} />
            </div>

            <div className="chapter-takeaway">
              <span className="chapter-sub">Take this with you</span>
              <h4>{current.takeAwayTitle}</h4>
              {current.takeAwayBlocks.slice(0, 2).map((block) => (
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
              {current.takeAwayBlocks.length > 2 && (
                <p className="chapter-take-more">
                  <a href={`${archiveHref}#${current.id}`}>Read the full section →</a>
                </p>
              )}
            </div>
          </div>
        </article>
      </div>

      <nav className="chapter-nav" aria-label="Section navigation">
        <button
          type="button"
          className="chapter-nav-btn chapter-nav-prev"
          onClick={() => go(-1)}
          disabled={atStart}
        >
          <span aria-hidden="true">←</span>
          <span className="chapter-nav-label">
            <span className="chapter-nav-label-small">Previous</span>
            {!atStart && (
              <span className="chapter-nav-label-title">{sections[currentIdx - 1].title}</span>
            )}
          </span>
        </button>
        <span className="chapter-nav-count">
          {marginNumeral(currentIdx)} / {marginNumeral(sections.length - 1)}
        </span>
        <button
          type="button"
          className="chapter-nav-btn chapter-nav-next"
          onClick={() => go(+1)}
          disabled={atEnd}
        >
          <span className="chapter-nav-label chapter-nav-label-right">
            <span className="chapter-nav-label-small">Next</span>
            {!atEnd && (
              <span className="chapter-nav-label-title">{sections[currentIdx + 1].title}</span>
            )}
          </span>
          <span aria-hidden="true">→</span>
        </button>
      </nav>

      <section className="playbook-weekahead">
        <span className="playbook-slug">The week ahead</span>
        <h3>Pick one of these, do it on <em>Monday</em>, and leave the rest to another week.</h3>
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
          <p>Every checklist, template and script from the guide packed into one editable Word document, covering the whole library rather than just your picks, so you can hand it to a new ops hire and let them work out which parts of it apply to the company they've just joined.</p>
          <a className="btn btn-primary" href={toolkitHref}>Download the full toolkit (.docx)</a>
        </div>
        <div>
          <h3>Browse the library</h3>
          <p>Twelve sections in long form, every size band, every take-away, for when you want to read sideways through the guide rather than straight through the Blueprint lens.</p>
          <a className="btn btn-ghost" href={archiveHref}>Open the full guide →</a>
        </div>
      </section>
    </article>
  );
}

function pullQuoteOf(s: Section): string {
  const quotes: Record<string, string> = {
    "all-hands": "Below a certain size an all-hands is a conversation, above it a broadcast, and nobody tells you when you've crossed the line.",
    "async-update": "A written daily update is the two-minute standup you never had to turn up for.",
    newsletter: "A round-up is the backbone that lets the all-hands land twice, for the people who missed it and the ones who caught it but have slept since.",
    "slack-setup": "Channel discipline is the cheapest thing you can set up now that pays itself back for every hire you make after.",
    wiki: "Decisions written down outlive the Slack thread they were made in, which is useful six months later when nobody can remember why you picked Notion.",
    announcements: "If you've written down how a decision gets announced, it stops leaking out through DMs, slack threads and three different versions of the story.",
    whatsapp: "Decide what WhatsApp is for before it decides for you, because it will, and the muscle memory sets in faster than you think.",
    "meeting-norms": "The invisible meeting tax is the one your calendar never itemises for you, which is why it stays invisible, and why it compounds.",
    "dm-culture": "A DM is the inverse of transparency, which is to say the work stops being everyone's the moment it moves into one.",
    "response-time": "Writing your response-time norms down takes an afternoon and saves a year of resentment, and the saving starts the first time somebody doesn't reply to a Saturday-night message.",
    "no-hello": "A one-line fix that costs nothing to put in and compounds across every message in the workspace, in the way small norms always do.",
    "feedback-loop": "Without a feedback loop you're guessing at how the team feels, and the guesses are usually wrong in the direction most convenient to the person making them.",
  };
  return quotes[s.id] ?? s.mistake.replace(/<[^>]+>/g, "");
}
