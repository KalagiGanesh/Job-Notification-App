import React from 'react';
import './JobDetailModal.css';

/**
 * JobDetailModal Component
 * 
 * Modal displaying full job details including description and skills.
 * 
 * Props:
 * - job: Object containing full job details
 * - isOpen: Boolean indicating if modal is open
 * - onClose: Function to close the modal
 * - onApply: Function to handle apply button click
 */
const JobDetailModal = ({ job, isOpen, onClose, onApply }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal__header">
          <h2 className="modal__title">{job.title}</h2>
          <p className="modal__company">{job.company}</p>
        </div>

        <div className="modal__info-grid">
          <div className="modal__info-item">
            <span className="modal__info-label">Location</span>
            <span className="modal__info-value">{job.location}</span>
          </div>
          <div className="modal__info-item">
            <span className="modal__info-label">Mode</span>
            <span className="modal__info-value">{job.mode}</span>
          </div>
          <div className="modal__info-item">
            <span className="modal__info-label">Experience</span>
            <span className="modal__info-value">{job.experience}</span>
          </div>
          <div className="modal__info-item">
            <span className="modal__info-label">Salary</span>
            <span className="modal__info-value modal__salary">{job.salaryRange}</span>
          </div>
          <div className="modal__info-item">
            <span className="modal__info-label">Posted</span>
            <span className="modal__info-value">{job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}</span>
          </div>
          <div className="modal__info-item">
            <span className="modal__info-label">Source</span>
            <span className={`modal__source-badge modal__source-badge--${job.source.toLowerCase()}`}>
              {job.source}
            </span>
          </div>
        </div>

        <div className="modal__section">
          <h3 className="modal__section-title">Job Description</h3>
          <p className="modal__description">{job.description}</p>
        </div>

        <div className="modal__section">
          <h3 className="modal__section-title">Required Skills</h3>
          <div className="modal__skills">
            {job.skills.map((skill, index) => (
              <span key={index} className="modal__skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="modal__actions">
          <button 
            className="modal__btn modal__btn--secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button 
            className="modal__btn modal__btn--primary"
            onClick={() => onApply(job.applyUrl)}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
