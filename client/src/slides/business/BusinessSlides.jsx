import SlideShell from '../shared/SlideShell';
import { ConceptCard, Highlight } from '../shared/components';
import '../shared/SlideShell.css';
import './Business.css';

export const SLIDE_LIST = [
  { id: 1, title: 'שער — AI בארגונים' },
  { id: 2, title: 'הכל זה Prediction', navNum: 'א' },
  { id: 3, title: 'כהנמן צדק' },
  { id: 4, title: 'איך מודל חושב?' },
  { id: 5, title: 'מה זה Token?' },
  { id: 6, title: 'Deep Thought' },
  { id: 7, title: 'Temperature' },
  { id: 8, title: 'הזיות' },
  { id: 9, title: 'מנוע הפשרות' },
  { id: 10, title: '3 סוגי בעיות' },
  { id: 11, title: 'בחירת כלי', navNum: 'ב' },
  { id: 12, title: 'LLM כמהנדס' },
  { id: 13, title: 'Embeddings' },
  { id: 14, title: 'RAG vs Fine-Tuning' },
  { id: 15, title: 'Inference Scaling' },
  { id: 16, title: 'סוכנים' },
  { id: 17, title: 'כלכלת טוקנים' },
  { id: 18, title: 'שכבת בקרה' },
  { id: 19, title: 'למה AI נכשל?', navNum: 'ג' },
  { id: 20, title: 'בעיה אופרציונלית' },
  { id: 21, title: 'מה AI צריך?' },
  { id: 22, title: 'מפתח ה-AI' },
  { id: 23, title: 'מחזור חיי פרויקט' },
  { id: 24, title: 'הערכה ומדידה' },
  { id: 25, title: 'Guardrails' },
  { id: 26, title: 'ROI קוגניטיבי' },
  { id: 27, title: 'הארגון העתידי' },
  { id: 28, title: 'משאבים' },
  { id: 29, title: 'סיכום הקורס' },
];

// ═══════════════════════════════════════════════════════════════
// ACT 1 — AI בעולם העסקי
// ═══════════════════════════════════════════════════════════════

function PredictionSlide({ slideNum }) {
  const rows = [
    ['מכירה', 'ניבוי המסר המדויק שישכנע את הלקוח הספציפי'],
    ['חיתום', 'ניבוי רמת הסיכון של הפוליסה על בסיס נתוני עבר'],
    ['שירות לקוחות', 'ניבוי כוונת הלקוח (Intent) והפתרון שיספק אותו'],
    ['הנהלה', 'ניבוי העתיד העסקי והקצאת משאבים תחת אי-ודאות'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Prediction</div>
      <h2>הכל זה <em>Prediction</em>.</h2>
      <p className="slide-sub">כשמפרקים עבודה ארגונית לפרורים — מגלים שכולם מנועי הסתברות אנושיים.</p>
      <table className="biz-table">
        <thead><tr><th>פעולה ארגונית</th><th>בעצם מה היא?</th></tr></thead>
        <tbody>{rows.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody>
      </table>
      <div className="cognition-flow">
        <div className="cognition-node">Human Cognition</div>
        <div className="cognition-arrow">→</div>
        <div className="cognition-node highlight">AI Infrastructure</div>
        <div className="cognition-arrow">→</div>
        <div className="cognition-node">Organizational Systems</div>
      </div>
      <div className="biz-punchline">Organizations are <em>probability engines</em> made of humans.</div>
    </div>
  );
}

function KahnemanSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — System 1 & 2</div>
      <h2>כהנמן צדק — ועכשיו יש לזה <em>API</em>.</h2>
      <p className="slide-sub">הארכיטקטורה של מודלי ה-AI המודרניים משקפת את שניצילי החשיבה האנושית.</p>
      <div className="biz-split">
        <div className="biz-split-side">
          <div className="biz-split-label">SYSTEM 1 — מהיר ואינטואיטיבי</div>
          <div className="biz-split-title">Fast Reactive AI</div>
          <ul className="biz-split-bullets">
            <li>ביצוע Pattern Matching מהיר</li>
            <li>מודלי שפה סטנדרטיים (GPT-4o)</li>
            <li>זמן תגובה נמוך, עלות נמוכה</li>
          </ul>
        </div>
        <div className="biz-split-side accent-side">
          <div className="biz-split-label">SYSTEM 2 — איטי ומחושב</div>
          <div className="biz-split-title">Slow Reasoning AI</div>
          <ul className="biz-split-bullets">
            <li>תהליכי עומק, Reasoning, תכנון רב-שלבי</li>
            <li>ארכיטקטורות מודרניות (o3, DeepSeek R1)</li>
            <li>זמן מחשבה ארוך, דיוק גבוה</li>
          </ul>
        </div>
      </div>
      <Highlight>Managers are becoming <em>allocators of cognition</em>.</Highlight>
    </div>
  );
}

function HowModelThinksSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Model Thinking</div>
      <h2>איך מודל AI באמת <em>"חושב"</em>?</h2>
      <p className="slide-sub">מודלים שונים לא רק נותנים תשובות שונות — הם משתמשים בכמויות שונות של "חשיבה".</p>
      <div className="model-split">
        <div className="model-col fast">
          <div className="model-col-tag">⚡ מודל מהיר (Fast)</div>
          <div className="model-col-input">"כמה זה 17×24?"</div>
          <div className="model-col-arrow">↓</div>
          <div className="model-col-process">
            <div className="model-col-process-title">תהליך פנימי</div>
            <p style={{fontSize:12,color:'var(--dim)',margin:0}}>תגובה מיידית על בסיס Pattern Matching</p>
          </div>
          <div className="model-col-arrow">↓</div>
          <div className="model-col-output">408</div>
          <div className="model-traits">
            <span className="model-trait">מהיר</span>
            <span className="model-trait">זול</span>
            <span className="model-trait">Latency נמוך</span>
            <span className="model-trait">משימות פשוטות</span>
          </div>
        </div>
        <div className="model-col reason">
          <div className="model-col-tag">🧠 מודל חשיבה (Reasoning)</div>
          <div className="model-col-input">"איך נקטין Fraud בתביעות ביטוח?"</div>
          <div className="model-col-arrow">↓</div>
          <div className="model-col-process">
            <div className="model-col-process-title">תהליך פנימי</div>
            <ul>
              <li>פירוק הבעיה</li>
              <li>זיהוי גורמי סיכון</li>
              <li>השוואת חלופות</li>
              <li>תכנון פתרון</li>
              <li>הערכת tradeoffs</li>
            </ul>
          </div>
          <div className="model-col-arrow">↓</div>
          <div className="model-col-output">תשובה רב-שלבית עם reasoning</div>
          <div className="model-traits">
            <span className="model-trait">איטי יותר</span>
            <span className="model-trait">יקר יותר</span>
            <span className="model-trait">יותר tokens</span>
            <span className="model-trait">בעיות מורכבות</span>
          </div>
        </div>
      </div>
      <Highlight>מודלים כבר לא רק <em>מייצרים תשובות</em>. הם מייצרים <em>שלבי חשיבה ביניים</em> לפני שעונים.</Highlight>
    </div>
  );
}

function TokenSlide({ slideNum }) {
  const tokens = ['Insurance', ' cl', 'aim', ' doc', 'ument'];
  const examples = [
    ['"Hello"', '1 token'],
    ['"Insurance claim"', '2–3 tokens'],
    ['פסקה ארוכה', 'עשרות tokens'],
    ['שרשרת reasoning', 'אלפי tokens'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Tokens</div>
      <h2>מה זה <em>Token</em>?</h2>
      <p className="slide-sub">מודלי שפה לא עובדים על מילים, משפטים או רעיונות. הם עובדים על Tokens.</p>
      <div className="token-demo">
        <div className="token-demo-text">"Insurance claim document"</div>
        <div className="token-boxes">
          {tokens.map((t, i) => <span key={i} className="token-box" style={{animationDelay:`${0.1+i*0.1}s`}}>{t}</span>)}
        </div>
      </div>
      <table className="biz-table">
        <thead><tr><th>טקסט</th><th>Tokens משוערים</th></tr></thead>
        <tbody>{examples.map(([t, n]) => <tr key={t}><td>{t}</td><td>{n}</td></tr>)}</tbody>
      </table>
      <div className="token-cost-tags">
        <span className="token-cost-tag">כל token <em>עולה כסף</em></span>
        <span className="token-cost-tag">כל token <em>צורך compute</em></span>
        <span className="token-cost-tag">כל token <em>מוסיף latency</em></span>
      </div>
      <Highlight>מודלי Reasoning יקרים כי הם מייצרים <em>אלפי טוקני חשיבה פנימיים</em> לפני שעונים.</Highlight>
    </div>
  );
}

function DeepThoughtSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Prompt Engineering</div>
      <h2>Deep Thought <em>והטרגדיה</em> של האנושות.</h2>
      <p className="slide-sub">במדריך הטרמפיסט לגלקסיה — הושקעו מיליוני שנות חישוב. התשובה חזרה. הבעיה: האנושות לא ידעה להגדיר את השאלה.</p>
      <div className="big-number-overlay">
        <div className="big-number">42</div>
        <div className="big-number-caption">התשובה הייתה נכונה. השאלה לא הוגדרה.</div>
      </div>
      <div className="biz-code-label">הבעיה הגדולה ביותר ב-AI: המודל לא יודע מה באמת ניסיתם לפתור.</div>
      <div className="compare-rows">
        <div className="compare-row">
          <div className="compare-bad">❌ "Improve customer service"</div>
          <div className="compare-arrow">→</div>
          <div className="compare-good">✓ "Extract urgency score from complaint emails"</div>
        </div>
        <div className="compare-row">
          <div className="compare-bad">❌ "Make our data useful"</div>
          <div className="compare-arrow">→</div>
          <div className="compare-good">✓ "Predict churn probability for customers inactive 30+ days"</div>
        </div>
      </div>
      <Highlight><em>Prompt Engineering is the process of operationalizing reality.</em> סוג המודל שתבחרו פחות חשוב מהיכולת שלכם לפרק ולהגדיר את הבעיה.</Highlight>
    </div>
  );
}

function TemperatureSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Temperature</div>
      <h2>Temperature = <em>מדיניות סיכון</em> קוגניטיבית.</h2>
      <p className="slide-sub">Temperature אינו מדד ל"יצירתיות". הוא מגדיר את מדיניות הסיכון של הארגון.</p>
      <div className="temp-bar" />
      <div className="temp-labels">
        <span className="temp-lo">0.0 — דטרמיניסטי</span>
        <span className="temp-hi">1.0 — אסוציאטיבי</span>
      </div>
      <div className="temp-zones">
        <div className="temp-zone cool">
          <div className="temp-zone-label">TEMPERATURE 0.0 – 0.2</div>
          <div className="temp-zone-desc">צפוי, מפוקח, דטרמיניסטי. תוצאות עקביות בכל הרצה.</div>
          <div className="temp-zone-use">Finance · Legal · Insurance Claims</div>
        </div>
        <div className="temp-zone hot">
          <div className="temp-zone-label">TEMPERATURE 0.7 – 1.0</div>
          <div className="temp-zone-desc">חוקר, מגוון, אסוציאטיבי. תוצאות שונות בכל הרצה.</div>
          <div className="temp-zone-use">Marketing · Ideation · Product Strategy</div>
        </div>
      </div>
      <div className="biz-code-label">השלמת המילה הבאה:</div>
      <div className="biz-punchline" style={{fontStyle:'normal',fontSize:20,textAlign:'center'}}>״היום יום <span style={{borderBottom:'2px dashed var(--accent)',padding:'0 8px'}}>___</span>״</div>
      <table className="biz-table">
        <thead><tr><th>מילה אפשרית</th><th>Temp = 0.1</th><th>Temp = 1.0</th></tr></thead>
        <tbody>
          <tr><td>רביעי</td><td style={{color:'#3b82f6',fontWeight:700}}>91%</td><td style={{color:'#ef4444'}}>45%</td></tr>
          <tr><td>חמישי</td><td style={{color:'#3b82f6'}}>6%</td><td style={{color:'#ef4444'}}>20%</td></tr>
          <tr><td>שישי</td><td style={{color:'#3b82f6'}}>2%</td><td style={{color:'#ef4444'}}>15%</td></tr>
          <tr><td>חג</td><td style={{color:'#3b82f6'}}>0.7%</td><td style={{color:'#ef4444'}}>10%</td></tr>
          <tr><td>הולדת</td><td style={{color:'#3b82f6'}}>0.2%</td><td style={{color:'#ef4444'}}>6%</td></tr>
          <tr><td>השנה</td><td style={{color:'#3b82f6'}}>0.1%</td><td style={{color:'#ef4444'}}>4%</td></tr>
        </tbody>
      </table>
      <Highlight>Every AI system is a <em>risk policy</em> disguised as a product decision.</Highlight>
    </div>
  );
}

