import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import './SettingsPage.css';

const PREFERENCES_KEY = 'jobTrackerPreferences';

/**
 * SettingsPage Component
 * 
 * Full preference management with localStorage persistence.
 * Implements all required fields for job matching engine.
 */
const SettingsPage = () => {
  const [preferences, setPreferences] = useState({
    roleKeywords: '',
    preferredLocations: [],
    preferredMode: [],
    experienceLevel: '',
    skills: '',
    minMatchScore: 40
  });
  
  const [saved, setSaved] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PREFERENCES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  }, []);

  const handleSavePreferences = () => {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const handleLocationToggle = (location) => {
    setPreferences(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(location)
        ? prev.preferredLocations.filter(loc => loc !== location)
        : [...prev.preferredLocations, location]
    }));
  };

  const handleModeToggle = (mode) => {
    setPreferences(prev => ({
      ...prev,
      preferredMode: prev.preferredMode.includes(mode)
        ? prev.preferredMode.filter(m => m !== mode)
        : [...prev.preferredMode, mode]
    }));
  };

  const locations = ['Bangalore', 'Pune', 'Chennai', 'Hyderabad', 'Mumbai', 'Noida', 'Gurgaon'];
  const modes = ['Remote', 'Hybrid', 'Onsite'];
  const experienceLevels = ['Fresher', '0-1', '1-3', '3-5'];

  return (
    <div className="settings-page">
      <div className="settings-page__content text-block">
        <h1 className="settings-page__title">Job Preferences</h1>
        <p className="settings-page__subtitle">
          Configure your job search criteria to enable intelligent matching.
        </p>

        {saved && (
          <div className="settings-page__success">
            ✓ Preferences saved successfully
          </div>
        )}

        <Card variant="default" padding="lg">
          <div className="settings-page__form">
            {/* Role Keywords */}
            <div className="settings-page__field">
              <label className="settings-page__label">Role Keywords (comma-separated)</label>
              <input
                type="text"
                className="settings-page__input"
                value={preferences.roleKeywords}
                onChange={(e) => setPreferences({ ...preferences, roleKeywords: e.target.value })}
                placeholder="e.g., SDE Intern, Frontend Developer, Software Engineer"
              />
            </div>

            {/* Preferred Locations */}
            <div className="settings-page__field">
              <label className="settings-page__label">Preferred Locations</label>
              <div className="settings-page__checkboxes">
                {locations.map((location) => (
                  <label key={location} className="settings-page__checkbox">
                    <input
                      type="checkbox"
                      checked={preferences.preferredLocations.includes(location)}
                      onChange={() => handleLocationToggle(location)}
                    />
                    <span>{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Work Mode */}
            <div className="settings-page__field">
              <label className="settings-page__label">Work Mode</label>
              <div className="settings-page__checkboxes">
                {modes.map((mode) => (
                  <label key={mode} className="settings-page__checkbox">
                    <input
                      type="checkbox"
                      checked={preferences.preferredMode.includes(mode)}
                      onChange={() => handleModeToggle(mode)}
                    />
                    <span>{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="settings-page__field">
              <label className="settings-page__label">Experience Level</label>
              <select
                className="settings-page__select"
                value={preferences.experienceLevel}
                onChange={(e) => setPreferences({ ...preferences, experienceLevel: e.target.value })}
              >
                <option value="">Select experience level</option>
                <option value="Fresher">Fresher</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
              </select>
            </div>

            {/* Skills */}
            <div className="settings-page__field">
              <label className="settings-page__label">Skills (comma-separated)</label>
              <input
                type="text"
                className="settings-page__input"
                value={preferences.skills}
                onChange={(e) => setPreferences({ ...preferences, skills: e.target.value })}
                placeholder="e.g., React, Node.js, Java, Python"
              />
            </div>

            {/* Minimum Match Score */}
            <div className="settings-page__field">
              <label className="settings-page__label">
                Minimum Match Score: {preferences.minMatchScore}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={preferences.minMatchScore}
                onChange={(e) => setPreferences({ ...preferences, minMatchScore: parseInt(e.target.value) })}
                className="settings-page__slider"
              />
              <div className="settings-page__slider-labels">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Save Button */}
            <button
              className="settings-page__save-btn"
              onClick={handleSavePreferences}
            >
              Save Preferences
            </button>

            <p className="settings-page__note">
              These preferences will be used to calculate match scores for available jobs.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
