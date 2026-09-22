/**
 * FinanceSubMenu Component
 * Renders an accordion-style navigation menu for the Finance module.
 * Manages active tab state and nested dropdowns for sub-sections.
 */

import React, { useState } from 'react';

// Asset: assets/0f9b75e1-9d85-4f96-b8d3-8acdec7216dc.svg

export const FinanceSubMenu = () => {
  // State management for active navigation item
  // Default active state set to 'Inventories' as per requirements
  const [activeTab, setActiveTab] = useState<string>('Inventories');
  
  // State for nested dropdown visibility
  const [isInventoriesDropdownOpen, setIsInventoriesDropdownOpen] = useState<boolean>(true);

  const navigationItems = [
    { id: 'Dashboard', label: 'Dashboard' },
    { id: 'Inventories', label: 'Inventories' },
    { id: 'Accounts', label: 'Accounts' },
    { id: 'Reports', label: 'Reports' }
  ];

  const handleNavigationClick = (id: string) => {
    setActiveTab(id);
    
    // Logic for nested dropdown interaction
    if (id === 'Inventories') {
      setIsInventoriesDropdownOpen(!isInventoriesDropdownOpen);
    }
  };

  return (
    <nav className="finance-sub-menu-container">
      <ul className="accordion-menu">
        {navigationItems.map((item) => (
          <li 
            key={item.id} 
            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleNavigationClick(item.id)}
          >
            {item.label}
            
            {/* Nested Dropdown for Inventories */}
            {item.id === 'Inventories' && isInventoriesDropdownOpen && (
              <div className="finance-sub-menu-inventories-dropdown">
                {/* 
                   Render sub-navigation links for Inventories.
                   These links trigger navigation to specific inventory sections.
                */}
                <a href="/finance/inventories/stock-levels">Stock Levels</a>
                <a href="/finance/inventories/valuation">Valuation</a>
                <a href="/finance/inventories/adjustments">Adjustments</a>
                <!-- ORPHAN_FIELD: inventory_sub_category_id -->
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};