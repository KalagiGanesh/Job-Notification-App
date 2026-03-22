import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

/**
 * NotFoundPage Component
 * 
 * 404 page for unknown routes.
 * Shows "Page Not Found" with clear subtext.
 * Never shows a blank screen.
 * Includes link back to Dashboard.
 */
const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page__content text-block">
        <h1 className="not-found-page__title">Page Not Found</h1>
        <p className="not-found-page__subtitle">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="not-found-page__link">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
