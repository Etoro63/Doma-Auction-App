import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to) =>
    loc.pathname === to ? "text-cyan-400 font-bold" : "";

  return (
    <nav className="navbar-glass">
      {/* Logo */}
      <Link to="/" className="navbar-logo flex items-center gap-2 text-center">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-pulse-cyan to-pulse-purple shadow-md mr-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" fill="#232344" />
            <path d="M6 10a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm4-7v2m0 10v2m7-7h-2M3 10H1m13.07-5.07l-1.41 1.41M6.34 15.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 4.34L4.93 2.93" stroke="#4deaff" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="text-purple-500">Doma</span>
        <span className="text-cyan-400">Auction</span>
      </Link>

      {/* Hamburger for mobile */}
      <button
        className="navbar-hamburger md:hidden"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 font-medium">
        <Link to="/" className={`navbar-link ${isActive("/")}`}>Home</Link>
        <Link to="/auctions" className={`navbar-link ${isActive("/auctions")}`}>Auctions</Link>
        <Link to="/dashboard" className={`navbar-link ${isActive("/dashboard")}`}>Dashboard</Link>
        <Link to="/about" className={`navbar-link ${isActive("/about")}`}>About</Link>
      </div>

      {/* Desktop Auth/Wallet */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <button onClick={logout} className="navbar-wallet">Logout</button>
        ) : (
          <>
            <Link to="/signin" className="navbar-wallet border-purple-500 text-purple-400">Sign In</Link>
            <Link to="/signup" className="navbar-wallet">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          <div className="flex flex-col items-center justify-center h-full w-full space-y-8">
            <Link to="/" className={`navbar-link ${isActive("/")}`} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/auctions" className={`navbar-link ${isActive("/auctions")}`} onClick={() => setMenuOpen(false)}>Auctions</Link>
            <Link to="/dashboard" className={`navbar-link ${isActive("/dashboard")}`} onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/about" className={`navbar-link ${isActive("/about")}`} onClick={() => setMenuOpen(false)}>About</Link>
            <div className="flex flex-col items-center gap-4 mt-6 w-full">
              {user ? (
                <button onClick={() => { logout(); setMenuOpen(false); }} className="navbar-wallet" style={{ fontSize: "1.15rem" }}>Logout</button>
              ) : (
                <>
                  <Link to="/signin" className="navbar-wallet border-purple-500 text-purple-400" style={{ fontSize: "1.15rem" }} onClick={() => setMenuOpen(false)}>Sign In</Link>
                  <Link to="/signup" className="navbar-wallet" style={{ fontSize: "1.15rem" }} onClick={() => setMenuOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}