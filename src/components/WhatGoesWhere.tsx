import { useMemo, useState } from "react";
import { wgwChannels, wgwItems } from "../content/guide";

type Placement = Record<string, string | undefined>;

export default function WhatGoesWhere() {
  const [placement, setPlacement] = useState<Placement>({});
  const [dragging, setDragging] = useState<string | null>(null);

  const placedItems = useMemo(() => new Set(Object.keys(placement)), [placement]);

  function place(itemId: string, channelId: string) {
    setPlacement((p) => ({ ...p, [itemId]: channelId }));
  }

  function clearItem(itemId: string) {
    setPlacement((p) => {
      const next = { ...p };
      delete next[itemId];
      return next;
    });
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

  return (
    <div className="wgw">
      <div className="wgw-top">
        <div>
          <span className="interactive-badge">Interactive</span>
          <h4>What goes where</h4>
          <p className="wgw-sub">
            Drag each kind of news to the channel that fits it. On tap, pick a channel from the row below the card.
            Right answers get a coral border.
          </p>
        </div>
        <div className="wgw-score">
          <span className="wgw-score-num">
            {stats.correct}/{stats.placed || 0}
          </span>
          <span className="wgw-score-label">right so far</span>
        </div>
      </div>

      <div className="wgw-grid">
        <div className="wgw-items">
          {wgwItems.map((item) => {
            const c = placement[item.id];
            const correct = c && c === item.answer;
            const wrong = c && c !== item.answer;
            const answerChannel = wgwChannels.find((ch) => ch.id === item.answer);
            return (
              <div
                key={item.id}
                className={
                  "wgw-item" + (correct ? " ok" : "") + (wrong ? " no" : "") + (dragging === item.id ? " drag" : "")
                }
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", item.id);
                  e.dataTransfer.effectAllowed = "move";
                  setDragging(item.id);
                }}
                onDragEnd={() => setDragging(null)}
              >
                <div className="wgw-item-row">
                  <span className="wgw-item-label">{item.label}</span>
                  {c && (
                    <button className="wgw-clear" onClick={() => clearItem(item.id)} aria-label="Clear">
                      reset
                    </button>
                  )}
                </div>
                {c && (
                  <p className="wgw-hint">
                    {correct ? "Right." : `Actually: ${answerChannel?.label}.`} {item.reason}
                  </p>
                )}
                <div className="wgw-tapbar">
                  {wgwChannels.map((ch) => (
                    <button
                      key={ch.id}
                      className={"wgw-tap" + (c === ch.id ? " on" : "")}
                      onClick={() => place(item.id, ch.id)}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="wgw-channels">
          {wgwChannels.map((ch) => {
            const items = wgwItems.filter((i) => placement[i.id] === ch.id);
            return (
              <div
                key={ch.id}
                className="wgw-channel"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/plain");
                  if (id) place(id, ch.id);
                  setDragging(null);
                }}
              >
                <span className="wgw-channel-label">{ch.label}</span>
                <ul>
                  {items.length === 0 && <li className="wgw-empty">Drop here</li>}
                  {items.map((i) => (
                    <li key={i.id}>{i.label}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <p className="wgw-note">
        Rule of thumb. Small changes go in the wiki. Medium changes go in a Slack #announcements post. Big changes go
        at the all-hands. Hard changes happen in person.
      </p>

      <style>{`
        .wgw { display: grid; gap: 16px; }
        .wgw-top { display: flex; justify-content: space-between; gap: 20px; align-items: flex-end; flex-wrap: wrap; }
        .wgw-top h4 { margin: 8px 0 4px; }
        .wgw-sub { color: var(--ink-mute); margin: 0; max-width: 60ch; }
        .wgw-score { text-align: right; }
        .wgw-score-num { font-family: var(--font-display); color: var(--coral); font-size: 1.6rem; }
        .wgw-score-label { display: block; color: var(--ink-mute); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; }
        .wgw-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 900px) {
          .wgw-grid { grid-template-columns: 1.3fr 1fr; }
        }
        .wgw-items { display: grid; gap: 10px; }
        .wgw-item {
          border: 1px solid var(--line);
          border-radius: var(--r-md);
          padding: 10px 12px;
          background: var(--cream-2);
          cursor: grab;
        }
        .wgw-item.drag { opacity: 0.6; }
        .wgw-item.ok { border-color: var(--coral); background: var(--coral-soft); }
        .wgw-item.no { border-color: var(--line-strong); background: var(--cream-3); }
        .wgw-item-row { display: flex; justify-content: space-between; gap: 10px; align-items: baseline; }
        .wgw-item-label { color: var(--deep-purple); font-weight: 500; }
        .wgw-clear {
          background: transparent;
          border: none;
          color: var(--ink-mute);
          font-family: var(--font-body);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
        }
        .wgw-clear:hover { color: var(--coral); }
        .wgw-hint { color: var(--ink); font-size: 0.85rem; margin: 6px 0 0; }
        .wgw-tapbar {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 4px;
          margin-top: 8px;
        }
        .wgw-tap {
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 4px 6px;
          font-family: var(--font-body);
          font-size: 0.7rem;
          color: var(--ink-mute);
          cursor: pointer;
        }
        .wgw-tap.on { background: var(--coral); color: var(--white); border-color: var(--coral); }
        :root[data-theme="dark"] .wgw-tap.on,
        :root:not([data-theme="light"]) .wgw-tap.on { color: #1a0a06; }
        .wgw-channels { display: grid; gap: 10px; }
        .wgw-channel {
          border: 1px dashed var(--line-strong);
          border-radius: var(--r-md);
          padding: 10px 12px;
          min-height: 78px;
          background: var(--cream);
        }
        .wgw-channel-label {
          font-family: var(--font-display);
          color: var(--deep-purple);
          font-size: 0.95rem;
        }
        .wgw-channel ul { margin: 6px 0 0; padding-left: 16px; }
        .wgw-empty { list-style: none; padding-left: 0; color: var(--ink-mute); font-size: 0.85rem; }
        .wgw-note {
          color: var(--ink-mute);
          font-size: 0.85rem;
          margin: 4px 0 0;
        }
      `}</style>
    </div>
  );
}
