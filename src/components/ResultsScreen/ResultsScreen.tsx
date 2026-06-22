import './ResultsScreen.css';
import { ResultsScreenProps } from '../../props';

function ResultsScreen({ mode, totalScore, totalDone, elapsed, sScores, sections, onRestart }: ResultsScreenProps) {
  const pct = Math.round((totalScore / totalDone) * 100);

  // GIA scoring
  const secPerQ = elapsed / totalDone;
  const slowRatio = Math.max(1, secPerQ / 8);
  const timePenalty = Math.min(0.30, 0.09 * Math.log2(slowRatio));
  const rawAcc = totalScore / totalDone;
  const adjAcc = rawAcc * (1 - timePenalty);
  const giaEst = Math.round(100 + 15 * (adjAcc - 0.55) / 0.12);
  const giaScore = Math.max(60, Math.min(145, giaEst));

  const band = giaScore >= 130 ? 'Exceptional'
             : giaScore >= 115 ? 'Above average'
             : giaScore >= 85  ? 'Average'
             : giaScore >= 70  ? 'Below average'
             :                   'Low';

  const assessMsgs: [number, string][] = [
    [130, 'Exceptional result — well above the GIA average.'],
    [115, 'Above average — strong performance under assessment conditions.'],
    [85,  'Average range — consistent with typical GIA candidates.'],
    [0,   'Below average — practise speed and accuracy together for improvement.'],
  ];

  const practiceMsgs: [number, string][] = [
    [90, "Outstanding! You're well prepared for the real GIA."],
    [75, "Great performance! A bit more practice and you'll ace it."],
    [60, "Good foundation. Focus on your weaker sections for improvement."],
    [0,  "Keep practising — review the explanations to build speed and confidence."],
  ];

  const msgScore = mode === 'assessment' ? giaScore : pct;
  const msgs = mode === 'assessment' ? assessMsgs : practiceMsgs;
  const msg = msgs.find(([t]) => msgScore >= t)?.[1] ?? msgs[msgs.length - 1][1];

  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;

  return (
    <div id="sr">
      <div className="res-card">
        <h2 className="res-title">{mode === 'assessment' ? 'Assessment Complete!' : 'Practice Complete!'}</h2>
        <p className="res-sub">Here's how you performed across all 5 tasks</p>
        <div className="score-ring">
          <div className="ring-pct">{pct}%</div>
          <div className="ring-lbl">Correct</div>
        </div>

        {mode === 'assessment' && (
          <>
            <p className="res-time">Time: {m}m {s}s  ·  {totalScore}/{totalDone} correct</p>
            <div id="res-assess">
              <div className="assess-grid">
                <div className="assess-metric">
                  <div className="assess-val">{secPerQ.toFixed(1)}s</div>
                  <div className="assess-lbl">sec per<br />question</div>
                </div>
                <div className="assess-metric">
                  <div className="assess-val">{Math.round(adjAcc * 100)}%</div>
                  <div className="assess-lbl">time-adjusted<br />accuracy</div>
                </div>
                <div className="assess-metric">
                  <div className="assess-val">{giaScore}</div>
                  <div className="assess-lbl">GIA score<br />estimate</div>
                </div>
              </div>
              <div className="assess-band">{band}</div>
              <p className="assess-note">
                Accuracy is adjusted for pace using the log-linear time-penalty model from speeded intelligence test research (~9% drop per 2× slower than GIA benchmark of 8 s/q). GIA estimate is normed to mean 100, SD 15.
              </p>
            </div>
          </>
        )}

        <div className="sec-scores">
          {sections.map((sec, i) => {
            const score = sScores[i];
            const p = score.t > 0 ? Math.round((score.c / score.t) * 100) : 0;
            return (
              <div key={sec.id} className="ssr">
                <div className="ssr-hdr">
                  <span className="ssr-name">{sec.name}</span>
                  <span className="ssr-val">{score.c}/{score.t} ({p}%)</span>
                </div>
                <div className="ssr-bar">
                  <div className="ssr-fill" style={{ width: `${p}%`, background: sec.color }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="res-msg">{msg}</div>
        <div className="res-acts">
          <button className="btn-restart" onClick={onRestart}>Try Again</button>
        </div>
      </div>
    </div>
  );
}

export default ResultsScreen;
