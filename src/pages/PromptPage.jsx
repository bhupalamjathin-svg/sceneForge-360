// src/pages/PromptPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaMagic, FaCheck } from "react-icons/fa";
import ParticleBackground from "../components/ParticleBackground";
import "./PromptPage.css";

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [angle, setAngle] = useState("45°");
  const [hdr, setHdr] = useState(true);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [numImages, setNumImages] = useState(1);
  const [imageType, setImageType] = useState("Photo");
  const [isGenerating, setIsGenerating] = useState(false);

  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);

    setTimeout(() => {
      navigate("/generated", {
        state: { prompt, angle, hdr, aspectRatio, numImages, imageType },
      });
    }, 700);
  };

  return (
    <div className="prompt-page">
      {/* Particle background */}
      <ParticleBackground tint={[110, 85, 255]} intensity={70} />

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="brand">SceneForge</h2>

        <div className="control-section">
          <h4>Scene Settings</h4>
          <div className="control-group">
            <label>Angle</label>
            <select value={angle} onChange={(e) => setAngle(e.target.value)}>
              <option>0°</option>
              <option>45°</option>
              <option>90°</option>
              <option>180°</option>
              <option>360°</option>
            </select>
          </div>

          <div className="control-group toggle-group">
            <label>HDR</label>
            <div className="toggle-switch" onClick={() => setHdr(!hdr)}>
              <div className={`toggle-thumb ${hdr ? "on" : "off"}`}></div>
            </div>
          </div>

          <div className="control-group">
            <label>Aspect Ratio</label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
            >
              <option>1:1</option>
              <option>4:3</option>
              <option>3:2</option>
              <option>16:9</option>
              <option>21:9</option>
              <option>9:16</option>
            </select>
          </div>

          <div className="control-grid">
            <div className="control-group">
              <label>Images</label>
              <input
                type="number"
                min="1"
                max="10"
                value={numImages}
                onChange={(e) => setNumImages(e.target.value)}
              />
            </div>

            <div className="control-group">
              <label>Type</label>
              <select
                value={imageType}
                onChange={(e) => setImageType(e.target.value)}
              >
                <option>Photo</option>
                <option>360°</option>
                <option>3D</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <div className="prompt-wrapper">
          <input
            type="text"
            placeholder="Describe your scene..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="prompt-actions">
            <FaMagic
              title="Surprise Me"
              onClick={() =>
                setPrompt("A neon futuristic city glowing at night")
              }
            />
            <FaMicrophone
              title="Voice Input"
              onClick={() => alert("Voice input coming soon!")}
            />
            <FaCheck title="Generate" onClick={handleGenerate} />
          </div>
        </div>

        <div className="preview-area">
          <p className="preview-text">
            {prompt ? `Preview for: "${prompt}"` : "Your scene preview will appear here."}
          </p>
        </div>
      </main>
    </div>
  );
}
