import SlideShell from '../shared/SlideShell';
import { ConceptCard, Highlight, StatCard } from '../shared/components';
import '../shared/SlideShell.css';
import './LLM.css';

// ── Slide list ────────────────────────────────────────────────
const SLIDE_LIST = [
  { id: 1,  title: 'שער' },
  { id: 2,  title: 'הכיתה שלכם' },
  // Act 1 — What is meaning?
  { id: 3,  title: 'מהי משמעות?', navNum: 'א' },
  { id: 4,  title: 'מלכודת' },
  { id: 5,  title: 'הקריסה' },
  { id: 6,  title: 'הדגמה' },
  { id: 7,  title: 'המעבר הגדול' },
  // Act 2 — What is data?
  { id: 8,  title: 'מה זה דאטה?', navNum: 'ב' },
  { id: 9,  title: 'המחשב לא רואה משמעות' },
  { id: 10, title: 'Structured vs Unstructured' },
  { id: 11, title: 'למה זה חשוב?' },
  { id: 12, title: 'הבעיה של AI' },
  { id: 13, title: 'המעבר למילים' },
  // Act 2 — The symbolic failure
  { id: 14, title: 'העידן הסימבולי', navNum: 'ג' },
  { id: 15, title: 'למה זה נשבר' },
  { id: 16, title: 'משפט בלתי אפשרי' },
  { id: 17, title: 'מסקנה' },
  // Act 3 — Statistical revolution
  { id: 18, title: 'שינוי פרדיגמה', navNum: 'ד' },
  { id: 19, title: 'N-grams' },
  { id: 20, title: 'Markov' },
  { id: 21, title: 'עדיין טיפש' },
  // Act 4 — Vectors and dimensions
  { id: 22, title: 'מה זה וקטור?', navNum: 'ה' },
  { id: 23, title: 'וקטור = נקודה' },
  { id: 24, title: 'קרבה = דמיון' },
  { id: 25, title: 'מגבלת הדמיון' },
  { id: 26, title: 'למחשב אין בעיה' },
  { id: 27, title: 'מי החליט?' },
  { id: 28, title: 'מימדים סמויים' },
  // Act 4 — Word2Vec breakthrough
  { id: 29, title: 'מילים = מספרים', navNum: 'ו' },
  { id: 30, title: 'מילים = נקודות' },
  { id: 31, title: 'אינטואיציה' },
  { id: 32, title: 'קרבה במרחב' },
  { id: 33, title: 'מלך − גבר + אישה' },
  { id: 34, title: 'משמעות = קשרים' },
  { id: 35, title: 'סגירת חלק 1' },
  // Part 2 — The RNN Pain
  { id: 36, title: 'שמירת הקשר', navNum: 'ז' },
  { id: 37, title: 'איך RNN עובד?' },
  { id: 38, title: 'הבעיה' },
  { id: 39, title: 'הקיר' },
  { id: 40, title: 'צוואר הבקבוק' },
  // Attention — The Solution
  { id: 41, title: 'Attention', navNum: 'ח' },
  { id: 42, title: 'RNN → Attention' },
  { id: 43, title: 'כל המילים על השולחן' },
  { id: 44, title: 'טבלת קשרים' },
  { id: 45, title: 'Attention בפעולה' },
  { id: 46, title: 'QKV — שידוכים' },
  { id: 47, title: 'הדיאלוג הפנימי' },
  { id: 48, title: 'Attention קורה עכשיו' },
  { id: 49, title: 'Multi-head Attention' },
  { id: 50, title: 'Parallelism' },
  { id: 51, title: 'סיכום Attention' },
  // Transformer — The Revolution
  { id: 52, title: 'ומה אם...?', navNum: 'ט' },
  { id: 53, title: 'Transformer' },
  { id: 54, title: 'Pre-training' },
  { id: 55, title: 'אז מה זה GPT?' },
  // Emergence
  { id: 56, title: 'מה GPT עושה?', navNum: 'י' },
  { id: 57, title: 'למה זה נראה חכם?' },
  { id: 58, title: 'האם GPT זוכר?' },
  { id: 59, title: 'Weights ≠ Database' },
  { id: 60, title: 'למה יש הזיות?' },
  { id: 61, title: 'מחברים לאמת' },
  // Practical
  { id: 62, title: 'Chat Programming', navNum: 'יא' },
  { id: 63, title: 'הבעיה העסקית' },
  { id: 64, title: 'RAG Pipeline' },
  { id: 65, title: 'RAG משתמש בוקטורים' },
  { id: 66, title: 'RAG ≠ SQL' },
  { id: 67, title: 'Agents' },
  { id: 68, title: 'סיכום' },
];

