import './SpatialQuestion.css';
import { SpatialQuestionProps } from '../../../props';

function btnClass(answered: boolean, idx: number, chosen: number | null, ans: number, hideCorrect: boolean): string {
  if (!answered) return 'spbtn';
  if (hideCorrect) return idx === chosen ? 'spbtn sel-chosen' : 'spbtn';
  if (idx === chosen && idx === ans) return 'spbtn sel-ok';
  if (idx === chosen && idx !== ans) return 'spbtn sel-err';
  if (idx !== chosen && idx === ans) return 'spbtn reveal-ok';
  return 'spbtn';
}

function SpatialQuestion({ question, answered, chosen, hideCorrect, onAnswer }: SpatialQuestionProps) {
  const reveal = answered && !hideCorrect;

  return (
    <>
      <div className="qlabel">Spatial Visualisation</div>
      <p className="sp-note">
        Mirror pairs (<strong>R/Я</strong>, <strong>b/d</strong>, <strong>p/q</strong>) never match each other — only the same character matches.<br />
        How many boxes contain a <strong>matching pair</strong>?
      </p>
      <div className="sp-boxes">
        {question.boxes.map(([tc, tr, bc, br], i) => {
          const isMatch = tc === bc;
          const boxClass = reveal ? (isMatch ? 'sp-box sp-match' : 'sp-box sp-nomatch') : 'sp-box';
          return (
            <div key={i} className={boxClass}>
              <div
                className="sp-sym"
                style={{
                  transform: `rotate(${reveal ? 0 : tr}deg)`,
                  transition: reveal ? 'transform 0.45s ease-in-out' : undefined,
                }}
              >{tc}</div>
              <div className={reveal ? (isMatch ? 'sp-div sp-div-match' : 'sp-div') : 'sp-div'} />
              <div
                className="sp-sym"
                style={{
                  transform: `rotate(${reveal ? 0 : br}deg)`,
                  transition: reveal ? 'transform 0.45s ease-in-out' : undefined,
                }}
              >{bc}</div>
              {reveal && (
                <div className={`sp-verdict ${isMatch ? 'sp-v-ok' : 'sp-v-err'}`}>
                  {isMatch ? '✓' : '✗'}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="sp-btns">
        {[0, 1, 2].map(n => (
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
        Keyboard: <kbd>0</kbd> <kbd>1</kbd> <kbd>2</kbd>
      </div>
    </>
  );
}

export default SpatialQuestion;
