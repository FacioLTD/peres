import PrintShell from '../shared/PrintShell';
import '../shared/SlideShell.css';
import { SLIDE_COMPONENTS, SLIDE_LIST } from './BusinessSlides';
import './Business.css';

export default function BusinessPrintView() {
  return (
    <PrintShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="הטמעת AI בארגונים"
      deckClass="deck-business"
    />
  );
}
