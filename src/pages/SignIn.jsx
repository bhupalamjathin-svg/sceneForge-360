// src/pages/SignIn.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);

  const handleAuth = async ({ name, email, password }) => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate("/prompt"); // redirect after success
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="signin-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

      <AuthForm isSignUp={isSignUp} onSubmit={handleAuth} />

      <p className="toggle-text">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <span onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? " Login" : " Sign Up"}
        </span>
      </p>
    </div>
  );
}
