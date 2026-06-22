import { useState, useEffect, useRef } from 'react';
import './QuestionScreen.css';
import { QuestionScreenProps } from '../../props';
import ProgressHeader from '../ProgressHeader/ProgressHeader';
import FeedbackOverlay from '../FeedbackOverlay/FeedbackOverlay';
import ReasoningQuestion from '../questions/ReasoningQuestion/ReasoningQuestion';
import PerceptualQuestion from '../questions/PerceptualQuestion/PerceptualQuestion';
import NumberQuestion from '../questions/NumberQuestion/NumberQuestion';
import WordQuestion from '../questions/WordQuestion/WordQuestion';
import SpatialQuestion from '../questions/SpatialQuestion/SpatialQuestion';

function QuestionScreen({
  section,
  question,
  qIdx,
  qsPerSection,
  totalScore,
  totalDone,
  mode,
  timerSecs,
  sessionStart,
  isLast,
  onSubmit,
  onNext,
}: QuestionScreenProps) {
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Timer display state
  const [timerDisplay, setTimerDisplay] = useState('');
  const [timerUrgent, setTimerUrgent] = useState(false);
  const [barWidth, setBarWidth] = useState(100);
  const [barColor, setBarColor] = useState('var(--p)');

  const answeredRef = useRef(false);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleAnswer(idx: number) {
    if (answeredRef.current) return;
    answeredRef.current = true;
    if (timerIntervalRef.current !== null) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setAnswered(true);
    setChosen(idx);
    const isCorrect = idx !== -1 && idx === question.ans;
    onSubmit(idx, isCorrect);
    setTimeout(() => setShowFeedback(true), 180);
  }

  // Timer effect
  useEffect(() => {
    if (mode === 'assessment') {
      setBarWidth(100);
      setBarColor('var(--p)');
      const updateElapsed = () => {
        const e = Math.round((Date.now() - sessionStart) / 1000);
        setTimerDisplay(`${Math.floor(e / 60)}:${String(e % 60).padStart(2, '0')}`);
        setTimerUrgent(false);
      };
      updateElapsed();
      timerIntervalRef.current = setInterval(updateElapsed, 1000);
    } else if (timerSecs === 0) {
      setTimerDisplay('');
      setBarWidth(100);
      setBarColor('var(--p)');
      setTimerUrgent(false);
    } else {
      let timeLeft = timerSecs;

      const tick = () => {
        setTimerDisplay(timeLeft + 's');
        setTimerUrgent(timeLeft <= 3);
        const pct = (timeLeft / timerSecs) * 100;
        setBarWidth(pct);
        setBarColor(
          timeLeft <= 3
            ? 'var(--err)'
            : timeLeft <= Math.ceil(timerSecs / 2)
            ? '#f59e0b'
            : 'var(--p)'
        );
      };

      tick();

      timerIntervalRef.current = setInterval(() => {
        timeLeft--;
        tick();
        if (timeLeft <= 0) {
          if (timerIntervalRef.current !== null) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          if (!answeredRef.current) {
            handleAnswer(-1);
          }
        }
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current !== null) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard handler
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === 'Enter' || e.key === ' ') && showFeedback) {
        e.preventDefault();
        onNext();
        return;
      }
      if (answeredRef.current) return;
      const k = e.key;
      switch (section.type) {
        case 'reasoning':
          if (k === '1') handleAnswer(0);
          else if (k === '2') handleAnswer(1);
          break;
        case 'perceptual':
          if (['0','1','2','3','4'].includes(k)) handleAnswer(parseInt(k));
          break;
        case 'number':
        case 'word':
          if (k === '1') handleAnswer(0);
          else if (k === '2') handleAnswer(1);
          else if (k === '3') handleAnswer(2);
          break;
        case 'spatial':
          if (['0','1','2'].includes(k)) handleAnswer(parseInt(k));
          break;
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFeedback, section.type]);

  // Compute correct label for feedback
  function getCorrectLabel(): string {
    switch (question.type) {
      case 'reasoning':  return question.opts[question.ans];
      case 'number':     return String(question.nums[question.ans]);
      case 'word':       return question.words[question.ans];
      case 'perceptual': return String(question.ans);
      case 'spatial':    return String(question.ans);
    }
  }

  return (
    <div id="sq">
      <ProgressHeader
        tag={section.tag}
        qIdx={qIdx}
        qsPerSection={qsPerSection}
        sectionName={section.name}
        totalScore={totalScore}
        totalDone={totalDone}
        mode={mode}
        timerSecs={timerSecs}
        sessionStart={sessionStart}
        timeLeft={0}
        timerUrgent={timerUrgent}
        barWidth={barWidth}
        barColor={barColor}
        timerDisplay={timerDisplay}
      />
      <div className="qbody">
        {question.type === 'reasoning' && (
          <ReasoningQuestion
            question={question}
            answered={answered}
            chosen={chosen}
            onAnswer={handleAnswer}
          />
        )}
        {question.type === 'perceptual' && (
          <PerceptualQuestion
            question={question}
            answered={answered}
            chosen={chosen}
            onAnswer={handleAnswer}
          />
        )}
        {question.type === 'number' && (
          <NumberQuestion
            question={question}
            answered={answered}
            chosen={chosen}
            onAnswer={handleAnswer}
          />
        )}
        {question.type === 'word' && (
          <WordQuestion
            question={question}
            answered={answered}
            chosen={chosen}
            onAnswer={handleAnswer}
          />
        )}
        {question.type === 'spatial' && (
          <SpatialQuestion
            question={question}
            answered={answered}
            chosen={chosen}
            onAnswer={handleAnswer}
          />
        )}
      </div>
      {showFeedback && (
        <FeedbackOverlay
          isOk={chosen !== null && chosen !== -1 && chosen === question.ans}
          chosen={chosen ?? -1}
          correctLabel={getCorrectLabel()}
          exp={question.exp}
          isLast={isLast}
          onNext={onNext}
        />
      )}
    </div>
  );
}

export default QuestionScreen;
