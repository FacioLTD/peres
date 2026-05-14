import PrintShell from './shared/PrintShell';
import './shared/SlideShell.css';
import { SLIDE_COMPONENTS, SLIDE_LIST } from './Slides';
import './Slides.css';

export default function FoundationsPrintView() {
  return (
    <PrintShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="מבוא לבינה מלאכותית"
      deckClass="deck-foundations"
    />
  );
}
