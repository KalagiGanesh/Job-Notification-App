import React from 'react';
import Card from '../components/ui/Card';
import './SavedPage.css';

const SavedPage = () => {
  return (
    <div className="saved-page">
      <div className="saved-page__content text-block">
        <h1 className="saved-page__title">Saved Jobs</h1>
        <Card variant="default" padding="lg">
          <div className="saved-page__empty">
            <p className="saved-page__message">
              Save jobs you're interested in to review them later.
            </p>
            <p className="saved-page__submessage">
              Your saved jobs will appear here once you start tracking opportunities.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SavedPage;
