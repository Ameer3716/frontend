// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Pricing from './Components/Pricing';
import SuccessPage from './Components/SuccessPage';
import DashboardLayout from './Components/DashboardLayout'; // layout that includes Sidebar
import CallDashboard from './Components/CallDashboard';
import CallDetails from './Components/CallDetails';
import CustomerDetails from './Components/CustomerDetails';
import ProtectedRoute from './Components/ProtectedRoute';
import AboutPage from './Components/ContactPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CallDashboard />} />
            <Route path="calldetails" element={<CallDetails />} />
            <Route path="customerdetails" element={<CustomerDetails />} />
          </Route>
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
