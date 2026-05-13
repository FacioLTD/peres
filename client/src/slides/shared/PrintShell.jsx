import './PrintShell.css';

/**
 * PrintShell — renders all slides vertically for print / PDF export.
 *
 * Same props as SlideShell but renders ALL slides at once
 * instead of one at a time with navigation.
 *
 * @param {Object[]} slideList         - Array of {id, title, navNum?}
 * @param {Function[]} slideComponents - Array of React components
 * @param {string} deckTitle           - Title shown in header
 * @param {string} deckClass           - CSS class for theme override
 */
export default function PrintShell({
  slideList,
  slideComponents,
  deckTitle,
  deckClass = '',
}) {
  return (
    <div className={`print-page ${deckClass} ${deckClass}-page`}>
      {/* Screen-only header */}
      <header className="print-header no-print">
        <div className="print-header-info">
          <h1 className="print-header-title">{deckTitle}</h1>
          <span className="print-header-count mono">
            {slideList.length} שקפים
          </span>
        </div>
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ הדפס / שמור כ-PDF
        </button>
      </header>

      {/* All slides rendered vertically */}
      <div className="print-slides">
        {slideComponents.map((SlideComp, i) => (
          <div key={slideList[i]?.id ?? i} className="print-slide-wrap">
            <div className="print-slide-num no-print mono">
              {slideList[i]?.navNum ?? String(i + 1).padStart(2, '0')}
              <span className="print-slide-title-inline">
                {slideList[i]?.title}
              </span>
            </div>
            <div className="print-slide-content">
              <SlideComp
                slideNum={String(i + 1).padStart(2, '0')}
                stats={null}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Screen-only footer */}
      <footer className="print-footer no-print">
        <span>⌘P / Ctrl+P להדפסה</span>
        <span className="mono">{deckTitle}</span>
      </footer>
    </div>
  );
}
