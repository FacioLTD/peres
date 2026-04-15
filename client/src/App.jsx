import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ── Foundations (original) ────────────────────────────────────
import Survey  from './survey/Survey';
import Thanks  from './survey/Thanks';
import Slides  from './slides/Slides';

// ── LLM & GenAI ──────────────────────────────────────────────
import LLMSurvey  from './survey/LLMSurvey';
import LLMThanks  from './survey/LLMThanks';
import LLMSlides  from './slides/llm/LLMSlides';

// ── Business & Ethics ────────────────────────────────────────
import BusinessSurvey  from './survey/BusinessSurvey';
import BusinessThanks  from './survey/BusinessThanks';
import BusinessSlides  from './slides/business/BusinessSlides';

import './index.css';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Foundations (backward-compatible at root) ── */}
        <Route path="/"       element={<Survey />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/slides" element={<Slides />} />

        {/* ── LLM & GenAI ── */}
        <Route path="/llm"        element={<LLMSurvey />} />
        <Route path="/llm/thanks" element={<LLMThanks />} />
        <Route path="/llm/slides" element={<LLMSlides />} />

        {/* ── Business & Ethics ── */}
        <Route path="/business"        element={<BusinessSurvey />} />
        <Route path="/business/thanks" element={<BusinessThanks />} />
        <Route path="/business/slides" element={<BusinessSlides />} />
      </Routes>
    </BrowserRouter>
  );
}
