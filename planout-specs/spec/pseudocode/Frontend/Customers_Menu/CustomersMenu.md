/**
 * CustomersMenu Component
 * Renders the navigation sidebar for the Customers module in the Lumi ERP.
 * Manages accordion states for sub-menus and tracks the active navigation item.
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react'; // Assuming standard icon library

// Asset: assets/6c44892d-9d9e-47dc-88c6-8c81362a1ac9.svg

export const CustomersMenu = () => {
  // State to track which menu items are expanded (accordion logic)
  const [expandedMenus, setExpandedMenus] = useState({
    customers: true, // Default active state as per requirements
    vehicles: false,
    vouchers: false,
  });

  // State to track the currently active navigation item
  const [activeItem, setActiveItem] = useState('customers');

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const handleNavigation = (itemKey) => {
    setActiveItem(itemKey);
    // Logic to trigger page redirection would be handled by router here
  };

  return (
    <nav className="customers-menu-container">
      {/* Customers Item */}
      <div className="nav-item-wrapper">
        <button 
          className={`nav-item ${activeItem === 'customers' ? 'active' : ''}`}
          onClick={() => {
            handleNavigation('customers');
            toggleMenu('customers');
          }}
        >
          Customers
          {expandedMenus.customers ? <ChevronDown /> : <ChevronRight />}
        </button>
        
        {expandedMenus.customers && (
          <div className="sub-menu accordion">
            {/* Customers Sub Menu component content */}
            <a href="/customers/list">Customer List</a>
            <a href="/customers/create">Add New Customer</a>
          </div>
        )}
      </div>

      {/* Vehicles Item */}
      <div className="nav-item-wrapper">
        <button 
          className={`nav-item ${activeItem === 'vehicles' ? 'active' : ''}`}
          onClick={() => {
            handleNavigation('vehicles');
            toggleMenu('vehicles');
          }}
        >
          Vehicles
          {expandedMenus.vehicles ? <ChevronDown /> : <ChevronRight />}
        </button>

        {expandedMenus.vehicles && (
          <div className="sub-menu accordion">
            {/* Redirects to customer vehicles list */}
            <a href="/vehicles/list">View All Vehicles</a>
          </div>
        )}
      </div>

      {/* Vouchers Item */}
      <div className="nav-item-wrapper">
        <button 
          className={`nav-item ${activeItem === 'vouchers' ? 'active' : ''}`}
          onClick={() => {
            handleNavigation('vouchers');
            toggleMenu('vouchers');
          }}
        >
          Vouchers
          {expandedMenus.vouchers ? <ChevronDown /> : <ChevronRight />}
        </button>

        {expandedMenus.vouchers && (
          <div className="sub-menu accordion">
            {/* on click to voucher flexible */}
            <a href="/vouchers/flexible">Flexible Vouchers</a>
          </div>
        )}
      </div>
    </nav>
  );
};

// ORPHAN_FIELD: customers (used as state key)
// ORPHAN_FIELD: vehicles (used as state key)
// ORPHAN_FIELD: vouchers (used as state key)
// ORPHAN_FIELD: activeItem (used for UI state tracking)