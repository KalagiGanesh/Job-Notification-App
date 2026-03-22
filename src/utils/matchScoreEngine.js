/**
 * Match Score Engine
 * 
 * Computes deterministic match scores between user preferences and job listings.
 * Scoring rules are fixed and transparent.
 */

const PREFERENCES_KEY = 'jobTrackerPreferences';

/**
 * Get user preferences from localStorage
 * @returns {Object|null} User preferences or null if not set
 */
export const getPreferences = () => {
  try {
    const saved = localStorage.getItem(PREFERENCES_KEY);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch (error) {
    console.error('Error loading preferences:', error);
    return null;
  }
};

/**
 * Calculate match score for a single job
 * 
 * Scoring Rules:
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location matches preferredLocations
 * +10 if job.mode matches preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills (any match)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 * 
 * Cap at 100
 * 
 * @param {Object} job - Job object
 * @param {Object} preferences - User preferences object
 * @returns {number} Match score (0-100)
 */
export const calculateMatchScore = (job, preferences) => {
  if (!preferences) return 0;

  let score = 0;

  // Parse comma-separated keywords and skills
  const roleKeywords = preferences.roleKeywords
    ? preferences.roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k)
    : [];
  
  const userSkills = preferences.skills
    ? preferences.skills.split(',').map(s => s.trim().toLowerCase()).filter(s => s)
    : [];

  const preferredLocations = preferences.preferredLocations || [];
  const preferredMode = preferences.preferredMode || [];
  const experienceLevel = preferences.experienceLevel || '';

  // +25 if any roleKeyword appears in job.title
  if (roleKeywords.length > 0 && job.title) {
    const jobTitle = job.title.toLowerCase();
    const hasRoleMatch = roleKeywords.some(keyword => jobTitle.includes(keyword));
    if (hasRoleMatch) {
      score += 25;
    }
  }

  // +15 if any roleKeyword appears in job.description
  if (roleKeywords.length > 0 && job.description) {
    const jobDesc = job.description.toLowerCase();
    const hasDescMatch = roleKeywords.some(keyword => jobDesc.includes(keyword));
    if (hasDescMatch) {
      score += 15;
    }
  }

  // +15 if job.location matches preferredLocations
  if (preferredLocations.length > 0 && job.location) {
    const hasLocationMatch = preferredLocations.includes(job.location);
    if (hasLocationMatch) {
      score += 15;
    }
  }

  // +10 if job.mode matches preferredMode
  if (preferredMode.length > 0 && job.mode) {
    const hasModeMatch = preferredMode.includes(job.mode);
    if (hasModeMatch) {
      score += 10;
    }
  }

  // +10 if job.experience matches experienceLevel
  if (experienceLevel && job.experience === experienceLevel) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills
  if (userSkills.length > 0 && Array.isArray(job.skills)) {
    const jobSkills = job.skills.map(s => s.toLowerCase());
    const hasSkillOverlap = userSkills.some(skill => jobSkills.includes(skill));
    if (hasSkillOverlap) {
      score += 15;
    }
  }

  // +5 if postedDaysAgo <= 2
  if (typeof job.postedDaysAgo === 'number' && job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    score += 5;
  }

  // Cap at 100
  return Math.min(score, 100);
};

/**
 * Get score badge color based on score range
 * 80–100: green | 60–79: amber | 40–59: neutral | <40: subtle grey
 * 
 * @param {number} score - Match score
 * @returns {string} CSS class for badge color
 */
export const getScoreBadgeClass = (score) => {
  if (score >= 80) return 'job-card__match-badge--high';
  if (score >= 60) return 'job-card__match-badge--medium';
  if (score >= 40) return 'job-card__match-badge--low';
  return 'job-card__match-badge--very-low';
};

/**
 * Check if preferences are set
 * @returns {boolean} True if preferences exist
 */
export const hasPreferences = () => {
  const prefs = getPreferences();
  return prefs !== null;
};
