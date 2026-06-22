// All TypeScript types and interfaces for the GIA Practice Test

export type Mode = 'practice' | 'assessment';
export type View = 'welcome' | 'question' | 'results';
export type SectionType = 'reasoning' | 'perceptual' | 'number' | 'word' | 'spatial';
export type TimerSecs = 0 | 6 | 10;

export interface SectionScore {
  c: number;
  t: number;
}

export interface Section {
  id: string;
  name: string;
  tag: string;
  type: SectionType;
  color: string;
}

// Discriminated union question types
export interface ReasoningQ {
  type: 'reasoning';
  stmt: string;
  q: string;
  opts: [string, string];
  ans: number;
  exp: string;
}

export interface PerceptualQ {
  type: 'perceptual';
  top: string[];
  bot: string[];
  ans: number;
  exp: string;
}

export interface NumberQ {
  type: 'number';
  nums: [number, number, number];
  ans: number;
  exp: string;
}

export interface WordQ {
  type: 'word';
  words: [string, string, string];
  ans: number;
  exp: string;
}

export interface SpatialQ {
  type: 'spatial';
  boxes: [[string, number, string, number], [string, number, string, number]];
  ans: number;
  exp: string;
}

export type Question = ReasoningQ | PerceptualQ | NumberQ | WordQ | SpatialQ;

// Props interfaces for each component

export interface AppProps {
  // top-level component, no external props
}

export interface WelcomeScreenProps {
  onStart: (mode: Mode, timerSecs: TimerSecs) => void;
}

export interface ProgressHeaderProps {
  tag: string;
  qIdx: number;
  qsPerSection: number;
  sectionName: string;
  totalScore: number;
  totalDone: number;
  mode: Mode;
  timerSecs: TimerSecs;
  sessionStart: number;
  timeLeft: number;
  timerUrgent: boolean;
  barWidth: number;
  barColor: string;
}

export interface QuestionScreenProps {
  section: Section;
  question: Question;
  qIdx: number;
  qsPerSection: number;
  totalScore: number;
  totalDone: number;
  mode: Mode;
  timerSecs: TimerSecs;
  sessionStart: number;
  isLast: boolean;
  onSubmit: (chosen: number, isCorrect: boolean) => void;
  onNext: () => void;
}

export interface FeedbackOverlayProps {
  isOk: boolean;
  chosen: number;
  correctLabel: string;
  exp: string;
  isLast: boolean;
  onNext: () => void;
}

export interface ReasoningQuestionProps {
  question: ReasoningQ;
  answered: boolean;
  chosen: number | null;
  onAnswer: (idx: number) => void;
}

export interface PerceptualQuestionProps {
  question: PerceptualQ;
  answered: boolean;
  chosen: number | null;
  onAnswer: (idx: number) => void;
}

export interface NumberQuestionProps {
  question: NumberQ;
  answered: boolean;
  chosen: number | null;
  onAnswer: (idx: number) => void;
}

export interface WordQuestionProps {
  question: WordQ;
  answered: boolean;
  chosen: number | null;
  onAnswer: (idx: number) => void;
}

export interface SpatialQuestionProps {
  question: SpatialQ;
  answered: boolean;
  chosen: number | null;
  onAnswer: (idx: number) => void;
}

export interface ResultsScreenProps {
  mode: Mode;
  totalScore: number;
  totalDone: number;
  elapsed: number;
  sScores: SectionScore[];
  sections: Section[];
  onRestart: () => void;
}
