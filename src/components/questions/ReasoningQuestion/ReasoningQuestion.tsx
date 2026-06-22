import './ReasoningQuestion.css';
import { ReasoningQuestionProps } from '../../../props';

function btnClass(answered: boolean, idx: number, chosen: number | null, ans: number): string {
  if (!answered) return 'nbtn';
  if (idx === chosen && idx === ans) return 'nbtn sel-ok';
  if (idx === chosen && idx !== ans) return 'nbtn sel-err';
  if (idx !== chosen && idx === ans) return 'nbtn reveal-ok';
  return 'nbtn';
}

function ReasoningQuestion({ question, answered, chosen, onAnswer }: ReasoningQuestionProps) {
  return (
    <>
      <div className="qlabel">Reasoning</div>
      <div className="r-stmt">{question.stmt}</div>
      <div className="r-q">{question.q}</div>
      <div className="r-btns">
        {question.opts.map((opt, i) => (
          <button
            key={i}
            className={btnClass(answered, i, chosen, question.ans)}
            disabled={answered}
            onClick={() => onAnswer(i)}
          >
            {opt}
          </button>
        ))}
      </div>
      <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '1.25rem', textAlign: 'center' }}>
        Keyboard: <kbd>1</kbd> or <kbd>2</kbd>
      </div>
    </>
  );
}

export default ReasoningQuestion;
