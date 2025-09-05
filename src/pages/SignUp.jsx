import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set displayName (username) in Firebase Auth profile
      await updateProfile(userCredential.user, { displayName: username });
      navigate("/dashboard");
    } catch (err) { setError(err.message); }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Optionally set displayName if not set (Google usually provides one)
      if (username && !result.user.displayName) {
        await updateProfile(result.user, { displayName: username });
      }
      navigate("/dashboard");
    } catch (err) { setError(err.message); }
  };

  return (
    <section className="auth-section">
      <div className="auth-card fade-in">
        <div>
          <div className="footer-logo justify-center mb-2">
            <span className="text-pulse-purple">Pulse</span>
            <span className="text-pulse-cyan">Pay</span>
          </div>
          <h2 className="auth-title">Create a new account</h2>
          <p className="auth-desc">
            Or <Link to="/signin" className="auth-link">sign in to existing account</Link>
          </p>
        </div>

        {error && <p className="text-red-400 mb-3 text-center">{error}</p>}

        <form className="auth-form" onSubmit={e => { e.preventDefault(); handleSignUp(); }}>
          <div>
            <label className="auth-label">Username</label><br/>
            <input
              className="auth-input w-full"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Your username"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="auth-label">Email</label><br/>
            <input className="auth-input w-full" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label className="auth-label">Password</label><br/>
            <input className="auth-input w-full" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="auth-btn w-full">Sign Up</button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-pulse-gray"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-[#232344] text-white/60">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="auth-btn w-full bg-[#232344] text-[#4deaff] border border-[#4deaff] hover:bg-[#4deaff] hover:text-[#18182f] transition"
          style={{paddingTop: '0.85rem', paddingBottom: '0.85rem', fontWeight: 600, fontSize: '1.08rem'}}
        >
          Continue with Google
        </button>
      </div>
    </section>
  );
}
