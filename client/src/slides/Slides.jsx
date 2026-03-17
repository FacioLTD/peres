import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useStats } from '../hooks/useStats';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, Line, ReferenceLine, ReferenceArea, Cell, ComposedChart
} from 'recharts';
import './Slides.css';

// ── New submission toast ──────────────────────────────────────
function NewSubmissionToast({ visible }) {
  return (
    <div className={`submission-toast ${visible ? 'show' : ''}`}>
      <span className="toast-dot" />
      תגובה חדשה נכנסה!
    </div>
  );
}

// ── QR Overlay ────────────────────────────────────────────────
function QROverlay({ show, onClose }) {
  const surveyUrl = `${window.location.origin}/`;
  if (!show) return null;
  return (
    <div className="qr-overlay" onClick={onClose}>
      <div className="qr-card" onClick={e => e.stopPropagation()}>
        <div className="qr-title mono">סקן למלא את הסקר</div>
        <QRCodeSVG value={surveyUrl} size={220} bgColor="#0a0a0a" fgColor="#e8ff47" level="M" />
        <div className="qr-url mono">{surveyUrl}</div>
        <button className="qr-close" onClick={onClose}>סגור ✕</button>
      </div>
    </div>
  );
}

// ── Shared chart theme ────────────────────────────────────────
const GRID_COLOR   = '#1e1e1e';
const AXIS_COLOR   = '#555';
const ACCENT       = '#e8ff47';
const ORANGE       = '#ff6b35';
const DIM_BAR      = '#2a2a2a';

const SLIDE_LIST = [
  { id: 1,  title: 'שער הקורס' },
  { id: 2,  title: 'מבנה ההרצאה' },
  { id: 3,  title: 'עם מה תצאו' },
  { id: 4,  title: 'למה AI?' },
  { id: 5,  title: 'מבנה הקורס' },
  { id: 6,  title: 'עבודה סופית — מטרות' },
  { id: 7,  title: 'שלבי עבודה ולו״ז' },
  { id: 8,  title: 'דרישות הגשה' },
  { id: 9,  title: 'מבנה העבודה (1–3)' },
  { id: 10, title: 'מבנה העבודה (4–5)' },
  { id: 11, title: 'בונוס ותמיכה' },
  { id: 12, title: 'מפת AI' },
  { id: 13, title: 'מהי אינטליגנציה?' },
  { id: 14, title: 'מרכיבי אינטליגנציה' },
  { id: 15, title: 'אז מה זה AI?' },
  { id: 16, title: 'פתיחה — ניסוי' },
  { id: 17, title: 'Dataset' },
  { id: 18, title: 'Feature / Label' },
  { id: 19, title: 'Target Variable' },
  { id: 20, title: 'Mean & Variance' },
  { id: 21, title: 'Scatter & Correlation' },
  { id: 22, title: 'מנבאים' },
  { id: 23, title: 'סטטיסטיקה vs ML' },
  { id: 24, title: 'מהו מודל ML?' },
  { id: 25, title: 'סוגי בעיות' },
  { id: 26, title: 'Regression — גיל וציון' },
  { id: 27, title: 'Classification — מעורבות' },
  { id: 28, title: 'Clustering — סוגי סטודנטים' },
  { id: 29, title: 'Machine Learning' },
  { id: 30, title: 'מונחית מול בלתי מונחית' },
  { id: 31, title: 'AI = Prediction' },
  { id: 32, title: 'מעבר להרצאה 2' },
  { id: 57, title: 'מבנה ההרצאה', navNum: '2.00' },
  { id: 33, title: 'מסגרת החשיבה', navNum: '2.01' },
  { id: 34, title: 'דוגמה 1: זיהוי סטודנטים בסיכון', navNum: '2.02' },
  { id: 35, title: 'דוגמה 2: תכנון מלאי', navNum: '2.03' },
  { id: 36, title: 'דוגמה 3: סגמנטציית לקוחות', navNum: '2.04' },
  { id: 37, title: 'דוגמה 4: זיהוי הונאה בתביעות', navNum: '2.05' },
  { id: 38, title: 'דוגמה 5: חיזוי נטישת לקוחות', navNum: '2.06' },
  { id: 39, title: 'דוגמה 6: עומס בחדר מיון', navNum: '2.07' },
  { id: 40, title: 'Machine Learning', navNum: '2.08' },
  { id: 41, title: 'ניסוי יירוט', navNum: '2.09' },
  { id: 42, title: 'היונים של פיקאסו', navNum: '2.10' },
  { id: 43, title: 'המבוך של טולמן', navNum: '2.11' },
  { id: 44, title: 'נוירון אניסטון', navNum: '2.12' },
  { id: 45, title: 'מה קורה בתוך מחשב?', navNum: '2.13' },
  { id: 46, title: 'הלב הפועם של הלמידה', navNum: '2.14' },
  { id: 47, title: 'סינפסות וקשרים', navNum: '2.15' },
  { id: 48, title: 'איך המודל לומד?', navNum: '2.16' },
  { id: 49, title: 'אתם המודל: דוגמה 1', navNum: '2.17' },
  { id: 50, title: 'אתם המודל: דוגמה 2', navNum: '2.18' },
  { id: 51, title: 'אתם המודל: דוגמה 3', navNum: '2.19' },
  { id: 52, title: 'אתם המודל: דוגמה 4', navNum: '2.20' },
  { id: 53, title: 'אתם המודל: דוגמה 5', navNum: '2.21' },
  { id: 54, title: 'אתם המודל: דוגמה 6', navNum: '2.22' },
  { id: 55, title: 'סיכום התרגיל', navNum: '2.23' },
  { id: 56, title: 'בפרק הבא', navNum: '2.24' },
];

// ── Small reusable components ─────────────────────────────────
function LiveBadge({ n }) {
  return (
    <div className="live-badge mono">
      <span className="live-dot pulse" />
      LIVE — {n} תגובות
    </div>
  );
}

function ConceptCard({ en, he, def, accent }) {
  return (
    <div className={`concept-card ${accent ? 'accent' : ''}`}>
      <div className="concept-en mono">{en}</div>
      <div className="concept-he">{he}</div>
      <div className="concept-def">{def}</div>
    </div>
  );
}

function Highlight({ children, color = ACCENT }) {
  return (
    <div className="highlight-box" style={{ borderRightColor: color }}>
      {children}
    </div>
  );
}

function FlowBox({ label, sub, highlight }) {
  return (
    <div className={`flow-box ${highlight ? 'highlight' : ''}`}>
      {label}
      {sub && <div className="flow-sub mono">{sub}</div>}
    </div>
  );
}

function StatCard({ num, label }) {
  return (
    <div className="stat-card">
      <div className="stat-num mono">{num ?? '—'}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ── Regression helper ─────────────────────────────────────────
function linearRegression(points) {
  const n = points.length;
  if (n < 2) return null;
  const sumX  = points.reduce((a, p) => a + p.x, 0);
  const sumY  = points.reduce((a, p) => a + p.y, 0);
  const sumXY = points.reduce((a, p) => a + p.x * p.y, 0);
  const sumX2 = points.reduce((a, p) => a + p.x * p.x, 0);
  const slope     = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  // R² coefficient of determination
  const meanY = sumY / n;
  const ssTot = points.reduce((a, p) => a + (p.y - meanY) ** 2, 0);
  const ssRes = points.reduce((a, p) => a + (p.y - (slope * p.x + intercept)) ** 2, 0);
  const r2 = ssTot === 0 ? 0 : +(1 - ssRes / ssTot).toFixed(3);
  return { slope, intercept, r2 };
}

function solveLinearSystem(matrix, vector) {
  const n = matrix.length;
  const a = matrix.map((row) => [...row]);
  const b = [...vector];

  for (let i = 0; i < n; i += 1) {
    let maxRow = i;
    for (let r = i + 1; r < n; r += 1) {
      if (Math.abs(a[r][i]) > Math.abs(a[maxRow][i])) maxRow = r;
    }
    if (Math.abs(a[maxRow][i]) < 1e-10) return null;

    if (maxRow !== i) {
      [a[i], a[maxRow]] = [a[maxRow], a[i]];
      [b[i], b[maxRow]] = [b[maxRow], b[i]];
    }

    const pivot = a[i][i];
    for (let j = i; j < n; j += 1) a[i][j] /= pivot;
    b[i] /= pivot;

    for (let r = 0; r < n; r += 1) {
      if (r === i) continue;
      const factor = a[r][i];
      for (let j = i; j < n; j += 1) a[r][j] -= factor * a[i][j];
      b[r] -= factor * b[i];
    }
  }

  return b;
}

function polynomialRegression(points, degree = 2) {
  const n = points.length;
  if (n < degree + 1) return null;

  const size = degree + 1;
  const sums = Array(2 * degree + 1).fill(0);
  for (let p = 0; p <= 2 * degree; p += 1) {
    sums[p] = points.reduce((acc, point) => acc + point.x ** p, 0);
  }

  const matrix = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => sums[i + j])
  );
  const vector = Array.from({ length: size }, (_, i) =>
    points.reduce((acc, point) => acc + point.y * (point.x ** i), 0)
  );

  const coeffs = solveLinearSystem(matrix, vector);
  if (!coeffs) return null;

  const predict = (x) => coeffs.reduce((acc, c, i) => acc + c * (x ** i), 0);
  const meanY = points.reduce((acc, point) => acc + point.y, 0) / n;
  const ssTot = points.reduce((acc, point) => acc + (point.y - meanY) ** 2, 0);
  const ssRes = points.reduce((acc, point) => acc + (point.y - predict(point.x)) ** 2, 0);
  const r2 = ssTot === 0 ? 0 : +(1 - ssRes / ssTot).toFixed(3);

  return { degree, coeffs, predict, r2 };
}

