import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext';  // Import the AuthContext
import './Navbar.css';

const Navbar = () => {
  // Consume the auth context
  const { user, loading } = useContext(AuthContext);

  // If still loading, you might choose to render nothing or a placeholder
  if (loading) {
    return <div>Loading...</div>;
  }

  // Determine if user is authenticated and subscribed based on the context
  const isAuthenticated = Boolean(user);
  const isSubscribed = user?.isSubscribed;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Bot className="navbar-icon" />
        <span className="navbar-logo-text">CallEase</span>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/pricing" className="navbar-link navbar-link-bold">Pricing</Link>

        {/* Show Dashboard link only if the user is authenticated and subscribed */}
        {isAuthenticated && isSubscribed && (
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        )}

        {/* Directly link to the Google OAuth route */}
        <a href="http://localhost:3001/auth/google">
          <button className="navbar-btn">Login</button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
