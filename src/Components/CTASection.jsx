// src/Components/CTASection.jsx
import React, { useState, useContext } from 'react';
import { Phone, Calendar, Bot, X } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext'; // Adjust path if needed
import './CTASection.css';

const CTASection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);

  const handleDemoClick = () => {
    if (loading) return;
    if (user) {
      setIsVideoModalOpen(true);
    } else {
      alert("Please log in first to watch the demo video.");
    }
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <>
      <div className="cta-section">
        {/* ... heading and features ... */}
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
        <button className="cta-btn" onClick={handleDemoClick}>Request a Demo</button>
      </div>

      {isVideoModalOpen && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close-btn" onClick={closeVideoModal} aria-label="Close video modal">
              <X size={24} />
            </button>
            <div className="video-container">
              {/* --- Use root-relative path for video in public folder --- */}
              <video width="100%" height="100%" controls autoPlay>
                {/* Assuming your video is named demo-video.mp4 inside /public */}
                <source src="/record.mp4" type="video/mp4" />
                {/* Add other formats if needed */}
                {/* <source src="/demo-video.webm" type="video/webm" /> */}
                Your browser does not support the video tag.
              </video>
              {/* --- End video tag --- */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CTASection;