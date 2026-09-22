/**
 * Component: FinancesSubMenu
 * Description: Renders an accordion-style navigation sub-menu for the "Finances" section 
 * within the ERP Setup menu.
 * Asset: assets/b39c789f-7819-4313-96ef-e339c5a64faa.svg
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FinancesSubMenu = () => {
  // State to track the currently active navigation item.
  // Default active state is set to "Finances" as per requirements.
  const [activeTab, setActiveTab] = useState<string>('Finances');
  const navigate = useNavigate();

  // Navigation configuration
  const menuItems = [
    { id: 'Finances', label: 'Finances', path: '/setup/finances' },
    { id: 'PaymentTypes', label: 'Payment Types', path: '/setup/finances/payment-types' },
    // ORPHAN_FIELD: TaxSettings
    // ORPHAN_FIELD: CurrencySettings
  ];

  /**
   * Handles navigation and state updates when a menu item is clicked.
   * @param item - The menu item object selected by the user.
   */
  const handleNavigation = (item: { id: string, path: string }) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <nav className="accordion-menu-finances">
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li 
            key={item.id}
            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
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