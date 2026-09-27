import { useState } from "react";
import { decisionTree } from "../content/guide";

type OutcomeKey = keyof typeof decisionTree.outcomes;
type Node = string | OutcomeKey;

export default function DecisionTree() {
  const [path, setPath] = useState<string[]>([]);
  const [node, setNode] = useState<Node>(decisionTree.questions[0].id);

  const question = decisionTree.questions.find((q) => q.id === node);
  const outcome = !question ? decisionTree.outcomes[node as OutcomeKey] : null;

  function choose(next: string, label: string) {
    setPath((p) => [...p, label]);
    setNode(next);
  }

  function reset() {
    setPath([]);
    setNode(decisionTree.questions[0].id);
  }

  const step = path.length + (outcome ? 0 : 1);
  const totalSteps = decisionTree.questions.length;

  return (
    <div className="dt">
      <div className="dt-top">
        <span className="dt-badge">Interactive</span>
        <h4 className="dt-title">Slack, email, or meeting?</h4>
        <p className="dt-sub">Three questions. Takes fifteen seconds. Answer them the way you would for a real situation on your desk today.</p>
      </div>

      <div className="dt-progress" aria-hidden="true">
        <span className="dt-step">Step {Math.min(step, totalSteps)} of {totalSteps}</span>
        <div className="dt-bar"><div className="dt-bar-fill" style={{ width: `${(Math.min(step, totalSteps) / totalSteps) * 100}%` }} /></div>
      </div>

      {question && (
        <div className="dt-card">
          <p className="dt-q">{question.prompt}</p>
          <div className="dt-choices">
            {question.options.map((opt) => (
              <button
                key={opt.label}
                type="button"
                className="dt-choice"
                onClick={() => choose(opt.next, opt.label)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {outcome && (
        <div className="dt-card dt-outcome">
          <span className="dt-outcome-label">Recommendation</span>
          <h5>{outcome.recommendation}</h5>
          <p>{outcome.body}</p>
          <p className="dt-trail">Your path: {path.join(" → ")}</p>
          <button type="button" className="dt-reset" onClick={reset}>start over</button>
        </div>
      )}

      <style>{`
        .dt { display: grid; gap: 20px; }
        .dt-top { max-width: 60ch; }
        .dt-badge {
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
        .dt-title {
          font-family: var(--font-display);
          color: var(--fg-1);
          margin: 0 0 6px;
          font-size: clamp(22px, 2.6vw, 28px);
          letter-spacing: -0.03em;
        }
        .dt-sub {
          font-family: var(--font-sans);
          color: var(--fg-2);
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
        }
        .dt-progress {
          display: grid;
          gap: 6px;
        }
        .dt-step {
          font-family: var(--font-sans);
          color: var(--fg-muted);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .dt-bar {
          height: 3px;
          background: var(--line-lavender);
          border-radius: 999px;
          overflow: hidden;
        }
        .dt-bar-fill {
          height: 100%;
          background: var(--plum-red);
          transition: width 200ms ease-out;
        }
        .dt-card {
          background: var(--cream);
          border: 1px solid var(--line-lavender);
          border-radius: 10px;
          padding: 24px 26px;
          box-shadow: var(--shadow-cta);
        }
        .dt-q {
          font-family: var(--font-display);
          color: var(--fg-1);
          font-size: clamp(20px, 2.2vw, 24px);
          line-height: 1.3;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
        }
        .dt-choices {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .dt-choice {
          background: var(--fg-1);
          color: var(--fg-on-red);
          border: 1px solid var(--fg-1);
          border-radius: 1.5px;
          padding: 14px 22px;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 500;
          text-transform: lowercase;
          cursor: pointer;
          transition: background 150ms ease-out, transform 150ms ease-out;
        }
        .dt-choice:hover {
          background: var(--plum-red);
          border-color: var(--plum-red);
          transform: translateY(-1px);
        }
        .dt-outcome {
          border-left: 3px solid var(--plum-red);
        }
        .dt-outcome-label {
          display: block;
          font-family: var(--font-sans);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--plum-red);
          margin-bottom: 8px;
          font-weight: 500;
        }
        .dt-outcome h5 {
          font-family: var(--font-display);
          color: var(--fg-1);
          margin: 0 0 10px;
          font-size: clamp(20px, 2.2vw, 26px);
          letter-spacing: -0.02em;
        }
        .dt-outcome p {
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.55;
          color: var(--fg-1);
          margin: 0 0 12px;
        }
        .dt-trail {
          color: var(--fg-muted);
          font-size: 13px;
          font-style: italic;
        }
        .dt-reset {
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
          margin-top: 8px;
        }
        .dt-reset:hover { color: var(--plum-red); border-color: var(--plum-red); }
      `}</style>
    </div>
  );
}
