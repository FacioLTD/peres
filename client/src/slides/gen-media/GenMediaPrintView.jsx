import PrintShell from '../shared/PrintShell';
import '../shared/SlideShell.css';
import { SLIDE_COMPONENTS, SLIDE_LIST } from './GenMediaSlides';
import './GenMedia.css';

export default function GenMediaPrintView() {
  return (
    <PrintShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="מדיה גנרטיבית"
      deckClass="deck-gen-media"
    />
  );
}
