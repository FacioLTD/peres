import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ── Foundations (original) ────────────────────────────────────
import Survey  from './survey/Survey';
import Thanks  from './survey/Thanks';
import Slides  from './slides/Slides';

// ── LLM & GenAI (Part A — Language Intelligence) ─────────────
import LLMSurvey  from './survey/LLMSurvey';
import LLMThanks  from './survey/LLMThanks';
import LLMSlides  from './slides/llm/LLMSlides';

// ── Multimodal Intelligence (Part B) ─────────────────────────
import MultimodalSlides from './slides/multimodal/MultimodalSlides';

// ── Generative Media (Part C) ────────────────────────────────
import GenMediaSlides from './slides/gen-media/GenMediaSlides';

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

        {/* ── Module 2A — Language Intelligence (existing LLM link preserved) ── */}
        <Route path="/llm"        element={<LLMSurvey />} />
        <Route path="/llm/thanks" element={<LLMThanks />} />
        <Route path="/llm/slides" element={<LLMSlides />} />

        {/* ── Module 2B — Multimodal Intelligence ── */}
        <Route path="/multimodal/slides" element={<MultimodalSlides />} />

        {/* ── Module 2C — Generative Media ── */}
        <Route path="/gen-media/slides" element={<GenMediaSlides />} />

        {/* ── Business & Ethics ── */}
        <Route path="/business"        element={<BusinessSurvey />} />
        <Route path="/business/thanks" element={<BusinessThanks />} />
        <Route path="/business/slides" element={<BusinessSlides />} />
      </Routes>
    </BrowserRouter>
  );
}
