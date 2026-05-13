import SlideShell from '../shared/SlideShell';
import { ConceptCard, Highlight, StatCard } from '../shared/components';
import '../shared/SlideShell.css';
import './Multimodal.css';

// ── Slide list ────────────────────────────────────────────────
export const SLIDE_LIST = [
  { id: 1,  title: 'שער' },
  { id: 2,  title: 'מה אתם רואים?' },
  { id: 3,  title: 'הבעיה' },
  { id: 4,  title: 'למה זה קשה?' },
  { id: 5,  title: 'המוח כבר מאומן' },
  { id: 6,  title: 'ייצוג', navNum: 'א' },
  { id: 7,  title: 'אור ומספרים' },
  { id: 8,  title: 'פיקסלים' },
  { id: 9,  title: 'קצוות' },
  { id: 10, title: 'תכונות ידניות' },
  { id: 11, title: 'מלכודת החוקים' },
  { id: 12, title: 'CAPTCHA', navNum: 'ב' },
  { id: 13, title: 'reCAPTCHA' },
  { id: 14, title: 'תיוג דאטה' },
  { id: 15, title: 'מסמכים סרוקים' },
  { id: 16, title: 'סצנה שלמה', navNum: 'ג' },
  { id: 17, title: 'ראייה בזמן אמת' },
  { id: 18, title: 'עיניים למכונה' },
  { id: 19, title: 'Deep Learning', navNum: 'ד' },
  { id: 20, title: 'מה הרשת לומדת?' },
  { id: 21, title: 'ייצוג סטטיסטי' },
  { id: 22, title: 'ImageNet' },
  { id: 23, title: 'השינוי במספרים' },
  { id: 24, title: 'CNN', navNum: 'ה' },
  { id: 25, title: 'Classification' },
  { id: 26, title: 'Detection' },
  { id: 27, title: 'YOLO' },
  { id: 28, title: 'המעבר להבנה' },
  { id: 29, title: 'CLIP', navNum: 'ו' },
  { id: 30, title: 'Multimodal Intelligence' },
  { id: 31, title: 'Visual Reasoning' },
  { id: 32, title: 'Agents' },
  { id: 33, title: 'ומה לגבי קול?', navNum: 'ז' },
  { id: 34, title: 'Speech AI' },
  { id: 35, title: 'Everything Embeds' },
  { id: 36, title: 'סיכום' },
];

// ── Slide components ──────────────────────────────────────────

function SlideHeader({ slideNum, kicker, title, subtitle }) {
  return (
    <>
      <div className="slide-eyebrow mono">שקף {slideNum} — {kicker}</div>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && <p className="slide-sub">{subtitle}</p>}
    </>
  );
}

function PixelGrid() {
  const cells = [
    '#141414', '#2f2b27', '#59412d', '#915a26', '#c17922', '#f59e0b',
    '#101820', '#1f3438', '#245c5b', '#1d8a82', '#16a99e', '#7dd3c7',
    '#080a0d', '#17151b', '#2d2130', '#59314b', '#9c456d', '#e879a5',
    '#050609', '#12161d', '#1c2732', '#304454', '#42657b', '#7aa7bd',
  ];

  return (
    <div className="pixel-lens">
      <div className="pixel-grid" aria-label="pixel grid">
        {cells.map((color, i) => <span key={i} style={{ background: color }} />)}
      </div>
      <div className="pixel-formula mono">I(x,y) = [R, G, B]</div>
    </div>
  );
}

function EdgeDetectorViz() {
  return (
    <div className="edge-viz">
      <div className="edge-scene">
        <div className="edge-sun" />
        <div className="edge-building b1" />
        <div className="edge-building b2" />
        <div className="edge-road" />
        <div className="edge-car" />
      </div>
      <div className="edge-arrow mono">Sobel / Canny</div>
      <div className="edge-output">
        <span className="edge-line l1" />
        <span className="edge-line l2" />
        <span className="edge-line l3" />
        <span className="edge-line l4" />
        <span className="edge-line l5" />
      </div>
    </div>
  );
}

