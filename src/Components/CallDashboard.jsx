import React, { useState, useEffect,useContext } from "react";
import { Button, Input, notification, Badge, Card, Space, Typography, Tag } from "antd";
import { AuthContext } from "../Contexts/AuthContext";
import {
  PhoneOutlined,
  PoweroffOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import styled, { keyframes, css } from "styled-components";
import io from "socket.io-client";

// Shared layout components
import Navbar from "./Navbar";
import CTASection from "./CTASection";
import Footer from "./Footer";

const { Title, Text } = Typography;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
// Connect to Socket.IO via proxy
const socket = io({
  path: "/socket.io",
  transports: ["websocket"],
  withCredentials: true
});

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
  margin: 20px auto;
  padding: 0 16px;
  flex: 1;
  
  ${media.md`
    margin: 16px auto;
  `}
  
  ${media.sm`
    padding: 0 12px;
    margin: 12px auto;
  `}
`;

const TitleRow = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  ${media.md`
    margin-bottom: 1.5rem;
  `}
  
  ${media.sm`
    margin-bottom: 1rem;
  `}
`;

const DashboardTitle = styled.h1`
  font-size: 4rem;
  margin: 0;
  color: #1a0b2e;
  font-weight: 1000;
  animation: ${fadeIn} 0.8s ease-out;
  
  ${media.lg`
    font-size: 3.5rem;
  `}
  
  ${media.md`
    font-size: 2.75rem;
  `}
  
  ${media.sm`
    font-size: 2.25rem;
  `}
  
  ${media.xs`
    font-size: 1.75rem;
  `}
`;

const DashboardSubtitle = styled.p`
  margin: 0.25rem 0;
  color: #1a0b2e;
  font-size: 1.6rem;
  font-weight: 600;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
  
  ${media.lg`
    font-size: 1.4rem;
  `}
  
  ${media.md`
    font-size: 1.25rem;
  `}
  
  ${media.sm`
    font-size: 1.1rem;
  `}
  
  ${media.xs`
    font-size: 1rem;
  `}
`;

const TwoCardLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  
  ${media.md`
    gap: 1.5rem;
  `}
  
  ${media.sm`
    gap: 1rem;
    flex-direction: column;
  `}
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
    padding: 24px;
  }
  
  ${media.lg`
    min-width: 300px;
  `}
  
  ${media.md`
    flex: 1 1 100%;
    min-width: 0;
  `}
  
  ${media.sm`
    width: 100%;
    .ant-card-body {
      padding: 16px;
    }
  `}
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
    padding: 24px;
  }
  
  ${media.lg`
    min-width: 300px;
  `}
  
  ${media.md`
    flex: 1 1 100%;
    min-width: 0;
  `}
  
  ${media.sm`
    width: 100%;
    .ant-card-body {
      padding: 16px;
    }
  `}
`;

const CardTitle = styled(Title)`
  ${media.sm`
    font-size: 1.5rem !important;
  `}
  
  ${media.xs`
    font-size: 1.3rem !important;
  `}
`;

const CardSubtitle = styled.p`
  ${media.sm`
    font-size: 1.1rem !important;
  `}
  
  ${media.xs`
    font-size: 1rem !important;
  `}
`;

const ResponsiveSpace = styled(Space)`
  ${media.sm`
    flex-direction: column;
    width: 100%;
    
    .ant-input {
      width: 100% !important;
    }
    
    .ant-btn {
      width: 100%;
    }
  `}
`;

const CallList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  ${media.sm`
    gap: 0.75rem;
  `}
`;

const CallItem = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  
  ${media.sm`
    padding: 0.75rem;
  `}
`;

const CallTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PhoneNumberText = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  
  ${media.sm`
    font-size: 1rem;
  `}
`;

const ControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
  
  ${media.sm`
    gap: 0.5rem;
    
    .ant-btn {
      flex: 1;
      min-width: 0;
      padding: 4px 12px;
      height: auto;
      font-size: 0.9rem;
    }
  `}
`;

const NotesArea = styled.textarea`
  width: 100%;
  height: 60px;
  margin-top: 0.75rem;
  padding: 0.5rem;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  
  ${media.sm`
    height: 50px;
  `}
