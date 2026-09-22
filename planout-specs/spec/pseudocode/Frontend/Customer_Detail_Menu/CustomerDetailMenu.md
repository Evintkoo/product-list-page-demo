import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Component: CustomerDetailMenu
 * Description: Navigation list for Customer Detail Menu. 
 * User clicks a navigation item to show the corresponding page section, 
 * updating the active tab state.
 * 
 * Asset: assets/a808d89e-5580-4d6e-bdc3-30c6492404f6.svg
 */

export const CustomerDetailMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items and their corresponding routes
  const menuItems = [
    { id: 'customer', label: 'Customer', path: '/customers/detail' },
    { id: 'address', label: 'Address', path: '/customers/address' },
    { id: 'vehicles', label: 'Vehicles', path: '/customers/vehicles' },
    { id: 'purchases', label: 'Purchases', path: '/customers/purchases' },
    { id: 'returns', label: 'Returns', path: '/customers/returns' },
  ];

  // State: activeTab
  // Default active state is "Customer"
  const [activeTab, setActiveTab] = useState<string>('customer');

  const handleNavigation = (item: typeof menuItems[0]) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <nav className="customer-detail-menu">
      <ul>
        {menuItems.map((item) => (
          <li 
            key={item.id}
            className={activeTab === item.id ? 'active' : ''}
            onClick={() => handleNavigation(item)}
            role="button"
            aria-selected={activeTab === item.id}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};