// src/Components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PhoneIncoming, Users, FileText } from 'lucide-react';
import './Sidebar.css'
const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <aside className="sidebar">
      <div className="logo">
        <PhoneIncoming size={24} />
        <span>CallCenter</span>
      </div>
      <nav className="nav-menu">
        <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/dashboard/calldetails" className={`nav-item ${isActive('/dashboard/calldetails')}`}>
          <FileText size={20} />
          <span>Call Details</span>
        </Link>
        <Link to="/dashboard/customerdetails" className={`nav-item ${isActive('/dashboard/customerdetails')}`}>
          <Users size={20} />
          <span>Customer Details</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
