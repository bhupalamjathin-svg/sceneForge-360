import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaCopy, FaDownload, FaExpand, FaTrash, FaCompress, FaArrowLeft } from "react-icons/fa";
import ParticleBackground from "../components/ParticleBackground";
import styles from "./GeneratedPage.module.css";

export default function GeneratedPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    prompt,
    angle: initialAngle,
    hdr,
    aspectRatio: initialAspectRatio,
    numImages = 1,
    imageType
  } = location.state || {};

  /* LEFT PANEL STATES */
  const [mood, setMood] = useState("Happy");
  const [enhance, setEnhance] = useState(false);
  const [localHDR] = useState(hdr || false);
  const [currentAngle] = useState(initialAngle || "0°");
  const [currentAspectRatio] = useState(initialAspectRatio || "1:1");

  /* IMAGE STATES */
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  /* DRAG STATES */
  const startX = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false); 

  /* MOCK IMAGE GENERATION */
  useEffect(() => {
    if (!prompt) return;
    setLoading(true);

    const adjustedNumImages = Math.max(1, Math.min(10, numImages));

    setTimeout(() => {
      const generated = Array.from({ length: adjustedNumImages }, (_, i) =>
        `https://via.placeholder.com/550x309/0f1730/80d0ff?text=${encodeURIComponent(
          `${prompt} #${i + 1}`
        )}`
      );
      setImages(generated);
      setActiveIndex(0);
      setLoading(false);
    }, 700);
  }, [prompt, numImages, imageType]);


  /* --- DRAG/SWIPE LOGIC --- */
  const handleStart = (e) => {
    if (isExpanded) return;
    if (e.type === 'mousedown' && e.button !== 0) return; 
    
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX || e.touches[0].clientX;
  };

  const handleMove = useCallback((e) => {
    if (!isDragging.current) return;
    if (e.touches) e.preventDefault(); 

    const x = e.clientX || e.touches[0].clientX;
    
    if (Math.abs(x - startX.current) > 5) {
        hasDragged.current = true;
    }
  }, []);

  const handleEnd = useCallback((e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    if (hasDragged.current) {
        const x = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        if (x === undefined) return; 

        const diff = x - startX.current;
        // ⭐️ CHANGE 1: Reduced threshold for easier sliding
        const threshold = 50; 

        if (diff < -threshold && activeIndex < images.length - 1) {
            setActiveIndex((i) => i + 1); // Swiped Left
        } else if (diff > threshold && activeIndex > 0) {
            setActiveIndex((i) => i - 1); // Swiped Right
        }
    }
    
    hasDragged.current = false;
  }, [activeIndex, images.length]);

  const handleImageClick = useCallback((i) => {
      if (i !== activeIndex) {
          setActiveIndex(i);
      }
  }, [activeIndex]);

  const handleGoBack = () => {
    navigate(-1);
  };
  
  // ----------------------------------------------------
  // CORE 3D TRANSFORM LOGIC
  // ----------------------------------------------------
  const getSlideStyle = useCallback((i) => {
    const offset = i - activeIndex;
    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;

    const perspectiveValue = 1500;
    // ⭐️ CHANGE 2: Increased width for larger images
    const slideVisualWidth = 550; 
    const rotationAngle = 8;     
    const depth = -120;          
    // ⭐️ CHANGE 3: Slight overlap adjustment
    const stackOverlap = 0.6;   

    const translateX = offset * slideVisualWidth * stackOverlap; 
    const rotateY = offset * -rotationAngle; 
    const translateZ = absOffset * depth; 

    const scale = isCenter ? 1.05 : 1 - (absOffset * 0.03); 
    const opacity = isCenter ? 1 : Math.max(0.7, 1 - (absOffset * 0.1));
    const zIndex = images.length - absOffset;

    return {
      transform: `perspective(${perspectiveValue}px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      pointerEvents: isCenter ? 'auto' : 'none', 
    };
  }, [activeIndex, images.length]);

  /* EXPAND/MINIMIZE HANDLERS */
  const handleExpand = () => { if (images[activeIndex]) setIsExpanded(true); };
  const handleMinimize = () => { setIsExpanded(false); };
  
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        if (isExpanded) handleMinimize();
        else handleGoBack();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isExpanded, handleGoBack]);

  const activeImage = images[activeIndex];

  // ⭐️ FULL SCREEN EXPANDED VIEW
  if (isExpanded) {
    return (
      <div className={styles.expandedViewOverlay}>
        <div className={styles.expandedImageContainer}>
          <img src={activeImage} alt="Expanded Generated" className={styles.expandedImage} />
          <div className={styles.minimizeBar}>
              <p>Press **ESC** key to go back</p>
              <button className={styles.iconBtn} onClick={handleMinimize} title="Minimize">
                  <FaCompress />
              </button>
          </div>
        </div>
      </div>
    );
  }

  // ⭐️ MAIN VIEW
  return (
    <div 
        className={styles.generatedPage}
        onMouseMove={handleMove} 
        onMouseUp={handleEnd}    
        onMouseLeave={handleEnd}
        onTouchMove={handleMove} 
        onTouchEnd={handleEnd}
    >
      <ParticleBackground tint={[180, 70, 255]} intensity={80} />

      {/* LEFT PANEL */}
      <div className={styles.leftPanel}>
        <button className={styles.backButton} onClick={handleGoBack}>
            <FaArrowLeft /> Back to Prompt
        </button>
        
        <div className={styles.leftPanelContent}> 
            <h4 className={styles.settingsHeader}>Scene Parameters</h4>
            
            {/* PARAMETERS */}
            <div className={styles.paramGroup}>
                <p className={styles.paramLabel}>Prompt</p>
                <p className={styles.paramValue}>{prompt ? prompt.substring(0, 100) + (prompt.length > 100 ? "..." : "") : "N/A"}</p>
            </div>
            <div className={styles.paramGroup}>
                <p className={styles.paramLabel}>Image Count</p>
                <p className={styles.paramValue}>{images.length}</p>
            </div>
            <div className={styles.paramGroup}>
                <p className={styles.paramLabel}>Image Type</p>
                <p className={styles.paramValue}>{imageType}</p>
            </div>
            <div className={styles.paramGroup}>
                <p className={styles.paramLabel}>Aspect Ratio</p>
                <p className={styles.paramValue}>{currentAspectRatio}</p>
            </div>
            <div className={styles.paramGroup}>
                <p className={styles.paramLabel}>Angle</p>
                <p className={styles.paramValue}>{currentAngle}</p>
            </div>
            <div className={styles.paramGroup}>
                <p className={styles.paramLabel}>HDR</p>
                <p className={styles.paramValue}>{localHDR ? "On" : "Off"}</p>
            </div>
            
            {/* Post-Processing Controls */}
            <h4 className={styles.settingsHeader} style={{marginTop: '30px'}}>Post-Processing</h4>
            <div className={styles.controlsSection}>
                <label>
                  Mood
                  <select value={mood} onChange={(e) => setMood(e.target.value)}>
                    <option>Happy</option>
                    <option>Sad</option>
                    <option>Mysterious</option>
                    <option>Epic</option>
                  </select>
                </label>
                <label className={styles.checkbox}>
                  Enhance
                  <input
                    type="checkbox"
                    checked={enhance}
                    onChange={(e) => setEnhance(e.target.checked)}
                  />
                </label>
            </div>
            
        </div>
        
        <div className={styles.activeIndicator}>
            Viewing Image: **{activeIndex + 1}** / {images.length}
        </div>
        
      </div>

      {/* CENTER SLIDER (3D CAROUSEL) */}
      <div className={styles.centerPanel}>
        {loading && <p className={styles.loadingText}>Generating {images.length || numImages} Scenes...</p>}

        {images.length > 0 && (
            <div className={styles.slider}>
                <div
                    className={styles.track}
                    onMouseDown={handleStart} 
                    onTouchStart={handleStart} 
                >
                    {images.map((img, i) => {
                        const isCenter = i === activeIndex;

                        return (
                            <img
                                key={i}
                                src={img}
                                alt={`Generated Scene ${i + 1}`}
                                className={`${styles.slide} ${isCenter ? styles.active : ''}`}
                                style={getSlideStyle(i)} 
                                onClick={() => handleImageClick(i)} 
                                tabIndex={0}
                            />
                        );
                    })}
                </div>
            </div>
        )}
        
        <div className={styles.platform}></div>
        <div className={styles.promptDisplay}>
            "{prompt || "Your generated scene"}"
        </div>
      </div>

      {/* TOP RIGHT ICONS */}
      {activeImage && (
        <div className={styles.iconBar}>
          <button className={styles.iconBtn} onClick={() => alert("Copied!")} title="Copy Image URL">
            <FaCopy />
          </button>
          <button className={styles.iconBtn} onClick={() => alert("Downloading...")} title="Download Image">
            <FaDownload />
          </button>
          <button className={styles.iconBtn} onClick={handleExpand} title="Expand Full Screen">
            <FaExpand />
          </button>
          <button className={styles.iconBtn} onClick={() => alert("Deleted!")} title="Delete Image">
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
}