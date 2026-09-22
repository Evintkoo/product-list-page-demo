/**
 * Component: FranchisePurchaseOrderWorkflow
 * Displays the internal status of a Franchise Purchase Order as a horizontal progress tracker.
 * 
 * Statuses:
 * 1. Draft
 * 2. Store Confirmed
 * 3. Warehouse Sent
 * 4. Store Received
 */

import React from 'react';
import { CheckIcon, BulletIcon, ChevronRightIcon } from './Icons'; // Assuming icon library

interface WorkflowStep {
  id: string;
  label: string;
  status: 'passed' | 'active' | 'pending';
}

export const FranchisePurchaseOrderWorkflow = ({ currentStatus }: { currentStatus: string }) => {
  
  // Define the workflow sequence
  const steps: WorkflowStep[] = [
    { id: 'DRAFT', label: 'Draft', status: 'pending' },
    { id: 'STORE_CONFIRMED', label: 'Store Confirmed', status: 'pending' },
    { id: 'WAREHOUSE_SENT', label: 'Warehouse Sent', status: 'pending' },
    { id: 'STORE_RECEIVED', label: 'Store Received', status: 'pending' }
  ];

  // Logic to determine state of each step based on currentStatus
  const processedSteps = steps.map((step, index) => {
    const currentIndex = steps.findIndex(s => s.id === currentStatus);
    
    if (index < currentIndex) return { ...step, status: 'passed' };
    if (index === currentIndex) return { ...step, status: 'active' };
    return { ...step, status: 'pending' };
  });

  return (
    <div className="flex flex-row items-center space-x-2">
      {processedSteps.map((step, index) => (
        <React.Fragment key={step.id}>
          <WorkflowBadge step={step} />
          {index < steps.length - 1 && (
            <ChevronRightIcon className="text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Asset: assets/a190eca1-cb3d-49ab-8fb8-a0ba0e494eb9.svg
const WorkflowBadge = ({ step }: { step: WorkflowStep }) => {
  const isActive = step.status === 'active';
  const isPassed = step.status === 'passed';

  // Styling logic
  const baseClasses = "flex items-center px-3 py-1 rounded-full border";
  const activeClasses = "border-blue-500 text-blue-500 bg-blue-50";
  const passedClasses = "border-green-500 text-green-700 bg-green-50";
  const pendingClasses = "border-gray-300 text-gray-500 bg-white";

  return (
    <div className={`${baseClasses} ${isActive ? activeClasses : isPassed ? passedClasses : pendingClasses}`}>
      {isPassed ? (
        <CheckIcon className="w-4 h-4 mr-2" />
      ) : (
        <BulletIcon className="w-4 h-4 mr-2" />
      )}
      <span className="text-sm font-medium">{step.label}</span>
    </div>
  );
};

// ORPHAN_FIELD: currentStatus (Passed as prop from parent container)
// ORPHAN_FIELD: DRAFT, STORE_CONFIRMED, WAREHOUSE_SENT, STORE_RECEIVED (Status identifiers)