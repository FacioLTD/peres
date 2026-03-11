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
  { id: 6,  title: 'הרכב הציון' },
  { id: 7,  title: 'הפרויקט' },
  { id: 8,  title: 'מפת AI' },
  { id: 9,  title: 'מהי אינטליגנציה?' },
  { id: 10, title: 'מרכיבי אינטליגנציה' },
  { id: 11, title: 'אז מה זה AI?' },
  { id: 12, title: 'פתיחה — ניסוי' },
  { id: 13, title: 'Dataset' },
  { id: 14, title: 'Feature / Label' },
  { id: 15, title: 'Target Variable' },
  { id: 16, title: 'Mean & Variance' },
  { id: 17, title: 'Scatter & Correlation' },
  { id: 18, title: 'מנבאים' },
  { id: 19, title: 'סטטיסטיקה vs ML' },
  { id: 20, title: 'מהו מודל ML?' },
  { id: 21, title: 'שלושה סוגי בעיות' },
  { id: 22, title: 'Regression — גיל וציון' },
  { id: 23, title: 'Classification — מעורבות' },
  { id: 24, title: 'Clustering — סוגי סטודנטים' },
  { id: 25, title: 'Machine Learning' },
  { id: 26, title: 'מונחית מול בלתי מונחית' },
  { id: 27, title: 'AI = Prediction' },
  { id: 28, title: 'מעבר להרצאה 2' },
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
      <div className="slide-eyebrow mono">שקף {slideNum} — ציונים</div>
      <h2>איך מורכב <em>הציון</em>.</h2>
      <p className="slide-sub">שני רכיבים — עבודה אישית ופרויקט קבוצתי.</p>
      <div className="grade-row">
        <div className="grade-card">
          <div className="grade-pct mono">40%</div>
          <div className="grade-pct-label">עבודה אישית</div>
          <div className="grade-detail">
            עבודה אישית בנושא הפרויקט הקבוצתי
            <ul>
              <li>כל סטודנט מגיש פרק אישי</li>
              <li>הפרק יהיה תיאורטי / מחקרי</li>
              <li>הגשה באמצע הסמסטר</li>
            </ul>
            <div className="grade-goal">מטרה: להבין לעומק נושא ב-AI</div>
          </div>
        </div>
        <div className="grade-card primary">
          <div className="grade-pct mono">60%</div>
          <div className="grade-pct-label">מצגת בקבוצה</div>
          <div className="grade-detail">
            עבודה קבוצתית הכוללת הצגה בכיתה
            <ul>
              <li>קבוצות של 4–5 סטודנטים</li>
              <li>הצגת הנושא + הדגמה של כלי AI</li>
              <li>יוצג בשני מפגשי הסיום</li>
            </ul>
            <div className="grade-goal">מטרה: ליישם AI בפועל</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntroSlide7({ slideNum }) {
  const steps = [
    { num: '01', title: 'גיבוש פרויקט קבוצתי', desc: 'גיבוש קבוצה ובחירת ארגון אמיתי לניתוח.', date: 'עד 15 באפריל 2026' },
    { num: '02', title: 'עבודה אישית', desc: 'כל סטודנט מגיש פרק אישי. הפרק יבחן היבט מסוים של AI בארגון שנבחר.', date: 'עד 29 באפריל 2026' },
    { num: '03', title: 'פרויקט קבוצתי', desc: 'כיצד AI עשוי לשנות את הארגון שנבחר.', date: 'עד 27 במאי' },
    { num: '04', title: 'מצגת בכיתה', desc: 'הצגת הפרויקט הקבוצתי בשני המפגשים האחרונים.', date: 'יוני 2026' },
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — פרויקט</div>
      <h2>איך ייראה <em>הפרויקט</em>.</h2>
      <p className="slide-sub">ארבעה שלבים — מבחירת ארגון ועד הצגה בכיתה.</p>
      <div className="project-steps">
        {steps.map(s => (
          <div key={s.num} className="project-step">
            <div className="step-marker">
              <div className="step-num mono">{s.num}</div>
            </div>
            <div className="step-body">
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
              <div className="step-date mono">{s.date}</div>
            </div>
          </div>
        ))}
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
      <h2>שלושה סוגי בעיות שמודלים <em>פותרים</em></h2>
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
  const activePoints = points.filter((_, i) => !excluded.has(i));
  const excludedPoints = points.filter((_, i) => excluded.has(i));
  const reg = linearRegression(activePoints.map((p) => ({ x: p.age, y: p.grade })));

  let trendLine = [];
  if (reg && activePoints.length > 1) {
    const xs = activePoints.map(p => p.age);
    const xMin = Math.min(...xs) - 1;
    const xMax = Math.max(...xs) + 1;
    trendLine = [
      { age: xMin, grade: +(reg.slope * xMin + reg.intercept).toFixed(1) },
      { age: xMax, grade: +(reg.slope * xMax + reg.intercept).toFixed(1) },
    ];
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
          <span>
            Scatter Plot — גיל מול ציון צפוי
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
              formatter={(v, name) => [v, name === 'age' ? 'גיל' : 'ציון צפוי']}
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
        <span>מודל ליניארי: <span className="fvar">ŷ = w·age + b</span></span>
        <span className="fdivider">|</span>
        <span>נוסחה: <span className="fvar">grade = β₀ + β₁·age + ε</span></span>
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
                return (
                  <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:6, padding:'10px 14px', fontSize:12, fontFamily:'Space Mono', lineHeight:1.8 }}>
                    <div style={{ color:'var(--dim)' }}>שימוש ב-AI: <span style={{ color:'var(--white)' }}>{p.aiUsage}</span></div>
                    <div style={{ color:'var(--dim)' }}>שעות לימוד: <span style={{ color:'var(--white)' }}>{p.studyHours}</span></div>
                    <div style={{ color:'var(--dim)' }}>סטודנטים בנקודה: <span style={{ color:ACCENT }}>{p.count ?? 1}</span></div>
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
                  <text x={props.cx + 12} y={props.cy - 10} fontSize="10" fill="#d4d4d4">מרכז הקבוצה</text>
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

// ── Main Slides page ──────────────────────────────────────────
const SLIDE_COMPONENTS = [
  IntroSlide1, IntroSlide2, IntroSlide3, IntroSlide4, IntroSlide5,
  IntroSlide6, IntroSlide7,
  AIMapSlide, IntelligenceSlide, IntelComponentsSlide,
  WhatIsAISlide,
  Slide1, Slide2, Slide3, Slide4, Slide5,
  Slide6, Slide7, Slide9, Slide8, ProblemTypesSlide,
  RegressionAgeSlide, ClassificationSlide, ClusteringSlide,
  Slide10, LearningModesSlide, Slide11, Slide12
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
            <span className="nav-num mono">0{s.id}</span>
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
