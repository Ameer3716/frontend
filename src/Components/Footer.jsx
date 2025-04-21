import React from 'react';
import { Bot, Linkedin, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Bot className="footer-logo-icon" />
              <span className="footer-logo-text">CallEase</span>
            </div>
            <p className="footer-description">
              Empowering businesses with smart call management. Experience a new level of operational excellence.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link">
                <Linkedin className="footer-social-icon" />
              </a>
              <a href="#" className="footer-social-link">
                <Twitter className="footer-social-icon" />
              </a>
            </div>
          </div>
          <div className="footer-contact">
            <h3 className="footer-heading">Get in Touch</h3>
            <p className="footer-text">+1 (123) 456-7890</p>
            <p className="footer-text">support@calease.com</p>
            <h3 className="footer-heading">Our Location</h3>
            <p className="footer-text">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;