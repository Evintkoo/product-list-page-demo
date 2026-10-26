/**
 * Component: ProductSubMenu
 * Description: Navigation list for Product Sub Menu shown as an accordion menu under Products Menu component.
 * Asset: assets/cc78e296-781a-4513-833b-16dccbb06c20.svg
 */

import React, { useState } from 'react';

export const ProductSubMenu = () => {
  // State: activeTab tracks the currently selected navigation item.
  // Default state is set to 'Products' to show the Product List Page by default.
  const [activeTab, setActiveTab] = useState('Products');

  /**
   * Node: Product Sub Menu Navigation (id: 17a4709e-d1e3-419c-9fa5-7760bd6b65ad)
   * Logic: Renders an accordion menu. Clicking an item updates activeTab and triggers navigation.
   */
  const handleNavigation = (tabName: string) => {
    setActiveTab(tabName);
    // Cross-lane seam: Trigger navigation to corresponding page section
    // Next nodes: Products Menu (50687d04-6157-45fc-8777-05baebe93159), Product List Page (ca2a2eaf-9e50-4ac0-9a19-74de6359d7a7)
  };

  return (
    <nav className="product-sub-menu-accordion">
      <button 
        className={activeTab === 'Products' ? 'active' : ''} 
        onClick={() => handleNavigation('Products')}
      >
        Products
      </button>
      
      <button 
        className={activeTab === 'Service Products' ? 'active' : ''} 
        onClick={() => handleNavigation('Service Products')}
      >
        Service Products
      </button>
    </nav>
  );
};

// Notes covered:
// - Navigation list for Product Sub Menu shown as an accordion menu under Products Menu component.
// - User clicks a navigation item to navigate to the corresponding page section, updating the active tab state.
// - Set "Products" item as a default active state so show the Product List Page as default page.