/**
 * Component: SalesInvoiceNavigationTabs
 * Renders the navigation tab bar for the Sales Invoice Detail view.
 * Provides switching between Details, Journals, Deliveries/Payments, Returns, and Changes.
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Asset: assets/22b4b2bd-8e09-4fe9-9804-cbe3f62c6c9a.svg

export const SalesInvoiceNavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to determine if a tab is currently active based on URL path
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <nav className="sales-invoice-tabs-container" role="tablist">
      {/* Details Tab */}
      <button
        role="tab"
        aria-selected={isActive('/details')}
        className={`tab-item ${isActive('/details') ? 'active' : ''}`}
        onClick={() => navigate('./details')}
      >
        Details
        {isActive('/details') && <div className="active-underline-indicator" />}
      </button>

      {/* Journals Tab */}
      <button
        role="tab"
        aria-selected={isActive('/journals')}
        className={`tab-item ${isActive('/journals') ? 'active' : ''}`}
        onClick={() => navigate('./journals')}
      >
        Journals
      </button>

      {/* Deliveries / Payments Tab */}
      <button
        role="tab"
        aria-selected={isActive('/deliveries-payments')}
        className={`tab-item ${isActive('/deliveries-payments') ? 'active' : ''}`}
        onClick={() => navigate('./deliveries-payments')}
      >
        Deliveries / Payments
      </button>

      {/* Returns Tab */}
      <button
        role="tab"
        aria-selected={isActive('/returns')}
        className={`tab-item ${isActive('/returns') ? 'active' : ''}`}
        onClick={() => navigate('./returns')}
      >
        Returns
      </button>

      {/* Changes Tab */}
      <button
        role="tab"
        aria-selected={isActive('/changes')}
        className={`tab-item ${isActive('/changes') ? 'active' : ''}`}
        onClick={() => navigate('./changes')}
      >
        Changes
      </button>
    </nav>
  );
};

// Note: The navigation paths (e.g., './details') are relative to the current Sales Invoice ID route.
// ORPHAN_FIELD: tab_id (Used for internal state tracking if needed)
// ORPHAN_FIELD: active_tab_index (Used for accessibility focus management)