/**
 * Component: FranchiseWorkflowStatus
 * Displays the progression of a Franchise Purchase Order through three stages:
 * Draft -> Store Confirmed -> Store Received.
 * 
 * Asset: assets/ae692506-85b7-4ae3-9fb6-e60ce36f35ae.svg
 * Asset: assets/b3420ee4-c631-443f-bcfa-e9681c87cce0.svg
 */

import React from 'react';

// Define the possible workflow states
type WorkflowStatus = 'DRAFT' | 'STORE_CONFIRMED' | 'STORE_RECEIVED';

interface WorkflowProps {
  currentStatus: WorkflowStatus;
}

export const FranchiseWorkflowStatus: React.FC<WorkflowProps> = ({ currentStatus }) => {
  
  // Define the sequence of steps
  const steps: WorkflowStatus[] = ['DRAFT', 'STORE_CONFIRMED', 'STORE_RECEIVED'];

  const getStepState = (step: WorkflowStatus) => {
    const currentIndex = steps.indexOf(currentStatus);
    const stepIndex = steps.indexOf(step);

    if (stepIndex < currentIndex) return 'PASSED';
    if (stepIndex === currentIndex) return 'ACTIVE';
    return 'PENDING';
  };

  return (
    <div className="flex flex-row items-center space-x-2">
      {steps.map((step, index) => {
        const state = getStepState(step);
        const isPassed = state === 'PASSED';
        const isActive = state === 'ACTIVE';

        return (
          <React.Fragment key={step}>
            {/* Badge Container */}
            <div className={`
              flex items-center px-3 py-1 rounded-full border
              ${isActive ? 'border-blue-500 text-blue-600' : 'border-gray-300'}
              ${isPassed ? 'text-black' : 'text-gray-400'}
            `}>
              {/* Prefix Icon: Check if passed, otherwise Bullet */}
              <span className="mr-2">
                {isPassed ? <IconCheck /> : <IconBorderedBullet />}
              </span>
              
              <span className="text-sm font-medium">
                {step.replace('_', ' ')}
              </span>
            </div>

            {/* Chevron Separator (exclude after last item) */}
            {index < steps.length - 1 && (
              <IconChevron className="text-gray-400" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Helper components for visual assets
const IconCheck = () => <svg>/* Checkmark SVG path */</svg>;
const IconBorderedBullet = () => <svg>/* Bordered Bullet SVG path */</svg>;
const IconChevron = ({ className }: { className: string }) => <svg className={className}>/* Chevron SVG path */</svg>;