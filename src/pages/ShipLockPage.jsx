import React, { useState, useEffect } from 'react';
import Workspace from '../components/layout/Workspace';
import Button from '../components/ui/Button';
import './ShipLockPage.css';

const TEST_CHECKLIST_KEY = 'jobTrackerTestStatus';
const TOTAL_TESTS = 10;

const ShipLockPage = () => {
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [passedCount, setPassedCount] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(TEST_CHECKLIST_KEY);
      const parsed = saved ? JSON.parse(saved) : {};
      
      // Count passed tests
      const passed = Object.values(parsed).filter(Boolean).length;
      setPassedCount(passed);
      
      // Check if all tests passed
      setAllTestsPassed(passed === TOTAL_TESTS);
    } catch (error) {
      console.error('Error checking test status:', error);
      setAllTestsPassed(false);
      setPassedCount(0);
    }
  }, []);

  const handleGoToChecklist = () => {
    window.location.href = '/jt/07-test';
  };

  if (!allTestsPassed) {
    return (
      <div className="ship-lock-page">
        <Workspace>
          <Workspace.Primary>
            <div className="ship-lock-page__locked">
              <div className="ship-lock-page__icon">🔒</div>
              
              <h1 className="ship-lock-page__title">Shipment Locked</h1>
              
              <p className="ship-lock-page__message">
                Complete all tests before shipping.
              </p>
              
              <div className="ship-lock-page__progress">
                <div className="ship-lock-page__progress-bar">
                  <div 
                    className="ship-lock-page__progress-fill"
                    style={{ width: `${(passedCount / TOTAL_TESTS) * 100}%` }}
                  ></div>
                </div>
                <p className="ship-lock-page__progress-text">
                  Tests Passed: {passedCount} / {TOTAL_TESTS}
                </p>
              </div>
              
              <div className="ship-lock-page__warning">
                <span className="ship-lock-page__warning-icon">⚠️</span>
                <p className="ship-lock-page__warning-text">
                  <strong>Quality Gate:</strong> All {TOTAL_TESTS} tests must pass before deployment to production.
                </p>
              </div>
              
              <Button 
                onClick={handleGoToChecklist}
                variant="primary"
                size="md"
              >
                Go to Test Checklist →
              </Button>
              
              <p className="ship-lock-page__hint">
                Navigate to <code>/jt/07-test</code> to complete your testing checklist.
              </p>
            </div>
          </Workspace.Primary>
        </Workspace>
      </div>
    );
  }

  // All tests passed - show success and allow shipping
  return (
    <div className="ship-lock-page">
      <Workspace>
        <Workspace.Primary>
          <div className="ship-lock-page__unlocked">
            <div className="ship-lock-page__icon ship-lock-page__icon--success">✅</div>
            
            <h1 className="ship-lock-page__title">Ready to Ship!</h1>
            
            <p className="ship-lock-page__message">
              All {TOTAL_TESTS} tests have passed. You may proceed with deployment.
            </p>
            
            <div className="ship-lock-page__success-box">
              <h3 className="ship-lock-page__success-title">✓ Quality Assurance Complete</h3>
              <ul className="ship-lock-page__success-list">
                <li>All functional tests verified</li>
                <li>Persistence layer validated</li>
                <li>User experience confirmed</li>
                <li>No console errors detected</li>
              </ul>
            </div>
            
            <div className="ship-lock-page__actions">
              <Button 
                onClick={() => alert('🚀 Deployment initiated! (This is a demo)')}
                variant="primary"
                size="lg"
              >
                🚀 Deploy to Production
              </Button>
              
              <Button 
                onClick={handleGoToChecklist}
                variant="secondary"
                size="md"
              >
                Review Tests Again
              </Button>
            </div>
            
            <p className="ship-lock-page__congrats">
              🎉 Great job maintaining quality standards!
            </p>
          </div>
        </Workspace.Primary>
        
        <Workspace.Secondary>
          <div className="ship-lock-page__sidebar">
            <h3 className="ship-lock-page__sidebar-title">Deployment Checklist</h3>
            <p className="ship-lock-page__sidebar-text">
              Before deploying to production, ensure you've also:
            </p>
            <ul className="ship-lock-page__sidebar-list">
              <li>✓ Backed up production database</li>
              <li>✓ Reviewed changelog for breaking changes</li>
              <li>✓ Notified stakeholders of deployment</li>
              <li>✓ Scheduled deployment during low-traffic period</li>
              <li>✓ Prepared rollback plan if needed</li>
            </ul>
          </div>
        </Workspace.Secondary>
      </Workspace>
    </div>
  );
};

export default ShipLockPage;
