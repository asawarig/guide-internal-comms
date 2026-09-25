import { useMemo, useState } from "react";
import { headcountBands } from "../content/guide";

const sizes = headcountBands.map((b) => b.size);

export default function HeadcountStack() {
  const [index, setIndex] = useState(1); // default to 15

  const current = headcountBands[index];
  const preview = headcountBands[Math.min(index + 1, headcountBands.length - 1)];

  const marks = useMemo(
    () =>
      sizes.map((size, i) => ({
        size,
        pct: (i / (sizes.length - 1)) * 100,
      })),
    []
  );

  return (
    <div className="hc" role="group" aria-label="Your comms stack by headcount">
      <div className="hc-top">
        <div>
          <span className="interactive-badge">Interactive</span>
          <h3 className="hc-title">Your comms stack by headcount</h3>
          <p className="hc-sub">
            Move the slider to your team size. The rest of the guide is written for a range, this is the shortcut to
            the version for you today.
          </p>
        </div>
        <div className="hc-value">
          <span className="hc-value-num">{current.label}</span>
        </div>
      </div>

      <input
        aria-label="Team size"
        type="range"
        min={0}
        max={sizes.length - 1}
        step={1}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        list="hc-marks"
        className="hc-slider"
      />
      <datalist id="hc-marks">
        {marks.map((m) => (
          <option key={m.size} value={sizes.indexOf(m.size)} label={String(m.size)} />
        ))}
      </datalist>
      <div className="hc-ticks" aria-hidden="true">
        {marks.map((m, i) => (
          <button
            type="button"
            key={m.size}
            className={"hc-tick" + (i === index ? " on" : "")}
            onClick={() => setIndex(i)}
          >
            {m.size}
          </button>
        ))}
      </div>

      <div className="hc-cards">
        <article className="hc-card hc-now">
          <span className="hc-label">Now, at {current.label}</span>
          <p>{current.now}</p>
        </article>
        <article className="hc-card hc-next">
          <span className="hc-label">Add next → {preview.label}</span>
          <p>{preview.next === current.next ? "You are at the outer edge of this guide." : preview.now}</p>
        </article>
      </div>

      <style>{`
        .hc { display: grid; gap: 16px; }
        .hc-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .hc-title { margin: 8px 0 4px; }
        .hc-sub { color: var(--ink-mute); margin: 0; max-width: 52ch; }
        .hc-value-num {
          font-family: var(--font-display);
          color: var(--coral);
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1;
        }
        .hc-slider {
          appearance: none;
          width: 100%;
          background: transparent;
          margin-top: 8px;
        }
        .hc-slider::-webkit-slider-runnable-track {
          height: 4px;
          background: var(--line-strong);
          border-radius: 999px;
        }
        .hc-slider::-moz-range-track {
          height: 4px;
          background: var(--line-strong);
          border-radius: 999px;
        }
        .hc-slider::-webkit-slider-thumb {
          appearance: none;
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: var(--coral);
          border: 3px solid var(--white);
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          margin-top: -9px;
        }
        .hc-slider::-moz-range-thumb {
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: var(--coral);
          border: 3px solid var(--white);
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        .hc-ticks {
          display: grid;
          grid-template-columns: repeat(${sizes.length}, 1fr);
          gap: 4px;
          margin-top: 2px;
        }
        .hc-tick {
          background: transparent;
          border: none;
          color: var(--ink-mute);
          font-family: var(--font-body);
          font-size: 0.72rem;
          padding: 4px 0 0;
          cursor: pointer;
        }
        .hc-tick.on { color: var(--coral); font-weight: 600; }
        .hc-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 4px;
        }
        @media (min-width: 720px) {
          .hc-cards { grid-template-columns: 1.4fr 1fr; }
        }
        .hc-card {
          background: var(--cream-2);
          border: 1px solid var(--line);
          border-radius: var(--r-md);
          padding: 16px 18px;
        }
        .hc-card p { margin: 6px 0 0; }
        .hc-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--coral);
        }
        .hc-next {
          background: transparent;
          border-style: dashed;
          border-color: var(--line-strong);
        }
      `}</style>
    </div>
  );
}
