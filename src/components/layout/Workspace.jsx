import React from 'react';
import './Workspace.css';

/**
 * Workspace Component - KodNest Premium Build System
 * 
 * MANDATORY LAYOUT:
 * - Primary Workspace: 70% width (cards/interactions)
 * - Secondary Panel: 30% width (for prompts/buttons)
 * 
 * Usage:
 * <Workspace>
 *   <Workspace.Primary>
 *     {/* Main content/cards *\/}
 *   </Workspace.Primary>
 *   <Workspace.Secondary>
 *     {/* Sidebar/prompts *\/}
 *   </Workspace.Secondary>
 * </Workspace>
 */
const Workspace = ({ children }) => {
  return <div className="workspace">{children}</div>;
};

const Primary = ({ children }) => {
  return <div className="workspace__primary">{children}</div>;
};

const Secondary = ({ children }) => {
  return <div className="workspace__secondary">{children}</div>;
};

Workspace.Primary = Primary;
Workspace.Secondary = Secondary;

export default Workspace;
