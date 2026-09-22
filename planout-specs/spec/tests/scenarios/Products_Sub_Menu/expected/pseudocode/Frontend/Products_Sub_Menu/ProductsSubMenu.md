/**
 * Component: ProductsSubMenu
 * Description: An accordion-style navigation menu for the Products section.
 * Manages active state for navigation items and handles routing to specific pages.
 * Asset: assets/cc78e296-781a-4513-833b-16dccbb06c20.svg
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductsSubMenu = () => {
  // State to track the currently active navigation item.
  // Default state is set to "Products" as per requirements.
  const [activeItem, setActiveItem] = useState<string>('Products');
  const navigate = useNavigate();

  // Navigation handler for menu items
  const handleNavigation = (item: string, path: string) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <nav className="products-sub-menu-accordion">
      {/* Products Menu Item */}
      <div 
        className={`menu-item ${activeItem === 'Products' ? 'active' : ''}`}
        onClick={() => handleNavigation('Products', '/products')}
      >
        Products
      </div>

      {/* Service Products Menu Item */}
      <div 
        className={`menu-item ${activeItem === 'Service Products' ? 'active' : ''}`}
        onClick={() => handleNavigation('Service Products', '/service-products')}
      >
        Service Products
      </div>
    </nav>
  );
};