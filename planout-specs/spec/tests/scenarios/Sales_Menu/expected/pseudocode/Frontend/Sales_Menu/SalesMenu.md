/**
 * SalesMenu Component
 * Renders the primary navigation for the Sales module.
 * Manages accordion state for sub-menus and active navigation item highlighting.
 */

Asset: assets/83c2b6db-c40d-4bcf-9365-be672b872fb6.svg

import React, { useState } from 'react';

export const SalesMenu = () => {
  // State management for active navigation item and accordion visibility
  // Default active item is "Store"
  const [activeItem, setActiveItem] = useState<string>('Store');
  
  // Accordion visibility states
  const [isCompanyOpen, setIsCompanyOpen] = useState<boolean>(false);
  const [isStoreOpen, setIsStoreOpen] = useState<boolean>(true); // Default open per requirements
  const [isServiceOpen, setIsServiceOpen] = useState<boolean>(false);

  const handleNavigationClick = (item: string) => {
    setActiveItem(item);
    
    // Toggle logic for accordion menus
    switch (item) {
      case 'Company':
        setIsCompanyOpen(!isCompanyOpen);
        break;
      case 'Store':
        setIsStoreOpen(!isStoreOpen);
        break;
      case 'Service':
        setIsServiceOpen(!isServiceOpen);
        break;
      default:
        break;
    }
  };

  return (
    <nav className="sales-menu-container">
      <ul>
        {/* Company Item */}
        <li 
          className={activeItem === 'Company' ? 'active' : ''}
          onClick={() => handleNavigationClick('Company')}
        >
          Company
          <span className="chevron">{isCompanyOpen ? '▼' : '▶'}</span>
        </li>
        {isCompanyOpen && <CompanySalesSubMenu />}

        {/* Store Item */}
        <li 
          className={activeItem === 'Store' ? 'active' : ''}
          onClick={() => handleNavigationClick('Store')}
        >
          Store
          <span className="chevron">{isStoreOpen ? '▼' : '▶'}</span>
        </li>
        {isStoreOpen && <StoreSalesSubMenu />}

        {/* Service Item */}
        <li 
          className={activeItem === 'Service' ? 'active' : ''}
          onClick={() => handleNavigationClick('Service')}
        >
          Service
          <span className="chevron">{isServiceOpen ? '▼' : '▶'}</span>
        </li>
        {isServiceOpen && <SalesServiceSubMenu />}
      </ul>
    </nav>
  );
};