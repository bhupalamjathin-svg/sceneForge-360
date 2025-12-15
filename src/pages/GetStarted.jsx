// src/pages/GetStarted.jsx
import { useNavigate } from "react-router-dom";
import "./GetStarted.css";

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <div className="gs-page">
      <div className="gs-container glass">

        <h1 className="gs-title">Get Started with SceneForge</h1>
        <p className="gs-sub">
          Here’s everything you need to know before creating your first AI image.
        </p>

        <div className="gs-sections">
          <div className="gs-box">
            <h3>✨ What is SceneForge?</h3>
            <p>
              SceneForge is an AI tool that converts your ideas into HD images.
              Just type what you imagine, choose a style, and generate.
            </p>
          </div>

          <div className="gs-box">
            <h3>📸 What you can create</h3>
            <ul>
              <li>Realistic AI photos</li>
              <li>Cinematic scenes</li>
              <li>Anime images</li>
              <li>Landscapes & portraits</li>
              <li>3D or artistic renders</li>
            </ul>
          </div>

          <div className="gs-box">
            <h3>🧠 Example prompts</h3>
            <ul>
              <li>"Cyberpunk street, neon lights, rainy night"</li>
              <li>"Cute anime girl holding an umbrella"</li>
              <li>"Realistic tiger walking through jungle"</li>
            </ul>
          </div>

          <div className="gs-box">
            <h3>⚙️ How to use</h3>
            <ul>
              <li>1. Create an account</li>
              <li>2. Enter your scene description</li>
              <li>3. Choose angle, HDR, mood, type</li>
              <li>4. Press Generate</li>
            </ul>
          </div>
        </div>

        <button className="gs-btn" onClick={() => navigate("/")}>
          Continue to Login
        </button>
      </div>
    </div>
  );
}
