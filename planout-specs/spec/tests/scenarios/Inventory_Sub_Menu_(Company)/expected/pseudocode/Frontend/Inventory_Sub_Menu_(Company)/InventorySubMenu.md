/**
 * Component: InventorySubMenu
 * Description: Renders the company-level inventory navigation sub-menu.
 * Asset: assets/729279e0-350e-433d-9d25-c82795c4f460.svg
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export const InventorySubMenu = () => {
  const navigate = useNavigate();

  /**
   * Navigation Handlers
   * These handlers manage the routing logic for the sub-menu items.
   */

  const handlePurchaseOrdersClick = () => {
    // Navigates to Purchase Orders List page - Standard
    navigate('/purchase-orders'); // <!-- ORPHAN_FIELD: purchase_orders_route -->
  };

  const handlePurchaseReturnsClick = () => {
    // Navigates to Purchase Returns Company List page
    navigate('/purchase-returns'); // <!-- ORPHAN_FIELD: purchase_returns_route -->
  };

  const handleStockOutgoingsClick = () => {
    // Navigates to Stock Outgoings List page
    navigate('/stock-outgoings'); // <!-- ORPHAN_FIELD: stock_outgoings_route -->
  };

  return (
    <nav className="inventory-sub-menu-container">
      <ul className="menu-list">
        <li 
          role="button" 
          onClick={handlePurchaseOrdersClick}
          className="menu-item"
        >
          Purchase Orders
        </li>
        
        <li 
          role="button" 
          onClick={handlePurchaseReturnsClick}
          className="menu-item"
        >
          Purchase Returns
        </li>
        
        <li 
          role="button" 
          onClick={handleStockOutgoingsClick}
          className="menu-item"
        >
          Stock Outgoings
        </li>
      </ul>
    </nav>
  );
};

/**
 * VALIDATION RULES:
 * 1. The component must be rendered within the context of the Company ERP dashboard.
 * 2. Navigation triggers are immediate upon click (no form submission required).
 * 3. If the user lacks permissions for a specific module (e.g., Purchase Returns), 
 *    the corresponding menu item should be hidden or disabled via a 
 *    permission-check hook (e.g., useAuth).
 */