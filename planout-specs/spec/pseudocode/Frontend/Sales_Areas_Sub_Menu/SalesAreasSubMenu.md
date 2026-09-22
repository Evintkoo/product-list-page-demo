/**
 * Component: SalesAreasSubMenu
 * Description: Accordion-style sub-navigation for Sales Areas within the ERP Setup menu.
 * Asset: assets/e66cc82c-ab77-4e06-a0f0-575eb9da447c.svg
 */

import React, { useState } from 'react';

export const SalesAreasSubMenu = () => {
  // State to track the currently active navigation item.
  // Default state is set to 'provinces' as per requirements.
  const [activeTab, setActiveTab] = useState<string>('provinces');

  /**
   * Handles navigation state updates.
   * @param {string} tabName - The identifier for the target page section.
   */
  const handleNavigation = (tabName: string) => {
    setActiveTab(tabName);
    
    // Logic to trigger page view transition based on selection
    switch (tabName) {
      case 'provinces':
        renderProvinceListPage();
        break;
      case 'districts':
        renderDistrictListPage();
        break;
      default:
        renderProvinceListPage();
    }
  };

  return (
    <nav className="sales-areas-sub-menu" aria-label="Sales Areas Navigation">
      <ul className="accordion-list">
        <li 
          className={`nav-item ${activeTab === 'provinces' ? 'active' : ''}`}
          onClick={() => handleNavigation('provinces')}
        >
          Provinces
        </li>
        <li 
          className={`nav-item ${activeTab === 'districts' ? 'active' : ''}`}
          onClick={() => handleNavigation('districts')}
        >
          Districts
        </li>
      </ul>
    </nav>
  );
};