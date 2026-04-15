/**
 * Shared slide components — used across all decks.
 * These rely on CSS variables from the host deck's theme.
 */

const ACCENT = '#e8ff47';
const ORANGE = '#ff6b35';

export function LiveBadge({ n }) {
  return (
    <div className="live-badge mono">
      <span className="live-dot pulse" />
      LIVE — {n} תגובות
    </div>
  );
}

export function ConceptCard({ en, he, def, accent }) {
  return (
    <div className={`concept-card ${accent ? 'accent' : ''}`}>
      <div className="concept-en mono">{en}</div>
      <div className="concept-he">{he}</div>
      <div className="concept-def">{def}</div>
    </div>
  );
}

export function Highlight({ children, color = ACCENT }) {
  return (
    <div className="highlight-box" style={{ borderRightColor: color }}>
      {children}
    </div>
  );
}

export function FlowBox({ label, sub, highlight }) {
  return (
    <div className={`flow-box ${highlight ? 'highlight' : ''}`}>
      {label}
      {sub && <div className="flow-sub mono">{sub}</div>}
    </div>
  );
}

export function StatCard({ num, label }) {
  return (
    <div className="stat-card">
      <div className="stat-num mono">{num ?? '—'}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
