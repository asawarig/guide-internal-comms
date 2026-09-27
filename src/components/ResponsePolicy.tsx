import { useMemo, useState } from "react";
import { responseBuilder } from "../content/guide";

type Values = Record<string, string>;

const defaults: Values = Object.fromEntries(
  responseBuilder.fields.map((f) => [f.id, f.default])
);

export default function ResponsePolicy() {
  const [values, setValues] = useState<Values>(defaults);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    return [
      "Our response-time policy",
      "",
      `Default expected response time: ${values.default}.`,
      `Hours that count as on: ${values.hours}.`,
      `What counts as urgent: ${values.urgent}.`,
      `Who can override quiet hours: ${values.override}.`,
      "",
      "Anything outside those hours can wait until the next working morning. If it is genuinely urgent, per the definition above, call. Do not expect a reply to a Slack ping.",
    ].join("\n");
  }, [values]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      setCopied(false);
    }
  }

  return (
    <div className="rp">
      <div className="rp-top">
        <span className="rp-badge">Interactive</span>
        <h4 className="rp-title">Build your response-time policy</h4>
        <p className="rp-sub">Four choices. One paragraph out the other side, ready to paste into your wiki.</p>
      </div>

      <div className="rp-fields">
        {responseBuilder.fields.map((field) => (
          <div className="rp-field" key={field.id}>
            <label htmlFor={"rp-" + field.id}>{field.label}</label>
            <select
              id={"rp-" + field.id}
              value={values[field.id]}
              onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
            >
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="rp-output">
        <div className="rp-output-head">
          <span className="rp-label">Your policy, ready to copy</span>
          <button type="button" onClick={copy} className="rp-copy">
            {copied ? "copied" : "copy"}
          </button>
        </div>
        <pre>{output}</pre>
      </div>

      <style>{`
        .rp { display: grid; gap: 20px; }
        .rp-top { max-width: 60ch; }
        .rp-badge {
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
          margin-bottom: 12px;
        }
        .rp-title {
          font-family: var(--font-display);
          color: var(--fg-1);
          margin: 0 0 6px;
          font-size: clamp(22px, 2.6vw, 28px);
          letter-spacing: -0.03em;
        }
        .rp-sub {
          font-family: var(--font-sans);
          color: var(--fg-2);
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
        }

        .rp-fields {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .rp-fields { grid-template-columns: 1fr 1fr; }
        }
        .rp-field {
          display: grid;
          gap: 6px;
          padding: 16px 18px;
          background: var(--cream);
          border: 1px solid var(--line-lavender);
          border-radius: 8px;
        }
        .rp-field label {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--plum-red);
        }
        .rp-field select {
          background: transparent;
          color: var(--fg-1);
          border: none;
          border-bottom: 1px solid var(--line-lavender);
          padding: 6px 0 8px;
          font-family: var(--font-sans);
          font-size: 15px;
          appearance: none;
          -webkit-appearance: none;
          background-image: linear-gradient(45deg, transparent 50%, var(--fg-muted) 50%), linear-gradient(135deg, var(--fg-muted) 50%, transparent 50%);
          background-position: calc(100% - 12px) calc(50% + 2px), calc(100% - 6px) calc(50% + 2px);
          background-size: 6px 6px, 6px 6px;
          background-repeat: no-repeat;
          padding-right: 24px;
          cursor: pointer;
        }
        .rp-field select:focus {
          outline: none;
          border-bottom-color: var(--plum-red);
        }

        .rp-output {
          background: var(--fg-1);
          color: var(--cream);
          border-radius: 10px;
          padding: 20px 22px;
        }
        .rp-output-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }
        .rp-label {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--plum-red);
        }
        .rp-copy {
          background: transparent;
          border: 1px solid var(--plum-red);
          color: var(--plum-red);
          border-radius: 999px;
          padding: 4px 14px;
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 500;
          text-transform: lowercase;
          cursor: pointer;
          transition: background 150ms ease-out, color 150ms ease-out;
        }
        .rp-copy:hover { background: var(--plum-red); color: var(--fg-on-red); }
        .rp-output pre {
          font-family: var(--font-sans);
          font-size: 14.5px;
          line-height: 1.55;
          margin: 8px 0 0;
          white-space: pre-wrap;
          color: inherit;
        }
      `}</style>
    </div>
  );
}
