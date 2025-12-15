import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./SignIn.module.css";
import ParticleBackground from "../components/ParticleBackground";

export default function SignIn() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/prompt");
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/prompt");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className={styles.page}>

      {/* ⭐ ADD THIS HERE ⭐ */}
      <ParticleBackground />

      <div className={styles.card}>
        <h2 className={styles.title}>
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              className={styles.input}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isSignUp && (
            <input
              type="password"
              className={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button type="submit" className={styles.button}>
            {isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        <p
          className={styles.toggle}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}
