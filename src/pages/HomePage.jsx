import React, { useState, useMemo } from 'react';
import Workspace from '../components/layout/Workspace';
import JobCard from '../components/ui/JobCard';
import FilterBar from '../components/ui/FilterBar';
import JobDetailModal from '../components/ui/JobDetailModal';
import { jobsData } from '../data/jobsData.jsx';
import { saveJob, removeJob, isJobSaved } from '../utils/localStorage';
import './DashboardPage.css';

const HomePage = () => {
  console.log('Dashboard: Jobs Loaded:', jobsData);
  console.log('Dashboard: jobsData is array?', Array.isArray(jobsData));
  
  // SAFETY GUARD - CRITICAL
  if (!jobsData || !Array.isArray(jobsData)) {
    console.warn('Jobs data not loaded or invalid');
    return (
      <div className="dashboard-page">
        <Workspace>
          <Workspace.Primary>
            <div className="dashboard-page__empty">
              <p className="dashboard-page__message">Loading jobs...</p>
            </div>
          </Workspace.Primary>
        </Workspace>
      </div>
    );
  }
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sort: 'latest'
  });

  // Safety Guard: Check if jobsData exists and is an array
  if (!jobsData || !Array.isArray(jobsData)) {
    return (
      <div className="dashboard-page">
        <Workspace>
          <Workspace.Primary>
            <div className="dashboard-page__empty">
              <p className="dashboard-page__message">Error loading job data...</p>
            </div>
          </Workspace.Primary>
        </Workspace>
      </div>
    );
  }

  // Force re-render when localStorage changes (for saved jobs)
  const [, forceUpdate] = React.useState(0);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

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
    } else {
      saveJob(jobId);
    }
    setSavedJobs(new Set([...document.querySelectorAll('[data-job-id]')].map(el => el.dataset.jobId)));
    forceUpdate(n => n + 1);
  };

  const handleApplyJob = (applyUrl) => {
    window.open(applyUrl, '_blank');
  };

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    if (!jobsData || !Array.isArray(jobsData)) {
      console.log('No jobs data available');
      return [];
    }
    
    console.log('Filtering jobs, count:', jobsData.length);
    let result = [...jobsData];

    // Apply keyword filter safely
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      result = result.filter(job => {
        const title = job?.title?.toLowerCase() || '';
        const company = job?.company?.toLowerCase() || '';
        return title.includes(keyword) || company.includes(keyword);
      });
    }

    // Apply location filter safely
    if (filters.location) {
      result = result.filter(job => job?.location === filters.location);
    }

    // Apply mode filter safely
    if (filters.mode) {
      result = result.filter(job => job?.mode === filters.mode);
    }

    // Apply experience filter safely
    if (filters.experience) {
      result = result.filter(job => job?.experience === filters.experience);
    }

    // Apply source filter safely
    if (filters.source) {
      result = result.filter(job => job?.source === filters.source);
    }

    // Apply sorting
    switch (filters.sort) {
      case 'latest':
        result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        break;
      case 'salary-high':
        result.sort((a, b) => {
          const getSalaryNum = (salary) => {
            const match = salary.match(/\d+/g);
            return match ? parseInt(match[1] || match[0]) : 0;
          };
          return getSalaryNum(b.salaryRange) - getSalaryNum(a.salaryRange);
        });
        break;
      case 'salary-low':
        result.sort((a, b) => {
          const getSalaryNum = (salary) => {
            const match = salary.match(/\d+/g);
            return match ? parseInt(match[1] || match[0]) : 0;
          };
          return getSalaryNum(a.salaryRange) - getSalaryNum(b.salaryRange);
        });
        break;
      case 'company':
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="dashboard-page">
      <Workspace>
        <Workspace.Primary>
          <div className="dashboard-page__header">
            <h1 className="dashboard-page__title">Available Positions</h1>
            <p className="dashboard-page__count">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </p>
          </div>
          
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          
          {filteredJobs.length > 0 ? (
            <div className="dashboard-page__jobs">
              {filteredJobs.map((job, index) => {
                console.log(`Rendering job #${index + 1}:`, job?.id, job?.title, job?.company);
                return (
                  <JobCard
                    key={job?.id || `job-${index}`}
                    job={job}
                    onView={handleViewJob}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                    isSaved={isJobSaved(job?.id)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="dashboard-page__empty">
              <p className="dashboard-page__message">
                No jobs match your search.
              </p>
            </div>
          )}
        </Workspace.Primary>
        <Workspace.Secondary>
          <div className="dashboard-page__sidebar">
            <h3 className="dashboard-page__sidebar-title">Quick Stats</h3>
            <div className="dashboard-page__stat">
              <span className="dashboard-page__stat-label">Total Jobs</span>
              <span className="dashboard-page__stat-value">{jobsData.length}</span>
            </div>
            <div className="dashboard-page__stat">
              <span className="dashboard-page__stat-label">Posted Today</span>
              <span className="dashboard-page__stat-value">
                {jobsData.filter(j => j.postedDaysAgo === 0).length}
              </span>
            </div>
            <div className="dashboard-page__stat">
              <span className="dashboard-page__stat-label">Remote</span>
              <span className="dashboard-page__stat-value">
                {jobsData.filter(j => j.mode === 'Remote').length}
              </span>
            </div>
            <div className="dashboard-page__stat">
              <span className="dashboard-page__stat-label">Fresher</span>
              <span className="dashboard-page__stat-value">
                {jobsData.filter(j => j.experience === 'Fresher').length}
              </span>
            </div>
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

export default HomePage;
