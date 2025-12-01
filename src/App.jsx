// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import SignIn from "./pages/SignIn.jsx";  // IMPORTANT
import Login from "./pages/Login.jsx";
import PromptPage from "./pages/PromptPage.jsx";
import GeneratedPage from "./pages/GeneratedPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/getstarted" element={<GetStarted />} />

        {/* Auth pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />

        {/* App pages */}
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/generated" element={<GeneratedPage />} />
      </Routes>
    </Router>
  );
}
