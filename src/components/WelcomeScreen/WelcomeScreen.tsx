import { useState } from 'react';
import './WelcomeScreen.css';
import { WelcomeScreenProps, Mode, TimerSecs } from '../../props';
import { SECTIONS, QS_PER_SECTION } from '../../constants/data';

function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [mode, setMode] = useState<Mode>('practice');
  const [timerSecs, setTimerSecs] = useState<TimerSecs>(10);
  const [selectedIds, setSelectedIds] = useState<string[]>(SECTIONS.map(s => s.id));

  function toggleSection(id: string) {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter(x => x !== id);
      }
      return [...prev, id].sort((a, b) =>
        SECTIONS.findIndex(s => s.id === a) - SECTIONS.findIndex(s => s.id === b)
      );
    });
  }

  function handleStart() {
    const effectiveTimer: TimerSecs = mode === 'assessment' ? 0 : timerSecs;
    onStart(mode, effectiveTimer, selectedIds);
  }

  const totalQ = QS_PER_SECTION * selectedIds.length;
  const estMin = selectedIds.length * 2;

  return (
    <div id="sw">
      <div className="w-icon">🧠</div>
      <h1 className="w-title">Thomas GIA Practice</h1>
      <p className="w-sub">Select tasks, choose a mode, and practise GIA-style questions timed like the real assessment.</p>

      <div className="task-label">Tasks included</div>
      <div className="pills">
        {SECTIONS.map((sec, i) => {
          const active = selectedIds.includes(sec.id);
          return (
            <button
              key={sec.id}
              className={`pill${active ? ' active' : ''}`}
              onClick={() => toggleSection(sec.id)}
            >
              Task {i + 1} · {sec.name}
            </button>
          );
        })}
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
        <div><strong>{totalQ}</strong>Questions</div>
        <div><strong>{selectedIds.length}</strong>Task Types</div>
        <div><strong>~{estMin} min</strong>Estimated</div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
