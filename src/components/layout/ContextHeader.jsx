import React from 'react';
import './ContextHeader.css';

/**
 * ContextHeader Component
 * 
 * Usage:
 * <ContextHeader 
 *   title="Setup Your Profile"
 *   subtitle="Complete your professional profile to receive relevant job notifications"
 * />
 * 
 * Props:
 * - title: string - Large serif headline
 * - subtitle: string - One-line subtext
 */
const ContextHeader = ({ 
  title = 'Context Header',
  subtitle = 'Provide clear context for this section'
}) => {
  return (
    <div className="context-header">
      <h2 className="context-header__title">{title}</h2>
      <p className="context-header__subtitle">{subtitle}</p>
    </div>
  );
};

export default ContextHeader;
