// src/Components/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar'
const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  margin-top:10px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  background:#F0F8FF;
  border-radius:10px;
`;

const DashboardLayout = () => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </LayoutWrapper>
  );
};

export default DashboardLayout;
