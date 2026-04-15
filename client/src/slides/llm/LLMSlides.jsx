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
  // Act 2 — The symbolic failure
  { id: 8,  title: 'העידן הסימבולי', navNum: 'ב' },
  { id: 9,  title: 'למה זה נשבר' },
  { id: 10, title: 'משפט בלתי אפשרי' },
  { id: 11, title: 'מסקנה' },
  // Act 3 — Statistical revolution
  { id: 12, title: 'שינוי פרדיגמה', navNum: 'ג' },
  { id: 13, title: 'N-grams' },
  { id: 14, title: 'Markov' },
  { id: 15, title: 'עדיין טיפש' },
  // Act 4 — Word2Vec breakthrough
  { id: 16, title: 'מילים = מספרים', navNum: 'ד' },
  { id: 17, title: 'מילים = נקודות' },
  { id: 18, title: 'אינטואיציה' },
  { id: 19, title: 'קרבה במרחב' },
  { id: 20, title: 'מלך − גבר + אישה' },
  { id: 21, title: 'משמעות = קשרים' },
  { id: 22, title: 'סגירת חלק 1' },
  // Part 2 — The RNN Pain
  { id: 23, title: 'שמירת הקשר', navNum: 'ה' },
  { id: 24, title: 'הבעיה' },
  { id: 25, title: 'הקיר' },
  // Attention — The Solution
  { id: 26, title: 'Attention' },
  { id: 27, title: 'RNN → Attention' },
  { id: 28, title: 'Attention בפעולה' },
  { id: 29, title: 'QKV — שידוכים', navNum: 'ו' },
  { id: 30, title: 'הדיאלוג הפנימי' },
  // Transformer — The Revolution
  { id: 31, title: 'ומה אם...?' },
  { id: 32, title: 'Parallelism' },
  { id: 33, title: 'Transformer', navNum: 'ז' },
  { id: 34, title: 'Pre-training' },
  { id: 35, title: 'אז מה זה GPT?' },
  // Emergence
  { id: 36, title: 'מה GPT עושה?', navNum: 'ח' },
  { id: 37, title: 'למה זה נראה חכם?' },
  // Practical
  { id: 38, title: 'Prompting' },
  { id: 39, title: 'RAG & Agents' },
  { id: 40, title: 'סיכום' },
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
      <p className="slide-sub">Word2Vec (2013): כל מילה הופכת לנקודה. מילים דומות → נקודות קרובות.</p>

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
          <span className="rnn-vs-arrow">→</span>
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
        <div className="qkv-match-arrow" style={{ animationDelay: '0.4s' }}>→</div>
        <div className="qkv-match-step" style={{ animationDelay: '0.5s' }}>
          <div className="qkv-match-icon">🏷️</div>
          <div className="qkv-match-title">Key · מפתח</div>
          <div className="qkv-match-quote">״זה מה שיש לי להציע״</div>
          <div className="qkv-match-sub">כל מילה מפרסמת:<br />״הנה התווית שלי״</div>
        </div>
        <div className="qkv-match-arrow" style={{ animationDelay: '0.7s' }}>→</div>
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
        Pre-training נותן <em>שפה</em>. Fine-tuning נותן <em>כישורים</em>.
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

// ═══════════════════════════════════════════════════════════════
// PRACTICAL
// ═══════════════════════════════════════════════════════════════

function PromptingSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — Prompting</div>
      <h2><em>Prompting</em> — לדבר עם AI.</h2>
      <p className="slide-sub">ה-Prompt הוא הממשק שלנו עם המודל. איכות הפלט תלויה ישירות באיכות הקלט.</p>
      <div className="card-grid cols2">
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
      </div>
      <Highlight>
        <em>Role + Context + Task + Constraints</em> — ארבעת האלמנטים של prompt אפקטיבי.
      </Highlight>
    </div>
  );
}

function RAGAgentsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — RAG & Agents</div>
      <h2><em>RAG</em> ו-<em>Agents</em>.</h2>
      <p className="slide-sub">שתי גישות שמרחיבות את יכולת ה-LLM מעבר לידע הפנימי שלו.</p>
      <div className="card-grid cols2">
        <ConceptCard en="RAG" he="Retrieval-Augmented Generation"
          def="המודל מחפש מידע במאגר חיצוני לפני שהוא עונה — כמו סטודנט שפותח ספר לפני מבחן." accent />
        <ConceptCard en="Agents" he="סוכני AI"
          def="המודל לא רק עונה — הוא מתכנן, מבצע פעולות, ובודק תוצאות. Plan → Act → Observe." />
      </div>
      <Highlight color="#a855f7">
        בחלק הבא של הקורס נראה איך הכלים האלה נכנסים לשימוש בארגונים — ומה הסיכונים.
      </Highlight>
    </div>
  );
}

function SummarySlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — סיכום</div>
      <h2>מה <em>ראינו</em> היום?</h2>
      <div className="card-grid cols2">
        <ConceptCard en="Language ≠ Rules" he="שפה ≠ חוקים" def="אי אפשר ללמד מחשב שפה דרך כללים. שפה = סטטיסטיקה של הקשר." accent />
        <ConceptCard en="Words = Points" he="מילים = נקודות" def="Word2Vec: מילים הן נקודות במרחב. קרבה = דמיון." />
        <ConceptCard en="Attention" he="הקשר" def="Transformer: המודל בוחר במה להתמקד בכל צעד." />
        <ConceptCard en="Prompting" he="לדבר עם AI" def="Role + Context + Task + Constraints = prompt אפקטיבי." />
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
  RNNProblemSlide,
  RNNWallSlide,
  // Act 6 — Attention Solution
  AttentionSlide,
  ParadigmShiftSlide,
  AttentionInActionSlide,
  QKVMatchmakingSlide,
  InternalDialogueSlide,
  // Act 7 — Transformer Revolution
  RevolutionMomentSlide,
  ParallelismSlide,
  TransformerSlide,
  PreTrainingSlide,
  WhatIsGPTSlide,
  // Act 8 — Emergence
  WhatGPTDoesSlide,
  WhyItSeemsSmartSlide,
  // Practical
  PromptingSlide,
  RAGAgentsSlide,
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
