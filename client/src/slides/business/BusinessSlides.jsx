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
  { id: 19, title: 'מטרת השיעור', navNum: 'ג' },
  { id: 20, title: 'למה AI מסוכן לארגונים?' },
  { id: 21, title: 'Emerging Tech: סיכונים א-ד' },
  { id: 22, title: 'Emerging Tech: סיכונים ה-ז' },
  { id: 23, title: 'עקרון Fail Fast' },
  { id: 24, title: 'AI POC: שלב 1-2' },
  { id: 25, title: 'AI POC: שלב 3-4' },
  { id: 26, title: 'AI POC: שלב 5' },
  { id: 27, title: 'ולידציה: 3 רמות' },
  { id: 28, title: 'מדדי איכות: מודל קלאסי' },
  { id: 29, title: 'מדדי איכות: LLM' },
  { id: 30, title: 'ההבדל: קלאסי מול LLM' },
  { id: 31, title: 'תרגיל POC כיתתי' },
  { id: 32, title: 'דוגמה מלאה: סיכום שיחות' },
  { id: 33, title: 'שכבת ה-Guardrails' },
  { id: 34, title: 'ROI קוגניטיבי' },
  { id: 35, title: 'סיכום סיכונים' },
  { id: 36, title: 'הארגון העתידי' },
  { id: 37, title: 'משאבים' },
  { id: 38, title: 'סיכום הקורס' },
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

function AILessonIntroSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — מבוא לשיעור</div>
      <h2>הטמעת AI בארגון — <em>סיכונים, ניסויים ו־Fail Fast</em></h2>
      <p className="slide-sub">מטרת השיעור: להבין ש־AI בארגון הוא לא רק ״איזה מודל לבחור״, אלא מערכת החלטות תחת אי־ודאות.</p>
      
      <div className="editorial-quote">
        הסיכון הכי גדול ב־AI הוא לא שהמודל יטעה. הסיכון הכי גדול הוא שהארגון ישקיע שנה בפרויקט שאף אחד לא באמת צריך, עם טכנולוגיה שכבר התיישנה עד שהפרויקט עלה לאוויר.
      </div>
      
      <div className="card-grid cols3" style={{marginTop:16}}>
        <ConceptCard en="Risk Management" he="זיהוי סיכוני Emerging Tech" def="איך מזהים ומדרגים את 7 קטגוריות הסיכון של טכנולוגיות AI מתפרצות." accent />
        <ConceptCard en="Fail Fast" he="ניסויים קטנים ומהירים" def="איך בונים POC מהיר וזול וקובעים קריטריונים להמשך או להריגה." />
        <ConceptCard en="Evaluation & Metrics" he="ולידציה ומדידה" def="איך מודדים הצלחה ואיך ההערכה משתנה בין מודל קלאסי לבין LLM." accent />
      </div>

      <div className="biz-prompt-box good" style={{marginTop:16, borderRightWidth: 4, direction: 'rtl'}}>
        <div className="biz-prompt-tag" style={{color: 'var(--accent)'}}>🎤 פתיחה אפשרית לשיעור (נוסח דיבור)</div>
        <div className="biz-prompt-text" style={{color: 'var(--white)', fontSize: 13}}>
          ״בשיעור הקודם דיברנו על עלויות. היום אנחנו מדברים על משהו יותר מסוכן מעלות: אי־ודאות. כשארגון מטמיע AI, הוא לא רק קונה תוכנה. הוא מקבל החלטה בתוך שוק שמשתנה כל שבוע. המודל משתנה, המחיר משתנה, הרגולציה משתנה, היכולות משתנות... לכן השאלה היא לא ׳איך בוחרים את הכלי הנכון?׳ אלא ׳איך בונים ארגון שיודע ללמוד מהר מספיק כדי לא לבחור לא נכון לאורך זמן?׳״
        </div>
      </div>
    </div>
  );
}

function WhyAIFailsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — פער קצב השוק</div>
      <h2>למה AI <em>מסוכן</em> לארגונים?</h2>
      <p className="slide-sub">טכנולוגיות מתפרצות (Emerging Technologies) יוצרות פער מובנה וקריטי בין קצב השוק לקצב הארגון.</p>

      <div className="pace-container">
        <div className="pace-row org">
          <div className="pace-title-lbl">קצב הארגון המסורתי (חודשים עד שנים)</div>
          <div className="pace-flow">
            <span className="pace-node">אפיון 📝</span> <span className="pace-arrow">➔</span>
            <span className="pace-node">תקציב 💰</span> <span className="pace-arrow">➔</span>
            <span className="pace-node">ועדה 👥</span> <span className="pace-arrow">➔</span>
            <span className="pace-node">ספק 🤝</span> <span className="pace-arrow">➔</span>
            <span className="pace-node">אינטגרציה ⚙️</span> <span className="pace-arrow">➔</span>
            <span className="pace-node">פיילוט 🧪</span> <span className="pace-arrow">➔</span>
            <span className="pace-node">השקה 🚀</span>
          </div>
        </div>

        <div className="pace-row market">
          <div className="pace-title-lbl">קצב התפתחות ה-AI בשוק (ימים עד שבועות)</div>
          <div className="pace-flow">
            <span className="pace-node">מודל חדש 🧠</span> <span className="pace-arrow">➔</span>
            <span className="pace-node">כלי חדש 🛠️</span> <span className="pace-arrow">➔</span>
            <span className="pace-node">ירידת מחיר 📉</span> <span className="pace-arrow">➔</span>
            <span className="pace-node">רגולציה חדשה 📜</span> <span className="pace-arrow">➔</span>
            <span className="pace-node">Best Practice חדש 🏆</span>
          </div>
        </div>
      </div>

      <div className="biz-code-label">ההבדל בין עולם יציב לעולם מתפרץ</div>
      <table className="pace-table">
        <thead>
          <tr>
            <th>פרמטר</th>
            <th>עולם מסורתי</th>
            <th>עולם Emerging Tech</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>יציבות הסביבה</td>
            <td>יציבות יחסית וחיזוי לטווח ארוך</td>
            <td>שינוי תמידי ומהיר בקצב שבועי</td>
          </tr>
          <tr>
            <td>אופי הדרישות</td>
            <td>דרישות ברורות ומאופיינות מראש</td>
            <td>דרישות מתגלות ונלמדות תוך כדי תנועה</td>
          </tr>
          <tr>
            <td>בחירת ספקים</td>
            <td>בחירה בספק ״הנכון״ לטווח ארוך</td>
            <td>בחירה בהשערה/רעיון ספציפי לבדיקה מהירה</td>
          </tr>
          <tr>
            <td>משך פרויקט</td>
            <td>פרויקט רב־שנתי מובנה ומסודר</td>
            <td>ניסויים וסבבי פיתוח קצרים וממוקדים</td>
          </tr>
          <tr>
            <td>הגדרת הצלחה</td>
            <td>הצלחה = עמידה בתוכנית המקורית</td>
            <td>הצלחה = למידה מהירה וצמצום אי-ודאות</td>
          </tr>
        </tbody>
      </table>

      <div className="biz-prompt-compare" style={{marginTop:10}}>
        <div className="biz-prompt-box bad" style={{padding:'8px 12px', direction: 'rtl', margin: 0}}>
          <div className="biz-prompt-tag" style={{fontSize:9}}>📜 תקן NIST AI RMF</div>
          <div className="biz-prompt-text" style={{fontSize:11}}>
            תקן NIST מתייחס לניהול סיכוני AI כתהליך מתמשך ומחזורי של <strong>זיהוי, מדידה, ניהול וממשול</strong>, ומדגיש סיכונים ייחודיים של Generative AI כמו אמינות, פרטיות, אבטחה והטיות.
          </div>
        </div>
        <div className="biz-prompt-box good" style={{padding:'8px 12px', direction: 'rtl', margin: 0}}>
          <div className="biz-prompt-tag" style={{fontSize:9, color:'#22c55e'}}>📊 מעקב OECD.AI</div>
          <div className="biz-prompt-text" style={{fontSize:11}}>
            ה-OECD מפעיל מעקב שוטף אחר אירועי AI ותקלות בעולם האמיתי (Incidents Monitor) כדי ללמוד דפוסי סיכון אמיתיים של פרטיות, אפליה, קיטוב, אבטחה ובטיחות.
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskCategoriesSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — קטגוריות סיכון (1-4)</div>
      <h2>Emerging Technologies: <em>קטגוריות הסיכון (א-ד)</em></h2>
      <p className="slide-sub">כדי לנהל סיכון, צריך קודם כל למפות אותו. להלן 4 קטגוריות הסיכון הראשונות:</p>

      <div className="risks-container">
        <div className="risk-card-premium accent-risk">
          <div className="risk-card-header">
            <span className="risk-card-num">1</span>
            <span className="risk-card-title">סיכון טכנולוגי (Technology Risk)</span>
          </div>
          <div className="risk-card-body">
            <strong>האם זה באמת עובד מחוץ לדמו?</strong>
            <ul style={{paddingRight:16, margin:'4px 0 0', listStyleType:'disc', fontSize:12}}>
              <li>המודל נראה מדהים בדמו קטן אך נכשל על דאטה אמיתי ומורכב.</li>
              <li>בעיית הזיות (Hallucinations) וקושי בשחזור תשובות עקביות.</li>
              <li>תמיכה פחות טובה בעברית/ערבית ובשפות מעורבות מול אנגלית.</li>
              <li>זמני תגובה (Latency) גבוהים מדי או עלויות Inference יקרות מדי.</li>
            </ul>
          </div>
        </div>

        <div className="risk-card-premium">
          <div className="risk-card-header">
            <span className="risk-card-num">2</span>
            <span className="risk-card-title">סיכון התאמה עסקית (Business Fit Risk)</span>
          </div>
          <div className="risk-card-body">
            <strong>האם אנחנו פותרים בעיה אמיתית וכואבת מספיק?</strong>
            <p style={{margin:'4px 0 0', fontSize:12}}>פרויקטים רבים נכשלים לא בגלל מודל גרוע, אלא כי פיתחו פתרון מתוחכם לבעיה קלה.</p>
            <div className="warning-box" style={{margin:'6px 0 0', padding: 8, fontSize:11}}>
              <strong>❓ שאלה למחשבה:</strong> מה יותר מסוכן בארגון — מודל עם 85% דיוק לבעיה קריטית, או מודל עם 99% דיוק לבעיה שאף אחד לא צריך?<br />
              <strong style={{color:'var(--accent)'}}>תשובה ניהולית:</strong> השני מסוכן יותר, כי הוא מבזבז קשב ניהולי ומשאבים ארגוניים יקרים.
            </div>
          </div>
        </div>

        <div className="risk-card-premium">
          <div className="risk-card-header">
            <span className="risk-card-num">3</span>
            <span className="risk-card-title">סיכון דאטה (Data Risk)</span>
          </div>
          <div className="risk-card-body">
            <strong>AI לא מתחיל במודל — הוא מתחיל ונגמר בדאטה!</strong>
            <ul style={{paddingRight:16, margin:'4px 0 0', listStyleType:'disc', fontSize:12}}>
              <li>דאטה חסר, מלוכלך, מוטה או לא מייצג את המציאות העתידית.</li>
              <li>מידע מפוזר בין עשרות מערכות ליבה ללא אינטגרציה.</li>
              <li>דליפת מידע אישי רגיש (PII) ופגיעה בפרטיות המשתמשים.</li>
            </ul>
          </div>
        </div>

        <div className="risk-card-premium accent-risk">
          <div className="risk-card-header">
            <span className="risk-card-num">4</span>
            <span className="risk-card-title">סיכון רגולטורי ומשפטי (Regulatory Risk)</span>
          </div>
          <div className="risk-card-body">
            <strong>אי אפשר להתעלם מהחוק והרגולציה ב־AI.</strong>
            <p style={{margin:'4px 0 0', fontSize:12}}>חוק ה־AI האירופי (EU AI Act) שנכנס לתוקף באוגוסט 2024 מגדיר גישה מבוססת סיכון לשימושים ב-AI.</p>
            <div className="biz-punchline" style={{margin:'6px 0 0', padding: '6px 10px', fontSize:11, fontStyle:'normal'}}>
              <strong>💡 כלל אצבע:</strong> ככל שהחלטת ה־AI משפיעה יותר על זכויות אדם, כסף, בריאות, אשראי, תעסוקה או נגישות לשירותים — כך רמת הסיכון והפיקוח הרגולטורי עולים בהתאם.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskCategoriesPart2Slide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — קטגוריות סיכון (5-7)</div>
      <h2>Emerging Technologies: <em>קטגוריות הסיכון (ה-ז)</em></h2>
      <p className="slide-sub">שלושת הסיכונים הנוספים שחייבים לנטר, בשילוב עם תובנות שוק עדכניות:</p>

      <div className="risks-container">
        <div className="risk-card-premium accent-risk">
          <div className="risk-card-header">
            <span className="risk-card-num">5</span>
            <span className="risk-card-title">סיכון אבטחתי (Security Risk)</span>
          </div>
          <div className="risk-card-body">
            <strong>מודלי LLM מייצרים משטחי תקיפה חדשים:</strong>
            <ul style={{paddingRight:16, margin:'4px 0 0', listStyleType:'disc', fontSize:12}}>
              <li>Prompt Injection: הזרקת מניפולציות זדוניות שקוקפות את המודל.</li>
              <li>Data Leakage: דליפת סודות מסחריים ומידע פנימי למודלים ציבוריים.</li>
              <li>Jailbreaks: עקיפת מנגנוני הבטיחות המובנים במודל.</li>
              <li>הסתמכות עיוורת על סוכנים (Agents) הפועלים ללא אימות אנושי.</li>
            </ul>
          </div>
        </div>

        <div className="risk-card-premium">
          <div className="risk-card-header">
            <span className="risk-card-num">6</span>
            <span className="risk-card-title">סיכון ארגוני (Organizational Risk)</span>
          </div>
          <div className="risk-card-body">
            <strong>גם המודל הטוב ביותר ייכשל אם הארגון יתנגד לו.</strong>
            <ul style={{paddingRight:16, margin:'4px 0 0', listStyleType:'disc', fontSize:12}}>
              <li>התנגדות עובדים מחשש לאובדן משרות או חוסר נוחות.</li>
              <li>אין ״בעלים״ עסקי (Owner) לפרויקט, והוא נשאר יתום ב־IT.</li>
              <li>מחלקה משפטית (Legal) או אבטחת מידע חוסמת את הפרויקט מאוחר מדי.</li>
              <li>אין תהליך הטמעה, הדרכה, ומדידה שוטפת של הערך לאחר ההשקה.</li>
            </ul>
          </div>
        </div>

        <div className="risk-card-premium accent-risk" style={{gridColumn:'span 2'}}>
          <div className="risk-card-header">
            <span className="risk-card-num">7</span>
            <span className="risk-card-title">סיכון כלכלי (Economic Risk)</span>
          </div>
          <div className="risk-card-body" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:16}}>
            <div>
              <strong>זול בדמו — יקר להחריד בפרודקשן!</strong>
              <p style={{margin:'4px 0 0', fontSize:12}}>עלויות ה־Inference של מודלי ענק, תשתיות ענן, אינטגרציה, אבטחה, וניטור שוטף עלולות להפוך use case מצוין להפסד כספי כבד.</p>
              <div style={{fontSize:11, color:'var(--dim)', marginTop:6}}>* יש לקחת בחשבון עלויות Human Review קבועות ועלויות מעבר ספק (Vendor Lock-in).</div>
            </div>
            <div className="biz-prompt-box good" style={{margin:0, direction:'rtl', borderColor:'rgba(217,119,6,0.3)', padding: 10}}>
              <div className="biz-prompt-tag" style={{color:'var(--orange)', fontSize:9}}>📈 תובנות McKinsey State of AI 2025</div>
              <div className="biz-prompt-text" style={{fontSize:11, color:'var(--white)', lineHeight: 1.4}}>
                מחקרי שוק עדכניים מראים כי ארגונים רבים כבר מטמיעים כלי AI וסוכנים (Agentic AI) באופן רחב, אך **המעבר מפיילוטים מוצלחים לערך עסקי רחב (Scaling)** נשאר האתגר המרכזי והמורכב ביותר של המנהלים כיום.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FailFastPrincipleSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — עקרון Fail Fast</div>
      <h2>עקרון <em>Fail Fast</em> בארגון גדול</h2>
      <p className="slide-sub">Fail Fast אינו אומר להיכשל ברשלנות. הוא אומר לבנות מנגנון שמגלה מהר מה לא עובד — לפני ששורפים תקציבי ענק וזמן ניהולי יקר.</p>

      <div className="failfast-grid">
        <div className="failfast-card startup">
          <div className="failfast-header">איך סטארטאפ חושב</div>
          <div className="failfast-q">״מה ההשערה הכי מסוכנת שלנו, ואיך נבדוק אותה הכי מהר ובזול?״</div>
          <p className="failfast-body" style={{marginTop:8}}>
            סטארטאפים לא מחפשים לבנות מערכת מושלמת מהיום הראשון. הם ממוקדים בפירוק הבעיה ואיסוף ראיות אמפיריות מהירות מהשטח כדי לצמצם את אי-הוודאות.
          </p>
        </div>

        <div className="failfast-card corp">
          <div className="failfast-header">איך ארגון גדול בדרך כלל חושב</div>
          <div className="failfast-q">״איך נוודא שהפרויקט מאושר, מתוקצב, מאובטח, ממופה ומנוהל בכל הוועדות?״</div>
          <p className="failfast-body" style={{marginTop:8}}>
            זה קריטי לשמירה על יציבות, אך אם עושים זאת מוקדם מדי (לפני הוכחת היתכנות ראשונית) — הורגים לחלוטין את היכולת ללמוד ולגלות מה המשתמשים באמת צריכים.
          </p>
        </div>
      </div>

      <div className="biz-punchline" style={{textAlign:'center', fontSize: 18, padding: '16px 20px', margin: '16px 0'}}>
        ההגדרה הניהולית המדויקת של Fail Fast בארגון:<br />
        <strong style={{color:'var(--accent)', fontSize:22, fontFamily:'monospace', display:'block', margin: '4px 0'}}>Fail Fast = לקצר את הזמן בין רעיון לבין ראיה אמפירית.</strong>
        <div style={{fontSize:13, color:'var(--dim)', fontStyle:'normal'}}>
          לא בין רעיון למצגת הנהלה. לא בין רעיון לדיון תקציבי. <strong>בין רעיון לראיה אמיתית בשטח!</strong>
        </div>
      </div>
    </div>
  );
}

function AIPocFrameworkSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — מתודולוגיית POC: שלב 1 ו־2</div>
      <h2>מתודולוגיית AI POC: <em>שלבים 1 ו־2</em></h2>
      <p className="slide-sub">איך מיישמים את עקרונות הניסוי המהיר בפועל? מתחילים בניסוח מדויק וזיהוי ההשערה המסוכנת ביותר.</p>

      <div className="biz-split" style={{margin: '14px 0'}}>
        <div className="biz-split-side accent-side" style={{padding: 16}}>
          <div className="biz-split-label" style={{marginBottom: 8}}>שלב 1 — ניסוח ה־Use Case באמצעות תבנית</div>
          <div className="biz-code" style={{fontSize:11, whiteSpace:'pre-wrap', direction:'rtl', textAlign:'right', margin: '8px 0', padding: 12}}>
            אנחנו רוצים לעזור ל־<strong>[משתמש]</strong><br />
            לבצע את <strong>[משימה]</strong><br />
            כדי לשפר את <strong>[מדד עסקי]</strong><br />
            באמצעות <strong>[יכולת AI]</strong><br />
            תחת מגבלות של <strong>[סיכון / רגולציה / דאטה / עלות]</strong>
          </div>
          <div style={{fontSize:12, marginTop:6}}>
            <strong>📌 דוגמה קונקרטית:</strong> אנחנו רוצים לעזור ל<u>נציג שירות</u> לסכם <u>שיחות לקוח</u> כדי <u>לקצר זמן טיפול ב-30%</u> באמצעות <u>LLM שמייצר סיכום מובנה</u> תחת מגבלה ש<u>כל סיכום חייב לעבור אישור אנושי</u>.
          </div>
        </div>

        <div className="biz-split-side" style={{padding: 16}}>
          <div className="biz-split-label" style={{marginBottom: 8}}>שלב 2 — זיהוי ההשערה המסוכנת ביותר (Riskiest Assumption)</div>
          <p style={{fontSize:12, margin:'0 0 6px'}}>בכל פרויקט יש כמה סוגי השערות, אך ה-POC חייב לבדוק קודם את ההשערה הכי מסוכנת להצלחה:</p>
          <table className="io-table" style={{fontSize:10, margin:0}}>
            <thead>
              <tr>
                <th>סוג השערה</th>
                <th>השאלה שצריך לבדוק</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{color:'var(--accent)'}}>עסקית (Business)</td>
                <td>האם למישהו אכפת מזה? האם יש לזה ערך אמיתי?</td>
              </tr>
              <tr>
                <td>טכנולוגית (Tech)</td>
                <td>האם המודל מסוגל לבצע את המשימה הזו בדיוק מספק?</td>
              </tr>
              <tr>
                <td>דאטה (Data)</td>
                <td>האם יש לנו דאטה תקין, נגיש ומייצג כדי להזין את המודל?</td>
              </tr>
              <tr>
                <td>תפעולית (Ops)</td>
                <td>האם זה ישתלב בצורה נוחה בתהליך העבודה של העובדים?</td>
              </tr>
              <tr>
                <td>כלכלית / רגולטורית</td>
                <td>האם העלויות כלכליות? האם מותר לנו חוקית לעשות זאת?</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Highlight>POC מוצלח מתחיל במיקוד ובהגדרת <em>גבולות ברורים</em> לבעיה.</Highlight>
    </div>
  );
}

