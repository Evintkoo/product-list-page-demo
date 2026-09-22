import { useState, useEffect } from 'react';

/**
 * Hook to fetch audit data for the Product Detail Page.
 * Note: API CONTRACTS is empty, assuming standard GET /products/{id}/audit
 */
export const useProductAudit = (productId: string) => {
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        // Fetching audit trail data for the specific product
        const response = await fetch(`/products/${productId}/audit`);
        const data = await response.json();
        setAuditData(data);
      } catch (error) {
        console.error("Failed to fetch audit trail", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [productId]);

  return { auditData, loading };
};