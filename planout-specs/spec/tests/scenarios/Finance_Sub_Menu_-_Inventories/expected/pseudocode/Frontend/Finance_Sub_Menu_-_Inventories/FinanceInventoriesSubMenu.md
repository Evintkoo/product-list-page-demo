/**
 * Component: FinanceInventoriesSubMenu
 * Description: Accordion-style navigation component for the Finance - Inventories section.
 * Asset: assets/a825d2d6-1657-4677-ab4a-3b3759a4157e.svg
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FinanceInventoriesSubMenu = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const navigate = useNavigate();

  // Navigation items configuration
  const menuItems = [
    { id: 'sales-invoices', label: 'Sales Invoices', path: '/finance/inventories/sales-invoices' },
    // ORPHAN_FIELD: purchase_orders
    // ORPHAN_FIELD: stock_adjustments
    // ORPHAN_FIELD: inventory_valuation
  ];

  /**
   * Handles navigation logic for sub-menu items.
   * Updates the active tab state and triggers route transition.
   */
  const handleNavigation = (item: { id: string, path: string }) => {
    setActiveTab(item.id);
    
    // Logic for specific navigation nodes
    if (item.id === 'sales-invoices') {
      // Trigger: On Click Sales Invoices
      navigate(item.path);
    }
  };

  return (
    <nav className="finance-inventories-accordion" aria-label="Finance Inventories Navigation">
      <ul className="accordion-list">
        {menuItems.map((item) => (
          <li 
            key={item.id}
            className={`accordion-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleNavigation(item)}
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