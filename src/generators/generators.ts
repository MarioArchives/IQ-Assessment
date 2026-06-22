import { SYNONYMS, ANTONYMS, FILLERS, ADJECTIVES, NAMES } from '../constants/data';
import { Question, ReasoningQ, PerceptualQ, NumberQ, WordQ, SpatialQ, SectionType } from '../props';

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function genPerceptual(): PerceptualQ {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const rnd = () => alpha[Math.floor(Math.random() * 26)];
  const top: string[] = [];
  while (top.length < 4) {
    const l = rnd();
    if (!top.includes(l)) top.push(l);
  }
  const bot: string[] = [];
  for (let i = 0; i < 4; i++) {
    if (Math.random() < 0.5) {
      bot.push(top[i].toLowerCase());
    } else {
      let l: string;
      do {
        l = rnd();
      } while (l.toLowerCase() === top[i].toLowerCase() || bot.includes(l.toLowerCase()));
      bot.push(l.toLowerCase());
    }
  }
  const ans = top.filter((t, i) => t.toLowerCase() === bot[i]).length;
  const exp = top.map((t, i) => `${t}/${bot[i]} ${t.toLowerCase() === bot[i] ? '✓' : '✗'}`).join('  ') + `  → ${ans} pair${ans !== 1 ? 's' : ''}`;
  return { type: 'perceptual', top, bot, ans, exp };
}

export function genNumber(): NumberQ {
  let nums: [number, number, number];
  let lo: number, mid: number, hi: number, dLo: number, dHi: number;
  do {
    const raw = Array.from({ length: 3 }, () => Math.floor(Math.random() * 200) + 1) as [number, number, number];
    nums = raw;
    [lo, mid, hi] = [...nums].sort((a, b) => a - b);
    dLo = mid - lo;
    dHi = hi - mid;
  } while (lo === mid || mid === hi || dLo === dHi);
  const furthest = dHi > dLo ? hi : lo;
  const ans = nums.indexOf(furthest);
  const exp = `Middle = ${mid}. |${hi}−${mid}| = ${dHi}, |${mid}−${lo}| = ${dLo}. ${furthest} is furthest.`;
  return { type: 'number', nums, ans, exp };
}

export function genSpatial(): SpatialQ {
  const PAIRS = [['R', 'Я'], ['b', 'd'], ['p', 'q']];
  const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const degs = [0, 90, 180, 270];
  const rc = () => pair[Math.floor(Math.random() * 2)];
  const rd = () => degs[Math.floor(Math.random() * 4)];
  const boxes: [[string, number, string, number], [string, number, string, number]] = [
    [rc(), rd(), rc(), rd()],
    [rc(), rd(), rc(), rd()],
  ];
  const ans = boxes.filter(b => b[0] === b[2]).length;
  const exp = boxes.map((b, i) =>
    `Box ${i + 1}: ${b[0]}(${b[1]}°) & ${b[2]}(${b[3]}°) — ${b[0] === b[2] ? 'match ✓' : 'no match ✗'}`
  ).join('. ') + `. Answer: ${ans}.`;
  return { type: 'spatial', boxes, ans, exp };
}

export function genWord(): WordQ {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const useSyn = Math.random() < 0.5;
  let w1: string, w2: string, relType: string;
  if (useSyn) {
    const group = SYNONYMS[Math.floor(Math.random() * SYNONYMS.length)];
    [w1, w2] = shuffle([...group]);
    relType = 'synonyms';
  } else {
    const pair = ANTONYMS[Math.floor(Math.random() * ANTONYMS.length)];
    [w1, w2] = Math.random() < 0.5 ? [pair[0], pair[1]] : [pair[1], pair[0]];
    relType = 'opposites';
  }
  const filler = cap(FILLERS[Math.floor(Math.random() * FILLERS.length)]);
  const ansIdx = Math.floor(Math.random() * 3);
  const words: [string, string, string] = ['', '', ''];
  const [posA, posB] = [0, 1, 2].filter(i => i !== ansIdx) as [number, number];
  [words[posA], words[posB]] = shuffle([cap(w1), cap(w2)]) as [string, string];
  words[ansIdx] = filler;
  const exp = `'${words[posA]}' and '${words[posB]}' are ${relType}. '${words[ansIdx]}' is the odd one out.`;
  return { type: 'word', words, ans: ansIdx, exp };
}

export function genReasoning(): ReasoningQ {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const [nameA, nameB] = shuffle([...NAMES]) as [string, string];
  const negated = Math.random() < 0.5;
  const aHasMore = !negated;
  const stmt = negated
    ? `${nameA} is not as ${adj.pos} as ${nameB}`
    : `${nameA} is ${adj.posQ} than ${nameB}`;
  const askPos = Math.random() < 0.5;
  const q = askPos ? `Who is ${adj.posQ}?` : `Who is ${adj.negQ}?`;
  const ansName = (askPos === aHasMore) ? nameA : nameB;
  const ans = ansName === nameA ? 0 : 1;
  const exp = negated
    ? (askPos
        ? `"Not as ${adj.pos}" means ${nameA} has less. So ${nameB} is ${adj.posQ}.`
        : `"Not as ${adj.pos}" means ${nameA} has less, making ${nameA} ${adj.negQ}.`)
    : (askPos
        ? `${nameA} is ${adj.posQ} than ${nameB}, so ${nameA} is ${adj.posQ}.`
        : `${nameA} is ${adj.posQ} than ${nameB}, so ${nameB} is ${adj.negQ}.`);
  return { type: 'reasoning', stmt, q, opts: [nameA, nameB], ans, exp };
}

export function generateQuestion(type: SectionType): Question {
  switch (type) {
    case 'reasoning':  return genReasoning();
    case 'perceptual': return genPerceptual();
    case 'number':     return genNumber();
    case 'word':       return genWord();
    case 'spatial':    return genSpatial();
  }
}
