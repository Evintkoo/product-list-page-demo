/**
 * Component: SupplierDetailMenu
 * Description: Navigation list for the Supplier Detail page.
 * Manages active tab state and navigation between Supplier, Products, and History views.
 * Asset: assets/0d5ee675-52f4-4bcb-8c3e-a94a859ffb7a.svg
 */

import React, { useState } from 'react';

// Define navigation items
const MENU_ITEMS = [
  { id: 'supplier', label: 'Supplier' },
  { id: 'products', label: 'Products' },
  { id: 'history', label: 'History' }
];

export const SupplierDetailMenu = () => {
  // State: Track the currently active tab, defaulting to 'supplier'
  const [activeTab, setActiveTab] = useState('supplier');

  /**
   * Handle navigation clicks
   * Updates the active tab state and triggers the corresponding page view.
   */
  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);

    switch (tabId) {
      case 'supplier':
        // Logic: Navigate to Supplier Detail Page
        navigateTo('/supplier-detail');
        break;
      case 'products':
        // Logic: Navigate to Supplier Details - Product List Page
        navigateTo('/supplier-detail/products');
        break;
      case 'history':
        // Logic: Navigate to Supplier Detail - History Page
        navigateTo('/supplier-detail/history');
        break;
      default:
        console.error('Unknown navigation item');
    }
  };

  return (
    <nav className="supplier-detail-menu">
      <ul>
        {MENU_ITEMS.map((item) => (
          <li 
            key={item.id}
            className={activeTab === item.id ? 'active' : ''}
            onClick={() => handleNavigation(item.id)}
            role="button"
            aria-selected={activeTab === item.id}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * Helper function for routing
 * Note: Implementation depends on the project's router (e.g., React Router)
 */
function navigateTo(path: string) {
  // Logic to update the browser history or component view
  window.history.pushState({}, '', path);
  // ORPHAN_FIELD: router_instance
}