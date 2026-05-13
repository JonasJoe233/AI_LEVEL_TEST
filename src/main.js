import './styles.css';
import html2canvas from 'html2canvas';
import { calcScores, getRating, getLevel, getRarityData, getLevelColor, matchPersona } from './engine.js';
import { QUESTIONS, DIM_NAMES, DIM_SUBTITLES, DIM_EXPLANATIONS } from './data/questions.js';

// ─── STATE ───
let currentQ = 0;
let answers = new Array(20).fill(null);
let currentQuestionData = null;

// ─── NAVIGATION ───

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function getQuestionData(index) {
  const q = QUESTIONS[index];
  return {
    index,
    text: q.text,
    options: q.options,
    dimName: DIM_NAMES[q.dim],
    total: QUESTIONS.length
  };
}

function startTest() {
  currentQ = 0;
  answers = new Array(20).fill(null);
  showScreen('test');
  renderQuestion(getQuestionData(0));
}

function renderQuestion(data) {
  currentQuestionData = data;
  const count = data.index + 1;
  document.getElementById('test-count').textContent = `${count} / ${data.total}`;
  document.getElementById('progress-fill').style.width = `${(count / data.total) * 100}%`;
  document.getElementById('dim-tag').textContent = `维度 · ${data.dimName}`;
  document.getElementById('question-text').textContent = data.text;

  const optionsEl = document.getElementById('options');
  optionsEl.innerHTML = '';
  const labels = ['A', 'B', 'C'];
  data.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (answers[data.index] === opt.value ? ' selected' : '');
    btn.innerHTML = `<span class="option-letter">${labels[i]}</span><span class="option-text">${opt.label}</span>`;
    btn.onclick = () => selectOption(opt.value);
    optionsEl.appendChild(btn);
  });

  document.getElementById('btn-prev').style.display = data.index > 0 ? 'block' : 'none';
  const btnNext = document.getElementById('btn-next');
  btnNext.disabled = answers[data.index] === null;
  btnNext.textContent = data.index === data.total - 1 ? '查看结果 →' : '下一题 →';

  optionsEl.style.animation = 'none';
  requestAnimationFrame(() => { optionsEl.style.animation = 'slideIn 0.25s ease'; });
}

function selectOption(value) {
  answers[currentQ] = value;
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.classList.toggle('selected', currentQuestionData.options[i].value === value);
  });
  document.getElementById('btn-next').disabled = false;
}

function nextQuestion() {
  if (answers[currentQ] === null) return;
  if (currentQ === QUESTIONS.length - 1) {
    submitTest();
    return;
  }
  currentQ++;
  renderQuestion(getQuestionData(currentQ));
}

function prevQuestion() {
  if (currentQ === 0) return;
  currentQ--;
  renderQuestion(getQuestionData(currentQ));
}

function submitTest() {
  showScreen('judging');
  const result = computeResultSync(answers);
  setTimeout(() => showResult(result), 2200);
}

// ─── ENGINE ORCHESTRATION ───

function computeResultSync(ans) {
  const dimScores = calcScores(ans);
  const total = Object.values(dimScores).reduce((a, b) => a + b, 0);
  const level = getLevel(total);
  const rarity = getRarityData(level);
  const persona = matchPersona(dimScores);
  const levelColor = persona.color || getLevelColor(level);
  const ratings = {
    C: getRating(dimScores.C),
    B: getRating(dimScores.B),
    F: getRating(dimScores.F),
    R: getRating(dimScores.R)
  };
  const dimDetails = ['C', 'B', 'F', 'R'].map(d => ({
    dim: d,
    name: DIM_NAMES[d],
    subtitle: DIM_SUBTITLES[d],
    rating: ratings[d],
    explanation: DIM_EXPLANATIONS[d][ratings[d]]
  }));
  return {
    level,
    levelColor,
    rarity,
    persona: {
      code: persona.code,
      cn: persona.cn,
      emoji: persona.emoji,
      intro: persona.intro,
      desc: persona.desc,
      color: persona.color,
      isEaster: !!persona.isEaster,
      easterNote: persona.easterNote || null
    },
    dimScores,
    ratings,
    dimDetails
  };
}

// ─── RESULT RENDERING ───

function heroGradient(hex) {
  return `linear-gradient(150deg, ${hex}ee 0%, ${hex}bb 100%)`;
}

