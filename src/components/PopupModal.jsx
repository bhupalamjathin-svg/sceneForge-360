// src/components/PopupModal.jsx
import { useState } from "react";
import "./PopupModal.css";

export default function PopupModal({ prompt, onClose }) {
  const [angle, setAngle] = useState("45°");
  const [hdr, setHdr] = useState(true);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [numImages, setNumImages] = useState(1);
  const [imageType, setImageType] = useState("Photo");

  const handleGenerate = () => {
    // You can pass these options to your image generation function
    alert(`Generating ${numImages} ${imageType} images with ${aspectRatio} and HDR=${hdr}`);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Generation Settings</h3>
        <p><strong>Prompt:</strong> {prompt}</p>

        <label>
          Angle:
          <input type="text" value={angle} onChange={(e) => setAngle(e.target.value)} />
        </label>

        <label>
          HDR:
          <select value={hdr} onChange={(e) => setHdr(e.target.value === "true")}>
            <option value="true">On</option>
            <option value="false">Off</option>
          </select>
        </label>

        <label>
          Aspect Ratio:
          <input type="text" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} />
        </label>

        <label>
          Number of Images:
          <input
            type="number"
            min="1"
            max="10"
            value={numImages}
            onChange={(e) => setNumImages(e.target.value)}
          />
        </label>

        <label>
          Image Type:
          <select value={imageType} onChange={(e) => setImageType(e.target.value)}>
            <option value="Photo">Photo</option>
            <option value="Illustration">Illustration</option>
            <option value="3D">3D</option>
          </select>
        </label>

        <button onClick={handleGenerate}>Generate</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
