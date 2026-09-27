import { useState } from "react";
import { headcountBands } from "../content/guide";

export default function HeadcountStack() {
  const [index, setIndex] = useState(1); // default to 15

  const current = headcountBands[index];
  const preview = headcountBands[Math.min(index + 1, headcountBands.length - 1)];
  const atMax = index === headcountBands.length - 1;

  return (
    <div className="hc" role="group" aria-label="Your comms stack by headcount">
      <div className="hc-top">
        <div className="hc-intro">
          <span className="hc-badge">Interactive</span>
          <h3 className="hc-title">Your comms stack, by headcount</h3>
          <p className="hc-sub">
            Move the slider or tap a size. The guide is written for a range; this is the shortcut to the version for you today.
          </p>
        </div>
        <div className="hc-value" aria-live="polite">
          <span className="hc-value-num">{current.size}</span>
          <span className="hc-value-unit">people</span>
        </div>
      </div>

      <div className="hc-track">
        <input
          aria-label="Team size"
          type="range"
          min={0}
          max={headcountBands.length - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="hc-slider"
        />
        <div className="hc-ticks" role="tablist">
          {headcountBands.map((b, i) => (
            <button
              type="button"
              key={b.size}
              className={"hc-tick" + (i === index ? " on" : "")}
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
            >
              <span className="hc-tick-dot" aria-hidden="true"></span>
              <span className="hc-tick-num">{b.size}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="hc-cards">
        <article className="hc-card hc-now">
          <span className="hc-label">At {current.size} people, right now</span>
          <p>{current.now}</p>
        </article>
        <article className="hc-card hc-next">
          <span className="hc-label">
            {atMax ? "Beyond the guide" : `Add next, by ${preview.size}`}
          </span>
          <p>{atMax ? "Above 150 you are past the scope of this guide. The rituals hold; the tooling gets heavier." : preview.next}</p>
        </article>
      </div>

      <style>{`
        .hc {
          display: grid;
          gap: 24px;
        }
        .hc-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .hc-intro { max-width: 44ch; }
        .hc-badge {
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
        .hc-title {
          font-family: var(--font-display);
          color: var(--fg-1);
          margin: 0 0 6px;
          font-size: clamp(22px, 2.6vw, 30px);
          letter-spacing: -0.03em;
        }
        .hc-sub {
          font-family: var(--font-sans);
          color: var(--fg-2);
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
        }
        .hc-value {
          text-align: right;
          display: grid;
          gap: 2px;
        }
        .hc-value-num {
          font-family: var(--font-display);
          color: var(--plum-red);
          font-size: clamp(48px, 7vw, 72px);
          line-height: 0.9;
          letter-spacing: -0.03em;
        }
        .hc-value-unit {
          font-family: var(--font-sans);
          color: var(--fg-muted);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hc-track {
          padding: 24px 12px 8px;
          background: var(--cream);
          border: 1px solid var(--line-lavender);
          border-radius: 7px;
          box-shadow: var(--shadow-cta);
        }
        .hc-slider {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
          margin: 0;
          cursor: pointer;
        }
        .hc-slider:focus { outline: none; }
        .hc-slider::-webkit-slider-runnable-track {
          height: 3px;
          background: var(--line-lavender);
          border-radius: 999px;
        }
        .hc-slider::-moz-range-track {
          height: 3px;
          background: var(--line-lavender);
          border-radius: 999px;
        }
        .hc-slider::-webkit-slider-thumb {
          appearance: none;
          height: 26px;
          width: 26px;
          border-radius: 50%;
          background: var(--plum-red);
          border: 3px solid var(--cream);
          box-shadow: 0 2px 8px rgba(58, 14, 43, 0.25);
          margin-top: -12px;
          transition: transform 150ms ease-out;
        }
        .hc-slider::-webkit-slider-thumb:hover { transform: scale(1.08); }
        .hc-slider::-moz-range-thumb {
          height: 26px;
          width: 26px;
          border-radius: 50%;
          background: var(--plum-red);
          border: 3px solid var(--cream);
          box-shadow: 0 2px 8px rgba(58, 14, 43, 0.25);
        }
        .hc-slider:focus-visible::-webkit-slider-thumb {
          outline: 2px solid var(--plum-red-deep);
          outline-offset: 2px;
        }

        .hc-ticks {
          display: grid;
          grid-template-columns: repeat(${headcountBands.length}, 1fr);
          gap: 4px;
          margin-top: 12px;
        }
        .hc-tick {
          background: transparent;
          border: none;
          display: grid;
          gap: 4px;
          justify-items: center;
          padding: 4px 0 6px;
          cursor: pointer;
          border-radius: 4px;
          transition: color 150ms ease-out;
        }
        .hc-tick-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--line-lavender);
          transition: background 150ms ease-out, transform 150ms ease-out;
        }
        .hc-tick-num {
          font-family: var(--font-sans);
          color: var(--fg-muted);
          font-size: 13px;
          font-weight: 500;
          transition: color 150ms ease-out;
        }
        .hc-tick:hover .hc-tick-num { color: var(--fg-1); }
        .hc-tick:hover .hc-tick-dot { background: var(--fg-muted); }
        .hc-tick.on .hc-tick-dot {
          background: var(--plum-red);
          transform: scale(1.6);
        }
        .hc-tick.on .hc-tick-num {
          color: var(--plum-red);
          font-weight: 600;
        }

        .hc-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 720px) {
          .hc-cards { grid-template-columns: 1.3fr 1fr; }
        }
        .hc-card {
          background: var(--cream);
          border: 1px solid var(--line-lavender);
          border-radius: 7px;
          padding: 18px 20px;
        }
        .hc-card p {
          margin: 8px 0 0;
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.55;
          color: var(--fg-1);
        }
        .hc-label {
          display: block;
          font-family: var(--font-sans);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--plum-red);
          font-weight: 500;
        }
        .hc-next {
          border-style: dashed;
        }
        .hc-next .hc-label { color: var(--fg-muted); }
      `}</style>
    </div>
  );
}
