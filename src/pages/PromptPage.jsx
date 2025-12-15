import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaMagic, FaCheck } from "react-icons/fa";
import ParticleBackground from "../components/ParticleBackground";
import "./PromptPage.css"; 

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [angle, setAngle] = useState(""); 
  const [hdr, setHdr] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(""); 
  const [numImages, setNumImages] = useState(5); 
  const [imageType, setImageType] = useState("Photo");
  const [isGenerating, setIsGenerating] = useState(false);

  const navigate = useNavigate();

  const handleGenerate = useCallback(() => {
    if (isGenerating || !prompt.trim() || !angle || !aspectRatio) {
        alert("Please enter a prompt and select an Angle and Aspect Ratio.");
        return;
    }

    setIsGenerating(true);

    const timer = setTimeout(() => {
      navigate("/generated", {
        state: {
          prompt: prompt.trim(),
          angle,
          hdr,
          aspectRatio,
          numImages, 
          imageType,
        },
      });
      setIsGenerating(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [prompt, angle, hdr, aspectRatio, numImages, imageType, isGenerating, navigate]);

  const handleToggleHdr = useCallback(() => setHdr((prev) => !prev), []);

  const handleNumImagesChange = useCallback((e) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    const clamped = Math.max(1, Math.min(10, value));
    setNumImages(clamped);
  }, []);

  const handleSurprise = useCallback(() => setPrompt("A cinematic view of a neo-noir street during heavy rain, 8k, highly detailed, volumetric lighting"), []);
  const handleVoice = useCallback(() => alert("Voice input coming soon!"), []);

  return (
    <div className="prompt-page">
      <ParticleBackground tint={[110, 85, 255]} intensity={70} />

      <aside className="sidebar">
        <h2 className="brand">SceneForge</h2>

        <div className="control-section">
          <h4>Scene Settings</h4>
          <div className="control-group">
            <label htmlFor="angle-select">Angle</label>
            <select
              id="angle-select"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
            >
              <option value="" disabled hidden>Select Angle</option> 
              <option value="0°">0° (Front)</option>
              <option value="45°">45° (Mid)</option>
              <option value="90°">90° (Side)</option>
              <option value="180°">180° (Back)</option>
              <option value="360°">360° (Panoramic)</option>
            </select>
          </div>

          <div className="control-group toggle-group">
            <label htmlFor="hdr-toggle">HDR</label>
            <button
              id="hdr-toggle"
              type="button"
              className={`toggle-switch ${hdr ? "on" : ""}`}
              onClick={handleToggleHdr}
              aria-pressed={hdr}
              aria-label={`HDR ${hdr ? "on" : "off"}`}
            >
              <div className={`toggle-thumb ${hdr ? "on" : "off"}`} />
            </button>
          </div>

          <div className="control-group">
            <label htmlFor="aspect-select">Aspect Ratio</label>
            <select
              id="aspect-select"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              aria-label="Select aspect ratio"
            >
              <option value="" disabled hidden>Select Ratio</option> 
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
              <label htmlFor="images-input">Images</label>
              <input
                id="images-input"
                type="number"
                min="1"
                max="10"
                value={numImages}
                onChange={handleNumImagesChange}
                aria-label="Number of images"
              />
            </div>

            <div className="control-group">
              <label htmlFor="type-select">Type</label>
              <select
                id="type-select"
                value={imageType}
                onChange={(e) => setImageType(e.target.value)}
                aria-label="Select image type"
              >
                <option>Photo</option>
                <option>360°</option>
                <option>3D</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="prompt-wrapper">
          <input
            type="text"
            placeholder="Describe your scene..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            aria-label="Prompt input"
          />
          <div className="prompt-actions">
            <FaMagic
              title="Surprise Me"
              onClick={handleSurprise}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleSurprise()}
            />
            <FaMicrophone
              title="Voice Input"
              onClick={handleVoice}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleVoice()}
            />
            <FaCheck
              title="Generate"
              onClick={handleGenerate}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              style={{ opacity: prompt.trim() && angle && aspectRatio && !isGenerating ? 1 : 0.6 }}
            />
          </div>
        </div>

        <div className="preview-area">
          <p className="preview-text">
            {prompt
              ? `Preview for: "${prompt}"`
              : "Your scene preview will appear here."}
          </p>
          {isGenerating && (
            <div
              className="generating-indicator"
            >
              Generating…
            </div>
          )}
        </div>
      </main>
    </div>
  );
}