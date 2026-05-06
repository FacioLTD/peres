import SlideShell from '../shared/SlideShell';
import { ConceptCard, Highlight } from '../shared/components';
import '../shared/SlideShell.css';
import './Multimodal.css';

// ── Slide list ────────────────────────────────────────────────
const SLIDE_LIST = [
  { id: 1, title: 'שער' },
  // Topics to build:
  // vision, CNN, YOLO, CLIP, multimodal LLMs,
  // image/video/audio understanding
];

// ── Slide components ──────────────────────────────────────────

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

// ── Wire up ───────────────────────────────────────────────────
const SLIDE_COMPONENTS = [
  TitleSlide,
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
