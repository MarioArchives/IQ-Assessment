import { useState } from 'react';
import './WelcomeScreen.css';
import { WelcomeScreenProps, Mode, TimerSecs } from '../../props';

function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [mode, setMode] = useState<Mode>('practice');
  const [timerSecs, setTimerSecs] = useState<TimerSecs>(10);

  function handleStart() {
    const effectiveTimer: TimerSecs = mode === 'assessment' ? 0 : timerSecs;
    onStart(mode, effectiveTimer);
  }

  return (
    <div id="sw">
      <div className="w-icon">🧠</div>
      <h1 className="w-title">Thomas GIA Practice</h1>
      <p className="w-sub">300 authentic GIA-style questions across all five task types — timed just like the real assessment.</p>
      <div className="pills">
        <span className="pill">Task 1 · Reasoning</span>
        <span className="pill">Task 2 · Perceptual Speed</span>
        <span className="pill">Task 3 · Number Speed</span>
        <span className="pill">Task 4 · Word Meaning</span>
        <span className="pill">Task 5 · Spatial Visualisation</span>
      </div>
      <div className="mode-row">
        <button
          className={`mode-btn${mode === 'practice' ? ' on' : ''}`}
          onClick={() => setMode('practice')}
        >
          Practice
        </button>
        <button
          className={`mode-btn${mode === 'assessment' ? ' on' : ''}`}
          onClick={() => setMode('assessment')}
        >
          Assessment
        </button>
      </div>
      {mode === 'practice' && (
        <div className="toggle-row" id="timer-row">
          <label>Timer per question:</label>
          <div className="tg">
            <button className={timerSecs === 0 ? 'on' : ''} onClick={() => setTimerSecs(0)}>Off</button>
            <button className={timerSecs === 10 ? 'on' : ''} onClick={() => setTimerSecs(10)}>10 s</button>
            <button className={timerSecs === 6 ? 'on' : ''} onClick={() => setTimerSecs(6)}>6 s</button>
          </div>
        </div>
      )}
      <button className="btn-start" onClick={handleStart}>
        {mode === 'practice' ? 'Start Practice Test →' : 'Start Assessment →'}
      </button>
      <div className="w-stats">
        <div><strong>300</strong>Questions</div>
        <div><strong>5</strong>Task Types</div>
        <div><strong>~10 min</strong>Estimated</div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
