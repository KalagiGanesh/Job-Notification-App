import React from 'react';
import './ProgressBar.css';

/**
 * ProgressBar Component
 * 
 * Usage:
 * <ProgressBar current={2} total={5} />
 * 
 * Props:
 * - current: number - Current step (1-indexed)
 * - total: number - Total steps
 */
const ProgressBar = ({ current = 1, total = 5 }) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className="progress-bar">
      <div className="progress-bar__text">
        Step {current} / {total}
      </div>
      <div className="progress-bar__track">
        <div 
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
