/**
 * Hook: useCustomerDetails
 * Purpose: Manages the data fetching lifecycle for customer-related entities.
 */

import { useQuery } from '@tanstack/react-query';

export const useCustomerDetails = (customerId: string) => {
  return useQuery({
    queryKey: ['customer', customerId],
    queryFn: async () => {
      // Logic to fetch customer details. 
      // Note: API CONTRACTS is currently empty, so this assumes a standard GET pattern.
      const response = await fetch(`/customers/${customerId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
    enabled: !!customerId,
  });
};