/**
 * Component: SuppliersSubMenu
 * Description: Accordion-style navigation menu for the Suppliers module.
 * Asset: assets/f34094d6-5d21-4ea5-8f31-29004c84f930.svg
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const SuppliersSubMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to track the active navigation item.
  // Default active state is set to 'Supplier' (Suppliers List Page).
  const [activeItem, setActiveItem] = useState<string>('Supplier');

  // Navigation configuration
  const menuItems = [
    { id: 'Supplier', label: 'Suppliers', path: '/suppliers' },
    { id: 'NewSupplier', label: 'New Supplier', path: '/suppliers/new' }
  ];

  /**
   * Handles navigation and updates the active tab state.
   * @param id - The unique identifier for the menu item.
   * @param path - The route to navigate to.
   */
  const handleNavigation = (id: string, path: string) => {
    setActiveItem(id);
    navigate(path);
  };

  return (
    <nav className="suppliers-sub-menu-accordion">
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li 
            key={item.id}
            className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => handleNavigation(item.id, item.path)}
            role="button"
            aria-selected={activeItem === item.id}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};