import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css';
import './BusinessSurvey.css';

function Options({ options, value, onChange }) {
  return (
    <div className="options">
      {options.map(opt => (
        <button
          key={opt}
          className={`opt-btn ${value === opt ? 'selected' : ''}`}
          onClick={() => onChange(opt)}
          type="button"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Scale5({ value, onChange, labels = ['לא מסכים', 'מסכים מאוד'] }) {
  return (
    <div>
      <div className="scale">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            className={`scale-btn ${value === n ? 'selected' : ''}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="scale-labels">
        <span>{labels[0]}</span><span>{labels[1]}</span>
      </div>
    </div>
  );
}

function Scale10({ value, onChange, labels = ['נמוך', 'גבוה'] }) {
  return (
    <div>
      <div className="scale">
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
          <button
            key={n}
            type="button"
            className={`scale-btn ${value === n ? 'selected' : ''}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="scale-labels">
        <span>{labels[0]}</span><span>{labels[1]}</span>
      </div>
    </div>
  );
}

export default function BusinessSurvey() {
  const nav = useNavigate();
  const [form, setForm] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const filled = Object.keys(form).length;
  const total = 12;
  const pct = Math.round((filled / total) * 100);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch('/api/business/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      nav('/business/thanks');
    } catch {
      alert('שגיאה בשליחה — נסה שוב');
      setSubmitting(false);
    }
  }

  return (
    <div className="survey-page deck-business-page">
      <header className="s-header">
        <div>
          <div className="eyebrow mono">חלק 3 — סקר פתיחה</div>
          <h1>עסקים, רגולציה וחשיבה ביקורתית</h1>
        </div>
        <div className="progress-wrap">
          <span className="mono" style={{ fontSize: 11, color: 'var(--dim)' }}>{filled} / {total}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </header>

      <div className="survey-body">
        <div className="survey-left">
          <div className="intro fade-up">
            <div className="eyebrow mono" style={{ color: 'var(--accent)' }}>סקר פתיחה — עסקים ואתיקה</div>
            <h2>מה אתם <em>חושבים</em> על AI?</h2>
            <p>הסקר הזה יעזור לנו לראות איפה הכיתה עומדת ביחס לסוגיות האתיות והעסקיות של AI.</p>
          </div>

          {/* ── Section A: Industry & Adoption ── */}
          <div className="section-label mono">א׳ — תעשייה ואימוץ</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.05s' }}>
            <label className="q-label"><span className="q-num mono">01</span> באיזה תחום אתה עובד / לומד?</label>
            <Options
              options={['הייטק', 'פיננסים', 'שיווק', 'בריאות', 'חינוך', 'משפטים', 'אחר']}
              value={form.industry}
              onChange={v => set('industry', v)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.1s' }}>
            <label className="q-label"><span className="q-num mono">02</span> האם הארגון שלך משתמש ב-AI?</label>
            <Options
              options={['כן, בהרחבה', 'שימוש מסוים', 'מתכננים', 'לא']}
              value={form.adoption}
              onChange={v => set('adoption', v)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.15s' }}>
            <label className="q-label"><span className="q-num mono">03</span> מה כלי ה-AI האחרון שהשתמשת בו בעבודה?</label>
            <input
              type="text" placeholder="לדוגמה: ChatGPT לכתיבת מייל"
              className="q-input" style={{ width: '100%', maxWidth: 500 }}
              value={form.lastAITool || ''}
              onChange={e => set('lastAITool', e.target.value)}
            />
          </div>

          {/* ── Section B: Opinions ── */}
          <div className="section-label mono">ב׳ — עמדות</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.2s' }}>
            <label className="q-label"><span className="q-num mono">04</span> "AI ייצור יותר משרות ממה שיבטל"</label>
            <Scale5 value={form.jobsStatement} onChange={v => set('jobsStatement', v)} />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.25s' }}>
            <label className="q-label"><span className="q-num mono">05</span> "החלטות AI צריכות להיות ניתנות להסבר בחוק"</label>
            <Scale5 value={form.explainable} onChange={v => set('explainable', v)} />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.3s' }}>
            <label className="q-label"><span className="q-num mono">06</span> "תוכן שנוצר ב-AI צריך להיות מסומן"</label>
            <Scale5 value={form.labeled} onChange={v => set('labeled', v)} />
          </div>

          {/* ── Section C: Risks ── */}
          <div className="section-label mono">ג׳ — סיכונים</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.35s' }}>
            <label className="q-label"><span className="q-num mono">07</span> מה הסיכון הגדול ביותר של AI בעסקים?</label>
            <Options
              options={['הטיות', 'פרטיות', 'אובדן משרות', 'שגיאות', 'רגולציה', 'אחר']}
              value={form.biggestRisk}
              onChange={v => set('biggestRisk', v)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.4s' }}>
            <label className="q-label"><span className="q-num mono">08</span> כמה מוכנה התעשייה שלך לרגולציית AI?</label>
            <Scale10 value={form.regulationReady} onChange={v => set('regulationReady', v)} labels={['לא מוכנה', 'מוכנה מאוד']} />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.45s' }}>
            <label className="q-label"><span className="q-num mono">09</span> האם חברות צריכות לגלות ללקוחות שהן משתמשות ב-AI?</label>
            <Options
              options={['כן', 'לא', 'תלוי בהקשר']}
              value={form.disclosure}
              onChange={v => set('disclosure', v)}
            />
          </div>

          {/* ── Section D: Critical Thinking ── */}
          <div className="section-label mono">ד׳ — חשיבה ביקורתית</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.5s' }}>
            <label className="q-label"><span className="q-num mono">10</span> מה דבר אחד שלדעתך AI לא צריך לעשות?</label>
            <input
              type="text" placeholder="למשל: לקבל החלטות רפואיות לבד"
              className="q-input" style={{ width: '100%', maxWidth: 500 }}
              value={form.shouldNotUse || ''}
              onChange={e => set('shouldNotUse', e.target.value)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.55s' }}>
            <label className="q-label"><span className="q-num mono">11</span> כמה אתה מודאג מ-deepfakes?</label>
            <Scale10 value={form.deepfakeConcern} onChange={v => set('deepfakeConcern', v)} labels={['לא מודאג', 'מודאג מאוד']} />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.6s' }}>
            <label className="q-label"><span className="q-num mono">12</span> היית סומך על AI שיקבל החלטת גיוס?</label>
            <Options
              options={['כן', 'לא', 'רק עם ביקורת אנושית']}
              value={form.aiHiring}
              onChange={v => set('aiHiring', v)}
            />
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={submitting || filled < 8}
          >
            {submitting ? 'שלח ✓' : 'שלח ✓'}
          </button>
        </div>
      </div>
    </div>
  );
}
