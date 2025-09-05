import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <section className="profile-section">
      <h2 className="profile-title">Welcome, {user.email}</h2>
      <p className="profile-desc">Manage your subscriptions and wallet here.</p>
      <button
        onClick={logout}
        className="profile-logout-btn"
      >
        Logout
      </button>
    </section>
  );
}
