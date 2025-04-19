import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Menu, X } from 'lucide-react'; // <-- Import Menu and X icons
import { AuthContext } from '../Contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);  // <-- State for menu toggle
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = Boolean(user);
  const isSubscribed = user?.isSubscribed;

  // Toggle function for hamburger icon
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {/* Left section (Brand + Icon) */}
      <div className="navbar-brand">
        <Bot className="navbar-icon" />
        <span className="navbar-logo-text">CallEase</span>
      </div>

      {/* Hamburger icon (only visible on mobile) */}
      <div className="navbar-toggle" onClick={handleToggle}>
        {isOpen ? <X /> : <Menu />} 
      </div>

      {/* Navigation links */}
      {/* 
        Dynamically add a class to .navbar-menu to show/hide 
        depending on the isOpen state 
      */}
      <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="navbar-link" onClick={handleToggle}>
          Home
        </Link>

        <Link to="/pricing" className="navbar-link navbar-link-bold" onClick={handleToggle}>
          Pricing
        </Link>

        {isAuthenticated && isSubscribed && (
          <Link to="/dashboard" className="navbar-link" onClick={handleToggle}>
            Dashboard
          </Link>
        )}

        {/* Link to Google OAuth */}
        <a href="/auth/google" onClick={handleToggle}>
          <button className="navbar-btn">Login</button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
