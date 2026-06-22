import './SpatialQuestion.css';
import { SpatialQuestionProps } from '../../../props';

function btnClass(answered: boolean, idx: number, chosen: number | null, ans: number): string {
  if (!answered) return 'spbtn';
  if (idx === chosen && idx === ans) return 'spbtn sel-ok';
  if (idx === chosen && idx !== ans) return 'spbtn sel-err';
  if (idx !== chosen && idx === ans) return 'spbtn reveal-ok';
  return 'spbtn';
}

function SpatialQuestion({ question, answered, chosen, onAnswer }: SpatialQuestionProps) {
  return (
    <>
      <div className="qlabel">Spatial Visualisation</div>
      <p className="sp-note">
        Mirror pairs (<strong>R/Я</strong>, <strong>b/d</strong>, <strong>p/q</strong>) never match each other — only the same character matches.<br />
        How many boxes contain a <strong>matching pair</strong>?
      </p>
      <div className="sp-boxes">
        {question.boxes.map(([tc, tr, bc, br], i) => (
          <div key={i} className="sp-box">
            <div className="sp-sym" style={{ transform: `rotate(${tr}deg)` }}>{tc}</div>
            <div className="sp-div" />
            <div className="sp-sym" style={{ transform: `rotate(${br}deg)` }}>{bc}</div>
          </div>
        ))}
      </div>
      <div className="sp-btns">
        {[0, 1, 2].map(n => (
          <button
            key={n}
            className={btnClass(answered, n, chosen, question.ans)}
            disabled={answered}
            onClick={() => onAnswer(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '1.25rem', textAlign: 'center' }}>
        Keyboard: <kbd>0</kbd> <kbd>1</kbd> <kbd>2</kbd>
      </div>
    </>
  );
}

export default SpatialQuestion;
