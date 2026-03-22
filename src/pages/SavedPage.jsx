import React, { useState, useEffect, useMemo } from 'react';
import Workspace from '../components/layout/Workspace';
import JobCard from '../components/ui/JobCard';
import JobDetailModal from '../components/ui/JobDetailModal';
import { jobsData } from '../data/jobsData.jsx';
import { getSavedJobs, removeJob, isJobSaved } from '../utils/localStorage';
import './SavedPage.css';

const SavedPage = () => {
  console.log('SavedPage: Jobs Data:', jobsData);
  
  // SAFETY GUARD - CRITICAL
  if (!jobsData || !Array.isArray(jobsData)) {
    console.warn('SavedPage: Jobs data not loaded or invalid');
    return (
      <div className="saved-page">
        <Workspace>
          <Workspace.Primary>
            <div className="saved-page__empty">
              <p className="saved-page__message">Loading jobs...</p>
            </div>
          </Workspace.Primary>
        </Workspace>
      </div>
    );
  }
  
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, forceUpdate] = React.useState(0);

  // Safety Guard: Check if jobsData exists and is an array
  if (!jobsData || !Array.isArray(jobsData)) {
    return (
      <div className="saved-page">
        <Workspace>
          <Workspace.Primary>
            <div className="saved-page__empty">
              <p className="saved-page__message">Error loading job data...</p>
            </div>
          </Workspace.Primary>
        </Workspace>
      </div>
    );
  }

  useEffect(() => {
    // Load saved jobs on mount
    const saved = getSavedJobs();
    setSavedJobIds(saved);
  }, []);

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const handleSaveJob = (jobId) => {
    if (isJobSaved(jobId)) {
      removeJob(jobId);
      setSavedJobIds(getSavedJobs());
    }
    forceUpdate(n => n + 1);
  };

  const handleApplyJob = (applyUrl) => {
    window.open(applyUrl, '_blank');
  };

  // Get full job objects for saved IDs
  const savedJobs = useMemo(() => {
    if (!jobsData || !Array.isArray(jobsData)) {
      console.log('SavedPage: No jobs data available');
      return [];
    }
    const result = jobsData.filter(job => savedJobIds.includes(job?.id));
    console.log('SavedPage: Saved jobs count:', result.length);
    return result;
  }, [savedJobIds]);

  return (
    <div className="saved-page">
      <Workspace>
        <Workspace.Primary>
          <div className="saved-page__header">
            <h1 className="saved-page__title">Saved Jobs</h1>
            <p className="saved-page__count">
              {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
            </p>
          </div>
          
          {savedJobs.length > 0 ? (
            <div className="saved-page__jobs">
              {savedJobs.map((job, index) => {
                console.log('Rendering saved job:', job?.id, job?.title);
                return (
                  <JobCard
                    key={job?.id || `saved-job-${index}`}
                    job={job}
                    onView={handleViewJob}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                    isSaved={true}
                  />
                );
              })}
            </div>
          ) : (
            <div className="saved-page__empty">
              <p className="saved-page__message">
                No saved jobs yet.
              </p>
              <p className="saved-page__submessage">
                Save jobs you're interested in to review them later.
              </p>
            </div>
          )}
        </Workspace.Primary>
        <Workspace.Secondary>
          <div className="saved-page__sidebar">
            <h3 className="saved-page__sidebar-title">About Saved Jobs</h3>
            <p className="saved-page__sidebar-text">
              Jobs you save will appear here for easy access. Your saved jobs are stored locally and persist across sessions.
            </p>
          </div>
        </Workspace.Secondary>
      </Workspace>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApply={handleApplyJob}
        />
      )}
    </div>
  );
};

export default SavedPage;
