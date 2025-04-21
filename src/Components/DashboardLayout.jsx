import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

/* --- Breakpoints --- */
const breakpoints = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

/* --- Media Queries --- */
const media = {
  xs: (...args) => css`
    @media (max-width: ${breakpoints.xs}) {
      ${css(...args)}
    }
  `,
  sm: (...args) => css`
    @media (max-width: ${breakpoints.sm}) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (max-width: ${breakpoints.md}) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (max-width: ${breakpoints.lg}) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media (max-width: ${breakpoints.xl}) {
      ${css(...args)}
    }
  `,
};

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  margin-top: 60px;
  gap: 20px;
  padding: 0 16px;
  position: relative;
  
  ${media.xl`
    padding: 0 12px;
    gap: 16px;
  `}
  
  ${media.lg`
    padding: 0 8px;
    gap: 12px;
  `}
  
  ${media.md`
    margin-top: 50px;
    padding: 8px;
    gap: 8px;
  `}
  
  ${media.sm`
    padding: 4px;
    gap: 4px;
    flex-direction: column;
  `}
`;

const ContentArea = styled.div`
  flex: 1;
  max-width: calc(100% - 280px);
  padding: 24px;
  background: #F0F8FF;
  border-radius: 10px;
  transition: all 0.3s ease;
  
  ${media.xl`
    max-width: calc(100% - 260px);
    padding: 20px;
  `}
  
  ${media.lg`
    max-width: calc(100% - 240px);
    padding: 16px;
  `}
  
  ${media.md`
    max-width: 100%;
    padding: 12px;
    margin: 0;
  `}
  
  ${media.sm`
    padding: 8px;
    border-radius: 8px;
    max-width: 100%;
  `}
`;

const SidebarWrapper = styled.div`
  width: 260px;
  min-width: 260px;
  transition: all 0.3s ease;
  
  ${media.xl`
    width: 240px;
    min-width: 240px;
  `}
  
  ${media.lg`
    width: 220px;
    min-width: 220px;
  `}
  
  ${media.md`
    position: fixed;
    top: 60px;
    left: ${props => props.isOpen ? '0' : '-100%'};
    height: calc(100vh - 60px);
    z-index: 1000;
    background: #1a1a2e;
    margin-top: 10px;
    padding: 0 10px;
  `}
`;

const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 22px;
  left: 15px;
  z-index: 1011;
  background: transparent;
  border: none;
  color: white;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  
  ${media.md`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  
  ${media.md`
    display: ${props => props.isOpen ? 'block' : 'none'};
  `}
`;

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutWrapper>
      <MenuButton onClick={toggleSidebar}>
        <Menu size={24} />
      </MenuButton>
      <Overlay isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      <SidebarWrapper isOpen={isSidebarOpen}>
        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
      </SidebarWrapper>
      <ContentArea>
        <Outlet />
      </ContentArea>
    </LayoutWrapper>
  );
};

export default DashboardLayout;