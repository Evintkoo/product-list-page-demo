/**
 * InventorySubMenu Component
 * Renders an accordion-style navigation menu for the Inventory module.
 * Asset: assets/b9f89fc3-51e0-4148-84c3-c56c8cc75256.svg
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const InventorySubMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to track the active navigation item.
  // Default active state is "Stock Orders" as per requirements.
  const [activeItem, setActiveItem] = useState<string>('Stock Orders');

  // Navigation configuration mapping labels to routes
  const menuItems = [
    { label: 'Stock Orders', path: '/inventory/stock-orders' },
    { label: 'Stock Returns', path: '/inventory/stock-returns' },
    { label: 'Stock Reservations', path: '/inventory/stock-reservations' },
    { label: 'Stock Opname', path: '/inventory/stock-opname' },
    { label: 'Stock Transfers', path: '/inventory/stock-transfers' },
    { label: 'Franchise Purchase Order', path: '/inventory/franchise-po' },
    { label: 'Franchise Purchase Return', path: '/inventory/franchise-pr' },
    { label: 'Discrepancy Stocks', path: '/inventory/discrepancy-stocks' },
  ];

  const handleNavigation = (label: string, path: string) => {
    setActiveItem(label);
    navigate(path);
  };

  // Initialize default route on mount if no specific path is active
  React.useEffect(() => {
    if (location.pathname === '/inventory') {
      navigate('/inventory/stock-orders');
    }
  }, [location.pathname, navigate]);

  return (
    <nav className="inventory-accordion-menu">
      <div className="menu-header">Inventory</div>
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={`menu-item ${activeItem === item.label ? 'active' : ''}`}
            onClick={() => handleNavigation(item.label, item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default InventorySubMenu;