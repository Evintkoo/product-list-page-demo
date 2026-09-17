/**
 * Component: ProductsMenu
 * Description: Navigation list for the ERP Products section.
 * Asset: assets/16fbbd8a-2141-4a70-a6bc-1c62a3c55ee3.svg
 */

import React, { useState } from 'react';

export const ProductsMenu = () => {
  // State to track the currently active navigation item
  const [activeItem, setActiveItem] = useState<string>('Products');
  
  // State to track the accordion toggle for the Products sub-menu
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState<boolean>(true);

  /**
   * Handles the click event for the "Products" navigation item.
   * Toggles the accordion state and sets the active state.
   */
  const handleProductsClick = () => {
    setIsProductsMenuOpen(!isProductsMenuOpen);
    setActiveItem('Products');
    // Logic to navigate to default sub-menu page would be triggered here
  };

  /**
   * Handles navigation for standard items.
   * @param itemName - The identifier of the clicked navigation item.
   */
  const handleNavigation = (itemName: string) => {
    setActiveItem(itemName);
    // Logic to update the main view/page based on itemName
  };

  return (
    <nav className="products-navigation-container">
      <ul>
        {/* Products Item with Accordion Toggle */}
        <li 
          className={`nav-item ${activeItem === 'Products' ? 'active' : ''}`}
          onClick={handleProductsClick}
        >
          <span>Products</span>
          <span className={`chevron ${isProductsMenuOpen ? 'open' : 'closed'}`}>
            {/* Chevron icon logic */}
          </span>
        </li>

        {/* Product Sub Menu Component (Accordion) */}
        {isProductsMenuOpen && (
          <ul className="product-sub-menu">
            <li onClick={() => handleNavigation('Inventory')}>Inventory</li>
            <li onClick={() => handleNavigation('Categories')}>Categories</li>
            <li onClick={() => handleNavigation('Suppliers')}>Suppliers</li>
            {/* ORPHAN_FIELD: sub_menu_items */}
          </ul>
        )}

        {/* Other Navigation Items */}
        <li 
          className={activeItem === 'Reports' ? 'active' : ''}
          onClick={() => handleNavigation('Reports')}
        >
          Reports
        </li>
      </ul>
    </nav>
  );
};