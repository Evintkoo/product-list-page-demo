/**
 * Hook: useCustomerNavigation
 * Logic for managing the active state and routing context for the Customer module.
 */

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useCustomerNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Ensure the active state is synced with the current URL path
  // This ensures that if a user navigates via URL, the menu reflects the correct active tab
  const getActiveTabFromPath = (path: string) => {
    if (path.includes('/customers/retail')) return 'retail-customers';
    if (path.includes('/customers/corporate')) return 'corporate-customers';
    return 'retail-customers'; // Default fallback
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return {
    navigateTo,
    activeTab: getActiveTabFromPath(location.pathname)
  };
};