import './ProgressHeader.css';
import { ProgressHeaderProps } from '../../props';

function ProgressHeader({
  tag,
  qIdx,
  qsPerSection,
  sectionName,
  totalScore,
  totalDone,
  timerUrgent,
  barWidth,
  barColor,
  timerDisplay,
}: ProgressHeaderProps & { timerDisplay: string }) {
  const progressPct = (qIdx / qsPerSection) * 100;

  return (
    <>
      <div className="qhdr">
        <span className="qtag">{tag}</span>
        <div className="qprog">
          <div className="qprog-txt">
            <span>Q{qIdx + 1} of {qsPerSection} · {sectionName}</span>
            <span>Score: {totalScore}/{totalDone}</span>
          </div>
          <div className="qprog-bar">
            <div className="qprog-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div className={`qtimer${timerUrgent ? ' urgent' : ''}`}>{timerDisplay}</div>
      </div>
      <div className="tbar">
        <div className="tbar-fill" style={{ width: `${barWidth}%`, background: barColor }} />
      </div>
    </>
  );
}

export default ProgressHeader;