function showResult(data) {
  const { level, levelColor, rarity, persona, dimScores, ratings, dimDetails } = data;

  const hero = document.getElementById('result-hero');
  hero.style.background = heroGradient(levelColor);

  document.getElementById('persona-emoji').textContent = persona.emoji;
  document.getElementById('persona-code').textContent = persona.code;
  document.getElementById('persona-cn').textContent = persona.cn;
  document.getElementById('persona-intro').textContent = `"${persona.intro}"`;

  document.getElementById('level-num').textContent = `Lv.${level}`;
  const rarityEl = document.getElementById('level-rarity');
  rarityEl.textContent = rarity.label;
  document.getElementById('level-pct').textContent = rarity.pct;

  const easterWrap = document.getElementById('easter-note-wrap');
  if (persona.isEaster) {
    easterWrap.innerHTML = `
      <div class="easter-wrap">
        <div class="easter-badge">⚠ 隐藏人格已激活</div>
        <div class="easter-note">${persona.easterNote}</div>
      </div>`;
  } else {
    easterWrap.innerHTML = '';
  }

  const barColors = { L: '#9CA3AF', M: '#3B82F6', H: '#D97706' };
  ['C', 'B', 'F', 'R'].forEach(d => {
    const rating = ratings[d];
    const pct = ((dimScores[d] - 5) / 10) * 100;
    setTimeout(() => {
      document.getElementById(`bar-${d}`).style.width = `${pct}%`;
      document.getElementById(`bar-${d}`).style.background = barColors[rating];
    }, 300);
    const ratingEl = document.getElementById(`rating-${d}`);
    ratingEl.textContent = rating;
    ratingEl.className = `dim-rating rating-${rating}`;
  });

  document.getElementById('persona-desc').textContent = persona.desc;

  const bgMap    = { L: 'rgba(120,113,108,.1)', M: 'rgba(37,99,235,.1)',  H: 'rgba(180,83,9,.1)'  };
  const colorMap = { L: '#78716C',              M: '#2563EB',              H: '#B45309'             };
  document.getElementById('dims-detail').innerHTML = dimDetails.map(d => `
    <div class="dim-detail-row">
      <div class="dim-detail-header">
        <div>
          <div class="dim-detail-name">${d.name}</div>
          <div class="dim-detail-sub">${d.subtitle}</div>
        </div>
        <div class="dim-detail-badge" style="background:${bgMap[d.rating]};color:${colorMap[d.rating]}">${d.rating}</div>
      </div>
      <div class="dim-detail-desc">${d.explanation}</div>
    </div>`).join('');

  prepShareCard(persona, level, rarity, dimScores, ratings, dimDetails, levelColor);
  showScreen('result');
}

function prepShareCard(persona, level, rarity, dimScores, ratings, dimDetails, levelColor) {
  const barColors = { L: '#9CA3AF', M: '#3B82F6', H: '#D97706' };

  document.getElementById('sc-hero-overlay').style.background = heroGradient(levelColor);

  document.getElementById('sc-emoji').textContent = persona.emoji;
  document.getElementById('sc-code').textContent = persona.code;
  document.getElementById('sc-code').style.color = '#fff';
  document.getElementById('sc-cn').textContent = persona.cn;
  document.getElementById('sc-intro').textContent = `"${persona.intro}"`;

  const badge = document.getElementById('sc-level-badge');
  badge.textContent = `Lv.${level}`;
  badge.style.background = 'rgba(255,255,255,0.22)';
  badge.style.color = '#fff';

  const dimNames = {};
  dimDetails.forEach(d => { dimNames[d.dim] = d.name; });
  document.getElementById('sc-dims').innerHTML = ['C', 'B', 'F', 'R'].map(d => {
    const rating = ratings[d];
    return `
      <div class="sc-dim-chip">
        <span class="sc-dim-label">${dimNames[d]}</span>
        <span class="sc-dim-val" style="color:${barColors[rating]}">${rating}</span>
      </div>`;
  }).join('');

  const rarityEl = document.getElementById('sc-rarity-label');
  rarityEl.textContent = rarity.label;
  rarityEl.style.color = levelColor;
}

function downloadCard() {
  const btn = document.querySelector('.btn-share');
  btn.textContent = '⏳ 生成中...';
  btn.disabled = true;

  html2canvas(document.getElementById('share-card'), {
    scale: 2,
    backgroundColor: '#FFFFFF',
    useCORS: true,
    logging: false
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = `AITI-${document.getElementById('sc-code').textContent}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    btn.textContent = '✅ 卡片已保存';
    setTimeout(() => {
      btn.textContent = '📤 生成分享卡片';
      btn.disabled = false;
    }, 2000);
  }).catch(() => {
    btn.textContent = '📤 生成分享卡片';
    btn.disabled = false;
    alert('生成失败，请截图分享结果页');
  });
}

function restart() {
  showScreen('intro');
}

// Expose to global scope for inline onclick handlers in HTML
window.startTest = startTest;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.downloadCard = downloadCard;
window.restart = restart;
