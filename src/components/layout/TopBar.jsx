import React from 'react';
import StatusBadge from '../ui/StatusBadge';
import ProgressBar from '../ui/ProgressBar';
import './TopBar.css';

/**
 * TopBar Component
 * 
 * Usage:
 * <TopBar 
 *   appName="Job Notification App"
 *   currentStep={2}
 *   totalSteps={5}
 *   status="in-progress"
 * />
 * 
 * Props:
 * - appName: string - Application name (left side)
 * - currentStep: number - Current step number
 * - totalSteps: number - Total number of steps
 * - status: 'not-started' | 'in-progress' | 'shipped' - Current status
 */
const TopBar = ({ 
  appName = 'Job Notification App',
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
        <ProgressBar current={currentStep} total={totalSteps} />
      </div>
      
      <div className="top-bar__right">
        <StatusBadge status={status} />
      </div>
    </header>
  );
};

export default TopBar;
