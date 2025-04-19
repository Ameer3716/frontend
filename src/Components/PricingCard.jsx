import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './PricingCard.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const PricingCard = ({ planName, planId, price, features, bgClass }) => {
  const handleSubscribe = async () => {
    try {
      // 1. Fetch current user from the backend
      const userRes = await fetch(`${API_BASE_URL}/api/user`, {
        credentials: 'include'
      });

      if (!userRes.ok) {
        // If not logged in, prompt for login
        alert("Please log in first!");
        return;
      }

      // 2. Get the user email from response
      const userData = await userRes.json();
      const email = userData.email;
      console.log("User email:", email);

      // 3. Create Stripe Checkout session
      const response = await fetch(`${API_BASE_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ planId, email })
      });

      const data = await response.json();
      console.log("Stripe session response:", data);

      if (!data.sessionId) {
        console.error("No sessionId received from backend");
        return;
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
      
    } catch (error) {
      console.error("Error in checkout:", error);
    }
  };

  return (
    <div className={`pricing-card ${bgClass}`}>
      <div className="pricing-card-header">
        <h2 className="pricing-card-plan">{planName}</h2>
        {planId && (
          <p className="pricing-card-plan-id">({planId.toUpperCase()})</p>
        )}
      </div>
      <div className="pricing-card-price">
        <span className="currency-symbol">£</span>
        {price}
        <span className="price-frequency">/Month</span>
      </div>
      <ul className="pricing-card-features">
        {features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <button onClick={handleSubscribe} className="pricing-card-button">
        Subscribe
      </button>
    </div>
  );
};

export default PricingCard;
