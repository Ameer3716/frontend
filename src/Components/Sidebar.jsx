import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PhoneIncoming, Users, FileText } from 'lucide-react';
import styled from 'styled-components';

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

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #cccccc;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #16213e;
    color: #ffffff;
  }

  &.active {
    background-color: #0f3460;
    color: #ffffff;
    font-weight: bold;
  }
`;

const Sidebar = ({ onNavigate }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleClick = () => {
    if (onNavigate) onNavigate();
  };

  return (
    <SidebarContainer>
      <Logo>
        <PhoneIncoming size={24} />
        <span>CallCenter</span>
      </Logo>
      <NavMenu>
        <NavItem to="/dashboard" className={isActive('/dashboard')} onClick={handleClick}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavItem>
        <NavItem to="/dashboard/calldetails" className={isActive('/dashboard/calldetails')} onClick={handleClick}>
          <FileText size={20} />
          <span>Call Details</span>
        </NavItem>
        <NavItem to="/dashboard/customerdetails" className={isActive('/dashboard/customerdetails')} onClick={handleClick}>
          <Users size={20} />
          <span>Customer Details</span>
        </NavItem>
      </NavMenu>
    </SidebarContainer>
  );
};

export default Sidebar;