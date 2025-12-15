import { useRef, useState } from "react";
import styles from "./ImageSlider.module.css";

import {
  FiTrash2,
  FiDownload,
  FiMaximize2,
  FiCopy,
} from "react-icons/fi";

export default function ImageSlider({ images = [] }) {
  const sliderRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Mouse drag sliding
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const onMouseLeave = () => (isDragging.current = false);
  const onMouseUp = () => (isDragging.current = false);

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <>
      {/* Slider */}
      <div
        ref={sliderRef}
        className={styles.slider}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={styles.card}
            onClick={() => setActiveImage(img)}
          >
            <img src={img} alt={`generated-${i}`} draggable={false} />
          </div>
        ))}
      </div>

      {/* Focus View */}
      {activeImage && (
        <div className={styles.overlay}>
          <div className={styles.topActions}>
            <FiTrash2 />
            <FiDownload />
            <FiMaximize2 />
            <FiCopy />
          </div>

          <img src={activeImage} className={styles.focusImage} />

          <div
            className={styles.close}
            onClick={() => setActiveImage(null)}
          >
            ✕
          </div>
        </div>
      )}
    </>
  );
}
