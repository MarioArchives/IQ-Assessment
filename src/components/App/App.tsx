import { useState } from 'react';
import './App.css';
import { Mode, View, TimerSecs, Question, SectionScore } from '../../props';
import { SECTIONS, QS_PER_SECTION } from '../../constants/data';
import { generateQuestion } from '../../generators/generators';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import QuestionScreen from '../QuestionScreen/QuestionScreen';
import ResultsScreen from '../ResultsScreen/ResultsScreen';

function App() {
  const [view, setView] = useState<View>('welcome');
  const [mode, setMode] = useState<Mode>('practice');
  const [timerSecs, setTimerSecs] = useState<TimerSecs>(10);
  const [secIdx, setSecIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [totalDone, setTotalDone] = useState(0);
  const [sScores, setSScores] = useState<SectionScore[]>(SECTIONS.map(() => ({ c: 0, t: 0 })));
  const [sessionStart, setSessionStart] = useState(0);
  const [currentQ, setCurrentQ] = useState<Question | null>(null);
  const [elapsed, setElapsed] = useState(0);

  function handleStart(m: Mode, ts: TimerSecs) {
    setMode(m);
    setTimerSecs(ts);
    setSecIdx(0);
    setQIdx(0);
    setTotalScore(0);
    setTotalDone(0);
    setSScores(SECTIONS.map(() => ({ c: 0, t: 0 })));
    setSessionStart(Date.now());
    setElapsed(0);
    setCurrentQ(generateQuestion(SECTIONS[0].type));
    setView('question');
  }

  function handleSubmit(chosen: number, isCorrect: boolean) {
    setTotalDone(d => d + 1);
    setSScores(prev => {
      const next = prev.map(s => ({ ...s }));
      next[secIdx].t++;
      if (isCorrect) next[secIdx].c++;
      return next;
    });
    if (isCorrect) {
      setTotalScore(s => s + 1);
    }
    // chosen is used to determine correctness; the actual tracking is isCorrect
    void chosen;
  }

  function handleNext() {
    if (qIdx < QS_PER_SECTION - 1) {
      const nextQIdx = qIdx + 1;
      setQIdx(nextQIdx);
      setCurrentQ(generateQuestion(SECTIONS[secIdx].type));
    } else if (secIdx < SECTIONS.length - 1) {
      const nextSecIdx = secIdx + 1;
      setSecIdx(nextSecIdx);
      setQIdx(0);
      setCurrentQ(generateQuestion(SECTIONS[nextSecIdx].type));
    } else {
      const e = Math.round((Date.now() - sessionStart) / 1000);
      setElapsed(e);
      setView('results');
    }
  }

  function handleRestart() {
    setView('welcome');
  }

  const totalQ = QS_PER_SECTION * SECTIONS.length;
  const isLast = secIdx === SECTIONS.length - 1 && qIdx === QS_PER_SECTION - 1;

  return (
    <>
      {view === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      {view === 'question' && currentQ !== null && (
        <QuestionScreen
          key={`${secIdx}-${qIdx}`}
          section={SECTIONS[secIdx]}
          question={currentQ}
          qIdx={qIdx}
          qsPerSection={QS_PER_SECTION}
          totalScore={totalScore}
          totalDone={totalDone}
          mode={mode}
          timerSecs={timerSecs}
          sessionStart={sessionStart}
          isLast={isLast}
          onSubmit={handleSubmit}
          onNext={handleNext}
        />
      )}
      {view === 'results' && (
        <ResultsScreen
          mode={mode}
          totalScore={totalScore}
          totalDone={totalQ}
          elapsed={elapsed}
          sScores={sScores}
          sections={SECTIONS}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;
