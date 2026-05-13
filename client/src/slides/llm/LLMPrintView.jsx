import PrintShell from '../shared/PrintShell';
import '../shared/SlideShell.css';
import { SLIDE_COMPONENTS, SLIDE_LIST } from './LLMSlides';
import './LLM.css';

export default function LLMPrintView() {
  return (
    <PrintShell
      slideList={SLIDE_LIST}
      slideComponents={SLIDE_COMPONENTS}
      deckTitle="LLM & GenAI"
      deckClass="deck-llm"
    />
  );
}
