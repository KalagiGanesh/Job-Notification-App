import React from 'react';
import './Input.css';

/**
 * Input Component
 * 
 * Usage:
 * <Input 
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={handleChange}
 *   error="Invalid email format"
 * />
 * 
 * Props:
 * - label: string - Field label
 * - type: 'text' | 'email' | 'password' | 'number' (default: 'text')
 * - placeholder: string - Placeholder text
 * - value: string - Current value
 * - onChange: function - Change handler
 * - error: string - Error message (optional)
 * - disabled: boolean (default: false)
 * - required: boolean (default: false)
 */
const Input = ({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  id
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`input ${error ? 'input--error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <p id={`${inputId}-error`} className="input-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
