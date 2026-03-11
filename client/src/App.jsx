import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Survey from './survey/Survey';
import Thanks  from './survey/Thanks';
import Slides  from './slides/Slides';
import './index.css';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Survey />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/slides" element={<Slides />} />
      </Routes>
    </BrowserRouter>
  );
}
