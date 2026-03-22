import React from 'react';
import TopBar from './components/layout/TopBar';
import ContextHeader from './components/layout/ContextHeader';
import Workspace from './components/layout/Workspace';
import ProofFooter from './components/layout/ProofFooter';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import PromptBox from './components/ui/PromptBox';
import './App.css';

function App() {
  // Demo checklist items for footer
  const checklistItems = [
    { label: 'UI Built', completed: true },
    { label: 'Logic Working', completed: false },
    { label: 'Test Passed', completed: false },
    { label: 'Deployed', completed: false }
  ];

  return (
    <div className="app">
      {/* Top Bar */}
      <TopBar 
        appName="Job Notification App"
        currentStep={1}
        totalSteps={5}
        status="in-progress"
      />

      {/* Context Header */}
      <ContextHeader 
        title="Setup Your Profile"
        subtitle="Complete your professional profile to receive relevant job notifications"
      />

      {/* Main Workspace - 70/30 Split */}
      <Workspace>
        {/* Primary Workspace (70%) */}
        <Workspace.Primary>
          <Card variant="default" padding="lg">
            <h3>Profile Information</h3>
            <p style={{ marginBottom: '24px', color: 'var(--color-text-secondary)' }}>
              Enter your professional details to get started
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input 
                label="Full Name"
                placeholder="John Doe"
                required
              />
              
              <Input 
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                required
              />
              
              <Input 
                label="Current Role"
                placeholder="Software Engineer"
              />
              
              <div style={{ marginTop: '24px' }}>
                <Button variant="primary" type="submit">
                  Save Profile
                </Button>
                <Button variant="secondary" style={{ marginLeft: '16px' }}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </Workspace.Primary>

        {/* Secondary Panel (30%) */}
        <Workspace.Secondary>
          <Card variant="default" padding="md" style={{ marginBottom: '16px' }}>
            <h4>What's This Step About?</h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
              Setting up your profile helps us match you with relevant job opportunities in your field.
            </p>
          </Card>

          <PromptBox 
            label="Example Prompt"
            prompt="I'm a Software Engineer with 5 years of experience looking for remote opportunities..."
          />
        </Workspace.Secondary>
      </Workspace>

      {/* Proof Footer */}
      <ProofFooter items={checklistItems} />
    </div>
  );
}

export default App;
