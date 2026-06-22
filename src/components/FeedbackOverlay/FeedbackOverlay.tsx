import './FeedbackOverlay.css';
import { FeedbackOverlayProps } from '../../props';

function FeedbackOverlay({ isOk, chosen, correctLabel, exp, isLast, onNext }: FeedbackOverlayProps) {
  const icon = isOk ? '✅' : chosen === -1 ? '⏰' : '❌';
  const title = isOk ? 'Correct!' : chosen === -1 ? "Time's Up!" : 'Incorrect';

  return (
    <div className="fb-overlay">
      <div className="fb-card">
        <div className="fb-icon">{icon}</div>
        <div className={`fb-title ${isOk ? 'ok' : 'err'}`}>{title}</div>
        {!isOk && (
          <div className="fb-ans">Correct answer: <strong>{correctLabel}</strong></div>
        )}
        <div className="fb-exp">{exp}</div>
        <button className="btn-next" onClick={onNext}>
          {isLast ? 'See Results →' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}

export default FeedbackOverlay;
