import './NumberQuestion.css';
import { NumberQuestionProps } from '../../../props';

function btnClass(answered: boolean, idx: number, chosen: number | null, ans: number, hideCorrect: boolean): string {
  if (!answered) return 'numbtn';
  if (hideCorrect) return idx === chosen ? 'numbtn sel-chosen' : 'numbtn';
  if (idx === chosen && idx === ans) return 'numbtn sel-ok';
  if (idx === chosen && idx !== ans) return 'numbtn sel-err';
  if (idx !== chosen && idx === ans) return 'numbtn reveal-ok';
  return 'numbtn';
}

function NumberQuestion({ question, answered, chosen, hideCorrect, onAnswer }: NumberQuestionProps) {
  return (
    <>
      <div className="qlabel">Number Speed &amp; Accuracy</div>
      <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
        Find the <strong>middle</strong> number, then click whichever of the other two is <strong>furthest</strong> from it.
      </p>
      <div className="num-btns">
        {question.nums.map((n, i) => (
          <button
            key={i}
            className={btnClass(answered, i, chosen, question.ans, hideCorrect)}
            disabled={answered}
            onClick={() => onAnswer(i)}
          >
            {n}
          </button>
        ))}
      </div>
      <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '1.5rem', textAlign: 'center' }}>
        Keyboard: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd>
      </div>
    </>
  );
}

export default NumberQuestion;
