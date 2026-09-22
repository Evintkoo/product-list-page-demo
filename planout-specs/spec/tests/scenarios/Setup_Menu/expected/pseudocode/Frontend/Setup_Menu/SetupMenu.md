/**
 * Component: SetupMenu
 * Description: Main navigation sidebar for the ERP Setup module.
 * Asset: assets/52008524-2500-46ea-91aa-3d23e022e199.svg
 */

import React, { useState } from 'react';

export const SetupMenu = () => {
  // State to track which top-level menu is expanded
  const [expandedMenu, setExpandedMenu] = useState<string | null>('Company');
  
  // State to track the currently active page/item
  const [activeItem, setActiveItem] = useState<string>('Company');

  const toggleMenu = (menuName: string) => {
    setExpandedMenu(prev => (prev === menuName ? null : menuName));
  };

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <nav className="setup-navigation">
      {/* Company Section */}
      <div className="menu-group">
        <button onClick={() => toggleMenu('Company')}>
          Company {expandedMenu === 'Company' ? '▲' : '▼'}
        </button>
        {expandedMenu === 'Company' && (
          <ul className="submenu">
            <li 
              className={activeItem === 'Company' ? 'active' : ''}
              onClick={() => handleItemClick('Company')}
            >
              Company Profile <!-- ORPHAN_FIELD: company_profile_link -->
            </li>
          </ul>
        )}
      </div>

      {/* Areas Section */}
      <div className="menu-group">
        <button onClick={() => toggleMenu('Areas')}>
          Areas {expandedMenu === 'Areas' ? '▲' : '▼'}
        </button>
        {expandedMenu === 'Areas' && (
          <ul className="submenu">
            <li className="active" onClick={() => handleItemClick('Provinces')}>Provinces</li>
            <li onClick={() => handleItemClick('Regencies')}>Regencies/Municipalities</li>
            <li onClick={() => handleItemClick('Districts')}>Districts</li>
            <li onClick={() => handleItemClick('Villages')}>Villages</li>
          </ul>
        )}
      </div>

      {/* Finances Section */}
      <div className="menu-group">
        <button onClick={() => toggleMenu('Finances')}>
          Finances {expandedMenu === 'Finances' ? '▲' : '▼'}
        </button>
        {expandedMenu === 'Finances' && (
          <ul className="submenu">
            <li onClick={() => handleItemClick('Accounts')}>Accounts</li>
            <li onClick={() => handleItemClick('TaxSettings')}>Tax Settings</li>
          </ul>
        )}
      </div>
    </nav>
  );
};