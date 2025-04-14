import React from 'react';
import { Phone, Calendar, Bot } from 'lucide-react';
import './CTASection.css';

const CTASection = () => {
  return (
    <div className="cta-section">
      <h2 className="cta-heading">Elevate Your Communication Today</h2>
      <div className="cta-features">
        <div className="cta-feature">
          <Phone className="cta-icon" />
          <span>24/7 Call Coverage</span>
        </div>
        <div className="cta-feature">
          <Calendar className="cta-icon" />
          <span>Seamless Scheduling</span>
        </div>
        <div className="cta-feature">
          <Bot className="cta-icon" />
          <span>Intelligent Routing</span>
        </div>
      </div>
      <button className="cta-btn">Request a Demo</button>
    </div>
  );
};

export default CTASection;
