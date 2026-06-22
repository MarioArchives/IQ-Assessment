import { Section } from '../props';

export const QS_PER_SECTION = 60;
export const TOTAL_Q = 300;

export const SECTIONS: Section[] = [
  { id: 'reasoning',  name: 'Reasoning',               tag: 'Task 1: Reasoning',         type: 'reasoning',  color: '#3b82f6' },
  { id: 'perceptual', name: 'Perceptual Speed',         tag: 'Task 2: Perceptual Speed',  type: 'perceptual', color: '#8b5cf6' },
  { id: 'number',     name: 'Number Speed & Accuracy',  tag: 'Task 3: Number Speed',      type: 'number',     color: '#f59e0b' },
  { id: 'word',       name: 'Word Meaning',             tag: 'Task 4: Word Meaning',      type: 'word',       color: '#10b981' },
  { id: 'spatial',    name: 'Spatial Visualisation',    tag: 'Task 5: Spatial Visualisation', type: 'spatial', color: '#ef4444' },
];

export const SYNONYMS: string[][] = [
  ['happy','joyful','content','cheerful'],
  ['sad','gloomy','melancholy','sorrowful'],
  ['fast','swift','rapid','speedy'],
  ['slow','sluggish','lethargic','tardy'],
  ['big','large','vast','enormous'],
  ['small','tiny','minute','petite'],
  ['bright','luminous','radiant','gleaming'],
  ['smart','clever','astute','intelligent'],
  ['kind','gentle','benevolent','caring'],
  ['brave','courageous','bold','valiant'],
  ['calm','serene','tranquil','placid'],
  ['tired','weary','exhausted','fatigued'],
  ['genuine','authentic','sincere','real'],
  ['fake','false','spurious','counterfeit'],
  ['old','ancient','aged','archaic'],
  ['dry','arid','parched','desiccated'],
  ['cunning','crafty','wily','shrewd'],
  ['reckless','careless','heedless','impetuous'],
  ['perilous','dangerous','hazardous','treacherous'],
  ['hidden','concealed','obscured','covert'],
  ['clear','lucid','obvious','transparent'],
  ['talkative','garrulous','loquacious','verbose'],
  ['quiet','reserved','taciturn','reticent'],
  ['start','begin','commence','initiate'],
  ['stop','cease','halt','conclude'],
  ['nimble','agile','spry','lithe'],
  ['cheerful','jovial','merry','gleeful'],
  ['dejected','downcast','despondent','forlorn'],
  ['shrewd','perceptive','astute','discerning'],
  ['frugal','thrifty','economical','sparing'],
];

export const ANTONYMS: [string, string][] = [
  ['happy','sad'],['fast','slow'],['big','small'],['bright','dark'],
  ['hot','cold'],['strong','weak'],['brave','fearful'],['calm','agitated'],
  ['kind','cruel'],['genuine','fake'],['loud','quiet'],['expand','contract'],
  ['humble','arrogant'],['diligent','lazy'],['optimistic','pessimistic'],
  ['ancient','modern'],['arid','lush'],['placid','turbulent'],
  ['obscure','lucid'],['shallow','deep'],['zenith','nadir'],['sparse','dense'],
  ['elusive','obvious'],['vivid','dull'],['frugal','wasteful'],
  ['perilous','safe'],['start','stop'],['conceal','reveal'],['rigid','flexible'],
  ['meek','assertive'],
];

export const FILLERS: string[] = [
  'carpet','marble','pebble','lantern','button','anchor','saddle','kettle',
  'pillar','candle','tunnel','glove','basket','barrel','gravel','fence',
  'shovel','thorn','rope','crimson','cobalt','gust','flint','canoe',
  'timber','vessel','chimney','compass','hammer','shuttle',
];

export interface AdjEntry {
  pos: string;
  posQ: string;
  neg: string;
  negQ: string;
}

