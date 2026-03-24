/**
 * Daily Digest Engine
 * 
 * Generates and manages daily job digests at 9AM.
 * Stores digests per day in localStorage.
 */

import { jobsData } from '../data/jobsData.jsx';
import { getPreferences, calculateMatchScore } from './matchScoreEngine.js';

const DIGEST_PREFIX = 'jobTrackerDigest_';

// Safety guard: Ensure jobsData exists
if (!jobsData || !Array.isArray(jobsData) || jobsData.length === 0) {
  console.error('CRITICAL: jobsData is not loaded or empty!');
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get formatted date for display (e.g., "Monday, January 15, 2024")
 */
export const getFormattedDate = (dateString = null) => {
  const date = dateString ? new Date(dateString) : new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Generate today's digest
 * Selects top 10 jobs sorted by matchScore (desc), then postedDaysAgo (asc)
 */
export const generateDigest = () => {
  console.log('Digest Page Rendering - generateDigest called');
  
  try {
    const preferences = getPreferences();
    
    if (!preferences) {
      console.warn('No preferences found for digest generation');
      return null;
    }

    // Safety guard: Ensure jobsData exists and is an array
    if (!jobsData || !Array.isArray(jobsData) || jobsData.length === 0) {
      console.error('CRITICAL: jobsData is not available for digest generation');
      return null;
    }

    // Calculate match scores for all jobs with safe access
    const jobsWithScores = jobsData.map(job => {
      if (!job) return null;
      return {
        ...job,
        matchScore: calculateMatchScore(job, preferences) || 0
      };
    }).filter(job => job !== null); // Filter out any null entries

    // Sort by matchScore (descending), then postedDaysAgo (ascending)
    const sortedJobs = jobsWithScores.sort((a, b) => {
      const scoreA = a.matchScore || 0;
      const scoreB = b.matchScore || 0;
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      const daysA = a.postedDaysAgo || 0;
      const daysB = b.postedDaysAgo || 0;
      return daysA - daysB;
    });

    // Take top 10 jobs
    const top10 = sortedJobs.slice(0, 10);

    // Create digest object
    const digest = {
      date: getTodayDate(),
      generatedAt: new Date().toISOString(),
      jobs: top10,
      totalMatches: sortedJobs.length
    };

    // Store in localStorage
    const key = `${DIGEST_PREFIX}${digest.date}`;
    try {
      localStorage.setItem(key, JSON.stringify(digest));
      console.log(`Digest saved to ${key}`);
    } catch (error) {
      console.error('Error saving digest to localStorage:', error);
    }

    console.log(`Digest generated successfully with ${top10.length} jobs`);
    return digest;
  } catch (error) {
    console.error('CRITICAL ERROR in generateDigest:', error);
    return null;
  }
};

/**
 * Get existing digest for today
 */
export const getTodaysDigest = () => {
  console.log('Digest Page Rendering - getTodaysDigest called');
  
  try {
    const today = getTodayDate();
    const key = `${DIGEST_PREFIX}${today}`;
    
    console.log(`Looking for digest with key: ${key}`);
    
    const saved = localStorage.getItem(key);
    if (saved) {
      console.log('Found existing digest');
      return JSON.parse(saved);
    }
    console.log('No existing digest found');
  } catch (error) {
    console.error('Error loading digest from localStorage:', error);
  }
  
  return null;
};

/**
 * Check if digest exists for today
 */
export const hasTodaysDigest = () => {
  return getTodaysDigest() !== null;
};

/**
 * Format digest as plain text for clipboard/email
 */
export const formatDigestAsText = (digest) => {
  if (!digest || !digest.jobs) {
    console.warn('formatDigestAsText: No digest or jobs provided');
    return '';
  }

  const lines = [
    `Top 10 Jobs For You — 9AM Digest`,
    `${getFormattedDate(digest.date)}`,
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ''
  ];

  digest.jobs.forEach((job, index) => {
    if (job) {
      lines.push(`${index + 1}. ${job.title || 'Unknown Role'} at ${job.company || 'Unknown Company'}`);
      lines.push(`   📍 ${job.location || 'N/A'} | 💼 ${job.experience || 'N/A'} | ⭐ ${job.matchScore || 0}% match`);
      lines.push(`   🔗 Apply: ${job.applyUrl || '#'}`);
      lines.push('');
    }
  });

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push('This digest was generated based on your preferences.');
  lines.push('Demo Mode: Daily 9AM trigger simulated manually.');

  return lines.join('\n');
};

/**
 * Create email draft with digest
 */
export const createEmailDraft = (digest) => {
  if (!digest) {
    console.warn('createEmailDraft: No digest provided');
    return {
      subject: 'My 9AM Job Digest',
      body: 'No digest available',
      mailtoLink: 'mailto:?subject=My%209AM%20Job%20Digest&body=No%20digest%20available'
    };
  }
  
  const subject = 'My 9AM Job Digest';
  const body = formatDigestAsText(digest);
  
  return {
    subject,
    body,
    mailtoLink: `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  };
};
