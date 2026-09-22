/**
 * Custom hook to handle navigation logic for the Customer Detail Page.
 * Ensures consistent routing across the application.
 */
export const useCustomerNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    // Logic to trigger navigation to specific detail pages
    // Routes derived from node connections:
    // Customer -> /customers/detail
    // Addresses -> /customers/addresses
    // Customer Billings -> /customers/billings
    // Products -> /customers/products
    // Retail Customers -> /customers/retail
    // History -> /customers/history
    navigate(route);
  };

  return { navigateTo };
};