import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useStats } from '../../hooks/useStats';
import './SlideShell.css';

// ── New submission toast ──────────────────────────────────────
function NewSubmissionToast({ visible }) {
  return (
    <div className={`submission-toast ${visible ? 'show' : ''}`}>
      <span className="toast-dot" />
      תגובה חדשה נכנסה!
    </div>
  );
}

// ── QR Overlay ────────────────────────────────────────────────
function QROverlay({ show, onClose, surveyUrl }) {
  if (!show) return null;
  return (
    <div className="qr-overlay" onClick={onClose}>
      <div className="qr-card" onClick={e => e.stopPropagation()}>
        <div className="qr-title mono">סקן למלא את הסקר</div>
        <QRCodeSVG value={surveyUrl} size={220} bgColor="transparent" fgColor="currentColor" level="M" />
        <div className="qr-url mono">{surveyUrl}</div>
        <button className="qr-close" onClick={onClose}>סגור ✕</button>
      </div>
    </div>
  );
}

/**
 * SlideShell — reusable slide deck frame.
 *
 * @param {Object[]} slideList       - Array of {id, title, navNum?}
 * @param {Function[]} slideComponents - Array of React components (same order as slideList)
 * @param {string} deckTitle         - Title shown in sidebar header
 * @param {string} deckClass         - CSS class for theme override (e.g. 'deck-llm')
 * @param {string} deck              - Deck identifier for API/WebSocket ('foundations'|'llm'|'business')
 * @param {string} surveyPath        - URL path to this deck's survey (e.g. '/llm')
 */
export default function SlideShell({
  slideList,
  slideComponents,
  deckTitle,
  deckClass = '',
  deck = 'foundations',
  surveyPath = '/',
}) {
  const [current, setCurrent] = useState(0);
  const [showQR, setShowQR]   = useState(false);
  const { stats, connected, newFlash } = useStats(deck);

  const SlideComp = slideComponents[current];
  const surveyUrl = `${window.location.origin}${surveyPath}`;

  return (
    <div className={`slides-page ${deckClass}`}>
      <NewSubmissionToast visible={newFlash} />
      <QROverlay show={showQR} onClose={() => setShowQR(false)} surveyUrl={surveyUrl} />

      {/* Sidebar nav */}
      <nav className="slides-nav">
        <div className="nav-logo">
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{deckTitle}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <div className={`conn-dot ${connected ? 'on' : 'off'}`} />
            <span className="mono" style={{ fontSize: 10, color: 'var(--dim)' }}>
              {connected ? 'מחובר' : 'מתחבר...'}
            </span>
          </div>
        </div>
        {slideList.map((s, i) => (
          <div
            key={s.id}
            className={`nav-item ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          >
            <span className="nav-num mono">{s.navNum ?? `0${s.id}`}</span>
            <span className="nav-title">{s.title}</span>
          </div>
        ))}

        {/* QR button at bottom of nav */}
        <div style={{ marginTop: 'auto', padding: '16px 18px', borderTop: '1px solid var(--border)' }}>
          <button className="qr-nav-btn" onClick={() => setShowQR(true)}>
            📱 הצג QR לסקר
          </button>
          {stats && (
            <div className="mono" style={{ fontSize: 11, color: 'var(--dim)', marginTop: 10, textAlign: 'center' }}>
              {stats.n} תגובות
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="slides-main">
        <SlideComp stats={stats} slideNum={String(current + 1).padStart(2, '0')} />

        {/* Controls */}
        <div className="slide-controls">
          <span className="slide-counter mono">{current + 1} / {slideList.length}</span>
          {current > 0 && (
            <button className="ctrl-btn" onClick={() => setCurrent(c => c - 1)}>→ הקודם</button>
          )}
          {current < slideList.length - 1 && (
            <button className="ctrl-btn primary" onClick={() => setCurrent(c => c + 1)}>הבא ←</button>
          )}
        </div>
      </main>
    </div>
  );
}
