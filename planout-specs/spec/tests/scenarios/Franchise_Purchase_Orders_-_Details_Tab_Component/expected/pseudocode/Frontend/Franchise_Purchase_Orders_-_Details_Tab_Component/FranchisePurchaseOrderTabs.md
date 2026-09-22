/**
 * Component: FranchisePurchaseOrderTabs
 * Description: Renders the navigation tabs for the Franchise Purchase Order detail view.
 * Asset: assets/d2954430-2ea8-4a2b-88e0-fd2c32f7b014.svg
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const FranchisePurchaseOrderTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to determine active state based on current path
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <nav className="tab-container" role="tablist">
      {/* Details Tab */}
      <button
        role="tab"
        aria-selected={isActive('/details')}
        className={`tab-item ${isActive('/details') ? 'active' : ''}`}
        onClick={() => navigate('/franchise-purchase-orders/details')}
      >
        Details
      </button>

      {/* Invoice Tab */}
      <button
        role="tab"
        aria-selected={isActive('/invoice')}
        className={`tab-item ${isActive('/invoice') ? 'active' : ''}`}
        onClick={() => navigate('/franchise-purchase-orders/invoice')}
      >
        Invoice
      </button>

      {/* Returns Tab */}
      <button
        role="tab"
        aria-selected={isActive('/returns')}
        className={`tab-item ${isActive('/returns') ? 'active' : ''}`}
        onClick={() => navigate('/franchise-purchase-orders/returns')}
      >
        Returns
      </button>
    </nav>
  );
};