import React from 'react';
import './ProofFooter.css';

/**
 * ProofFooter Component
 * 
 * Usage:
 * <ProofFooter 
 *   items={[
 *     { label: 'UI Built', completed: true },
 *     { label: 'Logic Working', completed: false },
 *     { label: 'Test Passed', completed: false },
 *     { label: 'Deployed', completed: false }
 *   ]}
 * />
 * 
 * Props:
 * - items: Array<{label: string, completed: boolean}> - Checklist items
 */
const ProofFooter = ({ items = [] }) => {
  return (
    <footer className="proof-footer">
      <div className="proof-footer__container">
        <ul className="proof-footer__list">
          {items.map((item, index) => (
            <li key={index} className="proof-footer__item">
              <span className={`proof-footer__checkbox ${item.completed ? 'completed' : ''}`}>
                {item.completed ? '✓' : '□'}
              </span>
              <span className="proof-footer__label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default ProofFooter;
