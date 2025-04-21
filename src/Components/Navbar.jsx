import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Menu, X } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext'; // Adjust path if needed
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useContext(AuthContext); // Get user state

  // Show loading indicator while checking auth state
  if (loading) {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Bot className="navbar-icon" />
          <span className="navbar-logo-text">CallEase</span>
        </div>
        <div className="navbar-loading">Loading...</div>
      </nav>
    );
  }

  const isAuthenticated = Boolean(user);
  const isSubscribed = user?.isSubscribed; // Check if user exists before accessing isSubscribed

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to close menu if open (useful for link clicks)
  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Bot className="navbar-icon" />
        <span className="navbar-logo-text">CallEase</span>
      </div>

      <div className="navbar-toggle" onClick={handleToggle} aria-label="Toggle menu" aria-expanded={isOpen}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Add 'active' class based on isOpen state */}
      <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="navbar-link" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/pricing" className="navbar-link navbar-link-bold" onClick={closeMenu}>
          Pricing
        </Link>
         <Link to="/about" className="navbar-link" onClick={closeMenu}>
           About Us
        </Link>
        <Link to="/Contact" className="navbar-link" onClick={closeMenu}>
          Contact Us
        </Link>

        {/* --- Conditional Links based on Auth --- */}
        {isAuthenticated ? (
          <>
            {/* Show user name if available */}
            {user && user.name && (
                <span className="navbar-user-greeting navbar-link">Hi, {user.name}!</span>
                // Added navbar-link class for consistent mobile spacing/styling
            )}

            {/* Show Dashboard only if subscribed */}
            {isSubscribed && (
              <Link to="/dashboard" className="navbar-link" onClick={closeMenu}>
                Dashboard
              </Link>
            )}
          </>
        ) : (
          // Show Login only if not authenticated
          <a href="/auth/google" className="navbar-link" onClick={closeMenu}>
            <button className="navbar-btn login">Login with Google</button>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;