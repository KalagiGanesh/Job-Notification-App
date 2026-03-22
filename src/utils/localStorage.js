/**
 * localStorage Utility Functions
 * 
 * Helper functions for managing saved jobs in localStorage.
 */

const SAVED_JOBS_KEY = 'savedJobs';

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
