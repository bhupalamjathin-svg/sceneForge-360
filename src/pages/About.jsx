// src/pages/About.jsx
import { useNavigate } from "react-router-dom";
import "./About.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-container glassy">

        <h1 className="title">Welcome to <span>SceneForge</span></h1>
        <p className="subtitle">
          Turn your imagination into beautiful AI-generated images.
        </p>

        {/* Feature Cards */}
        <div className="features">
          <div className="feature-card">
            <h3>🎨 Create Scenes</h3>
            <p>Describe anything and generate stunning artwork instantly.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast & Powerful</h3>
            <p>Powered by advanced AI for sharp, accurate visuals.</p>
          </div>

          <div className="feature-card">
            <h3>🛠️ Easy Controls</h3>
            <p>Choose mood, angle, HDR, style and much more.</p>
          </div>
        </div>

        {/* Tutorial Section */}
        <div className="tutorial">
          <h2>How It Works</h2>
          <ul>
            <li>1. Create an account to save your images & settings.</li>
            <li>2. Enter your prompt describing the scene.</li>
            <li>3. Select your mode, angle and other options.</li>
            <li>4. Hit "Generate" and watch the magic happen!</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="buttons">
          <button className="btn start" onClick={() => navigate("/signin")}>
            Get Started
          </button>

          <button className="btn create" onClick={() => navigate("/")}>
            Create Account
          </button>
        </div>

      </div>
    </div>
  );
}
