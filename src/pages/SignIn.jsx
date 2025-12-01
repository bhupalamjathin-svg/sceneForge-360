// src/pages/SignUp.jsx
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../components/AuthForm";
import "./SignIn.css"; // reuse same styles

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async ({ name, email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/prompt"); // redirect after signup
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign Up</h2>
      <AuthForm isSignUp={true} onSubmit={handleSignUp} />
      <p className="toggle-text">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
}
