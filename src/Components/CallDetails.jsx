// src/Components/CallDetails.jsx
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #f0f4f8 100%);
  padding: 2rem;
`;

const CallCard = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  background: #1a0b2e;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out;
  margin-bottom: 1.5rem;
`;

const CardHeader = styled.div`
  background: ${(props) => (props.$type === "inbound" ? "#0d9488" : "#4e54c8")};
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardBody = styled.div`
  padding: 1.5rem 2rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: white;
`;

const Value = styled.p`
  margin: 0;
  font-size: 1rem;
  color: white;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1a0b2e;
  font-weight: 800;
  animation: ${fadeIn} 0.6s ease-out;
`;

const CallDetails = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/call-logs`, { credentials: "include" }) // Use template literal
      .then((res) => {
          if (!res.ok) { throw new Error(`HTTP error! status: ${res.status}`); }
          return res.json()
      })
      .then((data) => {
        setCallLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch call logs:", err);
        // Optionally show notification
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <div>Loading call history...</div>
      </PageContainer>
    );
  }

  if (callLogs.length === 0) {
    return (
      <PageContainer>
        <CallCard>
          <CardBody>
            <Title>No call history found.</Title>
          </CardBody>
        </CallCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Heading>Call History</Heading>
      {callLogs.map((call) => (
        <CallCard key={call.call_id}>
          <CardHeader $type={call.direction}>
            <div>
              {call.direction === "inbound" ? "Inbound Call" : "Outbound Call"}
            </div>
            <div>{new Date(call.start_time).toLocaleString()}</div>
          </CardHeader>
          <CardBody>
            <InfoRow>
              <Title>Phone Number:</Title>
              <Value>{call.phone_number}</Value>
            </InfoRow>
            <InfoRow>
              <Title>Status:</Title>
              <Value>{call.status}</Value>
            </InfoRow>
            <InfoRow>
              <Title>Duration:</Title>
              <Value>{call.duration} seconds</Value>
            </InfoRow>
            {call.agent_id && (
              <InfoRow>
                <Title>Agent:</Title>
                <Value>{call.agent_id}</Value>
              </InfoRow>
            )}
            {call.notes && (
              <InfoRow>
                <Title>Notes:</Title>
                <Value>{call.notes}</Value>
              </InfoRow>
            )}
          </CardBody>
        </CallCard>
      ))}
      <Footer />
    </PageContainer>
  );
};

export default CallDetails;