// ═══════════════════════════════════════════════════════════════
// TITLE
// ═══════════════════════════════════════════════════════════════
function TitleSlide() {
  return (
    <div className="slide fade-up">
      <div className="hero-center">
        <div className="hero-title">מודלי שפה ו-<em>AI גנרטיבי</em></div>
        <div className="hero-subtitle">Language Models & Generative AI</div>
        <div className="hero-lecture-num">חלק שני</div>
        <div className="instructor-block">
          <div className="instructor-name">אוריאל אהרוני</div>
          <div className="instructor-role">CEO & Co-Founder</div>
          <div className="instructor-companies mono">Facio · Choco · InsurMedix</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SURVEY RESULTS (LIVE)
// ═══════════════════════════════════════════════════════════════

function SurveyResultsSlide({ stats }) {
  if (!stats || stats.n === 0) {
    return (
      <div className="slide fade-up">
        <div className="dramatic-center">
          <h2 className="dramatic-text">ממתינים לתגובות...</h2>
          <p className="slide-sub">סרקו את ה-QR כדי למלא את הסקר</p>
        </div>
      </div>
    );
  }

  // Compute averages
  const avg = arr => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : '—';
  const trustAvg = avg(stats.trustScores || []);
  const understandAvg = avg(stats.understandScores || []);
  const workflowAvg = avg(stats.workflowScores || []);

  // Tool distribution: sorted desc
  const toolEntries = Object.entries(stats.toolCounts || {})
    .sort((a, b) => b[1] - a[1]);
  const maxToolCount = toolEntries.length ? toolEntries[0][1] : 1;

  // Frequency distribution: sorted by intensity
  const freqOrder = ['כל יום, כמה פעמים', 'כל יום', '4–7 פעמים', '1–3 פעמים', 'כלל לא'];
  const freqEntries = freqOrder
    .map(k => [k, (stats.frequencyCounts || {})[k] || 0])
    .filter(([, v]) => v > 0);
  const maxFreq = freqEntries.length ? Math.max(...freqEntries.map(e => e[1])) : 1;

  const TOOL_COLORS = {
    'ChatGPT': '#10a37f', 'Claude': '#d97706', 'Gemini': '#4285f4',
    'Copilot': '#6366f1', 'אחר': '#94a3b8', 'לא משתמש': '#64748b',
  };

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף 02 — תמונת הכיתה</div>
      <h2><em>{stats.n}</em> מכם ענו על הסקר. הנה מה גילינו.</h2>

      <div className="survey-results-grid">
        {/* Left: tool bars */}
        <div className="survey-section">
          <div className="survey-section-title mono">באיזה כלי אתם משתמשים?</div>
          <div className="survey-bars">
            {toolEntries.map(([tool, count], i) => (
              <div key={tool} className="survey-bar-row" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
                <span className="bar-label">{tool}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(count / maxToolCount) * 100}%`,
                      background: TOOL_COLORS[tool] || 'var(--accent)',
                      animationDelay: `${0.4 + i * 0.12}s`,
                    }}
                  />
                </div>
                <span className="bar-count mono">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: stats + frequency */}
        <div className="survey-section">
          <div className="survey-section-title mono">מה אתם מרגישים?</div>
          <div className="survey-stat-cards">
            <div className="survey-stat" style={{ animationDelay: '0.3s' }}>
              <div className="survey-stat-value">{trustAvg}</div>
              <div className="survey-stat-label">אמון ב-AI</div>
            </div>
            <div className="survey-stat" style={{ animationDelay: '0.5s' }}>
              <div className="survey-stat-value">{understandAvg}</div>
              <div className="survey-stat-label">מרגיש שמבין אותי</div>
            </div>
            <div className="survey-stat" style={{ animationDelay: '0.7s' }}>
              <div className="survey-stat-value">{workflowAvg}</div>
              <div className="survey-stat-label">שינה את העבודה</div>
            </div>
          </div>

          <div className="survey-section-title mono" style={{ marginTop: 20 }}>תדירות שימוש</div>
          <div className="survey-bars">
            {freqEntries.map(([freq, count], i) => (
              <div key={freq} className="survey-bar-row" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                <span className="bar-label">{freq}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill freq-bar"
                    style={{ width: `${(count / maxFreq) * 100}%`, animationDelay: `${0.8 + i * 0.1}s` }}
                  />
                </div>
                <span className="bar-count mono">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 1 — WHAT IS MEANING?
// ═══════════════════════════════════════════════════════════════

function OpeningSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — פתיחה</div>
      <div className="dramatic-center">
        <h2 className="dramatic-text blink-cursor">מהי משמעות של מילה?</h2>
      </div>
    </div>
  );
}

function TrapSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מלכודת</div>

      <div className="hub-sentence">
        <span className="hub-highlight">״התיק</span> נסגר מהר.״
      </div>

      <div className="hub-question">איזה תיק?</div>

      <div className="hub-branches">
        <div className="hub-branch" style={{ animationDelay: '0.3s' }}>
          <div className="hub-branch-icon">💼</div>
          <div className="hub-branch-text">תיק עבודה</div>
          <div className="hub-branch-context">תיק = bag</div>
        </div>
        <div className="hub-branch" style={{ animationDelay: '0.6s' }}>
          <div className="hub-branch-icon">📁</div>
          <div className="hub-branch-text">תיק מסמכים</div>
          <div className="hub-branch-context">תיק = file/folder</div>
        </div>
        <div className="hub-branch" style={{ animationDelay: '0.9s' }}>
          <div className="hub-branch-icon">⚖️</div>
          <div className="hub-branch-text">תיק משפטי</div>
          <div className="hub-branch-context">תיק = legal case</div>
        </div>
      </div>

    </div>
  );
}

function CollapseSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הקריסה</div>
      <div className="revelation-scene">
        <div className="revelation-main">אין משמעות למילה.</div>
        <div className="revelation-glow">יש רק הקשר.</div>
      </div>
    </div>
  );
}

function DemoSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הדגמה</div>
      <h2>אותה מילה, <em>משמעות שונה</em>.</h2>

      <div className="context-compare">
        <div className="context-sentence-block" style={{ animationDelay: '0.2s' }}>
          <div className="context-sentence-text">
            ״<span className="ctx-word indigo">התיק</span> נסגר מהר <strong>בבית המשפט</strong>.״
          </div>
          <div className="context-meaning">⚖️</div>
        </div>
        <div className="context-sentence-block" style={{ animationDelay: '0.5s' }}>
          <div className="context-sentence-text">
            ״<span className="ctx-word violet">התיק</span> נסגר מהר <strong>באוטו</strong>.״
          </div>
          <div className="context-meaning">💼</div>
        </div>
      </div>

      <Highlight>
        ההקשר <em>סביב</em> המילה — הוא שקובע את המשמעות. לא המילה עצמה.
      </Highlight>
    </div>
  );
}

function BigTransitionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — המעבר הגדול</div>
      <div className="dramatic-center">
        <div className="transition-bridge">
          <div className="bridge-side">
            <div className="bridge-icon">🧠</div>
            <div className="bridge-label">בן אדם</div>
            <div className="bridge-desc">מבין הקשר<br />באופן טבעי</div>
          </div>
          <div className="bridge-gap">
            <div className="bridge-question">?</div>
            <div className="bridge-line" />
          </div>
          <div className="bridge-side">
            <div className="bridge-icon">💻</div>
            <div className="bridge-label">מחשב</div>
            <div className="bridge-desc">רואה רק<br />רצף סימנים</div>
          </div>
        </div>
        <h2 className="dramatic-text" style={{ fontSize: 36, marginTop: 40 }}>
          אם משמעות תלויה בהקשר —<br />
          איך <em>מחשב</em> אמור להבין שפה?
        </h2>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 2 — WHAT IS DATA?
// ═══════════════════════════════════════════════════════════════

function WhatIsDataSlide({ slideNum }) {
  const dataTypes = [
    { icon: '📝', title: 'טקסט', desc: 'הודעות, חוזים, מאמרים, קוד' },
    { icon: '🖼️', title: 'תמונה', desc: 'פיקסלים, צבעים, צורות, פנים' },
    { icon: '🎧', title: 'קול', desc: 'גלים, קצב, טון, שיחה' },
    { icon: '📊', title: 'טבלה', desc: 'שורות, עמודות, מספרים, קטגוריות' },
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מה זה דאטה?</div>
      <h2>כל דבר בעולם יכול להפוך ל<em>דאטה</em>.</h2>
      <p className="slide-sub">דאטה הוא לא רק טבלה באקסל. דאטה הוא דרך לייצג את המציאות כך שמחשב יוכל לעבוד איתה.</p>

      <div className="data-types-grid">
        {dataTypes.map((item, i) => (
          <div key={item.title} className="data-type-card" style={{ animationDelay: `${0.2 + i * 0.14}s` }}>
            <div className="data-type-icon">{item.icon}</div>
            <div className="data-type-title">{item.title}</div>
            <div className="data-type-desc">{item.desc}</div>
          </div>
        ))}
      </div>

      <Highlight>
        AI לא נולד בתוך שפה. הוא מתחיל במקום הרבה יותר קר: <em>ייצוג</em>.
      </Highlight>
    </div>
  );
}

function ComputerSeesNumbersSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — המחשב לא רואה משמעות</div>
      <h2>המחשב לא רואה <em>חתול</em>. הוא רואה מספרים.</h2>

      <div className="data-conversion-flow">
        <div className="data-world-card" style={{ animationDelay: '0.2s' }}>
          <div className="data-world-icon">🐱</div>
          <div className="data-world-title">חתול בעולם</div>
          <div className="data-world-sub">יצור חי, רך, קופץ, מגרגר</div>
        </div>
        <div className="data-flow-arrow">←</div>
        <div className="data-modalities" style={{ animationDelay: '0.45s' }}>
          <span>המילה "חתול"</span>
          <span>תמונה של חתול</span>
          <span>צליל מיאו</span>
        </div>
        <div className="data-flow-arrow">←</div>
        <div className="number-rain" style={{ animationDelay: '0.7s' }}>
          <span>0.12</span><span>187</span><span>1</span><span>0.004</span><span>255</span><span>-0.73</span>
        </div>
      </div>

      <Highlight>
        המהפכה היא לא שהמחשב “מבין חתול”. המהפכה היא שמצאנו דרך להפוך חתול, טקסט וקול ל<em>מספרים שימושיים</em>.
      </Highlight>
    </div>
  );
}

function StructuredUnstructuredSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Structured vs Unstructured</div>
      <h2>שני סוגי דאטה. שני עולמות.</h2>

      <div className="structured-split">
        <div className="structured-side structured" style={{ animationDelay: '0.2s' }}>
          <div className="structured-label mono">Structured</div>
          <div className="mini-table">
            <div>שם</div><div>גיל</div><div>עיר</div>
            <div>נועה</div><div>24</div><div>חיפה</div>
            <div>דניאל</div><div>31</div><div>תל אביב</div>
          </div>
          <div className="structured-desc">מסודר, צפוי, קל לשאול עליו שאלות.</div>
        </div>

        <div className="structured-side unstructured" style={{ animationDelay: '0.45s' }}>
          <div className="structured-label mono">Unstructured</div>
          <div className="doc-chaos">
            <span>אימייל</span>
            <span>PDF</span>
            <span>שיחת לקוח</span>
            <span>צילום</span>
            <span>חוזה</span>
            <span>וידאו</span>
          </div>
          <div className="structured-desc">עשיר, מבולגן, מלא הקשר — כמו העולם האמיתי.</div>
        </div>
      </div>
    </div>
  );
}

function WhyDataMattersSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — למה זה חשוב?</div>
      <div className="revelation-scene">
        <div className="revelation-main" style={{ fontSize: 44 }}>תוכנה רגילה אוהבת טבלאות.</div>
        <div className="revelation-glow" style={{ fontSize: 34 }}>העולם האמיתי מדבר בסיפורים.</div>
        <div className="card-grid cols2" style={{ marginTop: 24, width: '100%' }}>
          <ConceptCard en="Easy for Software" he="קל לתוכנה" def="חיפוש, סינון, סכימה, SQL, דוחות. הכל מוגדר מראש." />
          <ConceptCard en="Real World" he="העולם האמיתי" def="מיילים, שאלות, תמונות, שיחות, מסמכים. הכל תלוי הקשר." accent />
        </div>
      </div>
    </div>
  );
}

function AIRepresentationProblemSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הבעיה של AI</div>
      <div className="dramatic-center">
        <h2 className="dramatic-text" style={{ fontSize: 44 }}>
          הבעיה אינה “איך לגרום למחשב להבין”.
        </h2>
        <div className="closing-divider" />
        <div className="dramatic-sub" style={{ maxWidth: 760 }}>
          הבעיה היא: איך מייצגים משהו עשיר, עמום ומלא הקשר —<br />
          בצורה מתמטית שאפשר <em>לחשב</em> עליה?
        </div>
        <div className="representation-formula">
          עולם ← דאטה ← מספרים ← חישוב ← תשובה
        </div>
      </div>
    </div>
  );
}

function DataToWordsTransitionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — המעבר</div>
      <div className="dramatic-center">
        <h2 className="dramatic-text">
          אם הכל מספרים —<br />
          איך מייצגים <em>מילה</em>?
        </h2>
        <div className="dramatic-sub">
          מכאן מתחיל המסע: מחוקים ידניים, דרך סטטיסטיקה,<br />
          ועד מרחבים שבהם משמעות הופכת לגאומטריה.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 2 — THE SYMBOLIC FAILURE
// ═══════════════════════════════════════════════════════════════

function SymbolicSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — העידן הסימבולי</div>
      <h2>ננסה לכתוב <em>חוקים</em>.</h2>
      <p className="slide-sub">הגישה הראשונה: נגדיר את כל כללי השפה ידנית.</p>

      <div className="code-rules-container">
        <div className="code-line" style={{ animationDelay: '0.2s' }}>
          <span className="code-keyword">IF</span> word == <span className="code-string">"he"</span> <span className="code-op">→</span> verb = <span className="code-string">"is"</span>
        </div>
        <div className="code-line" style={{ animationDelay: '0.4s' }}>
          <span className="code-keyword">IF</span> word == <span className="code-string">"they"</span> <span className="code-op">→</span> verb = <span className="code-string">"are"</span>
        </div>
        <div className="code-line" style={{ animationDelay: '0.6s' }}>
          <span className="code-keyword">IF</span> prev == <span className="code-string">"not"</span> <span className="code-op">→</span> negate(next)
        </div>
        <div className="code-line" style={{ animationDelay: '0.8s' }}>
          <span className="code-keyword">IF</span> ends_with(<span className="code-string">"ing"</span>) <span className="code-op">→</span> tense = PRESENT
        </div>
        <div className="code-line" style={{ animationDelay: '1.0s' }}>
          <span className="code-keyword">IF</span> word == <span className="code-string">"תיק"</span> <span className="code-op">→</span> <span className="code-comment">// ...תיק עבודה? תיק משפטי? 🤷</span>
        </div>
        <div className="code-line" style={{ animationDelay: '1.2s' }}>
          <span className="code-comment">// TODO: handle slang, sarcasm, context, typos, new words...</span>
        </div>
        <div className="code-line" style={{ animationDelay: '1.4s' }}>
          <span className="code-comment">// TODO: 10,000+ more rules...</span>
        </div>
      </div>
    </div>
  );
}

function WhyBreaksSlide({ slideNum }) {
  const words = [
    { text: 'אחי', x: '10%', y: '15%', delay: 0.1 },
    { text: 'כאילו', x: '70%', y: '10%', delay: 0.2 },
    { text: 'לול', x: '45%', y: '80%', delay: 0.3 },
    { text: 'סבבה', x: '80%', y: '45%', delay: 0.4 },
    { text: '😂😂😂', x: '20%', y: '70%', delay: 0.5 },
    { text: 'פאדיחה', x: '60%', y: '65%', delay: 0.15 },
    { text: 'yalla', x: '35%', y: '20%', delay: 0.25 },
    { text: 'חחחח', x: '85%', y: '75%', delay: 0.35 },
    { text: 'בעזהש', x: '15%', y: '45%', delay: 0.45 },
    { text: 'נראלי', x: '55%', y: '35%', delay: 0.55 },
    { text: 'תכלס', x: '40%', y: '55%', delay: 0.6 },
    { text: 'וואלה?!', x: '75%', y: '25%', delay: 0.65 },
    { text: 'אשכרה', x: '25%', y: '85%', delay: 0.7 },
    { text: 'סתום', x: '90%', y: '60%', delay: 0.75 },
    { text: 'חלאס', x: '5%', y: '55%', delay: 0.8 },
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — למה זה נשבר</div>
      <h2>השפה <em>אינסופית</em>.</h2>
      <p className="slide-sub">סלנג, טעויות, הקשר משתנה — אי אפשר לכסות הכל.</p>

      <div className="word-burst">
        {words.map((w, i) => (
          <span key={i} className="burst-word" style={{ left: w.x, top: w.y, animationDelay: `${w.delay}s` }}>
            {w.text}
          </span>
        ))}
        <div className="burst-center-text">∞</div>
      </div>

    </div>
  );
}

function ImpossibleSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — משפט בלתי אפשרי</div>
      <h2>נסו לכתוב לזה <em>חוקים</em>:</h2>

      <div className="impossible-sentence">
        <div className="impossible-text">
          ״אחי הוא כאילו סגר את התיק כזה״
        </div>
        <div className="impossible-arrows">
          <span className="imp-arrow" style={{ top: '-30px', right: '10%' }}>מי?</span>
          <span className="imp-arrow" style={{ top: '-30px', right: '35%' }}>ציטוט? הערכה?</span>
          <span className="imp-arrow" style={{ bottom: '-30px', right: '50%' }}>איזה תיק?</span>
          <span className="imp-arrow" style={{ bottom: '-30px', right: '75%' }}>מה זה "כזה"?</span>
        </div>
      </div>

    </div>
  );
}

function RulesConclusionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מסקנה</div>
      <div className="dramatic-center">
        <div className="crossed-out">
          <span className="crossed-text">חוקים</span>
          <span className="cross-line" />
        </div>
        <h2 className="dramatic-text" style={{ marginTop: 24 }}>
          אי אפשר להבין שפה דרך חוקים.
        </h2>
        <div className="dramatic-sub" style={{ animationDelay: '1s' }}>אז מה כן?</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 3 — THE STATISTICAL REVOLUTION
// ═══════════════════════════════════════════════════════════════

function ParadigmSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — שינוי פרדיגמה</div>
      <h2>שינוי <em>פרדיגמה</em>.</h2>

      <div className="paradigm-split">
        <div className="paradigm-side wrong" style={{ animationDelay: '0.2s' }}>
          <div className="paradigm-icon">❌</div>
          <div className="paradigm-label" style={{ color: '#ef4444' }}>הגישה הישנה</div>
          <div className="paradigm-quote">״למה המשפט נכון?״</div>
          <div className="paradigm-desc">נגדיר חוקים. נבדוק תקינות.<br />נכתוב דקדוק מלא.</div>
        </div>
        <div className="paradigm-side right" style={{ animationDelay: '0.5s' }}>
          <div className="paradigm-icon">✅</div>
          <div className="paradigm-label" style={{ color: '#22c55e' }}>הגישה החדשה</div>
          <div className="paradigm-quote">״כמה פעמים הוא מופיע?״</div>
          <div className="paradigm-desc">נספור מופעים. נחשב הסתברויות.<br />נתן לנתונים לדבר.</div>
        </div>
      </div>
    </div>
  );
}

function NgramsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — N-grams</div>
      <h2><em>N-grams</em> — ניחוש סטטיסטי.</h2>

      <div className="prob-container">
        <div className="prob-prompt">
          ״אני רוצה לשתות <span className="prob-blank" />״
        </div>

        <div className="prob-options">
          <div className="prob-option" style={{ animationDelay: '0.3s' }}>
            <span className="prob-label">מים</span>
            <div className="prob-bar-track">
              <div className="prob-bar-fill" style={{ width: '72%', animationDelay: '0.6s' }} />
            </div>
            <span className="prob-pct">72%</span>
          </div>
          <div className="prob-option" style={{ animationDelay: '0.5s' }}>
            <span className="prob-label">קפה</span>
            <div className="prob-bar-track">
              <div className="prob-bar-fill secondary" style={{ width: '24%', animationDelay: '0.8s' }} />
            </div>
            <span className="prob-pct">24%</span>
          </div>
          <div className="prob-option" style={{ animationDelay: '0.7s' }}>
            <span className="prob-label">ברזל 😄</span>
            <div className="prob-bar-track">
              <div className="prob-bar-fill tertiary" style={{ width: '1%', animationDelay: '1.0s' }} />
            </div>
            <span className="prob-pct">1%</span>
          </div>
        </div>
      </div>

    </div>
  );
}

function MarkovSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Markov</div>
      <h2>ה<em>עתיד</em> תלוי בעבר הקרוב.</h2>
      <p className="slide-sub">מודל Markov — כל מילה נבחרת על סמך המילים שלפניה.</p>

      <div className="markov-chain">
        <div className="markov-node" style={{ animationDelay: '0.2s' }}>אני</div>
        <div className="markov-arrow" style={{ animationDelay: '0.35s' }}>→</div>
        <div className="markov-node" style={{ animationDelay: '0.4s' }}>רוצה</div>
        <div className="markov-arrow" style={{ animationDelay: '0.55s' }}>→</div>
        <div className="markov-node" style={{ animationDelay: '0.6s' }}>לשתות</div>
        <div className="markov-arrow" style={{ animationDelay: '0.75s' }}>→</div>
        <div className="markov-node" style={{ animationDelay: '0.8s' }}>קפה</div>
        <div className="markov-arrow" style={{ animationDelay: '0.95s' }}>→</div>
        <div className="markov-node highlight" style={{ animationDelay: '1.0s' }}>
          עם ___
          <div className="markov-prob">P("חלב") = 0.68</div>
        </div>
      </div>

      <Highlight>
        "חלב" מקבל הסתברות גבוהה — כי בנתונים, <em>"קפה עם חלב"</em> מופיע הרבה.
      </Highlight>
    </div>
  );
}

function StillStupidSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מגבלה</div>
      <h2>אבל זה עדיין <em>טיפש</em>.</h2>
      <p className="slide-sub">המודל לא מבין מילים — הוא רק סופר מופעים.</p>

      <div className="counter-display">
        <div className="counter-visual">
          <div className="counter-word">״חתול״</div>
          <div className="counter-arrow">↓</div>
          <div className="counter-number">127,443</div>
          <div className="counter-label mono">מופעים בקורפוס</div>
        </div>
      </div>

      <div className="card-grid cols2" style={{ marginTop: 24 }}>
        <ConceptCard en="Knows" he="יודע" def="אחרי 'חתול' בדרך כלל מופיע 'שחור', 'קטן', 'ישן'." />
        <ConceptCard en="Doesn't Know" he="לא יודע" def="מה זה חתול. איך הוא נראה. למה הוא מתגלגל על הגב." accent />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 4 — VECTORS AND DIMENSIONS
// ═══════════════════════════════════════════════════════════════

function VectorDefinitionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מה זה וקטור?</div>
      <h2>וקטור הוא <em>רשימה של מספרים</em> שמתארת משהו.</h2>
      <p className="slide-sub">במקום מילה אחת או ID אחד, נותנים לאובייקט הרבה תכונות בבת אחת.</p>

      <div className="vector-person-card">
        <div className="person-avatar">🧑</div>
        <div className="person-vector">
          <span>אדם</span>
          <span className="mono">= [גובה: 1.78, גיל: 24, משקל: 72]</span>
        </div>
      </div>

      <Highlight>
        וקטור הוא הדרך שבה מחשב אומר: “אני לא שומר רק שם. אני שומר <em>מיקום בתוך מרחב של תכונות</em>.”
      </Highlight>
    </div>
  );
}

function VectorPointSpaceSlide({ slideNum }) {
  const people = [
    { name: 'נועה', x: 24, y: 36 },
    { name: 'דניאל', x: 42, y: 56 },
    { name: 'מאיה', x: 68, y: 42 },
    { name: 'יונתן', x: 74, y: 72 },
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — וקטור = נקודה במרחב</div>
      <h2>שני מימדים: <em>גיל + גובה</em>.</h2>
      <p className="slide-sub">כל אדם הופך לנקודה. כל תכונה היא ציר.</p>

      <div className="vector-plane">
        <div className="axis-label x-axis">גיל →</div>
        <div className="axis-label y-axis">גובה ↑</div>
        {people.map((p, i) => (
          <div key={p.name} className="plane-point" style={{ right: `${p.x}%`, bottom: `${p.y}%`, animationDelay: `${0.25 + i * 0.15}s` }}>
            <span className="plane-dot" />
            <span className="plane-label">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VectorSimilaritySlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — קרבה = דמיון</div>
      <h2>מרחק במרחב הופך ל<em>מדד דמיון</em>.</h2>

      <div className="vector-similarity-demo">
        <div className="similarity-pair close">
          <span>נועה</span>
          <div className="similarity-line"><span className="mono">מרחק 0.18</span></div>
          <span>דניאל</span>
          <strong>דומים בתכונות</strong>
        </div>
        <div className="similarity-pair far">
          <span>נועה</span>
          <div className="similarity-line"><span className="mono">מרחק 0.91</span></div>
          <span>יונתן</span>
          <strong>רחוקים בתכונות</strong>
        </div>
      </div>

      <Highlight>
        אותו רעיון יעבוד עוד רגע על מילים: “חתול” ו“כלב” יהיו קרובים כי הם חיים בהקשרים דומים.
      </Highlight>
    </div>
  );
}

function HumanDimensionLimitSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Inception</div>
      <div className="dramatic-center">
        <h2 className="dramatic-text" style={{ fontSize: 44 }}>כאן הדמיון האנושי מתחיל לקרוס.</h2>
        <div className="dimension-stack">
          <span>2D: קל לדמיין</span>
          <span>3D: עדיין אפשרי</span>
          <span className="hard">100D: אין לנו תמונה בראש</span>
          <span className="hard">1,536D: זה כבר מרחב של מחשב</span>
        </div>
      </div>
    </div>
  );
}

function ComputerHandlesDimensionsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — למחשב אין בעיה</div>
      <h2>אנחנו לא רואים את המרחב. <em>המחשב מחשב אותו</em>.</h2>

      <div className="distance-machine">
        <div className="machine-input">וקטור A<br /><span className="mono">[0.12, -0.7, ...]</span></div>
        <div className="machine-core">distance()</div>
        <div className="machine-input">וקטור B<br /><span className="mono">[0.10, -0.6, ...]</span></div>
        <div className="machine-output">קרובים<br /><span className="mono">0.08</span></div>
      </div>

      <Highlight>
        המחשב לא צריך “לדמיין” 100 מימדים. הוא רק צריך לחשב מרחקים, כיוונים ושכנים.
      </Highlight>
    </div>
  );
}

function LearnedDimensionsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מי החליט על המימדים?</div>
      <div className="revelation-scene">
        <div className="revelation-main" style={{ fontSize: 48 }}>לא אדם.</div>
        <div className="revelation-glow" style={{ fontSize: 34 }}>המודל לומד אותם מהדאטה.</div>
        <div className="dramatic-sub" style={{ maxWidth: 720 }}>
          אנחנו לא יושבים ומגדירים “ציר חתוליות” או “ציר רשמיות”.
          המודל רואה מיליארדי דוגמאות ומארגן את המרחב כך שחיזוי יעבוד טוב יותר.
        </div>
      </div>
    </div>
  );
}

function LatentDimensionsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מימדים סמויים</div>
      <h2>המימדים לא חייבים להיות “גובה” או “גיל”.</h2>
      <p className="slide-sub">בשפה, המימדים הם latent — תבניות נסתרות שהמודל למד בעצמו.</p>

      <div className="latent-grid">
        <div className="latent-known">גובה</div>
        <div className="latent-known">גיל</div>
        <div className="latent-known">משקל</div>
        <div className="latent-secret">פורמליות?</div>
        <div className="latent-secret">רגש?</div>
        <div className="latent-secret">זמן?</div>
        <div className="latent-secret">קשר סמנטי?</div>
        <div className="latent-secret">תבנית נסתרת #482</div>
      </div>

      <Highlight>
        מכאן נולדת אינטואיציה חדשה: משמעות היא לא הגדרה מילונית. משמעות היא <em>מיקום במרחב שנלמד מדאטה</em>.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 4 — WORD2VEC BREAKTHROUGH
// ═══════════════════════════════════════════════════════════════

function WordsAsIDsSlide({ slideNum }) {
  const items = [
    { word: 'חתול', id: '405' },
    { word: 'כלב', id: '872' },
    { word: 'שולחן', id: '1,209' },
    { word: 'מלך', id: '44' },
    { word: 'אהבה', id: '3,571' },
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הבעיה</div>
      <h2>מילים = <em>מספרים שרירותיים</em>.</h2>
      <p className="slide-sub">בגישה הישנה, כל מילה היא ID. אין קשר בין המספרים.</p>

      <div className="id-scatter">
        {items.map((item, i) => (
          <div key={item.word} className="id-item" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="id-word">{item.word}</div>
            <div className="id-equals">=</div>
            <div className="id-num">{item.id}</div>
          </div>
        ))}
      </div>

      <Highlight>
        חתול = 405, כלב = 872. <em>שום קשר ביניהם</em> — למרות שהם בעלי חיים.
      </Highlight>
    </div>
  );
}

function WordsAsPointsSlide({ slideNum }) {
  const words = [
    { word: 'חתול', x: 64, y: 20, cluster: 'animal', delay: 0.2 },
    { word: 'כלב', x: 58, y: 28, cluster: 'animal', delay: 0.3 },
    { word: 'ציפור', x: 66, y: 30, cluster: 'animal', delay: 0.35 },
    { word: 'חיה', x: 60, y: 16, cluster: 'animal', delay: 0.25 },
    { word: 'שולחן', x: 20, y: 62, cluster: 'object', delay: 0.5 },
    { word: 'כיסא', x: 26, y: 70, cluster: 'object', delay: 0.55 },
    { word: 'מיטה', x: 16, y: 68, cluster: 'object', delay: 0.6 },
    { word: 'מלך', x: 22, y: 18, cluster: 'royalty', delay: 0.7 },
    { word: 'מלכה', x: 28, y: 24, cluster: 'royalty', delay: 0.75 },
    { word: 'נסיך', x: 18, y: 26, cluster: 'royalty', delay: 0.8 },
    { word: 'רעיון', x: 62, y: 64, cluster: 'thought', delay: 0.85 },
    { word: 'חלום', x: 68, y: 70, cluster: 'thought', delay: 0.9 },
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — רגע המהפכה</div>
      <h2>מילים = <em>נקודות במרחב</em>.</h2>
      <p className="slide-sub">זו לא מפה שאדם צייר. זו מפה שהמודל גילה מתוך דאטה: מילים דומות → נקודות קרובות.</p>

      <div className="word-space">
        {/* Cluster rings */}
        <div className="space-cluster-ring" style={{ right: '55%', top: '5%', width: 180, height: 140 }} />
        <div className="space-cluster-ring" style={{ right: '5%', top: '48%', width: 170, height: 150 }} />
        <div className="space-cluster-ring" style={{ right: '8%', top: '5%', width: 160, height: 140 }} />
        <div className="space-cluster-ring" style={{ right: '50%', top: '52%', width: 150, height: 130 }} />

        {/* Cluster labels */}
        <span className="space-cluster-label" style={{ right: '62%', top: '2%' }}>בעלי חיים 🐾</span>
        <span className="space-cluster-label" style={{ right: '8%', top: '50%' }}>חפצים 🪑</span>
        <span className="space-cluster-label" style={{ right: '11%', top: '2%' }}>מלוכה 👑</span>
        <span className="space-cluster-label" style={{ right: '55%', top: '52%' }}>מופשט 💭</span>

        {/* Words as dots */}
        {words.map((w) => (
          <div
            key={w.word}
            className="space-dot"
            style={{ right: `${w.x}%`, top: `${w.y}%`, animationDelay: `${w.delay}s` }}
          >
            <div className={`space-dot-circle cluster-${w.cluster}`} />
            <span className="space-dot-label">{w.word}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntuitionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — אינטואיציה</div>
      <div className="dramatic-center">
        <h2 className="dramatic-text golden-quote">
          ״תגיד לי עם מי אתה מופיע —<br />
          ואגיד לך מי אתה.״
        </h2>
        <div className="dramatic-sub">
          Word2Vec לומד את המשמעות של מילה<br />
          מתוך <em>המילים שמסביבה</em> בטקסטים.
        </div>

      </div>
    </div>
  );
}

function ProximitySlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — קרבה במרחב</div>
      <h2>קרבה = <em>דמיון</em>.</h2>

      <div className="proximity-demo">
        {/* Close pair */}
        <div className="prox-pair close">
          <div className="prox-word">חתול</div>
          <div className="prox-line close-line">
            <span className="prox-distance mono">0.12</span>
          </div>
          <div className="prox-word">כלב</div>
          <div className="prox-verdict mono">✓ קרובים</div>
        </div>
        {/* Far pair */}
        <div className="prox-pair far">
          <div className="prox-word">חתול</div>
          <div className="prox-line far-line">
            <span className="prox-distance mono">0.89</span>
          </div>
          <div className="prox-word">שולחן</div>
          <div className="prox-verdict mono">✕ רחוקים</div>
        </div>
        {/* Close pair */}
        <div className="prox-pair close">
          <div className="prox-word">מלך</div>
          <div className="prox-line close-line">
            <span className="prox-distance mono">0.15</span>
          </div>
          <div className="prox-word">מלכה</div>
          <div className="prox-verdict mono">✓ קרובים</div>
        </div>
      </div>
    </div>
  );
}

function VectorArithmeticSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Mind-blow 🤯</div>
      <h2>אנחנו לא מבינים את כל המרחב — אבל מזהים <em>כיוונים עקביים</em>.</h2>
      <p className="slide-sub">יש כיוון שמייצג “מגדר”, כיוון שמייצג “זמן”, כיוון שמייצג “מדינה → עיר בירה”.</p>

      <div className="dramatic-center" style={{ minHeight: '35vh' }}>
        <div className="vector-equation">
          <div className="vector-box" style={{ animationDelay: '0.2s' }}>מלך 👑</div>
          <div className="vector-op" style={{ animationDelay: '0.5s' }}>−</div>
          <div className="vector-box" style={{ animationDelay: '0.7s' }}>גבר 👨</div>
          <div className="vector-op" style={{ animationDelay: '1.0s' }}>+</div>
          <div className="vector-box" style={{ animationDelay: '1.2s' }}>אישה 👩</div>
          <div className="vector-op" style={{ animationDelay: '1.6s' }}>≈</div>
          <div className="vector-box vector-result" style={{ animationDelay: '2.0s' }}>מלכה 👸</div>
        </div>
      </div>
    </div>
  );
}

function MeaningIsRelationshipsSlide({ slideNum }) {
  const nodes = [
    { word: 'משפחה', x: 20, y: 30 },
    { word: 'אב', x: 35, y: 15 },
    { word: 'אם', x: 40, y: 45 },
    { word: 'ילד', x: 55, y: 20 },
    { word: 'אהבה', x: 15, y: 60 },
    { word: 'בית', x: 60, y: 55 },
    { word: 'חיים', x: 75, y: 35 },
    { word: 'שמחה', x: 80, y: 65 },
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הפואנטה</div>

      <div className="meaning-web">
        <div className="web-center">משמעות</div>
        {/* SVG connections */}
        <svg className="web-svg" viewBox="0 0 100 80" preserveAspectRatio="none">
          {nodes.map((n) => (
            <line key={n.word} x1="47" y1="40" x2={n.x} y2={n.y} className="web-line" />
          ))}
        </svg>
        {nodes.map((n, i) => (
          <div
            key={n.word}
            className="web-node"
            style={{ right: `${n.x}%`, top: `${n.y}%`, animationDelay: `${0.2 + i * 0.1}s` }}
          >
            {n.word}
          </div>
        ))}
      </div>

      <div className="revelation-scene" style={{ minHeight: 'auto', marginTop: 12 }}>
        <div className="revelation-main" style={{ fontSize: 42 }}>משמעות = קשרים.</div>
        <div className="revelation-glow" style={{ fontSize: 24 }}>לא הגדרות.</div>
      </div>
    </div>
  );
}

function ClosingPart1Slide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סגירת חלק 1</div>
      <div className="dramatic-center">
        <h2 className="dramatic-text" style={{ fontSize: 38, maxWidth: 650, lineHeight: 1.4 }}>
          המחשב לא למד <em>שפה</em>.<br />
          הוא למד איך מילים <em>קשורות</em> זו לזו.
        </h2>
        <div className="closing-divider" />
        <div className="dramatic-sub" style={{ animationDelay: '1.2s' }}>
          עכשיו נראה את הכלים שלקחו את הרעיון הזה —<br />
          ובנו ממנו GPT, Claude, ו-Gemini.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 5 — THE RNN PAIN
// ═══════════════════════════════════════════════════════════════

function RNNIntroSlide({ slideNum }) {
  const words = ['הוא', 'הלך', 'ל', 'חנות', 'ו', 'קנה', 'לחם'];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — RNN</div>
      <h2>נקרא מילה מילה, <em>ונשמור מצב</em>.</h2>
      <p className="slide-sub">Recurrent Neural Network — הניסיון הראשון לעבד טקסט בסדר.</p>

      <div className="rnn-sequence">
        {words.map((w, i) => (
          <div key={i} className="rnn-step" style={{ animationDelay: `${0.2 + i * 0.35}s` }}>
            <div className="rnn-word-box">{w}</div>
            {i < words.length - 1 && <div className="rnn-seq-arrow">←</div>}
          </div>
        ))}
      </div>

      <div className="rnn-state-visual">
        <div className="rnn-state-label mono">Hidden State — מצב פנימי</div>
        <div className="rnn-state-bar">
          <div className="rnn-state-fill" />
        </div>
        <div className="rnn-state-desc">כל מילה מעדכנת את ה״זיכרון״ — אבל הוא מוגבל.</div>
      </div>
    </div>
  );
}

function RNNArchitectureSlide({ slideNum }) {
  const steps = [
    { word: 'הוא', state: 'h1' },
    { word: 'הלך', state: 'h2' },
    { word: 'לחנות', state: 'h3' },
    { word: 'וקנה', state: 'h4' },
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — איך RNN עובד?</div>
      <h2>ההתקדמות: לרשת יש <em>זיכרון מתגלגל</em>.</h2>
      <p className="slide-sub">במקום לטפל בכל מילה כאילו היא לבד, אותה רשת רצה שוב ושוב — ובכל צעד מעדכנת מצב פנימי.</p>

      <div className="rnn-architecture">
        {steps.map((step, i) => (
          <div key={step.state} className="rnn-arch-step" style={{ animationDelay: `${0.2 + i * 0.18}s` }}>
            <div className="rnn-arch-word">{step.word}</div>
            <div className="rnn-arch-cell">
              <div className="rnn-cell-title mono">same neural net</div>
              <div className="rnn-cell-loop">↺</div>
            </div>
            <div className="rnn-arch-state mono">{step.state}</div>
            {i < steps.length - 1 && <div className="rnn-arch-arrow">←</div>}
          </div>
        ))}
      </div>

      <div className="rnn-formula-card">
        <span className="mono">h<sub>t</sub> = f(Wx<sub>t</sub> + Uh<sub>t-1</sub>)</span>
        <span>המילה החדשה + הזיכרון הקודם → הזיכרון הבא</span>
      </div>

      <Highlight>
        זו הייתה קפיצה גדולה: המודל כבר לא רק סופר שכנים קרובים. הוא יכול לבנות הקשר לאורך רצף.
      </Highlight>
    </div>
  );
}

function RNNProblemSlide({ slideNum }) {
  const words = [
    { t: 'יוסי', o: 0.08 }, { t: 'הלך', o: 0.12 }, { t: 'עם', o: 0.16 },
    { t: 'דני', o: 0.2 }, { t: 'לחנות', o: 0.25 }, { t: 'אחרי', o: 0.3 },
    { t: 'שאבא', o: 0.35 }, { t: 'שלו', o: 0.4 }, { t: 'התקשר', o: 0.48 },
    { t: 'אליו', o: 0.55 }, { t: 'ואז', o: 0.65 },
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הבעיה</div>
      <h2>מה קורה כש<em>המשפט ארוך</em>?</h2>

      <div className="rnn-fading-sentence">
        {words.map((w, i) => (
          <span key={i} className="fade-word" style={{ opacity: w.o, animationDelay: `${i * 0.1}s` }}>{w.t}</span>
        ))}
        <span className="fade-word trigger-word">הוא</span>
        <span className="fade-word" style={{ opacity: 0.9 }}>התעצבן</span>
      </div>

      <div className="rnn-question">
        <div className="rnn-q-mark">?</div>
        <div className="rnn-q-text">מי זה <em>״הוא״</em>? יוסי? דני? אבא? המודל כבר שכח מזמן.</div>
      </div>
    </div>
  );
}

function RNNWallSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הקיר</div>
      <div className="dramatic-center">
        <div className="memory-fade-visual">
          <div className="memory-bar-container">
            <div className="memory-bar-fill" />
          </div>
          <div className="memory-label mono">זיכרון → נמחק</div>
        </div>
        <h2 className="dramatic-text" style={{ marginTop: 32 }}>המודל שוכח.</h2>
        <div className="dramatic-sub" style={{ animationDelay: '1s' }}>
          ככל שהמשפט ארוך יותר, <em>הזיכרון נמחק</em>.<br />
          המילים הראשונות נעלמות — וההקשר איתן.
        </div>
      </div>
    </div>
  );
}

function RNNBottleneckSlide({ slideNum }) {
  const sentence = ['יוסי', 'הלך', 'עם', 'דני', 'לחנות', 'אחרי', 'שאבא', 'שלו', 'התקשר', 'אליו'];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מה בדיוק נשבר ב-RNN?</div>
      <h2>לא רק “שוכח”. יש כאן <em>צוואר בקבוק</em>.</h2>
      <p className="slide-sub">כל המשפט נדחס לזיכרון קטן אחד שעובר קדימה.</p>

      <div className="bottleneck-visual">
        <div className="bottleneck-words">
          {sentence.map((word, i) => (
            <span key={word} style={{ animationDelay: `${0.15 + i * 0.06}s` }}>{word}</span>
          ))}
        </div>
        <div className="bottleneck-funnel">↓</div>
        <div className="bottleneck-state">
          <div className="mono">Hidden State</div>
          <strong>קפסולה קטנה של הקשר</strong>
        </div>
      </div>

      <Highlight color="#ef4444">
        כשכל העבר חייב לעבור דרך נקודה אחת, פרטים חשובים נמעכים. Attention משנה את המשחק: במקום לזכור הכל, הוא חוזר ומסתכל על המקור.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 6 — ATTENTION: THE SOLUTION
// ═══════════════════════════════════════════════════════════════

function AttentionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Attention</div>
      <h2><em>Attention</em> — הקשר הוא הכל.</h2>
      <p className="slide-sub">המודל לא קורא מילים — הוא מחפש <em>קשרים</em>.</p>

      <div className="attn-spotlight-list">
        <div className="attn-spotlight-row" style={{ animationDelay: '0.2s' }}>
          <div className="attn-sentence">
            הוא ניגש לדוכן ו<span className="attn-word">קנה</span> עיתון
          </div>
          <div className="attn-arrow">←</div>
          <div className="attn-anchor">דוכן</div>
          <div className="attn-result mono">= רכש 🛒</div>
        </div>
        <div className="attn-spotlight-row" style={{ animationDelay: '0.5s' }}>
          <div className="attn-sentence">
            הוא ניקה את ה<span className="attn-word">קנה</span> של הרובה
          </div>
          <div className="attn-arrow">←</div>
          <div className="attn-anchor">רובה</div>
          <div className="attn-result mono">= צינור 🔫</div>
        </div>
        <div className="attn-spotlight-row" style={{ animationDelay: '0.8s' }}>
          <div className="attn-sentence">
            תחת צאלים ישכב בסתר <span className="attn-word">קנה</span>
          </div>
          <div className="attn-arrow">←</div>
          <div className="attn-anchor">צאלים</div>
          <div className="attn-result mono">= צמח 🌿</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ATTENTION DEEP-DIVE

function ParadigmShiftSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — שינוי פרדיגמה</div>
      <h2>אל תנסה לזכור. פשוט <em>תסתכל</em>.</h2>

      <div className="rnn-vs-attn">
        <div className="rnn-vs-side rnn-side" style={{ animationDelay: '0.2s' }}>
          <div className="rnn-vs-label">RNN</div>
          <div className="rnn-vs-visual">
            <div className="flashlight-scene">
              <div className="flashlight-beam" />
              <div className="flashlight-words">
                <span className="fl-word dim">הוא</span>
                <span className="fl-word dim">ניגש</span>
                <span className="fl-word dim">ל</span>
                <span className="fl-word lit">דוכן</span>
                <span className="fl-word dim">ו</span>
                <span className="fl-word dim">קנה</span>
              </div>
            </div>
          </div>
          <div className="rnn-vs-desc">רואה מילה אחת בכל רגע.<br />חייב <em>לזכור</em> את מה שהיה.</div>
        </div>

        <div className="rnn-vs-divider">
          <span className="rnn-vs-arrow">←</span>
        </div>

        <div className="rnn-vs-side attn-side" style={{ animationDelay: '0.5s' }}>
          <div className="rnn-vs-label">Attention</div>
          <div className="rnn-vs-visual">
            <div className="projector-scene">
              <div className="projector-beam" />
              <div className="projector-words">
                <span className="pj-word">הוא</span>
                <span className="pj-word">ניגש</span>
                <span className="pj-word">ל</span>
                <span className="pj-word">דוכן</span>
                <span className="pj-word">ו</span>
                <span className="pj-word">קנה</span>
              </div>
            </div>
          </div>
          <div className="rnn-vs-desc">רואה את <em>הכל בבת אחת</em>.<br />מחשב קשרים במקביל.</div>
        </div>
      </div>
    </div>
  );
}

function AllTokensOnTableSlide({ slideNum }) {
  const tokens = ['הוא', 'ניגש', 'ל', 'דוכן', 'ו', 'קנה', 'עיתון'];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — כל המילים על השולחן</div>
      <h2>“הכל בבת אחת” לא אומר קסם.</h2>
      <p className="slide-sub">זה אומר שכל הטוקנים נמצאים יחד במטריצה אחת, והמודל מחשב קשרים ביניהם.</p>

      <div className="token-matrix">
        {tokens.map((token, i) => (
          <div key={token} className="matrix-token" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
            <span className="mono">t{i + 1}</span>
            {token}
          </div>
        ))}
      </div>

      <Highlight>
        עכשיו כל מילה יכולה לשאול: “מי במשפט הזה רלוונטי אליי?”
      </Highlight>
    </div>
  );
}

function AttentionMatrixSlide({ slideNum }) {
  const words = ['הוא', 'דוכן', 'קנה', 'עיתון'];
  const weights = [
    [0.1, 0.2, 0.6, 0.1],
    [0.1, 0.4, 0.4, 0.1],
    [0.1, 0.55, 0.2, 0.15],
    [0.05, 0.25, 0.45, 0.25],
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — טבלת קשרים</div>
      <h2>Attention הוא <em>טבלת רלוונטיות</em>.</h2>
      <p className="slide-sub">כל מילה מול כל מילה. כל תא אומר: כמה מילה אחת צריכה להקשיב לאחרת.</p>

      <div className="attention-heatmap" style={{ gridTemplateColumns: `110px repeat(${words.length}, 1fr)` }}>
        <div className="heatmap-corner" />
        {words.map((word) => <div key={`col-${word}`} className="heatmap-header">{word}</div>)}
        {words.flatMap((row, rowIndex) => [
            <div key={`row-${row}`} className="heatmap-header row-header">{row}</div>
            ,
            ...words.map((col, colIndex) => (
              <div
                key={`${row}-${col}`}
                className="heatmap-cell"
                style={{
                  '--w': weights[rowIndex][colIndex],
                  animationDelay: `${0.18 + (rowIndex * words.length + colIndex) * 0.035}s`,
                }}
              >
                <span className="mono">{weights[rowIndex][colIndex].toFixed(2)}</span>
              </div>
            )),
          ])}
      </div>

      <Highlight>
        כשמפרשים את “קנה”, התא מול “דוכן” נדלק חזק יותר. זו משמעות שנוצרת מתוך הקשר.
      </Highlight>
    </div>
  );
}

function AttentionInActionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Attention בפעולה</div>
      <h2>איך זה נראה <em>בפועל</em>?</h2>

      <div className="attn-interactive">
        <div className="attn-inter-sentence">
          <span className="attn-inter-word">הוא</span>
          <span className="attn-inter-word">היה</span>
          <span className="attn-inter-word">ב</span>
          <span className="attn-inter-word attn-trigger">שוק</span>
          <span className="attn-inter-word">מ</span>
          <span className="attn-inter-word">ה</span>
          <span className="attn-inter-word attn-target">הודעה</span>
          <span className="attn-inter-word">ה</span>
          <span className="attn-inter-word attn-target-2">דרמטית</span>
        </div>
        <div className="attn-inter-lines">
          <svg className="attn-svg" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M 30 5 Q 52 28 72 5" className="attn-laser main-laser" />
            <path d="M 30 5 Q 58 25 82 5" className="attn-laser sub-laser" />
          </svg>
        </div>
        <div className="attn-inter-hint mono">העבר עכבר על ״שוק״ לראות את קווי ה-Attention</div>
      </div>

      <Highlight>
        הקשר נבנה לפי <em>רלוונטיות</em>, לא לפי מרחק. המודל ״מחליט״ למה לשים לב.
      </Highlight>
    </div>
  );
}

function QKVMatchmakingSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Query, Key, Value</div>
      <h2>מערכת <em>השידוכים</em> של המחשב.</h2>
      <p className="slide-sub">כל מילה שולחת שאילתה, מחפשת התאמה, ומקבלת תוכן.</p>

      <div className="qkv-matchmaking">
        <div className="qkv-match-step" style={{ animationDelay: '0.2s' }}>
          <div className="qkv-match-icon">🔍</div>
          <div className="qkv-match-title">Query · שאילתה</div>
          <div className="qkv-match-quote">״מה אני מחפש?״</div>
          <div className="qkv-match-sub">כל מילה שואלת:<br />״מי כאן רלוונטי אליי?״</div>
        </div>
        <div className="qkv-match-arrow" style={{ animationDelay: '0.4s' }}>←</div>
        <div className="qkv-match-step" style={{ animationDelay: '0.5s' }}>
          <div className="qkv-match-icon">🏷️</div>
          <div className="qkv-match-title">Key · מפתח</div>
          <div className="qkv-match-quote">״זה מה שיש לי להציע״</div>
          <div className="qkv-match-sub">כל מילה מפרסמת:<br />״הנה התווית שלי״</div>
        </div>
        <div className="qkv-match-arrow" style={{ animationDelay: '0.7s' }}>←</div>
        <div className="qkv-match-step" style={{ animationDelay: '0.8s' }}>
          <div className="qkv-match-icon">📦</div>
          <div className="qkv-match-title">Value · ערך</div>
          <div className="qkv-match-quote">״התוכן שאני מעביר״</div>
          <div className="qkv-match-sub">ברגע שיש התאמה:<br />״הנה המשמעות שנוצרת״</div>
        </div>
      </div>
    </div>
  );
}

function InternalDialogueSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הדיאלוג הפנימי</div>
      <h2>איך המילים <em>מדברות</em> ביניהן.</h2>

      <div className="dialogue-scene">
        <div className="dialogue-step" style={{ animationDelay: '0.3s' }}>
          <div className="dialogue-word-tag">קנה</div>
          <div className="dialogue-bubble query-bubble">
            <div className="bubble-label mono">Query</div>
            ״אני מחפשת הקשר צבאי...״
          </div>
        </div>
        <div className="dialogue-step" style={{ animationDelay: '0.8s' }}>
          <div className="dialogue-word-tag">רובה</div>
          <div className="dialogue-bubble key-bubble">
            <div className="bubble-label mono">Key</div>
            ״יש לי תווית של כלי נשק!״
          </div>
        </div>
        <div className="dialogue-step match-step" style={{ animationDelay: '1.3s' }}>
          <div className="dialogue-word-tag">התאמה!</div>
          <div className="dialogue-bubble value-bubble">
            <div className="bubble-label mono">Value</div>
            ״בינגו! → קנה = קנה רובה (barrel)״
          </div>
        </div>
      </div>
    </div>
  );
}

function AttentionHappensNowSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Attention קורה גם עכשיו</div>
      <h2>Attention הוא לא רק משהו שקרה באימון.</h2>

      <div className="now-flow">
        <div className="now-step" style={{ animationDelay: '0.2s' }}>
          <div className="now-icon">🏋️</div>
          <div className="now-title">באימון</div>
          <div className="now-desc">המודל לומד איך לחשב Attention: אילו דפוסים כדאי לחפש.</div>
        </div>
        <div className="now-step accent" style={{ animationDelay: '0.5s' }}>
          <div className="now-icon">💬</div>
          <div className="now-title">בזמן שימוש</div>
          <div className="now-desc">הוא מריץ Attention מחדש על הטקסט שלך, בכל תשובה, בכל צעד.</div>
        </div>
      </div>

      <Highlight>
        לכן אותו מודל יכול לענות אחרת על אותה מילה בתוך הקשר אחר. ה-Attention מחושב מחדש לפי השיחה הנוכחית.
      </Highlight>
    </div>
  );
}

function MultiHeadAttentionSlide({ slideNum }) {
  const heads = [
    { icon: '🎯', title: 'נושא', desc: 'מי עושה את הפעולה?' },
    { icon: '🔗', title: 'כינוי', desc: 'למי “הוא” מתייחס?' },
    { icon: '🎭', title: 'טון', desc: 'רציני, ציני, רגשי?' },
    { icon: '🧭', title: 'סמנטיקה', desc: 'איזו משמעות מתאימה כאן?' },
  ];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Multi-head Attention</div>
      <h2>ראש אחד לא מספיק. המודל מסתכל מכמה זוויות.</h2>
      <p className="slide-sub">כל head יכול ללמוד סוג אחר של קשר בתוך המשפט.</p>

      <div className="multihead-grid">
        {heads.map((head, i) => (
          <div key={head.title} className="head-card" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
            <div className="head-icon">{head.icon}</div>
            <div className="head-title">{head.title}</div>
            <div className="head-desc">{head.desc}</div>
          </div>
        ))}
      </div>

      <Highlight>
        ביחד, הרבה ראשים יוצרים תמונת הקשר עשירה יותר מכל מבט יחיד.
      </Highlight>
    </div>
  );
}

function ParallelismSlide({ slideNum }) {
  const rnnWords = ['הוא', 'ניגש', 'ל', 'דוכן', 'ו', 'קנה', 'עיתון'];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Parallelism</div>
      <h2>לא צריך <em>לחכות</em> יותר.</h2>

      <div className="parallel-compare">
        <div className="parallel-side" style={{ animationDelay: '0.2s' }}>
          <div className="parallel-label">RNN — סדרתי</div>
          <div className="parallel-track">
            {rnnWords.map((w, i) => (
              <span key={i} className="par-word seq" style={{ animationDelay: `${0.5 + i * 0.4}s` }}>{w}</span>
            ))}
          </div>
          <div className="parallel-time mono">⏱ ~7 צעדים</div>
        </div>

        <div className="parallel-side flash-side" style={{ animationDelay: '0.4s' }}>
          <div className="parallel-label">Attention — מקבילי</div>
          <div className="parallel-track">
            {rnnWords.map((w, i) => (
              <span key={i} className="par-word flash" style={{ animationDelay: '1.0s' }}>{w}</span>
            ))}
          </div>
          <div className="parallel-time mono">⚡ צעד 1</div>
        </div>
      </div>

      <Highlight>
        זה מה שמאפשר לאמן מודלים על <em>כל האינטרנט</em>.
      </Highlight>
    </div>
  );
}

function AttentionSummarySlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סיכום המהפכה</div>
      <h2>RNN vs. <em>Attention</em>.</h2>

      <div className="attn-summary-table">
        <div className="attn-table-header">
          <div className="attn-th">קריטריון</div>
          <div className="attn-th rnn-col">❌ RNN</div>
          <div className="attn-th attn-col">✅ Attention</div>
        </div>
        <div className="attn-table-row" style={{ animationDelay: '0.2s' }}>
          <div className="attn-td label-td">עיבוד</div>
          <div className="attn-td rnn-col">מילה אחרי מילה (סדרתי)</div>
          <div className="attn-td attn-col">כל המילים בבת אחת (מקבילי)</div>
        </div>
        <div className="attn-table-row" style={{ animationDelay: '0.4s' }}>
          <div className="attn-td label-td">זיכרון</div>
          <div className="attn-td rnn-col">שוכח מילים רחוקות</div>
          <div className="attn-td attn-col">רואה הכל, תמיד</div>
        </div>
        <div className="attn-table-row" style={{ animationDelay: '0.6s' }}>
          <div className="attn-td label-td">הקשר</div>
          <div className="attn-td rnn-col">תלוי במרחק</div>
          <div className="attn-td attn-col">תלוי ברלוונטיות</div>
        </div>
        <div className="attn-table-row" style={{ animationDelay: '0.8s' }}>
          <div className="attn-td label-td">מהירות</div>
          <div className="attn-td rnn-col">איטי (לא ניתן למקבול)</div>
          <div className="attn-td attn-col">מהיר (GPU-friendly)</div>
        </div>
        <div className="attn-table-row" style={{ animationDelay: '1.0s' }}>
          <div className="attn-td label-td">סקייל</div>
          <div className="attn-td rnn-col">עד אלפי מילים</div>
          <div className="attn-td attn-col">מיליוני מילים+</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 7 — TRANSFORMER: THE REVOLUTION
// ═══════════════════════════════════════════════════════════════

function RevolutionMomentSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — רגע המהפכה</div>
      <div className="dramatic-center">
        <h2 className="dramatic-text" style={{ fontSize: 42 }}>
          ומה אם...<br />
          <em>לא צריך סדר בכלל?</em>
        </h2>
        <div className="closing-divider" />
        <div className="revolution-reveal">
          <div className="revolution-paper">
            <div className="revolution-title">"Attention Is All You Need"</div>
            <div className="revolution-authors mono">Vaswani et al. · Google · 2017</div>
          </div>
          <div className="revolution-desc">
            המאמר שביטל את הסדר.<br />
            המחשב רואה <em>הכל בבת אחת</em> — ומחליט למה לשים לב.
          </div>
        </div>
      </div>
    </div>
  );
}

function TransformerSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Transformer</div>
      <h2>מ-RNN ל-<em>Transformer</em>.</h2>
      <p className="slide-sub">מרשתות שעובדות מילה-אחרי-מילה לארכיטקטורה שרואה הכל בו-זמנית.</p>
      <div className="llm-timeline">
        <div className="llm-timeline-item">
          <div className="llm-timeline-dot" />
          <div className="llm-timeline-content">
            <div className="llm-timeline-year">2013</div>
            <div className="llm-timeline-title">Word2Vec</div>
            <div className="llm-timeline-desc">embeddings ראשונים — מילים כנקודות במרחב.</div>
          </div>
        </div>
        <div className="llm-timeline-item">
          <div className="llm-timeline-dot" />
          <div className="llm-timeline-content">
            <div className="llm-timeline-year">2017</div>
            <div className="llm-timeline-title">Transformer</div>
            <div className="llm-timeline-desc">Attention Is All You Need — מהפכה בעיבוד שפה.</div>
          </div>
        </div>
        <div className="llm-timeline-item">
          <div className="llm-timeline-dot" />
          <div className="llm-timeline-content">
            <div className="llm-timeline-year">2018–2020</div>
            <div className="llm-timeline-title">BERT → GPT-2 → GPT-3</div>
            <div className="llm-timeline-desc">הגדלת סקייל: מ-110M פרמטרים ל-175B.</div>
          </div>
        </div>
        <div className="llm-timeline-item">
          <div className="llm-timeline-dot" style={{ background: 'var(--orange)' }} />
          <div className="llm-timeline-content">
            <div className="llm-timeline-year">2022–2025</div>
            <div className="llm-timeline-title">ChatGPT → Claude → Gemini</div>
            <div className="llm-timeline-desc">LLMs נכנסים לשימוש יומיומי של מיליארדי אנשים.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreTrainingSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — אימון</div>
      <h2>איך <em>מאמנים</em> מודל כזה?</h2>

      <div className="training-pipeline">
        <div className="training-phase phase-pre" style={{ animationDelay: '0.3s' }}>
          <div className="phase-icon">🌍</div>
          <div className="phase-title">Pre-training</div>
          <div className="phase-desc">לומד מ<em>כל האינטרנט</em></div>
          <div className="phase-detail">ויקיפדיה, ספרים, קוד, פורומים, חדשות...<br />מיליארדי משפטים. חודשים של חישוב.</div>
        </div>

        <div className="training-arrow" style={{ animationDelay: '0.8s' }}>↓</div>

        <div className="training-phase phase-fine" style={{ animationDelay: '1.0s' }}>
          <div className="phase-icon">🎯</div>
          <div className="phase-title">Fine-tuning</div>
          <div className="phase-desc">מתמחה ב<em>משימות ספציפיות</em></div>
          <div className="phase-detail">שיחה, שירות לקוחות, קוד, רפואה...<br />דאטה ממוקד. משוב אנושי.</div>
        </div>
      </div>

      <Highlight>
        Pre-training לא שומר עובדות כמו DB. הוא משנה <em>משקלים</em> — כדי שהחיזוי הבא יהיה טוב יותר.
      </Highlight>
    </div>
  );
}

function WhatIsGPTSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — פירוק השם</div>
      <h2>אז מה זה <em>GPT</em>?</h2>

      <div className="gpt-acronym">
        <div className="acronym-row" style={{ animationDelay: '0.3s' }}>
          <div className="acronym-letter">G</div>
          <div className="acronym-word">Generative</div>
          <div className="acronym-explain">מייצר טקסט — <em>מנבא את המילה הבאה</em></div>
        </div>
        <div className="acronym-row" style={{ animationDelay: '0.7s' }}>
          <div className="acronym-letter">P</div>
          <div className="acronym-word">Pre-trained</div>
          <div className="acronym-explain">למד שפה על <em>כמויות עצומות של טקסט</em></div>
        </div>
        <div className="acronym-row" style={{ animationDelay: '1.1s' }}>
          <div className="acronym-letter">T</div>
          <div className="acronym-word">Transformer</div>
          <div className="acronym-explain">הארכיטקטורה — <em>Attention</em></div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 8 — EMERGENCE
// ═══════════════════════════════════════════════════════════════

function WhatGPTDoesSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — מה GPT עושה?</div>
      <h2>GPT עושה דבר אחד: <em>מנבא את המילה הבאה</em>.</h2>

      <div className="gpt-predict">
        <div className="gpt-prompt-text">אני יושב בבית קפה ושותה <span className="gpt-blank" /></div>
        <div className="gpt-predictions">
          <div className="gpt-pred" style={{ animationDelay: '0.5s' }}>
            <span className="gpt-pred-word">קפה</span>
            <div className="prob-bar-track"><div className="prob-bar-fill" style={{ width: '68%', animationDelay: '0.8s' }} /></div>
            <span className="prob-pct">68%</span>
          </div>
          <div className="gpt-pred" style={{ animationDelay: '0.7s' }}>
            <span className="gpt-pred-word">תה</span>
            <div className="prob-bar-track"><div className="prob-bar-fill secondary" style={{ width: '18%', animationDelay: '1.0s' }} /></div>
            <span className="prob-pct">18%</span>
          </div>
          <div className="gpt-pred" style={{ animationDelay: '0.9s' }}>
            <span className="gpt-pred-word">מים</span>
            <div className="prob-bar-track"><div className="prob-bar-fill tertiary" style={{ width: '8%', animationDelay: '1.2s' }} /></div>
            <span className="prob-pct">8%</span>
          </div>
        </div>
      </div>

      <Highlight>
        זה <em>כל מה שהוא עושה</em>. מנבא. שוב. ושוב. ושוב. מילה אחרי מילה.
      </Highlight>
    </div>
  );
}

function WhyItSeemsSmartSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הפרדוקס</div>
      <div className="revelation-scene">
        <div className="revelation-main" style={{ fontSize: 46 }}>
          אז למה זה <em>נראה</em> חכם?
        </div>
        <div className="revelation-glow" style={{ animationDelay: '0.8s' }}>
          כי הוא נהיה טוב מאוד בזה.
        </div>
        <div className="closing-divider" />
        <div className="emergence-boom">
          אף אחד לא תכנת הבנה.<br />
          <em>היא צמחה מתוך חיזוי.</em>
        </div>
      </div>
    </div>
  );
}

function DoesGPTRememberSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — האם GPT זוכר?</div>
      <div className="dramatic-center">
        <h2 className="dramatic-text">שאלה קריטית: האם GPT <em>זוכר</em>?</h2>
        <div className="memory-choice">
          <div className="memory-choice-card">
            <div className="memory-choice-icon">🧠</div>
            <strong>נראה שכן</strong>
            <span>הוא מדבר בביטחון, מצטט, מסביר, מחבר רעיונות.</span>
          </div>
          <div className="memory-choice-card accent">
            <div className="memory-choice-icon">⚙️</div>
            <strong>אבל טכנית: לא כמו DB</strong>
            <span>הוא לא שולף רשומה. הוא מחולל המשך סביר לפי משקלים והקשר.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeightsNotDatabaseSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Weights ≠ Database</div>
      <h2>משקלים הם לא <em>בסיס נתונים</em>.</h2>

      <div className="db-vs-llm">
        <div className="db-card" style={{ animationDelay: '0.2s' }}>
          <div className="db-icon">🗄️</div>
          <div className="db-title">Database</div>
          <div className="db-desc">שולף עובדה קיימת: רשומה, שורה, מזהה, מקור.</div>
          <div className="db-line mono">SELECT price FROM products WHERE id=42</div>
        </div>
        <div className="db-card accent" style={{ animationDelay: '0.45s' }}>
          <div className="db-icon">✨</div>
          <div className="db-title">LLM</div>
          <div className="db-desc">מחולל תשובה סבירה מתוך דפוסים שלמד.</div>
          <div className="db-line mono">next_token = argmax(P(token | context))</div>
        </div>
      </div>
    </div>
  );
}

function HallucinationWhySlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — למה יש הזיות?</div>
      <h2>כי המודל ממשיך לחזות גם כשאין לו <em>עוגן עובדתי</em>.</h2>

      <div className="hallucination-scene">
        <div className="hallucination-prompt">“מה המדיניות החדשה של החברה שלנו לגבי החזרי נסיעות?”</div>
        <div className="hallucination-arrow">↓</div>
        <div className="hallucination-answer">
          נשמע כמו שאלה שיש לה תשובה...<br />
          אז המודל מייצר תשובה סבירה, גם אם הוא לא מכיר את המסמך האמיתי.
        </div>
      </div>

      <Highlight color="#ef4444">
        הזיה היא לא “באג מוזר”. היא תוצאה טבעית של מערכת שמטרתה להמשיך טקסט, לא לאמת עובדות.
      </Highlight>
    </div>
  );
}

function TruthBridgeToRAGSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — אז איך מחברים אותו לאמת?</div>
      <div className="dramatic-center">
        <h2 className="dramatic-text">
          לא מספיק מודל חכם.<br />
          צריך <em>מקור אמת</em>.
        </h2>
        <div className="rag-bridge">
          <span>שאלה</span>
          <span>←</span>
          <span>חיפוש במסמכים</span>
          <span>←</span>
          <span>הקשר אמיתי</span>
          <span>←</span>
          <span>תשובה</span>
        </div>
        <div className="dramatic-sub">
          לזה קוראים RAG: Retrieval-Augmented Generation.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PRACTICAL
// ═══════════════════════════════════════════════════════════════

function PromptingSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Chat Programming</div>
      <h2><em>Chat Programming</em> — לתכנת התנהגות בשפה.</h2>
      <p className="slide-sub">Prompt הוא לא “בקשה יפה”. הוא מפרט התנהגות: תפקיד, הקשר, משימה, מגבלות ובדיקת איכות.</p>
      <div className="chat-programming-grid">
        <div className="concept-card">
          <div className="concept-en mono">❌ Weak Prompt</div>
          <div className="concept-he">פרומפט חלש</div>
          <div className="prompt-block" style={{ margin: '12px 0 0' }}>
            <div className="prompt-body">"תכתוב לי משהו על שיווק"</div>
          </div>
        </div>
        <div className="concept-card accent">
          <div className="concept-en mono">✓ Strong Prompt</div>
          <div className="concept-he">פרומפט חזק</div>
          <div className="prompt-block" style={{ margin: '12px 0 0' }}>
            <div className="prompt-body">"אתה מומחה שיווק B2B. כתוב 3 כותרות לניוזלטר שבועי לקהל מנהלי IT, בטון מקצועי אך נגיש."</div>
          </div>
        </div>
        <div className="concept-card behavior-card">
          <div className="concept-en mono">⚙ Behavior System</div>
          <div className="concept-he">מערכת התנהגות</div>
          <div className="prompt-block" style={{ margin: '12px 0 0' }}>
            <div className="prompt-body">"תמיד שאל שאלת הבהרה אחת אם חסר מידע. החזר תשובה קצרה, עם הנחות מפורשות וצעדי המשך."</div>
          </div>
        </div>
      </div>
      <Highlight>
        <em>Role + Context + Task + Constraints + Quality Check</em> — כך מתכנתים התנהגות בשפה.
      </Highlight>
    </div>
  );
}

function BusinessProblemSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הבעיה העסקית</div>
      <h2>המודל לא מכיר את <em>הארגון שלך</em>.</h2>
      <p className="slide-sub">הוא לא יודע מה כתוב ב-Notion שלכם, בחוזים שלכם, ב-CRM שלכם או בנהלים שהתעדכנו אתמול.</p>

      <div className="card-grid cols2">
        <ConceptCard en="Public Knowledge" he="ידע ציבורי" def="מה שהיה בדאטה של האימון, עד תאריך מסוים, בלי התחייבות לעדכניות." />
        <ConceptCard en="Private Truth" he="אמת ארגונית" def="מסמכים, מדיניות, לקוחות, עסקאות, קוד פנימי ונתונים חיים." accent />
      </div>

      <Highlight color="#a855f7">
        לכן בארגון אמיתי, LLM לבד הוא לא מערכת. הוא צריך חיבור לדאטה אמיתי.
      </Highlight>
    </div>
  );
}

function RAGPipelineSlide({ slideNum }) {
  const steps = ['User', 'Search', 'Relevant Docs', 'Context', 'Answer'];

  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — RAG Pipeline</div>
      <h2>RAG: קודם מחפשים, אחר כך עונים.</h2>

      <div className="rag-pipeline">
        {steps.map((step, i) => (
          <div key={step} className="rag-step-wrap">
            <div className="rag-step" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
              <span className="mono">{i + 1}</span>
              {step}
            </div>
            {i < steps.length - 1 && <div className="rag-arrow">←</div>}
          </div>
        ))}
      </div>

      <Highlight>
        RAG לא משנה את המודל. הוא נותן לו חומר רלוונטי בתוך ההקשר של השאלה.
      </Highlight>
    </div>
  );
}

function RAGUsesVectorsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — RAG משתמש בוקטורים</div>
      <h2>גם כאן חוזרים ל<em>מרחב הווקטורי</em>.</h2>
      <p className="slide-sub">שאלה ומסמכים הופכים לווקטורים. מחפשים מי קרוב סמנטית.</p>

      <div className="rag-vector-space">
        <div className="query-point">שאלה</div>
        <div className="doc-point close one">מסמך רלוונטי</div>
        <div className="doc-point close two">נוהל פנימי</div>
        <div className="doc-point far">פוסט לא קשור</div>
        <svg viewBox="0 0 100 60" className="rag-vector-lines" preserveAspectRatio="none">
          <line x1="50" y1="30" x2="32" y2="18" />
          <line x1="50" y1="30" x2="65" y2="22" />
        </svg>
      </div>

      <Highlight>
        זה אותו רעיון של Word2Vec, רק על משפטים ומסמכים שלמים.
      </Highlight>
    </div>
  );
}

function RAGNotSQLSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — RAG ≠ SQL</div>
      <h2>SQL מחפש התאמה. RAG מחפש <em>דמיון</em>.</h2>

      <div className="db-vs-llm">
        <div className="db-card" style={{ animationDelay: '0.2s' }}>
          <div className="db-icon">🔎</div>
          <div className="db-title">SQL</div>
          <div className="db-desc">“תן לי את הלקוח עם id=42”. התאמה מדויקת, סכימה ידועה.</div>
          <div className="db-line mono">WHERE customer_id = 42</div>
        </div>
        <div className="db-card accent" style={{ animationDelay: '0.45s' }}>
          <div className="db-icon">🧲</div>
          <div className="db-title">RAG</div>
          <div className="db-desc">“איפה כתוב על החזרי נסיעות?”. התאמה סמנטית, ניסוח חופשי.</div>
          <div className="db-line mono">nearest_vectors(question, docs)</div>
        </div>
      </div>
    </div>
  );
}

function AgentsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Agents</div>
      <h2>Agent = מודל + כלים + פעולות + בדיקה.</h2>
      <p className="slide-sub">המודל לא רק עונה. הוא יכול לתכנן, לקרוא כלי, לבצע פעולה, לבדוק תוצאה ולתקן.</p>

      <div className="agent-loop">
        <div>Plan</div>
        <span>←</span>
        <div>Act</div>
        <span>←</span>
        <div>Observe</div>
        <span>←</span>
        <div>Verify</div>
      </div>

      <Highlight color="#a855f7">
        בחלק הבא נראה איך זה נכנס לאוטומציה עסקית — וגם למה חייבים ביקורת, הרשאות וגבולות.
      </Highlight>
    </div>
  );
}

function SummarySlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סיכום</div>
      <h2>המסע שעשינו היום.</h2>
      <div className="summary-ladder">
        {[
          'דאטה הוא ייצוג',
          'וקטורים נותנים למחשב מרחב',
          'Word2Vec הראה שמשמעות יכולה להיות גאומטריה',
          'Attention נותן הקשר דינמי',
          'GPT מנבא, לא יודע',
          'RAG מחבר אותו לדאטה אמיתי',
          'Agents מחברים אותו לפעולה בעולם',
        ].map((item, i) => (
          <div key={item} className="summary-step" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
            <span className="mono">{i + 1}</span>
            {item}
          </div>
        ))}
      </div>
      <Highlight>
        בפעם הבאה: <em>Business Automation, AI Regulation, Critical Thinking</em>.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// WIRE UP
// ═══════════════════════════════════════════════════════════════
const SLIDE_COMPONENTS = [
  TitleSlide,
  SurveyResultsSlide,
  // Act 1
  OpeningSlide,
  TrapSlide,
  CollapseSlide,
  DemoSlide,
  BigTransitionSlide,
  // Act 2 — Data
  WhatIsDataSlide,
  ComputerSeesNumbersSlide,
  StructuredUnstructuredSlide,
  WhyDataMattersSlide,
  AIRepresentationProblemSlide,
  DataToWordsTransitionSlide,
  // Act 2
  SymbolicSlide,
  WhyBreaksSlide,
  ImpossibleSlide,
  RulesConclusionSlide,
  // Act 3
  ParadigmSlide,
  NgramsSlide,
  MarkovSlide,
  StillStupidSlide,
  // Act 4 — Vectors and Dimensions
  VectorDefinitionSlide,
  VectorPointSpaceSlide,
  VectorSimilaritySlide,
  HumanDimensionLimitSlide,
  ComputerHandlesDimensionsSlide,
  LearnedDimensionsSlide,
  LatentDimensionsSlide,
  // Act 4
  WordsAsIDsSlide,
  WordsAsPointsSlide,
  IntuitionSlide,
  ProximitySlide,
  VectorArithmeticSlide,
  MeaningIsRelationshipsSlide,
  ClosingPart1Slide,
  // Act 5 — RNN Pain
  RNNIntroSlide,
  RNNArchitectureSlide,
  RNNProblemSlide,
  RNNWallSlide,
  RNNBottleneckSlide,
  // Act 6 — Attention Solution
  AttentionSlide,
  ParadigmShiftSlide,
  AllTokensOnTableSlide,
  AttentionMatrixSlide,
  AttentionInActionSlide,
  QKVMatchmakingSlide,
  InternalDialogueSlide,
  AttentionHappensNowSlide,
  MultiHeadAttentionSlide,
  ParallelismSlide,
  AttentionSummarySlide,
  // Act 7 — Transformer Revolution
  RevolutionMomentSlide,
  TransformerSlide,
  PreTrainingSlide,
  WhatIsGPTSlide,
  // Act 8 — Emergence
  WhatGPTDoesSlide,
  WhyItSeemsSmartSlide,
  DoesGPTRememberSlide,
  WeightsNotDatabaseSlide,
  HallucinationWhySlide,
  TruthBridgeToRAGSlide,
  // Practical
  PromptingSlide,
  BusinessProblemSlide,
  RAGPipelineSlide,
  RAGUsesVectorsSlide,
  RAGNotSQLSlide,
  AgentsSlide,
  SummarySlide,
];

export default function LLMSlides() {
  return (
    <SlideShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="מודלי שפה ו-AI גנרטיבי"
      deckClass="deck-llm"
      deck="llm"
      surveyPath="/llm"
    />
  );
}
