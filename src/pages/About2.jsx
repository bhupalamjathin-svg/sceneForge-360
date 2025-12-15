import { useNavigate } from "react-router-dom";
import styles from "./About2.module.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className={`${styles.page} ${styles["about-page"]}`}>
      <div className={`${styles.glassy} ${styles["about-glassy"]}`}>

        <h1 className={`${styles.title} ${styles["about-title"]}`}>
          Welcome to <span>SceneForge</span>
        </h1>

        <p className={`${styles.subtitle} ${styles["about-subtitle"]}`}>
          Turn your imagination into beautiful AI-generated images.
        </p>

        <div className={styles.features}>
          <div className={`${styles.card} ${styles["about-feature-card"]}`}>
            <h3>🎨 Create Scenes</h3>
            <p>Describe anything and generate stunning artwork instantly.</p>
          </div>

          <div className={`${styles.card} ${styles["about-feature-card"]}`}>
            <h3>⚡ Fast & Powerful</h3>
            <p>Powered by advanced AI for sharp, accurate visuals.</p>
          </div>

          <div className={`${styles.card} ${styles["about-feature-card"]}`}>
            <h3>🛠️ Easy Controls</h3>
            <p>Choose mood, angle, HDR, style and much more.</p>
          </div>
        </div>

        <div
          className={`${styles.tutorial} ${styles.card} ${styles["about-tutorial-section"]}`}
        >
          <h2>How to Use SceneForge?</h2>
          <ul>
            <li>🖊️ Enter a creative prompt</li>
            <li>🎚️ Adjust style & settings</li>
            <li>⚡ Generate with one click</li>
            <li>💾 Download your artwork</li>
          </ul>
        </div>

        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${styles.start} ${styles["about-btn"]}`}
            onClick={() => navigate("/getstarted")}
          >
            Start Creating
          </button>

          <button
            className={`${styles.btn} ${styles.create} ${styles["about-btn"]}`}
            onClick={() => navigate("/signin")}
          >
            Create Account
          </button>
        </div>

      </div>
    </div>
  );
}
