import React, { useState, useEffect } from 'react'; // <-- Import useEffect
import Navbar from '../Components/Navbar'; // Adjust path if necessary
import CTASection from '../Components/CTASection'; // Adjust path if necessary
import Footer from '../Components/Footer'; // Adjust path if necessary
import { Users, Target, Award, Rocket, Globe2, PhoneCall, CalendarCheck2, BrainCircuit, MessageSquareQuote, Facebook, Twitter, Youtube, ArrowUp } from 'lucide-react'; // ArrowUp is imported
import rightimage from '../assets/rightimage.jpg'; // Adjust path if necessary
import './AboutPage.css'; // Ensure CSS file exists and is linked

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [showScroll, setShowScroll] = useState(false); // <-- Scroll state is already here

  // Effect hook for scroll listener <-- This block was missing the import but logic was present
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

  // Function to scroll to top <-- This block was missing the import but logic was present
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Placeholder team data
  const teamMembers = [
    { name: "Alex Thompson", role: "Founder & AI Visionary", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600", fb: "#", tw: "#", yt: "#" },
    { name: "Maria Garcia", role: "Head of Product Development", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600", fb: "#", tw: "#", yt: "#" },
    { name: "Sam Chen", role: "Lead Customer Success", image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600", fb: "#", tw: "#", yt: "#" },
    { name: "Priya Singh", role: "Senior AI Engineer", image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600", fb: "#", tw: "#", yt: "#" },
  ];

  return (
    <div className="about-page"> {/* No need for relative positioning here unless other elements need it */}
      <Navbar />

      <main>
        {/* Section 1: Hero Banner */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>Meet CallEase: Intelligent Communication, Simplified.</h1>
            <p>
              Discover the team and technology dedicated to transforming your customer interactions with seamless AI automation and unparalleled efficiency.
            </p>
          </div>
        </section>

        {/* Section 2: Mission/Vision/Values Tabs */}
        <section className="mission-vision-section">
         {/* ... content ... */}
         <div className="mission-vision-container">
            <div className="mission-vision-grid">
              {/* Left Text */}
              <div className="mission-vision-text">
                 <h2>Transforming Customer Interactions with AI</h2>
                <p>
                  CallEase provides intelligent AI receptionist solutions designed to automate calls, manage appointments, and provide instant support. We empower businesses like yours with smart, reliable virtual assistance, freeing you to focus on growth.
                </p>
              </div>
              {/* Right Tabs */}
              <div className="mission-vision-tabs">
                <div className="tabs-container">
                  <button
                    className={`tab-button ${activeTab === 'mission' ? 'active-tab' : ''}`}
                    onClick={() => setActiveTab('mission')}
                  >
                    Mission
                  </button>
                  <button
                    className={`tab-button ${activeTab === 'vision' ? 'active-tab' : ''}`}
                    onClick={() => setActiveTab('vision')}
                  >
                    Vision
                  </button>
                  <button
                    className={`tab-button ${activeTab === 'values' ? 'active-tab' : ''}`}
                    onClick={() => setActiveTab('values')}
                  >
                    Values
                  </button>
                </div>
                <div className="tab-content">
                  {activeTab === 'mission' && (
                    <p>
                      To empower businesses with <strong>intelligent, seamless AI receptionist solutions</strong> that enhance operational efficiency, reduce workload, and ensure every customer interaction is <strong>professional, personalized, and effortless</strong>.
                    </p>
                  )}
                  {activeTab === 'vision' && (
                    <p>
                      To be the globally recognized leader in AI-driven communication, making sophisticated virtual receptionist technology accessible and indispensable for businesses of all sizes seeking exceptional customer engagement and operational excellence.
                    </p>
                  )}
                  {activeTab === 'values' && (
                    <p>
                      Our core values: <strong>Innovation</strong> (constantly advancing our AI), <strong>Customer-Centricity</strong> (your success is our priority), <strong>Reliability</strong> (dependable 24/7 service), <strong>Efficiency</strong> (streamlining your processes), and <strong>Integrity</strong> (building trust through transparency).
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Team Section */}
        <section className="team-section">
             {/* ... content ... */}
            <div className="team-container">
             <h2>Meet Our Expert Team</h2>
            <p>Behind CallEase is a diverse group of passionate AI researchers, skilled software engineers, and dedicated support professionals committed to building the future of business communication.</p>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div className="team-card" key={index}>
                  <div className="team-card-image-wrapper">
                    <img src={member.image} alt={`Portrait of ${member.name}`} className="team-card-image" />
                  </div>
                  <div className="team-card-content">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                    <div className="team-card-socials">
                      <a href={member.fb} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Facebook profile`}><Facebook size={18} /></a>
                      <a href={member.tw} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter profile`}><Twitter size={18} /></a>
                      <a href={member.yt} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} YouTube channel`}><Youtube size={18} /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Features/Benefits Section */}
        <section className="features-benefits-section">
           {/* ... content ... */}
           <div className="features-benefits-container">
            <div className="features-benefits-grid">
                {/* Left Text & Features */}
                <div className="features-benefits-text">
                <h2>Helping Your Business Grow with AI-Powered Communication</h2>
                <p>Leverage the power of CallEase to improve customer satisfaction and boost your bottom line:</p>
                <div className="features-list">
                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <PhoneCall size={24} />
                        </div>
                        <div>
                            <h3>Automated Call Handling</h3>
                            <p>Never miss an important call again.</p>
                        </div>
                    </div>
                     <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <CalendarCheck2 size={24} />
                        </div>
                        <div>
                            <h3>Smart Appointment Scheduling</h3>
                            <p>Integrated with your business calendar.</p>
                        </div>
                    </div>
                     <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <MessageSquareQuote size={24} />
                        </div>
                        <div>
                            <h3>Instant FAQ Responses</h3>
                            <p>AI-powered responses to common inquiries.</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <BrainCircuit size={24} />
                        </div>
                        <div>
                            <h3>Seamless CRM Integration</h3>
                            <p>Keep track of customer interactions effortlessly.</p>
                        </div>
                    </div>
                </div>
                </div>
                {/* Right Image */}
                <div className="features-benefits-image">
                 <img src={rightimage}/>
                </div>
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

export default AboutPage;