import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate(); 
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <div className="header-content">
          <h1>SheConnects</h1>
          <p className="tagline">Inspire.Heal.Grow</p>
        </div>
        <nav className="header-nav">
          <button className="nav-button" onClick={()=>navigate('/blog')}>Blog</button>
          <button className="nav-button"onClick={()=>navigate('/consultdoc')}>Consult Doc</button>
          <button className="nav-button"onClick={()=>navigate('/community')}>Community</button>
          <button className="nav-button"onClick={()=>navigate('/job')}>Jobs</button>
          <button className="nav-button"onClick={()=>navigate('/event')}>Event</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="home-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-text">
            <h2>Why Women's Empowerment Matters</h2>
            <p>
              When women are empowered, entire communities thrive. We provide the tools,
              resources, and support network to help women achieve their full potential.
            </p>
          </div>
          <div className="hero-image">
            <img src="https://plus.unsplash.com/premium_photo-1671305206470-a3a3b1659766?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Women supporting each other" />
          </div>
        </section>

        {/* Mental Wellness Section */}
        <section className="wellness-section">
          <div className="wellness-image">
            <img src="https://images.unsplash.com/photo-1498753427761-548428edfa67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Mental wellness" />
          </div>
          <div className="wellness-text">
            <h2>Mental Wellness for Women</h2>
            <p>
              Prioritizing mental health is essential for personal growth and community building. 
              Our platform offers safe spaces for discussion, professional resources, and 
              community support.
            </p>
            <button className="cta-button">Join Our Community</button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Our Community Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Support Groups</h3>
              <p>Connect with women facing similar challenges in safe, moderated spaces.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👩‍⚕️</div>
              <h3>Professional Help</h3>
              <p>Access to female healthcare professionals and counselors.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Career Resources</h3>
              <p>Job opportunities, resume building, and mentorship programs.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2023 SheConnects. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;