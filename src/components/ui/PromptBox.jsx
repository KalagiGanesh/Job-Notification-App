import React, { useState } from 'react';
import './PromptBox.css';

/**
 * PromptBox Component
 * 
 * Usage:
 * <PromptBox 
 *   label="API Key"
 *   prompt="sk-1234567890abcdef"
 *   onCopy={handleCopy}
 * />
 * 
 * Props:
 * - label: string - Box label
 * - prompt: string - Text to display and copy
 * - onCopy: function - Copy handler (optional)
 */
const PromptBox = ({ 
  label = 'Prompt',
  prompt = '',
  onCopy
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      if (onCopy) {
        onCopy(prompt);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="prompt-box">
      <div className="prompt-box__header">
        <span className="prompt-box__label">{label}</span>
        <button 
          className="prompt-box__copy-btn"
          onClick={handleCopy}
          aria-label="Copy to clipboard"
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <div className="prompt-box__content">
        <code className="prompt-box__text">{prompt}</code>
      </div>
    </div>
  );
};

export default PromptBox;
