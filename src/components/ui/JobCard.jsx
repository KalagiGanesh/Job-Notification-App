import React from 'react';
import './JobCard.css';

/**
 * JobCard Component
 * 
 * Premium job card displaying key job information with View, Save, and Apply buttons.
 * 
 * Props:
 * - job: Object containing job details
 * - onView: Function to handle view button click
 * - onSave: Function to handle save button click
 * - onApply: Function to handle apply button click
 * - isSaved: Boolean indicating if job is already saved
 */
const JobCard = ({ job, onView, onSave, onApply, isSaved }) => {
  // Safe fallbacks for all fields
  const title = job?.title || 'N/A';
  const company = job?.company || 'Unknown Company';
  const location = job?.location || 'Not specified';
  const mode = job?.mode || 'Not specified';
  const experience = job?.experience || 'Not specified';
  const salaryRange = job?.salaryRange || 'Not disclosed';
  const postedDaysAgo = typeof job?.postedDaysAgo === 'number' ? job.postedDaysAgo : 0;
  const source = job?.source || 'Unknown';
  const applyUrl = job?.applyUrl || '#';
  
  return (
    <div className="job-card">
      <div className="job-card__header">
        <div className="job-card__title-section">
          <h3 className="job-card__title">{title}</h3>
          <span className="job-card__company">{company}</span>
        </div>
        <span className={`job-card__source job-card__source--${source.toLowerCase()}`}>
          {source}
        </span>
      </div>

      <div className="job-card__details">
        <div className="job-card__detail-row">
          <span className="job-card__label">Location:</span>
          <span className="job-card__value">{location}</span>
          <span className="job-card__mode-badge job-card__mode-badge--primary">{mode}</span>
        </div>
        
        <div className="job-card__detail-row">
          <span className="job-card__label">Experience:</span>
          <span className="job-card__value">{experience}</span>
        </div>

        <div className="job-card__detail-row">
          <span className="job-card__label">Salary:</span>
          <span className="job-card__value job-card__salary">{salaryRange}</span>
        </div>

        <div className="job-card__detail-row">
          <span className="job-card__label">Posted:</span>
          <span className="job-card__value job-card__posted">{postedDaysAgo === 0 ? 'Today' : `${postedDaysAgo} days ago`}</span>
        </div>
      </div>

      <div className="job-card__actions">
        <button 
          className="job-card__btn job-card__btn--secondary"
          onClick={() => onView(job)}
        >
          View
        </button>
        <button 
          className={`job-card__btn job-card__btn--outline ${isSaved ? 'job-card__btn--saved' : ''}`}
          onClick={() => onSave(job?.id || '')}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <button 
          className="job-card__btn job-card__btn--primary"
          onClick={() => onApply(applyUrl)}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
