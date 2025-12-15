import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About2.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import SignIn from "./pages/SignIn.jsx";
import Login from "./pages/Login.jsx";
import PromptPage from "./pages/PromptPage.jsx";
import GeneratedPage from "./pages/GeneratedPage.jsx";

import ParticleBackground from "./components/ParticleBackground";
import CursorParticles from "./components/CursorParticles";

export default function App() {
  return (
    <Router>
      {/* Background Effects */}
      <ParticleBackground />
      <CursorParticles />

      {/* Main App Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/prompt" element={<PromptPage />} />
          <Route path="/generated" element={<GeneratedPage />} />
        </Routes>
      </div>
    </Router>
  );
}
