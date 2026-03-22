import React from 'react';
import './Workspace.css';

/**
 * Workspace Component
 * 
 * Usage:
 * <Workspace>
 *   <Workspace.Primary>
 *     {/* Main content (70%) *}/}
 *   </Workspace.Primary>
 *   <Workspace.Secondary>
 *     {/* Side panel (30%) *}/}
 *   </Workspace.Secondary>
 * </Workspace>
 * 
 * Props:
 * - children: ReactNode - Must contain Primary and Secondary components
 */
const Workspace = ({ children }) => {
  return (
    <div className="workspace">
      {children}
    </div>
  );
};

const WorkspacePrimary = ({ children }) => {
  return (
    <div className="workspace__primary">
      {children}
    </div>
  );
};

const WorkspaceSecondary = ({ children }) => {
  return (
    <div className="workspace__secondary">
      {children}
    </div>
  );
};

Workspace.Primary = WorkspacePrimary;
Workspace.Secondary = WorkspaceSecondary;

export default Workspace;
