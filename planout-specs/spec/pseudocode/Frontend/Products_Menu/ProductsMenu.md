/**
 * Component: ProductsMenu
 * Description: Navigation list for the ERP Products section.
 * Asset: assets/16fbbd8a-2141-4a70-a6bc-1c62a3c55ee3.svg
 */

import React, { useState } from 'react';

export const ProductsMenu = () => {
  // State to track the currently active navigation item
  const [activeItem, setActiveItem] = useState<string>('Products');
  
  // State to track accordion visibility for sub-menus
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(true);

  /**
   * Handles navigation item clicks.
   * Updates active state and toggles accordion if sub-menu exists.
   */
  const handleNavigationClick = (itemName: string, hasSubMenu: boolean) => {
    setActiveItem(itemName);
    
    if (hasSubMenu) {
      setIsSubMenuOpen(!isSubMenuOpen);
    } else {
      // Logic to route to the corresponding default page
      navigateToPage(itemName);
    }
  };

  return (
    <nav className="products-menu-container">
      <ul>
        {/* Products Item - Default Active State */}
        <li 
          className={`nav-item ${activeItem === 'Products' ? 'active' : ''}`}
          onClick={() => handleNavigationClick('Products', true)}
        >
          <span>Products</span>
          {/* Chevron icon indicates sub-menu toggle capability */}
          <ChevronIcon isOpen={isSubMenuOpen} />
        </li>

        {/* Product Sub Menu Component (Accordion) */}
        {isSubMenuOpen && (
          <div className="product-sub-menu">
            {/* 
               ORPHAN_FIELD: sub_menu_items 
               (Expected to be populated by a data source or static config)
            */}
            <ProductSubMenu />
          </div>
        )}
      </ul>
    </nav>
  );
};