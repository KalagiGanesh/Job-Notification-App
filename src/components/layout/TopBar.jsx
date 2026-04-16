import React from 'react';
import StatusBadge from '../ui/StatusBadge';
import ProgressBar from '../ui/ProgressBar';
import './TopBar.css';

/**
 * TopBar Component - KodNest Premium Build System
 * 
 * MANDATORY LAYOUT:
 * - Left: Project name
 * - Center: Progress indicator Step X/Y
 * - Right: Status badge
 * 
 * Usage:
 * <TopBar 
 *   appName="KodNest"
 *   currentStep={2}
 *   totalSteps={5}
 *   status="in-progress"
 * />
 */
const TopBar = ({ 
  appName = 'KodNest',
  currentStep = 1,
  totalSteps = 5,
  status = 'not-started'
}) => {
  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <h1 className="top-bar__title">{appName}</h1>
      </div>
      
      <div className="top-bar__center">
        <span className="top-bar__progress-text">
          Step {currentStep} / {totalSteps}
        </span>
        <ProgressBar current={currentStep} total={totalSteps} />
      </div>
      
      <div className="top-bar__right">
        <StatusBadge status={status} />
      </div>
    </header>
  );
};

export default TopBar;
