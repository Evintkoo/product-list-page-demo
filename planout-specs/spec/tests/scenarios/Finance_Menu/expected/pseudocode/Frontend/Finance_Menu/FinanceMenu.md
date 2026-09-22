/**
 * FinanceMenu Component
 * Renders the primary navigation list for the Finance module.
 * Asset: assets/cf8668d1-c162-4bfb-b5d8-b658e9a7572f.svg
 */

import React, { useState } from 'react';
import { FinanceSubMenu } from './FinanceSubMenu';

export const FinanceMenu = () => {
  // State to track the currently active navigation item
  const [activeItem, setActiveItem] = useState<string>('Invoices');
  
  // State to manage the accordion toggle for the Invoices sub-menu
  const [isInvoicesOpen, setIsInvoicesOpen] = useState<boolean>(true);

  const handleNavigationClick = (itemName: string) => {
    setActiveItem(itemName);
    
    if (itemName === 'Invoices') {
      setIsInvoicesOpen(!isInvoicesOpen);
    }
  };

  return (
    <nav className="finance-menu-container">
      <ul>
        {/* Invoices Item with Accordion Logic */}
        <li 
          className={`nav-item ${activeItem === 'Invoices' ? 'active' : ''}`}
          onClick={() => handleNavigationClick('Invoices')}
        >
          <span>Invoices</span>
          <span className={`chevron ${isInvoicesOpen ? 'open' : ''}`}>
            {/* ORPHAN_FIELD: chevronIcon */}
          </span>
        </li>

        {/* Conditional rendering of the Sub Menu as an accordion */}
        {isInvoicesOpen && (
          <div className="accordion-wrapper">
            <FinanceSubMenu />
          </div>
        )}

        {/* Other Finance Navigation Items */}
        <li 
          className={`nav-item ${activeItem === 'Reports' ? 'active' : ''}`}
          onClick={() => handleNavigationClick('Reports')}
        >
          Reports
        </li>
        <li 
          className={`nav-item ${activeItem === 'Settings' ? 'active' : ''}`}
          onClick={() => handleNavigationClick('Settings')}
        >
          Settings
        </li>
      </ul>
    </nav>
  );
};