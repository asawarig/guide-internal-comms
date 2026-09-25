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

  return (
    <div className="dt">
      <div className="dt-top">
        <span className="interactive-badge">Interactive</span>
        <h4>Slack, email, or meeting?</h4>
        <p className="dt-sub">{decisionTree.intro}</p>
      </div>

      {question && (
        <div className="dt-card">
          <p className="dt-q">{question.prompt}</p>
          <div className="dt-choices">
            {question.options.map((opt) => (
              <button
                key={opt.label}
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
          <p className="dt-trail">Your answers: {path.join(" → ")}</p>
          <button className="dt-reset" onClick={reset}>
            Start over
          </button>
        </div>
      )}

      <style>{`
        .dt { display: grid; gap: 12px; }
        .dt-top h4 { margin: 8px 0 4px; }
        .dt-sub { color: var(--ink-mute); margin: 0; }
        .dt-card {
          background: var(--cream-2);
          border: 1px solid var(--line);
          border-radius: var(--r-md);
          padding: 16px 18px;
        }
        .dt-q { font-family: var(--font-display); color: var(--deep-purple); font-size: 1.1rem; margin: 0 0 12px; }
        .dt-choices { display: flex; gap: 8px; flex-wrap: wrap; }
        .dt-choice {
          background: var(--white);
          color: var(--deep-purple);
          border: 1px solid var(--line-strong);
          border-radius: 999px;
          padding: 8px 18px;
          font-family: var(--font-body);
          font-size: 0.95rem;
          cursor: pointer;
        }
        .dt-choice:hover { border-color: var(--coral); color: var(--coral); }
        .dt-outcome { border-left: 3px solid var(--coral); }
        .dt-outcome-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--coral);
          margin-bottom: 6px;
        }
        .dt-outcome h5 {
          font-family: var(--font-display);
          color: var(--deep-purple);
          margin: 0 0 8px;
          font-size: 1.15rem;
        }
        .dt-trail { color: var(--ink-mute); font-size: 0.8rem; margin: 8px 0 12px; }
        .dt-reset {
          background: transparent;
          border: 1px solid var(--line-strong);
          border-radius: 999px;
          padding: 6px 14px;
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--deep-purple);
          cursor: pointer;
        }
        .dt-reset:hover { border-color: var(--coral); color: var(--coral); }
      `}</style>
    </div>
  );
}
