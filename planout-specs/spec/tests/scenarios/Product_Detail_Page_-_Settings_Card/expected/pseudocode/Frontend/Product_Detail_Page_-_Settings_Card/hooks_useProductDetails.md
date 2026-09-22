/**
 * Hook to manage data fetching for the product detail page.
 * Note: Since API CONTRACTS is empty, this hook assumes a standard 
 * GET /products/{productId} pattern to retrieve the entity fields.
 */

import { useQuery } from '@tanstack/react-query';

export const useProductDetails = (productId) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await fetch(`/products/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch product settings');
      return response.json();
    },
  });
};