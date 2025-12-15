import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import PromptPage from "./pages/PromptPage.jsx";
import GeneratedPage from "./pages/GeneratedPage.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/generated" element={<GeneratedPage />} />
      </Routes>
    </Router>
  );
}
