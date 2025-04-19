// src/Components/CustomerDetails.jsx
import React, { useEffect, useState } from "react";
import { Card, Typography, Spin, notification } from "antd";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled, { keyframes } from "styled-components";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const { Title, Text } = Typography;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(90px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const StyledCard = styled(Card)`
  border-radius: 20px !important;
  background: #1a0b2e !important;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1) !important;
  margin: 20px auto;
  text-align: left;
  padding: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  .ant-card-body {
    color: #ffffff; /* Set all inner text to white */
  }
`;

const Heading = styled(Title)`
  font-size: 3.5rem !important;
  color: #1a0b2e !important;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 1500;
  letter-spacing: -1px;
`;

const Label = styled(Text)`
  color: #ffffff;
  font-weight: 800;
  font-size:1.2rem;
  letter-spacing: -1px;
`;

const Value = styled(Text)`
  color: #ffffff;
    font-size:1rem;
    letter-spacing: -1px;
`;

const CustomerDetails = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/subscriptions/me`, { credentials: "include" }) // Use template literal
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) { // Specific handling for not found
              console.log("No active subscription found for user.");
              return null; // Return null to indicate no subscription
          }
          throw new Error(`Failed to fetch subscription: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setSubscription(data); // data will be null if status was 404
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch subscription details:", err);
        notification.error({ message: "Failed to load subscription details", description: err.message });
        setLoading(false);
      });
  }, []);

  if (loading) return <Spin />;
  if (!subscription) return <Text>No subscription found.</Text>;

  return (
    <>
      <ContentWrapper>
        <Heading level={1}>Customer Subscription Details</Heading>
        <StyledCard>
          <Label>Name:</Label> <Value>{subscription.name}</Value><br /><br />
          <Label>Email:</Label> <Value>{subscription.email}</Value><br /><br />
          <Label>Subscription ID:</Label> <Value>{subscription.subscription_id}</Value><br /><br />
          <Label>Plan:</Label> <Value>{subscription.plan}</Value><br /><br />
          <Label>Price:</Label> <Value>£{subscription.price}</Value><br /><br />
          <Label>Status:</Label> <Value>{subscription.status}</Value><br /><br />
          <Label>Subscription Created:</Label> <Value>{new Date(subscription.created_at).toLocaleString()}</Value><br /><br />
          <Label>Subscription Expires:</Label> <Value>{subscription.expiry_date ? new Date(subscription.expiry_date).toLocaleString() : "N/A"}</Value>
        </StyledCard>
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default CustomerDetails;
