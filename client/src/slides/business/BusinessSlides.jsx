import SlideShell from '../shared/SlideShell';
import { ConceptCard, Highlight } from '../shared/components';
import '../shared/SlideShell.css';
import './Business.css';

// ── Slide list ────────────────────────────────────────────────
const SLIDE_LIST = [
  { id: 1, title: 'שער — עסקים ואתיקה' },
  { id: 2, title: 'מבנה ההרצאה' },
  { id: 3, title: 'AI בארגונים' },
  { id: 4, title: 'אוטומציה עסקית' },
  { id: 5, title: 'רגולציה' },
  { id: 6, title: 'הטיות ב-AI' },
  { id: 7, title: 'חשיבה ביקורתית' },
  { id: 8, title: 'Deepfakes ואמון' },
  { id: 9, title: 'סיכום הקורס' },
];

// ── Slide components ──────────────────────────────────────────

function TitleSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum}</div>
      <div className="hero-center">
        <div className="hero-title">אוטומציה, <em>רגולציה</em> וחשיבה ביקורתית</div>
        <div className="hero-subtitle">Business Automation, AI Regulation & Critical Thinking</div>
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

function AgendaSlide({ slideNum }) {
  const items = [
    'AI בארגונים',
    'אוטומציה של תהליכים',
    'רגולציה וחקיקה',
    'הטיות ואחריות',
    'חשיבה ביקורתית',
    'סיכום הקורס',
  ];
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — מבנה</div>
      <h2>מבנה <em>ההרצאה</em>.</h2>
      <p className="slide-sub">מכלים לאחריות — מה עושים עם הכוח הזה.</p>
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

function AIInOrgsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — ארגונים</div>
      <h2>AI <em>בארגונים</em> — מצב שטח.</h2>
      <p className="slide-sub">
        איפה AI נמצא היום בארגונים? מה עובד ומה עוד לא.
      </p>
      <div className="card-grid cols3">
        <ConceptCard en="Customer Service" he="שירות לקוחות" def="צ׳אטבוטים, ניתוב שיחות, סיכום פניות — AI כבר כאן." accent />
        <ConceptCard en="Operations" he="תפעול" def="חיזוי ביקוש, ניהול מלאי, אופטימיזציה — ערך מוכח." />
        <ConceptCard en="Strategy" he="אסטרטגיה" def="קבלת החלטות, תכנון — עדיין בעיקר אנושי." />
      </div>
      <div className="editorial-quote">
        "הארגונים שמובילים לא שואלים 'האם להשתמש ב-AI?' — הם שואלים 'באיזה תהליך להתחיל?'"
        <div className="editorial-quote-source">— McKinsey State of AI Report, 2025</div>
      </div>
    </div>
  );
}

function AutomationSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — אוטומציה</div>
      <h2><em>אוטומציה</em> עסקית עם AI.</h2>
      <p className="slide-sub">
        מתהליכים ידניים לזרימות אוטומטיות — איפה AI יוצר את הערך הגדול ביותר.
      </p>
      <div className="pro-con-grid">
        <div className="pro-col">
          <div className="pro-con-header">יתרונות</div>
          <ul className="pro-con-list">
            <li>חיסכון בזמן ובעלויות</li>
            <li>עקביות ואיכות אחידה</li>
            <li>סקייל — מרבים בלי להוסיף כוח אדם</li>
            <li>זמינות 24/7</li>
          </ul>
        </div>
        <div className="con-col">
          <div className="pro-con-header">אתגרים</div>
          <ul className="pro-con-list">
            <li>הטמעה מורכבת</li>
            <li>איכות נתונים</li>
            <li>התנגדות ארגונית</li>
            <li>תחזוקה שוטפת</li>
          </ul>
        </div>
      </div>
      <Highlight>
        אוטומציה מוצלחת מתחילה מתהליך <em>ידני מוגדר היטב</em> — לא מטכנולוגיה.
      </Highlight>
    </div>
  );
}

function RegulationSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — רגולציה</div>
      <h2><em>רגולציה</em> — הכללים משתנים.</h2>
      <p className="slide-sub">
        חקיקה חדשה מחייבת ארגונים לנהל AI באחריות — מה צריך לדעת.
      </p>
      <div className="reg-timeline">
        <div className="reg-timeline-item">
          <div className="reg-timeline-dot" />
          <div className="reg-timeline-content">
            <div className="reg-timeline-year">2018</div>
            <div className="reg-timeline-title">GDPR (אירופה)</div>
            <div className="reg-timeline-desc">זכות להסבר — אם החלטה אוטומטית משפיעה עליך, יש לך זכות לדעת למה.</div>
          </div>
        </div>
        <div className="reg-timeline-item">
          <div className="reg-timeline-dot" />
          <div className="reg-timeline-content">
            <div className="reg-timeline-year">2024</div>
            <div className="reg-timeline-title">EU AI Act</div>
            <div className="reg-timeline-desc">סיווג מערכות AI לפי רמת סיכון — ודרישות שונות לכל רמה.</div>
          </div>
        </div>
        <div className="reg-timeline-item">
          <div className="reg-timeline-dot" />
          <div className="reg-timeline-content">
            <div className="reg-timeline-year">2025+</div>
            <div className="reg-timeline-title">רגולציה בישראל ובעולם</div>
            <div className="reg-timeline-desc">חקיקה חדשה, מדיניות ארגונית, ודרישות שקיפות.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BiasSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — הטיות</div>
      <h2><em>הטיות</em> ב-AI — מאיפה הן מגיעות?</h2>
      <p className="slide-sub">
        מודל AI לומד מדאטה — ואם הדאטה מוטה, גם ההחלטות יהיו מוטות.
      </p>
      <div className="card-grid cols2">
        <ConceptCard
          en="Data Bias"
          he="הטיית נתונים"
          def="אם מערכת גיוס אומנה רק על מועמדים שהתקבלו — היא תלמד להעדיף את הפרופיל ההיסטורי."
          accent
        />
        <ConceptCard
          en="Representation Bias"
          he="הטיית ייצוג"
          def="אם קבוצה מסוימת לא מיוצגת בדאטה — המודל לא ילמד לשרת אותה."
        />
      </div>
      <div className="case-study">
        <div className="case-study-label">Case Study</div>
        <div className="case-study-title">Amazon Hiring AI (2018)</div>
        <div className="case-study-body">
          אמזון פיתחה מערכת AI לסינון קורות חיים. המערכת למדה להעדיף גברים כי הדאטה ההיסטורי היה מוטה.
          המערכת הוסרה מהשימוש.
        </div>
      </div>
      <Highlight color="#ea580c">
        הטיה ב-AI היא לא באג — היא <em>משקפת</em> הטיות שכבר קיימות בנתוני העולם האמיתי.
      </Highlight>
    </div>
  );
}

function CriticalThinkingSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — חשיבה ביקורתית</div>
      <h2><em>חשיבה ביקורתית</em> בעידן AI.</h2>
      <p className="slide-sub">
        AI נותן תשובות בביטחון גבוה — אבל ביטחון ≠ דיוק. איך נבדיל?
      </p>
      <div className="card-grid cols3">
        <ConceptCard en="Hallucination" he="הזיית AI" def="המודל מייצר מידע שנראה אמין אבל לא נכון. הוא לא 'משקר' — הוא משלים דפוסים." accent />
        <ConceptCard en="Source Check" he="בדיקת מקורות" def="כל פלט AI דורש אימות. מה המקור? האם זה מגובה בעובדות?" />
        <ConceptCard en="Context Matters" he="הקשר קובע" def="אותו AI יכול להיות מצוין למחקר ראשוני ומסוכן להחלטה רפואית." />
      </div>
      <Highlight>
        המיומנות החשובה ביותר ב-2026: לא לדעת <em>איך לשאול</em> AI — אלא <em>מתי לסרב</em> לקבל את התשובה.
      </Highlight>
    </div>
  );
}

function DeepfakesSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — Deepfakes</div>
      <h2><em>Deepfakes</em> ואמון דיגיטלי.</h2>
      <p className="slide-sub">
        כשכל תמונה, סרטון ושיחה יכולים להיווצר ב-AI — איך נדע מה אמיתי?
      </p>
      <div className="card-grid cols2">
        <ConceptCard
          en="The Threat"
          he="האיום"
          def={'זיוף וידאו ואודיו ברמה שקשה להבחין. פוליטיקאים, מנכ"לים, אנשים רגילים — כולם מטרות.'}
          accent
        />
        <ConceptCard
          en="The Response"
          he="התגובה"
          def="חתימות דיגיטליות, שקיפות מקור, חינוך — אין פתרון אחד אלא שכבות הגנה."
        />
      </div>
      <div className="editorial-quote">
        "הבעיה של deepfakes היא לא רק מה שהם מראים — אלא שהם גורמים לנו לפקפק בכל מה שאנחנו רואים."
        <div className="editorial-quote-source">— Hany Farid, UC Berkeley</div>
      </div>
    </div>
  );
}

function CourseSummarySlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">חלק 3 — שקף {slideNum} — סיכום</div>
      <h2>מה <em>למדנו</em> בקורס הזה?</h2>
      <p className="slide-sub">
        שלושה חלקים, מסע אחד — מהבנת הבסיס ועד חשיבה ביקורתית.
      </p>
      <div className="card-grid cols3">
        <ConceptCard en="Part 1 — Foundations" he="יסודות" def="נתונים, מודלים, למידת מכונה, רשתות עמוקות." />
        <ConceptCard en="Part 2 — LLMs & GenAI" he="שפה ויצירה" def="טוקנים, embeddings, transformers, prompting, RAG." />
        <ConceptCard en="Part 3 — Business & Ethics" he="עסקים ואתיקה" def="אוטומציה, רגולציה, הטיות, חשיבה ביקורתית." accent />
      </div>
      <Highlight>
        הכלים ישתנו. הטכנולוגיה תתקדם. היכולת <em>לחשוב ביקורתית</em> על AI — זה מה שיישאר.
      </Highlight>
    </div>
  );
}

// ── Wire up ───────────────────────────────────────────────────
const SLIDE_COMPONENTS = [
  TitleSlide,
  AgendaSlide,
  AIInOrgsSlide,
  AutomationSlide,
  RegulationSlide,
  BiasSlide,
  CriticalThinkingSlide,
  DeepfakesSlide,
  CourseSummarySlide,
];

export default function BusinessSlides() {
  return (
    <SlideShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="עסקים, אתיקה וחשיבה ביקורתית"
      deckClass="deck-business"
      deck="business"
      surveyPath="/business"
    />
  );
}
