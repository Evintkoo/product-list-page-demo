/**
 * Component: WorkflowStatusBar
 * Renders the progression of a franchise purchase return.
 * Asset: assets/ef2c4d4c-6f3e-48b1-9acd-64cc382492ac.svg
 */

import React from 'react';

const STAGES = ['DRAFT', 'CONFIRMED', 'SENT', 'APPROVED'];

export const WorkflowStatusBar = ({ currentStatus }) => {
  return (
    <div className="workflow-status-bar-container">
      <div className="status-progression">
        {STAGES.map((stage, index) => (
          <React.Fragment key={stage}>
            <StatusPill 
              label={stage} 
              isActive={stage === currentStatus}
              isCompleted={STAGES.indexOf(currentStatus) > index}
            />
            {index < STAGES.length - 1 && <ChevronIcon />}
          </React.Fragment>
        ))}
      </div>
      <ActionButtons />
    </div>
  );
};