import { useState, useEffect } from 'react';

export const useProductDetails = (id: string | undefined) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        // API call derived from logic: GET /api/products/:id
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

// ===== ORPHAN_FIELD LOG =====
// <!-- ORPHAN_FIELD: Return Days Limit -->
// <!-- ORPHAN_FIELD: Warranty Period -->
// <!-- ORPHAN_FIELD: Barcode Type -->
// <!-- ORPHAN_FIELD: Trade In (Rp) -->
// <!-- ORPHAN_FIELD: MRP (IDR) -->