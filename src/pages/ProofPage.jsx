import React from 'react';
import Card from '../components/ui/Card';
import './ProofPage.css';

const ProofPage = () => {
  return (
    <div className="proof-page">
      <div className="proof-page__content text-block">
        <h1 className="proof-page__title">Proof</h1>
        <Card variant="default" padding="lg">
          <div className="proof-page__empty">
            <p className="proof-page__message">
              Artifact collection and verification will appear here.
            </p>
            <p className="proof-page__submessage">
              This section will track your application progress and outcomes.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProofPage;
