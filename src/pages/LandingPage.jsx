import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

/**
 * LandingPage Component
 * 
 * Premium landing page with clean headline, subtext, and CTA.
 * Follows design system: serif headings, off-white background, deep red accent.
 * 
 * Usage:
 * <LandingPage />
 */
const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page__content text-block">
        <h1 className="landing-page__headline">Stop Missing The Right Jobs.</h1>
        <p className="landing-page__subtext">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <Link to="/settings" className="landing-page__cta">
          Start Tracking
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
