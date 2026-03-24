import React, { useState, useEffect } from 'react';
import Workspace from '../components/layout/Workspace';
import './TestChecklistPage.css';

const TEST_CHECKLIST_KEY = 'jobTrackerTestStatus';

const TEST_ITEMS = [
  {
    id: 'test-1',
    label: 'Preferences persist after refresh',
    tooltip: 'Set preferences in Settings → Refresh page → Confirm preferences remain'
  },
  {
    id: 'test-2',
    label: 'Match score calculates correctly',
    tooltip: 'Check job cards show match % based on your preferences'
  },
  {
    id: 'test-3',
    label: '"Show only matches" toggle works',
    tooltip: 'Enable toggle → Verify only jobs above threshold display'
  },
  {
    id: 'test-4',
    label: 'Save job persists after refresh',
    tooltip: 'Save a job → Refresh page → Confirm job still shows as saved'
  },
  {
    id: 'test-5',
    label: 'Apply opens in new tab',
    tooltip: 'Click Apply button → Verify it opens in new browser tab'
  },
  {
    id: 'test-6',
    label: 'Status update persists after refresh',
    tooltip: 'Change job status → Refresh → Confirm status remains'
  },
  {
    id: 'test-7',
    label: 'Status filter works correctly',
    tooltip: 'Filter by status (e.g., "Applied") → Verify correct jobs show'
  },
  {
    id: 'test-8',
    label: 'Digest generates top 10 by score',
    tooltip: 'Generate digest → Check jobs are sorted by match score'
  },
  {
    id: 'test-9',
    label: 'Digest persists for the day',
    tooltip: 'Generate digest → Refresh → Confirm same digest displays'
  },
  {
    id: 'test-10',
    label: 'No console errors on main pages',
    tooltip: 'Open DevTools Console → Visit /dashboard, /saved, /digest → Check for errors'
  }
];

const TestChecklistPage = () => {
  // Initialize state from localStorage immediately to prevent reset on refresh
  const [testStatus, setTestStatus] = useState(() => {
    try {
      const saved = localStorage.getItem(TEST_CHECKLIST_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error initializing test status:', error);
      return {};
    }
  });

  // Calculate passed count directly from state - ensures it's always accurate
  const passedCount = Object.values(testStatus).filter(Boolean).length;
  const allPassed = passedCount === TEST_ITEMS.length;

  // Save to localStorage whenever testStatus changes - immediate sync
  useEffect(() => {
    try {
      localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(testStatus));
    } catch (error) {
      console.error('Error saving test status:', error);
    }
  }, [testStatus]);

  // Toggle handler - updates state immediately which triggers re-render and localStorage save
  const handleToggleTest = (testId) => {
    setTestStatus(prev => ({
      ...prev,
      [testId]: !prev[testId]  // Toggle the value
    }));
  };

  const handleResetTests = () => {
    if (window.confirm('Are you sure you want to reset all test status?')) {
      localStorage.removeItem(TEST_CHECKLIST_KEY);
      setTestStatus({});
    }
  };

  return (
    <div className="test-checklist-page">
      <Workspace>
        <Workspace.Primary>
          <div className="test-checklist-page__header">
            <h1 className="test-checklist-page__title">Built-In Test Checklist</h1>
            <p className="test-checklist-page__subtitle">
              Complete all tests before shipping to production
            </p>
          </div>

          {/* Test Result Summary */}
          <div className={`test-checklist-page__summary ${!allPassed ? 'test-checklist-page__summary--warning' : ''}`}>
            <div className="test-checklist-page__summary-content">
              <span className="test-checklist-page__summary-count">
                Tests Passed: {passedCount} / {TEST_ITEMS.length}
              </span>
              {!allPassed && (
                <span className="test-checklist-page__summary-warning">
                  ⚠️ Resolve all issues before shipping.
                </span>
              )}
              {allPassed && (
                <span className="test-checklist-page__summary-success">
                  ✓ All tests passed! Ready to ship.
                </span>
              )}
            </div>
          </div>

          {/* Test Checklist */}
          <div className="test-checklist-page__checklist">
            {TEST_ITEMS.map((item, index) => {
              const isChecked = !!testStatus[item.id];
              
              return (
                <div 
                  key={item.id} 
                  className={`test-checklist-page__item ${isChecked ? 'test-checklist-page__item--checked' : ''}`}
                >
                  <label className="test-checklist-page__checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleTest(item.id)}
                      className="test-checklist-page__checkbox"
                    />
                    <span className="test-checklist-page__checkbox-custom"></span>
                    <span className="test-checklist-page__label-text">
                      <span className="test-checklist-page__item-number">{index + 1}.</span>
                      {item.label}
                    </span>
                  </label>
                  
                  {/* Tooltip - shows on hover with CSS */}
                  <div 
                    className="test-checklist-page__tooltip-wrapper"
                    data-tooltip={item.tooltip}
                  >
                    <span className="test-checklist-page__tooltip-icon">ℹ️</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset Button */}
          <div className="test-checklist-page__footer">
            <button
              className="test-checklist-page__reset-btn"
              onClick={handleResetTests}
              type="button"
            >
              🔄 Reset Test Status
            </button>
          </div>
        </Workspace.Primary>

        <Workspace.Secondary>
          <div className="test-checklist-page__sidebar">
            <h3 className="test-checklist-page__sidebar-title">Testing Guidelines</h3>
            <p className="test-checklist-page__sidebar-text">
              Each test verifies a critical feature of the Job Notification Tracker.
            </p>
            <p className="test-checklist-page__sidebar-text">
              Complete all tests to ensure the application is ready for production deployment.
            </p>
            
            <div className="test-checklist-page__sidebar-note">
              <strong>Note:</strong> Test status persists across sessions using localStorage.
            </div>
          </div>
        </Workspace.Secondary>
      </Workspace>
    </div>
  );
};

export default TestChecklistPage;
