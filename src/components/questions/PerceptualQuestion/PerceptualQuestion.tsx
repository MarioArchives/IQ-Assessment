import './PerceptualQuestion.css';
import { PerceptualQuestionProps } from '../../../props';

function btnClass(answered: boolean, idx: number, chosen: number | null, ans: number, hideCorrect: boolean): string {
  if (!answered) return 'cbtn';
  if (hideCorrect) return idx === chosen ? 'cbtn sel-chosen' : 'cbtn';
  if (idx === chosen && idx === ans) return 'cbtn sel-ok';
  if (idx === chosen && idx !== ans) return 'cbtn sel-err';
  if (idx !== chosen && idx === ans) return 'cbtn reveal-ok';
  return 'cbtn';
}

function PerceptualQuestion({ question, answered, chosen, hideCorrect, onAnswer }: PerceptualQuestionProps) {
  return (
    <>
      <div className="qlabel">Perceptual Speed</div>
      <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '1.25rem', textAlign: 'center' }}>
        How many column pairs share the same letter? (A = a)
      </p>
      <div className="perc-wrap">
        {question.top.map((t, i) => (
          <div key={i} className="perc-col">
            <div className="pc-top">{t}</div>
            <div className="pc-bot">{question.bot[i]}</div>
          </div>
        ))}
      </div>
      <div className="count-btns">
        {[0, 1, 2, 3, 4].map(n => (
          <button
            key={n}
            className={btnClass(answered, n, chosen, question.ans, hideCorrect)}
            disabled={answered}
            onClick={() => onAnswer(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '1.25rem', textAlign: 'center' }}>
        Keyboard: <kbd>0</kbd>–<kbd>4</kbd>
      </div>
    </>
  );
}

export default PerceptualQuestion;
