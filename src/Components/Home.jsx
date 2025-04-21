import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Adjust path if needed
import CTASection from './CTASection'; // Adjust path if needed
import Footer from './Footer'; // Adjust path if needed
import { ArrowUp } from 'lucide-react'; // <-- Import ArrowUp icon
import './Home.css';

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home"> {/* Consider adding style={{ position: 'relative' }} if needed */}

      {/* Hero Section */}
      <section className="hero">
       {/* ... content ... */}
         <h1>Revolutionize Your Customer Experience</h1>
        <p>
          Harness the power of AI to manage calls, enhance interactions, and drive growth around the clock.
        </p>
      </section>

      {/* Dashboard Preview Section */}
      <section className="dashboard-preview">
       {/* ... content ... */}
        <div className="dashboard-overlay">
          <h2>Real-Time Insights</h2>
          <p>Monitor live interactions and data as they happen to drive faster decisions.</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
          alt="Live Dashboard"
        />
      </section>

      {/* Welcome Section */}
      <section className="welcome">
       {/* ... content ... */}
         <div className="welcome-content">
          <h2>Welcome to the Future of Communication</h2>
          <p>
            Embrace a revolutionary approach to call management. Our AI-driven platform redefines how you connect with customers—making every interaction smarter, faster, and more personalized.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80"
          alt="Innovative Communication"
        />
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
       {/* ... content ... */}
        <div className="how-it-works-content">
          <h2>Seamless Automation in Action</h2>
          <p>
            Our intelligent system not only answers your calls but also anticipates customer needs. From dynamic call routing to real-time scheduling, every feature is designed to elevate your business efficiency.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80"
          alt="Automation Process"
        />
      </section>

      {/* Features Section */}
      <section className="features">
       {/* ... content ... */}
         <h2>What We Offer</h2>
        <div className="features-grid">
          {/* ... feature cards ... */}
           <div className="feature-card">
            <h3>Instant Call Routing</h3>
            <p>
              Automatically direct each call to the most suitable team member for a faster response.
            </p>
            <a href="#" className="learn-more">Explore More</a>
          </div>
          <div className="feature-card">
            <h3>Advanced Message Management</h3>
            <p>
              Capture and organize every message, ensuring no critical detail slips through.
            </p>
            <a href="#" className="learn-more">Discover More</a>
          </div>
          <div className="feature-card">
            <h3>Integrated Scheduling</h3>
            <p>
              Sync your appointments effortlessly with our intelligent calendar integration.
            </p>
            <a href="#" className="learn-more">Learn More</a>
          </div>
          <div className="feature-card">
            <h3>Real-Time Analytics</h3>
            <p>
              Gain actionable insights with dynamic analytics that drive smarter business decisions.
            </p>
            <a href="#" className="learn-more">See Details</a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer Section */}
      <Footer />

      {/* Scroll-to-Top Button <-- MODIFIED */}
      {showScroll && (
        <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
          {/* Replace span with ArrowUp component */}
          <ArrowUp className="scroll-top-icon" />
        </button>
      )}
    </div>
  );
};

export default Home;