import React from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import './SettingsPage.css';

/**
 * SettingsPage Component
 * 
 * Premium settings page with placeholder preference fields.
 * No state management, no saving logic - UI placeholders only.
 * 
 * Fields:
 * - Role keywords
 * - Preferred locations
 * - Mode (Remote / Hybrid / Onsite)
 * - Experience level
 */
const SettingsPage = () => {
  return (
    <div className="settings-page">
      <div className="settings-page__content text-block">
        <h1 className="settings-page__title">Job Preferences</h1>
        <p className="settings-page__subtitle">
          Configure your job search criteria to receive relevant notifications.
        </p>

        <Card variant="default" padding="lg">
          <div className="settings-page__form">
            {/* Role Keywords */}
            <Input
              label="Role Keywords"
              placeholder="e.g., Software Engineer, Frontend Developer"
            />

            {/* Preferred Locations */}
            <Input
              label="Preferred Locations"
              placeholder="e.g., San Francisco, New York, Remote"
            />

            {/* Mode Selection */}
            <div className="settings-page__field">
              <label className="settings-page__label">Work Mode</label>
              <div className="settings-page__options">
                <label className="settings-page__option">
                  <input type="radio" name="mode" value="remote" />
                  <span>Remote</span>
                </label>
                <label className="settings-page__option">
                  <input type="radio" name="mode" value="hybrid" />
                  <span>Hybrid</span>
                </label>
                <label className="settings-page__option">
                  <input type="radio" name="mode" value="onsite" />
                  <span>Onsite</span>
                </label>
              </div>
            </div>

            {/* Experience Level */}
            <div className="settings-page__field">
              <label className="settings-page__label">Experience Level</label>
              <select className="settings-page__select" disabled>
                <option value="">Select experience level</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (6-10 years)</option>
                <option value="lead">Lead / Principal (10+ years)</option>
              </select>
            </div>

            {/* Note */}
            <p className="settings-page__note">
              These preferences will be used to match you with relevant job opportunities.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
