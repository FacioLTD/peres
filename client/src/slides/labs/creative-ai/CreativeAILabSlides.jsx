import SlideShell from '../../shared/SlideShell';
import { ConceptCard, Highlight } from '../../shared/components';
import '../../shared/SlideShell.css';
import './CreativeAILab.css';

// ── Slide list ────────────────────────────────────────────────
export const SLIDE_LIST = [
  { id: 1,  title: 'שער' },
  { id: 2,  title: 'מ-YOLO להבנה', navNum: 'א' },
  { id: 3,  title: 'שתי שפות שונות' },
  { id: 4,  title: 'Dual Encoder' },
  { id: 5,  title: 'Contrastive Learning' },
  { id: 6,  title: 'Multimodal Reasoning', navNum: 'ב' },
  { id: 7,  title: 'Engine vs. Product', navNum: 'ג' },
  { id: 8,  title: 'מילים ולחן', navNum: 'ד' },
  { id: 9,  title: 'תסריט וויזואל', navNum: 'ה' },
  { id: 10, title: 'הנפשה ו-Deep Fake', navNum: 'ו' },
  { id: 11, title: 'סיכום 2026', navNum: 'ז' },
];

// ── Helper: Slide hero image ──────────────────────────────────
function SlideImage({ num, alt }) {
  return (
    <div className="lab-hero-image">
      <img
        src={`/labs/creative-ai/images/slide${num}.png`}
        alt={alt}
        loading="lazy"
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 1: TITLE
// ═══════════════════════════════════════════════════════════════

function TitleSlide() {
  return (
    <div className="slide fade-up">
      <div className="hero-center">
        <div className="lab-badge">Lab Session 01</div>
        <div className="hero-title">
          Creative AI &amp; <em>Multimodal Pipelines</em>
        </div>
        <div className="hero-subtitle">
          בניית Pipeline מקצה לקצה להפקת קליפ ל״מדינת משטרה״
        </div>
        <div className="hero-lecture-num">מהנדסים ← אמנים</div>
        <div className="instructor-block">
          <div className="instructor-name">אוריאל אהרוני</div>
          <div className="instructor-role">CEO &amp; Co-Founder</div>
          <div className="instructor-companies mono">
            Facio · Choco · InsurMedix
          </div>
        </div>
      </div>
      <SlideImage num={1} alt="Neural networks evolving into music and film" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 2: FROM YOLO TO SEMANTIC UNDERSTANDING
// ═══════════════════════════════════════════════════════════════

function YoloToVLMSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — חזרה</div>
      <h2>
        מ-YOLO ל<em>הבנה סמנטית</em>
      </h2>
      <p className="slide-sub">
        המעבר מזיהוי אובייקטים לתוך Boundary Boxes — להבנה עמוקה של הקשרים,
        כוונות ומשמעות בתוך הסצנה.
      </p>

      <div className="lab-compare-grid">
        <div className="lab-compare-card" style={{ animationDelay: '0.2s' }}>
          <div className="lab-compare-title">YOLO — DETECTION</div>
          <div className="lab-compare-main">״איפה האופנוע?״</div>
          <div className="lab-compare-desc">
            זיהוי אובייקטים בתוך Boundary Boxes. מיקום, מחלקה, רמת ביטחון.
            <br />
            <strong>Output:</strong> קופסא + תווית.
          </div>
        </div>
        <div className="lab-compare-vs">→</div>
        <div
          className="lab-compare-card magenta"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="lab-compare-title">VLM — UNDERSTANDING</div>
          <div className="lab-compare-main">״למה האופנוע נוסע למדבר?״</div>
          <div className="lab-compare-desc">
            הבנה סמנטית של הקשרים, כוונות, רגשות וסיפור.
            <br />
            <strong>Output:</strong> תיאור, ניתוח, שיחה.
          </div>
        </div>
      </div>

      <SlideImage num={2} alt="Latent space vector field with text and image converging" />

      <Highlight>
        ה-<em>Shared Latent Space</em> הוא המרחב שבו מילים ותמונות נפגשות —
        ומאפשרות למודל אחד לעבוד על שניהם.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 3: THE PROBLEM — TWO DIFFERENT LANGUAGES
// ═══════════════════════════════════════════════════════════════

function TwoLanguagesSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הבעיה</div>
      <h2>
        שתי <em>שפות</em> שונות לגמרי
      </h2>
      <p className="slide-sub">
        מודלי ראייה כמו YOLO למדו רק &quot;לתייג&quot;. הם ראו אופנוע ולמדו
        שהתווית היא &quot;Motorcycle&quot; — אבל לא הבינו מה זה אופנוע. עבורם
        זה היה אוסף פיקסלים שמוביל לאינדקס מסוים במערך.
      </p>

      <div className="lab-languages-split">
        <div
          className="lab-language-card"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="lab-language-header">
            <div className="lab-language-icon">🖼️</div>
            <div className="lab-language-title">שפת התמונה</div>
          </div>
          <ul className="lab-language-features">
            <li>וקטור של תכונות ויזואליות</li>
            <li>צבע, צורה, טקסטורה, קצוות</li>
            <li>מרחב מספרי &quot;גולמי&quot; — בלי משמעות</li>
          </ul>
          <div className="lab-language-vector">
            [0.82, -0.14, 0.67, ...] (dim: 2048)
          </div>
        </div>
        <div
          className="lab-language-card magenta"
          style={{ animationDelay: '0.45s' }}
        >
          <div className="lab-language-header">
            <div className="lab-language-icon">📝</div>
            <div className="lab-language-title">שפת הטקסט</div>
          </div>
          <ul className="lab-language-features">
            <li>וקטור של משמעויות סמנטיות</li>
            <li>הקשר, רגש, דקדוק, כוונה</li>
            <li>מרחב מספרי &quot;עשיר&quot; — מלא משמעות</li>
          </ul>
          <div className="lab-language-vector">
            [0.31, 0.55, -0.78, ...] (dim: 768)
          </div>
        </div>
      </div>

      <Highlight>
        הבעיה: שני המרחבים <em>לא מדברים</em> אחד עם השני. הוקטור של תמונת
        אופנוע והוקטור של המילה &quot;אופנוע&quot; נמצאים בעולמות נפרדים
        לחלוטין.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 4: THE SOLUTION — DUAL ENCODER
// ═══════════════════════════════════════════════════════════════

function DualEncoderSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">שקף {slideNum} — הפתרון</div>
      <h2>
        ארכיטקטורת <em>Dual Encoder</em>
      </h2>
      <p className="slide-sub">
        לא משתמשים במודל אחד, אלא בשני &quot;מומחים&quot; שעובדים יחד — כל
        אחד מתמחה בשפה שלו, ושכבת Projection מחברת ביניהם.
      </p>

      <div className="lab-dual-encoder">
        <div
          className="lab-encoder-card"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="lab-encoder-icon">👁️</div>
          <div className="lab-encoder-title">IMAGE ENCODER</div>
          <div className="lab-encoder-name">Vision Transformer</div>
          <div className="lab-encoder-desc">
            מפרק את התמונה לתכונות ויזואליות — קצוות, צורות, מרקמים, יחסים
            מרחביים.
          </div>
          <div className="lab-encoder-vector">Output: vec(2048)</div>
        </div>

        <div className="lab-encoder-merge">
          <div className="lab-encoder-merge-icon">⚡</div>
          <div className="lab-encoder-merge-label">Projection</div>
        </div>

        <div
          className="lab-encoder-card magenta"
          style={{ animationDelay: '0.45s' }}
        >
          <div className="lab-encoder-icon">💬</div>
          <div className="lab-encoder-title">TEXT ENCODER</div>
          <div className="lab-encoder-name">Transformer</div>
          <div className="lab-encoder-desc">
            הופך משפטים למשמעויות — הקשר, רגש, יחסים בין מילים.
          </div>
          <div className="lab-encoder-vector">Output: vec(768)</div>
        </div>
      </div>

      <div className="lab-projection">
        <div className="lab-projection-title">Linear Projection Layer</div>
        <div className="lab-projection-flow">
          <div
            className="lab-projection-box cyan"
            style={{ animationDelay: '0.3s' }}
          >
            Image: dim 2048
          </div>
          <div className="lab-projection-arrow">→</div>
          <div
            className="lab-projection-box shared"
            style={{ animationDelay: '0.5s' }}
          >
            Shared: dim 512
          </div>
          <div className="lab-projection-arrow">←</div>
          <div
            className="lab-projection-box magenta"
            style={{ animationDelay: '0.3s' }}
          >
            Text: dim 768
          </div>
        </div>
        <div className="lab-projection-desc">
          שכבה מתמטית פשוטה (Linear Projection) שדוחסת / מרחיבה את שני
          הוקטורים לאותו מימד בדיוק. עכשיו הם מדברים באותה &quot;שפה&quot;
          וקטורית.
        </div>
      </div>

      <Highlight>
        הסוד: לא צריך לשנות את המומחים. רק צריך <em>שכבת תרגום</em> שגורמת
        לשתי השפות להיפגש באותו מרחב.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 5: THE MECHANICS — CONTRASTIVE LEARNING
// ═══════════════════════════════════════════════════════════════

function ContrastiveLearningSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">
        שקף {slideNum} — המכניקה
      </div>
      <h2>
        למידה <em>ניגודית</em>
      </h2>
      <p className="slide-sub">
        איך המודל יודע שהפיקסלים של ניידת משטרה קשורים למילה
        &quot;משטרה&quot;? דרך מיליוני זוגות של (תמונה, טקסט) מהאינטרנט.
      </p>

      <div className="lab-contrastive-grid">
        <div
          className="lab-contrastive-pair"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="lab-contrastive-item">
            🖼️ תמונת ניידת משטרה
            <span className="mono">IMAGE VECTOR</span>
          </div>
          <div className="lab-contrastive-arrow">⟷</div>
          <div className="lab-contrastive-item">
            📝 &quot;ניידת משטרה ברחוב&quot;
            <span className="mono">TEXT VECTOR</span>
          </div>
          <div className="lab-contrastive-score high">✓ 0.94</div>
        </div>

        <div
          className="lab-contrastive-pair negative"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="lab-contrastive-item">
            🖼️ תמונת ניידת משטרה
            <span className="mono">IMAGE VECTOR</span>
          </div>
          <div className="lab-contrastive-arrow">⟷</div>
          <div className="lab-contrastive-item">
            📝 &quot;חופש&quot;
            <span className="mono">TEXT VECTOR</span>
          </div>
          <div className="lab-contrastive-score low">✗ 0.12</div>
        </div>

        <div
          className="lab-contrastive-pair negative"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="lab-contrastive-item">
            🖼️ תמונת ניידת משטרה
            <span className="mono">IMAGE VECTOR</span>
          </div>
          <div className="lab-contrastive-arrow">⟷</div>
          <div className="lab-contrastive-item">
            📝 &quot;אופנוע במדבר&quot;
            <span className="mono">TEXT VECTOR</span>
          </div>
          <div className="lab-contrastive-score low">✗ 0.08</div>
        </div>
      </div>

      <div className="lab-formula">
        <div className="lab-formula-label">Cosine Similarity</div>
        <div className="lab-formula-text">
          cos(θ) = (A · B) / (‖A‖ · ‖B‖)
        </div>
      </div>

      <Highlight>
        <strong>האפקט:</strong> ה-Image Encoder לומד שתכונות ויזואליות כמו מדים,
        כחול-לבן, סירנה — הן אלו שמייצגות את המושג <em>&quot;מדינת
        משטרה&quot;</em>. המודל <em>מושך</em> זוגות תואמים ו<em>דוחף</em> זוגות
        לא-תואמים.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 6: MULTIMODAL REASONING
// ═══════════════════════════════════════════════════════════════

function MultimodalReasoningSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">
        שקף {slideNum} — החוט המקשר
      </div>
      <h2>
        Multimodal <em>Reasoning</em>
      </h2>
      <p className="slide-sub">
        האם AI מייצר מ-0? פילוסופיה של &quot;סינתזה מחדש&quot;. היכולת להבין
        רגש בטקסט ולתרגם אותו לתדר סאונד.
      </p>

      <SlideImage num={3} alt="Fiber optic brain intertwining audio, text and pixels" />

      <div className="lab-dilemma-grid">
        <div
          className="lab-dilemma-card"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="lab-dilemma-icon">🧠</div>
          <div className="lab-dilemma-title">סינתזה ≠ יצירה</div>
          <div className="lab-dilemma-desc">
            AI לא ממציא — הוא מרכיב מחדש דפוסים שלמד. סינתזה סטטיסטית, לא
            השראה אנושית.
          </div>
        </div>
        <div
          className="lab-dilemma-card"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="lab-dilemma-icon">🔀</div>
          <div className="lab-dilemma-title">Reasoning Across Media</div>
          <div className="lab-dilemma-desc">
            להבין רגש בטקסט ולתרגם אותו לתדר סאונד, לתמונה, לתנועה. זה לב ה-Pipeline שלנו.
          </div>
        </div>
        <div
          className="lab-dilemma-card"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="lab-dilemma-icon">⚖️</div>
          <div className="lab-dilemma-title">זכויות יוצרים 2026</div>
          <div className="lab-dilemma-desc">
            למי שייך ה-Output? כשהמודל אומן על יצירות אנושיות ומייצר משהו
            &quot;חדש&quot; — מי הבעלים?
          </div>
        </div>
      </div>

      <Highlight>
        ה-<em>Reasoning Across Media</em> הוא מה שמפריד בין כלי AI לבין
        Pipeline אינטליגנטי. היום נבנה אחד כזה.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 4: ENGINE VS PRODUCT
// ═══════════════════════════════════════════════════════════════

function EngineVsProductSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">
        שקף {slideNum} — The Engine vs. The UI
      </div>
      <h2>
        המודל מול <em>המוצר</em>
      </h2>
      <p className="slide-sub">
        הבנת המגבלות וה-Guardrails של הכלי מול כוחו של המודל.
      </p>

      <div className="lab-iceberg">
        <img
          src="/labs/creative-ai/images/slide4.png"
          alt="Iceberg metaphor — Product above, Engine below"
          loading="lazy"
        />
        <div className="lab-iceberg-labels">
          <div className="lab-iceberg-label top">
            <div className="label-title">The Product — מעל המים</div>
            <div className="label-items">
              ChatGPT · Midjourney · Notetakers
              <br />
              ממשק, Guardrails, חוויית משתמש
            </div>
          </div>
          <div className="lab-iceberg-label bottom">
            <div className="label-title">The Engine — מתחת למים</div>
            <div className="label-items">
              GPT-4o · Flux.1 · Whisper
              <br />
              ה&quot;מוח&quot; — מודלים בלי ממשק
            </div>
          </div>
        </div>
      </div>

      <Highlight>
        למה זה חשוב? כי היום נעבוד <em>ישירות עם המנועים</em> — מתחת למים.
        לא דרך ממשקים מסחריים.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 5: STAGE 1 — WORDS, MELODY & AUDIO SYNTHESIS
// ═══════════════════════════════════════════════════════════════

function AudioSynthesisSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">
        שקף {slideNum} — שלב 1
      </div>
      <h2>
        מילים, לחן ו-<em>Audio Synthesis</em>
      </h2>
      <p className="slide-sub">
        מגרסה גולמית לגרסה מנוקדת ומוזיקלית — דרך מודל שפה ומחולל גלי קול.
      </p>

      <SlideImage num={5} alt="Vintage microphone with Hebrew letters flowing to synthesizer" />

      <div className="lab-pipeline">
        <div className="lab-pipeline-step" style={{ animationDelay: '0.1s' }}>
          <div className="lab-pipeline-num">01</div>
          <div className="lab-pipeline-label">טקסט גולמי</div>
          <div className="lab-pipeline-sub">מילים, רעיון, מסר</div>
        </div>
        <div className="lab-pipeline-step" style={{ animationDelay: '0.2s' }}>
          <div className="lab-pipeline-num">02</div>
          <div className="lab-pipeline-label">חידוד ב-LLM</div>
          <div className="lab-pipeline-sub">ניקוד, קצב, מוזיקליות</div>
        </div>
        <div className="lab-pipeline-step" style={{ animationDelay: '0.3s' }}>
          <div className="lab-pipeline-num">03</div>
          <div className="lab-pipeline-label">לחן אנושי</div>
          <div className="lab-pipeline-sub">הקלטת Reference</div>
        </div>
        <div className="lab-pipeline-step" style={{ animationDelay: '0.4s' }}>
          <div className="lab-pipeline-num">04</div>
          <div className="lab-pipeline-label">Audio-to-Audio</div>
          <div className="lab-pipeline-sub">סינתזה על הלחן</div>
        </div>
        <div className="lab-pipeline-step" style={{ animationDelay: '0.5s' }}>
          <div className="lab-pipeline-num">05</div>
          <div className="lab-pipeline-label">שיר מוכן</div>
          <div className="lab-pipeline-sub">Output סופי</div>
        </div>
      </div>

      <Highlight>
        ה-<em>Multilatent Spaces</em> — החיבור בין מודל שפה למחולל גלי קול —
        הוא מה שמאפשר למילים להפוך למוזיקה.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 6: STAGE 2 — SCRIPT & VISUAL SHOTS
// ═══════════════════════════════════════════════════════════════

function ScriptAndVisualsSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">
        שקף {slideNum} — שלב 2
      </div>
      <h2>
        תסריט ו<em>שוטים חזותיים</em>
      </h2>
      <p className="slide-sub">
        כתיבת תסריט ב-Gemini, הנחיות בימוי חתרניות, ויצירת עולם ויזואלי אחיד
        ב-Imagine Art.
      </p>

      <SlideImage num={6} alt="Storyboard on glass screen — Tel Aviv night scenes" />

      <div className="lab-stage-grid">
        <div className="lab-stage-card" style={{ animationDelay: '0.2s' }}>
          <div className="lab-stage-icon">📝</div>
          <div className="lab-stage-title">תסריט ב-Gemini</div>
          <div className="lab-stage-desc">
            הנחיות בימוי חתרניות. כתיבת סצנות עם טון, אווירה ותנועת מצלמה.
          </div>
        </div>
        <div className="lab-stage-card" style={{ animationDelay: '0.4s' }}>
          <div className="lab-stage-icon">🎨</div>
          <div className="lab-stage-title">Imagine Art</div>
          <div className="lab-stage-desc">
            יצירת עולם ויזואלי אחיד. Character Consistency בין פריימים.
          </div>
        </div>
        <div className="lab-stage-card" style={{ animationDelay: '0.6s' }}>
          <div className="lab-stage-icon">⚙️</div>
          <div className="lab-stage-title">פרמטרים קריטיים</div>
          <div className="lab-stage-desc">
            שליטה מדויקת בתוצר דרך הגדרות המודל.
          </div>
        </div>
      </div>

      <div className="lab-param-row">
        <div className="lab-param-card" style={{ animationDelay: '0.5s' }}>
          <div className="lab-param-name">CFG Scale</div>
          <div className="lab-param-desc">
            Classifier-Free Guidance — כמה המודל &quot;מציית&quot; להנחיה.
            ערך גבוה = צייתני יותר. ערך נמוך = יצירתי יותר.
          </div>
        </div>
        <div className="lab-param-card" style={{ animationDelay: '0.7s' }}>
          <div className="lab-param-name">Seed</div>
          <div className="lab-param-desc">
            מספר אקראי ששולט ברעש ההתחלתי. אותו Seed = אותה תוצאה. הדרך לשחזר
            הצלחה ולבנות עקביות.
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 7: STAGE 3 — ANIMATION & DEEP FAKE
// ═══════════════════════════════════════════════════════════════

function AnimationDeepFakeSlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">
        שקף {slideNum} — שלב 3 (השיא)
      </div>
      <h2>
        הנפשה ו-<em>Deep Fake</em>
      </h2>
      <p className="slide-sub">
        איך שומרים על יציבות הפיקסלים בווידאו? איך מסנכרנים הבעות פנים
        לאודיו? והסצנה הסוריאליסטית.
      </p>

      <SlideImage num={7} alt="Digital avatars singing on stage with tracking points" />

      <div className="lab-stage-grid">
        <div className="lab-stage-card" style={{ animationDelay: '0.2s' }}>
          <div className="lab-stage-icon">🎬</div>
          <div className="lab-stage-title">Temporal Consistency</div>
          <div className="lab-stage-desc">
            שמירה על יציבות הפיקסלים בין פריימים. בלי Flickering, בלי שינויים
            פתאומיים.
          </div>
        </div>
        <div className="lab-stage-card" style={{ animationDelay: '0.4s' }}>
          <div className="lab-stage-icon">🗣️</div>
          <div className="lab-stage-title">Lip Sync &amp; Landmarks</div>
          <div className="lab-stage-desc">
            מיפוי נקודות ציון על הפנים (Landmark Mapping) וסנכרון תנועת שפתיים
            לאודיו.
          </div>
        </div>
        <div className="lab-stage-card" style={{ animationDelay: '0.6s' }}>
          <div className="lab-stage-icon">🎭</div>
          <div className="lab-stage-title">The Scene</div>
          <div className="lab-stage-desc">
            דואט סוריאליסטי של &quot;מדינת משטרה&quot; — שילוב טכנולוגיה, אמנות
            וביקורת.
          </div>
        </div>
      </div>

      <Highlight>
        זו נקודת השיא: <em>כל שכבות ה-Pipeline</em> — טקסט, אודיו, תמונה,
        וידאו — מתמזגות לתוצר אחד.
      </Highlight>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 8: SUMMARY — THE 2026 STRATEGY
// ═══════════════════════════════════════════════════════════════

function SummarySlide({ slideNum }) {
  return (
    <div className="slide fade-up">
      <div className="slide-eyebrow mono">
        שקף {slideNum} — סיכום
      </div>
      <h2>
        האסטרטגיה של <em>2026</em>
      </h2>

      <SlideImage num={8} alt="Person on mountain of digital debris looking at binary sunrise" />

      <div className="lab-outcome-row">
        <div
          className="lab-outcome-card"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="lab-outcome-num">01</div>
          <div className="lab-outcome-label">מביצוע לאוצרות</div>
          <div className="lab-outcome-desc">
            Execution → Curation. התפקיד החדש של היוצר הוא לכוון, לבחור
            ולערוך — לא לייצר הכל מ-0.
          </div>
        </div>
        <div
          className="lab-outcome-card"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="lab-outcome-num">02</div>
          <div className="lab-outcome-label">Multimodal בארגון</div>
          <div className="lab-outcome-desc">
            ייעול כל שרשרת הערך דרך בינה מלאכותית. מטקסט, דרך תמונה, ועד
            וידאו ואודיו.
          </div>
        </div>
        <div
          className="lab-outcome-card"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="lab-outcome-num">03</div>
          <div className="lab-outcome-label">התוצר הסופי</div>
          <div className="lab-outcome-desc">
            &quot;מדינת משטרה&quot; — השילוב בין טכנולוגיה, אמנות וביקורת.
            Pipeline מקצה לקצה.
          </div>
        </div>
      </div>

      <div className="lab-closing-divider" />

      <div className="big-quote">
        המעבר מ-<em>Analysis</em> ל-<em>Synthesis</em> הוא לא רק שינוי טכנולוגי.
        <br />
        זו מהפכה בתפקיד האדם בתוך התהליך היצירתי.
      </div>
    </div>
  );
}

// ── Wire up ───────────────────────────────────────────────────

export const SLIDE_COMPONENTS = [
  TitleSlide,
  YoloToVLMSlide,
  TwoLanguagesSlide,
  DualEncoderSlide,
  ContrastiveLearningSlide,
  MultimodalReasoningSlide,
  EngineVsProductSlide,
  AudioSynthesisSlide,
  ScriptAndVisualsSlide,
  AnimationDeepFakeSlide,
  SummarySlide,
];

export default function CreativeAILabSlides() {
  return (
    <SlideShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="Lab 01 — Creative AI"
      deckClass="deck-lab-creative"
      deck="lab-creative-ai"
      surveyPath="/labs/creative-ai"
    />
  );
}
