import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import Navbar from './Navbar';
import CTASection from './CTASection';
import Footer from './Footer';
import { AuthContext } from '../Contexts/AuthContext'; // Assuming path is correct
import { ArrowUp } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);
  const { user, loading: authLoading } = useContext(AuthContext); // Get user and loading state
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for "Explore More" and "Discover More" links
  const handleFeatureLinkClick = (e, featureType) => {
    e.preventDefault(); // Prevent default anchor behavior

    if (authLoading) {
      // Optionally show a loading state or disable link if auth state is still loading
      console.log("Auth state still loading...");
      return;
    }

    if (user && user.isSubscribed) {
      if (featureType === 'dashboard') {
        navigate('/dashboard');
      } else if (featureType === 'chatbot') {
        navigate('/dashboard/chatbot');
      }
    } else if (user && !user.isSubscribed) {
      // Authenticated but not subscribed, redirect to pricing
      alert("Please subscribe to access this feature."); // Or a more elegant modal
      navigate('/pricing');
    } else {
      // Not authenticated, prompt to login (or redirect to login/pricing)
      alert("Please log in and subscribe to access this feature.");
      // Assuming your login button uses <a href="/auth/google">
      window.location.href = '/auth/google'; // Or navigate('/login') if you have a login page
    }
  };


  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Revolutionize Your Customer Experience</h1>
        <p>
          Harness the power of AI to manage calls, enhance interactions, and drive growth around the clock.
        </p>
      </section>

      {/* Dashboard Preview Section */}
      <section className="dashboard-preview">
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
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Effortless Outbound Calling</h3>
            <p>
            Deliver brilliant, personalized outbound calls powered by VAPI AI. Automate outreach, enhance agent productivity, and ensure every lead is followed up with precision and excellence.
            </p>
            {/* Updated Link */}
            <a href="#" onClick={(e) => handleFeatureLinkClick(e, 'dashboard')} className="learn-more">
              Explore More
            </a>
          </div>
          <div className="feature-card">
            <h3>Advanced Message Management</h3>
            <p>
            Our AI-powered chat assistant brilliantly organizes, categorizes, and tracks every customer message, ensuring no query goes unanswered and your communication stays top-notch.
            </p>
            {/* Updated Link */}
            <a href="#" onClick={(e) => handleFeatureLinkClick(e, 'chatbot')} className="learn-more">
              Discover More
            </a>
          </div>
          <div className="feature-card">
            <h3>Intelligent Inbound Call Handling</h3>
            <p>
            Handle every incoming call with brilliance. Instantly route calls to the right agent using AI-powered logic, ensuring exceptional customer experiences and faster resolutions.
            </p>
            {/* Updated Link */}
            <a href="#" onClick={(e) => handleFeatureLinkClick(e, 'dashboard')} className="learn-more">
              Explore More
            </a>
          </div>
          <div className="feature-card">
            <h3>GoHighLevel CRM Integration</h3>
            <p>
            Seamlessly sync call and user data with GoHighLevel. Track every interaction with excellence and unlock powerful automations to drive smarter, data-informed decisions.
            </p>
            {/* Kept as '#' or link to a relevant info page if not a direct feature access */}
            <a href="#" className="learn-more">See Details</a>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />

      {showScroll && (
        <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
          <ArrowUp className="scroll-top-icon" />
        </button>
      )}
    </div>
  );
};

export default Home;