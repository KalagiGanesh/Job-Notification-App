import React from 'react';
import Workspace from '../components/layout/Workspace';
import './DashboardPage.css';

const HomePage = () => {
  return (
    <div className="dashboard-page">
      <Workspace>
        <Workspace.Primary>
          <div className="dashboard-page__empty">
            <p className="dashboard-page__message">
              No jobs yet. In the next step, you will load a realistic dataset.
            </p>
          </div>
        </Workspace.Primary>
        <Workspace.Secondary>
          {/* Empty side panel */}
        </Workspace.Secondary>
      </Workspace>
    </div>
  );
};

export default HomePage;
