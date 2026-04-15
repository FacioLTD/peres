import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css';
import './LLMSurvey.css';

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

function Scale({ value, onChange, labels = ['נמוך', 'גבוה'] }) {
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

export default function LLMSurvey() {
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
      await fetch('/api/llm/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      nav('/llm/thanks');
    } catch {
      alert('שגיאה בשליחה — נסה שוב');
      setSubmitting(false);
    }
  }

  return (
    <div className="survey-page deck-llm-page">
      {/* Header */}
      <header className="s-header">
        <div>
          <div className="eyebrow mono">חלק 2 — סקר פתיחה</div>
          <h1>מודלי שפה ו-AI גנרטיבי</h1>
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
          {/* Intro */}
          <div className="intro fade-up">
            <div className="eyebrow mono" style={{ color: 'var(--accent)' }}>סקר פתיחה — LLMs</div>
            <h2>איך אתם <em>משתמשים</em> ב-AI?</h2>
            <p>הסקר הזה יעזור לנו לבנות תמונה של הכיתה — ולאיך כולכם עובדים עם מודלי שפה.</p>
          </div>

          {/* ── Section A: Tools & Frequency ── */}
          <div className="section-label mono">א׳ — כלים ותדירות</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.05s' }}>
            <label className="q-label"><span className="q-num mono">01</span> באיזה כלי AI אתה משתמש הכי הרבה?</label>
            <Options
              options={['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'אחר', 'לא משתמש']}
              value={form.tool}
              onChange={v => set('tool', v)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.1s' }}>
            <label className="q-label"><span className="q-num mono">02</span> כמה פעמים בשבוע אתה משתמש ב-AI?</label>
            <Options
              options={['כלל לא', '1–3 פעמים', '4–7 פעמים', 'כל יום', 'כל יום, כמה פעמים']}
              value={form.frequency}
              onChange={v => set('frequency', v)}
            />
          </div>

          {/* ── Section B: Usage Patterns ── */}
          <div className="section-label mono">ב׳ — דפוסי שימוש</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.15s' }}>
            <label className="q-label"><span className="q-num mono">03</span> מה אורך ה-prompt הממוצע שלך (במילים)?</label>
            <input
              type="number" min="1" max="500" placeholder="לדוגמה: 25"
              className="q-input"
              value={form.promptLength || ''}
              onChange={e => set('promptLength', +e.target.value)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.2s' }}>
            <label className="q-label"><span className="q-num mono">04</span> האם בדרך כלל מקבל תשובה טובה בניסיון הראשון?</label>
            <Options
              options={['תמיד', 'בדרך כלל', 'לפעמים', 'לעיתים רחוקות']}
              value={form.firstTry}
              onChange={v => set('firstTry', v)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.25s' }}>
            <label className="q-label"><span className="q-num mono">05</span> השתמשת ב-AI ליצירת תמונות?</label>
            <Options
              options={['כן', 'לא']}
              value={form.usedImageGen}
              onChange={v => set('usedImageGen', v)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.3s' }}>
            <label className="q-label"><span className="q-num mono">06</span> השתמשת ב-AI לכתיבת קוד?</label>
            <Options
              options={['כן', 'לא']}
              value={form.usedCodeGen}
              onChange={v => set('usedCodeGen', v)}
            />
          </div>

          {/* ── Section C: Trust & Understanding ── */}
          <div className="section-label mono">ג׳ — אמון והבנה</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.35s' }}>
            <label className="q-label"><span className="q-num mono">07</span> עד כמה אתה סומך על טקסט שנוצר ב-AI?</label>
            <Scale value={form.trust} onChange={v => set('trust', v)} labels={['לא סומך', 'סומך מאוד']} />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.4s' }}>
            <label className="q-label"><span className="q-num mono">08</span> עד כמה אתה מרגיש שה-AI מבין אותך?</label>
            <Scale value={form.understand} onChange={v => set('understand', v)} labels={['לא מבין', 'מבין מצוין']} />
          </div>

          {/* ── Section D: Impact ── */}
          <div className="section-label mono">ד׳ — השפעה</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.45s' }}>
            <label className="q-label"><span className="q-num mono">09</span> כמה AI שינה את העבודה היומיומית שלך?</label>
            <Scale value={form.workflowImpact} onChange={v => set('workflowImpact', v)} labels={['לא שינה', 'שינה הכל']} />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.5s' }}>
            <label className="q-label"><span className="q-num mono">10</span> מה השיחה הארוכה ביותר שניהלת עם AI?</label>
            <Options
              options={['1–5 הודעות', '6–15 הודעות', '16–30 הודעות', '30+ הודעות']}
              value={form.longestConvo}
              onChange={v => set('longestConvo', v)}
            />
          </div>

          {/* ── Section E: Free Text ── */}
          <div className="section-label mono">ה׳ — הפרומפט שלך</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.55s' }}>
            <label className="q-label"><span className="q-num mono">11</span> כתוב במשפט אחד: מה אתה עושה? (נשתמש ב-tokenization חי)</label>
            <input
              type="text" placeholder="לדוגמה: אני סטודנט לתקשורת ועובד בהייטק"
              className="q-input" style={{ width: '100%', maxWidth: 500 }}
              value={form.samplePrompt || ''}
              onChange={e => set('samplePrompt', e.target.value)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.6s' }}>
            <label className="q-label"><span className="q-num mono">12</span> מה הדבר הכי מפתיע שראית AI עושה?</label>
            <input
              type="text" placeholder="תאר בקצרה..."
              className="q-input" style={{ width: '100%', maxWidth: 500 }}
              value={form.surprisingAI || ''}
              onChange={e => set('surprisingAI', e.target.value)}
            />
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={submitting || filled < 8}
          >
            {submitting ? 'שולח...' : 'שלח ✓'}
          </button>
        </div>
      </div>
    </div>
  );
}
