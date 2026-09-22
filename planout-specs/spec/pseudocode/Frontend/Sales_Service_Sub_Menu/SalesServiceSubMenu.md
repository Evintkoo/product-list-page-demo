/**
 * Component: SalesServiceSubMenu
 * Description: Provides navigation options for Service-related sales modules within the ERP header.
 * Asset: assets/3ac1f0b0-9344-44b6-b3fe-54a135790ef4.svg
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SalesServiceSubMenu = () => {
  const navigate = useNavigate();

  /**
   * Navigation Handler for Service Reservation
   * Triggered on click of the "Service Reservation" menu item.
   * Redirects the user to the service reservation list page.
   */
  const handleNavigateToServiceReservations = () => {
    // Redirect to the service reservation list page
    // Path derived from node: 50180e7b-2445-482e-bc39-7cd543ae0141
    navigate('/sales/service-reservations');
  };

  return (
    <nav className="sales-service-submenu-container">
      <ul className="submenu-list">
        <li 
          className="submenu-item" 
          onClick={handleNavigateToServiceReservations}
          role="button"
          aria-label="Navigate to Service Reservation List"
        >
          Service Reservation
          <!-- ORPHAN_FIELD: menu_item_id -->
          <!-- ORPHAN_FIELD: is_active_state -->
        </li>
        
        {/* Additional service sales sub-menu items would be rendered here */}
      </ul>
    </nav>
  );
};