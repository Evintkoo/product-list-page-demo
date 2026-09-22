/**
 * Component: SalesCompanySubMenu
 * Description: Provides navigation links for the Sales module within the ERP system.
 * Asset: assets/041499c7-4e42-49ae-889d-1d4b2333496b.svg
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SalesCompanySubMenu = () => {
  const navigate = useNavigate();

  // Navigation Handlers
  const handleNavigateToSalesOrders = () => {
    // Trigger: On Click Sales Order
    // Redirects to: /sales_orders
    navigate('/sales_orders');
  };

  const handleNavigateToSalesReturns = () => {
    // Trigger: On Click Sales Order Returns
    // Redirects to: /sales_order_returns <!-- ORPHAN_FIELD: sales_order_returns_path -->
    navigate('/sales_order_returns');
  };

  const handleNavigateToSalesDeliveries = () => {
    // Trigger: On Click Sales Delivery
    // Redirects to: /sales_deliveries <!-- ORPHAN_FIELD: sales_deliveries_path -->
    navigate('/sales_deliveries');
  };

  return (
    <nav className="sales-company-sub-menu">
      <ul>
        <li onClick={handleNavigateToSalesOrders} role="button" tabIndex={0}>
          Sales Orders
        </li>
        <li onClick={handleNavigateToSalesReturns} role="button" tabIndex={0}>
          Sales Order Returns
        </li>
        <li onClick={handleNavigateToSalesDeliveries} role="button" tabIndex={0}>
          Sales Deliveries
        </li>
      </ul>
    </nav>
  );
};