`;

const StatusBadge = styled(Badge)`
  display: inline-block;
  
  ${media.sm`
    .ant-badge-status-text {
      font-size: 0.9rem;
    }
  `}
`;

const CallDashboard = () => {
  const { user } = useContext(AuthContext); // Get user from context
  const [allCalls, setAllCalls] = useState([]); // Store all calls received
  const [activeCallsCount, setActiveCallsCount] = useState(0); // Use separate state for count
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pendingActionCallId, setPendingActionCallId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial fetch

  // Helper function to format duration
  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Update durations locally for ongoing calls
  useEffect(() => {
    const interval = setInterval(() => {
      setAllCalls(prev =>
        prev.map(call => {
          if (call.status === "ongoing" && call.startTime) {
            const newDuration = Math.max(0, Math.floor((Date.now() - new Date(call.startTime)) / 1000));
            return { ...call, duration: newDuration };
          }
          return call;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch initial in-memory call logs (already filtered by backend based on user)
  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/api/calls`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) { throw new Error(`HTTP error! status: ${res.status}`); }
        return res.json();
      })
      .then(data => {
        // Ensure data is an array before setting
        setAllCalls(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch initial calls:", err);
        notification.error({ message: "Failed to load initial calls", description: err.message });
        setIsLoading(false);
        setAllCalls([]); // Set to empty array on error
      });
  }, []); // Fetch only once on mount

  // Listen for real-time updates via Socket.IO
  useEffect(() => {
    const handleCallUpdate = (updatedCall) => {
        console.log("Received callUpdate event:", updatedCall);

        // Check if the update is relevant to the current user (or if user is admin)
        if (user && (updatedCall.user_email === user.email || user.role?.toLowerCase() === 'admin')) {
            // Notify for incoming inbound calls relevant to this user
            if (updatedCall.direction === "inbound" && updatedCall.status === "ringing") {
                notification.info({
                message: "Incoming Call",
                description: `Call from ${updatedCall.from}`,
                placement: "topRight",
                });
            }

            setAllCalls(prev => {
                const index = prev.findIndex(c => c.id === updatedCall.id);
                if (index > -1) {
                // Update existing call
                const newArr = [...prev];
                // Preserve local duration if backend duration is missing/zero and call is ongoing
                const durationToKeep = (updatedCall.status === 'ongoing' && (!updatedCall.duration || updatedCall.duration === 0))
                    ? newArr[index].duration
                    : updatedCall.duration;
                newArr[index] = { ...updatedCall, duration: durationToKeep || 0 };
                return newArr;
                } else {
                // Add new call only if it belongs to the user (or user is admin)
                return [updatedCall, ...prev];
                }
            });
        } else {
             console.log(`Ignoring call update for ${updatedCall.id} as it doesn't belong to user ${user?.email}`);
             // Optional: If an existing call owned by the user is COMPLETED by an admin, remove it?
             if(updatedCall.status === 'completed' || updatedCall.status === 'ended') {
                 setAllCalls(prev => prev.filter(c => c.id !== updatedCall.id));
             }
        }
    };


    const handleActiveCalls = (count) => {
      // Note: This count received from backend is GLOBAL, not user-specific
      // We might calculate the user-specific count on the frontend instead
      console.log("Received global activeCalls count:", count);
      setActiveCallsCount(count); // Use this for now, or calculate locally later
    };

    socket.on("callUpdate", handleCallUpdate);
    socket.on("activeCalls", handleActiveCalls); // Listen for global count

    // Cleanup listeners on component unmount
    return () => {
      socket.off("callUpdate", handleCallUpdate);
      socket.off("activeCalls", handleActiveCalls);
    };
  }, [user]); // Re-run effect if user object changes

  // Start Outbound Call
  const startCall = async () => {
    // ... (keep existing startCall logic - it already associates user via backend) ...
     if (!phoneNumber) {
      notification.error({ message: "Please enter a valid phone number" });
      return;
    }
    // Optimistic UI update (optional) - Add a temporary "calling..." state?
    try {
      const res = await fetch(`${API_BASE_URL}/api/calls/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Call initiation failed");
      notification.success({ message: "Call initiated" });
      setPhoneNumber("");
      // Backend will send socket event to add the call
    } catch (error) {
      console.error("startCall error:", error);
      notification.error({ message: error.message || "Failed to start call" });
    }
  };

  // --- Inbound/End call actions remain the same ---
  const answerCall = async (callId) => {
     // ... (keep existing answerCall logic) ...
      setPendingActionCallId(callId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/calls/answer/${callId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to answer call");
      notification.success({ message: "Answer request sent" }); // Updated msg
    } catch (error) {
      console.error("answerCall error:", error);
      notification.error({ message: error.message || "Failed to answer call" });
    } finally {
      setPendingActionCallId(null);
    }
  };

  const rejectCall = async (callId) => {
    // ... (keep existing rejectCall logic) ...
     setPendingActionCallId(callId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/calls/reject/${callId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reject call");
      notification.success({ message: "Call rejected" });
    } catch (error) {
      console.error("rejectCall error:", error);
      notification.error({ message: error.message || "Failed to reject call" });
    } finally {
      setPendingActionCallId(null);
    }
  };

  const endCall = async (callId) => {
    // ... (keep existing endCall logic - backend handles Vapi call) ...
      setPendingActionCallId(callId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/calls/end/${callId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to end call");
      // Notification shown based on backend response, maybe change to "End request sent"
       notification.info({ message: data.message || "End call request sent" });
    } catch (error) {
      console.error("endCall error:", error);
      notification.error({ message: error.message || "Failed to send end call request" });
    } finally {
      setPendingActionCallId(null);
    }
  };
  // --- End unchanged actions ---

  const statusColors = {
    queued: "gold",
    ringing: "blue",
    ongoing: "red",
    ended: "green",
    completed: "green",
    failed: "volcano",
    answering: "cyan", // Intermediate state
    rejecting: "orange", // Intermediate state
    ending: "orange" // Intermediate state
  };

  // Filter calls *relevant to the current user* for display
  // Admins see all calls, regular users see only their own
  const filteredCalls = allCalls.filter(call =>
    user && (user.role?.toLowerCase() === 'admin' || call.user_email === user.email)
  );

  const inboundCalls = filteredCalls.filter(call => call.direction === "inbound" && !['completed', 'ended', 'failed'].includes(call.status));
  const outboundActive = filteredCalls.filter(call => call.direction === "outbound" && !['completed', 'ended', 'failed'].includes(call.status));

  // Calculate user-specific active counts
  const activeInboundCount = inboundCalls.length;
  const activeOutboundCount = outboundActive.length;


  // --- RENDER ITEMS (No major changes needed in rendering logic itself) ---
  const renderInboundItem = (call) => {
    const { id, from, status, duration } = call;
    return (
      <CallItem key={id}>
        <CallTopRow>
          <PhoneNumberText>{from || 'Unknown Number'}</PhoneNumberText>
          {(status === "ongoing" || status === "answering") && <Tag color="red">LIVE: {formatDuration(duration || 0)}</Tag>}
        </CallTopRow>
        <div style={{ margin: "0.5rem 0" }}>
          <StatusBadge color={statusColors[status] || 'default'} text={status?.toUpperCase() || 'UNKNOWN'} />
        </div>
        {/* Removed NotesArea for brevity, add back if needed */}
        <ControlsRow>
          {status === "ringing" && (
            <>
              <Button /* ... Answer Button ... */ icon={pendingActionCallId === id ? <LoadingOutlined /> : <CheckCircleOutlined />} type="primary" onClick={() => answerCall(id)} disabled={pendingActionCallId === id}>{pendingActionCallId === id ? "Processing..." : "Answer"}</Button>
              <Button /* ... Reject Button ... */ icon={pendingActionCallId === id ? <LoadingOutlined /> : <CloseCircleOutlined />} danger onClick={() => rejectCall(id)} disabled={pendingActionCallId === id}>{pendingActionCallId === id ? "Processing..." : "Reject"}</Button>
            </>
          )}
          {(status === "ongoing" || status === "answering") && ( // Can end if ongoing or answering attempt
            <Button /* ... End Button ... */ icon={pendingActionCallId === id ? <LoadingOutlined /> : <PoweroffOutlined />} danger onClick={() => endCall(id)} disabled={pendingActionCallId === id}>{pendingActionCallId === id ? "Ending..." : "End Call"}</Button>
          )}
        </ControlsRow>
      </CallItem>
    );
  };

  const renderOutboundItem = (call) => {
    const { id, from, status, duration } = call; // 'from' is the number called for outbound
    return (
      <CallItem key={id}>
        <CallTopRow>
          <PhoneNumberText>{from || 'Unknown Number'}</PhoneNumberText>
           {(status === "ongoing") && <Tag color="red">LIVE: {formatDuration(duration || 0)}</Tag>}
        </CallTopRow>
        <div style={{ margin: "0.5rem 0" }}>
           <StatusBadge color={statusColors[status] || 'default'} text={status?.toUpperCase() || 'UNKNOWN'} />
        </div>
        <ControlsRow>
           {(status === "ongoing" || status === "queued") && ( // Allow ending if queued or ongoing
            <Button /* ... End Button ... */ icon={pendingActionCallId === id ? <LoadingOutlined /> : <PoweroffOutlined />} danger onClick={() => endCall(id)} disabled={pendingActionCallId === id}>{pendingActionCallId === id ? "Ending..." : "End Call"}</Button>
          )}
        </ControlsRow>
      </CallItem>
    );
  };
   // --- END RENDER ITEMS ---

  return (
    <>
      <PageWrapper>
        <ContentWrapper>
          <TitleRow>
            <DashboardTitle>Call Center Dashboard</DashboardTitle>
            <DashboardSubtitle>Manage your inbound and outbound calls</DashboardSubtitle>
          </TitleRow>
          {isLoading ? (
             <div style={{ textAlign: 'center', padding: '50px' }}><LoadingOutlined style={{ fontSize: '3rem' }} /></div>
          ) : (
            <TwoCardLayout>
              {/* Outbound Section */}
              <OutboundCard>
                <div>
                  <CardTitle level={4} style={{ marginBottom: "0.5rem", color: "#4e54c8", fontWeight: 800, fontSize: "1.7rem" }}>
                    Outbound Calls
                  </CardTitle>
                  <CardSubtitle style={{ margin: 0, color: "white", fontWeight: 800, fontSize: "1.3rem" }}>
                    Initiate and monitor outbound calls
                  </CardSubtitle>
                </div>
                <ResponsiveSpace style={{ flexWrap: "wrap" }}>
                  <Input
                    placeholder="Enter phone number (e.g., +1415...)"
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
                </ResponsiveSpace>
                <div style={{ marginTop: "auto" }}>
                  {/* Display count specific to user */}
                  <p style={{ margin: "0.5rem 0", color: "white", fontWeight: 600, fontSize: "1rem" }}>
                    Your Active Outbound Calls:{" "}
                    <Badge count={activeOutboundCount} style={{ backgroundColor: "#52c41a" }} />
                  </p>
                  {outboundActive.length > 0 ? (
                      <CallList>
                          {outboundActive.map((call) => renderOutboundItem(call))}
                      </CallList>
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
                  <CardTitle level={4} style={{ marginBottom: "0.5rem", color: "#0d9488", fontWeight: 800, fontSize: "1.6rem" }}>
                    Inbound Calls
                  </CardTitle>
                  <CardSubtitle style={{ margin: 0, color: "white", fontWeight: 800, fontSize: "1.3rem" }}>
                    Receive and manage inbound calls
                  </CardSubtitle>
                </div>
                <div style={{ marginTop: "auto" }}>
                   {/* Display count specific to user */}
                  <p style={{ margin: "0.5rem 0", color: "white", fontWeight: 600, fontSize: "1rem" }}>
                    Your Active Inbound Calls:{" "}
                    <Badge count={activeInboundCount} style={{ backgroundColor: "#52c41a" }} />
                  </p>
                  {inboundCalls.length > 0 ? (
                      <CallList>
                          {inboundCalls.map((call) => renderInboundItem(call))}
                      </CallList>
                  ) : (
                      <p style={{ fontStyle: "italic", color: "white", fontWeight: 600, fontSize: "1rem" }}>
                          No active inbound calls
                      </p>
                  )}
                </div>
              </InboundCard>
            </TwoCardLayout>
          )}
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default CallDashboard;