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
        <span className="interactive-badge">Interactive</span>
        <h4>Build your response-time policy</h4>
        <p className="rp-sub">{responseBuilder.intro}</p>
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
          <span className="rp-label">Your policy</span>
          <button onClick={copy} className="rp-copy">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre>{output}</pre>
      </div>

      <style>{`
        .rp { display: grid; gap: 12px; }
        .rp-top h4 { margin: 8px 0 4px; }
        .rp-sub { color: var(--ink-mute); margin: 0; }
        .rp-fields {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        @media (min-width: 720px) {
          .rp-fields { grid-template-columns: 1fr 1fr; }
        }
        .rp-field {
          display: grid;
          gap: 4px;
          padding: 12px 14px;
          background: var(--cream-2);
          border: 1px solid var(--line);
          border-radius: var(--r-md);
        }
        .rp-field label {
          font-family: var(--font-body);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--coral);
        }
        .rp-field select {
          background: var(--white);
          color: var(--deep-purple);
          border: 1px solid var(--line-strong);
          border-radius: 8px;
          padding: 8px 10px;
          font-family: var(--font-body);
          font-size: 0.95rem;
        }
        .rp-output {
          background: var(--deep-purple);
          color: var(--cream);
          border-radius: var(--r-md);
          padding: 16px 18px;
        }
        :root[data-theme="dark"] .rp-output,
        :root:not([data-theme="light"]) .rp-output {
          background: var(--cream-3);
          color: var(--ink);
        }
        .rp-output-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .rp-label {
          font-family: var(--font-body);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--coral);
        }
        .rp-copy {
          background: transparent;
          border: 1px solid var(--coral);
          color: var(--coral);
          border-radius: 999px;
          padding: 4px 12px;
          font-family: var(--font-body);
          font-size: 0.8rem;
          cursor: pointer;
        }
        .rp-copy:hover { background: var(--coral); color: var(--deep-purple); }
        .rp-output pre {
          font-family: var(--font-body);
          font-size: 0.9rem;
          line-height: 1.55;
          margin: 8px 0 0;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
}
