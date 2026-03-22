import React from 'react';
import Card from '../components/ui/Card';
import './DigestPage.css';

const DigestPage = () => {
  return (
    <div className="digest-page">
      <div className="digest-page__content text-block">
        <h1 className="digest-page__title">Daily Digest</h1>
        <Card variant="default" padding="lg">
          <div className="digest-page__empty">
            <p className="digest-page__message">
              Your daily job summary will arrive here at 9AM.
            </p>
            <p className="digest-page__submessage">
              Configure your preferences in Settings to receive precision-matched opportunities every morning.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DigestPage;
