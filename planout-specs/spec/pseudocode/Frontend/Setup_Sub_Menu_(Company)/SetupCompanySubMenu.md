/**
 * Component: SetupCompanySubMenu
 * Description: Accordion-style navigation sub-menu for the "Company" section.
 * Manages active state for navigation items and triggers route updates.
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Asset: assets/f5145a10-21b4-406e-9d4b-c27d6ed7b7d4.svg

export const SetupCompanySubMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State: Track the currently active sub-menu item.
  // Default active state is set to 'company-data' (Company List Page).
  const [activeItem, setActiveItem] = useState<string>('company-data');

  /**
   * Navigation Handlers
   */
  
  const handleNavigateToCompanyData = () => {
    setActiveItem('company-data');
    // Navigates to Company List Page
    navigate('/setup/company/list'); 
    // ORPHAN_FIELD: /setup/company/list
  };

  const handleNavigateToCompanySettings = () => {
    setActiveItem('company-settings');
    // Navigates to Company Settings Page
    navigate('/setup/company/settings');
    // ORPHAN_FIELD: /setup/company/settings
  };

  return (
    <nav className="setup-sub-menu-accordion">
      <div className="menu-header">Company</div>
      
      <ul className="menu-items">
        <li 
          className={activeItem === 'company-data' ? 'active' : ''}
          onClick={handleNavigateToCompanyData}
        >
          Company Data
        </li>
        
        <li 
          className={activeItem === 'company-settings' ? 'active' : ''}
          onClick={handleNavigateToCompanySettings}
        >
          Company Settings
        </li>
      </ul>
    </nav>
  );
};