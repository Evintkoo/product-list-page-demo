/**
 * Component: SuppliersMenu
 * Description: Navigation list for the Suppliers module in the Lumi ERP.
 * Handles active state management, accordion toggling for sub-menus, 
 * and navigation routing.
 * 
 * Asset: assets/a9416c0e-4a49-43cc-8598-ea684862a5a4.svg
 */

import React, { useState } from 'react';

export const SuppliersMenu = () => {
  // State to track the currently active navigation item
  const [activeItem, setActiveItem] = useState<string>('Supplier');
  
  // State to track which sub-menus are expanded (accordion behavior)
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'Supplier': true // Default expanded as per requirements
  });

  const handleNavigationClick = (itemName: string, hasSubMenu: boolean) => {
    // Update active state
    setActiveItem(itemName);

    // If item has a sub-menu, toggle the accordion state
    if (hasSubMenu) {
      setExpandedMenus(prev => ({
        ...prev,
        [itemName]: !prev[itemName]
      }));
    }
    
    // Logic to trigger page transition/routing would be invoked here
    // navigateTo(itemName);
  };

  return (
    <nav className="suppliers-menu-container">
      <ul className="menu-list">
        {/* Supplier Item - Default Active with Sub-menu */}
        <li 
          className={`menu-item ${activeItem === 'Supplier' ? 'active' : ''}`}
          onClick={() => handleNavigationClick('Supplier', true)}
        >
          <span>Supplier</span>
          <span className="chevron-icon">
            {expandedMenus['Supplier'] ? '▼' : '▶'}
          </span>
        </li>

        {/* Supplier Sub Menu Component */}
        {expandedMenus['Supplier'] && (
          <div className="supplier-sub-menu">
            {/* 
               Sub-menu items would be rendered here.
               Each item should trigger the display of the corresponding 
               default page for that sub-category.
            */}
            <SupplierSubMenu />
          </div>
        )}
      </ul>
    </nav>
  );
};