import PrintShell from '../shared/PrintShell';
import '../shared/SlideShell.css';
import { SLIDE_COMPONENTS, SLIDE_LIST } from './MultimodalSlides';
import './Multimodal.css';

export default function MultimodalPrintView() {
  return (
    <PrintShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="Multimodal Intelligence"
      deckClass="deck-multimodal"
    />
  );
}
