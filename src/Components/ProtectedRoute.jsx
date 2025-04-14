// src/Components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // While checking auth status, you can display a loading spinner or similar.
  if (loading) return <div>Loading...</div>;

  // If no user or not subscribed, redirect to the pricing page.
  if (!user || !user.isSubscribed) {
    return <Navigate to="/pricing" replace />;
  }

  // Otherwise, render the protected content.
  return children;
};

export default ProtectedRoute;
