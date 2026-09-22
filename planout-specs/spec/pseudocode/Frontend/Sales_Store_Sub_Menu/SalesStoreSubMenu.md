/**
 * Component: SalesStoreSubMenu
 * Description: Provides navigation for store-related sales modules within the ERP header.
 * Asset: assets/92c4c46d-2571-4550-becb-14380b7ccf4e.svg
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SalesStoreSubMenu = () => {
  const navigate = useNavigate();

  /**
   * Navigation Handlers
   * These map to the nodes defined in the canvas flow.
   */
  
  const handleNavigateToSalesList = () => {
    // Triggered by "On Click Sales" node
    // Navigates to the Sales List - Store view
    navigate('/sales');
  };

  const handleNavigateToSalesEcommerce = () => {
    // Triggered by "On Click Sales Ecommerce" node
    // Navigates to the Sales Ecommerce view
    navigate('/sales/ecommerce');
  };

  return (
    <nav className="sales-store-sub-menu" aria-label="Sales Store Navigation">
      <ul>
        <li>
          <button 
            type="button" 
            onClick={handleNavigateToSalesList}
            aria-label="Navigate to Sales List"
          >
            Sales List
          </button>
        </li>
        <li>
          <button 
            type="button" 
            onClick={handleNavigateToSalesEcommerce}
            aria-label="Navigate to Sales Ecommerce"
          >
            Sales Ecommerce
          </button>
        </li>
      </ul>
    </nav>
  );
};