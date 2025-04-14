// src/Components/CallDashboard.jsx
import React, { useState, useEffect } from "react";
import { Button, Input, notification, Badge, Card, Space, Typography, Tag } from "antd";
import {
  PhoneOutlined,
  PoweroffOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import styled, { keyframes } from "styled-components";
import io from "socket.io-client";

// Shared layout components
import Navbar from "./Navbar";
import CTASection from "./CTASection";
import Footer from "./Footer";

const { Title, Text } = Typography;

// Connect to Socket.IO via proxy
const socket = io({
  path: "/socket.io",
  transports: ["websocket"],
  withCredentials: true
});

/* --- Animations --- */
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* --- Styled Components --- */
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #F0F8FF;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  flex: 1;
`;

const TitleRow = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const DashboardTitle = styled.h1`
  font-size: 4rem;
  margin: 0;
  color: #1a0b2e;
  font-weight: 1000;
  animation: ${fadeIn} 0.8s ease-out;
`;

const DashboardSubtitle = styled.p`
  margin: 0.25rem 0;
  color: #1a0b2e;
  font-size: 1.6rem;
  font-weight: 600;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

const TwoCardLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

/* Outbound Card */
const OutboundCard = styled(Card)`
  flex: 1 1 400px;
  min-width: 350px;
  border-radius: 12px;
  background: #1a0b2e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.8s ease-out;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

/* Inbound Card */
const InboundCard = styled(Card)`
  flex: 1 1 400px;
  min-width: 350px;
  border-radius: 12px;
  background: #1a0b2e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.3s;
  animation-fill-mode: both;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const CallList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CallItem = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const CallTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PhoneNumberText = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

const ControlsRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const NotesArea = styled.textarea`
  width: 100%;
  height: 60px;
  margin-top: 0.75rem;
  padding: 0.5rem;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const CallDashboard = () => {
  const [calls, setCalls] = useState([]);
  const [activeCalls, setActiveCalls] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pendingActionCallId, setPendingActionCallId] = useState(null);

  // Update durations for ongoing calls
  useEffect(() => {
    const interval = setInterval(() => {
      setCalls(prev =>
        prev.map(call =>
          call.status === "ongoing"
            ? { ...call, duration: Math.floor((Date.now() - new Date(call.startTime)) / 1000) }
            : call
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch call logs from backend
  useEffect(() => {
    fetch("/api/calls")
      .then(res => res.json())
      .then(data => setCalls(data))
      .catch(err => {
        console.error("Failed to fetch calls:", err);
        notification.error({ message: "Failed to load call logs" });
      });
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    socket.on("callUpdate", updatedCall => {
      console.log("Received callUpdate event:", updatedCall);
      // Notify for incoming inbound calls
      if (updatedCall.direction === "inbound" && updatedCall.status === "ringing") {
        notification.info({
          message: "Incoming Call",
          description: `Incoming call from ${updatedCall.from}`,
          placement: "topRight",
        });
      }
      setCalls(prev => {
        const index = prev.findIndex(c => c.id === updatedCall.id);
        if (index > -1) {
          const newArr = [...prev];
          newArr[index] = updatedCall;
          return newArr;
        }
        return [updatedCall, ...prev];
      });
    });
    socket.on("activeCalls", setActiveCalls);
    return () => {
      socket.off("callUpdate");
      socket.off("activeCalls");
    };
  }, []);

  // Outbound Call: Start call
  const startCall = async () => {
    if (!phoneNumber) {
      notification.error({ message: "Please enter a valid phone number" });
      return;
    }
    try {
      const res = await fetch("/api/calls/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Call initiation failed");
      notification.success({ message: "Call initiated" });
      setPhoneNumber("");
    } catch (error) {
      console.error("startCall error:", error);
      notification.error({ message: error.message });
    }
  };

  // Inbound Call Actions (Answer and Reject only)
  const answerCall = async (callId) => {
    setPendingActionCallId(callId);
    try {
      const res = await fetch(`/api/calls/answer/${callId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to answer call");
      notification.success({ message: "Call answered" });
    } catch (error) {
      console.error("answerCall error:", error);
      notification.error({ message: error.message });
    } finally {
      setPendingActionCallId(null);
    }
  };

  const rejectCall = async (callId) => {
    setPendingActionCallId(callId);
    try {
      const res = await fetch(`/api/calls/reject/${callId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reject call");
      notification.success({ message: "Call rejected" });
    } catch (error) {
      console.error("rejectCall error:", error);
      notification.error({ message: error.message });
    } finally {
      setPendingActionCallId(null);
    }
  };

  // Outbound calls now only have the End Call button (transfer functionality removed)
  const endCall = async (callId) => {
    setPendingActionCallId(callId);
    try {
      const res = await fetch(`/api/calls/end/${callId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to end call");
      notification.success({ message: "Call ended" });
    } catch (error) {
      console.error("endCall error:", error);
      notification.error({ message: error.message });
    } finally {
      setPendingActionCallId(null);
    }
  };

  const statusColors = {
    ringing: "blue",
    answered: "cyan",
    ongoing: "red",
    completed: "green"
  };

  // Separate inbound and outbound calls (only active calls)
  const inboundCalls = calls.filter(call => call.direction === "inbound" && call.status !== "completed");
  const outboundActive = calls.filter(call => call.direction === "outbound" && call.status !== "completed");

  // Render call item for inbound calls (without transfer functionality)
  const renderInboundItem = (call) => {
    const { id, from, status, duration } = call;
    return (
      <CallItem key={id}>
        <CallTopRow>
          <PhoneNumberText>{from}</PhoneNumberText>
          {status === "ongoing" && <Tag color="red">LIVE: {duration}s</Tag>}
        </CallTopRow>
        <div style={{ margin: "0.5rem 0" }}>
          <Badge color={statusColors[status]} text={status.toUpperCase()} />
        </div>
        <NotesArea placeholder="Add notes about the call..." />
        <ControlsRow>
          {status === "ringing" && (
            <>
              <Button
                icon={pendingActionCallId === id ? <LoadingOutlined /> : <CheckCircleOutlined />}
                type="primary"
                onClick={() => answerCall(id)}
                disabled={pendingActionCallId === id}
              >
                {pendingActionCallId === id ? "Processing..." : "Answer"}
              </Button>
              <Button
                icon={pendingActionCallId === id ? <LoadingOutlined /> : <CloseCircleOutlined />}
                danger
                onClick={() => rejectCall(id)}
                disabled={pendingActionCallId === id}
              >
                {pendingActionCallId === id ? "Processing..." : "Reject"}
              </Button>
            </>
          )}
          {status === "ongoing" && (
            <Button
              icon={pendingActionCallId === id ? <LoadingOutlined /> : <PoweroffOutlined />}
              danger
              onClick={() => endCall(id)}
              disabled={pendingActionCallId === id}
            >
              {pendingActionCallId === id ? "Ending..." : "End Call"}
            </Button>
          )}
        </ControlsRow>
      </CallItem>
    );
  };

  // Render call item for outbound calls (transfer functionality removed)
  const renderOutboundItem = (call) => {
    const { id, from, status, duration } = call;
    return (
      <CallItem key={id}>
        <CallTopRow>
          <PhoneNumberText>{from}</PhoneNumberText>
          {status === "ongoing" && <Tag color="red">LIVE: {duration}s</Tag>}
        </CallTopRow>
        <div style={{ margin: "0.5rem 0" }}>
          <Badge color={statusColors[status]} text={status.toUpperCase()} />
        </div>
        <ControlsRow>
          {status !== "completed" && (
            <Button
              icon={pendingActionCallId === id ? <LoadingOutlined /> : <PoweroffOutlined />}
              danger
              onClick={() => endCall(id)}
              disabled={pendingActionCallId === id}
            >
              {pendingActionCallId === id ? "Ending..." : "End Call"}
            </Button>
          )}
        </ControlsRow>
      </CallItem>
    );
  };

  return (
    <>
      <PageWrapper>
        <ContentWrapper>
          <TitleRow>
            <DashboardTitle>Call Center Dashboard</DashboardTitle>
            <DashboardSubtitle>Manage your inbound and outbound calls</DashboardSubtitle>
          </TitleRow>
          <TwoCardLayout>
            {/* Outbound Section */}
            <OutboundCard>
              <div>
                <Title level={4} style={{ marginBottom: "0.5rem", color: "#4e54c8", fontWeight: 800, fontSize: "1.7rem" }}>
                  Outbound Calls
                </Title>
                <p style={{ margin: 0, color: "white", fontWeight: 800, fontSize: "1.3rem" }}>
                  Initiate and monitor outbound calls
                </p>
              </div>
              <Space style={{ flexWrap: "wrap" }}>
                <Input
                  placeholder="Enter phone number (e.g., +14155550123)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ width: 220 }}
                />
                <Button
                  type="primary"
                  icon={<PhoneOutlined />}
                  onClick={startCall}
                  style={{ backgroundColor: "#4e54c8", borderColor: "#4e54c8" }}
                >
                  Make Call
                </Button>
              </Space>
              <div style={{ marginTop: "auto" }}>
                {outboundActive.length > 0 ? (
                  <>
                    <p style={{ margin: "0.5rem 0", color: "white", fontWeight: 600, fontSize: "1rem" }}>
                      Active Outbound Calls:{" "}
                      <Badge count={outboundActive.length} style={{ backgroundColor: "#52c41a" }} />
                    </p>
                    <CallList>
                      {outboundActive.map((call) => renderOutboundItem(call))}
                    </CallList>
                  </>
                ) : (
                  <p style={{ fontStyle: "italic", color: "white", fontWeight: 600, fontSize: "1rem" }}>
                    No active outbound calls
                  </p>
                )}
              </div>
            </OutboundCard>
            {/* Inbound Section */}
            <InboundCard>
              <div>
                <Title level={4} style={{ marginBottom: "0.5rem", color: "#0d9488", fontWeight: 800, fontSize: "1.6rem" }}>
                  Inbound Calls
                </Title>
                <p style={{ margin: 0, color: "white", fontWeight: 800, fontSize: "1.3rem" }}>
                  Receive and manage inbound calls
                </p>
              </div>
              <div style={{ marginTop: "auto" }}>
                {inboundCalls.length > 0 ? (
                  <>
                    <p style={{ margin: "0.5rem 0", color: "white", fontWeight: 600, fontSize: "1rem" }}>
                      Active Inbound Calls:{" "}
                      <Badge count={inboundCalls.length} style={{ backgroundColor: "#52c41a" }} />
                    </p>
                    <CallList>
                      {inboundCalls.map((call) => renderInboundItem(call))}
                    </CallList>
                  </>
                ) : (
                  <p style={{ fontStyle: "italic", color: "white", fontWeight: 600, fontSize: "1rem" }}>
                    No active inbound calls
                  </p>
                )}
              </div>
            </InboundCard>
          </TwoCardLayout>
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default CallDashboard;