export const ADJECTIVES: AdjEntry[] = [
  {pos:'tall',        posQ:'taller',           neg:'short',       negQ:'shorter'},
  {pos:'heavy',       posQ:'heavier',          neg:'light',       negQ:'lighter'},
  {pos:'fast',        posQ:'faster',           neg:'slow',        negQ:'slower'},
  {pos:'strong',      posQ:'stronger',         neg:'weak',        negQ:'weaker'},
  {pos:'loud',        posQ:'louder',           neg:'quiet',       negQ:'quieter'},
  {pos:'warm',        posQ:'warmer',           neg:'cold',        negQ:'colder'},
  {pos:'long',        posQ:'longer',           neg:'short',       negQ:'shorter'},
  {pos:'old',         posQ:'older',            neg:'young',       negQ:'younger'},
  {pos:'deep',        posQ:'deeper',           neg:'shallow',     negQ:'shallower'},
  {pos:'wide',        posQ:'wider',            neg:'narrow',      negQ:'narrower'},
  {pos:'patient',     posQ:'more patient',     neg:'impatient',   negQ:'more impatient'},
  {pos:'generous',    posQ:'more generous',    neg:'stingy',      negQ:'stingier'},
  {pos:'honest',      posQ:'more honest',      neg:'deceitful',   negQ:'more deceitful'},
  {pos:'confident',   posQ:'more confident',   neg:'timid',       negQ:'more timid'},
  {pos:'calm',        posQ:'calmer',           neg:'anxious',     negQ:'more anxious'},
  {pos:'polite',      posQ:'more polite',      neg:'rude',        negQ:'ruder'},
  {pos:'humble',      posQ:'more humble',      neg:'arrogant',    negQ:'more arrogant'},
  {pos:'kind',        posQ:'kinder',           neg:'cruel',       negQ:'crueler'},
  {pos:'loyal',       posQ:'more loyal',       neg:'disloyal',    negQ:'more disloyal'},
  {pos:'diligent',    posQ:'more diligent',    neg:'lazy',        negQ:'lazier'},
  {pos:'bright',      posQ:'brighter',         neg:'dull',        negQ:'duller'},
  {pos:'creative',    posQ:'more creative',    neg:'conventional',negQ:'more conventional'},
  {pos:'brave',       posQ:'braver',           neg:'fearful',     negQ:'more fearful'},
  {pos:'happy',       posQ:'happier',          neg:'sad',         negQ:'sadder'},
  {pos:'cheerful',    posQ:'more cheerful',    neg:'gloomy',      negQ:'gloomier'},
  {pos:'ambitious',   posQ:'more ambitious',   neg:'complacent',  negQ:'more complacent'},
  {pos:'decisive',    posQ:'more decisive',    neg:'hesitant',    negQ:'more hesitant'},
  {pos:'optimistic',  posQ:'more optimistic',  neg:'pessimistic', negQ:'more pessimistic'},
  {pos:'flexible',    posQ:'more flexible',    neg:'rigid',       negQ:'more rigid'},
  {pos:'careful',     posQ:'more careful',     neg:'reckless',    negQ:'more reckless'},
  {pos:'intelligent', posQ:'more intelligent', neg:'foolish',     negQ:'more foolish'},
  {pos:'curious',     posQ:'more curious',     neg:'incurious',   negQ:'less curious'},
  {pos:'independent', posQ:'more independent', neg:'dependent',   negQ:'more dependent'},
  {pos:'energetic',   posQ:'more energetic',   neg:'lethargic',   negQ:'more lethargic'},
  {pos:'talkative',   posQ:'more talkative',   neg:'reserved',    negQ:'more reserved'},
];

export const NAMES: string[] = [
  'Alice','Ben','Carlos','Diana','Elias','Fatima','George','Hana','Ivan','Jess',
  'Kofi','Lena','Marco','Nadia','Omar','Priya','Quinn','Ravi','Sara','Tobias',
  'Uma','Viktor','Wendy','Xiu','Yara','Zara','Amir','Bella','Cyrus','Dani',
  'Ethan','Fiona','Gus','Hira','Idris','Jana','Kai','Luna','Milo','Nina',
  'Olga','Pedro','Rea','Stefan','Tara','Uri','Vera','Wren','Xander','Yuna',
  'Zoe','Amara','Bram','Chioma','Dario','Emi','Felix','Greta','Hugo','Iris',
];