function kmeans(points, k = 3, iterations = 10) {
  if (!points.length) return { clusters: [], centroids: [] };
  const sorted = [...points].sort((a, b) => (a.aiUsage + a.studyHours) - (b.aiUsage + b.studyHours));
  const seeds = [0, Math.floor((sorted.length - 1) / 2), sorted.length - 1].slice(0, k);
  let centroids = seeds.map(i => ({ x: sorted[i].aiUsage, y: sorted[i].studyHours }));
  let assignments = new Array(points.length).fill(0);

  for (let t = 0; t < iterations; t += 1) {
    assignments = points.map((p) => {
      let best = 0;
      let bestDist = Infinity;
      centroids.forEach((c, i) => {
        const d = (p.aiUsage - c.x) ** 2 + (p.studyHours - c.y) ** 2;
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      return best;
    });

    const nextCentroids = centroids.map((_, ci) => {
      const group = points.filter((__, i) => assignments[i] === ci);
      if (!group.length) return centroids[ci];
      const sumX = group.reduce((a, p) => a + p.aiUsage, 0);
      const sumY = group.reduce((a, p) => a + p.studyHours, 0);
      return { x: sumX / group.length, y: sumY / group.length };
    });
    centroids = nextCentroids;
  }

  const clusters = Array.from({ length: k }, (_, ci) =>
    points.filter((_, i) => assignments[i] === ci)
  );
  return { clusters, centroids };
}

// ── Intro slides (from PPTX) ──────────────────────────────────
function IntroSlide1({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — שער</div>
      <div className="hero-center">
        <div className="hero-title">שימושי <em>AI</em> מתקדמים לעסקים</div>
        <div className="hero-lecture-num">הרצאה 1</div>
        <div className="instructor-block">
          <div className="instructor-name">אוריאל אהרוני</div>
          <div className="instructor-role">CEO & Co-Founder</div>
          <div className="instructor-companies mono">Facio · Choco · InsurMedix</div>
        </div>
      </div>
    </div>
  );
}

function IntroSlide2({ slideNum }) {
  const items = [
    'פתיחה ומנהלות',
    'מבנה הקורס',
    'סקר ויצירת דאטה',
    'נתונים וסטטיסטיקה',
    'AI כחיזוי',
    'מבט קדימה',
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מבנה</div>
      <h2>מבנה <em>ההרצאה</em>.</h2>
      <p className="slide-sub">מה נעשה היום — צעד אחר צעד.</p>
      <div className="agenda-list">
        {items.map((label, i) => (
          <div key={label} className={`agenda-item ${i === 0 ? 'active-section' : ''}`}>
            <span className="agenda-num mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="agenda-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntroSlide3({ slideNum }) {
  const pillars = [
    {
      num: '01',
      title: 'להבין AI',
      bullets: ['איך מודלים לומדים מדאטה?', 'איך רשתות נוירונים עובדות?', 'איך מערכות כמו ChatGPT פועלות?'],
    },
    {
      num: '02',
      title: 'לדבר AI',
      bullets: ['מושגים כמו LLM, embeddings, transformers', 'מושגים כמו tokens, prompting, training', 'לקחת חלק פעיל בשיחה מקצועית על AI'],
    },
    {
      num: '03',
      title: 'להשתמש ב-AI',
      bullets: ['מחקר וניתוח מידע', 'יצירת תוכן ורעיונות', 'שימוש ב-AI בארגון / עסק'],
    },
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — תוצרים</div>
      <h2>עם מה <em>תצאו</em> מהקורס הזה?</h2>
      <p className="slide-sub">שלושה דברים שכל סטודנט ייקח מהקורס.</p>
      <div className="pillar-grid">
        {pillars.map(p => (
          <div key={p.num} className="pillar-card">
            <div className="pillar-num mono">{p.num}</div>
            <div className="pillar-title">{p.title}</div>
            <ul className="pillar-bullets">
              {p.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedTrend() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes drawLine { from { stroke-dashoffset: 60; } to { stroke-dashoffset: 0; } }
        @keyframes fadeArrow { 0% { opacity:0; transform:translateY(-4px); } 60% { opacity:0; } 100% { opacity:1; transform:translateY(0); } }
        .trend-line { stroke-dasharray: 60; animation: drawLine 1.2s ease forwards; }
        .trend-arrow { animation: fadeArrow 1.4s ease forwards; }
      `}</style>
      <line x1="8" y1="12" x2="40" y2="12" stroke="#2a2a2a" strokeWidth="1"/>
      <line x1="8" y1="24" x2="40" y2="24" stroke="#2a2a2a" strokeWidth="1"/>
      <line x1="8" y1="36" x2="40" y2="36" stroke="#2a2a2a" strokeWidth="1"/>
      <polyline className="trend-line" points="10,14 18,18 26,26 34,34 40,38" stroke="#e8ff47" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <polygon className="trend-arrow" points="40,38 36,32 40,34" fill="#e8ff47"/>
    </svg>
  );
}

function AnimatedBolt() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes boltPulse { 0%,100% { filter: drop-shadow(0 0 3px rgba(232,255,71,0.3)); } 50% { filter: drop-shadow(0 0 10px rgba(232,255,71,0.7)); } }
        @keyframes boltStrike { 0% { opacity:0; transform:translateY(-8px); } 30% { opacity:1; transform:translateY(0); } 100% { opacity:1; } }
        .bolt { animation: boltStrike 0.6s ease forwards, boltPulse 2s ease-in-out 0.6s infinite; }
      `}</style>
      <polygon className="bolt" points="26,4 14,22 22,22 18,44 34,20 24,20 30,4" fill="#e8ff47"/>
    </svg>
  );
}

function AnimatedCycle() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes spinCycle { from { transform-origin:24px 24px; transform:rotate(0deg); } to { transform-origin:24px 24px; transform:rotate(360deg); } }
        .cycle-group { animation: spinCycle 4s linear infinite; }
      `}</style>
      <g className="cycle-group">
        <path d="M24 8 A16 16 0 0 1 40 24" stroke="#e8ff47" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <polygon points="40,24 36,18 42,20" fill="#e8ff47"/>
        <path d="M40 24 A16 16 0 0 1 24 40" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <polygon points="24,40 30,36 28,42" fill="#ff6b35"/>
        <path d="M24 40 A16 16 0 0 1 8 24" stroke="#e8ff47" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <polygon points="8,24 12,30 6,28" fill="#e8ff47"/>
        <path d="M8 24 A16 16 0 0 1 24 8" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <polygon points="24,8 18,12 20,6" fill="#ff6b35"/>
      </g>
    </svg>
  );
}

function IntroSlide4({ slideNum }) {
  const reasons = [
    { icon: <AnimatedTrend />, title: 'עלות האינטליגנציה צונחת', desc: 'פעולות שפעם דרשו מומחים או צוותים שלמים ניתנות היום לביצוע בעזרת AI.' },
    { icon: <AnimatedBolt />, title: 'מכפיל כוח', desc: 'AI מאפשר לאנשים לעבוד עם יכולת כמעט של צוות שלם.' },
    { icon: <AnimatedCycle />, title: 'מודלים עסקיים משתנים', desc: 'שיווק, תוכן, מחקר, פיתוח תוכנה — הכל עובר שינוי.' },
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מוטיבציה</div>
      <h2>למה ללמוד היום <em>AI</em>?</h2>
      <p className="slide-sub">שלוש סיבות שלא ניתן להתעלם מהן.</p>
      <div className="reason-grid">
        {reasons.map(r => (
          <div key={r.title} className="reason-card">
            <div className="reason-icon">{r.icon}</div>
            <div className="reason-title">{r.title}</div>
            <div className="reason-desc">{r.desc}</div>
          </div>
        ))}
      </div>
      <Highlight color={ORANGE}>בעוד 5 שנים, ידע ב-AI יהיה <em>מיומנות בסיס</em> — כמו אקסל או אנגלית.</Highlight>
    </div>
  );
}

function IntroSlide5({ slideNum }) {
  // Timeline spans March 11 → June 24 = ~105 days
  // Foundations:   Mar 11 → Apr 15 = ~35 days  → 0% to 33%
  // Generative AI: Apr 15 → May 15 = ~30 days  → 33% to 62%
  // AI Apps:       May 15 → Jun 10 = ~26 days  → 62% to 87%
  // Presentations: Jun 10 → Jun 24             → 87% to 100%
  const phases = [
    {
      name: 'Foundations', left: '0%', width: '33%', color: '#e8ff47',
      topics: ['Data', 'Prediction', 'Machine Learning', 'Training', 'Neural Networks', 'Deep Learning', 'Embeddings'],
    },
    {
      name: 'Generative AI', left: '33%', width: '29%', color: '#ff6b35',
      topics: ['Language Models', 'Transformers', 'LLM', 'Prompting', 'RAG', 'Agents'],
    },
    {
      name: 'AI Applications', left: '62%', width: '25%', color: '#4ade80',
      topics: ['Process Automation', 'AI in Organizations', 'AI in Marketing', 'Generative Media', 'Ethics & Social Impact'],
    },
  ];

  // Month ticks positioned proportionally across the timeline
  // Mar = 0%, Apr ≈ 20%, May ≈ 49%, Jun ≈ 78%
  const months = [
    { label: 'MAR', left: '0%' },
    { label: 'APR', left: '20%' },
    { label: 'MAY', left: '49%' },
    { label: 'JUN', left: '78%' },
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סילבוס</div>
      <h2>מבנה <em>הקורס</em>.</h2>
      <p className="slide-sub">מ-data ועד agents — ארבעה חודשים של AI.</p>

      <div className="course-timeline">
        {/* Start marker */}
        <div className="ctl-endpoint ctl-start">
          <div className="ctl-endpoint-dot" />
          <div className="ctl-endpoint-label mono">START</div>
        </div>

        {/* End marker */}
        <div className="ctl-endpoint ctl-end">
          <div className="ctl-endpoint-dot end" />
          <div className="ctl-endpoint-label mono">END</div>
          <div className="ctl-endpoint-sub">מצגות סטודנטים</div>
        </div>

        {/* Track */}
        <div className="ctl-track">
          {/* Month tick marks */}
          {months.map(m => (
            <div key={m.label} className="ctl-month-tick" style={{ right: m.left }}>
              <div className="ctl-tick-line" />
              <div className="ctl-tick-label mono">{m.label}</div>
            </div>
          ))}

          {/* Phase blocks */}
          {phases.map(p => (
            <div key={p.name} className="ctl-phase" style={{ right: p.left, width: p.width }}>
              <div className="ctl-phase-bar" style={{ background: p.color }} />
              <div className="ctl-phase-name" style={{ color: p.color }}>{p.name}</div>
              <div className="ctl-phase-topics">
                {p.topics.map(t => <span key={t} className="ctl-chip">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IntroSlide6({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — עבודה סופית</div>
      <h2><em>AI in Business</em> — Final Project</h2>
      <p className="slide-sub">מטרת העבודה היא לנתח כיצד טכנולוגיות AI יכולות להתמודד עם בעיה עסקית או ארגונית אמיתית בארגון קיים.</p>
      <div className="card-grid cols3">
        <ConceptCard en="Theory" he="הבנה תיאורטית"
          def="הבנה של מושגים מרכזיים ב-AI מתוך הקורס." />
        <ConceptCard en="Business" he="ניתוח עסקי"
          def="ניתוח ארגון אמיתי, אתגרים ותהליכים משמעותיים." accent />
        <ConceptCard en="Critical Thinking" he="בחינה ביקורתית"
          def="הערכת התאמת טכנולוגיות AI לארגון, כולל מגבלות וסיכונים." />
      </div>
      <Highlight>העבודה משלבת בין <em>AI</em>, חשיבה עסקית, ויישום מעשי בארגון אמיתי.</Highlight>
    </div>
  );
}

function IntroSlide7({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — שלבים ולו״ז</div>
      <h2>שלבי העבודה <em>ולוחות זמנים</em>.</h2>
      <div className="project-steps">
        <div className="project-step">
          <div className="step-marker"><div className="step-num mono">01</div></div>
          <div className="step-body">
            <div className="step-title">שלב 1 – אישור הארגון</div>
            <div className="step-desc">יש לבחור ארגון אמיתי לניתוח (חברה עסקית, סטארט-אפ, גוף ציבורי, עמותה או ארגון בינלאומי) מכל מדינה.</div>
            <ul className="project-bullets">
              <li>שם הארגון</li>
              <li>תיאור קצר (2–3 משפטים)</li>
              <li>הבעיה הארגונית שברצונכם לבחון</li>
            </ul>
            <div className="step-date mono">📅 מועד אחרון: 29 באפריל 2026</div>
          </div>
        </div>
        <div className="project-step">
          <div className="step-marker"><div className="step-num mono">02</div></div>
          <div className="step-body">
            <div className="step-title">שלב 2 – הגשת העבודה הסופית</div>
            <div className="step-desc">העבודה תוגש כקובץ כתוב.</div>
            <ul className="project-bullets">
              <li>היקף מומלץ: 3,000–4,000 מילים</li>
              <li>לפחות 5 מקורות אקדמיים או מקצועיים</li>
            </ul>
            <div className="step-date mono">📅 מועד הגשה: 1 ביולי 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalProjectSlide8({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מבנה העבודה</div>
      <h2>מבנה <em>העבודה</em>.</h2>
      <p className="slide-sub">העבודה צריכה לכלול 5 חלקים. לכל חלק משקל נקודות מוגדר.</p>
      <div className="stat-row">
        <StatCard num="15" label="1. הצגת הארגון והבעיה העסקית" />
        <StatCard num="25" label="2. סקירה תיאורטית של מודלים ב-AI" />
        <StatCard num="25" label="3. סקירת כלים יישומיים והשפעתם" />
        <StatCard num="20" label="4. סיכונים ומגבלות" />
        <StatCard num="15" label="5. המלצות ליישום" />
      </div>
      <Highlight color={ORANGE}>סה״כ: <em>100 נקודות</em> (+ עד 10 נקודות בונוס אופציונלי לדמו).</Highlight>
    </div>
  );
}

function FinalProjectSlide9({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סעיפים 1–3</div>
      <h2>החלקים המרכזיים <em>(1–3)</em>.</h2>
      <div className="card-grid cols3">
        <ConceptCard en="1. Organization & Problem (15)" he="הצגת הארגון והבעיה העסקית"
          def="תחום פעילות, מודל עסקי, והגדרת בעיה ברורה שניתן להתמודד איתה באמצעות AI." />
        <ConceptCard en="2. AI Theory (25)" he="סקירה תיאורטית"
          def="להציג ולהסביר 2–3 מושגים מהקורס וכיצד הם רלוונטיים לבעיה בארגון." accent />
        <ConceptCard en="3. Practical Tools (25)" he="כלים יישומיים והשפעה"
          def="לבחון כלים/מערכות AI בפועל וההשפעה שלהם על תהליכים עסקיים." />
      </div>
      <div className="chart-wrap">
        <div className="chart-title mono">רובריקה מקוצרת — חלקים 1–3</div>
        <table className="demo-table">
          <thead><tr><th>חלק</th><th>מצוין</th><th>טוב</th><th>בסיסי</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>13–15 בעיה חדה ורלוונטית</td><td>10–12 תיאור טוב</td><td>0–9 בעיה כללית/לא ברורה</td></tr>
            <tr><td>2</td><td>22–25 הסבר מדויק ומקושר</td><td>18–21 נכון אך פחות מעמיק</td><td>0–17 סקירה חלקית/לא ברורה</td></tr>
            <tr><td>3</td><td>22–25 ניתוח מעשי ברור</td><td>18–21 סקירה טובה אך כללית</td><td>0–17 תיאור בסיסי/ללא ניתוח</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FinalProjectSlide10({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סעיפים 4–5</div>
      <h2>סיכונים, מגבלות ו<em>המלצות ליישום</em>.</h2>
      <div className="card-grid cols2">
        <ConceptCard en="4. Risks & Limits (20)" he="סיכונים ומגבלות"
          def="לנתח עלויות, נתונים, מגבלות טכנולוגיות, רגולציה, הטיות, שינוי ארגוני והשפעה על עובדים." />
        <ConceptCard en="5. Implementation Plan (15)" he="המלצות ליישום"
          def="להציע שלבי יישום, תהליכים להתחלה, והערכת ערך עסקי צפוי לארגון." accent />
      </div>
      <div className="chart-wrap">
        <div className="chart-title mono">רובריקה מקוצרת — חלקים 4–5</div>
        <table className="demo-table">
          <thead><tr><th>חלק</th><th>מצוין</th><th>טוב</th><th>בסיסי</th></tr></thead>
          <tbody>
            <tr><td>4</td><td>18–20 ניתוח ביקורתי ומעמיק</td><td>15–17 זיהוי סיכונים מרכזיים</td><td>0–14 ניתוח חלקי</td></tr>
            <tr><td>5</td><td>13–15 המלצות ברורות ומעשיות</td><td>10–12 המלצות כלליות</td><td>0–9 המלצות לא מגובשות/חסרות</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FinalProjectSlide11({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — בונוס ותמיכה</div>
      <h2>בונוס אופציונלי — <em>דמו חי</em>.</h2>
      <p className="slide-sub">בשיעור ההשלמה (1 ביולי 2026) ניתן להציג דמו קצר (~3 דקות) הקשור לפרויקט.</p>
      <div className="card-grid cols2">
        <div className="concept-card accent">
          <div className="concept-en mono">Bonus Demo (up to 10)</div>
          <div className="concept-he">עד 10 נקודות בונוס</div>
          <ul className="pillar-bullets" style={{ marginTop: 8 }}>
            <li>צ׳אטבוט מבוסס LLM</li>
            <li>כלי אוטומציה לתהליך עסקי</li>
            <li>prototype קטן לפתרון הבעיה</li>
          </ul>
          <div className="grade-goal">הבונוס רק מעלה ציון — לא מוריד</div>
        </div>
        <div className="concept-card">
          <div className="concept-en mono">Demo Support</div>
          <div className="concept-he">תמיכה בפיתוח דמואים</div>
          <div className="concept-def">
            סטודנטים המעוניינים לבנות דמו יוכלו לקבל גישה לטוקן OpenAI API בחסות Facio.
            הגישה תינתן בכמות שימוש מוגבלת המספיקה לפיתוח דמו.
          </div>
          <div className="grade-goal">לפניות: יש לפנות למרצה</div>
        </div>
      </div>
      <div className="chart-wrap">
        <div className="chart-title mono">רובריקה לבונוס</div>
        <table className="demo-table">
          <thead><tr><th>נקודות</th><th>קריטריון</th></tr></thead>
          <tbody>
            <tr><td>8–10</td><td>דמו ברור ומרשים עם יישום ממשי</td></tr>
            <tr><td>5–7</td><td>דמו עובד אך בסיסי</td></tr>
            <tr><td>1–4</td><td>הדגמה חלקית</td></tr>
            <tr><td>0</td><td>ללא דמו</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── AI Map Venn Diagram ────────────────────────────────────────
function AIMapSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מפת AI</div>
      <h2>מפת המושגים של <em>בינה מלאכותית</em></h2>
      <p className="slide-sub">AI • Machine Learning • Deep Learning • NLP • LLM • Generative AI</p>

      <div className="venn-container">
        <div className="venn-canvas">
          {/* AI — outermost */}
          <div className="venn-ring venn-ai">
            <span className="venn-tag venn-tag-ai">AI<span className="venn-tagdesc">Artificial Intelligence</span></span>
          </div>
          {/* Machine Learning — inside AI */}
          <div className="venn-ring venn-ml">
            <span className="venn-tag venn-tag-ml">Machine Learning</span>
          </div>
          {/* Deep Learning — inside ML, shifted right so NLP & GenAI can overlap */}
          <div className="venn-ring venn-dl">
            <span className="venn-tag venn-tag-dl">Deep Learning</span>
          </div>
          {/* NLP — overlaps DL from the right */}
          <div className="venn-ring venn-nlp">
            <span className="venn-tag venn-tag-nlp">NLP<span className="venn-tagdesc">Natural Language Processing</span></span>
          </div>
          {/* Generative AI — overlaps DL from the bottom */}
          <div className="venn-ring venn-genai">
            <span className="venn-tag venn-tag-genai">Generative AI</span>
          </div>
          {/* LLM — small circle at triple intersection DL ∩ NLP ∩ GenAI */}
          <div className="venn-ring venn-llm">
            <span className="venn-tag venn-tag-llm">LLM<span className="venn-tagdesc">Language Models</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── What is Intelligence? ──────────────────────────────────────
function IntelligenceSlide({ slideNum }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — אינטליגנציה</div>
      <h2>מהי <em>אינטליגנציה</em>? (ה-I ב-AI)</h2>

      {!revealed && (
        <div style={{ textAlign:'center', marginTop:40 }}>
          <button className="reveal-btn" onClick={() => setRevealed(true)}>💡 גלה</button>
        </div>
      )}

      {revealed && (
        <div className="reveal-content">
          <p className="slide-sub" style={{ marginBottom:24 }}>
            אינטליגנציה היא מושג שקשה להגדיר במדויק, אבל רוב החוקרים מסכימים שהיא כוללת יכולת:
          </p>
          <div className="intel-list">
            <div className="intel-item" style={{ animationDelay:'0.1s' }}>ללמוד מניסיון</div>
            <div className="intel-item" style={{ animationDelay:'0.25s' }}>להבין דפוסים</div>
            <div className="intel-item" style={{ animationDelay:'0.4s' }}>להסיק מסקנות</div>
            <div className="intel-item" style={{ animationDelay:'0.55s' }}>לפתור בעיות בתנאים של אי-ודאות</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Intelligence Components ───────────────────────────────────
function IntelComponentsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מרכיבי אינטליגנציה</div>
      <h2>מרכיבי <em>אינטליגנציה</em></h2>
      <div className="card-grid cols2">
        <ConceptCard en="Perception" he="תפיסה"
          def="קליטת מידע מהסביבה" />
        <ConceptCard en="Learning" he="למידה"
          def="שיפור ביצועים על בסיס ניסיון" />
        <ConceptCard en="Reasoning" he="הסקה"
          def="הסקת מסקנות מדפוסים" />
        <ConceptCard en="Problem Solving" he="פתרון בעיות"
          def="הגעה ליעד בתנאים של אי-ודאות" />
      </div>

      <div className="intel-timeline">
        <div className="intel-timeline-item">
          <span className="intel-year mono">1950</span>
          <span className="intel-who">אלן טיורינג</span>
          <span className="intel-what">המבחן ההתנהגותי — האם זה מתנהג כאינטליגנטי?</span>
        </div>
        <div className="intel-timeline-item">
          <span className="intel-year mono">1983</span>
          <span className="intel-who">הווארד גארדנר</span>
          <span className="intel-what">היכולת לפתור בעיות וליצור ערך תרבותי.</span>
        </div>
        <div className="intel-timeline-item">
          <span className="intel-year mono">2017</span>
          <span className="intel-who">מקס טגמרק</span>
          <span className="intel-what">היכולת להשיג מטרות מורכבות (הגדרה פונקציונלית).</span>
        </div>
      </div>
    </div>
  );
}

function WhatIsAISlide({ slideNum }) {
  const examples = ['הבנת שפה', 'זיהוי תמונות', 'קבלת החלטות', 'יצירת תוכן'];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מה זה AI</div>
      <h2>אז מה זה <em>Artificial Intelligence</em>?</h2>
      <p className="slide-sub">
        מערכות מחשב שמסוגלות לבצע משימות שבדרך כלל דורשות אינטליגנציה אנושית.
      </p>

      <div className="card-grid cols2">
        <ConceptCard
          en="Definition"
          he="הגדרה קצרה"
          def="מחשב שמבצע משימות של הבנה, ניתוח ויצירה ברמה שבדרך כלל מיוחסת לבני אדם."
          accent
        />
        <div className="concept-card">
          <div className="concept-en mono">Examples</div>
          <div className="concept-he">דוגמאות</div>
          <ul className="pillar-bullets" style={{ marginTop: 10 }}>
            {examples.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="ai-pipeline">
        <div className="ai-pipeline-node">
          <span className="ai-pipeline-label mono">Data</span>
          <span className="ai-pipeline-main">דאטה</span>
        </div>
        <div className="ai-pipeline-arrow" aria-hidden="true">←</div>
        <div className="ai-pipeline-node accent">
          <span className="ai-pipeline-label mono">Model</span>
          <span className="ai-pipeline-main">מודל</span>
        </div>
        <div className="ai-pipeline-arrow" aria-hidden="true">←</div>
        <div className="ai-pipeline-node">
          <span className="ai-pipeline-label mono">Prediction</span>
          <span className="ai-pipeline-main">חיזוי</span>
        </div>
      </div>
    </div>
  );
}

// ── Individual slides ─────────────────────────────────────────
function Slide1({ stats, slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — פתיחה</div>
      <h2>בואו נעשה <em>ניסוי</em>.</h2>
      <p className="slide-sub">במקום לדבר על data בצורה מופשטת — ניצור dataset אמיתי של הכיתה.</p>
      <LiveBadge n={stats?.n ?? 0} />
      <div className="card-grid cols2">
        <ConceptCard en="The experiment" he="הניסוי שלנו"
          def="כולכם מילאתם סקר קצר. עכשיו נשתמש בנתונים כדי להבין איך מודלי AI עובדים." />
        <ConceptCard en="The big question" he="השאלה הגדולה"
          def="האם אפשר לחזות את הציון שלך על סמך גיל, שינה, ממוצע ועוד?" />
      </div>
      <Highlight>אם נצליח לחזות ציון מ-11 משתנים — <em>הבנו בדיוק מה AI עושה</em>.</Highlight>
    </div>
  );
}

function Slide2({ stats, slideNum }) {
  const rows = stats?.rows ?? [];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Dataset</div>
      <h2>יצרנו <em>Dataset</em>.</h2>
      <p className="slide-sub">כל אחד מכם = שורה. כל שאלה = עמודה.</p>
      <LiveBadge n={stats?.n ?? 0} />
      <div className="flow-row" style={{ justifyContent: 'flex-end', marginBottom: 36 }}>
        <FlowBox label="סטודנט" sub="Data Point" />
        <span className="flow-arrow">|</span>
        <FlowBox label="עמודה" sub="Feature" />
        <span className="flow-arrow">|</span>
        <FlowBox label="ציון צפוי" sub="Target" highlight />
      </div>
      <div className="chart-wrap">
        <div className="chart-title mono">{rows.length} שורות מתוך {stats?.n ?? 0} — טבלת נתונים אמיתית</div>
        <table className="demo-table">
          <thead>
            <tr>
              <th>סטודנט</th><th>מגדר</th><th>גיל</th><th>ממוצע</th>
              <th>שינה</th><th>נוכחות</th><th>מוטיבציה</th>
              <th className="target-col">ציון צפוי ↓</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.gender}</td><td>{r.age}</td><td>{r.gpa}</td>
                <td>{r.sleep}</td><td>{r.attendance}</td><td>{r.motivation}</td>
                <td className="target-col">{r.grade}</td>
              </tr>
            ))}
            {stats && stats.n > rows.length && (
              <tr><td colSpan={8} style={{ color:'var(--dim)', textAlign:'center' }}>…עוד {stats.n - rows.length} שורות</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Slide3({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מושגי יסוד</div>
      <h2>שלושה <em>מושגים</em> חיוניים.</h2>
      <p className="slide-sub">80% מהז׳רגון ב-AI מגיע מאלה.</p>
      <div className="card-grid cols3">
        <ConceptCard en="Dataset" he="מסד הנתונים"
          def="כל הטבלה — כל הסטודנטים, כל הנתונים. זה מה שנותנים למודל." />
        <ConceptCard en="Feature" he="משתנה מסביר"
          def="כל עמודה — גיל, שינה, ממוצע. אלה הקלטים של המודל." accent />
        <ConceptCard en="Target / Label" he="משתנה היעד"
          def="מה שרוצים לחזות. במקרה שלנו: הציון הצפוי." accent />
      </div>
      <div className="tag-cloud">
        {['Dataset','Feature','Label','Model','Prediction','Training','Inference'].map(t => (
          <span key={t} className={`tag ${['Dataset','Feature','Label'].includes(t) ? 'active' : ''}`}>{t}</span>
        ))}
      </div>
      <Highlight>כל מודל AI בעולם מקבל <em>features</em> ומנסה לנבא <em>label</em>.</Highlight>
    </div>
  );
}

function Slide4({ stats, slideNum }) {
  if (!stats) return <div className="slide fade-up"><p className="slide-sub">ממתין לנתונים...</p></div>;

  const { histogram, mean, min, max, n } = stats;

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Target Variable</div>
      <h2>מה אנחנו <em>מנסים לחזות</em>?</h2>
      <p className="slide-sub">ה-Target: הציון הצפוי. זה ה-label שהמודל ינסה לנבא.</p>

      <div className="chart-wrap">
        <div className="chart-title mono">התפלגות ציונים צפויים — הכיתה שלנו (n={n})</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={histogram} margin={{ top:8, right:8, bottom:0, left:-10 }}>
            <CartesianGrid stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="bin" tick={{ fill: AXIS_COLOR, fontSize: 11, fontFamily:'Space Mono' }} />
            <YAxis tick={{ fill: AXIS_COLOR, fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:4 }}
              labelStyle={{ color:'var(--white)', fontFamily:'Space Mono', fontSize:12 }}
              itemStyle={{ color: ACCENT }}
            />
            <Bar dataKey="count" radius={[4,4,0,0]}>
              {histogram.map((entry, i) => (
                <Cell key={i} fill={entry.bin.startsWith('8') || entry.bin.startsWith('9') ? ACCENT : DIM_BAR} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="stat-row">
        <StatCard num={mean} label="ממוצע (Mean)" />
        <StatCard num={min}  label="מינימום" />
        <StatCard num={max}  label="מקסימום" />
        <StatCard num={n}    label="n סטודנטים" />
      </div>
    </div>
  );
}

function Slide5({ stats, slideNum }) {
  if (!stats) return <div className="slide fade-up"><p className="slide-sub">ממתין לנתונים...</p></div>;
  const { grades, mean, variance, n } = stats;
  // Build histogram bins (5-point width) from raw grades
  const binEdges = [55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  const histData = binEdges.slice(0, -1).map((edge, i) => {
    const hi = binEdges[i + 1];
    const count = grades.filter(g => g >= edge && g < hi).length;
    return { bin: `${edge}–${hi}`, count, mid: (edge + hi) / 2 };
  });

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סטטיסטיקה תיאורית</div>
      <h2><em>Mean</em> ו-<em>Variance</em>.</h2>
      <p className="slide-sub">הכלים הראשונים שאנחנו משתמשים בהם כדי להבין dataset.</p>

      <div className="card-grid cols2">
        <ConceptCard en="Mean — ממוצע" he={`${mean}`}
          def="סכום כל הערכים חלקי מספרם. נקודת המרכז של הנתונים." />
        <ConceptCard en="Variance — שונות" he={`${variance}`}
          def="עד כמה ערכים מפוזרים סביב הממוצע. שתי כיתות יכולות להיות עם אותו ממוצע — ופיזור שונה לחלוטין." />
      </div>

      <div className="formula-box mono">
        <span>
          μ ={' '}
          <span className="fvar">
            <span className="fsigma"><span className="fsigma-top">n</span><span className="fsigma-sym">Σ</span><span className="fsigma-bot">i=1</span></span>
            x<span className="fsub">i</span>
          </span>
          {' '}/ <span className="fvar">n</span>
        </span>
        <span className="fdivider">|</span>
        <span>
          σ² ={' '}
          <span className="fvar">
            <span className="fsigma"><span className="fsigma-top">n</span><span className="fsigma-sym">Σ</span><span className="fsigma-bot">i=1</span></span>
            (x<span className="fsub">i</span> − μ)<span className="fsup">2</span>
          </span>
          {' '}/ <span className="fvar">n</span>
        </span>
      </div>

      <div className="chart-wrap">
        <div className="chart-title mono">התפלגות ציונים — ממוצע ופיזור (n={n})</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={histData} margin={{ top:8, right:8, bottom:0, left:-10 }}>
            <CartesianGrid stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="bin" tick={{ fill: AXIS_COLOR, fontSize: 11, fontFamily:'Space Mono' }} />
            <YAxis allowDecimals={false} tick={{ fill: AXIS_COLOR, fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:4 }}
              labelStyle={{ color:'var(--white)', fontSize:11, fontFamily:'Space Mono' }}
              itemStyle={{ color: ACCENT }}
              formatter={(v) => [v, 'סטודנטים']}
            />
            <Bar dataKey="count" radius={[4,4,0,0]}>
              {histData.map((entry, i) => (
                <Cell key={i} fill={Math.abs(entry.mid - mean) > 10 ? ORANGE : ACCENT} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Slide6({ stats, slideNum }) {
  if (!stats) return <div className="slide fade-up"><p className="slide-sub">ממתין לנתונים...</p></div>;
  const { scatterPoints } = stats;

  const [excluded, setExcluded] = useState(new Set());
  const [selected, setSelected] = useState(null);

  const activePoints = scatterPoints.filter((_, i) => !excluded.has(i));
  const excludedPoints = scatterPoints.filter((_, i) => excluded.has(i));

  const reg = linearRegression(activePoints.map(p => ({ x: p.gpa, y: p.grade })));
  let trendLine = [];
  if (reg && activePoints.length > 1) {
    const xs = activePoints.map(p => p.gpa);
    const xMin = Math.min(...xs) - 2;
    const xMax = Math.max(...xs) + 2;
    trendLine = [
      { gpa: xMin, grade: +(reg.slope * xMin + reg.intercept).toFixed(1) },
      { gpa: xMax, grade: +(reg.slope * xMax + reg.intercept).toFixed(1) },
    ];
  }

  const handleDotClick = (data) => {
    const origIdx = scatterPoints.findIndex(p => p.gpa === data.gpa && p.grade === data.grade);
    setSelected(origIdx === selected ? null : origIdx);
  };
  const handleRemove = () => {
    if (selected !== null) {
      setExcluded(prev => new Set([...prev, selected]));
      setSelected(null);
    }
  };
  const handleRestore = () => { setExcluded(new Set()); setSelected(null); };

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Scatter & Correlation</div>
      <h2>האם <em>ממוצע הציונים</em> מנבא את הציון?</h2>
      <p className="slide-sub">לחצו על נקודה כדי לבחור אותה. נסו להסיר נקודות קיצוניות ולראות את ההשפעה על קו המגמה.</p>

      <div className="chart-wrap">
        <div className="chart-title mono" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
          <span>
            Scatter Plot — ממוצע ציונים vs ציון צפוי בקורס
            {reg && <span style={{ marginRight:16, color:ORANGE }}> R² = {reg.r2}</span>}
          </span>
          <span style={{ display:'flex', gap:8, alignItems:'center' }}>
            {selected !== null && (
              <button className="scatter-action-btn remove" onClick={handleRemove}>✕ הסר מהדאטה</button>
            )}
            {excluded.size > 0 && (
              <button className="scatter-action-btn restore" onClick={handleRestore}>↺ שחזר הכל ({excluded.size})</button>
            )}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart margin={{ top:8, right:20, bottom:20, left:-10 }}>
            <CartesianGrid stroke={GRID_COLOR} />
            <XAxis type="number" dataKey="gpa" domain={[55,100]} name="GPA"
              tick={{ fill: AXIS_COLOR, fontSize:11 }}
              label={{ value:'ממוצע ציונים נוכחי', fill: AXIS_COLOR, fontSize:11, position:'insideBottom', offset:-12 }} />
            <YAxis type="number" dataKey="grade" domain={[55,100]} name="ציון"
              tick={{ fill: AXIS_COLOR, fontSize:11 }} />
            <Tooltip
              cursor={{ strokeDasharray:'3 3' }}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0]?.payload;
                if (!d || d.gpa == null) return null;
                const predicted = reg ? +(reg.slope * d.gpa + reg.intercept).toFixed(1) : null;
                const loss = predicted !== null && d.grade != null ? +(d.grade - predicted).toFixed(1) : null;
                return (
                  <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:6, padding:'10px 14px', fontSize:12, fontFamily:'Space Mono', lineHeight:1.8 }}>
                    <div style={{ color:'var(--dim)' }}>ממוצע ציונים עד היום: <span style={{ color:'var(--white)' }}>{d.gpa}</span></div>
                    <div style={{ color:'var(--dim)' }}>ציון שהסטודנט מצפה לקבל: <span style={{ color:ACCENT }}>{d.grade}</span></div>
                    {predicted !== null && <div style={{ color:'var(--dim)' }}>ציון לפי המודל: <span style={{ color:ORANGE }}>{predicted}</span></div>}
                    {loss !== null && <div style={{ color:'var(--dim)' }}>טעות החיזוי: <span style={{ color: Math.abs(loss) > 5 ? '#ff4444' : ACCENT, direction:'ltr', unicodeBidi:'isolate', display:'inline-block' }}>{loss > 0 ? '+' : ''}{loss}</span></div>}
                  </div>
                );
              }}
            />
            {trendLine.length > 0 && (
              <Line
                data={trendLine}
                type="linear"
                dataKey="grade"
                stroke={ORANGE}
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={false}
                name="קו מגמה"
                legendType="none"
              />
            )}
            {excludedPoints.length > 0 && (
              <Scatter data={excludedPoints} fill="#555" name="הוסר" r={5} opacity={0.3}
                shape={(props) => (
                  <g>
                    <line x1={props.cx-4} y1={props.cy-4} x2={props.cx+4} y2={props.cy+4} stroke="#666" strokeWidth={2} />
                    <line x1={props.cx+4} y1={props.cy-4} x2={props.cx-4} y2={props.cy+4} stroke="#666" strokeWidth={2} />
                  </g>
                )}
              />
            )}
            <Scatter data={activePoints} name="סטודנט" r={7} opacity={0.85}
              onClick={handleDotClick} cursor="pointer">
              {activePoints.map((entry, i) => {
                const origIdx = scatterPoints.findIndex(p => p.gpa === entry.gpa && p.grade === entry.grade);
                const isSel = origIdx === selected;
                return <Cell key={i} fill={isSel ? '#ff4444' : ACCENT} stroke={isSel ? '#fff' : 'none'} strokeWidth={isSel ? 2 : 0} />;
              })}
            </Scatter>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <ConceptCard en="Correlation — מתאם" he="כשמשתנים משתנים יחד"
        def="אם סטודנטים עם ממוצע ציונים גבוה גם מצפים לציון גבוה — יש קשר חיובי. קו המגמה (כתום) מראה את הכיוון." />
    </div>
  );
}

function Slide7({ slideNum }) {
  const predictors = [
    { name: 'ממוצע עבר',    value: 95 },
    { name: 'שינה',          value: 78 },
    { name: 'נוכחות',        value: 75 },
    { name: 'מין',           value: 55 },
    { name: 'גיל',           value: 50 },
    { name: 'ביטחון עצמי',   value: 48 },
    { name: 'שעות לימוד',    value: 35 },
    { name: 'שימוש ב-AI',    value: 0 },
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מנבאים</div>
      <h2>מה מנבא <em>הכי טוב</em>?</h2>
      <p className="slide-sub">מה לדעתכם ניבא הכי טוב? הצביעו לפני שנראה את התשובה.</p>

      <div className="chart-wrap">
        <div className="chart-title mono">עוצמת מנבאים — לפי מחקר אקדמי</div>
        <div className="predictor-chart-layout">
          <div className="predictor-chart-canvas">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={predictors} layout="vertical" margin={{ top:8, right:10, bottom:8, left:8 }}>
                <CartesianGrid stroke={GRID_COLOR} horizontal={false} />
                <XAxis type="number" domain={[0,100]}
                  tick={{ fill: AXIS_COLOR, fontSize:10, fontFamily:'Space Mono' }} />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip
                  contentStyle={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:4 }}
                  itemStyle={{ color: ACCENT }}
                  formatter={v => [v === 0 ? '❓ לא ידוע' : `${v}/100`, 'עוצמה']}
                />
                <Bar dataKey="value" radius={[0,4,4,0]}>
                  {predictors.map((p, i) => (
                    <Cell key={i}
                      fill={p.value === 0 ? ORANGE : p.value >= 70 ? ACCENT : DIM_BAR}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="predictor-label-list">
            {predictors.map((p) => (
              <div key={p.name} className="predictor-label-item">{p.name}</div>
            ))}
          </div>
        </div>
      </div>

      <Highlight color={ORANGE}>
        הפתעה: <em>שינה מנבאת ציון טוב יותר משעות לימוד</em>. (Cheng et al., PNAS 2020)
      </Highlight>
    </div>
  );
}

function Slide8({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מודל</div>
      <h2>מה זה <em>מודל ML</em>?</h2>
      <p className="slide-sub">פונקציה מתמטית שלוקחת features ומחזירה חיזוי.</p>

      <div className="flow-row wrap">
        {['גיל','GPA','שינה','נוכחות'].map((f, i) => (
          <>
            <FlowBox key={f} label={f} sub="feature" />
            {i < 3 && <span className="flow-arrow" key={`a${i}`}>+</span>}
          </>
        ))}
        <span className="flow-arrow">→</span>
        <FlowBox label="חיזוי" sub="prediction" highlight />
      </div>

      <div className="formula-box mono" style={{ direction: 'ltr', unicodeBidi: 'isolate' }}>
        ŷ = <span className="fvar">w₁</span>·GPA + <span className="fvar">w₂</span>·sleep + <span className="fvar">w₃</span>·att + … + <span className="fvar">b</span>
      </div>

      <div className="card-grid cols2">
        <ConceptCard en="Weights — משקולות" he="כמה שווה כל feature?"
          def="המודל לומד לתת לכל feature משקל — כמה הוא חשוב לחיזוי הסופי." />
        <ConceptCard en="Prediction" he="הפלט של המודל"
          def="הערך שהמודל מחזיר. ב-regression: מספר רציף. ב-classification: קטגוריה." />
      </div>
    </div>
  );
}

function Slide9({ slideNum }) {
  const [revealed, setRevealed] = useState(false);
  const rows = [
    { feature: 'מטרה', stat: 'הסבר (Inference)', ml: 'חיזוי (Prediction)' },
    { feature: 'התמקדות', stat: 'הבנת הקשר בין משתנים', ml: 'דיוק בביצועים' },
    { feature: 'נתונים', stat: 'מדגמים קטנים', ml: 'הרבה נתונים' },
    { feature: 'מודלים', stat: 'ניתנים להסבר', ml: 'לעיתים מורכבים' },
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סטטיסטיקה מול למידת מכונה</div>
      <h2>מה ההבדל בין <em>סטטיסטיקה</em> ל-<em>למידת מכונה</em>?</h2>
      <p className="slide-sub">ראינו הרבה נוסחאות והגדרות שמזכירות מאוד סטטיסטיקה. אז מה למעשה ההבדל?</p>

      <div className="chart-wrap">
        <table className="demo-table stats-ml-table">
          <thead>
            <tr>
              <th>מאפיין</th>
              <th>סטטיסטיקה</th>
              <th>Machine Learning</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature}>
                <td>{row.feature}</td>
                <td>{revealed ? row.stat : '—'}</td>
                <td>{revealed ? row.ml : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="reveal-btn-subtle-row">
          <button className="reveal-btn subtle" onClick={() => setRevealed(true)}>
            {revealed ? '✓ נחשף' : 'חשוף טבלה'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProblemTypesSlide({ slideNum }) {
  const blocks = [
    {
      title: 'Regression',
      subtitle: 'מנבאים מספר',
      examples: ['מחיר דירה', 'ציון בקורס', 'זמן נסיעה'],
    },
    {
      title: 'Classification',
      subtitle: 'מנבאים קטגוריה',
      examples: ['Spam / Not Spam', 'Fraud / Legit', 'Customer churn'],
    },
    {
      title: 'Clustering',
      subtitle: 'מגלים קבוצות בדאטה',
      examples: ['סגמנטציית לקוחות', 'קבוצות משתמשים', 'דפוסי התנהגות'],
    },
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סוגי בעיות</div>
      <h2>סוגי בעיות שמודלים <em>פותרים</em></h2>
      <div className="card-grid cols3">
        {blocks.map((block) => (
          <div key={block.title} className="concept-card">
            <div className="concept-en mono">{block.title}</div>
            <div className="concept-he">{block.subtitle}</div>
            <div className="concept-def" style={{ marginBottom: 8 }}>דוגמאות:</div>
            <ul className="pillar-bullets">
              {block.examples.map((example) => <li key={example}>{example}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegressionAgeSlide({ stats, slideNum }) {
  if (!stats) return <div className="slide fade-up"><p className="slide-sub">ממתין לנתונים...</p></div>;
  const points = stats.ageGradePoints ?? [];
  const [excluded, setExcluded] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [modelType, setModelType] = useState('linear');
  const [polyDegree, setPolyDegree] = useState(2);
  const activePoints = points.filter((_, i) => !excluded.has(i));
  const excludedPoints = points.filter((_, i) => excluded.has(i));
  const regressionPoints = activePoints.map((p) => ({ x: p.age, y: p.grade }));
  const linearModel = linearRegression(regressionPoints);
  const nonLinearModel = polynomialRegression(regressionPoints, polyDegree);
  const currentModel = modelType === 'nonLinear' ? nonLinearModel : linearModel;
  const predictGrade = (age) => {
    if (modelType === 'nonLinear') return nonLinearModel ? nonLinearModel.predict(age) : null;
    return linearModel ? (linearModel.slope * age + linearModel.intercept) : null;
  };

  let trendLine = [];
  if (currentModel && activePoints.length > 1) {
    const xs = activePoints.map(p => p.age);
    const xMin = Math.min(...xs) - 1;
    const xMax = Math.max(...xs) + 1;
    const pointsOnCurve = modelType === 'nonLinear' ? (polyDegree === 3 ? 52 : 42) : 2;
    trendLine = Array.from({ length: pointsOnCurve }, (_, idx) => {
      const t = pointsOnCurve === 1 ? 0 : idx / (pointsOnCurve - 1);
      const age = xMin + (xMax - xMin) * t;
      const predicted = predictGrade(age);
      return { age, grade: +(predicted?.toFixed(1) ?? 0) };
    });
  }

  const handleDotClick = (data) => {
    const origIdx = points.findIndex(p => p.age === data.age && p.grade === data.grade);
    setSelected(origIdx === selected ? null : origIdx);
  };
  const handleRemove = () => {
    if (selected !== null) {
      setExcluded(prev => new Set([...prev, selected]));
      setSelected(null);
    }
  };
  const handleRestore = () => { setExcluded(new Set()); setSelected(null); };

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Regression</div>
      <h2><em>Regression</em> — האם הגיל יכול לנבא את הציון?</h2>
      <p className="slide-sub">לחצו על נקודה כדי לבחור. אפשר להסיר נקודות ולראות איך קו המגמה משתנה בזמן אמת.</p>

      <div className="chart-wrap">
        <div className="chart-title mono" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
          <span className="regression-chart-meta">
            <span className="regression-chart-topline">
              <span>Scatter Plot — גיל מול ציון צפוי</span>
              <span className="model-toggle-wrap">
                <span className="model-toggle-label">Linear</span>
                <button
                  type="button"
                  className={`model-toggle-switch ${modelType === 'nonLinear' ? 'active' : ''}`}
                  onClick={() => setModelType(prev => (prev === 'linear' ? 'nonLinear' : 'linear'))}
                  aria-label="Toggle linear and non-linear regression"
                  title="Toggle regression model"
                >
                  <span className="model-toggle-knob" />
                </button>
                <span className="model-toggle-label">Non-linear</span>
              </span>
              {modelType === 'nonLinear' && (
                <span className="poly-degree-wrap">
                  <span className="model-toggle-label">Degree</span>
                  <button
                    type="button"
                    className={`poly-degree-btn ${polyDegree === 2 ? 'active' : ''}`}
                    onClick={() => setPolyDegree(2)}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className={`poly-degree-btn ${polyDegree === 3 ? 'active' : ''}`}
                    onClick={() => setPolyDegree(3)}
                  >
                    3
                  </button>
                </span>
              )}
            </span>
            {currentModel && (
              <span className="regression-fit-metrics">
                <span style={{ color:ORANGE }}>R² = {currentModel.r2}</span>
                <span>Interpretability: {modelType === 'nonLinear' ? 'Lower' : 'High'}</span>
                <span>Complexity: {modelType === 'nonLinear' ? 'Higher' : 'Low'}</span>
              </span>
            )}
          </span>
          <span style={{ display:'flex', gap:8, alignItems:'center' }}>
            {selected !== null && (
              <button className="scatter-action-btn remove" onClick={handleRemove}>✕ הסר מהדאטה</button>
            )}
            {excluded.size > 0 && (
              <button className="scatter-action-btn restore" onClick={handleRestore}>↺ שחזר הכל ({excluded.size})</button>
            )}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={290}>
          <ComposedChart margin={{ top:8, right:20, bottom:20, left:-10 }}>
            <CartesianGrid stroke={GRID_COLOR} />
            <XAxis type="number" dataKey="age" domain={[18, 35]}
              tick={{ fill: AXIS_COLOR, fontSize:11 }}
              label={{ value:'Age', fill: AXIS_COLOR, fontSize:11, position:'insideBottom', offset:-12 }} />
            <YAxis type="number" dataKey="grade" domain={[55,100]}
              tick={{ fill: AXIS_COLOR, fontSize:11 }}
              label={{ value:'Grade', angle: -90, position:'insideLeft', fill: AXIS_COLOR, fontSize:11 }} />
            <Tooltip
              cursor={{ strokeDasharray:'3 3' }}
              contentStyle={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:6 }}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0]?.payload;
                if (!d || d.age == null) return null;
                const predictedRaw = predictGrade(d.age);
                const predicted = predictedRaw != null ? +predictedRaw.toFixed(1) : null;
                return (
                  <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:6, padding:'10px 14px', fontSize:12, fontFamily:'Space Mono', lineHeight:1.8 }}>
                    <div style={{ color:'var(--dim)' }}>גיל: <span style={{ color:'var(--white)' }}>{d.age}</span></div>
                    <div style={{ color:'var(--dim)' }}>ציון צפוי: <span style={{ color:ACCENT }}>{d.grade}</span></div>
                    {predicted !== null && <div style={{ color:'var(--dim)' }}>ציון לפי המודל: <span style={{ color:ORANGE }}>{predicted}</span></div>}
                  </div>
                );
              }}
            />
            {trendLine.length > 0 && (
              <Line
                data={trendLine}
                type={modelType === 'nonLinear' ? 'monotone' : 'linear'}
                dataKey="grade"
                stroke={ORANGE}
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={false}
              />
            )}
            {excludedPoints.length > 0 && (
              <Scatter data={excludedPoints} fill="#555" r={5} opacity={0.3}
                shape={(props) => (
                  <g>
                    <line x1={props.cx-4} y1={props.cy-4} x2={props.cx+4} y2={props.cy+4} stroke="#666" strokeWidth={2} />
                    <line x1={props.cx+4} y1={props.cy-4} x2={props.cx-4} y2={props.cy+4} stroke="#666" strokeWidth={2} />
                  </g>
                )}
              />
            )}
            <Scatter data={activePoints} r={7} opacity={0.9} onClick={handleDotClick} cursor="pointer">
              {activePoints.map((entry, i) => {
                const origIdx = points.findIndex(p => p.age === entry.age && p.grade === entry.grade);
                const isSel = origIdx === selected;
                return <Cell key={i} fill={isSel ? '#ff4444' : ACCENT} stroke={isSel ? '#fff' : 'none'} strokeWidth={isSel ? 2 : 0} />;
              })}
            </Scatter>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mini-math-box mono">
        <span>{modelType === 'nonLinear' ? `מודל לא ליניארי (פולינומי דרגה ${polyDegree}): ` : 'מודל ליניארי: '}<span className="fvar">{modelType === 'nonLinear' ? (polyDegree === 3 ? 'ŷ = β₀ + β₁·age + β₂·age² + β₃·age³' : 'ŷ = β₀ + β₁·age + β₂·age²') : 'ŷ = w·age + b'}</span></span>
        <span className="fdivider">|</span>
        <span>נוסחה: <span className="fvar">{modelType === 'nonLinear' ? (polyDegree === 3 ? 'grade = β₀ + β₁·age + β₂·age² + β₃·age³ + ε' : 'grade = β₀ + β₁·age + β₂·age² + ε') : 'grade = β₀ + β₁·age + ε'}</span></span>
      </div>
    </div>
  );
}

function ClassificationSlide({ stats, slideNum }) {
  if (!stats) return <div className="slide fade-up"><p className="slide-sub">ממתין לנתונים...</p></div>;
  const points = stats.engagementPoints ?? [];
  const pointsWithBenchmark = points.map((p) => ({
    ...p,
    attendancePct: p.attendance,
  }));
  const aggregatePoints = (arr) => {
    const map = new Map();
    arr.forEach((p) => {
      const key = `${p.interest}|${p.attendancePct}`;
      if (!map.has(key)) {
        map.set(key, { ...p, count: 1 });
      } else {
        map.get(key).count += 1;
      }
    });
    return [...map.values()];
  };
  const engaged = aggregatePoints(pointsWithBenchmark.filter(p => p.engaged));
  const low = aggregatePoints(pointsWithBenchmark.filter(p => !p.engaged));
  const decisionBoundary = 7;
  const decisionBoundaryY = 85;
  const renderCountBubble = (fill) => (props) => {
    const count = props.payload?.count ?? 1;
    const r = 4 + Math.min(count - 1, 6);
    return (
      <g>
        <circle cx={props.cx} cy={props.cy} r={r} fill={fill} opacity={0.92} />
        {count > 1 && (
          <text
            x={props.cx}
            y={props.cy + 1}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#0a0a0a"
          >
            {count}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Classification</div>
      <h2><em>Classification</em> - האם סטודנט יהיה מעורב בקורס?</h2>
      <p className="slide-sub">שלב 1 — קודם מגדירים Label ברור, ורק אחר כך מציירים מודל.</p>

      <div className="classification-rule-box">
        <div className="classification-rule-main mono">מעורב = עניין ≥ 7 &nbsp;AND&nbsp; נוכחות ≥ 85%</div>
        <div className="classification-rule-sub mono">לא מעורב = אחרת</div>
        <div className="classification-legend">
          <span className="legend-pill engaged">🟢 מעורב</span>
          <span className="legend-pill low">🔴 לא מעורב</span>
        </div>
      </div>

      <div className="chart-wrap">
        <div className="chart-title mono">שלב 2+3 — פיזור לפי label + קו החלטה</div>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart margin={{ top:8, right:20, bottom:20, left:-10 }}>
            <CartesianGrid stroke={GRID_COLOR} />
            <XAxis type="number" dataKey="interest" domain={[1,10]}
              tick={{ fill: AXIS_COLOR, fontSize:11 }}
              label={{ value:'עניין ב-AI', fill: AXIS_COLOR, fontSize:11, position:'insideBottom', offset:-12 }} />
            <YAxis
              type="number"
              dataKey="attendancePct"
              domain={[0,100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fill: AXIS_COLOR, fontSize:11 }}
              tickFormatter={(v) => `${v}%`}
              label={{ value:'נוכחות מתוכננת (%)', angle:-90, fill: AXIS_COLOR, fontSize:11, position:'insideLeft' }}
            />
            <Tooltip
              contentStyle={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:6 }}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const p = payload[0]?.payload;
                if (!p) return null;
                return (
                  <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:6, padding:'10px 14px', fontSize:12, fontFamily:'Space Mono', lineHeight:1.8 }}>
                    <div style={{ color:'var(--dim)' }}>עניין: <span style={{ color:'var(--white)' }}>{p.interest}</span></div>
                    <div style={{ color:'var(--dim)' }}>נוכחות מתוכננת: <span style={{ color:'var(--white)' }}>{p.attendancePct}%</span></div>
                    <div style={{ color:'var(--dim)' }}>סטודנטים בנקודה: <span style={{ color:ACCENT }}>{p.count ?? 1}</span></div>
                  </div>
                );
              }}
            />
            <ReferenceLine
              x={decisionBoundary}
              stroke={ORANGE}
              strokeDasharray="4 4"
              strokeWidth={1.5}
              ifOverflow="visible"
            />
            <ReferenceLine y={decisionBoundaryY} stroke={ORANGE} strokeDasharray="4 4" strokeWidth={1.5} ifOverflow="visible" />
            <ReferenceLine
              segment={[{ x: decisionBoundary, y: decisionBoundaryY }, { x: 10, y: decisionBoundaryY }]}
              stroke="#4ade80"
              strokeWidth={3}
            />
            <ReferenceLine
              segment={[{ x: decisionBoundary, y: decisionBoundaryY }, { x: decisionBoundary, y: 100 }]}
              stroke="#4ade80"
              strokeWidth={3}
            />
            <ReferenceLine
              segment={[{ x: 1, y: decisionBoundaryY }, { x: decisionBoundary, y: decisionBoundaryY }]}
              stroke="#ff5252"
              strokeWidth={3}
            />
            <ReferenceLine
              segment={[{ x: decisionBoundary, y: 0 }, { x: decisionBoundary, y: decisionBoundaryY }]}
              stroke="#ff5252"
              strokeWidth={3}
            />
            <Scatter
              data={engaged}
              fill="#4ade80"
              name="מעורב"
              shape={renderCountBubble('#4ade80')}
            />
            <Scatter
              data={low}
              fill="#ff5252"
              name="לא מעורב"
              shape={renderCountBubble('#ff5252')}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="classification-boundary-caption mono">
          <span>לא מעורב</span>
          <span className="boundary-sep">| x &lt; 7 |</span>
          <span style={{ color: ORANGE }}>קו החלטה</span>
          <span className="boundary-sep">| x ≥ 7 וגם y ≥ 85% |</span>
          <span>מעורב</span>
        </div>
      </div>

      <div className="mini-math-box mono">
        <div className="math-line">
          שלב 4 — Logistic Regression: &nbsp;
          <span className="fvar">P(y=1|x) = σ(w₁x₁ + w₂x₂ + b)</span>
        </div>
        <div className="math-line">
          המודל מחשב הסתברות שהסטודנט יהיה מעורב. אם <span className="fvar">P &gt; 0.5</span> → Engaged
        </div>
      </div>
    </div>
  );
}

function ClusteringSlide({ stats, slideNum }) {
  if (!stats) return <div className="slide fade-up"><p className="slide-sub">ממתין לנתונים...</p></div>;
  const points = stats.clusteringPoints ?? [];
  const { clusters, centroids } = kmeans(points, 3, 12);
  const colors = ['#4ade80', '#60a5fa', '#ff6b35'];
  const areaFills = ['rgba(74, 222, 128, 0.12)', 'rgba(96, 165, 250, 0.12)', 'rgba(255, 107, 53, 0.12)'];
  const labels = centroids.map((_, i) => `אשכול ${i + 1}`);
  const aggregateClusterPoints = (cluster) => {
    const map = new Map();
    cluster.forEach((p) => {
      const key = `${p.aiUsage}|${p.studyHours}`;
      if (!map.has(key)) {
        map.set(key, { ...p, count: 1 });
      } else {
        map.get(key).count += 1;
      }
    });
    return [...map.values()];
  };
  const clustersWithCount = clusters.map(aggregateClusterPoints);
  const clusterAreas = clusters.map((cluster, i) => {
    if (!cluster.length) return null;
    const xs = cluster.map((p) => p.aiUsage);
    const ys = cluster.map((p) => p.studyHours);
    const paddingX = 0.35;
    const paddingY = 0.35;
    return {
      key: `area-${i}`,
      x1: Math.max(0, Math.min(...xs) - paddingX),
      x2: Math.min(7, Math.max(...xs) + paddingX),
      y1: Math.max(0, Math.min(...ys) - paddingY),
      y2: Math.min(7, Math.max(...ys) + paddingY),
      fill: areaFills[i],
      stroke: colors[i],
    };
  }).filter(Boolean);

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Clustering</div>
      <h2><em>Clustering</em> - האם קיימות קבוצות שונות של סטודנטים בדאטה?</h2>
      <p className="slide-sub clustering-intro-line">האלגוריתם K-Means מחפש קבוצות של נקודות שדומות זו לזו.</p>

      <div className="chart-wrap">
        <div className="chart-title mono">X = AI usage frequency | Y = Study hours</div>
        <ResponsiveContainer width="100%" height={290}>
          <ScatterChart margin={{ top:8, right:20, bottom:20, left:-10 }}>
            <CartesianGrid stroke={GRID_COLOR} />
            <XAxis type="number" dataKey="aiUsage" domain={[0,7]}
              tick={{ fill: AXIS_COLOR, fontSize:11 }}
              label={{ value:'AI usage / week', fill: AXIS_COLOR, fontSize:11, position:'insideBottom', offset:-12 }} />
            <YAxis type="number" dataKey="studyHours" domain={[0,7]}
              tick={{ fill: AXIS_COLOR, fontSize:11 }}
              label={{ value:'Study hours / week', angle:-90, fill: AXIS_COLOR, fontSize:11, position:'insideLeft' }} />
            {clusterAreas.map((area) => (
              <ReferenceArea
                key={area.key}
                x1={area.x1}
                x2={area.x2}
                y1={area.y1}
                y2={area.y2}
                fill={area.fill}
                fillOpacity={1}
                stroke={area.stroke}
                strokeOpacity={0.55}
                strokeWidth={1.5}
              />
            ))}
            <Tooltip
              contentStyle={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:6 }}
              labelStyle={{ color:'var(--white)', fontFamily:'Space Mono', fontSize:11 }}
              itemStyle={{ color: ACCENT, fontFamily:'Space Mono', fontSize:11 }}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const p = payload[0]?.payload;
                if (!p) return null;
                const isCenter = p.label && String(p.label).startsWith('אשכול');
                return (
                  <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:6, padding:'10px 14px', fontSize:12, fontFamily:'Space Mono', lineHeight:1.8 }}>
                    {isCenter && <div style={{ color:ACCENT }}>Cluster center (mean)</div>}
                    <div style={{ color:'var(--dim)' }}>שימוש ב-AI: <span style={{ color:'var(--white)' }}>{p.aiUsage}</span></div>
                    <div style={{ color:'var(--dim)' }}>שעות לימוד: <span style={{ color:'var(--white)' }}>{p.studyHours}</span></div>
                    {!isCenter && <div style={{ color:'var(--dim)' }}>סטודנטים בנקודה: <span style={{ color:ACCENT }}>{p.count ?? 1}</span></div>}
                  </div>
                );
              }}
            />
            {clustersWithCount.map((cluster, i) => (
              <Scatter
                key={`c-${i}`}
                data={cluster}
                fill={colors[i]}
                name={labels[i]}
                shape={(props) => {
                  const r = 4 + Math.min((props.payload?.count ?? 1) - 1, 6);
                  return <circle cx={props.cx} cy={props.cy} r={r} fill={colors[i]} opacity={0.9} />;
                }}
              />
            ))}
            <Scatter
              data={centroids.map((c, i) => ({ aiUsage: c.x, studyHours: c.y, label: labels[i] }))}
              fill={ACCENT}
              shape={(props) => (
                <g>
                  <circle cx={props.cx} cy={props.cy} r={8} fill="#0a0a0a" stroke={ACCENT} strokeWidth={2} />
                  <text x={props.cx} y={props.cy + 3} textAnchor="middle" fontSize="11" fill={ACCENT}>μ</text>
                  <text x={props.cx + 12} y={props.cy - 10} fontSize="10" fill="#d4d4d4">Cluster center (mean)</text>
                </g>
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="cluster-legend">
        {labels.map((label, i) => (
          <div key={label} className="cluster-pill" style={{ borderColor: colors[i], color: colors[i] }}>
            {label}
          </div>
        ))}
      </div>

      <div className="clustering-bottom-row">
        <div className="cluster-steps-box">
          <div className="cluster-steps-title mono">K-Means algorithm</div>
          <ol className="cluster-steps">
            <li>בוחר K מרכזים</li>
            <li>כל נקודה מצטרפת למרכז הקרוב</li>
            <li>המרכזים מתעדכנים</li>
            <li>חוזר עד יציבות</li>
          </ol>
        </div>
        <div className="cluster-formula-mini mono">
          <div className="math-line">מאחורי הקלעים (אופטימיזציה):</div>
          <div className="math-line"><span className="fvar">min</span> Σ||xᵢ − μ<sub>cᵢ</sub>||²</div>
        </div>
      </div>
    </div>
  );
}

function Slide10({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Machine Learning</div>
      <h2><em>Machine Learning</em>.</h2>
      <p className="slide-sub">אנחנו לא כותבים את הכללים — המחשב לומד אותם מהדאטה.</p>

      <div className="card-grid cols3">
        <ConceptCard en="Training" he="אימון"
          def="המודל רואה דוגמאות רבות ולומד דפוסים. כמו ילד שלומד שפה." />
        <ConceptCard en="Loss Function" he="פונקציית שגיאה"
          def="מדד לכמה המודל טועה. האימון = מזעור השגיאה חזור וחזור." accent />
        <ConceptCard en="Generalization" he="הכללה"
          def="היכולת לנבא נכון על נתונים חדשים שהמודל לא ראה." />
      </div>

      <div className="chart-wrap" style={{ marginTop: 24 }}>
        <div className="chart-title mono">Training Loop</div>
        <div className="ml-cycle-wrap">
          <div className="ml-cycle-node n1">Data</div>
          <div className="ml-cycle-node n2">Model</div>
          <div className="ml-cycle-node n3">Prediction</div>
          <div className="ml-cycle-node n4 orange">Loss</div>
          <div className="ml-cycle-node n5 highlight">Update<br/>Weights</div>

          <div className="ml-cycle-arrow a1">→</div>
          <div className="ml-cycle-arrow a2">→</div>
          <div className="ml-cycle-arrow a3">→</div>
          <div className="ml-cycle-arrow a4">→</div>
          <div className="ml-cycle-arrow a5">↺</div>
        </div>
      </div>
    </div>
  );
}

function LearningModesSlide({ slideNum }) {
  const [revealed, setRevealed] = useState(false);
  const rows = [
    { problem: 'Regression', mode: 'למידה מונחית (Supervised)' },
    { problem: 'Classification', mode: 'למידה מונחית (Supervised)' },
    { problem: 'Clustering', mode: 'למידה בלתי מונחית (Unsupervised)' },
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סוגי למידה</div>
      <h2>שיטות למידה: <em>מונחית</em> (Supervised) מול <em>בלתי מונחית</em> (Unsupervised)</h2>
      <p className="slide-sub">נחזור לבעיות שלנו: Regression, Classification, Clustering.</p>

      <div className="chart-wrap">
        <table className="demo-table stats-ml-table">
          <thead>
            <tr>
              <th>סוג הבעיה</th>
              <th>אופן הלמידה</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.problem}>
                <td>{row.problem}</td>
                <td>{revealed ? row.mode : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="reveal-btn-subtle-row">
          <button className="reveal-btn subtle" onClick={() => setRevealed(true)}>
            {revealed ? '✓ נחשף' : 'חשוף תשובות'}
          </button>
        </div>

        {revealed && (
          <div className="learning-explain-box">
            <p>
              בלמידה מונחית (Supervised), המחשב הוא כמו תלמיד עם מורה: אנחנו נותנים לו את השאלות
              יחד עם התשובות הנכונות, והוא לומד את החוקיות כדי לפתור שאלות דומות בעתיד.
            </p>
            <p>
              בלמידה בלתי מונחית (Unsupervised), המחשב הוא חוקר עצמאי: אנחנו זורקים עליו ערימת נתונים
              בלי לומר לו מה לחפש, והוא צריך למצוא לבד קבוצות של דמיון או חריגות מעניינות.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Slide11({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הרעיון המרכזי</div>
      <h2><em>AI = Prediction</em>.</h2>
      <p className="slide-sub">הרעיון הכי חשוב בכל הקורס.</p>

      <div className="big-quote">
        AI הוא מערכת שלומדת מדאטה<br />כדי לבצע <em>חיזוי</em>.
      </div>

      <div className="card-grid cols2">
        <ConceptCard en="Our model" he="המודל שלנו"
          def="Input: גיל, GPA, שינה, נוכחות → Output: ציון צפוי" />
        <ConceptCard en="ChatGPT" he="אותו רעיון בדיוק"
          def="Input: כל הטקסט עד עכשיו → Output: המילה הבאה הכי סבירה" accent />
      </div>

      <Highlight color={ORANGE} style={{ fontSize: 20 }}>
        מחליפים ״ציון״ ב״מילה הבאה״ — <em>מקבלים GPT</em>.
      </Highlight>
    </div>
  );
}

function Slide12({ slideNum }) {
  const learned = ['Dataset ✓','Feature ✓','Label ✓','Model ✓','Prediction ✓','Training ✓'];
  const next = ['Neural Network →','Backprop →','Transformer →'];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מעבר</div>
      <h2>בהרצאה <em>הבאה</em>.</h2>
      <p className="slide-sub">עכשיו שאנחנו מבינים מה זה מודל — שאלה אחת נשארת פתוחה.</p>

      <div className="big-quote">
        איך מחשב <em>לומד</em> דפוסים<br />בתוך דאטה?
      </div>

      <div className="flow-row wrap" style={{ justifyContent:'center' }}>
        {['נתונים','למידה','רשתות נוירונים','למידה עמוקה'].map((s,i,arr) => (
          <>
            <FlowBox key={s} label={s} />
            {i < arr.length - 1 && <span className="flow-arrow" key={`a${i}`}>←</span>}
          </>
        ))}
        <span className="flow-arrow">←</span>
        <FlowBox label="LLM" highlight />
      </div>

      <div className="tag-cloud" style={{ marginTop:32 }}>
        {learned.map(t => <span key={t} className="tag active">{t}</span>)}
        {next.map(t   => <span key={t} className="tag">{t}</span>)}
      </div>

      <Highlight>הרצאה 2: <em>Machine Learning</em> — איך מודלים לומדים לחזות.</Highlight>
    </div>
  );
}

function Lecture2AgendaSlide({ slideNum }) {
  const items = [
    'עדכון לגבי עבודת הגמר',
    'חזרה קצרה על מודלים',
    'נתרגל אפיון מודל לעסקים',
    'נבנה מודל ליירוט טילים בלייזר',
    'נלמד מה הקשר בין נוירונים וסינפסות לבינה מלאכותית',
    'נתנסה בלמידה עמוקה Deep Learning',
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף פתיחה — מבנה ההרצאה</div>
      <h2>מבנה <em>ההרצאה</em>.</h2>
      <p className="slide-sub">מה נעשה היום — צעד אחר צעד.</p>
      <div className="agenda-list">
        {items.map((label, i) => (
          <div key={label} className="agenda-item">
            <span className="agenda-num mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="agenda-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThinkingFrameworkSlide({ slideNum }) {
  const questions = [
    'מה הבעיה העסקית?',
    'מה הערך שנרצה לייצר?',
    'איזה מידע יש לנו?',
    'מה הפלט שאנחנו צריכים מהמודל?',
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 01 — מסגרת החשיבה</div>
      <h2><em>מסגרת החשיבה</em></h2>
      <p className="slide-sub">כדי לחשוב נכון על AI, שואלים 4 שאלות:</p>

      <div className="card-grid cols2">
        {questions.map((q, i) => (
          <div key={q} className="concept-card">
            <div className="concept-en mono">Question {i + 1}</div>
            <div className="concept-he">{q}</div>
          </div>
        ))}
      </div>

      <Highlight>רק אחרי שמבינים את הבעיה — בוחרים מודל.</Highlight>
    </div>
  );
}

function ModelChoiceExampleSlide({ slideNum }) {
  const [revealed, setRevealed] = useState(new Set([0]));
  const items = [
    {
      key: 'problem',
      q: 'מה הבעיה העסקית?',
      a: 'האוניברסיטה מגלה מאוחר מדי אילו סטודנטים עלולים להיכשל או לנשור.',
    },
    {
      key: 'value',
      q: 'מה הערך שנרצה לייצר?',
      a: 'התערבות מוקדמת, שיפור הצלחה אקדמית, ירידה בנשירה.',
    },
    {
      key: 'data',
      q: 'איזה מידע יש לנו?',
      a: 'נוכחות, ציונים קודמים, שעות לימוד, שימוש במערכות הקורס, הגשות, רקע אקדמי.',
    },
    {
      key: 'output',
      q: 'מה הפלט שאנחנו צריכים מהמודל?',
      a: 'ציון סיכון לכל סטודנט, או תשובה כמו: בסיכון / לא בסיכון.',
    },
    {
      key: 'model',
      q: 'באיזה מודל מהמודלים שלמדנו נשתמש?',
      a: 'Classification',
    },
  ];

  const reveal = (idx) => {
    setRevealed((prev) => new Set([...prev, idx]));
  };

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 02 — דוגמה 1: זיהוי סטודנטים בסיכון</div>
      <h2><em>דוגמה 1:</em> זיהוי סטודנטים בסיכון</h2>
      <p className="slide-sub">אוניברסיטה</p>

      <div className="card-grid cols2">
        {items.map((item, idx) => (
          <div key={item.q} className={`concept-card ${idx === items.length - 1 ? 'model-choice-result-card accent' : ''}`}>
            <div className="concept-en mono">{item.key}</div>
            <div className="concept-he">{item.q}</div>
            {!revealed.has(idx) ? (
              <div className="reveal-btn-subtle-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
                <button className="reveal-btn subtle" onClick={() => reveal(idx)}>{idx === items.length - 1 ? 'בחר מודל' : 'תשובה'}</button>
              </div>
            ) : (
              <div className={`concept-def model-choice-answer ${idx === items.length - 1 ? 'model-choice-result-answer' : ''}`} style={{ marginTop: 8 }}>{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelChoiceRetailSlide({ slideNum }) {
  const [revealed, setRevealed] = useState(new Set([0]));
  const items = [
    {
      key: 'problem',
      q: 'מה הבעיה העסקית?',
      a: 'יש או חוסר במלאי או עודף מלאי, מה שפוגע במכירות וברווחיות.',
    },
    {
      key: 'value',
      q: 'מה הערך שנרצה לייצר?',
      a: 'להזמין את הכמות הנכונה, להקטין פחת, לשפר זמינות מוצרים.',
    },
    {
      key: 'data',
      q: 'איזה מידע יש לנו?',
      a: 'מכירות עבר, עונתיות, מבצעים, חגים, מזג אוויר, מיקום סניף, מחירים.',
    },
    {
      key: 'output',
      q: 'מה הפלט שאנחנו צריכים מהמודל?',
      a: 'כמות צפויה שתימכר לכל מוצר / סניף / שבוע.',
    },
    {
      key: 'model',
      q: 'באיזה מודל מהמודלים שלמדנו נבחר?',
      a: 'Regression',
    },
  ];

  const reveal = (idx) => {
    setRevealed((prev) => new Set([...prev, idx]));
  };

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 03 — דוגמה 2: תכנון מלאי</div>
      <h2><em>דוגמה 2:</em> תכנון מלאי</h2>
      <p className="slide-sub">רשת קמעונאית</p>

      <div className="card-grid cols2">
        {items.map((item, idx) => (
          <div key={item.q} className={`concept-card ${idx === items.length - 1 ? 'model-choice-result-card accent' : ''}`}>
            <div className="concept-en mono">{item.key}</div>
            <div className="concept-he">{item.q}</div>
            {!revealed.has(idx) ? (
              <div className="reveal-btn-subtle-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
                <button className="reveal-btn subtle" onClick={() => reveal(idx)}>{idx === items.length - 1 ? 'בחר מודל' : 'תשובה'}</button>
              </div>
            ) : (
              <div className={`concept-def model-choice-answer ${idx === items.length - 1 ? 'model-choice-result-answer' : ''}`} style={{ marginTop: 8 }}>{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelChoiceBankSlide({ slideNum }) {
  const [revealed, setRevealed] = useState(new Set([0]));
  const items = [
    {
      key: 'problem',
      q: 'מה הבעיה העסקית?',
      a: 'הבנק מדבר עם כל הלקוחות כמעט באותה שפה ולא מתאים הצעות או שירותים.',
    },
    {
      key: 'value',
      q: 'מה הערך שנרצה לייצר?',
      a: 'סגמנטציה טובה יותר, התאמה אישית, שיפור שיווק ושימור לקוחות.',
    },
    {
      key: 'data',
      q: 'איזה מידע יש לנו?',
      a: 'הכנסות, גיל, סוגי עסקאות, מוצרים פיננסיים, תדירות שימוש, ערוצים דיגיטליים, חסכונות/הלוואות.',
    },
    {
      key: 'output',
      q: 'מה הפלט שאנחנו צריכים מהמודל?',
      a: 'קבוצות לקוחות דומים או פרופילים התנהגותיים.',
    },
    {
      key: 'model',
      q: 'באיזה מודל מהמודלים שלמדנו נבחר?',
      a: 'Clustering',
    },
  ];

  const reveal = (idx) => {
    setRevealed((prev) => new Set([...prev, idx]));
  };

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 04 — דוגמה 3: סגמנטציית לקוחות</div>
      <h2><em>דוגמה 3:</em> סגמנטציית לקוחות</h2>
      <p className="slide-sub">בנק</p>

      <div className="card-grid cols2">
        {items.map((item, idx) => (
          <div key={item.q} className={`concept-card ${idx === items.length - 1 ? 'model-choice-result-card accent' : ''}`}>
            <div className="concept-en mono">{item.key}</div>
            <div className="concept-he">{item.q}</div>
            {!revealed.has(idx) ? (
              <div className="reveal-btn-subtle-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
                <button className="reveal-btn subtle" onClick={() => reveal(idx)}>{idx === items.length - 1 ? 'בחר מודל' : 'תשובה'}</button>
              </div>
            ) : (
              <div className={`concept-def model-choice-answer ${idx === items.length - 1 ? 'model-choice-result-answer' : ''}`} style={{ marginTop: 8 }}>{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelChoiceInsuranceSlide({ slideNum }) {
  const [revealed, setRevealed] = useState(new Set([0]));
  const items = [
    {
      key: 'problem',
      q: 'מה הבעיה העסקית?',
      a: 'חלק מהתביעות fraudulent, והחברה מאבדת כסף וזמן חקירה.',
    },
    {
      key: 'value',
      q: 'מה הערך שנרצה לייצר?',
      a: 'לזהות תביעות חשודות מוקדם, לצמצם הפסדים, לתעדף חקירות.',
    },
    {
      key: 'data',
      q: 'איזה מידע יש לנו?',
      a: 'פרטי מבוטח, היסטוריית תביעות, סוג אירוע, סכום תביעה, זמן מהפוליסה לתביעה, דפוסי מסמכים, נתוני צד ג׳.',
    },
    {
      key: 'output',
      q: 'מה הפלט שאנחנו צריכים מהמודל?',
      a: 'ציון סיכון להונאה או החלטה: חשוד / לא חשוד.',
    },
    {
      key: 'model',
      q: 'איזו בעיה המודל שלנו פותר?',
      a: 'Classification',
    },
  ];

  const reveal = (idx) => {
    setRevealed((prev) => new Set([...prev, idx]));
  };

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 05 — דוגמה 4: זיהוי הונאה בתביעות</div>
      <h2><em>דוגמה 4:</em> זיהוי הונאה בתביעות</h2>
      <p className="slide-sub">חברת ביטוח</p>

      <div className="card-grid cols2">
        {items.map((item, idx) => (
          <div key={item.q} className={`concept-card ${idx === items.length - 1 ? 'model-choice-result-card accent' : ''}`}>
            <div className="concept-en mono">{item.key}</div>
            <div className="concept-he">{item.q}</div>
            {!revealed.has(idx) ? (
              <div className="reveal-btn-subtle-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
                <button className="reveal-btn subtle" onClick={() => reveal(idx)}>{idx === items.length - 1 ? 'בחר מודל' : 'תשובה'}</button>
              </div>
            ) : (
              <div className={`concept-def model-choice-answer ${idx === items.length - 1 ? 'model-choice-result-answer' : ''}`} style={{ marginTop: 8 }}>{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelChoiceChurnSlide({ slideNum }) {
  const [revealed, setRevealed] = useState(new Set([0]));
  const items = [
    {
      key: 'problem',
      q: 'מה הבעיה העסקית?',
      a: 'לקוחות עוזבים, אבל החברה מזהה את זה מאוחר מדי.',
    },
    {
      key: 'value',
      q: 'מה הערך שנרצה לייצר?',
      a: 'להקטין churn, לשפר retention, לאפשר לצוות הצלחת לקוח להתערב בזמן.',
    },
    {
      key: 'data',
      q: 'איזה מידע יש לנו?',
      a: 'שימוש במוצר, מספר כניסות, פיצ׳רים שנצרכים, פתיחת tickets, NPS, חוזה, היסטוריית תשלומים, אינטראקציות עם צוות CS.',
    },
    {
      key: 'output',
      q: 'מה הפלט שאנחנו צריכים מהמודל?',
      a: 'הסתברות שלקוח ינטוש בחודש/רבעון הקרוב.',
    },
    {
      key: 'model',
      q: 'איזו בעיה המודל שלנו פותר?',
      a: 'Classification',
    },
  ];

  const reveal = (idx) => {
    setRevealed((prev) => new Set([...prev, idx]));
  };

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 06 — דוגמה 5: חיזוי נטישת לקוחות</div>
      <h2><em>דוגמה 5:</em> חיזוי נטישת לקוחות</h2>
      <p className="slide-sub">חברת תוכנה</p>

      <div className="card-grid cols2">
        {items.map((item, idx) => (
          <div key={item.q} className={`concept-card ${idx === items.length - 1 ? 'model-choice-result-card accent' : ''}`}>
            <div className="concept-en mono">{item.key}</div>
            <div className="concept-he">{item.q}</div>
            {!revealed.has(idx) ? (
              <div className="reveal-btn-subtle-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
                <button className="reveal-btn subtle" onClick={() => reveal(idx)}>{idx === items.length - 1 ? 'בחר מודל' : 'תשובה'}</button>
              </div>
            ) : (
              <div className={`concept-def model-choice-answer ${idx === items.length - 1 ? 'model-choice-result-answer' : ''}`} style={{ marginTop: 8 }}>{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelChoiceERLoadSlide({ slideNum }) {
  const [revealed, setRevealed] = useState(new Set([0]));
  const items = [
    {
      key: 'problem',
      q: 'מה הבעיה העסקית?',
      a: 'קשה לתכנן עומסים, צוותים וזמני המתנה.',
    },
    {
      key: 'value',
      q: 'מה הערך שנרצה לייצר?',
      a: 'הקצאת כוח אדם טובה יותר, קיצור זמני המתנה, שיפור שירות.',
    },
    {
      key: 'data',
      q: 'איזה מידע יש לנו?',
      a: 'היסטוריית הגעות, יום בשבוע, שעה, עונתיות, מזג אוויר, חגים, אירועים מיוחדים, מאפייני אוכלוסייה.',
    },
    {
      key: 'output',
      q: 'מה הפלט שאנחנו צריכים מהמודל?',
      a: 'מספר המטופלים הצפוי בפרק זמן מסוים.',
    },
    {
      key: 'model',
      q: 'מה הבעיה שהמודל שלנו פותר?',
      a: 'Regression',
    },
  ];

  const reveal = (idx) => {
    setRevealed((prev) => new Set([...prev, idx]));
  };

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 07 — דוגמה 6: עומס בחדר מיון</div>
      <h2><em>דוגמה 6:</em> עומס בחדר מיון</h2>
      <p className="slide-sub">בית חולים / מרפאה</p>

      <div className="card-grid cols2">
        {items.map((item, idx) => (
          <div key={item.q} className={`concept-card ${idx === items.length - 1 ? 'model-choice-result-card accent' : ''}`}>
            <div className="concept-en mono">{item.key}</div>
            <div className="concept-he">{item.q}</div>
            {!revealed.has(idx) ? (
              <div className="reveal-btn-subtle-row" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
                <button className="reveal-btn subtle" onClick={() => reveal(idx)}>{idx === items.length - 1 ? 'בחר מודל' : 'תשובה'}</button>
              </div>
            ) : (
              <div className={`concept-def model-choice-answer ${idx === items.length - 1 ? 'model-choice-result-answer' : ''}`} style={{ marginTop: 8 }}>{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Lecture2MachineLearningSlide({ slideNum }) {
  const classicRules = [
    'אם גיל > 25',
    'ואם ממוצע > 80',
    'ואם נוכחות > 85%',
    'אז "ציון גבוה"',
  ];
  const mlInputs = [
    'גיל',
    'ממוצע קודם',
    'שעות שינה',
    'נוכחות',
    'שעות לימוד',
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 08 — Machine Learning</div>
      <h2><em>Machine Learning</em></h2>
      <p className="slide-sub">במקום לכתוב למחשב את כל הכללים — נותנים לו ללמוד אותם מהדאטה.</p>

      <div className="ml-compare-grid">
        <div className="ml-compare-card">
          <div className="ml-compare-title">תכנות קלאסי</div>
          <div className="ml-compare-flow mono">Rules + Data → Output</div>
          <div className="ml-compare-sub">חוקים:</div>
          <ul className="ml-compare-list">
            {classicRules.map((line) => <li key={line}>{line}</li>)}
          </ul>
          <div className="ml-compare-note">האדם כותב את החוקים.</div>
        </div>

        <div className="ml-compare-card accent">
          <div className="ml-compare-title">Machine Learning</div>
          <div className="ml-compare-flow mono">Data + Answers → Model → Prediction</div>
          <div className="ml-compare-sub">דאטה:</div>
          <div className="ml-input-chips">
            {mlInputs.map((item) => <span key={item} className="ml-input-chip">{item}</span>)}
            <span className="ml-input-chip target">ציון בקורס</span>
          </div>
          <div className="ml-arrow mono">↓</div>
          <div className="ml-step">המודל לומד את הקשרים בעצמו</div>
          <div className="ml-arrow mono">↓</div>
          <div className="ml-step result">תחזית: ציון צפוי / סיכון / קבוצה</div>
          <div className="ml-compare-note">המודל לומד את החוקים מהדאטה.</div>
        </div>
      </div>
    </div>
  );
}

function InterceptLearningGameSlide({ slideNum }) {
  const [trueAngle, setTrueAngle] = useState(() => Math.floor(Math.random() * 91));
  const [angleGuess, setAngleGuess] = useState(0);
  const [history, setHistory] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [lastRun, setLastRun] = useState(null);
  const distance = 100;
  const trueW = trueAngle / 90;
  const guessedW = angleGuess / 90;

  const runForwardPass = () => {
    if (Number.isNaN(angleGuess)) return;
    const predictedOutput = guessedW * distance;
    const targetOutput = trueW * distance;
    const error = predictedOutput - targetOutput;
    const loss = error ** 2;
    const runEntry = {
      step: history.length + 1,
      angleGuess,
      guessedW,
      predictedOutput,
      loss,
    };
    setHistory((prev) => [...prev, runEntry]);
    setLastRun(runEntry);

    if (angleGuess > trueAngle) {
      setLastResult({ type: 'high', text: `פספסת! הזווית ${angleGuess}° גבוהה מדי.` });
    } else if (angleGuess < trueAngle) {
      setLastResult({ type: 'low', text: `פספסת! הזווית ${angleGuess}° נמוכה מדי.` });
    } else {
      setLastResult({ type: 'hit', text: 'בול פגיעה! המודל למד את המשקולת והגיע ל-Loss 0!' });
    }
  };

  const resetGame = () => {
    const nextAngle = Math.floor(Math.random() * 91);
    setTrueAngle(nextAngle);
    setAngleGuess(0);
    setHistory([]);
    setLastResult(null);
    setLastRun(null);
  };

  const currentLoss = history.length ? history[history.length - 1].loss : null;
  const prevLoss = history.length > 1 ? history[history.length - 2].loss : null;
  const lossDelta = currentLoss != null && prevLoss != null ? +(currentLoss - prevLoss).toFixed(2) : null;

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 09 — ניסוי יירוט</div>
      <h2>🚀 איך מחשב לומד <em>ליירט</em> טילים?</h2>
      <p className="slide-sub">המטרה: לנחש את ה-<span className="mono">W</span> בנוסחה: <span className="mono">Output = W × Distance</span></p>

      <div className="intercept-game-wrap">
        <div className="intercept-game-head">
          <div className="intercept-target-box">
            <div className="intercept-map-mini">
              <div className="country-node israel">
                <span className="country-flag">🇮🇱</span>
                <span>ישראל</span>
              </div>
              <div className="battle-lanes">
                <div className="distance-label mono">{distance} ק״מ</div>
                <div className="lane threat-lane">
                  <div className="lane-line" />
                  <span className="missile-dot" aria-hidden="true">🚀</span>
                </div>
                <div className="lane intercept-lane">
                  <div className="lane-line" />
                  <span className="laser-pulse" aria-hidden="true" />
                </div>
                <div className="meeting-point" aria-hidden="true" />
              </div>
              <div className="country-node iran">
                <span className="country-flag">🇮🇷</span>
                <span>איראן</span>
              </div>
            </div>
          </div>
          <div className="intercept-loss-box">
            <div className="intercept-loss-title mono">כמה טעינו?</div>
            <div className="intercept-loss-value">{currentLoss != null ? currentLoss.toFixed(2) : '—'}</div>
            <div className={`intercept-loss-delta mono ${lossDelta == null ? '' : lossDelta <= 0 ? 'good' : 'bad'}`}>
              {lossDelta == null ? 'ΔLoss: —' : `ΔLoss: ${lossDelta > 0 ? '+' : ''}${lossDelta.toFixed(2)}`}
            </div>
          </div>
        </div>

        <div className="intercept-controls">
          <label className="intercept-label">ניחוש זווית יירוט בין 0-90 מעלות</label>
          <input
            type="number"
            className="intercept-input mono"
            value={angleGuess}
            step="1"
            min="0"
            max="90"
            onChange={(e) => setAngleGuess(Math.max(0, Math.min(90, Number(e.target.value))))}
          />
          <div className="intercept-btn-row">
            <button className="ctrl-btn primary" onClick={runForwardPass}>יירוט!</button>
            <button className="ctrl-btn" onClick={resetGame}>איפוס</button>
          </div>
        </div>

        {lastResult && (
          <div className={`intercept-result ${lastResult.type}`}>
            {lastResult.text}
            {lastResult.type === 'hit' && lastRun && (
              <div className="intercept-hit-formula mono">
                הפונקציה שנלמדה: Output = {lastRun.guessedW.toFixed(3)} × Distance
                <span className="intercept-hit-subformula"> (W = Angle / 90)</span>
              </div>
            )}
          </div>
        )}

        {history.length > 0 && (
          <div className="intercept-history-wrap">
            <div className="chart-title mono">היסטוריית עדכוני המודל</div>
            <table className="demo-table intercept-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Angle (°)</th>
                  <th>W</th>
                  <th>Output (D=100)</th>
                  <th>Loss</th>
                </tr>
              </thead>
              <tbody>
                {[...history].reverse().map((row, i) => (
                  <tr key={`${row.step}-${i}`}>
                    <td>{row.step}</td>
                    <td>{row.angleGuess}</td>
                    <td>{row.guessedW.toFixed(3)}</td>
                    <td>{row.predictedOutput.toFixed(2)}</td>
                    <td>{row.loss.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Highlight>הלמידה היא על <em>W</em>, לא על התוצאה הסופית. ה-W הוא ה"תובנה" שנשארת לטווח ארוך.</Highlight>
    </div>
  );
}

function PigeonsPicassoSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 10 — היונים של פיקאסו</div>
      <h2>היונים של <em>פיקאסו</em></h2>
      <p className="slide-sub">
        בניסוי מפורסם ב-1995 חוקרים אימנו יונים להבדיל בין ציורים של פיקאסו לציורים של מונה.
      </p>

      <div className="pigeon-art-lab">
        <div className="art-style-card picasso">
          <div className="art-style-head mono">Picasso / Cubism</div>
          <div className="art-canvas cubism">
            <span className="shape a" />
            <span className="shape b" />
            <span className="shape c" />
            <span className="shape d" />
          </div>
          <div className="art-style-foot">קוביזם · זוויות חדות</div>
        </div>

        <div className="pigeon-core">
          <div className="pigeon-icon">🕊️</div>
          <div className="pigeon-loop mono">PECK → FEEDBACK → UPDATE</div>
          <div className="reward-track">
            <div className="reward-dot food" />
            <div className="reward-dot none" />
          </div>
          <div className="reward-caption">
            פיקאסו = אוכל <span className="sep">|</span> מונה = ללא פרס
          </div>
        </div>

        <div className="art-style-card monet">
          <div className="art-style-head mono">Monet / Impressionism</div>
          <div className="art-canvas impressionism">
            <span className="stroke s1" />
            <span className="stroke s2" />
            <span className="stroke s3" />
            <span className="stroke s4" />
          </div>
          <div className="art-style-foot">אימפרסיוניזם · משיחות רכות</div>
        </div>
      </div>

      <div className="card-grid cols2" style={{ marginTop: 18 }}>
        <div className="concept-card">
          <div className="concept-en mono">How It Worked</div>
          <div className="concept-def">
            בכל פעם שהיונה ניקרה בלחצן כשראתה פיקאסו היא קיבלה אוכל. כשניקרה מול מונה, לא קיבלה כלום.
          </div>
        </div>
        <div className="concept-card accent">
          <div className="concept-en mono">Result</div>
          <div className="concept-def">
            היונים למדו לזהות "סגנון", ואפילו הצליחו לסווג ציירים חדשים (כמו סזאן) לקטגוריה הנכונה.
          </div>
        </div>
      </div>

      <Highlight>
        מסקנה: היונה לא מבינה "אמנות" — היא פשוט מצאה את ה-<em>Weights</em> הוויזואליים שנותנים מקסימום
        פרס (אוכל) ומינימום טעות (רעב).
      </Highlight>
    </div>
  );
}

function TolmanMazeSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 11 — המפה הקוגניטיבית</div>
      <h2>המבוך של <em>טולמן</em> (המפה הקוגניטיבית)</h2>
      <p className="slide-sub">
        אדוארד טולמן הראה ב-1948 שעכברים לא רק "רצים ימינה ושמאלה" — הם בונים מפה פנימית של הסביבה.
      </p>

      <div className="tolman-maze-lab">
        <div className="tolman-maze-panel">
          <div className="tolman-maze-head mono">Exploration (ללא פרס)</div>
          <div className="tolman-maze-board">
            <div className="maze-grid" />
            <svg className="maze-path wandering" viewBox="0 0 300 180" preserveAspectRatio="none">
              <path d="M20,150 C30,120 65,122 72,95 C84,60 130,70 145,40 C170,12 198,30 210,64 C220,92 252,86 270,52" />
            </svg>
            <div className="maze-mouse">🐭</div>
            <div className="maze-goal ghost">🥕</div>
          </div>
          <div className="tolman-maze-note">נראה שאין למידה גלויה</div>
        </div>

        <div className="tolman-divider mono">→</div>

        <div className="tolman-maze-panel reward">
          <div className="tolman-maze-head mono">Reward Added (יש פרס)</div>
          <div className="tolman-maze-board">
            <div className="maze-grid" />
            <svg className="maze-path direct" viewBox="0 0 300 180" preserveAspectRatio="none">
              <path d="M20,150 L270,52" />
            </svg>
            <div className="maze-mouse fast">🐭</div>
            <div className="maze-goal">🥕</div>
          </div>
          <div className="tolman-maze-note">ריצה ישירה למטרה כאילו הכירו את הדרך</div>
        </div>
      </div>

      <div className="card-grid cols2" style={{ marginTop: 18 }}>
        <div className="concept-card">
          <div className="concept-en mono">What Happened?</div>
          <div className="concept-def">
            עכברים ששוטטו במבוך בלי אוכל נראו כאילו לא למדו כלום. אבל ברגע שהופיע פרס בקצה, הם נעו אליו ביעילות.
          </div>
        </div>
        <div className="concept-card accent">
          <div className="concept-en mono">Latent Learning</div>
          <div className="concept-def">
            למידה חבויה: המערכת סופגת מידע גם בלי "ציון" (Loss) על כל צעד. בהמשך, כשמופיעה משימה, הידע מתגלה.
          </div>
        </div>
      </div>

      <Highlight>
        זה הבסיס לרעיון שמודלים מודרניים (כמו GPT) קודם בונים "מפה" של העולם/השפה מתוך חשיפה רחבה,
        ורק אחר כך מיישמים אותה למשימות ספציפיות.
      </Highlight>
    </div>
  );
}

function JenniferAnistonNeuronSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 12 — התא היחיד</div>
      <h2>הנוירון של <em>"ג׳ניפר אניסטון"</em></h2>
      <p className="slide-sub">
        ב-2005 מצאו נוירונים במוח האנושי שמגיבים ספציפית לאדם מסוים - לפעמים אפילו רק לשם הכתוב שלו.
      </p>

      <div className="aniston-funny-lab">
        <div className="aniston-inputs">
          <div className="aniston-chip photo">📸 תמונה של ג׳ניפר</div>
          <div className="aniston-chip text">🔤 "Jennifer Aniston"</div>
          <div className="aniston-chip other">🧑 מישהו אחר</div>
        </div>

        <div className="aniston-neuron-core">
          <div className="aniston-neuron">🧠⚡</div>
          <div className="aniston-neuron-label mono">NEURON #A237</div>
          <div className="aniston-meter">
            <div className="aniston-meter-bar high" />
            <div className="aniston-meter-bar high" />
            <div className="aniston-meter-bar low" />
          </div>
          <div className="aniston-caption">"רק ג׳ניפר? אני נדלק!"</div>
        </div>

        <div className="aniston-output">
          <div className="aniston-out-box on">🔥 Activation: HIGH</div>
          <div className="aniston-out-box on">🔥 Activation: HIGH</div>
          <div className="aniston-out-box off">😴 Activation: LOW</div>
        </div>
      </div>

      <div className="card-grid cols2" style={{ marginTop: 18 }}>
        <div className="concept-card">
          <div className="concept-en mono">The Story</div>
          <div className="concept-def">
            בניתוחי מוח מצאו תא בודד שהגיב לתמונה של השחקנית, ואפילו כשכתבו את שמה בלי תמונה.
          </div>
        </div>
        <div className="concept-card accent">
          <div className="concept-en mono">Why It Matters For AI</div>
          <div className="concept-def">
            ברשת נוירונים מלאכותית מחפשים נוירונים עמוקים שלומדים תבניות מאוד ספציפיות: קו, עין, פנים או אובייקט.
          </div>
        </div>
      </div>

      <Highlight>
        הנוירון לא "מבין רכילות הוליוודית" — הוא פשוט למד פיצ׳רים שעושים לו מקסימום אקטיבציה ומינימום בלבול.
      </Highlight>
    </div>
  );
}

function ComputerBasicsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 13 — יסודות מחשב ל-AI</div>
      <h2>מה קורה בתוך <em>המחשב</em>?</h2>
      <p className="slide-sub">
        מחשב מעבד מידע דרך חישוב, זיכרון, וקבלת החלטות מהירה מאוד.
      </p>

      <div className="computer-core-line">
        מחשב לא "מבין" — הוא מחשב.
        <span className="sep">|</span>
        וב-AI, החישוב הזה קורה מיליוני פעמים.
      </div>

      <div className="computer-basics-layout">
        <div className="computer-flow-main">
          <div className="computer-flow-title mono">DATA → COMPUTE → OUTPUT</div>
          <div className="computer-flow-he">קלט ← חישוב ← פלט</div>

          <div className="computer-flow-grid">
            <div className="computer-step-card input">
              <div className="step-head mono">Input / קלט</div>
              <div className="step-icons">🔢 📝 🖼️ 🔊</div>
              <div className="step-text">מספרים, טקסט, תמונה, קול</div>
            </div>
            <div className="computer-step-card compute">
              <div className="step-head mono">Compute / חישוב</div>
              <div className="step-icons">➕ ✖️ ⚖️ ⚡</div>
              <div className="step-text">חיבור, כפל, השוואה, החלטה</div>
            </div>
            <div className="computer-step-card output">
              <div className="step-head mono">Output / פלט</div>
              <div className="step-icons">📈 🧩 🎯 💬</div>
              <div className="step-text">תחזית, סיווג, המלצה, טקסט</div>
            </div>
          </div>
        </div>

        <aside className="computer-side-panel">
          <div className="computer-side-title mono">החלקים שחשוב להכיר</div>

          <div className="computer-part">
            <div className="computer-part-name">CPU</div>
            <div className="computer-part-desc">
              מעבד כללי. מצוין ללוגיקה, בקרה, ותפעול רצף הפעולות.
            </div>
          </div>

          <div className="computer-part">
            <div className="computer-part-name">GPU</div>
            <div className="computer-part-desc">
              מעבד מקבילי. מצוין להרבה מאוד פעולות חישוב דומות בו-זמנית. לכן הוא חשוב במיוחד באימון מודלים.
            </div>
          </div>

          <div className="computer-part">
            <div className="computer-part-name">Memory</div>
            <div className="computer-part-desc">
              היכן שהנתונים והמודל נמצאים בזמן הריצה. אם אין מספיק זיכרון — קשה לאמן או להריץ מודלים גדולים.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function NeuronHeartbeatSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 14 — הנוירון</div>
      <h2>הלב הפועם של הלמידה — <em>הנוירון</em></h2>
      <p className="slide-sub">
        גם במוח וגם במחשב, יחידת היסוד מקבלת קלטים — ופועלת רק אם הם חזקים מספיק.
      </p>

      <div className="neuron-two-sides">
        <div className="neuron-side-card bio">
          <div className="neuron-side-head mono">במוח</div>
          <ul className="neuron-lines">
            <li>מקבל אותות מנוירונים אחרים</li>
            <li>מחבר את כל האותות יחד</li>
            <li>אם עבר סף — יורה אות הלאה</li>
          </ul>
          <div className="neuron-side-note">לא כל קלט מפעיל תגובה. רק קלט חזק מספיק.</div>
        </div>

        <div className="neuron-mid-flow mono">קלט ← שקלול ← סף ← פלט</div>

        <div className="neuron-side-card ai">
          <div className="neuron-side-head mono">במחשב</div>
          <ul className="neuron-lines">
            <li>מקבל מספרים כקלט</li>
            <li>נותן לכל קלט משקל שונה</li>
            <li>אם הסכום עבר סף — מעביר אות הלאה</li>
          </ul>
          <div className="neuron-side-note">המשקלים קובעים מה חשוב יותר, וה-Activation קובע אם להפעיל תגובה.</div>
        </div>
      </div>
    </div>
  );
}

function SynapsesSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 15 — סינפסות</div>
      <h2>סינפסות — המקום שבו <em>למידה</em> משנה את המערכת</h2>
      <p className="slide-sub">
        הידע לא נמצא רק בתוך הנוירון הבודד — אלא בעוצמת הקשרים בינו לבין אחרים.
      </p>

      <div className="synapse-side-by-side">
        <div className="synapse-panel brain">
          <div className="synapse-panel-head mono">במוח</div>
          <div className="synapse-visual brain-viz">
            <div className="brain-node send">נוירון שולח</div>
            <div className="synaptic-gap">רווח סינפטי</div>
            <div className="neuro-particles" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="brain-node recv">נוירון קולט</div>
            <div className="brain-label mono">Neurotransmitters</div>
          </div>
          <ul className="synapse-lines">
            <li>נוירונים מתקשרים דרך סינפסות</li>
            <li>חזרות מחזקות או מחלישות קשרים</li>
            <li>קשר חזק יותר = אות עובר בקלות רבה יותר</li>
          </ul>
        </div>

        <div className="synapse-panel ai">
          <div className="synapse-panel-head mono">ב-AI</div>
          <div className="synapse-visual ai-viz">
            <div className="ai-node left">Neuron A</div>
            <div className="ai-link">
              <div className="ai-link-line" />
              <div className="ai-weight-tag mono">Weight: 0.22 → 0.82</div>
              <div className="ai-weight-meter" aria-hidden="true">
                <span className="ai-weight-fill" />
              </div>
            </div>
            <div className="ai-node right">Neuron B</div>
          </div>
          <ul className="synapse-lines">
            <li>כל חיבור בין נוירונים מקבל Weight</li>
            <li>ה-Weight קובע כמה חזק האות יעבור</li>
            <li>למידה משנה את ה-Weights האלה</li>
          </ul>
        </div>
      </div>

      <div className="synapse-big-message">
        כשאומרים שמודל הוא "גדול", הכוונה היא שיש בו מספר עצום של פרמטרים — כלומר המון חיבורים שניתן לכוונן.
      </div>

      <Highlight>
        למידה = חיזוק והחלשה של קשרים.
        <br />
        במוח — דרך סינפסות.
        <br />
        ב-AI — דרך משקלים (Weights).
      </Highlight>
    </div>
  );
}

function HowModelLearnsSlide({ slideNum }) {
  const steps = [
    { title: '1. קלט', desc: 'המודל מקבל נתונים', en: 'Input' },
    { title: '2. תחזית', desc: 'המודל מייצר תשובה', en: 'Prediction' },
    { title: '3. טעות', desc: 'משווים למציאות ומודדים את הפער', en: 'Error' },
    { title: '4. עדכון', desc: 'משנים את ה-Weights כדי לטעות פחות בפעם הבאה', en: 'Update' },
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף 16 — איך המודל לומד?</div>
      <h2>איך המודל <em>לומד</em>?</h2>
      <p className="slide-sub">המודל מנחש, מודד את הטעות, ומעדכן את הקשרים שלו.</p>

      <div className="learning-loop-strip">
        {steps.map((s, i) => (
          <div key={s.title} className="learning-step">
            <div className="learning-step-en mono">{s.en}</div>
            <div className="learning-step-title">{s.title}</div>
            <div className="learning-step-desc">{s.desc}</div>
            {i < steps.length - 1 && <div className="learning-step-arrow">←</div>}
          </div>
        ))}
      </div>

      <div className="learning-repeat-row">
        <span className="repeat-loop mono">↺ Repeat</span>
        <span className="repeat-note">Gradient Descent: כל צעד מזיז קצת את המשקלים לכיוון שמפחית Loss</span>
      </div>

      <Highlight>למידה = ניחוש ← טעות ← תיקון ← שיפור</Highlight>
    </div>
  );
}

const FINAL_EXERCISE_CASES = [
  {
    number: 1,
    student: 'סטודנט א׳',
    fields: [
      ['ממוצע קודם', '91'],
      ['שעות שינה', '7'],
      ['נוכחות', '90%–100%'],
      ['שעות לימוד', '4–5'],
      ['עניין בקורס', '9/10'],
      ['ביטחון עצמי', '8/10'],
      ['שימוש ב-AI', 'כל יום, כמה פעמים'],
    ],
    predictionPrompt: 'איזה ציון הייתם חוזים?',
    reveal: 92,
    insight: 'הישגים קודמים + השקעה + עניין מרגישים כמו חוק ראשוני.',
    teacherLine: 'מעולה. כרגע נראה שיש כיוון. אבל מודל טוב לא נבנה מדוגמה אחת.',
  },
  {
    number: 2,
    student: 'סטודנט ב׳',
    fields: [
      ['ממוצע קודם', '93'],
      ['שעות שינה', '5'],
      ['נוכחות', '70%–85%'],
      ['שעות לימוד', '0–1'],
      ['עניין בקורס', '8/10'],
      ['ביטחון עצמי', '10/10'],
      ['שימוש ב-AI', 'כל יום, כמה פעמים'],
    ],
    predictionPrompt: 'מה הייתם חוזים עכשיו?',
    reveal: 68,
    insight: 'ממוצע קודם/ביטחון/שימוש ב-AI לא מספיקים לבדם; נוכחות והשקעה קיבלו יותר משקל.',
  },
  {
    number: 3,
    student: 'סטודנט ג׳',
    fields: [
      ['ממוצע קודם', '76'],
      ['שעות שינה', '8+'],
      ['נוכחות', '90%–100%'],
      ['שעות לימוד', '6+'],
      ['עניין בקורס', '10/10'],
      ['ביטחון עצמי', '6/10'],
      ['שימוש ב-AI', '1–3 פעמים בשבוע'],
    ],
    predictionPrompt: 'מה הייתם חוזים?',
    reveal: 94,
    insight: 'התמדה ונוכחות יכולים לגבור על ממוצע קודם נמוך יותר.',
  },
  {
    number: 4,
    student: 'סטודנט ד׳',
    fields: [
      ['ממוצע קודם', '88'],
      ['שעות שינה', '8+'],
      ['נוכחות', '85%–100%'],
      ['שעות לימוד', '2–3'],
      ['עניין בקורס', '4/10'],
      ['ביטחון עצמי', '9/10'],
      ['שימוש ב-AI', 'כל יום, כמה פעמים'],
    ],
    predictionPrompt: 'מה הייתם חוזים?',
    reveal: 79,
    insight: 'לא קטסטרופה ולא הברקה - העולם לא בינארי, ויש כנראה משתנים חסרים.',
    extraQuestion: 'האם יש כאן משתנה שחסר לנו?',
  },
  {
    number: 5,
    student: 'סטודנט ה׳',
    fields: [
      ['ממוצע קודם', '81'],
      ['שעות שינה', '7'],
      ['נוכחות', '90%–100%'],
      ['שעות לימוד', '4–5'],
      ['עניין בקורס', '8/10'],
      ['ביטחון עצמי', '7/10'],
      ['שימוש ב-AI', 'כלל לא'],
    ],
    predictionPrompt: 'מה הייתם חוזים?',
    reveal: 90,
    insight: 'שימוש ב-AI הוא לא בהכרח המשתנה המרכזי; התנהלות כוללת לפעמים חשובה יותר.',
  },
  {
    number: 6,
    student: 'סטודנט ו׳',
    fields: [
      ['ממוצע קודם', '84'],
      ['שעות שינה', '6'],
      ['נוכחות', '85%–100%'],
      ['שעות לימוד', '4–5'],
      ['עניין בקורס', '8/10'],
      ['ביטחון עצמי', '8/10'],
      ['שימוש ב-AI', '4–7 פעמים בשבוע'],
    ],
    predictionPrompt: 'מה הייתם חוזים?',
    reveal: 83,
    insight: 'לא תמיד יש טוויסט: לפעמים המודל נותן הערכה סבירה, גם אם לא מושלמת.',
    extraQuestion: 'אם עדיין לא חזינו מושלם - האם המודל בהכרח גרוע?',
  },
];

function FinalExerciseCaseSlide({ slideNum, caseData, withIntro = false }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף {slideNum} — אתם המודל</div>
      <h2>דוגמה {caseData.number}: <em>{caseData.student}</em></h2>

      {withIntro && (
        <div className="exercise-intro-box">
          <div className="exercise-intro-title">אתם המודל</div>
          <div className="exercise-intro-text">
            עכשיו אתם לא סטודנטים — אתם מודל. המטרה היא לא רק לדייק, אלא לשים לב איך האינטואיציה משתנה אחרי כל דוגמה.
          </div>
        </div>
      )}

      <div className="chart-wrap">
        <div className="chart-title mono">{caseData.student} — נתוני קלט קבועים</div>
        <div className="exercise-fields-grid">
          {caseData.fields.map(([label, value]) => (
            <div key={label} className="exercise-field-card">
              <div className="exercise-field-label">{label}</div>
              <div className="exercise-field-value">{value}</div>
            </div>
          ))}
        </div>

        <div className="exercise-big-question">{caseData.predictionPrompt}</div>

        {!revealed ? (
          <div className="reveal-btn-subtle-row" style={{ justifyContent: 'center', marginTop: 10 }}>
            <button className="reveal-btn" onClick={() => setRevealed(true)}>Reveal</button>
          </div>
        ) : (
          <div className="exercise-reveal-box">
            <div className="exercise-reveal-grade">ציון סופי בפועל: <span>{caseData.reveal}</span></div>
            <div className="exercise-reveal-insight">{caseData.insight}</div>
            {caseData.teacherLine && <div className="exercise-teacher-line">{caseData.teacherLine}</div>}
            <div className="exercise-reflect-questions">
              <div>1. מה גרם לכם לשנות את ההערכה?</div>
              <div>2. איזה משתנה קיבל עכשיו יותר או פחות משקל אצלכם?</div>
              {caseData.extraQuestion && <div>+ {caseData.extraQuestion}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FinalExercise1Slide(props) { return <FinalExerciseCaseSlide {...props} caseData={FINAL_EXERCISE_CASES[0]} withIntro />; }
function FinalExercise2Slide(props) { return <FinalExerciseCaseSlide {...props} caseData={FINAL_EXERCISE_CASES[1]} />; }
function FinalExercise3Slide(props) { return <FinalExerciseCaseSlide {...props} caseData={FINAL_EXERCISE_CASES[2]} />; }
function FinalExercise4Slide(props) { return <FinalExerciseCaseSlide {...props} caseData={FINAL_EXERCISE_CASES[3]} />; }
function FinalExercise5Slide(props) { return <FinalExerciseCaseSlide {...props} caseData={FINAL_EXERCISE_CASES[4]} />; }
function FinalExercise6Slide(props) { return <FinalExerciseCaseSlide {...props} caseData={FINAL_EXERCISE_CASES[5]} />; }

function FinalExerciseSummarySlide({ slideNum }) {
  const questions = [
    'איזה משתנים התחלתם להחשיב יותר?',
    'איזה משתנים איבדו אצלכם חשיבות?',
    'באיזה רגע הרגשתם ביטחון מוקדם מדי?',
    'איזה מידע נוסף הייתם רוצים לאסוף כדי לחזות טוב יותר?',
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף {slideNum} — סיכום תרגיל</div>
      <h2>מה קרה ל"<em>מודל</em>" שלכם תוך כדי?</h2>
      <div className="card-grid cols2">
        {questions.map((q, i) => (
          <div key={q} className="concept-card">
            <div className="concept-en mono">Reflection {i + 1}</div>
            <div className="concept-he">{q}</div>
          </div>
        ))}
      </div>
      <Highlight>
        מה שחוויתם עכשיו הוא לב הלמידה.
        <br />
        התחלתם עם השערה, פגשתם מציאות, טעיתם, ועדכנתם את הדרך שבה אתם שוקלים מידע.
        <br />
        זה בדיוק מה שמודל עושה — רק במספרים, ובקנה מידה עצום.
      </Highlight>
    </div>
  );
}

function NextChapterTeaserSlide({ slideNum }) {
  const topics = ['Deep Learning', 'Backpropagation', 'Embeddings', 'Transformers'];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">הרצאה 2 — שקף {slideNum} — טיזר</div>
      <h2>ב<em>פרק הבא</em></h2>
      <p className="slide-sub">
        עד עכשיו שאלנו איך מודל לומד.
        <br />
        בפעם הבאה נשאל איך מודל מתחיל להבין מבנים מורכבים, שפה, והקשרים.
      </p>

      <div className="next-chapter-hero">
        <div className="next-chapter-grid">
          {topics.map((topic) => (
            <div key={topic} className="next-topic-card">
              <span className="mono">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Slides page ──────────────────────────────────────────
const SLIDE_COMPONENTS = [
  IntroSlide1, IntroSlide2, IntroSlide3, IntroSlide4, IntroSlide5,
  IntroSlide6, IntroSlide7, FinalProjectSlide8, FinalProjectSlide9, FinalProjectSlide10, FinalProjectSlide11,
  AIMapSlide, IntelligenceSlide, IntelComponentsSlide,
  WhatIsAISlide,
  Slide1, Slide2, Slide3, Slide4, Slide5,
  Slide6, Slide7, Slide9, Slide8, ProblemTypesSlide,
  RegressionAgeSlide, ClassificationSlide, ClusteringSlide,
  Slide10, LearningModesSlide, Slide11, Slide12, Lecture2AgendaSlide, ThinkingFrameworkSlide, ModelChoiceExampleSlide, ModelChoiceRetailSlide,
  ModelChoiceBankSlide, ModelChoiceInsuranceSlide, ModelChoiceChurnSlide, ModelChoiceERLoadSlide, Lecture2MachineLearningSlide,
  InterceptLearningGameSlide, PigeonsPicassoSlide, TolmanMazeSlide, JenniferAnistonNeuronSlide, ComputerBasicsSlide,
  NeuronHeartbeatSlide, SynapsesSlide, HowModelLearnsSlide,
  FinalExercise1Slide, FinalExercise2Slide, FinalExercise3Slide, FinalExercise4Slide, FinalExercise5Slide, FinalExercise6Slide,
  FinalExerciseSummarySlide, NextChapterTeaserSlide
];

export default function Slides() {
  const [current, setCurrent] = useState(0);
  const [showQR, setShowQR]   = useState(false);
  const { stats, connected, newFlash } = useStats();

  const SlideComp = SLIDE_COMPONENTS[current];

  return (
    <div className="slides-page">
      <NewSubmissionToast visible={newFlash} />
      <QROverlay show={showQR} onClose={() => setShowQR(false)} />

      {/* Sidebar nav */}
      <nav className="slides-nav">
        <div className="nav-logo">
          <div className="mono" style={{ fontSize:10, color:'var(--dim)', letterSpacing:'0.18em', textTransform:'uppercase' }}>הרצאה 1</div>
          <div style={{ fontSize:14, fontWeight:700, marginTop:4 }}>AI = חיזוי</div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:8 }}>
            <div className={`conn-dot ${connected ? 'on' : 'off'}`} />
            <span className="mono" style={{ fontSize:10, color:'var(--dim)' }}>
              {connected ? 'מחובר' : 'מתחבר...'}
            </span>
          </div>
        </div>
        {SLIDE_LIST.map((s, i) => (
          <div
            key={s.id}
            className={`nav-item ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          >
            <span className="nav-num mono">{s.navNum ?? `0${s.id}`}</span>
            <span className="nav-title">{s.title}</span>
          </div>
        ))}

        {/* QR button at bottom of nav */}
        <div style={{ marginTop:'auto', padding:'16px 18px', borderTop:'1px solid var(--border)' }}>
          <button className="qr-nav-btn" onClick={() => setShowQR(true)}>
            📱 הצג QR לסקר
          </button>
          {stats && (
            <div className="mono" style={{ fontSize:11, color:'var(--dim)', marginTop:10, textAlign:'center' }}>
              {stats.n} תגובות
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="slides-main">
        <SlideComp stats={stats} slideNum={String(current + 1).padStart(2, '0')} />

        {/* Controls */}
        <div className="slide-controls">
          <span className="slide-counter mono">{current + 1} / {SLIDE_LIST.length}</span>
          {current > 0 && (
            <button className="ctrl-btn" onClick={() => setCurrent(c => c - 1)}>→ הקודם</button>
          )}
          {current < SLIDE_LIST.length - 1 && (
            <button className="ctrl-btn primary" onClick={() => setCurrent(c => c + 1)}>הבא ←</button>
          )}
        </div>
      </main>
    </div>
  );
}
