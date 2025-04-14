import React from 'react';
import Navbar from './Navbar';
import PricingHeader from './PricingHeader';
import PricingCard from './PricingCard';
import ReviewCard from './ReviewCard';
import CTASection from './CTASection';
import Footer from './Footer';
import { ArrowUp } from 'lucide-react';
import './Pricing.css';

const pricingPlans = [
  
  {
    title: 'Pro',
    price: 99,
    planId: 'pro',
    features: [
      'Complete Inbound & Outbound Handling',
      'Automated Appointment Scheduling',
      '25 Simultaneous Connections',
      'Seamless CRM Synchronization',
      'Enhanced Reporting Suite'
    ]
  },
  {
    title: 'Growth',
    price: 249,
    planId: 'growth',
    features: [
      'All Pro Features Included',
      'Customizable AI Responses',
      'Advanced Call Routing',
      '50 Simultaneous Connections',
      'Team Collaboration Dashboard'
    ]
  },
  {
    title: 'Agency',
    price: 499,
    planId: 'agency',
    features: [
      'Full-Scale Multi-Agent Management',
      'Priority Support & Integrations',
      'Unlimited Call Handling',
      'Branded White-Label Solutions',
      'Custom Analytics & Insights'
    ]
  }
];

const reviews = [
  {
    title: 'Revolutionary Experience',
    content: "Our call center turned into a finely tuned, high-performance machine overnight. This system redefined our operations!",
    author: 'Alex D.',
    role: 'Business Strategist'
  },
  {
    title: 'Unmatched Efficiency!',
    content: "Handling calls and appointments has never been smoother. Our team now has more time to innovate and grow the business.",
    author: 'Samantha R.',
    role: 'Operations Manager'
  },
  {
    title: 'Game Changer',
    content: "From chaotic call routing to flawless customer interactions, our satisfaction scores have skyrocketed. Truly transformative!",
    author: 'Jordan M.',
    role: 'Customer Success Lead',
    date: '03/25/2025'
  }
];

function Pricing() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <PricingHeader />

      <div className="pricing-plans">
        <div className="pricing-plans-grid">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>

      <div className="reviews-section">
        <div className="reviews-container">
          <h2 className="reviews-title">Customer Testimonials</h2>
          <p className="reviews-subtitle">
            Hear how our innovative call management solution is transforming businesses.
          </p>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </div>

      <CTASection />
      <Footer />

      <button onClick={scrollToTop} className="scroll-to-top">
        <ArrowUp className="scroll-top-icon" />
      </button>
    </div>
  );
}

export default Pricing;
