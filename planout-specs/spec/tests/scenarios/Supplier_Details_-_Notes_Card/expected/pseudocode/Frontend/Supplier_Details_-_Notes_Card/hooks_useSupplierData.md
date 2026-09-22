/**
 * Custom hook to fetch supplier details.
 * Note: Since API CONTRACTS is empty, this hook assumes a standard 
 * GET request pattern for the supplier entity.
 */

import { useQuery } from '@tanstack/react-query';

export const useSupplierData = (supplierId) => {
  return useQuery({
    queryKey: ['supplier', supplierId],
    queryFn: async () => {
      // Logic node: Fetching supplier details
      const response = await fetch(`/suppliers/${supplierId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
    enabled: !!supplierId,
  });
};