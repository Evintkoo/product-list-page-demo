/**
 * Component: FranchisePurchaseOrderDropdown
 * Description: A dropdown menu triggered by the "New Franchise Purchase Order" button.
 * Provides navigation options to create different types of purchase orders.
 * 
 * Asset: assets/c2ae31ae-9645-4339-923c-5c74350e951c.svg
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FranchisePurchaseOrderDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  /**
   * Navigation Handlers
   * These map to the specific nodes defined in the canvas flow.
   */
  const handleNavigateToStandard = () => {
    // Navigates to Franchise Purchase Orders Standard - New
    navigate('/franchise-purchase-orders/standard/new');
    setIsOpen(false);
  };

  const handleNavigateToInternal = () => {
    // Navigates to Franchise Purchase Orders Internal - New
    navigate('/franchise-purchase-orders/internal/new');
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <button 
        className="new-fpo-button" 
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        New Franchise Purchase Order
      </button>

      {isOpen && (
        <ul className="dropdown-menu" role="menu">
          <li 
            role="menuitem" 
            onClick={handleNavigateToStandard}
            className="dropdown-item"
          >
            Standard (External)
          </li>
          <li 
            role="menuitem" 
            onClick={handleNavigateToInternal}
            className="dropdown-item"
          >
            Internal
          </li>
        </ul>
      )}
    </div>
  );
};