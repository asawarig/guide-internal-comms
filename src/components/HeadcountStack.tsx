import { useState } from "react";
import { headcountBands } from "../content/guide";

const THUMB_RADIUS_PX = 13; // half of the 26px slider thumb

export default function HeadcountStack() {
  const [index, setIndex] = useState(1); // default to 15
  const current = headcountBands[index];
  const preview = headcountBands[Math.min(index + 1, headcountBands.length - 1)];
  const atMax = index === headcountBands.length - 1;

  return (
    <div className="hc" role="group" aria-label="Your comms stack by headcount">
      <div className="hc-top">
        <p className="hc-sub">
          Move the slider or tap a size. The guide is written for a range; this is the shortcut to the version for you today.
        </p>
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
        <div className="hc-ticks-track">
          {headcountBands.map((b, i) => {
            const pct = (i / (headcountBands.length - 1)) * 100;
            return (
              <button
                type="button"
                key={b.size}
                className={"hc-tick" + (i === index ? " on" : "")}
                aria-label={`${b.size} people`}
                aria-pressed={i === index}
                style={{ left: `${pct}%` }}
                onClick={() => setIndex(i)}
              >
                {b.size}
              </button>
            );
          })}
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
          <p>
            {atMax
              ? "Above 150 you are past the scope of this guide. The rituals hold; the tooling gets heavier."
              : preview.next}
          </p>
        </article>
      </div>

      <style>{`
        .hc { display: grid; gap: 28px; }
        .hc-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .hc-sub {
          font-family: var(--font-sans);
          color: var(--fg-2);
          margin: 0;
          max-width: 44ch;
          font-size: 15px;
          line-height: 1.5;
        }
        .hc-value {
          text-align: right;
          display: grid;
          gap: 2px;
          justify-items: end;
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
          padding: 20px ${THUMB_RADIUS_PX}px 6px;
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

        /* Tick track: matches the thumb's travel range exactly. */
        .hc-ticks-track {
          position: relative;
          height: 28px;
          margin-top: 10px;
        }
        .hc-tick {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          background: transparent;
          border: none;
          padding: 6px 4px;
          cursor: pointer;
          font-family: var(--font-sans);
          color: var(--fg-muted);
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
          transition: color 150ms ease-out;
        }
        .hc-tick:hover { color: var(--fg-1); }
        .hc-tick.on {
          color: var(--plum-red);
          font-weight: 600;
        }

        .hc-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 720px) {
          .hc-cards { grid-template-columns: 1.35fr 1fr; }
        }
        .hc-card {
          background: var(--cream);
          border: 1px solid var(--line-lavender);
          border-radius: 7px;
          padding: 20px 22px;
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
        .hc-next { border-style: dashed; }
        .hc-next .hc-label { color: var(--fg-muted); }
      `}</style>
    </div>
  );
}
