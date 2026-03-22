import React from 'react';
import './Card.css';

/**
 * Card Component
 * 
 * Usage:
 * <Card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 * 
 * Props:
 * - children: ReactNode - Card content
 * - variant: 'default' | 'elevated' (default: 'default')
 * - padding: 'none' | 'sm' | 'md' | 'lg' (default: 'md')
 */
const Card = ({ 
  children,
  variant = 'default',
  padding = 'md'
}) => {
  const classNames = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {children}
    </div>
  );
};

export default Card;