function Pipeline({ items }) {
  return (
    <div className="mm-pipeline">
      {items.map((item, i) => (
        <div className="pipeline-step" key={item.label} style={{ animationDelay: `${0.12 * i}s` }}>
          <div className="pipeline-icon">{item.icon}</div>
          <div>
            <div className="pipeline-label">{item.label}</div>
            <div className="pipeline-sub mono">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SourceVisual({ name, label, compact = false }) {
  return (
    <figure className={`source-visual ${compact ? 'compact' : ''}`}>
      <img
        src={`/multimodal/images/${name}`}
        alt={label}
        loading="lazy"
      />
      <figcaption className="mono">{label}</figcaption>
    </figure>
  );
}

function ModelCredit({ model, by, year, note }) {
  return (
    <div className="model-credit">
      <div>
        <span className="model-credit-label mono">MODEL / PROJECT</span>
        <strong>{model}</strong>
      </div>
      <div>
        <span className="model-credit-label mono">DEVELOPED BY</span>
        <strong>{by}</strong>
      </div>
      {year && (
        <div>
          <span className="model-credit-label mono">YEAR</span>
          <strong>{year}</strong>
        </div>
      )}
      {note && <p>{note}</p>}
    </div>
  );
}

function DetectionFrame() {
  const boxes = [
    { cls: 'person', style: { top: '28%', right: '14%', width: '18%', height: '45%' } },
    { cls: 'car', style: { bottom: '18%', right: '37%', width: '30%', height: '24%' } },
    { cls: 'traffic light', style: { top: '12%', left: '18%', width: '12%', height: '28%' } },
  ];

  return (
    <div className="detection-frame">
      <div className="street-perspective">
        <span className="lane l1" />
        <span className="lane l2" />
        <span className="building left" />
        <span className="building right" />
        <span className="road-car" />
        <span className="road-person" />
        <span className="road-light" />
      </div>
      {boxes.map(box => (
        <div className="bbox" key={box.cls} style={box.style}>
          <span>{box.cls}</span>
        </div>
      ))}
    </div>
  );
}

function ClipSpace() {
  const points = [
    { label: 'תמונה: עיר בלילה', className: 'image p1', img: 'street.jpg' },
    { label: 'טקסט: crowded street at night', className: 'text p2' },
    { label: 'תמונה: לוח אלקטרוני', className: 'image p3', img: 'circuit.jpg' },
    { label: 'טקסט: close-up circuit board', className: 'text p4' },
  ];

  return (
    <div className="clip-space">
      <div className="clip-axis x mono">TEXT</div>
      <div className="clip-axis y mono">IMAGE</div>
      <span className="clip-orbit o1" />
      <span className="clip-orbit o2" />
      {points.map(({ label, className, img }, i) => (
        <div key={label} className={`clip-point ${className}`} style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
          {img && <img src={`/multimodal/images/${img}`} alt={label} />}
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function TitleSlide() {
  return (
    <div className="slide fade-up">
      <div className="hero-center">
        <div className="hero-title"><em>ראייה ממוחשבת</em> ובינה מולטימודלית</div>
        <div className="hero-subtitle">Multimodal Intelligence</div>
        <div className="hero-lecture-num">מודול 2 — חלק ב׳</div>
        <div className="instructor-block">
          <div className="instructor-name">אוריאל אהרוני</div>
          <div className="instructor-role">CEO & Co-Founder</div>
          <div className="instructor-companies mono">Facio · Choco · InsurMedix</div>
        </div>
      </div>
    </div>
  );
}

function OpeningQuestionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="פתיחה"
        title={'תסתכלו על הרחוב הזה.<br /><em>מה אתם מבינים?</em>'}
        subtitle="לבני אדם זה כמעט מיידי: מכוניות, עומס, כיוון תנועה, סכנה, מזג אוויר, אולי אפילו סיפור. למחשב אין את כל זה. יש לו רק מספרים."
      />
      <SourceVisual name="street.jpg" label="Crowded street — source image" />
      <Highlight>
        ראייה ממוחשבת מתחילה בפער הזה: אנחנו רואים <em>משמעות</em>, המחשב מקבל <em>מדידות</em>.
      </Highlight>
    </div>
  );
}

function VisionProblemSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="הבעיה המרכזית"
        title={'המחשב לא רואה <em>אובייקטים</em>.<br />הוא רואה מטריצה.'}
        subtitle="האתגר הוא להפוך ערכים נמוכים של אור וצבע לרעיונות גבוהים: אדם, כביש, חתול, צילום רנטגן, מסמך, פעולה."
      />
      <div className="card-grid cols3">
        <ConceptCard en="INPUT" he="אותות" def="פיקסלים, עומק, תנועה, צליל, טקסט, חיישנים." accent />
        <ConceptCard en="REPRESENTATION" he="ייצוג" def="דרך מספרית לתאר את מה שחשוב בתמונה." />
        <ConceptCard en="MEANING" he="משמעות" def="החלטה שאפשר לפעול לפיה: מה יש כאן ומה צריך לעשות." />
      </div>
      <div className="big-quote">כל הסיפור של Computer Vision הוא ללמוד את הגשר בין <em>מדידה</em> לבין <em>משמעות</em>.</div>
    </div>
  );
}

function WhyVisionIsHardSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="למה זה קשה?"
        title={'בתמונה יש הכול בבת אחת:<br /><em>אור, רעש, זווית והקשר</em>.'}
        subtitle="אותו אובייקט יכול להיראות שונה לגמרי מזוויות, תאורה, מצלמות ומרחקים שונים. בני אדם מפצים על זה בלי לחשוב; למחשב צריך לבנות דרך ללמוד זאת."
      />
      <div className="vision-hard-grid">
        {[
          ['תאורה', 'אותו רכב ביום ובלילה'],
          ['זווית', 'אובייקט משתנה לפי נקודת המבט'],
          ['הסתרה', 'חלק מהדבר חסום ועדיין צריך לזהות'],
          ['הקשר', 'אותו סימן אומר דברים שונים בסביבה אחרת'],
        ].map(([title, text], i) => (
          <div className="vision-hard-card" key={title} style={{ animationDelay: `${i * 0.09}s` }}>
            <span className="mono">0{i + 1}</span>
            <b>{title}</b>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <Highlight>הבעיה האמיתית איננה לראות צבעים. היא לזהות יציבות ומשמעות בתוך עולם משתנה.</Highlight>
    </div>
  );
}

function HumanVisionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="היתרון האנושי"
        title={'המוח האנושי הוא מערכת Vision<br /><em>שאומנה מיליוני שנים</em>.'}
        subtitle="אנחנו מזהים תנועה, פנים וסכנה מהר מאוד כי האבולוציה בנתה לנו pipeline חזותי חזק. AI צריך ללמוד משהו דומה מדאטה."
      />
      <div className="human-vision-stack">
        {[
          ['אור', 'פוטונים פוגעים ברשתית'],
          ['תבניות', 'קצוות, צבעים ותנועה'],
          ['זיכרון', 'השוואה למה שכבר ראינו'],
          ['פעולה', 'תגובה, החלטה, שפה'],
        ].map(([title, text], i) => (
          <div className="human-vision-step" key={title}>
            <div className="human-eye-ring">{i + 1}</div>
            <b>{title}</b>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="big-quote">Computer Vision מנסה לבנות למחשב גרסה נלמדת של האינטואיציה הזאת.</div>
    </div>
  );
}

function RepresentationSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Representation Learning"
        title={'זו לא מקטרת.<br />זו <em>ייצוג</em> של מקטרת.'}
        subtitle="כמו אצל מגריט, תמונה איננה הדבר עצמו. AI צריך ללמוד איזה ייצוג פנימי מספיק טוב כדי לזהות, להשוות, להסביר ולפעול."
      />
      <div className="representation-stage">
        <SourceVisual name="magritte.jpg" label="Magritte Pipe — source image" compact />
        <div className="representation-copy">
          <div className="rep-row"><span>תמונה</span><b>≠</b><span>אובייקט</span></div>
          <div className="rep-row"><span>פיקסלים</span><b>←</b><span>ייצוג</span></div>
          <div className="rep-row"><span>ייצוג</span><b>←</b><span>הבנה</span></div>
        </div>
      </div>
    </div>
  );
}

function LightToNumbersSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="אור ← מספרים"
        title={'המצלמה לא מבינה עולם.<br />היא מודדת <em>אור</em>.'}
        subtitle="התמונה מתחילה כמדידה פיזיקלית: כמה אור הגיע לכל נקודה, באיזה צבע, ובאיזו עוצמה. מכאן מתחיל כל pipeline של ראייה ממוחשבת."
      />
      <div className="light-pipeline">
        {[
          ['Scene', 'עולם אמיתי'],
          ['Lens', 'עדשה וחיישן'],
          ['Pixels', 'מטריצת צבעים'],
          ['Model', 'ייצוג נלמד'],
          ['Meaning', 'החלטה או הסבר'],
        ].map(([label, sub], i) => (
          <div className="light-step" key={label} style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="mono">{label}</span>
            <b>{sub}</b>
          </div>
        ))}
      </div>
      <Highlight>כל קפיצה בשרשרת הזאת מאבדת מידע ומוסיפה פרשנות. לכן ייצוג טוב הוא לב הבעיה.</Highlight>
    </div>
  );
}

function PixelsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="החומר הגולמי"
        title={'כל תמונה היא ים של <em>פיקסלים</em>.'}
        subtitle="ב־1080p יש יותר משני מיליון נקודות. כל נקודה היא לרוב שלישיית מספרים בין 0 ל־255. מזה צריך להסיק עולם."
      />
      <div className="split-visual">
        <PixelGrid />
        <div className="stat-row vertical-stat-row">
          <StatCard num="2M+" label="פיקסלים בתמונה 1080p" />
          <StatCard num="3" label="ערוצי צבע: RGB" />
          <StatCard num="0-255" label="עוצמה לכל ערוץ" />
        </div>
      </div>
    </div>
  );
}

function EdgesSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="הדור הראשון"
        title={'לפני Deep Learning חיפשנו <em>קצוות</em>.'}
        subtitle="קצוות הם שינוי חד בצבע או בעוצמה. הם נותנים רמזים לצורה, אבל עדיין לא מספרים לנו מה הדבר."
      />
      <EdgeDetectorViz />
      <Highlight>
        Sobel ו־Canny היו אבני בניין חשובות: הם נתנו למחשב לראות קווי מתאר, אבל לא להבין את הסצנה.
      </Highlight>
    </div>
  );
}

function HandcraftedSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Handcrafted Features"
        title={'היינו צריכים ללמד את המחשב<br /><em>מה לחפש</em>.'}
        subtitle="מהנדסים הגדירו ידנית תכונות: פינות, טקסטורות, סימטריה, צבעים, תבניות. זה עבד במעבדה, ונשבר בעולם האמיתי."
      />
      <SourceVisual name="circuit.jpg" label="Circuit board — source image" compact />
      <div className="feature-board">
        {['edges', 'corners', 'texture', 'shape', 'color', 'motion', 'contrast', 'symmetry'].map((f, i) => (
          <div className="feature-chip" key={f} style={{ animationDelay: `${i * 0.08}s` }}>{f}</div>
        ))}
      </div>
      <div className="card-grid cols2">
        <ConceptCard en="GOOD" he="כשיש עולם פשוט" def="תאורה יציבה, אובייקטים מוכרים, זווית צילום צפויה." />
        <ConceptCard en="BREAKS" he="כשהעולם משתנה" def="צללים, רעש, הסתרות, תנוחות שונות, מצלמות שונות." accent />
      </div>
    </div>
  );
}

function RulesTrapSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="מלכודת החוקים"
        title={'כמה חוקים צריך כדי לזהות<br /><em>חתול?</em>'}
        subtitle="אפשר לכתוב חוק לאוזניים, לעיניים ולשפם. אבל אז מגיע חתול שחור, חתול מטושטש, חתול מאחור, או צעצוע שנראה כמו חתול."
      />
      <div className="rules-trap">
        {[
          ['אם יש שתי אוזניים', 'נכשל כשאוזן מוסתרת'],
          ['אם יש שפם', 'נכשל באיכות תמונה נמוכה'],
          ['אם יש פרווה', 'נכשל בציור או פסל'],
          ['אם יש צורה עגולה', 'מזהה גם כרית'],
        ].map(([rule, failure]) => (
          <div className="rule-card" key={rule}>
            <b>{rule}</b>
            <span>{failure}</span>
          </div>
        ))}
      </div>
      <Highlight>הלקח: לא רוצים לכתוב חוקים לכל העולם. רוצים שהמודל ילמד תכונות מהדאטה.</Highlight>
    </div>
  );
}

function CaptchaSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="CAPTCHA"
        title={'פעם, לזהות תמונה היה מבחן<br /><em>שבני אדם מנצחים בו</em>.'}
        subtitle="CAPTCHA נבנה על ההנחה שלבני אדם קל לזהות אותיות ותמונות מעוותות, ולמחשבים קשה. ההנחה הזו החזיקה זמן קצר."
      />
      <div className="captcha-card">
        <div className="captcha-title mono">SELECT ALL IMAGES WITH TRAFFIC LIGHTS</div>
        <div className="captcha-grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className={`tile-${i + 1} ${i === 1 || i === 5 ? 'hit' : ''}`} />
          ))}
        </div>
      </div>
      <Highlight>
        האירוניה: מיליארדי פתרונות אנושיים הפכו לחומר גלם שאימן מערכות ראייה טובות יותר.
      </Highlight>
    </div>
  );
}

function RecaptchaSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="reCAPTCHA"
        title={'ואז המבחן הפך למנוע<br /><em>תיוג עולמי</em>.'}
        subtitle="Luis von Ahn ו־reCAPTCHA לקחו פעולה אנושית יומיומית והפכו אותה לדאטה: מיליוני אנשים עזרו לזהות מילים, שלטים, כבישים ואובייקטים."
      />
      <ModelCredit
        model="reCAPTCHA"
        by="Luis von Ahn וצוות Carnegie Mellon; בהמשך Google"
        year="2007"
        note="דוגמה מוקדמת וחזקה ל-human computation: בני אדם פותרים משימה קטנה, והמערכת צוברת דאטה בקנה מידה ענק."
      />
      <Pipeline items={[
        { icon: '01', label: 'אתגר אנושי', sub: 'captcha' },
        { icon: '02', label: 'תשובה', sub: 'human label' },
        { icon: '03', label: 'דאטה', sub: 'training signal' },
        { icon: '04', label: 'מודל טוב יותר', sub: 'vision improves' },
      ]} />
    </div>
  );
}

function LabelingSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Data Labeling"
        title={'המהפכה התחילה כשבנינו<br /><em>דאטה מתויג</em>.'}
        subtitle="מודלים לא לומדים רק מתמונות. הם לומדים מתמונות עם תשובות: מה יש בתמונה, איפה זה נמצא, איך קוראים לזה."
      />
      <ModelCredit
        model="ImageNet"
        by="Fei-Fei Li, Jia Deng, Kai Li וצוות Princeton / Stanford"
        year="2009"
        note="זה לא מודל אלא דאטהסט ענק ומתויג, אבל הוא היה הדלק שאיפשר למודלי ראייה מודרניים לפרוץ קדימה."
      />
      <Pipeline items={[
        { icon: '01', label: 'תמונה', sub: 'pixels' },
        { icon: '02', label: 'תיוג אנושי', sub: 'label / box' },
        { icon: '03', label: 'אימון מודל', sub: 'training' },
        { icon: '04', label: 'יכולת חדשה', sub: 'prediction' },
      ]} />
      <div className="labeling-callout">
        <span className="mono">הלקח העסקי</span>
        דאטה לא מתויג הוא חומר גלם. דאטה מתויג הוא מנוע.
      </div>
    </div>
  );
}

function ScannedDocsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="OCR"
        title={'PDF דיגיטלי הוא טקסט.<br />PDF סרוק הוא <em>תמונה</em>.'}
        subtitle="זו נקודה קריטית בעסקים: מסמך שנראה לנו קריא יכול להיות עבור המחשב רק צילום. בשביל להבין אותו צריך Vision."
      />
      <div className="docs-compare">
        <div className="doc-card clean">
          <div className="doc-label mono">DIGITAL PDF</div>
          <div className="doc-text">
            <p>חשבונית מס מספר 1048</p>
            <p>ספק: חברת ראייה בע״מ</p>
            <p>סה״כ לתשלום: 12,430 ₪</p>
          </div>
          <div className="doc-status">אפשר לחפש, להעתיק, לפרש</div>
        </div>
        <div className="doc-card scanned">
          <div className="doc-label mono">SCANNED PDF</div>
          <span className="scan-noise" />
          <div className="doc-text scanned-text">
            <p>חשבונית מס מספר 1048</p>
            <p>ספק: חברת ראייה בע״מ</p>
            <p>סה״כ לתשלום: 12,430 ₪</p>
          </div>
          <div className="doc-status">צריך לזהות אותיות, טבלאות וחותמות</div>
        </div>
      </div>
    </div>
  );
}

function SceneUnderstandingSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Scene Understanding"
        title={'לא מספיק לדעת שיש אובייקט.<br />צריך להבין <em>סצנה</em>.'}
        subtitle="בתמונה אמיתית יש יחסים: מי קרוב למי, מה מסתיר מה, מה חריג, מה חשוב לפעולה הבאה."
      />
      <div className="scene-map">
        {['אדם', 'רכב', 'כביש', 'תמרור', 'צל', 'מרחק', 'כוונה', 'סיכון'].map((label, i) => (
          <span key={label} className={`scene-node n${i + 1}`}>{label}</span>
        ))}
        <span className="scene-link a" />
        <span className="scene-link b" />
        <span className="scene-link c" />
      </div>
      <Highlight>המעבר הגדול הוא מ־Detection אל Understanding: לא רק ״מה יש פה״, אלא ״מה קורה פה״.</Highlight>
    </div>
  );
}

function RealTimeVisionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Real-Time Vision"
        title={'ברגע שמחשב רואה בזמן אמת,<br />הוא נכנס <em>לעולם הפיזי</em>.'}
        subtitle="רכב אוטונומי, רובוטיקה, קמעונאות, אבטחה ותעשייה דורשים לא רק לזהות תמונה, אלא לזהות מהר מספיק כדי לפעול."
      />
      <div className="real-time-board">
        {[
          ['Autonomous cars', 'כביש, הולכי רגל, נתיבים'],
          ['Robotics', 'אחיזה, ניווט, בטיחות'],
          ['Retail', 'מדפים, תורים, Amazon Go'],
          ['Industry', 'פגמים, מכונות, בקרה'],
        ].map(([en, he]) => (
          <div className="real-time-card" key={en}>
            <span className="mono">{en}</span>
            <b>{he}</b>
          </div>
        ))}
      </div>
      <Highlight>כאן Vision עובר מניתוח תמונה בדיעבד למערכת שמקבלת החלטות בזמן אמת.</Highlight>
    </div>
  );
}

function MachineEyesSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Sensors"
        title={'למכונה יש יותר מסוג אחד של <em>עיניים</em>.'}
        subtitle="מצלמות רגילות הן רק ההתחלה. בעולם האמיתי משלבים עומק, GPS, LiDAR, תרמי, לוויין ומידע רב־ספקטרלי."
      />
      <SourceVisual name="satellite.jpg" label="Satellite night lights — source image" compact />
      <div className="sensor-radar">
        {[
          ['RGB', 'צבע'],
          ['LiDAR', 'עומק'],
          ['GPS', 'מיקום'],
          ['Thermal', 'חום'],
          ['Satellite', 'קנה מידה'],
          ['Multispectral', 'מעבר לעין'],
        ].map(([en, he], i) => (
          <div key={en} className={`sensor-dot s${i + 1}`}>
            <b className="mono">{en}</b>
            <span>{he}</span>
          </div>
        ))}
        <div className="radar-core">AI</div>
      </div>
    </div>
  );
}

function DeepLearningIntroSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Deep Learning"
        title={'הפרדיגמה משתנה:<br />לא מתכנתים ראייה, <em>מאמנים</em> אותה.'}
        subtitle="במקום להחליט מראש אילו תכונות חשובות, נותנים לרשת גדולה ודאטה מתויג ללמוד את הייצוגים בעצמה."
      />
      <div className="paradigm-shift">
        <div>
          <span className="mono">BEFORE</span>
          <b>Human writes features</b>
          <p>מהנדס מגדיר קצוות, פינות, צבעים וחוקים.</p>
        </div>
        <div className="shift-arrow mono">←</div>
        <div>
          <span className="mono">AFTER</span>
          <b>Network learns features</b>
          <p>המודל לומד מתוך דוגמאות אילו תבניות מנבאות את התשובה.</p>
        </div>
      </div>
      <div className="big-quote">זה לא רק אלגוריתם חדש. זו דרך חדשה לבנות ידע במכונה.</div>
    </div>
  );
}

function DeepLearningSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Paradigm Shift"
        title={'במקום להנדס תכונות,<br />נתנו לרשת <em>ללמוד אותן</em>.'}
        subtitle="Deep Learning החליף הרבה כללים ידניים בלמידה היררכית: שכבות מוקדמות מזהות קצוות, שכבות עמוקות מזהות חלקים ורעיונות."
      />
      <ModelCredit
        model="LeNet / Convolutional Neural Networks"
        by="Yann LeCun וצוות Bell Labs / AT&T"
        year="1989-1998"
        note="הבסיס ההיסטורי לרעיון שרשת יכולה ללמוד פילטרים חזותיים מתוך דאטה."
      />
      <div className="deep-learning-story">
        {[
          ['01', 'פיקסלים', 'צבע ואור', 'raw input'],
          ['02', 'קצוות', 'שינויים חדים', 'edges'],
          ['03', 'מרקמים', 'דפוסים חוזרים', 'textures'],
          ['04', 'חלקים', 'עין, גלגל, חלון', 'parts'],
          ['05', 'אובייקטים', 'חתול, רכב, אדם', 'objects'],
          ['06', 'מושגים', 'סצנה וכוונה', 'concepts'],
        ].map(([num, title, he, en], i) => (
          <div className="dl-stage" key={num} style={{ animationDelay: `${i * 0.09}s` }}>
            <span className="dl-num mono">{num}</span>
            <div className={`dl-icon dl-icon-${i + 1}`}>
              <span />
              <span />
              <span />
            </div>
            <b>{title}</b>
            <p>{he}</p>
            <small className="mono">{en}</small>
          </div>
        ))}
      </div>
      <Highlight>
        זה השינוי הגדול: אנחנו כבר לא מגדירים ידנית את התכונות. הרשת לומדת היררכיה: מהחומר הגולמי ועד משמעות.
      </Highlight>
    </div>
  );
}

function StatisticalRepresentationSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Statistical Representation"
        title={'הרשת לא שומרת תמונות.<br />היא לומדת <em>ייצוג סטטיסטי</em>.'}
        subtitle="המודל בונה מרחב פנימי שבו דוגמאות דומות קרובות זו לזו. זה לא ״זיכרון של חתול״, אלא דפוס מספרי שמאפשר לזהות חתולים חדשים."
      />
      <div className="embedding-plane">
        {[
          { label: 'רחוב', cls: 'p1', img: 'street.jpg' },
          { label: 'לוח אלקטרוני', cls: 'p2', img: 'circuit.jpg' },
          { label: 'ציור', cls: 'p3', img: 'magritte.jpg' },
          { label: 'לוויין', cls: 'p4', img: 'satellite.jpg' },
          { label: 'תנועה', cls: 'p5' },
          { label: 'מרקם', cls: 'p6' },
          { label: 'עיר', cls: 'p7' },
          { label: 'אובייקט', cls: 'p8' },
        ].map(({ label, cls, img }) => (
          <span key={label} className={`embed-dot ${cls} ${img ? 'image-dot' : ''}`}>
            {img && <img src={`/multimodal/images/${img}`} alt={label} />}
            <b>{label}</b>
          </span>
        ))}
        <span className="cluster-label vision mono">VISION SPACE</span>
      </div>
      <Highlight>כמו בוקטורים של מילים, גם בראייה המשמעות נוצרת מתוך יחסים במרחב מספרי.</Highlight>
    </div>
  );
}

function ImageNetSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="ImageNet"
        title={'ואז הגיע מאגר תמונות<br /><em>ששינה את התחום</em>.'}
        subtitle="ImageNet נתן לקהילה מיליוני תמונות מתויגות. כמו שטקסטים ענקיים הזניקו LLMs, תמונות מתויגות הזניקו ראייה ממוחשבת."
      />
      <ModelCredit
        model="ImageNet"
        by="Fei-Fei Li, Jia Deng, Kai Li וצוות המחקר"
        year="2009"
        note="הפרויקט שהפך תיוג תמונות בקנה מידה עצום לתשתית מדעית לכל התחום."
      />
      <div className="imagenet-wall">
        {Array.from({ length: 42 }).map((_, i) => <span key={i} style={{ animationDelay: `${i * 0.018}s` }} />)}
      </div>
      <div className="big-quote">Fei-Fei Li והקהילה לא רק בנו דאטהסט. הם בנו <em>מסלול מירוץ</em> לכל התחום.</div>
    </div>
  );
}

function ErrorRateSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="ImageNet Error Rate"
        title={'תוך שנים ספורות,<br />הטעות פשוט <em>קרסה</em>.'}
        subtitle="הנקודה לא הייתה רק שיפור הדרגתי. זו הייתה עדות לכך שייצוגים נלמדים יכולים לעקוף גישות מסורתיות."
      />
      <ModelCredit
        model="AlexNet → ResNet"
        by="Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton; אחר כך Kaiming He וצוות Microsoft Research"
        year="2012 / 2015"
        note="AlexNet הצית את מהפכת ה־Deep Learning בראייה; ResNet הראה שאפשר לאמן רשתות עמוקות בהרבה."
      />
      <div className="error-bars">
        {[
          ['2011', 'Traditional', 26],
          ['2012', 'AlexNet', 16],
          ['2015', 'ResNet', 3],
        ].map(([year, name, value]) => (
          <div className="error-bar" key={year}>
            <div className="bar-value mono">{value}%</div>
            <div className="bar-column" style={{ height: `${value * 10}px` }} />
            <div className="bar-name">{name}</div>
            <div className="bar-year mono">{year}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CnnSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Convolution"
        title={'CNN שואל: איפה מופיעה<br /><em>תבנית מקומית</em>?'}
        subtitle="Convolution הוא רעיון פשוט וחזק: פילטר קטן מחליק על התמונה ומחפש אותו דפוס בכל מקום."
      />
      <ModelCredit
        model="CNN"
        by="Yann LeCun ואחרים"
        year="שנות ה־90"
        note="משפחת המודלים שהפכה פילטרים נלמדים לכלי המרכזי בזיהוי תמונות."
      />
      <div className="cnn-demo">
        <div className="cnn-image">
          {Array.from({ length: 64 }).map((_, i) => <span key={i} className={i % 9 === 0 || i % 11 === 0 ? 'hot' : ''} />)}
          <div className="cnn-filter" />
        </div>
        <div className="cnn-benefits">
          <ConceptCard en="LOCAL PATTERNS" he="דפוסים מקומיים" def="קצה, פינה, מרקם או חלק מאובייקט." />
          <ConceptCard en="INVARIANCE" he="אותו רעיון במיקום אחר" def="החתול הוא חתול גם אם הוא זז ימינה." />
          <ConceptCard en="EFFICIENCY" he="פחות פרמטרים" def="אותו פילטר משותף על כל התמונה." accent />
        </div>
      </div>
    </div>
  );
}

function ClassificationSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Classification"
        title={'המשימה הראשונה: <em>מה יש בתמונה?</em>'}
        subtitle="Image classification מחזיר תווית אחת או כמה תוויות לתמונה. זו הייתה נקודת המבחן הגדולה של ImageNet לפני שעברנו לשאלה הקשה יותר: איפה כל דבר נמצא?"
      />
      <div className="classification-demo">
        <div className="class-image">
          <span className="class-sun" />
          <span className="class-car" />
          <span className="class-road" />
        </div>
        <div className="class-scores">
          {[
            ['car', 0.91],
            ['road', 0.74],
            ['city', 0.62],
            ['cat', 0.03],
          ].map(([label, score]) => (
            <div className="class-score" key={label}>
              <span className="mono">{label}</span>
              <div><i style={{ width: `${score * 100}%` }} /></div>
              <b className="mono">{Math.round(score * 100)}%</b>
            </div>
          ))}
        </div>
      </div>
      <Highlight>Classification עונה ״מה״. Detection מוסיף את השאלה ״איפה״.</Highlight>
    </div>
  );
}

function DetectionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Object Detection"
        title={'Classification אומר מה יש בתמונה.<br />Detection אומר <em>איפה</em>.'}
        subtitle="זה ההבדל בין ״יש רכב״ לבין ״הרכב נמצא כאן, הולך להתקרב, וצריך להגיב״."
      />
      <DetectionFrame />
    </div>
  );
}

function YoloSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="YOLO"
        title={'You Only Look Once:<br /><em>לראות בזמן אמת</em>.'}
        subtitle="במקום שני שלבים איטיים של הצעות ואז סיווג, YOLO מבצע זיהוי במעבר אחד. זו קפיצה שמאפשרת רובוטיקה, רכב אוטונומי, קמעונאות חכמה ובקרה תעשייתית."
      />
      <ModelCredit
        model="YOLO"
        by="Joseph Redmon, Santosh Divvala, Ross Girshick, Ali Farhadi"
        year="2015 / 2016"
        note="המודל שהפך object detection לחוויה בזמן אמת: מבט אחד, תיבות וסיווגים יחד."
      />
      <div className="yolo-hud">
        <div className="hud-scan" />
        <div className="hud-metric"><b className="mono">60-100 FPS</b><span>real time detection</span></div>
        <div className="hud-grid">
          {Array.from({ length: 36 }).map((_, i) => <span key={i} className={i === 8 || i === 20 || i === 27 ? 'detected' : ''} />)}
        </div>
      </div>
    </div>
  );
}

function UnderstandingShiftSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="המעבר הבא"
        title={'אבל זיהוי הוא עדיין<br /><em>לא הבנה</em>.'}
        subtitle="מערכת יכולה לזהות ״אדם״, ״אופניים״ ו״כביש״ ועדיין לא להבין שאדם עומד לחצות, שהאופניים חוסמים נתיב, או שהשאלה בכלל עוסקת בבטיחות."
      />
      <div className="card-grid cols3">
        <ConceptCard en="DETECTION" he="מה ואיפה?" def="תיבות סביב אובייקטים." />
        <ConceptCard en="UNDERSTANDING" he="מה קורה פה?" def="יחסים, הקשר, סיבה ותוצאה." accent />
        <ConceptCard en="ACTION" he="מה עושים עכשיו?" def="החלטה, הסבר, אוטומציה." />
      </div>
      <Highlight>כאן מתחיל החיבור בין Vision לבין Language: צריך לדבר על מה שרואים.</Highlight>
    </div>
  );
}

function ClipSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="CLIP"
        title={'CLIP לימד תמונות וטקסט<br />להיפגש באותו <em>מרחב</em>.'}
        subtitle="במקום לאמן רק על תוויות קשיחות, CLIP לומד התאמה בין תמונה לבין תיאור. פתאום אפשר לחפש, להשוות ולסווג בעזרת שפה טבעית."
      />
      <ModelCredit
        model="CLIP"
        by="OpenAI"
        year="2021"
        note="Contrastive Language-Image Pre-training: אימון על זוגות תמונה־טקסט כדי לחבר ראייה ושפה."
      />
      <ClipSpace />
    </div>
  );
}

function MultimodalSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Multimodal Intelligence"
        title={'מודל מולטימודלי לא רק קורא.<br />הוא <em>רואה, מקשיב ומסביר</em>.'}
        subtitle="אותו מודל יכול לקבל תמונה, צילום מסך, טבלה, תרשים, וידאו או אודיו, ולענות בשפה."
      />
      <ModelCredit
        model="GPT-4V / Gemini / Claude Vision"
        by="OpenAI, Google DeepMind, Anthropic"
        year="2023 ואילך"
        note="הדור שבו מודלי שפה גדולים התחילו לקבל קלט חזותי כחלק טבעי מהשיחה."
      />
      <div className="modalities-grid">
        {[
          ['TEXT', 'מסמכים ושאלות'],
          ['IMAGE', 'תמונות וצילומי מסך'],
          ['VIDEO', 'זמן ותנועה'],
          ['AUDIO', 'דיבור וסאונד'],
          ['CHARTS', 'נתונים חזותיים'],
          ['UI', 'ממשקים ותהליכים'],
        ].map(([en, he], i) => (
          <div className="modality-card" key={en} style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="mono">{en}</span>
            <b>{he}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualReasoningSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Visual Reasoning"
        title={'הקסם העסקי הוא לא זיהוי.<br />הוא <em>הסקה חזותית</em>.'}
        subtitle="מודל טוב יכול להסתכל על גרף, מסך מוצר או צילום מסמך, ולהסיק מה לא עובד, מה חסר, ומה הצעד הבא."
      />
      <div className="reasoning-console">
        <div className="console-visual">
          <span className="chart-line c1" />
          <span className="chart-line c2" />
          <span className="chart-line c3" />
          <span className="chart-alert" />
        </div>
        <div className="console-thoughts">
          <div><b>1.</b> מזהה חריגה בגרף</div>
          <div><b>2.</b> קורא את הכותרות והמקרא</div>
          <div><b>3.</b> מחבר להקשר העסקי</div>
          <div><b>4.</b> מציע פעולה</div>
        </div>
      </div>
    </div>
  );
}

function AgentsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Vision + Agents"
        title={'כשמודל רואה מסך<br />הוא יכול גם <em>לעבוד עליו</em>.'}
        subtitle="Vision הופך את ה־Execution Layer לחזק יותר: המודל מבין UI, קורא שגיאות, משווה עיצובים, מבצע בדיקות ומפעיל כלים."
      />
      <Pipeline items={[
        { icon: '01', label: 'מתבונן', sub: 'screen / doc / image' },
        { icon: '02', label: 'מסיק', sub: 'reasoning' },
        { icon: '03', label: 'פועל', sub: 'tools' },
        { icon: '04', label: 'בודק', sub: 'verify' },
      ]} />
      <Highlight>זה הרגע שבו AI מפסיק להיות רק צ׳אט ומתחיל להיות שכבת עבודה שמבינה את העולם החזותי של העסק.</Highlight>
    </div>
  );
}

function SoundWaveSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Audio Intelligence"
        title={'ומה לגבי <em>קול?</em><br />איך מחשב “שומע”'}
        subtitle="קול הוא לא מילים בתוך המחשב. קול הוא גל לחץ באוויר. המיקרופון מודד את הגל הזה הרבה פעמים בשנייה, וכל מדידה הופכת למספר."
      />
      <div className="sound-explainer">
        <div className="sound-wave-panel">
          <div className="wave-line">
            {Array.from({ length: 34 }).map((_, i) => <span key={i} style={{ '--h': `${22 + (i % 7) * 9}px` }} />)}
          </div>
          <div className="sample-dots">
            {Array.from({ length: 18 }).map((_, i) => <i key={i} />)}
          </div>
          <div className="wave-caption mono">sound wave → samples → numbers</div>
        </div>
        <div className="spectrogram-panel">
          <div className="spectrogram-grid">
            {Array.from({ length: 72 }).map((_, i) => <span key={i} className={`energy-${(i * 7) % 5}`} />)}
          </div>
          <div className="wave-caption mono">FFT / spectrogram</div>
        </div>
      </div>
      <div className="card-grid cols3">
        <ConceptCard en="WAVE" he="גל" def="האוויר רועד. הגל מתאר שינוי לחץ לאורך זמן." />
        <ConceptCard en="SAMPLE" he="דגימה" def="המחשב מודד את עוצמת הגל בנקודות זמן רבות מאוד." accent />
        <ConceptCard en="SPECTROGRAM" he="מפה של תדרים" def="במקום לראות רק עוצמה לאורך זמן, רואים אילו תדרים חזקים בכל רגע." />
      </div>
      <Highlight>
        FFT היא דרך מתמטית לפרק גל לצלילים המרכיבים אותו: נמוכים, גבוהים, חזקים וחלשים. Spectrogram הוא פשוט “תמונה” של הפירוק הזה לאורך זמן.
      </Highlight>
    </div>
  );
}

function SpeechAIRevolutionSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Speech AI Revolution"
        title={'מהפכת ה־<em>Speech AI</em><br />הכניסה קול למוצרים אמיתיים'}
        subtitle="ברגע שמודלים התחילו להבין דיבור בצורה אמינה, קול הפך מממשק ניסיוני לשכבת עבודה: עוזרים אישיים, מוקדי שירות, זיהוי דובר ותרגום בזמן אמת."
      />
      <div className="speech-grid">
        {[
          ['Siri', 'הראתה שעוזר קולי יכול להיות חלק ממכשיר יומיומי, גם אם ההבנה הייתה מוגבלת.'],
          ['Alexa', 'הכניסה Voice UI לבית: פקודות קוליות למוזיקה, בית חכם ושאלות קצרות.'],
          ['Whisper', 'מודל של OpenAI לתמלול רב־שפתי חזק, שמקרב אותנו להבנת דיבור “בעולם האמיתי”.'],
          ['Call Centers', 'תמלול שיחות, סיכום, זיהוי כוונות, QA אוטומטי ותובנות מנציגים ולקוחות.'],
          ['Voice Biometrics', 'זיהוי דובר לפי מאפייני קול, למשל לאימות זהות או איתור התחזות.'],
          ['Real-time Translation', 'דיבור בשפה אחת, תמלול, תרגום והשמעה בשפה אחרת כמעט בזמן אמת.'],
        ].map(([title, text], i) => (
          <div className="speech-card" key={title} style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            <b>{title}</b>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <Highlight>המהפכה היא לא רק “זיהוי מילים”. היא הפיכת שיחה אנושית לדאטה שאפשר לחפש, לסכם, לנתח ולחבר לפעולה.</Highlight>
    </div>
  );
}

function EverythingEmbeddingsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="Everything Becomes Embeddings"
        title={'בסוף, כל מודאליות הופכת<br />ל־<em>Embedding</em>.'}
        subtitle="טקסט, תמונה, קול ווידאו מתחילים כחומרים שונים לגמרי. אבל מודלים מודרניים לומדים להכניס אותם למרחב סמוי משותף שבו אפשר להשוות, לחפש, להסביר ולפעול."
      />
      <div className="unified-embedding-map">
        {[
          ['TEXT', 'טקסט', 'מילים ומשפטים'],
          ['IMAGE', 'תמונה', 'פיקסלים וצורות'],
          ['AUDIO', 'קול', 'גלים ותדרים'],
          ['VIDEO', 'וידאו', 'תנועה בזמן'],
        ].map(([en, he, sub], i) => (
          <div className={`unified-input u${i + 1}`} key={en}>
            <span className="mono">{en}</span>
            <b>{he}</b>
            <p>{sub}</p>
          </div>
        ))}
        <div className="latent-core">
          <span className="mono">LATENT SPACE</span>
          <b>מרחב משותף</b>
          <p>אותה שפה מספרית לכל סוגי המידע</p>
        </div>
        <span className="latent-link l1" />
        <span className="latent-link l2" />
        <span className="latent-link l3" />
        <span className="latent-link l4" />
      </div>
      <div className="big-quote">זה סוגר את המעגל: AI לא “רואה” או “שומע” כמונו. הוא לומד להפוך הכול לייצוגים שאפשר לחשוב איתם.</div>
    </div>
  );
}

function SummarySlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <SlideHeader
        slideNum={slideNum}
        kicker="סיכום"
        title={'האבולוציה של בינה מולטימודלית<br />היא מעבר מ־<em>אותות לפעולה</em>.'}
      />
      <div className="summary-timeline">
        {[
          ['01', 'פיקסלים', 'מספרים בלי משמעות'],
          ['02', 'Features', 'כללים ותכונות ידניות'],
          ['03', 'CNNs', 'ייצוגים שנלמדים מהדאטה'],
          ['04', 'Vision + Speech', 'תמונה, וידאו וקול הופכים לאותות נלמדים'],
          ['05', 'Embeddings', 'כל מודאליות נכנסת למרחב משותף'],
          ['06', 'Multimodal Agents', 'הבנה רב־חושית שמובילה לפעולה'],
        ].map(([num, title, text]) => (
          <div className="summary-step" key={num}>
            <span className="mono">{num}</span>
            <b>{title}</b>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="big-quote">השאלה החדשה היא לא ״האם AI מזהה תמונה או קול?״ אלא <em>איזו עבודה אפשר לתת לו כשהוא מבין את העולם בכמה ערוצים?</em></div>
    </div>
  );
}

// ── Wire up ───────────────────────────────────────────────────
export const SLIDE_COMPONENTS = [
  TitleSlide,
  OpeningQuestionSlide,
  VisionProblemSlide,
  WhyVisionIsHardSlide,
  HumanVisionSlide,
  RepresentationSlide,
  LightToNumbersSlide,
  PixelsSlide,
  EdgesSlide,
  HandcraftedSlide,
  RulesTrapSlide,
  CaptchaSlide,
  RecaptchaSlide,
  LabelingSlide,
  ScannedDocsSlide,
  SceneUnderstandingSlide,
  RealTimeVisionSlide,
  MachineEyesSlide,
  DeepLearningIntroSlide,
  DeepLearningSlide,
  StatisticalRepresentationSlide,
  ImageNetSlide,
  ErrorRateSlide,
  CnnSlide,
  ClassificationSlide,
  DetectionSlide,
  YoloSlide,
  UnderstandingShiftSlide,
  ClipSlide,
  MultimodalSlide,
  VisualReasoningSlide,
  AgentsSlide,
  SoundWaveSlide,
  SpeechAIRevolutionSlide,
  EverythingEmbeddingsSlide,
  SummarySlide,
];

export default function MultimodalSlides() {
  return (
    <SlideShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="ראייה ובינה מולטימודלית"
      deckClass="deck-multimodal"
      deck="multimodal"
      surveyPath="/multimodal"
    />
  );
}
