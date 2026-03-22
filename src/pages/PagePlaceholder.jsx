import React from 'react';
import './PagePlaceholder.css';

/**
 * PagePlaceholder Component
 * 
 * Used for routes that are not yet built.
 * Shows large serif heading and muted subtext.
 * Follows design system: max 720px text width, calm layout.
 * 
 * Usage:
 * <PagePlaceholder title="Dashboard" subtitle="This section will be built in the next step." />
 */
const PagePlaceholder = ({ 
  title = 'Page',
  subtitle = 'This section will be built in the next step.'
}) => {
  return (
    <div className="page-placeholder">
      <div className="page-placeholder__content text-block">
        <h1 className="page-placeholder__title">{title}</h1>
        <p className="page-placeholder__subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default PagePlaceholder;
