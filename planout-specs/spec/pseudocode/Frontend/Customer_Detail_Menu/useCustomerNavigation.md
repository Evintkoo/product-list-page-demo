/**
 * Custom hook to manage navigation logic and state synchronization 
 * for the Customer Detail Menu.
 */
export const useCustomerNavigation = () => {
  // Logic to ensure the active tab state persists or resets 
  // based on the current URL path.
  const location = useLocation();

  const getActiveTabFromPath = (path: string): string => {
    if (path.includes('/address')) return 'address';
    if (path.includes('/vehicles')) return 'vehicles';
    if (path.includes('/purchases')) return 'purchases';
    if (path.includes('/returns')) return 'returns';
    return 'customer'; // Default
  };

  return {
    currentActiveTab: getActiveTabFromPath(location.pathname)
  };
};