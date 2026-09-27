import { useMemo, useState } from "react";
import { wgwChannels, wgwItems } from "../content/guide";

type Placement = Record<string, string | undefined>;

export default function WhatGoesWhere() {
  const [placement, setPlacement] = useState<Placement>({});

  function place(itemId: string, channelId: string) {
    setPlacement((p) => ({ ...p, [itemId]: channelId }));
  }

  function reset() {
    setPlacement({});
  }

  const stats = useMemo(() => {
    let correct = 0;
    let placed = 0;
    for (const item of wgwItems) {
      const c = placement[item.id];
      if (!c) continue;
      placed += 1;
      if (c === item.answer) correct += 1;
    }
    return { correct, placed, total: wgwItems.length };
  }, [placement]);

  const done = stats.placed === stats.total;

  return (
    <div className="wgw">
      <div className="wgw-top">
        <div className="wgw-intro">
          <span className="wgw-badge">Interactive</span>
          <h4 className="wgw-title">What goes where</h4>
          <p className="wgw-sub">
            Nine things that happen at every company. Which channel would you send each one to? Pick and find out.
          </p>
        </div>
        <div className="wgw-score" aria-live="polite">
          <span className="wgw-score-num">
            {stats.correct}
            <span className="wgw-score-of">/{stats.total}</span>
          </span>
          <span className="wgw-score-label">
            {done ? (stats.correct === stats.total ? "clean sweep" : `${stats.correct} right`) : `${stats.placed} of ${stats.total}`}
          </span>
        </div>
      </div>

      <ol className="wgw-list">
        {wgwItems.map((item, i) => {
          const chosen = placement[item.id];
          const correct = chosen && chosen === item.answer;
          const wrong = chosen && chosen !== item.answer;
          const answerChannel = wgwChannels.find((ch) => ch.id === item.answer);
          return (
            <li
              key={item.id}
              className={"wgw-row" + (correct ? " ok" : "") + (wrong ? " no" : "")}
            >
              <div className="wgw-q">
                <span className="wgw-num">{i + 1}</span>
                <span className="wgw-label">{item.label}</span>
              </div>
              <div className="wgw-choices" role="radiogroup" aria-label={item.label}>
                {wgwChannels.map((ch) => {
                  const isChosen = chosen === ch.id;
                  const showCorrect = chosen && ch.id === item.answer;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      role="radio"
                      aria-checked={isChosen}
                      className={
                        "wgw-choice" +
                        (isChosen ? " chosen" : "") +
                        (showCorrect && !isChosen ? " reveal" : "") +
                        (showCorrect && isChosen ? " chosen-right" : "") +
                        (isChosen && !correct ? " chosen-wrong" : "")
                      }
                      onClick={() => place(item.id, ch.id)}
                    >
                      {ch.label}
                    </button>
                  );
                })}
              </div>
              {chosen && (
                <p className="wgw-explain">
                  <strong>{correct ? "Right." : `Actually: ${answerChannel?.label}.`}</strong> {item.reason}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="wgw-foot">
        <p className="wgw-rule">
          <strong>Rule of thumb.</strong> Small changes go in the wiki. Medium changes go in a Slack #announcements post. Big changes go at the all-hands. Hard changes happen in person.
        </p>
        {stats.placed > 0 && (
          <button type="button" className="wgw-reset" onClick={reset}>
            start over
          </button>
        )}
      </div>

      <style>{`
        .wgw { display: grid; gap: 20px; }
        .wgw-top {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-end;
          flex-wrap: wrap;
        }
        .wgw-intro { max-width: 46ch; }
        .wgw-badge {
          display: inline-block;
          background: var(--plum-red);
          color: var(--fg-on-red);
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 1.5px;
          margin-bottom: 10px;
        }
        .wgw-title {
          font-family: var(--font-display);
          color: var(--fg-1);
          margin: 0 0 6px;
          font-size: clamp(20px, 2.4vw, 28px);
          letter-spacing: -0.03em;
        }
        .wgw-sub {
          font-family: var(--font-sans);
          color: var(--fg-2);
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
        }
        .wgw-score {
          text-align: right;
          display: grid;
          gap: 2px;
        }
        .wgw-score-num {
          font-family: var(--font-display);
          color: var(--plum-red);
          font-size: clamp(36px, 5vw, 52px);
          line-height: 0.9;
          letter-spacing: -0.03em;
        }
        .wgw-score-of {
          color: var(--fg-muted);
          font-size: 0.6em;
        }
        .wgw-score-label {
          font-family: var(--font-sans);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--fg-muted);
        }

        .wgw-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 14px;
        }
        .wgw-row {
          background: var(--cream);
          border: 1px solid var(--line-lavender);
          border-radius: 7px;
          padding: 18px 20px;
          transition: border-color 150ms ease-out;
        }
        .wgw-row.ok { border-color: var(--plum-red); background: var(--sev-blush); }
        .wgw-row.no { border-color: var(--line-lavender); background: var(--cream); }

        .wgw-q {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 14px;
        }
        .wgw-num {
          font-family: var(--font-display);
          color: var(--plum-red);
          font-size: 18px;
          min-width: 1.4ch;
        }
        .wgw-label {
          font-family: var(--font-display);
          color: var(--fg-1);
          font-size: clamp(16px, 1.6vw, 18px);
          line-height: 1.3;
        }

        .wgw-choices {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        @media (min-width: 560px) {
          .wgw-choices { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }

        .wgw-choice {
          background: var(--cream);
          border: 1px solid var(--line-lavender);
          border-radius: 1.5px;
          padding: 10px 12px;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          color: var(--fg-1);
          cursor: pointer;
          text-align: center;
          transition: all 150ms ease-out;
        }
        .wgw-choice:hover { border-color: var(--fg-1); }
        .wgw-choice.chosen { background: var(--fg-1); color: var(--fg-on-red); border-color: var(--fg-1); }
        .wgw-choice.chosen-right { background: var(--plum-red); border-color: var(--plum-red); color: var(--fg-on-red); }
        .wgw-choice.chosen-wrong { background: var(--fg-1); border-color: var(--fg-1); color: var(--fg-on-red); }
        .wgw-choice.reveal {
          border: 1px dashed var(--plum-red);
          color: var(--plum-red);
          background: var(--sev-blush);
        }

        .wgw-explain {
          margin: 12px 0 0;
          font-family: var(--font-sans);
          font-size: 14px;
          line-height: 1.5;
          color: var(--fg-1);
        }
        .wgw-explain strong {
          color: var(--plum-red);
          font-weight: 600;
        }

        .wgw-foot {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: baseline;
          flex-wrap: wrap;
          padding-top: 8px;
          border-top: 1px solid var(--line-lavender);
        }
        .wgw-rule {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--fg-2);
          max-width: 60ch;
        }
        .wgw-rule strong { color: var(--fg-1); font-weight: 600; }
        .wgw-reset {
          background: transparent;
          border: 1px solid var(--fg-1);
          color: var(--fg-1);
          border-radius: 1.5px;
          padding: 8px 16px;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          text-transform: lowercase;
          cursor: pointer;
          transition: color 150ms ease-out, border-color 150ms ease-out;
        }
        .wgw-reset:hover { color: var(--plum-red); border-color: var(--plum-red); }
      `}</style>
    </div>
  );
}
