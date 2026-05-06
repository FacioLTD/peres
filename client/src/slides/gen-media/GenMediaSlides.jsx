import SlideShell from '../shared/SlideShell';
import { ConceptCard, Highlight } from '../shared/components';
import '../shared/SlideShell.css';
import './GenMedia.css';

// ── Slide list ────────────────────────────────────────────────
const SLIDE_LIST = [
  { id: 1, title: 'שער' },
  // Topics to build:
  // diffusion, image generation, video generation,
  // music, synthetic humans, deepfakes, creative economy
];

// ── Slide components ──────────────────────────────────────────

function TitleSlide() {
  return (
    <div className="slide fade-up">
      <div className="hero-center">
        <div className="hero-title">מדיה <em>גנרטיבית</em></div>
        <div className="hero-subtitle">Generative Media</div>
        <div className="hero-lecture-num">מודול 2 — חלק ג׳</div>
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

export default function GenMediaSlides() {
  return (
    <SlideShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="מדיה גנרטיבית"
      deckClass="deck-gen-media"
      deck="gen-media"
      surveyPath="/gen-media"
    />
  );
}
