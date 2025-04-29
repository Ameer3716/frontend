import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Import necessary icons
import { LayoutDashboard, PhoneIncoming, Users, FileText, MessageSquare } from 'lucide-react'; // <-- Import MessageSquare
import styled from 'styled-components';

// --- Styled Components (Keep as they are) ---
const SidebarContainer = styled.aside`
  width: 100%;
  height: 100%;
  background-color: #1a1a2e;
  color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  padding-left: 10px;
`;

const NavMenu = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Use NavLink from react-router-dom for automatic active class handling
// If you MUST use your custom NavItem, ensure it handles the 'active' class correctly.
// This example modifies NavItem to use NavLink's active state logic.
const NavItem = styled(Link)` // Keep styled(Link) if NavItem IS your Link wrapper
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #cccccc;
  padding: 10px 15px; // Adjusted padding
  border-radius: 5px;
  transition: background-color 0.2s ease, color 0.2s ease; // Faster transition

  &:hover {
    background-color: #1f2a4d; // Slightly different hover
    color: #ffffff;
  }

  // Style the active class directly
  &.active {
    background-color: #0f3460;
    color: #ffffff;
    font-weight: bold;
  }
`;
// --- End Styled Components ---


const Sidebar = ({ onNavigate }) => { // Receive onNavigate prop if needed for mobile toggle
  const location = useLocation();

  // Helper function to check for active state (works with nested routes too)
  // Consider using NavLink from react-router-dom which handles this automatically via its 'className' prop
  const isActive = (path, isIndex = false) => {
      if (isIndex) {
          // Exact match for index route
          return location.pathname === path;
      }
      // Match if the current path starts with the link path (for nested routes)
      return location.pathname.startsWith(path);
  };

  // Close mobile menu if onNavigate function is provided
  const handleClick = () => {
    if (onNavigate) onNavigate();
  };

  return (
    <SidebarContainer>
      <Logo>
        <PhoneIncoming size={24} />
        <span>CallEase</span> {/* Changed name back? */}
      </Logo>
      <NavMenu>
        {/* Dashboard Link (Index Route) */}
        <NavItem
          to="/dashboard"
          // Use isActive helper for index route (exact match)
          className={isActive('/dashboard', true) ? 'active' : ''}
          onClick={handleClick}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavItem>

        {/* Call Details Link */}
        <NavItem
          to="/dashboard/calldetails"
           // Use isActive helper for nested route
          className={isActive('/dashboard/calldetails') ? 'active' : ''}
          onClick={handleClick}
        >
          <FileText size={20} />
          <span>Call Details</span>
        </NavItem>

        {/* Customer Details Link */}
        <NavItem
          to="/dashboard/customerdetails"
           // Use isActive helper for nested route
          className={isActive('/dashboard/customerdetails') ? 'active' : ''}
          onClick={handleClick}
        >
          <Users size={20} />
          <span>Customer Details</span>
        </NavItem>

        {/* --- ADDED CHATBOT LINK --- */}
        <NavItem
          to="/dashboard/chatbot" // Correct path
           // Use isActive helper for nested route
          className={isActive('/dashboard/chatbot') ? 'active' : ''}
          onClick={handleClick} // Use the same handler
        >
          <MessageSquare size={20} /> {/* Use MessageSquare icon */}
          <span>Chat Assistant</span>   {/* Changed text */}
        </NavItem>
         {/* --- END CHATBOT LINK --- */}

      </NavMenu>
    </SidebarContainer>
  );
};

export default Sidebar;