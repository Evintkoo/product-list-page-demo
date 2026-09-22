/**
 * Component: FranchisePurchaseReturnDropdown
 * Description: A dropdown component allowing the user to select between 
 * 'Internal' or 'Standard (External)' franchise purchase return types.
 * Asset: assets/f85ba606-133f-40b9-a0b2-009e79a2a78d.svg
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FranchisePurchaseReturnDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Validation: The dropdown must be interacted with to trigger navigation.
  // No API payload fields are required for the selection itself as it acts as a router.
  
  const handleInternalSelection = () => {
    // Redirect to Franchise Purchase Order - Internal New
    // <!-- ORPHAN_FIELD: internal_purchase_return_route -->
    navigate('/franchise-purchase-return/internal/new');
  };

  const handleStandardSelection = () => {
    // Redirect to Franchise Purchase Return - Standard New
    // <!-- ORPHAN_FIELD: standard_purchase_return_route -->
    navigate('/franchise-purchase-return/standard/new');
  };

  return (
    <div className="dropdown-container">
      <button 
        aria-label="Add Franchise Purchase Return"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Franchise Purchase Return
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          <li 
            role="button" 
            onClick={handleInternalSelection}
            className="dropdown-item"
          >
            Internal
          </li>
          <li 
            role="button" 
            onClick={handleStandardSelection}
            className="dropdown-item"
          >
            Standard (External)
          </li>
        </ul>
      )}
    </div>
  );
};