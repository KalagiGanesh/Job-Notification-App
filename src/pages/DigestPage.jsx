import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  generateDigest, 
  getTodaysDigest, 
  getFormattedDate,
  formatDigestAsText,
  createEmailDraft
} from '../utils/digestEngine';
import { getRecentActivityLog } from '../utils/localStorage';
import { jobsData } from '../data/jobsData.jsx';
import './DigestPage.css';

const DigestPage = () => {
  console.log('Digest Page Rendering...');
  
  const [digest, setDigest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [activityLog, setActivityLog] = useState([]);
  
  // Check if preferences exist (simple localStorage check)
  const preferencesSet = (() => {
    try {
      const prefs = localStorage.getItem('jobTrackerPreferences');
      return prefs !== null;
    } catch {
      return false;
    }
  })();

  // Load existing digest on mount
  useEffect(() => {
    console.log('DigestPage mounted, loading existing digest...');
    try {
      const existingDigest = getTodaysDigest();
      if (existingDigest && existingDigest.jobs) {
        console.log('Loaded existing digest:', existingDigest);
        setDigest(existingDigest);
      } else {
        console.log('No existing digest found');
      }
      
      // Load recent activity log (last 5 updates)
      const activities = getRecentActivityLog(5);
      setActivityLog(activities);
    } catch (err) {
      console.error('Error loading digest in useEffect:', err);
      setError('Failed to load digest');
    }
  }, []);

  const handleGenerateDigest = () => {
    console.log('Generate digest button clicked');
    if (!preferencesSet) {
      console.warn('Cannot generate: preferences not set');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      try {
        const newDigest = generateDigest();
        console.log('Generated new digest:', newDigest);
        if (newDigest && newDigest.jobs) {
          setDigest(newDigest);
        } else {
          setError('Failed to generate digest');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error generating digest:', err);
        setError('Error: ' + err.message);
        setLoading(false);
      }
    }, 800);
  };

  const handleCopyToClipboard = async () => {
    if (!digest) {
      console.warn('Cannot copy: no digest available');
      return;
    }
    
    try {
      console.log('Copying digest to clipboard...');
      const text = formatDigestAsText(digest);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      console.log('Digest copied successfully');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleCreateEmailDraft = () => {
    if (!digest) {
      console.warn('Cannot create email: no digest available');
      return;
    }
    
    try {
      const emailData = createEmailDraft(digest);
      console.log('Opening email draft...');
      window.location.href = emailData.mailtoLink;
    } catch (error) {
      console.error('Error creating email draft:', error);
    }
  };

  const handleRefresh = () => {
    console.log('Refreshing digest...');
    try {
      const existingDigest = getTodaysDigest();
      if (existingDigest) {
        console.log('Reloaded digest:', existingDigest);
        setDigest(existingDigest);
      } else {
        console.log('No digest to reload');
      }
    } catch (error) {
      console.error('Error refreshing digest:', error);
    }
  };

  // Error state
  if (error) {
    return (
      <div className="digest-page">
        <div className="digest-page__content">
          <Card variant="default" padding="lg">
            <div className="digest-page__empty">
              <p className="digest-page__message" style={{color: 'red'}}>
                ❌ {error}
              </p>
              <button
                className="digest-page__refresh-btn"
                onClick={() => {
                  setError(null);
                  window.location.reload();
                }}
              >
                Reload Page
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // State: No preferences
  if (!preferencesSet) {
    return (
      <div className="digest-page">
        <div className="digest-page__content">
          <Card variant="default" padding="lg">
            <div className="digest-page__empty">
              <p className="digest-page__message">
                ⚠️ Set your preferences to generate a personalized digest.
              </p>
              <a href="/settings" className="digest-page__link">Go to Settings</a>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // State: No digest yet
  if (!digest) {
    return (
      <div className="digest-page">
        <div className="digest-page__content">
          <Card variant="default" padding="lg">
            <div className="digest-page__prompt">
              <h1 className="digest-page__title">Daily Digest</h1>
              <p className="digest-page__subtitle">
                Your personalized job summary delivered every morning at 9AM.
              </p>
              
              <button
                className="digest-page__generate-btn"
                onClick={handleGenerateDigest}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Today\'s 9AM Digest (Simulated)'}
              </button>
              
              <p className="digest-page__demo-note">
                Demo Mode: Daily 9AM trigger simulated manually.
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // State: No matching jobs
  if (!digest.jobs || digest.jobs.length === 0) {
    return (
      <div className="digest-page">
        <div className="digest-page__content">
          <Card variant="default" padding="lg">
            <div className="digest-page__empty">
              <p className="digest-page__message">
                No matching roles today. Check again tomorrow.
              </p>
              <button
                className="digest-page__refresh-btn"
                onClick={handleRefresh}
              >
                Refresh
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // State: Display digest with maximum safety
  try {
    return (
      <div className="digest-page">
        <div className="digest-page__content">
          <Card variant="default" padding="lg">
            {/* Header */}
            <div className="digest-page__header">
              <h1 className="digest-page__main-title">
                Top 10 Jobs For You — 9AM Digest
              </h1>
              <p className="digest-page__date">
                {getFormattedDate(digest?.date || null)}
              </p>
            </div>

            {/* Job List */}
            <div className="digest-page__jobs">
              {digest && digest.jobs && Array.isArray(digest.jobs) && digest.jobs.length > 0 ? (
                digest.jobs.map((job, index) => {
                  // Safety guard: ensure job exists
                  if (!job) {
                    console.warn(`Job at index ${index} is null/undefined`);
                    return null;
                  }
                  
                  const matchScore = (job.matchScore !== undefined && job.matchScore !== null) ? job.matchScore : 0;
                  const scoreClass = matchScore >= 80 ? 'high' : matchScore >= 60 ? 'medium' : 'low';
                  
                  return (
                    <div key={job.id || `job-${index}`} className="digest-page__job-card">
                      <div className="digest-page__job-number">{index + 1}</div>
                      <div className="digest-page__job-details">
                        <h3 className="digest-page__job-title">{job.title || 'Unknown Role'}</h3>
                        <p className="digest-page__job-company">{job.company || 'Unknown Company'}</p>
                        <div className="digest-page__job-meta">
                          <span className="digest-page__job-location">📍 {job.location || 'N/A'}</span>
                          <span className="digest-page__job-experience">💼 {job.experience || 'N/A'}</span>
                          <span className={`digest-page__job-score digest-page__job-score--${scoreClass}`}>
                            ⭐ {matchScore}% match
                          </span>
                        </div>
                      </div>
                      <button
                        className="digest-page__apply-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          const url = (job.applyUrl && job.applyUrl !== '#') ? job.applyUrl : '#';
                          window.open(url, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        Apply →
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="digest-page__empty">
                  <p className="digest-page__message">No jobs available in digest</p>
                  <button
                    className="digest-page__generate-btn"
                    onClick={handleGenerateDigest}
                  >
                    Generate Digest
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="digest-page__footer">
              <p className="digest-page__footer-text">
                This digest was generated based on your preferences.
              </p>
              <p className="digest-page__demo-note-small">
                Demo Mode: Daily 9AM trigger simulated manually.
              </p>
            </div>

            {/* Recent Status Updates Section */}
            {activityLog && activityLog.length > 0 ? (
              <div className="digest-page__status-section">
                <h2 className="digest-page__section-title">Recent Status Updates</h2>
                <div className="digest-page__status-list">
                  {activityLog.map((activity, index) => {
                    const job = jobsData.find(j => j.id === activity.jobId);
                    return (
                      <div key={index} className="digest-page__status-item">
                        <div className="digest-page__status-content">
                          <span className={`digest-page__status-badge digest-page__status-badge--${activity.newStatus.toLowerCase().replace(' ', '-')}`}>
                            {activity.newStatus}
                          </span>
                          <span className="digest-page__status-job">
                            {job ? job.title : 'Unknown Job'}
                            {job && ` • ${job.company}`}
                          </span>
                          <span className="digest-page__status-date">
                            {activity.date} at {activity.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="digest-page__status-section digest-page__status-section--empty">
                <p className="digest-page__status-empty">No recent activity recorded.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="digest-page__actions">
              <button
                className="digest-page__action-btn"
                onClick={async () => {
                  if (!digest) return;
                  try {
                    console.log('Copying digest to clipboard...');
                    const text = formatDigestAsText(digest);
                    await navigator.clipboard.writeText(text);
                    setCopied(true);
                    console.log('Digest copied successfully');
                    setTimeout(() => setCopied(false), 2000);
                  } catch (err) {
                    console.error('Error copying to clipboard:', err);
                  }
                }}
                disabled={copied}
              >
                {copied ? '✓ Copied!' : '📋 Copy Digest to Clipboard'}
              </button>
              <button
                className="digest-page__action-btn"
                onClick={() => {
                  if (!digest) return;
                  try {
                    const emailData = createEmailDraft(digest);
                    console.log('Opening email draft...');
                    window.location.href = emailData.mailtoLink;
                  } catch (err) {
                    console.error('Error creating email draft:', err);
                  }
                }}
              >
                ✉️ Create Email Draft
              </button>
              <button
                className="digest-page__action-btn digest-page__action-btn--secondary"
                onClick={handleRefresh}
              >
                🔄 Refresh
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  } catch (err) {
    console.error('CRITICAL ERROR rendering DigestPage:', err);
    setError('Rendering error: ' + err.message);
    return (
      <div className="digest-page">
        <div className="digest-page__content">
          <Card variant="default" padding="lg">
            <div className="digest-page__empty">
              <p className="digest-page__message" style={{color: 'red'}}>
                ❌ Critical Error: {err.message}
              </p>
              <button
                className="digest-page__refresh-btn"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
};

export default DigestPage;
