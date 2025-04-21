import React, { useState, useEffect } from 'react'; // <-- Import useEffect
import Navbar from '../Components/Navbar'; // Adjust path if necessary
import CTASection from '../Components/CTASection'; // Adjust path if necessary
import Footer from '../Components/Footer'; // Adjust path if necessary
import { BookOpenText, MessageSquareText, PhoneCall, ArrowUp } from 'lucide-react'; // <-- ArrowUp is imported

import './ContactPage.css'; // We will create this CSS file

const ContactPage = () => {
  // Basic state for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    package: '',
    message: '',
  });
  // Scroll state
  const [showScroll, setShowScroll] = useState(false); // <-- Add scroll state

  // Effect hook for scroll listener <-- ADD THIS WHOLE BLOCK
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) { // Show button after scrolling 300px
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Cleanup function to remove listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array means this runs once on mount

  // Function to scroll to top <-- ADD THIS FUNCTION
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message!');
  };

  return (
    // Added relative positioning if needed for absolute child elements, often not needed for fixed scroll button
    <div className="contact-page">
      <Navbar />

      <main>
        {/* Section 1: Hero Banner */}
        <section className="contact-hero">
          <div className="contact-hero-content">
            <h1>Connect with us</h1>
            <p>
              Feel free to reach out to us using the options below, and our dedicated team will respond to your inquiries promptly.
            </p>
          </div>
        </section>

        {/* Section 2: Contact Form & Image */}
        <section className="contact-main-section">
          <div className="contact-main-grid">
            {/* Form Column */}
            <div className="contact-form-container">
              <h2>How can we help?</h2>
              <p>Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.</p>
              <form onSubmit={handleSubmit}>
                {/* ... form groups ... */}
                 <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email Address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="package">Choose your package</label>
                  <select
                    id="package"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a Package</option>
                    <option value="starter">Starter</option>
                    <option value="pro">Pro</option>
                    <option value="growth">Growth</option>
                    <option value="agency">Agency</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">Send</button>
              </form>
            </div>

            {/* Image Column */}
            <div className="contact-image-container">
              <img
                src="https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Customer support representative"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Contact Options Cards */}
        <section className="contact-options-section">
          <div className="contact-options-grid">
            {/* ... option cards ... */}
             <div className="contact-option-card">
              <div className="card-icon-wrapper bg-blue-100 text-blue-600">
                <BookOpenText size={28} />
              </div>
              <h3>Knowledge Hub</h3>
              <p>Find answers to common questions in our knowledge base.</p>
            </div>
            <div className="contact-option-card">
              <div className="card-icon-wrapper bg-teal-100 text-teal-600">
                <MessageSquareText size={28} />
              </div>
              <h3>Chat with Sales</h3>
              <p>Get details on pricing, features, and promotions.</p>
            </div>
            <div className="contact-option-card">
              <div className="card-icon-wrapper bg-sky-100 text-sky-600">
                <PhoneCall size={28} />
              </div>
              <h3>Call for Support</h3>
              <p>Our AI-powered system is ready to assist you 24/7.</p>
            </div>
          </div>
        </section>

        {/* Existing Sections */}
        <CTASection />
      </main>
      <Footer />

      {/* Scroll-to-Top Button - Conditionally Rendered <-- ADD THIS BLOCK */}
      {showScroll && (
        <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
          <ArrowUp className="scroll-top-icon" />
        </button>
      )}
    </div>
  );
};

export default ContactPage;