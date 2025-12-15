// src/pages/GeneratedPage.jsx
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCopy, FaDownload, FaExpand, FaTrash } from "react-icons/fa";
import ParticleBackground from "../components/ParticleBackground";
import "./GeneratedPage.css";

export default function GeneratedPage() {
  const location = useLocation();
  const { prompt, angle, hdr, aspectRatio, numImages, imageType } = location.state || {};

  const [mood, setMood] = useState("Happy");
  const [enhance, setEnhance] = useState(false);
  const [localHDR, setLocalHDR] = useState(hdr || false);
  const [image, setImage] = useState("");
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    setEnter(true);
    if (prompt) {
      setTimeout(() => {
        setImage("https://via.placeholder.com/880x600?text=" + encodeURIComponent(prompt));
      }, 220);
    }
  }, [prompt]);

  const handleCopy = () => {
    navigator.clipboard.writeText(image);
    alert("Image URL copied!");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated_image.png";
    link.click();
  };

  const handleFullScreen = () => {
    const img = document.getElementById("generated-img");
    if (img && img.requestFullscreen) img.requestFullscreen();
  };

  const handleDelete = () => setImage("");

  return (
    <div className={`generated-page futuristic ${enter ? "enter" : ""}`}>
      <ParticleBackground tint={[180, 70, 255]} intensity={80} />

      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="left-inner">
          <h4>Scene Controls</h4>

          <label>
            Mood:
            <select value={mood} onChange={(e) => setMood(e.target.value)}>
              <option>Happy</option>
              <option>Sad</option>
              <option>Mysterious</option>
              <option>Epic</option>
            </select>
          </label>

          <label className="enhance">
            Enhance Image:
            <input
              type="checkbox"
              checked={enhance}
              onChange={(e) => setEnhance(e.target.checked)}
            />
          </label>

          <label>
            HDR:
            <select
              value={localHDR ? "true" : "false"}
              onChange={(e) => setLocalHDR(e.target.value === "true")}
            >
              <option value="true">On</option>
              <option value="false">Off</option>
            </select>
          </label>
<label>
  Angle:
  <select value={angle} onChange={(e) => setAngle(e.target.value)}>
    <option value="0°">0°</option>
    <option value="15°">15°</option>
    <option value="30°">30°</option>
    <option value="45°">45°</option>
    <option value="60°">60°</option>
    <option value="90°">90°</option>
  </select>
</label>

<label>
  Aspect Ratio:
  <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
    <option value="1:1">1:1</option>
    <option value="4:3">4:3</option>
    <option value="16:9">16:9</option>
    <option value="21:9">21:9</option>
    <option value="9:16">9:16 (Portrait)</option>
  </select>
</label>

          <div className="settings-info">
           
            <p><strong>Number of Images:</strong> {numImages}</p>
            <p><strong>Type:</strong> {imageType}</p>
          </div>
        </div>
      </div>

      {/* CENTER PANEL */}
      <div className="center-panel">
        <div className={`image-frame ${image ? "loaded" : "empty"}`}>
          {image ? (
            <img id="generated-img" src={image} alt="Generated" />
          ) : (
            <div className="skeleton">
              <div className="loading-shimmer" />
              <p>Generating image…</p>
            </div>
          )}
        </div>
      </div>

      {/* TOP RIGHT ICONS */}
      <div className="top-right-icons">
        <FaCopy title="Copy" onClick={handleCopy} />
        <FaDownload title="Download" onClick={handleDownload} />
        <FaExpand title="Full Screen" onClick={handleFullScreen} />
        <FaTrash title="Delete" onClick={handleDelete} />
      </div>
    </div>
  );
}
