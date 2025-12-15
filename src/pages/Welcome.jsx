import { Link } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-container">
      <div className="glow-card">
        <h1 className="title">SceneForge</h1>
        <p className="subtitle">
          Create stunning scenes, moments & visuals with a single prompt.
        </p>

        <div className="btn-group">
          <Link to="/signin" className="btn primary">Get Started</Link>
          <Link to="/signup" className="btn secondary">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
