/**
 * Hook to fetch product details for the card.
 * Note: Since the API CONTRACTS/PAYLOADS are currently empty, 
 * this hook assumes a standard GET request to retrieve the product entity.
 */

import { useEffect, useState } from 'react';

export const useProductStatus = (productId: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching product data based on the entity fields defined in DATA SCHEMAS
    // ORPHAN_FIELD: productId
    fetch(`/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [productId]);

  return { data, loading };
};