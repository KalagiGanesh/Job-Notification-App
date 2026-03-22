import React from 'react';
import './Button.css';

/**
 * Button Component
 * 
 * Usage:
 * <Button variant="primary" onClick={handleClick}>
 *   Primary Action
 * </Button>
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'ghost' (default: 'primary')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - disabled: boolean (default: false)
 * - fullWidth: boolean (default: false)
 * - children: ReactNode - Button text
 * - onClick: function - Click handler
 */
const Button = ({ 
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button'
}) => {
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full-width' : '',
    disabled ? 'btn--disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <button 
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
