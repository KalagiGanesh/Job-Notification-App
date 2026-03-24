/**
 * localStorage Utility Functions
 * 
 * Helper functions for managing saved jobs and job status tracking in localStorage.
 */

const SAVED_JOBS_KEY = 'savedJobs';
const JOB_ACTIVITY_LOG_KEY = 'jobActivityLog';

// Job status constants - using exact string literals for consistency
export const JOB_STATUSES = {
  NOT_APPLIED: 'Not Applied',
  APPLIED: 'Applied',
  REJECTED: 'Rejected',
  SELECTED: 'Selected'
};

/**
 * Get job status from localStorage using jobTrackerStatus_${jobId} key
 * @param {string} jobId - The job ID to check
 * @returns {string} Job status or default 'Not Applied'
 */
export const getJobStatus = (jobId) => {
  try {
    const status = localStorage.getItem(`jobTrackerStatus_${jobId}`);
    return status || JOB_STATUSES.NOT_APPLIED;
  } catch (error) {
    console.error('Error reading job status from localStorage:', error);
    return JOB_STATUSES.NOT_APPLIED;
  }
};

/**
 * Set job status in localStorage using jobTrackerStatus_${jobId} key
 * @param {string} jobId - The job ID
 * @param {string} status - The status to set (must be one of JOB_STATUSES)
 */
export const setJobStatus = (jobId, status) => {
  try {
    // Get old status to check if it changed
    const oldStatus = localStorage.getItem(`jobTrackerStatus_${jobId}`) || JOB_STATUSES.NOT_APPLIED;
    
    // Only record update if status actually changed
    if (oldStatus !== status) {
      // Save new status with job-specific key
      localStorage.setItem(`jobTrackerStatus_${jobId}`, status);
      
      // Record the status update in activity log
      recordActivity(jobId, status);
    }
  } catch (error) {
    console.error('Error setting job status:', error);
  }
};

/**
 * Get saved job IDs from localStorage
 * @returns {Array<string>} Array of saved job IDs
 */
export const getSavedJobs = () => {
  try {
    const saved = localStorage.getItem(SAVED_JOBS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading saved jobs from localStorage:', error);
    return [];
  }
};

/**
 * Save a job ID to localStorage
 * @param {string} jobId - The job ID to save
 * @returns {Array<string>} Updated array of saved job IDs
 */
export const saveJob = (jobId) => {
  try {
    const saved = getSavedJobs();
    if (!saved.includes(jobId)) {
      const updated = [...saved, jobId];
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
      return updated;
    }
    return saved;
  } catch (error) {
    console.error('Error saving job to localStorage:', error);
    return [];
  }
};

/**
 * Remove a job ID from localStorage
 * @param {string} jobId - The job ID to remove
 * @returns {Array<string>} Updated array of saved job IDs
 */
export const removeJob = (jobId) => {
  try {
    const saved = getSavedJobs();
    const updated = saved.filter((id) => id !== jobId);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error removing job from localStorage:', error);
    return [];
  }
};

/**
 * Check if a job is saved
 * @param {string} jobId - The job ID to check
 * @returns {boolean} True if job is saved, false otherwise
 */
export const isJobSaved = (jobId) => {
  const saved = getSavedJobs();
  return saved.includes(jobId);
};

/**
 * Record a status update in jobActivityLog
 * @param {string} jobId - The job ID
 * @param {string} newStatus - The new status
 */
const recordActivity = (jobId, newStatus) => {
  try {
    const activities = localStorage.getItem(JOB_ACTIVITY_LOG_KEY);
    const activityList = activities ? JSON.parse(activities) : [];
    
    // Create activity entry with all required details
    const newActivity = {
      jobId,
      newStatus,
      timestamp: Date.now(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    // Add to beginning and keep only last 5 updates
    activityList.unshift(newActivity);
    const trimmedActivities = activityList.slice(0, 5);
    
    localStorage.setItem(JOB_ACTIVITY_LOG_KEY, JSON.stringify(trimmedActivities));
  } catch (error) {
    console.error('Error recording activity:', error);
  }
};

/**
 * Get recent activity log entries (last 5 updates)
 * @param {number} limit - Maximum number of entries to return (default 5)
 * @returns {Array} List of recent activities
 */
export const getRecentActivityLog = (limit = 5) => {
  try {
    const activities = localStorage.getItem(JOB_ACTIVITY_LOG_KEY);
    const activityList = activities ? JSON.parse(activities) : [];
    return activityList.slice(0, limit);
  } catch (error) {
    console.error('Error reading activity log:', error);
    return [];
  }
};
