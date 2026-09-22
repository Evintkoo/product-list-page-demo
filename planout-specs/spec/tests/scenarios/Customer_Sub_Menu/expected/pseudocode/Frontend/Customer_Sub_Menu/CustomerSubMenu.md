/**
 * Component: CustomerSubMenu
 * Description: An accordion-style navigation menu for the Customer module.
 * Manages active state for navigation items and handles routing to sub-pages.
 * 
 * Asset: assets/4dd09f82-ae6f-400a-8596-87e3d6f5de56.svg
 */

import React, { useState } from 'react';

// Define navigation items for the Customer Sub Menu
const CUSTOMER_NAV_ITEMS = [
  { id: 'retail-customers', label: 'Retail Customers', path: '/customers/retail' },
  { id: 'corporate-customers', label: 'Corporate Customers', path: '/customers/corporate' },
  // ORPHAN_FIELD: customer_groups
  // ORPHAN_FIELD: customer_settings
];

export const CustomerSubMenu = () => {
  // State: Track the currently active navigation item
  // Default state set to 'retail-customers' as per requirements
  const [activeTab, setActiveTab] = useState<string>('retail-customers');

  /**
   * Handle navigation click events
   * Updates the active tab state and triggers navigation to the target path
   */
  const handleNavigation = (itemId: string, path: string) => {
    setActiveTab(itemId);
    // Logic to trigger router navigation to 'path'
    navigateTo(path);
  };

  return (
    <nav className="customer-sub-menu-accordion">
      <ul className="menu-list">
        {CUSTOMER_NAV_ITEMS.map((item) => (
          <li 
            key={item.id}
            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleNavigation(item.id, item.path)}
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