function AIPocFrameworkPart2Slide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — מתודולוגיית POC: שלב 3 ו־4</div>
      <h2>מתודולוגיית AI POC: <em>שלבים 3 ו־4</em></h2>
      <p className="slide-sub">בניית POC מהיר ואיסוף מדדים אמיתיים של שילוב אדם במערכת (Human-in-the-loop).</p>

      <div className="biz-code-label" style={{marginBottom: 4}}>שלב 3 — בניית POC סופר-מהיר (לדוגמה באמצעות n8n workflow)</div>
      
      <div className="n8n-container">
        <div className="n8n-node">
          <div className="n8n-node-icon">📝</div>
          <div className="n8n-node-title">Input Form</div>
          <div className="n8n-node-sub">טופס קלט פנייה</div>
        </div>
        <div className="n8n-arrow">➔</div>
        <div className="n8n-node accent">
          <div className="n8n-node-icon">⚙️</div>
          <div className="n8n-node-title">n8n Workflow</div>
          <div className="n8n-node-sub">ניתוב ואורקסטרציה</div>
        </div>
        <div className="n8n-arrow">➔</div>
        <div className="n8n-node accent">
          <div className="n8n-node-icon">🤖</div>
          <div className="n8n-node-title">LLM API Call</div>
          <div className="n8n-node-sub">סיכום וסיווג פלט</div>
        </div>
        <div className="n8n-arrow">➔</div>
        <div className="n8n-node">
          <div className="n8n-node-icon">📊</div>
          <div className="n8n-node-title">Google Sheets</div>
          <div className="n8n-node-sub">שליחת פלט לגיליון</div>
        </div>
        <div className="n8n-arrow">➔</div>
        <div className="n8n-node">
          <div className="n8n-node-icon">👥</div>
          <div className="n8n-node-title">Slack / User</div>
          <div className="n8n-node-sub">בדיקת צוות בזמן אמת</div>
        </div>
      </div>

      <div className="biz-punchline" style={{margin:'0 0 12px', padding:'8px 14px', fontSize:13, fontStyle:'normal'}}>
        💡 <strong>הפואנטה של המרצה:</strong> לא צריך פרויקט אינטגרציה של שלושה חודשים כדי לבדוק אם הרעיון שווה משהו. באמצעות כלי No-Code/Low-Code ומודלים קיימים, לפעמים צריך רק שלוש שעות!
      </div>

      <div className="biz-code-label" style={{marginBottom: 4}}>שלב 4 — מדדי Human-in-the-loop (האם האדם משתפר?)</div>
      <p style={{fontSize:12, margin:'0 0 4px'}}>ב־POC רציני אנחנו לא שואלים רק ״האם המודל צדק עובדתית?״, אלא איך הוא משפיע על העובד המשתמש בו:</p>
      <div className="metrics-card-grid" style={{margin: '8px 0'}}>
        <div className="usecase-detail-block" style={{padding: 10}}>
          <div className="metric-card-lbl">יעילות וזמן</div>
          <div className="usecase-detail-title" style={{fontSize: 13}}>זמן טיפול (Handling Time)</div>
          <div className="usecase-detail-desc" style={{fontSize: 11}}>האם זמן העבודה הכולל של הנציג התקצר ובכמה אחוזים?</div>
        </div>
        <div className="usecase-detail-block" style={{padding: 10}}>
          <div className="metric-card-lbl">איכות תפעולית</div>
          <div className="usecase-detail-title" style={{fontSize: 13}}>שיעור תיקונים (Correction Rate)</div>
          <div className="usecase-detail-desc" style={{fontSize: 11}}>כמה פעמים המשתמש נדרש לתקן ידנית את פלט ה-AI או ערך אותו כבד?</div>
        </div>
        <div className="usecase-detail-block" style={{padding: 10}}>
          <div className="metric-card-lbl">אמון ואימוץ</div>
          <div className="usecase-detail-title" style={{fontSize: 13}}>שיעור התעלמות (Ignore Rate)</div>
          <div className="usecase-detail-desc" style={{fontSize: 11}}>כמה פעמים המשתמש פשוט התעלם מהמלצת ה-AI כי לא סמך עליה?</div>
        </div>
      </div>
    </div>
  );
}

