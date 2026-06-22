import './WordQuestion.css';
import { WordQuestionProps } from '../../../props';

function btnClass(answered: boolean, idx: number, chosen: number | null, ans: number): string {
  if (!answered) return 'wbtn';
  if (idx === chosen && idx === ans) return 'wbtn sel-ok';
  if (idx === chosen && idx !== ans) return 'wbtn sel-err';
  if (idx !== chosen && idx === ans) return 'wbtn reveal-ok';
  return 'wbtn';
}

function WordQuestion({ question, answered, chosen, onAnswer }: WordQuestionProps) {
  return (
    <>
      <div className="qlabel">Word Meaning</div>
      <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
        Two words are related (same meaning or opposites). Click the <strong>odd one out</strong>.
      </p>
      <div className="word-btns">
        {question.words.map((w, i) => (
          <button
            key={i}
            className={btnClass(answered, i, chosen, question.ans)}
            disabled={answered}
            onClick={() => onAnswer(i)}
          >
            {w}
          </button>
        ))}
      </div>
      <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '1.25rem', textAlign: 'center' }}>
        Keyboard: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd>
      </div>
    </>
  );
}

export default WordQuestion;
