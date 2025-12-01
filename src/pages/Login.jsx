// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../components/AuthForm";
import "./SignIn.css"; // reuse same styles

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/prompt"); // redirect after login
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signin-container">
      <h2>Login</h2>
      <AuthForm isSignUp={false} onSubmit={handleLogin} />
      <p className="toggle-text">
        Don't have an account?{" "}
        <span onClick={() => navigate("/signin")}>Sign Up</span>
      </p>
    </div>
  );
}