function AIPocFrameworkPart3Slide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — מתודולוגיית POC: שלב 5</div>
      <h2>מתודולוגיית AI POC: <em>שלב 5 — קבלת החלטה</em></h2>
      <p className="slide-sub">בסוף תקופת ה-POC חייבים להגיע להחלטה אסטרטגית וברורה על בסיס נתונים אמפיריים.</p>

      <table className="pace-table" style={{margin: '12px 0'}}>
        <thead>
          <tr>
            <th style={{width:'15%'}}>החלטה</th>
            <th style={{width:'30%'}}>מה זה אומר בפועל?</th>
            <th>דוגמה תפעולית</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{background:'rgba(239,68,68,0.04)'}}>
            <td style={{color:'#ef4444', fontWeight:'bold'}}>Kill ❌</td>
            <td style={{color: 'var(--white)'}}>עוצרים את הפרויקט מיד.</td>
            <td>הבעיה לא מספיק כואבת, ה-ROI לא כלכלי, או המודל סובל מהזיות מסוכנות בתחום קריטי.</td>
          </tr>
          <tr style={{background:'rgba(217,119,6,0.04)'}}>
            <td style={{color:'var(--accent)', fontWeight:'bold'}}>Pivot 🔄</td>
            <td style={{color: 'var(--white)'}}>משנים כיוון ומבצעים סבב POC נוסף.</td>
            <td>מחליפים את ה-Use Case, משנים מודל, מוסיפים RAG ל-Grounding, או משנים את זרימת העבודה.</td>
          </tr>
          <tr style={{background:'rgba(22,163,74,0.04)'}}>
            <td style={{color:'#16a34a', fontWeight:'bold'}}>Scale 🚀</td>
            <td style={{color: 'var(--white)'}}>עוברים לפיילוט רחב ופרודקשן.</td>
            <td>הוכחנו ערך מצוין! בונים שכבת בקרה (Control Layer), אבטחת מידע, אינטגרציית IT וניטור.</td>
          </tr>
        </tbody>
      </table>

      <div className="biz-punchline" style={{borderColor:'#ef4444', textAlign:'center', marginTop:24, padding: '14px 20px'}}>
        ⚠️ <strong>המסר החשוב ביותר לניהול:</strong><br />
        <span style={{fontSize:20, color:'#ef4444', fontWeight:'bold'}}>״POC בלי קריטריוני הריגה (Kill Criteria) מוגדרים מראש הוא לא ניסוי — הוא תחביב.״</span>
        <p style={{fontSize:13, color:'var(--dim)', fontStyle:'normal', margin:'6px 0 0'}}>
          אתם חייבים להגדיר מראש מה ייחשב לכישלון שיגרום לכם לעצור, כדי לא ליפול למלכודת ״ההוצאה השקועה״ (Sunk Cost Fallacy).
        </p>
      </div>
    </div>
  );
}

function ValidationLevelsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — 3 רמות ולידציה</div>
      <h2>ולידציה: <em>איך בודקים אם מוצר AI עובד?</em></h2>
      <p className="slide-sub">לארגונים יש נטייה לבדוק רק אם המודל ״חכם״. ולידציה מלאה דורשת שלוש רמות של בקרה:</p>

      <div className="metrics-card-grid" style={{marginTop:16}}>
        <div className="failfast-card startup" style={{borderTopColor:'var(--accent)', padding: 16}}>
          <div className="failfast-header" style={{color:'var(--accent)', marginBottom: 8}}>1. ולידציה טכנולוגית (Tech)</div>
          <div className="failfast-q" style={{fontSize:14}}>האם המודל מסוגל לבצע את המשימה הטכנית?</div>
          <ul style={{paddingRight:14, margin:'8px 0 0', fontSize:12, color:'var(--dim)', listStyleType:'disc'}}>
            <li>מדידת דיוק, Recall, Precision ו-F1.</li>
            <li>מדידת אחוז הזיות (Hallucination Rate).</li>
            <li>בדיקת עמידות במקרי קצה (Robustness).</li>
            <li>זמן תגובה (Latency) ועקביות פלט.</li>
          </ul>
        </div>

        <div className="failfast-card startup" style={{borderTopColor:'var(--orange)', padding: 16}}>
          <div className="failfast-header" style={{color:'var(--orange)', marginBottom: 8}}>2. ולידציה עסקית (Business)</div>
          <div className="failfast-q" style={{fontSize:14}}>האם הפרויקט מייצר ערך כלכלי ועסקי מדיד?</div>
          <ul style={{paddingRight:14, margin:'8px 0 0', fontSize:12, color:'var(--dim)', listStyleType:'disc'}}>
            <li>חיסכון ישיר בשעות עבודה ועלויות תפעול.</li>
            <li>עלייה באחוזי המרה (Conversion) או במכירות.</li>
            <li>שיפור מדדי שביעות רצון לקוחות (NPS/CSAT).</li>
            <li>שיפור בבקרה ומניעת קנסות רגולטוריים.</li>
          </ul>
        </div>

        <div className="failfast-card startup" style={{borderTopColor:'var(--dim)', padding: 16}}>
          <div className="failfast-header" style={{color:'var(--dim)', marginBottom: 8}}>3. ולידציה ארגונית (Org)</div>
          <div className="failfast-q" style={{fontSize:14}}>האם הארגון מסוגל להטמיע ולתחזק את זה?</div>
          <ul style={{paddingRight:14, margin:'8px 0 0', fontSize:12, color:'var(--dim)', listStyleType:'disc'}}>
            <li>שיעור אימוץ עובדים בפועל (Adoption Rate).</li>
            <li>מידת האמון של המנהלים בתשובות המודל.</li>
            <li>אישור סופי של מחלקות Legal וסייבר.</li>
            <li>יכולת תחזוקה, ניטור (Monitoring) והסבר שגיאות.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function EvaluationClassicalSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — ולידציה של מודל קלאסי</div>
      <h2>מדדי איכות: <em>מודל קלאסי</em></h2>
      <p className="slide-sub">מודל קלאסי (כמו XGBoost לחיזוי סיכון או רגרסיה) מחזיר חיזוי מוגדר וקל יחסית למדידה סטטיסטית מדויקת.</p>

      <div className="biz-split" style={{margin: '12px 0'}}>
        <div className="biz-split-side accent-side" style={{padding: 16}}>
          <div className="biz-split-label" style={{marginBottom: 8}}>מדדי איכות מובילים</div>
          <table className="io-table" style={{fontSize:11, margin:0}}>
            <thead>
              <tr>
                <th>מדד</th>
                <th>למה הוא משמש?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{color:'var(--accent)'}}>Accuracy (דיוק כולל)</td>
                <td>כמה תחזיות היו נכונות מתוך סך התחזיות שבוצעו.</td>
              </tr>
              <tr>
                <td>Precision (דיוק חיובי)</td>
                <td>מתוך המקרים שסומנו כחיוביים (למשל הונאה), כמה באמת היו חיוביים?</td>
              </tr>
              <tr>
                <td>Recall (רגישות)</td>
                <td>מתוך כל החיוביים האמיתיים שהיו בדאטה, כמה הצלחנו לתפוס?</td>
              </tr>
              <tr>
                <td>F1-Score</td>
                <td>ממוצע הרמוני המאזן בצורה אופטימלית בין Precision ל-Recall.</td>
              </tr>
              <tr>
                <td>ROC-AUC / RMSE</td>
                <td>יכולת ההפרדה של המודל בין מחלקות או גודל טעות החיזוי במספרים.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="biz-split-side" style={{padding: 16}}>
          <div className="biz-split-label" style={{marginBottom: 6}}>דוגמה קריטית: זיהוי הונאה בביטוח</div>
          <p style={{fontSize:12, margin:'0 0 6px'}}><strong>סכנת ה-Accuracy:</strong> אם רק 2% מהתביעות הן הונאה, מודל שינבא תמיד ״אין הונאה״ יקבל 98% accuracy — אך הוא חסר ערך לחלוטין!</p>
          <div className="biz-code-label" style={{marginBottom: 4}}>הבנת סוגי הטעויות (Confusion Matrix)</div>
          <table className="io-table" style={{fontSize:11, margin:0}}>
            <thead>
              <tr>
                <th>סוג טעות</th>
                <th>משמעות עסקית</th>
                <th>מה זה גורר?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{color:'#ef4444'}}>False Positive (חשד שווא)</td>
                <td>חשדנו בלקוח ישר ללא הצדקה.</td>
                <td>פגיעה בחוויית השירות ובאמון הלקוח.</td>
              </tr>
              <tr>
                <td style={{color:'var(--orange)'}}>False Negative (פספוס)</td>
                <td>אישרנו תביעת הונאה ללא זיהוי.</td>
                <td>הפסד כספי ישיר ויקר לחברה.</td>
              </tr>
            </tbody>
          </table>
          <div style={{fontSize:11, color:'var(--dim)', marginTop:6, direction:'rtl'}}>
            👉 <strong>החלטה ניהולית:</strong> לקבוע מה יותר יקר לנו (False Positive או False Negative) היא החלטה עסקית, משפטית ומוסרית — לא טכנולוגית!
          </div>
        </div>
      </div>
    </div>
  );
}

function EvaluationLlmSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — ולידציה של מודל LLM</div>
      <h2>מדדי איכות: <em>מודל LLM</em></h2>
      <p className="slide-sub">LLM לא מחזיר רק מספר או ״כן/לא״ אלא פלט טקסטואלי, המלצה או פעולה. לכן קשה בהרבה למדוד אותו ונדרשת רובריקה (Rubric).</p>

      <table className="pace-table" style={{fontSize:12, margin: '14px 0'}}>
        <thead>
          <tr>
            <th style={{width:'25%'}}>מדד איכות (Rubric)</th>
            <th style={{width:'35%'}}>השאלה שהמדד בוחן</th>
            <th>איך מודדים את זה בפועל?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{color:'var(--accent)', fontWeight:'bold'}}>Factuality (נכונות)</td>
            <td>האם התשובה שיוצרה נכונה עובדתית ומבוססת מציאות?</td>
            <td rowSpan="3" style={{verticalAlign:'middle', background:'rgba(217,119,6,0.01)', padding: 12}}>
              <strong>שיטות מדידה מודרניות:</strong><br />
              <ul style={{paddingRight:14, margin:'4px 0 0', listStyleType:'disc', fontSize:11, color:'var(--dim)'}}>
                <li><strong>Human Evaluation:</strong> בדיקה ידנית של מדגם אקראי על ידי מומחה תוכן (יקר אך אמין).</li>
                <li><strong>LLM-as-a-Judge:</strong> מודל LLM חזק וחיצוני (כמו GPT-4o) שסורק את התשובות ונותן להן ציון 1-5 על בסיס קריטריונים נוקשים.</li>
                <li><strong>Eval Sets:</strong> יצירת מאגר קבוע של 100+ תרחישים קשים ובחינת השינויים בין גרסאות מודל (LangSmith).</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td style={{color:'var(--accent)', fontWeight:'bold'}}>Faithfulness (נאמנות)</td>
            <td>האם התשובה נאמנה למסמכי המקור שהוזרקו לו (ללא המצאות RAG)?</td>
          </tr>
          <tr>
            <td style={{color:'var(--accent)', fontWeight:'bold'}}>Completeness (שלמות)</td>
            <td>האם הסיכום/הפלט כולל את כל המידע הקריטי וההתחייבויות?</td>
          </tr>
          <tr>
            <td style={{fontWeight:'bold', color: 'var(--white)'}}>Relevance & Safety</td>
            <td>האם הפלט ענה בדיוק על השאלה ונמנע מתוכן מסוכן/PII?</td>
            <td>חוסמי קלט/פלט (Guardrails) ומסננים אוטומטיים.</td>
          </tr>
          <tr>
            <td style={{fontWeight:'bold', color: 'var(--white)'}}>Cost & Latency</td>
            <td>האם עלות הטוקנים וזמן המענה כלכליים ותחרותיים?</td>
            <td>חישוב עלות ממוצעת לשיחה ומעקב זמנים.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function EvaluationComparisonSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — מודל קלאסי מול LLM</div>
      <h2>ההבדל המרכזי: <em>קלאסי מול LLM</em></h2>
      <p className="slide-sub">השוואה מסכמת שמבהירה מדוע הטמעת מודלים גנרטיביים דורשת שינוי תפיסה ניהולי מוחלט:</p>

      <table className="pace-table" style={{margin: '16px 0'}}>
        <thead>
          <tr>
            <th>פרמטר</th>
            <th>מודל קלאסי (ML)</th>
            <th>מודל LLM / Generative AI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>הגדרת הבעיה</td>
            <td>בעיה סגורה ומוגדרת היטב סטטיסטית</td>
            <td>בעיה פתוחה, יצירתית או מבוססת שיחה</td>
          </tr>
          <tr>
            <td>אופי הפלט</td>
            <td>פלט מובנה (מספר, הסתברות, קטגוריה)</td>
            <td>פלט טקסטואלי חופשי, קוד, סיכום או רצף פעולות</td>
          </tr>
          <tr>
            <td>אופן המדידה</td>
            <td>מדידה סטטיסטית ישירה וברורה (F1, Accuracy)</td>
            <td>מדידה איכותית מורכבת (Evaluation Rubrics, Judge)</td>
          </tr>
          <tr>
            <td>גמישות היישום</td>
            <td>פחות גמיש, פותר משימה אחת ספציפית</td>
            <td>גמיש מאוד, יכול לפתור מגוון משימות במקביל</td>
          </tr>
          <tr>
            <td>הסבר עסקית</td>
            <td>קל יחסית לתיעוד והסבר דרך פיצ׳רים</td>
            <td>קשה מאוד לשליטה מלאה והסבר של כל פלט בודד</td>
          </tr>
        </tbody>
      </table>

      <div className="biz-punchline" style={{textAlign:'center', fontSize: 18, marginTop: 20, padding: '14px 20px'}}>
        💡 <strong>משפט מפתח לסיכום המעבר:</strong><br />
        <span style={{fontSize:20, color:'var(--accent)'}}>״במודל קלאסי אנחנו מודדים אם התחזית נכונה.<br />ב־LLM אנחנו מודדים אם ההתנהגות שלו מספיק טובה, בטוחה ושימושית בתוך ההקשר העסקי.״</span>
      </div>
    </div>
  );
}

function ClassExerciseSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — תרגיל כיתה</div>
      <h2>תרגיל: <em>בנו POC ל־AI בארגון</em></h2>
      <p className="slide-sub">התחלקו לקבוצות. כל קבוצה בוחרת מחלקה בארגון (שירות לקוחות, HR, שיווק, משפטי, ביטוח/בנקאות, תפעול, מכירות) וממלאת את הטבלה הבאה:</p>

      <table className="pace-table" style={{fontSize:11, margin: '12px 0'}}>
        <thead>
          <tr>
            <th style={{width:'30%'}}>השאלה לתכנון הניסוי</th>
            <th>התשובה של הקבוצה שלכם</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. מה הבעיה העסקית ומי המשתמש?</strong></td>
            <td style={{color:'var(--dim)', fontStyle:'italic'}}>למשל: נציגי HR מבזבזים שעות על סיווג קורות חיים למשרות פתוחות.</td>
          </tr>
          <tr>
            <td><strong>2. מה ה־AI עושה בפועל (Input → Output)?</strong></td>
            <td style={{color:'var(--dim)', fontStyle:'italic'}}>קובץ PDF של קו״ח ← חילוץ 5 כישורים מובילים ודירוג התאמה 1-10 למשרה.</td>
          </tr>
          <tr>
            <td><strong>3. מהו הסיכון המרכזי וההשערה הכי מסוכנת?</strong></td>
            <td style={{color:'var(--dim)', fontStyle:'italic'}}>ההשערה: המודל יפלה מועמדים או יפספס מועמדים מעולים בגלל ניסוח פחות סטנדרטי.</td>
          </tr>
          <tr>
            <td><strong>4. איך נבנה POC פשוט ומהיר תוך יום?</strong></td>
            <td style={{color:'var(--dim)', fontStyle:'italic'}}>העלאת 20 קו״ח ידנית לטופס, שליחה ל-LLM, השוואה לדירוג ידני של מנהל הגיוס.</td>
          </tr>
          <tr>
            <td><strong>5. מהם מדדי ההצלחה והכישלון הברורים לניסוי?</strong></td>
            <td style={{color:'var(--dim)', fontStyle:'italic'}}>הצלחה: מעל 90% התאמה לדירוג המנהל. כישלון: המודל מפספס מועמדים רלוונטיים.</td>
          </tr>
          <tr>
            <td><strong>6. מהו קריטריון ההריגה (Kill Criteria) לפרויקט?</strong></td>
            <td style={{color:'var(--dim)', fontStyle:'italic'}}>אם המודל מציג הטיות מגדריות/גיליות מובהקות, או שהדירוג שלו דורש תיקון ב-40% מהמקרים.</td>
          </tr>
        </tbody>
      </table>

      <div className="biz-punchline" style={{textAlign:'center', padding:10, margin:'10px 0 0', fontSize:15}}>
        📢 <strong>כלל הזהב להצגת התרגיל:</strong> ״אני לא מחפש רעיון יפה או מורכב טכנולוגית. אני מחפש ניסוי טוב!״
      </div>
    </div>
  );
}

function FullUseCaseSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — דוגמה מלאה לשימוש</div>
      <h2>Use Case מלא: <em>סיכום שיחות שירות לקוחות</em></h2>
      <p className="slide-sub">ניתוח מקרה בוחן אמיתי שמחבר את כל שלבי הלימוד וסיכוני ה־AI בפרויקט ארגוני אחד:</p>

      <div className="usecase-details-grid" style={{margin: '10px 0'}}>
        <div className="usecase-detail-block" style={{padding: 10}}>
          <div className="usecase-detail-title" style={{fontSize: 13}}>🔴 הבעיה העסקית והכาב</div>
          <div className="usecase-detail-desc" style={{fontSize: 11, lineHeight: 1.4}}>
            נציגי שירות הלקוחות מבזבזים 3-5 דקות יקרות בסיום כל שיחה על הקלדת סיכום ידני לתוך מערכת ה-CRM. הדבר מאריך את זמן ההמתנה בתור ויוצר סיכומים חלקיים או לא עקביים.
          </div>
        </div>

        <div className="usecase-detail-block" style={{padding: 10}}>
          <div className="usecase-detail-title" style={{fontSize: 13}}>🟢 הפתרון הטכנולוגי (The Solution)</div>
          <div className="usecase-detail-desc" style={{fontSize: 11, lineHeight: 1.4}}>
            מודל LLM המקבל את תמליל השיחה ומסכם אותו לתבנית CRM מובנית: סיבת פנייה, פעולות שבוצעו, התחייבויות ללקוח, רמת דחיפות, ופעולה באחריות מי.
          </div>
        </div>

        <div className="usecase-detail-block" style={{padding: 10}}>
          <div className="usecase-detail-title" style={{fontSize: 13}}>⚠️ סיכונים מרכזיים שמופו מראש</div>
          <div className="usecase-detail-desc" style={{fontSize: 11, lineHeight: 1.4}}>
            המודל ממציא התחייבויות שלא נאמרו (הזיות), משמיט הבטחות קריטיות שניתנו ללקוח, מידע פיננסי או אישי רגיש (PII) דולף החוצה, או שהנציג סומך עליו עיוורת ולא קורא את הסיכום.
          </div>
        </div>

        <div className="usecase-detail-block" style={{padding: 10}}>
          <div className="usecase-detail-title" style={{fontSize: 13}}>🧪 הניסוי המהיר (The POC)</div>
          <div className="usecase-detail-desc" style={{fontSize: 11, lineHeight: 1.4}}>
            לקיחת 30 שיחות מוקלטות ישנות, הרצתן דרך המודל, השוואת הסיכומים הגנרטיביים מול סיכומי הנציגים המקוריים, ומתן ציון איכות 1-5 על ידי מנהלי השירות על פי רובריקה.
          </div>
        </div>
      </div>

      <div className="biz-code-label" style={{marginBottom: 2}}>מדדי ההצלחה וההחלטה הסופית</div>
      <table className="io-table" style={{fontSize:11, margin:0}}>
        <thead>
          <tr>
            <th>מדד הצלחה</th>
            <th>יעד מוגדר ל-POC</th>
            <th>תוצאות הניסוי בפועל</th>
            <th>ההחלטה התפעולית</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{color: 'var(--white)', fontWeight: 'bold'}}>זמן סיכום ממוצע</td>
            <td style={{color:'#16a34a'}}>ירידה של 50%+ בזמן הטיפול פוסט-שיחה</td>
            <td>זמן הסיכום ירד ב-70% (מ-4 דקות ל-70 שניות)</td>
            <td rowSpan="4" style={{verticalAlign:'middle', background:'rgba(22,163,74,0.02)', fontWeight:'bold', color:'#16a34a', textAlign:'center'}}>
              🟢 SCALE לכלל המוקד!<br />
              <span style={{fontWeight:'normal', fontSize:10, color:'var(--dim)', display: 'block', marginTop: 4}}>אפס הזיות קריטיות והחיסכון בזמן הוכח כאדיר. מעלים לפיילוט עם אישור אנושי חובה (Human Approval).</span>
            </td>
          </tr>
          <tr>
            <td style={{color: 'var(--white)', fontWeight: 'bold'}}>דיוק עובדתי (Factuality)</td>
            <td style={{color:'#16a34a'}}>95% ומעלה ללא המצאת פרטים</td>
            <td>97.5% מהסיכומים היו מדויקים לחלוטין עובדתית</td>
          </tr>
          <tr>
            <td style={{color: 'var(--white)', fontWeight: 'bold'}}>שיעור תיקונים כבדים</td>
            <td style={{color:'#16a34a'}}>פחות מ-10% מהסיכומים דורשים שכתוב</td>
            <td>רק 6% מהסיכומים הצריכו תיקון ידני של הנציג</td>
          </tr>
          <tr>
            <td style={{color: 'var(--white)', fontWeight: 'bold'}}>הזיות קריטיות</td>
            <td style={{color:'#ef4444'}}>חובה: 0% (קריטריון הריגה נוקשה)</td>
            <td>לא נרשמה אף הזיה קריטית של התחייבות פיננסית שווא</td>
          </tr>
        </tbody>
      </table>
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

function SummaryRiskFrameworkSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — מודל ניהול סיכונים מסכם</div>
      <h2>שקף מסכם: <em>AI Implementation Risk Framework</em></h2>
      <p className="slide-sub">מנהל אחראי בוחן כל פרויקט AI בארגון דרך 7 עדשות סיכון קריטיות אלו לפני ההשקה:</p>

      <div className="risks-container" style={{gridTemplateColumns:'repeat(4, 1fr)', gap:8, marginTop:16}}>
        <div className="risk-card-premium accent-risk" style={{padding:12}}>
          <div style={{fontSize:20, marginBottom:4, fontWeight: 'bold'}}>1</div>
          <div style={{fontWeight:700, fontSize:13, color:'var(--white)'}}>Problem Risk</div>
          <div style={{fontSize:11, color:'var(--dim)', marginTop:4}}>האם זו בעיה אמיתית וכואבת, או רק באזז ושיגעון חולף?</div>
        </div>
        <div className="risk-card-premium" style={{padding:12}}>
          <div style={{fontSize:20, marginBottom:4, fontWeight: 'bold'}}>2</div>
          <div style={{fontWeight:700, fontSize:13, color:'var(--white)'}}>Model Risk</div>
          <div style={{fontSize:11, color:'var(--dim)', marginTop:4}}>האם המודל הנבחר מסוגל לעמוד בדרישות הדיוק והעקביות?</div>
        </div>
        <div className="risk-card-premium accent-risk" style={{padding:12}}>
          <div style={{fontSize:20, marginBottom:4, fontWeight: 'bold'}}>3</div>
          <div style={{fontWeight:700, fontSize:13, color:'var(--white)'}}>Data Risk</div>
          <div style={{fontSize:11, color:'var(--dim)', marginTop:4}}>האם יש לנו מידע תקין, נגיש, חוקי ומאובטח ללא PII?</div>
        </div>
        <div className="risk-card-premium" style={{padding:12}}>
          <div style={{fontSize:20, marginBottom:4, fontWeight: 'bold'}}>4</div>
          <div style={{fontWeight:700, fontSize:13, color:'var(--white)'}}>Workflow Risk</div>
          <div style={{fontSize:11, color:'var(--dim)', marginTop:4}}>האם הפתרון משתלב בצורה חלקה ונוחה בעבודה היומית?</div>
        </div>
        <div className="risk-card-premium accent-risk" style={{padding:12}}>
          <div style={{fontSize:20, marginBottom:4, fontWeight: 'bold'}}>5</div>
          <div style={{fontWeight:700, fontSize:13, color:'var(--white)'}}>Governance Risk</div>
          <div style={{fontSize:11, color:'var(--dim)', marginTop:4}}>האם יש בקרה, אבטחה (Guardrails) וניטור מלאים?</div>
        </div>
        <div className="risk-card-premium" style={{padding:12}}>
          <div style={{fontSize:20, marginBottom:4, fontWeight: 'bold'}}>6</div>
          <div style={{fontWeight:700, fontSize:13, color:'var(--white)'}}>Economic Risk</div>
          <div style={{fontSize:11, color:'var(--dim)', marginTop:4}}>האם זה משתלם ורווחי גם אחרי עלויות אינפרנס וריצה?</div>
        </div>
        <div className="risk-card-premium accent-risk" style={{padding:12, gridColumn:'span 2'}}>
          <div style={{fontSize:20, marginBottom:4, fontWeight: 'bold'}}>7</div>
          <div style={{fontWeight:700, fontSize:13, color:'var(--white)'}}>Adoption Risk</div>
          <div style={{fontSize:11, color:'var(--dim)', marginTop:4}}>האם העובדים באמת משתמשים בזה ומאמצים את השינוי בעידוד המנהלים?</div>
        </div>
      </div>

      <div className="closing-big-quote" style={{fontSize:18, margin:'16px auto', padding:'12px 0'}}>
        ״AI מוצלח בארגון הוא לא המודל הכי מתקדם בשוק.<br />
        הוא <strong>המערכת שמצליחה להפוך יכולת טכנולוגית לערך עסקי מדיד</strong> — בלי לאבד שליטה על הסיכון.״
      </div>
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
  AILessonIntroSlide,
  WhyAIFailsSlide,
  RiskCategoriesSlide,
  RiskCategoriesPart2Slide,
  FailFastPrincipleSlide,
  AIPocFrameworkSlide,
  AIPocFrameworkPart2Slide,
  AIPocFrameworkPart3Slide,
  ValidationLevelsSlide,
  EvaluationClassicalSlide,
  EvaluationLlmSlide,
  EvaluationComparisonSlide,
  ClassExerciseSlide,
  FullUseCaseSlide,
  GuardrailsSlide,
  ROISlide,
  SummaryRiskFrameworkSlide,
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
