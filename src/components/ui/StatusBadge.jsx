import React from 'react';
import './StatusBadge.css';

/**
 * StatusBadge Component
 * 
 * Usage:
 * <StatusBadge status="in-progress" />
 * 
 * Props:
 * - status: 'not-started' | 'in-progress' | 'shipped' (default: 'not-started')
 */
const StatusBadge = ({ status = 'not-started' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'not-started':
        return {
          label: 'Not Started',
          className: 'status-badge--not-started'
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          className: 'status-badge--in-progress'
        };
      case 'shipped':
        return {
          label: 'Shipped',
          className: 'status-badge--shipped'
        };
      default:
        return {
          label: 'Unknown',
          className: 'status-badge--not-started'
        };
    }
  };

  const { label, className } = getStatusConfig();

  return (
    <span className={`status-badge ${className}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
