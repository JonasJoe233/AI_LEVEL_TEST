import { QUESTIONS } from './data/questions.js';
import { PERSONAS, RARITY_DATA } from './data/personas.js';

export function calcScores(answers) {
  const dimScores = { C: 0, B: 0, F: 0, R: 0 };
  QUESTIONS.forEach((q, i) => { dimScores[q.dim] += answers[i] || 0; });
  return dimScores;
}

export function getRating(score) {
  if (score <= 8) return 'L';
  if (score <= 11) return 'M';
  return 'H';
}

export function getLevel(total) {
  const thresholds = [22, 25, 29, 32, 36, 40, 44, 48, 52, 56];
  for (let i = 0; i < thresholds.length; i++) {
    if (total < thresholds[i]) return i;
  }
  return 10;
}

export function getRarityData(level) {
  return RARITY_DATA.find(r => level >= r.min && level <= r.max) || RARITY_DATA[0];
}

export function getLevelColor(level) {
  if (level <= 2) return '#888';
  if (level <= 4) return '#3b82f6';
  if (level <= 6) return '#8b5cf6';
  if (level <= 8) return '#f59e0b';
  if (level === 9) return '#ef4444';
  return '#a855f7';
}

export function matchPersona(dimScores) {
  const ratings = {
    C: getRating(dimScores.C),
    B: getRating(dimScores.B),
    F: getRating(dimScores.F),
    R: getRating(dimScores.R)
  };

  if (dimScores.C === 15 && dimScores.B === 15 && dimScores.F === 15 && dimScores.R === 15)
    return PERSONAS['GOD'];
  if (dimScores.C <= 6 && dimScores.B <= 6 && dimScores.F <= 6 && dimScores.R <= 6)
    return PERSONAS['CAVE'];
  if (dimScores.R >= 12 && dimScores.C <= 8 && dimScores.F <= 8)
    return PERSONAS['HYPE'];

  const levels = ['L', 'M', 'H'];
  const dims = ['C', 'B', 'F', 'R'];
  let best = null, bestScore = -1;

  Object.values(PERSONAS).forEach(p => {
    if (!p.pattern) return;
    let score = 0;
    dims.forEach(d => {
      const diff = Math.abs(levels.indexOf(p.pattern[d]) - levels.indexOf(ratings[d]));
      if (diff === 0) score += 3;
      else if (diff === 1) score += 1;
    });
    if (score > bestScore) { bestScore = score; best = p; }
  });

  return best || PERSONAS['TOOL'];
}
