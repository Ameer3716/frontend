import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import CTASection from '../Components/CTASection';
import Footer from '../Components/Footer';
import {
  BookOpenText,
  MessageSquareText,
  PhoneCall,
  ArrowUp,
  Send,
  LoaderCircle, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

import './ContactPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const SALES_EMAIL_ADDRESS = "sales@calleasae1.co.uk"; // Replace with actual

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    package: '',
    message: '',
  });
  const [showScroll, setShowScroll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: null, message: '' });

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: null, message: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `HTTP error! status: ${response.status}`);

      setSubmitStatus({ success: true, error: null, message: result.message || 'Message sent successfully!' });
      setTimeout(() => setFormData({ name: '', email: '', package: '', message: '' }), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ success: false, error: true, message: error.message || 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatWithSales = () => {
    const subject = encodeURIComponent("Sales Inquiry for CallEase");
    const body = encodeURIComponent(
      "Hello CallEase Sales Team,\n\nI'm interested in learning more about your services.\n\n[Please describe your inquiry here]\n\nBest regards,\n[Your Name]"
    );
    const gmailURL = `https://mail.google.com/mail/?view=cm&to=${SALES_EMAIL_ADDRESS}&su=${subject}&body=${body}`;
    window.open(gmailURL, '_blank');
  };

  return (
    <div className="contact-page">
      <Navbar />
      <main>
        <section className="contact-hero">
          <div className="contact-hero-content">
            <h1>Connect with us</h1>
            <p>Feel free to reach out to us using the options below, and our dedicated team will respond to your inquiries promptly.</p>
          </div>
        </section>

        <section className="contact-main-section">
          <div className="contact-main-grid">
            <div className="contact-form-container">
              <h2>How can we help?</h2>
              <p>Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required disabled={isSubmitting}/>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email Address" required disabled={isSubmitting}/>
                </div>
                <div className="form-group">
                  <label htmlFor="package">Choose your package</label>
                  <select id="package" name="package" value={formData.package} onChange={handleChange} required disabled={isSubmitting}>
                    <option value="" disabled>Select a Package</option>
                    <option value="pro">Pro</option>
                    <option value="growth">Growth</option>
                    <option value="agency">Agency</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Your message..." required disabled={isSubmitting}></textarea>
                </div>
                {submitStatus.message && (
                  <div className={`form-status ${submitStatus.error ? 'error' : 'success'}`}>
                    {submitStatus.error ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
                    <span>{submitStatus.message}</span>
                  </div>
                )}
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="contact-image-container">
              <img
                src="https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Customer support representative"
              />
            </div>
          </div>
        </section>

        <section className="contact-options-section">
          <div className="contact-options-grid">
            <div className="contact-option-card">
              <div className="card-icon-wrapper bg-blue-100 text-blue-600">
                <BookOpenText size={28} />
              </div>
              <h3>Knowledge Hub</h3>
              <p>Find answers to common questions in our knowledge base.</p>
            </div>
            <div className="contact-option-card clickable" onClick={handleChatWithSales}>
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

        <CTASection />
      </main>
      <Footer />
      {showScroll && (
        <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
          <ArrowUp className="scroll-top-icon" />
        </button>
      )}
    </div>
  );
};

export default ContactPage;
