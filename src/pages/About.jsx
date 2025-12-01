// src/pages/About.jsx
import { useNavigate } from "react-router-dom";
import "./About.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="glassy">

        <h1 className="title">
          Welcome to <span>SceneForge</span>
        </h1>

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

        {/* Tutorial */}
        <div className="feature-card">
          <h2>How to Use SceneForge?</h2>
          <ul>
            <li>🖊️ Enter a creative prompt</li>
            <li>🎚️ Adjust style & settings</li>
            <li>⚡ Generate with one click</li>
            <li>💾 Download your artwork</li>
          </ul>
        </div>

    <div className="buttons">
  <button className="btn start" onClick={() => navigate("/getstarted")}>
    Start Creating
  </button>

  <button className="btn create" onClick={() => navigate("/SignIn")}>
    Create Account
  </button>
</div>



      </div>
    </div>
  );
}
