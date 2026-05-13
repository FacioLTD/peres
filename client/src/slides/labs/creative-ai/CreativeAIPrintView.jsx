import PrintShell from '../../shared/PrintShell';
import '../../shared/SlideShell.css';
import { SLIDE_COMPONENTS, SLIDE_LIST } from './CreativeAILabSlides';
import './CreativeAILab.css';

export default function CreativeAIPrintView() {
  return (
    <PrintShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="Lab 01 — Creative AI"
      deckClass="deck-lab-creative"
    />
  );
}
