# Thomas GIA Practice Test

An interactive browser-based practice tool for the Thomas General Intelligence Assessment (GIA). All five task types are covered with dynamically generated questions — every session is unique.

## Quick start

No build step or dependencies required. Serve the single file with any static HTTP server:

```bash
# Python (built-in)
python3 -m http.server 8080

# Node (if installed)
npx serve .

# PHP (if installed)
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

> **Note:** Opening `index.html` directly via `file://` will not work — use an HTTP server.

---

## Modes

### Practice mode
- Per-question countdown timer (Off / 10 s / 6 s)
- Immediate feedback and explanation after each answer
- Closest to real GIA conditions when timer is on

### Assessment mode
- No per-question timer — work at your own pace
- Running session clock displayed during the test
- Time-adjusted GIA score estimate shown in results

---

## Scoring (assessment mode)

Raw accuracy is adjusted for pace using a **log-linear time-penalty model** derived from speeded intelligence test research:

```
timePenalty = 0.09 × log₂(userSecPerQuestion / 9)
adjustedAccuracy = rawAccuracy × (1 − timePenalty)
```

The penalty is ~9% per doubling of time taken relative to the GIA benchmark pace of **9 seconds per question** (based on ~200 questions across ~18 minutes at ~65% completion rate on the real GIA).

The adjusted accuracy is converted to a GIA-style score (mean 100, SD 15):

```
giaScore = 100 + 15 × (adjustedAccuracy − 0.62) / 0.13
```

| GIA Score | Band |
|---|---|
| 130+ | Exceptional |
| 115–129 | Above average |
| 85–114 | Average |
| 70–84 | Below average |
| <70 | Low |

---

## Task types

| Task | Questions | Generation method |
|---|---|---|
| 1 · Reasoning | 60 per session | Algorithmic — 35 adjective pairs × 60 names |
| 2 · Perceptual Speed | 60 per session | Algorithmic — random letter pairs, all 26 letters |
| 3 · Number Speed & Accuracy | 60 per session | Algorithmic — rejection-sampled to avoid ties |
| 4 · Word Meaning | 60 per session | Generative — 30 synonym groups + 30 antonym pairs + 30 fillers |
| 5 · Spatial Visualisation | 60 per session | Algorithmic — mirror pairs R/Я, b/d, p/q with random rotations |

All questions are generated fresh in the browser on each render — there is no static question bank (the embedded `SECTIONS` data is unused at runtime).

---

## Adjusting benchmarks

The scoring constants are defined in `showResults()` inside `index.html`:

```js
const giaSecPerQ   = 9;    // benchmark pace (seconds per question)
const benchmarkAcc = 0.62; // average accuracy at benchmark pace
const accSD        = 0.13; // standard deviation (accuracy points)
```

Increase `giaSecPerQ` to make the pace benchmark more lenient; decrease it to make it stricter.

---

## References

- Thomas International GIA example booklet (2021)
- *Should Intelligence Tests Be Speeded or Unspeeded?* — PMC10299616 (log-linear time-penalty model)
