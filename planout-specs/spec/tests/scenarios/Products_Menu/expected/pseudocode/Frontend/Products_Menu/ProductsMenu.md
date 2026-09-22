import React, { useState } from 'react';

/**
 * ProductsMenu Navigation Component
 * Asset: assets/16fbbd8a-2141-4a70-a6bc-1c62a3c55ee3.svg
 */
export const ProductsMenu = () => {
  const [activeItem, setActiveItem] = useState<string>('Products');
  const [isProductsExpanded, setIsProductsExpanded] = useState<boolean>(true);

  const handleNavigationClick = (itemName: string) => {
    setActiveItem(itemName);
    // Logic to route to corresponding page would be triggered here
  };

  const toggleProductsMenu = () => {
    setIsProductsExpanded(!isProductsExpanded);
  };

  return (
    <nav className="products-navigation">
      <ul>
        {/* Products Item with Accordion Toggle */}
        <li 
          className={activeItem === 'Products' ? 'active' : ''}
          onClick={() => {
            handleNavigationClick('Products');
            toggleProductsMenu();
          }}
        >
          Products
          <span className="chevron">{isProductsExpanded ? '▼' : '▶'}</span>
        </li>

        {/* Product Sub Menu Component (Accordion) */}
        {isProductsExpanded && (
          <ProductSubMenu />
        )}
      </ul>
    </nav>
  );
};