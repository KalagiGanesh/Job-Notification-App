import React from 'react';
import './StatusButtonGroup.css';

/**
 * StatusButtonGroup Component
 * 
 * Button group for selecting job application status.
 * Uses exact string literals matching JOB_STATUSES constants.
 * 
 * Props:
 * - jobId: String - Job ID
 * - currentStatus: String - Current status value
 * - onStatusChange: Function - Callback when status changes (jobId, status) => void
 */
const StatusButtonGroup = ({ jobId, currentStatus, onStatusChange }) => {
  // Status options with exact string values matching JOB_STATUSES
  const statuses = [
    { value: 'Not Applied', label: 'Not Applied', className: 'status-btn--neutral' },
    { value: 'Applied', label: 'Applied', className: 'status-btn--applied' },
    { value: 'Rejected', label: 'Rejected', className: 'status-btn--rejected' },
    { value: 'Selected', label: 'Selected', className: 'status-btn--selected' }
  ];

  const handleStatusClick = (statusValue) => {
    if (onStatusChange) {
      onStatusChange(jobId, statusValue);
    }
  };

  return (
    <div className="status-button-group">
      {statuses.map((status) => (
        <button
          key={status.value}
          className={`status-button-group__btn ${status.className} ${
            currentStatus === status.value ? 'status-button-group__btn--active' : ''
          }`}
          onClick={() => handleStatusClick(status.value)}
          title={`Mark as ${status.label}`}
          type="button"
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default StatusButtonGroup;
