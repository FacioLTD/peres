import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css';

const STRENGTH = [
  { label: 'ממוצע עבר',    dots: 5 },
  { label: 'שינה',          dots: 4 },
  { label: 'נוכחות',        dots: 4 },
  { label: 'מין',           dots: 3 },
  { label: 'גיל',           dots: 3 },
  { label: 'ביטחון עצמי',   dots: 3 },
  { label: 'שעות לימוד',    dots: 2 },
  { label: 'שימוש ב-AI',    dots: -1 }, // -1 = unknown
];

function Dots({ n }) {
  if (n === -1) return (
    <div className="dots">
      {[0,1,2,3,4].map(i => <span key={i} className="dot unknown" />)}
    </div>
  );
  return (
    <div className="dots">
      {[0,1,2,3,4].map(i => <span key={i} className={`dot ${i < n ? 'filled' : ''}`} />)}
    </div>
  );
}

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

function Scale({ value, onChange }) {
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
        <span>נמוך</span><span>גבוה</span>
      </div>
    </div>
  );
}

export default function Survey() {
  const nav = useNavigate();
  const [form, setForm] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const filled = Object.keys(form).length;
  const pct = Math.round((filled / 12) * 100);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      nav('/thanks');
    } catch {
      alert('שגיאה בשליחה — נסה שוב');
      setSubmitting(false);
    }
  }

  return (
    <div className="survey-page">
      {/* Header */}
      <header className="s-header">
        <div>
          <div className="eyebrow mono">הרצאה 1 — ניסוי פתיחה</div>
          <h1>מבוא לבינה מלאכותית</h1>
        </div>
        <div className="progress-wrap">
          <span className="mono" style={{ fontSize: 11, color: 'var(--dim)' }}>{filled} / 12</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </header>

      <div className="survey-body">
        <div className="survey-left">
          {/* Intro */}
          <div className="intro fade-up">
            <div className="eyebrow mono" style={{ color: 'var(--accent)' }}>ניסוי פתיחה</div>
            <h2>אתם ה<em>data</em>.</h2>
            <p>מלאו את הסקר הבא. בדקות הקרובות ניצור יחד dataset אמיתי של הכיתה — ונשתמש בו כדי להבין איך AI באמת עובד.</p>
          </div>

          {/* ── Section A ── */}
          <div className="section-label mono">א׳ — פרטים אישיים</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.05s' }}>
            <label className="q-label"><span className="q-num mono">01</span> מין</label>
            <Options
              options={['זכר','נקבה','אחר','מעדיף/ת לא לציין']}
              value={form.q1}
              onChange={v => set('q1', v)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.1s' }}>
            <label className="q-label"><span className="q-num mono">02</span> גיל</label>
            <input
              type="number" min="18" max="65" placeholder="לדוגמה: 24"
              className="q-input"
              value={form.q2 || ''}
              onChange={e => set('q2', +e.target.value)}
            />
          </div>

          {/* ── Section B ── */}
          <div className="section-label mono">ב׳ — ביצועים עבר</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.15s' }}>
            <label className="q-label"><span className="q-num mono">03</span> ממוצע ציונים כללי עד עכשיו</label>
            <input
              type="number" min="0" max="100" placeholder="לדוגמה: 82"
              className="q-input"
              value={form.q3 || ''}
              onChange={e => set('q3', +e.target.value)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.2s' }}>
            <label className="q-label"><span className="q-num mono">04</span> ציון בקורס הדומה ביותר לזה</label>
            <input
              type="number" min="0" max="100" placeholder="לדוגמה: 78"
              className="q-input"
              value={form.q4 || ''}
              onChange={e => set('q4', +e.target.value)}
            />
          </div>

          {/* ── Section C ── */}
          <div className="section-label mono">ג׳ — שינה</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.25s' }}>
            <label className="q-label"><span className="q-num mono">05</span> כמה שעות אתה ישן בממוצע בלילה?</label>
            <Options
              options={['5 שעות ↓','6 שעות','7 שעות','8+ שעות']}
              value={form.q5}
              onChange={v => set('q5', v)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.3s' }}>
            <label className="q-label"><span className="q-num mono">06</span> שעות השינה שלך הן:</label>
            <Options
              options={['קבועות — אותה שעה כל יום','משתנות — תלוי בלוח הזמנים']}
              value={form.q6}
              onChange={v => set('q6', v)}
            />
          </div>

          {/* ── Section D ── */}
          <div className="section-label mono">ד׳ — נוכחות והשקעה</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.35s' }}>
            <label className="q-label"><span className="q-num mono">07</span> כמה אחוז מהשיעורים אתה מתכנן להגיע?</label>
            <Options
              options={['פחות מ-70%','70%–85%','85%–100%']}
              value={form.q7}
              onChange={v => set('q7', v)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.4s' }}>
            <label className="q-label"><span className="q-num mono">08</span> כמה שעות לימוד בשבוע אתה מתכנן?</label>
            <Options
              options={['0–1 שעות','2–3 שעות','4–5 שעות','6+ שעות']}
              value={form.q8}
              onChange={v => set('q8', v)}
            />
          </div>

          {/* ── Section E ── */}
          <div className="section-label mono">ה׳ — מוטיבציה</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.45s' }}>
            <label className="q-label"><span className="q-num mono">09</span> עד כמה אתה מעוניין בנושא הקורס?</label>
            <Scale value={form.q9} onChange={v => set('q9', v)} />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.5s' }}>
            <label className="q-label"><span className="q-num mono">10</span> עד כמה אתה בטוח שתצליח?</label>
            <Scale value={form.q10} onChange={v => set('q10', v)} />
          </div>

          {/* ── Section F ── */}
          <div className="section-label mono">ו׳ — AI ותחזית</div>

          <div className="q-block fade-up" style={{ animationDelay: '0.55s' }}>
            <label className="q-label"><span className="q-num mono">11</span> כמה פעמים בשבוע אתה משתמש ב-AI?</label>
            <Options
              options={['כלל לא','1–3 פעמים','4–7 פעמים','כל יום, כמה פעמים']}
              value={form.q11}
              onChange={v => set('q11', v)}
            />
          </div>

          <div className="q-block fade-up" style={{ animationDelay: '0.6s' }}>
            <label className="q-label"><span className="q-num mono">12</span> מה הציון שאתה מצפה לקבל?</label>
            <input
              type="number" min="0" max="100" placeholder="לדוגמה: 85"
              className="q-input"
              value={form.q12 || ''}
              onChange={e => set('q12', +e.target.value)}
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

        {/* Sidebar */}
        <aside className="survey-right">
          <div className="sidebar-card">
            <div className="sidebar-title mono">עוצמת מנבאים</div>
            {STRENGTH.map(({ label, dots }) => (
              <div key={label} className="strength-row">
                <span>{label}</span>
                <Dots n={dots} />
              </div>
            ))}
          </div>

          <div className="sidebar-card" style={{ marginTop: 16 }}>
            <div className="sidebar-title mono">מה זה features?</div>
            <p className="sidebar-text">
              כל שאלה בסקר היא <strong>feature</strong> — משתנה שמתאר אותך. הציון הצפוי הוא ה-<strong style={{ color: 'var(--accent)' }}>target</strong>.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
