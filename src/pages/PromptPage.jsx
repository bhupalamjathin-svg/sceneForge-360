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
  const [isActive, setIsActive] = useState(false); // whether prompt bar moved to top
  const [isGenerating, setIsGenerating] = useState(false); // for small UX lock while animating

  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;

    // start the "page slide up" animation
    setIsGenerating(true);
    setIsActive(true);

    // after animation finishes, navigate and pass state
    // 700ms matches CSS transition duration below
    setTimeout(() => {
      navigate("/generated", {
        state: { prompt, angle, hdr, aspectRatio, numImages, imageType },
      });
    }, 700);
  };

  return (
    <div className="prompt-page futuristic">
      <ParticleBackground tint={[110, 85, 255]} intensity={70} />
      <div className={`left-side-panel ${isActive ? "compact" : ""}`}>
        {/* Left controls always visible on left; glossy apple style */}
        <div className="left-inner">
          <h3 className="brand">SceneForge</h3>
          <div className="control-group">
            <label>Angle</label>
            <input value={angle} onChange={(e) => setAngle(e.target.value)} />
          </div>
          <div className="control-group">
            <label>HDR</label>
            <select value={String(hdr)} onChange={(e) => setHdr(e.target.value === "true")}>
              <option value="true">On</option>
              <option value="false">Off</option>
            </select>
          </div>
          <div className="control-group">
            <label>Aspect</label>
            <input value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} />
          </div>
          <div className="control-grid">
            <div>
              <label>Images</label>
              <input type="number" min="1" max="10" value={numImages} onChange={(e) => setNumImages(e.target.value)} />
            </div>
            <div>
              <label>Type</label>
              <select value={imageType} onChange={(e) => setImageType(e.target.value)}>
                <option>Photo</option>
                <option>Illustration</option>
                <option>3D</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={`prompt-bar ${isActive ? "active top" : ""}`} role="search">
        <input
          type="text"
          placeholder="Describe the scene you want..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => {
            if (!prompt.trim()) setIsActive(false);
          }}
        />
        <div className="prompt-icons">
          <FaMagic title="Surprise Me" className="icon" onClick={() => setPrompt("A neon city at dusk, cinematic")} />
          <FaMicrophone title="Voice Input" className="icon" onClick={() => alert("Voice input coming soon!")} />
          <FaCheck title="Generate" className="icon generate" onClick={handleGenerate} />
        </div>
      </div>

      <div className="hint" style={{ opacity: isActive ? 0 : 1 }}>
       
      </div>
    </div>
  );
}