function HallucinationSlide({ slideNum }) {
  const factors = [
    ['מידע אנושי סותר', 'גבוהה מאוד'],
    ['חוסר קונטקסט', 'גבוהה'],
    ['היעדר Grounding / RAG', 'גבוהה'],
    ['Prompt עמום', 'גבוהה'],
    ['Temperature / Decoding', 'מגביר או מקטין'],
    ['Reasoning Depth', 'יכול להקטין'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Hallucinations</div>
      <h2>למה הזיות הן <em>בלתי נמנעות</em> במערכות Generative.</h2>
      <p className="slide-sub">המודל לא לומד <em>אמת</em>. הוא לומד <em>התפלגות של גרסאות אפשריות למציאות</em>.</p>
      <div className="flow-v">
        <div className="flow-v-step"><div className="flow-v-title">מציאות</div></div>
        <div className="flow-v-arrow">↓</div>
        <div className="flow-v-step"><div className="flow-v-title">מידע אנושי</div><div className="flow-v-sub">סותר · חלקי · מוטה · לא עקבי</div></div>
        <div className="flow-v-arrow">↓</div>
        <div className="flow-v-step accent"><div className="flow-v-title">Distribution סטטיסטי</div><div className="flow-v-sub">המודל לומד דפוסים הסתברותיים — לא עובדות</div></div>
        <div className="flow-v-arrow">↓</div>
        <div className="flow-v-step"><div className="flow-v-title">מדיניות יצירה (Sampling)</div><div className="flow-v-sub">Temperature · Decoding · Top-k / Top-p</div></div>
        <div className="flow-v-arrow">↓</div>
        <div className="flow-v-step"><div className="flow-v-title">פלט גנרטיבי</div></div>
      </div>
      <div className="biz-code-label">מה מגביר הזיות?</div>
      <table className="biz-table">
        <thead><tr><th>גורם</th><th>השפעה על הזיות</th></tr></thead>
        <tbody>{factors.map(([f, i]) => <tr key={f}><td>{f}</td><td>{i}</td></tr>)}</tbody>
      </table>
      <div className="biz-split">
        <div className="biz-split-side" style={{borderColor:'rgba(248,113,113,.3)'}}>
          <div className="biz-split-label" style={{color:'#ef4444'}}>ללא GROUNDING</div>
          <div className="biz-split-desc">למודל אין "עוגן מציאות" לבדוק מולו את עצמו. הסתברות ההזיה עולה. Confidence לא מעיד על אמת.</div>
        </div>
        <div className="biz-split-side accent-side">
          <div className="biz-split-label" style={{color:'#22c55e'}}>עם RAG / אימות חיצוני</div>
          <div className="biz-split-desc">הפלט מוגבל על ידי מסמכי מקור אמיתיים. ההסתברות להזיה יורדת. המערכת פחות "ממציאה".</div>
        </div>
      </div>
      <div className="biz-equation" dir="ltr">
        <span className="eq-strike">Enterprise AI = Model</span><br />
        Enterprise AI <span className="eq-op">=</span> Model <span className="eq-op">+</span> Grounding <span className="eq-op">+</span> Guardrails
      </div>
      <Highlight>הזיות נוצרות כשמערכת הסתברותית פועלת ללא <em>עוגן מציאות</em> מספק. יצירתיות והזיה יוצאות מאותו מנוע סטטיסטי.</Highlight>
    </div>
  );
}

function TradeoffMatrixSlide({ slideNum }) {
  const L = (c, t) => <td className={c}>{t}</td>;
  const dims = ['Reliability','Creativity','Cost Sens.','Capability','Latency','Reasoning','Determinism','Flexibility','Explain.'];
  const rows = [
    ['חיזוי ביקושים ותפעול',  'high','low','high','med','high','low','high','low','high'],
    ['פרסונליזציה והמלצות',   'med','high','med','high','med','med','low','high','med'],
    ['זיהוי חריגות והונאה',    'crit','zero','high','med','crit','med','crit','low','crit'],
    ['תובנות ממידע לא מובנה',  'high','med','med','crit','med','high','med','high','med'],
    ['אוטומציית מומחיות',      'crit','low','low','crit','low','crit','med','high','high'],
  ];
  const lvlMap = { crit:'קריטית', high:'גבוהה', med:'בינונית', low:'נמוכה', zero:'אפסית' };
  const optRows = [
    ['חיזוי ביקושים','צמצום בזבוז וחוסרים'],
    ['פרסונליזציה','הגדלת Conversion ו-Retention'],
    ['זיהוי הונאה','הקטנת סיכון וטעויות'],
    ['תובנות מטקסט','הפיכת כאוס לקבלת החלטות'],
    ['אוטומציית מומחיות','שימור ידע והקטנת תלות באנשים'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Tradeoffs</div>
      <h2>מנוע <em>הפשרות</em>.</h2>
      <p className="slide-sub">כל מערכת AI היא אופטימיזציה עסקית. הפרויקטים שבחרתם — כל אחד דורש פרופיל פשרות שונה.</p>
      <table className="biz-matrix">
        <thead><tr><th>Use Case</th>{dims.map(d => <th key={d}>{d}</th>)}</tr></thead>
        <tbody>{rows.map(([name, ...levels]) => (
          <tr key={name}><td>{name}</td>{levels.map((l, i) => <td key={i} className={`lvl-${l}`}>{lvlMap[l]}</td>)}</tr>
        ))}</tbody>
      </table>
      <div className="biz-code-label">מה הארגון באמת עושה אופטימיזציה עבורו?</div>
      <table className="biz-table">
        <thead><tr><th>Use Case</th><th>האופטימיזציה העסקית</th></tr></thead>
        <tbody>{optRows.map(([u, o]) => <tr key={u}><td>{u}</td><td>{o}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function ThreeProblemTypesSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — 3 סוגי בעיות</div>
      <h2>למרות עשרות ארגונים שונים — רוב מערכות ה-AI פותרות רק <em>3 סוגי בעיות</em>.</h2>
      <div className="three-cats">
        <div className="three-cat">
          <div className="three-cat-icon">📈</div>
          <div className="three-cat-title">Prediction</div>
          <div className="three-cat-q">מה יקרה?</div>
          <div className="three-cat-desc">חיזוי ביקוש, תחזית מכירות, סיכון חיתומי, תחזוקה מונעת.</div>
        </div>
        <div className="three-cat">
          <div className="three-cat-icon">🧭</div>
          <div className="three-cat-title">Recommendation</div>
          <div className="three-cat-q">מה כדאי לעשות?</div>
          <div className="three-cat-desc">פרסונליזציה, הקצאת משאבים, ניתוב שיחות, תעדוף משימות.</div>
        </div>
        <div className="three-cat">
          <div className="three-cat-icon">🚨</div>
          <div className="three-cat-title">Detection</div>
          <div className="three-cat-q">מה חריג / מסוכן / חשוב?</div>
          <div className="three-cat-desc">הונאות, חריגות, סנטימנט שלילי, סיכון רגולטורי.</div>
        </div>
      </div>
      <Highlight><em>AI Architecture is the process of translating business optimization into compute decisions.</em></Highlight>
    </div>
  );
}

function TitleSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="hero-center">
        <div className="hero-title">הטמעת <em>AI</em> בארגונים</div>
        <div className="hero-subtitle">AI Implementation in Organizations</div>
        <div className="hero-lecture-num">חלק שלישי</div>
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
// ACT 2 — ארכיטקטורה
// ═══════════════════════════════════════════════════════════════

function ToolSelectionSlide({ slideNum }) {
  const rows = [
    ['זיהוי הונאות', 'XGBoost / Random Forest', 'מודלים קלאסיים'],
    ['חיזוי ביקוש', 'Statistical Regression', 'רגרסיה מתקדמת'],
    ['חילוץ טקסט מטפסים', 'Vision Models (OCR)', 'מודלי ראייה'],
    ['שליפה מחוזים', 'RAG Architecture', 'שליפה מועשרת'],
    ['טיפול רב-שלבי בלקוחות', 'Agentic Systems', 'סוכנים אוטונומיים'],
    ['הערכת נזק מתמונה', 'Deep Learning / CNN', 'רשתות עמוקות'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Tool Selection</div>
      <h2>מתי משתמשים <em>במה</em>?</h2>
      <p className="slide-sub">הטעות היקרה ביותר: להשתמש ב-LLM יקר עבור משימה שיכולה להיפתר במודל קלאסי.</p>
      <table className="biz-table">
        <thead><tr><th>בעיה עסקית</th><th>פתרון טכנולוגי</th><th>קטגוריה</th></tr></thead>
        <tbody>{rows.map(([p, s, c]) => <tr key={p}><td>{p}</td><td className="tech-col">{s}</td><td>{c}</td></tr>)}</tbody>
      </table>
      <Highlight color="#ea580c">The most expensive mistake in AI is using an <em>LLM when you do not need one</em>.</Highlight>
    </div>
  );
}

function FeatureEngSlide({ slideNum }) {
  const steps = ['Customer Email', 'LLM Extraction Layer', 'Structured JSON', 'XGBoost', 'Risk / Action'];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Feature Engineering</div>
      <h2>LLM כ<em>מהנדס פיצ׳רים</em>.</h2>
      <p className="slide-sub">המידע בעל הערך הגבוה ביותר בארגון נעול בטקסט חופשי. ה-LLM מתרגם אותו לדאטה.</p>
      <div className="flow-v">
        {steps.map((s, i) => (
          <div key={s}>
            <div className={`flow-v-step ${i === 2 ? 'accent' : ''}`}><div className="flow-v-title">{s}</div></div>
            {i < steps.length - 1 && <div className="flow-v-arrow">↓</div>}
          </div>
        ))}
      </div>
      <div className="biz-code">
        {'{\n  "frustration_score": 9,\n  "refund_requested": true,\n  "legal_threat_detected": false\n}'}
      </div>
      <Highlight>This is where <em>text becomes data</em>.</Highlight>
    </div>
  );
}

function EmbeddingsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Embeddings</div>
      <h2><em>Embeddings</em> — המשמעות הגיאומטרית של הידע.</h2>
      <p className="slide-sub">המודל לא מחפש מילים זהות — הוא מחפש משמעות וקשר סמנטי.</p>
      <div className="card-grid cols2">
        <ConceptCard en="Embedding" he="וקטור סמנטי" def="פונקציה מתמטית ההופכת טקסט חופשי לרצף מספרים שמייצג מיקום במרחב רב-ממדי." accent />
        <ConceptCard en="Semantic Search" he="חיפוש סמנטי" def={'המערכת תקשר "angry customer" ל-"client upset due to delay" כי הם קרובים גיאומטרית במרחב.'} />
      </div>
      <Highlight>Embedding הופך שפה ל<em>גיאומטריה</em>. קרבה במרחב = דמיון במשמעות.</Highlight>
    </div>
  );
}

function RagVsFtSlide({ slideNum }) {
  const rows = [
    ['עלות', 'גבוהה מאוד (GPU + מומחים)', 'נמוכה (אינפרנס + שליפה)'],
    ['עדכון נתונים', 'אטי (אימון מחדש)', 'מיידי (עדכון DB)'],
    ['דיוק עובדתי', 'בינוני (עלול לערבב)', 'גבוה (נשען על מקור)'],
    ['סכנת הזיות', 'גבוהה', 'נמוכה משמעותית'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — RAG vs Fine-Tuning</div>
      <h2><em>RAG</em> מול Fine-Tuning.</h2>
      <p className="slide-sub">כיצד מחברים את המודל הגלובלי לידע הפנימי של החברה?</p>
      <table className="biz-table">
        <thead><tr><th>פרמטר</th><th>Fine-Tuning</th><th>RAG</th></tr></thead>
        <tbody>{rows.map(([p, ft, r]) => <tr key={p}><td>{p}</td><td>{ft}</td><td>{r}</td></tr>)}</tbody>
      </table>
      <Highlight><em>RAG turned LLMs from storytellers into enterprise systems.</em></Highlight>
    </div>
  );
}

function InferenceScalingSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Inference Scaling</div>
      <h2>מהפכת <em>זמן המחשבה</em>.</h2>
      <p className="slide-sub">שיפור דרמטי בדיוק מתרחש בזמן הריצה, ע״י מתן זמן מחשבה ממושך למודל.</p>
      <div className="inference-visual">
        <div className="inference-bar-row">
          <span className="inference-label">GPT-4o (Standard)</span>
          <div className="inference-track"><div className="inference-fill" style={{width:'30%'}} /></div>
        </div>
        <div className="inference-bar-row">
          <span className="inference-label">o3 (Reasoning)</span>
          <div className="inference-track"><div className="inference-fill deep" style={{width:'85%'}} /></div>
        </div>
      </div>
      <div className="card-grid cols3">
        <ConceptCard en="Reasoning Tokens" he="טוקני חשיבה" def="טוקנים פנימיים שבהם המודל מריץ שלבי ביניים." />
        <ConceptCard en="Scratchpads" he="מרחב עבודה" def="מרחב פנימי מוסתר לפירוק הבעיה לתתי-משימות." />
        <ConceptCard en="Self-Reflection" he="תיקון עצמי" def="בקרה פנימית הבוחנת את התוצאה לפני חשיפת הפלט." accent />
      </div>
      <Highlight><em>Intelligence is becoming a runtime allocation problem.</em></Highlight>
    </div>
  );
}

function AgenticSlide({ slideNum }) {
  const steps = [
    ['Plan', 'הסוכן מקבל את היעד ומפרק אותו לתתי-משימות עם תלויות.'],
    ['Tool Use', 'קריאה למערכות, שליפת נתונים, הרצת חישובים.'],
    ['Verify', 'בחינת הפלט מול דרישות הסף המקוריות.'],
    ['Retry / Execute', 'אם שגיאה — תיקון. אם תקין — פלט סופי.'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Agentic Workflows</div>
      <h2>מפרומפטים ל<em>סוכנים</em>.</h2>
      <p className="slide-sub">עברנו מפרומפטים בודדים למערכות סוכנים אוטונומיים הפועלים בשרשרת לוגית.</p>
      <div className="agent-pipeline">
        {steps.map(([t, d], i) => (
          <div key={t} className="agent-step">
            <div className="agent-step-num">{i + 1}</div>
            <div className="agent-step-content">
              <div className="agent-step-title">{t}</div>
              <div className="agent-step-desc">{d}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="biz-punchline">We are no longer prompting models. We are <em>orchestrating workers</em>.</div>
    </div>
  );
}

function TokenEconomicsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Token Economics</div>
      <h2>כלכלת <em>הטוקנים</em>.</h2>
      <p className="slide-sub">כל Inference הוא טרנזקציה פיננסית ישירה בדו״ח ה-P&L של הארגון.</p>
      <div className="cost-grid">
        <div className="cost-item"><div className="cost-item-label">INPUT TOKENS</div><div className="cost-item-desc">עלות קריאת הטקסט והקונטקסט. זול משמעותית.</div></div>
        <div className="cost-item"><div className="cost-item-label">OUTPUT TOKENS</div><div className="cost-item-desc">עלות כתיבת התשובה טוקן-אחר-טוקן. יקר מאוד.</div></div>
        <div className="cost-item"><div className="cost-item-label">CACHING</div><div className="cost-item-desc">שמירת קונטקסט סטטי בזיכרון מהיר. חיתוך עד 90%.</div></div>
        <div className="cost-item"><div className="cost-item-label">LATENCY VS COST</div><div className="cost-item-desc">הפשרה המתמדת בין מהירות המודל לעלות שלו.</div></div>
      </div>
      <div className="biz-equation" dir="ltr">1M Users × 20 Requests × Avg Tokens <span className="eq-op">=</span> Monthly Compute Burn</div>
      <Highlight><em>AI architecture is financial architecture.</em></Highlight>
    </div>
  );
}

function ControlLayerSlide({ slideNum }) {
  const shieldPills = ['הרשאות', 'ניטור', 'Audit', 'מדיניות', 'בקרת עלויות', 'ניתוב'];
  const coreItems = ['CRM', 'ERP', 'Database', 'Claims', 'Billing', 'HR'];
  const rows = [
    ['ניהול הרשאות', 'למנוע גישה למידע רגיש', 'עובד שירות לא יכול לראות משכורות'],
    ['ניטור (Observability)', 'להבין מה המודל עשה', 'מי שאל מה? איזה מידע נשלף?'],
    ['Audit Logs', 'רגולציה ותיעוד', 'ביטוח / בנק / בריאות'],
    ['Rate Limiting', 'למנוע עומסים ועלויות', 'Agent ששלח 100K requests בטעות'],
    ['Policy Enforcement', 'לחסום פעולות מסוכנות', 'מניעת דליפת PII ל-GPT'],
    ['Routing', 'לבחור מודל מתאים', 'GPT לשפה, מודל קטן לסיווג'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — שכבת בקרה</div>
      <h2>שכבת <em>הבקרה</em> הארגונית.</h2>
      <p className="slide-sub">למה ארגונים לא מחברים AI ישירות לליבת החברה?</p>
      <div className="control-arch">
        <div className="control-zone external">
          <div className="control-zone-title">🤖 מודלי AI חיצוניים</div>
          <div className="control-zone-sub">GPT · Claude · Gemini · מודלים פתוחים</div>
        </div>
        <div className="control-arrow">↓</div>
        <div className="control-zone shield">
          <div className="control-zone-title" style={{color:'var(--accent)'}}>🛡️ שכבת בקרה ארגונית</div>
          <div className="shield-pills">
            {shieldPills.map(p => <span key={p} className="shield-pill">{p}</span>)}
          </div>
        </div>
        <div className="control-arrow">↓</div>
        <div className="control-zone internal">
          <div className="control-zone-title">🏢 מערכות הליבה של הארגון</div>
          <div className="core-items">
            {coreItems.map(c => <span key={c} className="core-item">{c}</span>)}
          </div>
        </div>
      </div>
      <div className="biz-code-label">מה שכבת הבקרה עושה בפועל?</div>
      <table className="biz-table">
        <thead><tr><th>רכיב</th><th>למה זה קיים?</th><th>דוגמה אמיתית</th></tr></thead>
        <tbody>{rows.map(([r, w, e]) => <tr key={r}><td>{r}</td><td>{w}</td><td>{e}</td></tr>)}</tbody>
      </table>
      <div className="warning-box">
        <div className="warning-box-title">⚠️ בלי שכבת בקרה:</div>
        <ul className="warning-box-list">
          <li>דליפות מידע</li><li>הזיות ללא בקרה</li><li>פעולות מסוכנות</li><li>עלויות לא נשלטות</li><li>בעיות רגולציה</li>
        </ul>
      </div>
      <Highlight>הבעיה הקשה בארגון אינה לגרום למודל לענות. הבעיה הקשה היא <em>לשלוט במה מותר לו לדעת, לעשות ולזכור</em>.</Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ACT 3 — יישום והוצאה לפועל
// ═══════════════════════════════════════════════════════════════

function WhyAIFailsSlide({ slideNum }) {
  const fails = ['בעיה עמומה', 'מטרה לא מדידה', 'חוסר הגדרה עסקית', 'ROI לא ברור'];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — למה AI נכשל?</div>
      <h2>למה רוב פרויקטי ה-AI <em>נכשלים</em>?</h2>
      <div className="dramatic-stat">
        <div className="dramatic-stat-num">85%</div>
        <div className="dramatic-stat-label">מפרויקטי ה-AI הארגוניים נכשלים.</div>
        <div className="dramatic-stat-sub">לא בגלל שהמודל "לא מספיק חכם". אלא בגלל:</div>
      </div>
      <div className="fail-reasons">
        {fails.map((f, i) => <span key={f} className="fail-tag" style={{animationDelay:`${0.3+i*0.15}s`}}>{f}</span>)}
      </div>
      <div className="wrong-example">
        <div className="wrong-example-tag">❌ הטעות הכי נפוצה</div>
        <div className="wrong-example-text">"אנחנו רוצים להשתמש ב-AI כדי לשפר את השירות"</div>
        <div className="wrong-example-verdict">זו לא בעיית AI. זו כוונה עסקית כללית.</div>
      </div>
    </div>
  );
}

function OperationalProblemSlide({ slideNum }) {
  const ioRows = [
    ['מייל תלונה', 'ציון דחיפות 1–5', 'ניתוב להסלמה'],
    ['ביקורת מלון', 'קטגוריית תקלה', 'פתיחת קריאת שירות'],
    ['תביעת ביטוח', 'Fraud Score', 'שליחה לבדיקה'],
    ['נתוני מכירות', 'תחזית ביקוש', 'הזמנת מלאי'],
  ];
  const compares = [
    ['"לשפר שירות לקוחות"', '"לחלץ רמת דחיפות ממיילים"'],
    ['"לייעל מלאי"', '"לחזות ביקוש 14 יום קדימה"'],
    ['"לזהות הונאות"', '"לחשב Fraud Probability"'],
    ['"לנתח ביקורות"', '"לסווג תלונות ל-5 קטגוריות"'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — בעיה אופרציונלית</div>
      <h2>מה זו בעיית AI <em>אמיתית</em>?</h2>
      <p className="slide-sub">בעיה אופרציונלית = Input ברור → Output מדיד → Action עסקי.</p>
      <table className="io-table">
        <thead><tr><th>Input</th><th>Output</th><th>Action</th></tr></thead>
        <tbody>{ioRows.map(([i, o, a]) => (
          <tr key={i}><td className="io-input">{i}</td><td className="io-output">{o}</td><td className="io-action">{a}</td></tr>
        ))}</tbody>
      </table>
      <div className="biz-code-label">המעבר הקריטי</div>
      <div className="compare-rows">
        {compares.map(([bad, good], i) => (
          <div key={i} className="compare-row">
            <div className="compare-bad">❌ {bad}</div>
            <div className="compare-arrow">→</div>
            <div className="compare-good">✓ {good}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatAINeedsSlide({ slideNum }) {
  const reqs = [
    ['Input ברור', 'Complaint Email'],
    ['Output מדיד', 'Urgency Score 1–5'],
    ['Metric', 'Accuracy / F1-Score'],
    ['Action עסקי', 'Escalation Queue'],
    ['ROI ברור', 'קיצור זמן תגובה ב-60%'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — מה AI צריך?</div>
      <h2>כל פרויקט AI חייב <em>להגדיר</em>:</h2>
      <table className="biz-table">
        <thead><tr><th>רכיב</th><th>דוגמה</th></tr></thead>
        <tbody>{reqs.map(([r, e]) => <tr key={r}><td>{r}</td><td>{e}</td></tr>)}</tbody>
      </table>
      <div className="biz-punchline">AI לא פותר עמימות. <em>AI פותר בעיות שמוגדרות היטב.</em></div>
      <Highlight>אם אי אפשר <em>למדוד את הפלט</em> — עדיין אין לכם פרויקט AI.</Highlight>
    </div>
  );
}

function AIDeveloperSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — AI Developer</div>
      <h2>ה-LLM כ<em>שכבת פיתוח</em>.</h2>
      <p className="slide-sub">ה-LLM אינו רק מנוע הרצה. הוא שכבת פיתוח מלאה המאפשרת למנהלים להקים פרויקטים מורכבים.</p>
      <div className="card-grid cols2">
        <ConceptCard en="Data Cleaning" he="ניקוי דאטה" def="כתיבת קוד אוטומטי לניקוי וסינון מאגרי מידע." />
        <ConceptCard en="Feature Engineering" he="חילוץ פיצ׳רים" def="זיהוי ויצירת משתנים חדשים מתוך הדאטה הגולמי." />
        <ConceptCard en="Model Training" he="אימון מודלים" def="כתיבה והרצה של סקריפטים לאימון מודלים (XGBoost)." accent />
        <ConceptCard en="Evaluation" he="הערכת ביצועים" def="הפקת מדדי איכות, גרפים ומטריצות להערכה." />
      </div>
      <div className="biz-punchline">The LLM <em>compresses the engineering layer</em>.</div>
    </div>
  );
}

function LifecycleSlide({ slideNum }) {
  const phases = [
    ['Discovery & Problem Definition', 'איתור הכאב העסקי, אופרציונליזציה, ווידוא דאטה רלוונטי.'],
    ['Data Prep & Engineering', 'איסוף, ניקוי, סינון והפיכת מידע לפיצ׳רים או וקטורים.'],
    ['PoC Development', 'בניית אב-טיפוס מהיר וזול לבדיקת היתכנות ראשונית.'],
    ['Rigorous Evaluation', 'הרצת מבחנים מתמטיים ואיכותיים על דאטה-סט קבוע.'],
    ['Production & Monitoring', 'פריסה מאובטחת תחת שכבת בקרה ומעקב צמוד.'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Lifecycle</div>
      <h2>מחזור חיי <em>פרויקט AI</em>.</h2>
      <p className="slide-sub">פרויקט AI אינו פרויקט תוכנה. הוא מחקר אמפירי מבוסס הסתברויות.</p>
      <div className="lifecycle-flow">
        {phases.map(([t, d], i) => (
          <div key={t} className="lifecycle-step">
            <div className="lifecycle-dot" />
            <div className="lifecycle-content">
              <div className="lifecycle-title">{i + 1}. {t}</div>
              <div className="lifecycle-desc">{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvaluationSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Evaluation</div>
      <h2>מה שלא נמדד <em>לא קיים</em>.</h2>
      <p className="slide-sub">לא פורסים מערכת AI לפני שיש מערכת מדדים מתמטית קבועה.</p>
      <div className="eval-section-title">מדדי ML קלאסיים</div>
      <div className="card-grid cols3">
        <ConceptCard en="Precision" he="דיוק" def="מתוך החיוביים שחזה — כמה באמת חיוביים?" />
        <ConceptCard en="Recall" he="רגישות" def="מתוך החיוביים האמיתיים — כמה תפס?" />
        <ConceptCard en="F1-Score" he="ממוצע הרמוני" def="האיזון בין Precision ו-Recall." accent />
      </div>
      <div className="eval-section-title">מדדי LLM / Generative</div>
      <div className="card-grid cols3">
        <ConceptCard en="Faithfulness" he="נאמנות למקור" def="האם התשובה מבוססת רק על הדאטה שהוזרק?" />
        <ConceptCard en="Relevance" he="רלוונטיות" def="רמת הדיוק מול כוונת השאלה המקורית." />
        <ConceptCard en="LLM-as-a-Judge" he="שופט אוטומטי" def="מודל חיצוני מריץ ציוני איכות על הפלט." accent />
      </div>
      <Highlight><em>What cannot be evaluated cannot be deployed.</em></Highlight>
    </div>
  );
}

function GuardrailsSlide({ slideNum }) {
  const layers = [
    ['INPUT FILTERING', 'סינון קלט', 'חסימת Prompt Injection, Jailbreaks, ושאלות מחוץ לתחום העסק.'],
    ['POLICY ENFORCEMENT', 'אכיפת מדיניות', 'זיהוי ומחיקת PII (ת.ז., כרטיסי אשראי), אכיפת חוקי ארגון.'],
    ['OUTPUT VERIFICATION', 'אימות פלט', 'סריקת תגובה לפני חשיפה — טון, סודות מסחריים, מידע שגוי.'],
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Guardrails</div>
      <h2>חומות <em>הגנה</em> ארגוניות.</h2>
      <p className="slide-sub">Enterprise AI דורש גידור נוקשה וארכיטקטורת אבטחה היברידית בזמן אמת.</p>
      <div className="guard-stack">
        {layers.map(([num, t, d]) => (
          <div key={num} className="guard-layer">
            <div className="guard-layer-num">{num}</div>
            <div className="guard-layer-title">{t}</div>
            <div className="guard-layer-desc">{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ROISlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — ROI</div>
      <h2>ROI <em>קוגניטיבי</em>.</h2>
      <p className="slide-sub">פרויקט AI הוא החלטה פיננסית של הקצאת הון. נוסחת ה-ROI חייבת להציג רווח ברור.</p>
      <div className="roi-formula">
        <div className="roi-formula-text" dir="ltr">Current Labor Cost <span className="eq-op">−</span> (AI Infra <span className="eq-op">+</span> Inference <span className="eq-op">+</span> Human Review) <span className="eq-op">=</span> AI ROI</div>
      </div>
      <div className="roi-params">
        <div className="roi-param"><div className="roi-param-title">עלות עבודה שנחסכה</div><div className="roi-param-desc">שעות ניבוי וחילוץ סטנדרטיות שהאוטומציה מחליפה.</div></div>
        <div className="roi-param"><div className="roi-param-title">CapEx vs OpEx</div><div className="roi-param-desc">תשתית חד-פעמית מול עלות טוקנים שוטפת.</div></div>
        <div className="roi-param"><div className="roi-param-title">Human Review</div><div className="roi-param-desc">עלות שעות בקרה של עובדים על פלטי המערכת.</div></div>
      </div>
      <Highlight color="#ea580c">רוב פרויקטי ה-AI נכשלים בגלל <em>economics</em> — לא בגלל model quality.</Highlight>
    </div>
  );
}

function FutureOrgSlide({ slideNum }) {
  const nodes = ['CEO', 'Human Managers', 'Agentic Workers', 'AI Models Layer', 'Compute Infrastructure'];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Future</div>
      <h2>הארגון <em>העתידי</em>.</h2>
      <p className="slide-sub">מבנה הניהול משתנה — מניהול אנשים בלבד לניהול מערכות הפעלה קוגניטיביות.</p>
      <div className="org-chart">
        {nodes.map((n, i) => (
          <div key={n}>
            <div className={`org-node ${i === 0 ? 'ceo' : ''} ${i >= 2 ? 'ai' : ''}`}>{n}</div>
            {i < nodes.length - 1 && <div className="org-connector" />}
          </div>
        ))}
      </div>
      <div className="closing-big-quote">"The companies that win will not have the best models. They will have the best <em>orchestration of cognition</em>."</div>
    </div>
  );
}

function ResourcesSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — משאבים</div>
      <h2><em>משאבים</em> וכלי עבודה.</h2>
      <div className="resource-sections">
        <div className="resource-section">
          <div className="resource-section-title">סביבות פיתוח</div>
          <ul className="resource-list">
            <li>OpenRouter — מחירון מודלים</li>
            <li>Cursor IDE — פיתוח מבוסס AI</li>
            <li>OpenAI & Anthropic Docs</li>
          </ul>
        </div>
        <div className="resource-section">
          <div className="resource-section-title">דאטה וניטור</div>
          <ul className="resource-list">
            <li>LangSmith — ניטור והערכה</li>
            <li>Pinecone & Weaviate — Vector DB</li>
            <li>NotebookLM — PoC מהיר</li>
          </ul>
        </div>
        <div className="resource-section">
          <div className="resource-section-title">אורקסטרציה</div>
          <ul className="resource-list">
            <li>n8n & LangGraph — Workflows</li>
            <li>CrewAI — צוותי סוכנים</li>
            <li>Manus & Replit Agent</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
function CourseSummarySlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — סיכום</div>
      <h2>מה <em>למדנו</em> בקורס הזה?</h2>
      <p className="slide-sub">שלושה חלקים, מסע אחד — מהבנת הבסיס ועד הטמעה ארגונית.</p>
      <div className="card-grid cols3">
        <ConceptCard en="Part 1 — Foundations" he="יסודות" def="נתונים, מודלים, למידת מכונה, רשתות עמוקות." />
        <ConceptCard en="Part 2 — LLMs & GenAI" he="שפה ויצירה" def="טוקנים, embeddings, transformers, prompting, RAG." />
        <ConceptCard en="Part 3 — Business" he="הטמעה בארגונים" def="ארכיטקטורה, כלכלה, הערכה, guardrails, ROI." accent />
      </div>
      <Highlight>הכלים ישתנו. הטכנולוגיה תתקדם. היכולת <em>לארכטקט מערכות AI</em> בצורה אחראית — זה מה שיישאר.</Highlight>
    </div>
  );
}

export const SLIDE_COMPONENTS = [
  TitleSlide,
  // ACT 1
  PredictionSlide,
  KahnemanSlide,
  HowModelThinksSlide,
  TokenSlide,
  DeepThoughtSlide,
  TemperatureSlide,
  HallucinationSlide,
  TradeoffMatrixSlide,
  ThreeProblemTypesSlide,
  // ACT 2
  ToolSelectionSlide,
  FeatureEngSlide,
  EmbeddingsSlide,
  RagVsFtSlide,
  InferenceScalingSlide,
  AgenticSlide,
  TokenEconomicsSlide,
  ControlLayerSlide,
  // ACT 3
  WhyAIFailsSlide,
  OperationalProblemSlide,
  WhatAINeedsSlide,
  AIDeveloperSlide,
  LifecycleSlide,
  EvaluationSlide,
  GuardrailsSlide,
  ROISlide,
  FutureOrgSlide,
  ResourcesSlide,
  CourseSummarySlide,
];

export default function BusinessSlides() {
  return (
    <SlideShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="הטמעת AI בארגונים"
      deckClass="deck-business"
      deck="business"
      surveyPath="/business"
    />
  );
}
