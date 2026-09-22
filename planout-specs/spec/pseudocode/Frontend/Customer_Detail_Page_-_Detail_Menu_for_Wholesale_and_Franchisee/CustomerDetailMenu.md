import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Component: CustomerDetailMenu
 * Renders the navigation sidebar/menu for Wholesale and Franchisee customer detail pages.
 * Asset: assets/74ee990a-9ef8-4126-a9c6-5826e400cfe2.svg
 */
export const CustomerDetailMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items and their corresponding routes
  const menuItems = [
    { id: 'customer', label: 'Customer', path: '/customers/detail' },
    { id: 'addresses', label: 'Addresses', path: '/customers/addresses' },
    { id: 'billings', label: 'Customer Billings', path: '/customers/billings' },
    { id: 'products', label: 'Products', path: '/customers/products' },
    { id: 'retail', label: 'Retail Customers', path: '/customers/retail' },
    { id: 'history', label: 'History', path: '/customers/history' },
  ];

  // Determine active state based on current path, default to 'customer'
  const getActiveItem = () => {
    const current = menuItems.find(item => location.pathname.includes(item.path));
    return current ? current.id : 'customer';
  };

  const [activeItem, setActiveItem] = useState(getActiveItem());

  const handleNavigation = (item: typeof menuItems[0]) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  return (
    <nav className="customer-detail-menu">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={activeItem === item.id ? 'active' : ''}
            onClick={() => handleNavigation(item)}
            role="button"
            aria-label={`Navigate to ${item.label}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};