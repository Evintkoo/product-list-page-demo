/**
 * Component: ProductsSubMenu
 * Description: An accordion-style navigation menu for the ERP Products section.
 * Manages active tab state and handles navigation to specific product-related pages.
 * 
 * Asset: assets/cc78e296-781a-4513-833b-16dccbb06c20.svg
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductsSubMenu = () => {
  const navigate = useNavigate();
  
  // State: Tracks the currently active menu item to highlight the UI and control routing
  // Default state is set to 'products' as per requirements
  const [activeTab, setActiveTab] = useState<string>('products');

  // Navigation Handlers
  const handleNavigate = (path: string, tabId: string) => {
    setActiveTab(tabId);
    navigate(path);
  };

  return (
    <nav className="products-sub-menu-accordion">
      {/* Products Menu Item */}
      <div 
        className={`menu-item ${activeTab === 'products' ? 'active' : ''}`}
        onClick={() => handleNavigate('/products', 'products')}
      >
        Products
      </div>

      {/* Service Products Menu Item */}
      <div 
        className={`menu-item ${activeTab === 'service-products' ? 'active' : ''}`}
        onClick={() => handleNavigate('/service-products', 'service-products')}
      >
        Service Products
      </div>
    </nav>
  );
};